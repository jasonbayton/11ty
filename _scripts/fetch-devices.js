const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

async function fetchAndSaveDevices() {
    const devicesUrl = 'https://ping.projects.bayton.org/api/devices';
    const licensesUrl = 'https://ping.projects.bayton.org/api/licenses/org.bayton.managedsettings';
    const managedInfoLicensesUrl = 'https://ping.projects.bayton.org/api/licenses/org.bayton.managedinfo';
    const token = process.env.PING_API;
    const outputPath = path.join(__dirname, '../_src/_data', 'devices.json');

    try {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        // Fetch devices and licenses in parallel
        const [devicesResponse, licensesResponse, managedInfoLicensesResponse] = await Promise.all([
            fetch(devicesUrl, fetchOptions),
            fetch(licensesUrl, fetchOptions),
            fetch(managedInfoLicensesUrl, fetchOptions)
        ]);

        // Check if all responses are successful
        if (!devicesResponse.ok) {
            throw new Error(`Failed to fetch devices: ${devicesResponse.status} ${devicesResponse.statusText}`);
        }
        if (!licensesResponse.ok) {
            throw new Error(`Failed to fetch licenses: ${licensesResponse.status} ${licensesResponse.statusText}`);
        }
        if (!managedInfoLicensesResponse.ok) {
            throw new Error(`Failed to fetch managed info licenses: ${managedInfoLicensesResponse.status} ${managedInfoLicensesResponse.statusText}`);
        }

        // Parse JSON responses in parallel
        const [devicesData, licensesData, managedInfoLicensesData] = await Promise.all([
            devicesResponse.json(),
            licensesResponse.json(),
            managedInfoLicensesResponse.json()
        ]);

        // Ensure the responses are arrays
        if (!Array.isArray(devicesData)) {
            throw new Error('Devices response is not an array');
        }
        if (!Array.isArray(licensesData) || !Array.isArray(managedInfoLicensesData)) {
            throw new Error('Licenses response is not an array');
        }

        // Extract valid license orgIds
        const validLicenseOrgs = new Set(licensesData);
        const validManagedInfoLicenseOrgs = new Set(managedInfoLicensesData);

        // Get the current date
        const currentDate = new Date();

        // Function to calculate the difference in hours
        const hoursDifference = (date1, date2) => {
            const timeDifference = date2.getTime() - date1.getTime();
            return timeDifference / (1000 * 3600);
        };

        // Function to calculate the difference in days
        const daysDifference = (date1, date2) => {
            const timeDifference = date2.getTime() - date1.getTime();
            return timeDifference / (1000 * 3600 * 24);
        };

        // Function to process devices by service
        function processDevices(devices, validLicenses) {
            // Create a Map to track unique device IDs
            const uniqueDevices = new Map();

            // Filter out stale devices, those not updated within 90 days, and exclude duplicates
            const nonStaleRecentDevices = devices.filter(device => {
                const updatedAt = new Date(device.updated_at);
                // Validate required device fields
                if (!device.id || !device.updated_at || typeof device.stale !== 'boolean') {
                    return false;
                }
                // Check if the device is non-stale and updated within the last 90 days
                if (!device.stale && daysDifference(updatedAt, currentDate) <= 90) {
                    // Check if the device ID is unique
                    if (!uniqueDevices.has(device.id)) {
                        uniqueDevices.set(device.id, device);
                        return true; // Include the device
                    }
                }
                return false; // Exclude the device if it's stale, too old, or a duplicate
            });

            // Filter devices updated within the last 24 hours
            const recent24hDevices = nonStaleRecentDevices.filter(device => {
                const updatedAt = new Date(device.updated_at);
                return hoursDifference(updatedAt, currentDate) <= 24;
            });

            // Get the total counts
            const totalNonStaleRecentDevices = nonStaleRecentDevices.length;
            const totalRecent24hDevices = recent24hDevices.length;

            // Count devices with valid licenses
            const licensedDevices = nonStaleRecentDevices.filter(device => validLicenses.has(device.orgId));
            const totalLicensedDevices = licensedDevices.length;

            // Count devices by OS and make
            const countByField = (devices, field) => {
                return devices.reduce((acc, device) => {
                    const key = device[field] || 'Unknown';
                    acc[key] = (acc[key] || 0) + 1;
                    return acc;
                }, {});
            };

            const devicesByOS = countByField(nonStaleRecentDevices, 'os');
            const devicesByMake = countByField(nonStaleRecentDevices, 'make');

            // Sort counts in descending order
            const sortCountsDesc = counts => {
                return Object.fromEntries(
                    Object.entries(counts).sort(([, a], [, b]) => b - a)
                );
            };

            const sortedDevicesByOS = sortCountsDesc(devicesByOS);
            const sortedDevicesByMake = sortCountsDesc(devicesByMake);

            return {
                totalNonStaleRecentDevices,
                totalRecent24hDevices,
                totalLicensedDevices,
                devicesByOS: sortedDevicesByOS,
                devicesByMake: sortedDevicesByMake,
                numberChangeByOS: {},
                numberChangeByMake: {}
            };
        }

        // Process devices for each service
        const managedSettingsDevices = devicesData.filter(device => device.service === 'managed-settings');
        const packageSearchDevices = devicesData.filter(device => device.service === 'package-search');
        const managedInfoDevices = devicesData.filter(device => device.service === 'managed-info');

        const managedSettingsResult = processDevices(managedSettingsDevices, validLicenseOrgs);
        const packageSearchResult = processDevices(packageSearchDevices, validLicenseOrgs);
        const managedInfoResult = processDevices(managedInfoDevices, validManagedInfoLicenseOrgs);

        // Read the previous day's data
        let previousData = null;
        if (fs.existsSync(outputPath)) {
            previousData = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
        }

        // Calculate number change for OS and make
        if (previousData) {
            ['managedSettings', 'packageSearch', 'managedInfo'].forEach(service => {
                const currentData = service === 'managedSettings' ? managedSettingsResult
                    : service === 'packageSearch' ? packageSearchResult
                        : managedInfoResult;
                const prevData = previousData[service] || {};
                const prevOS = prevData.devicesByOS || {};
                const prevMake = prevData.devicesByMake || {};

                // Combine all OS keys
                const allOS = new Set([...Object.keys(currentData.devicesByOS), ...Object.keys(prevOS)]);
                for (const os of allOS) {
                    const previousCount = prevOS[os] || 0;
                    const currentCount = currentData.devicesByOS[os] || 0;
                    const numberChange = currentCount - previousCount;
                    currentData.numberChangeByOS[os] = numberChange;
                }

                // Combine all make keys
                const allMakes = new Set([...Object.keys(currentData.devicesByMake), ...Object.keys(prevMake)]);
                for (const make of allMakes) {
                    const previousCount = prevMake[make] || 0;
                    const currentCount = currentData.devicesByMake[make] || 0;
                    const numberChange = currentCount - previousCount;
                    currentData.numberChangeByMake[make] = numberChange;
                }
            });
        }

        // Write the result to a JSON file
        const result = {
            managedSettings: managedSettingsResult,
            packageSearch: packageSearchResult,
            managedInfo: managedInfoResult
        };
        fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

        console.log('Data fetched and saved to', outputPath);

        // Compare with previous data and output the difference
        if (previousData) {
            const managedSettingsDiff = managedSettingsResult.totalNonStaleRecentDevices - previousData.managedSettings.totalNonStaleRecentDevices;
            const packageSearchDiff = packageSearchResult.totalNonStaleRecentDevices - previousData.packageSearch.totalNonStaleRecentDevices;
            const managedInfoDiff = managedInfoResult.totalNonStaleRecentDevices - previousData.managedInfo.totalNonStaleRecentDevices;

            console.log(`Managed Settings device count changed by ${managedSettingsDiff} compared to the previous day.`);
            console.log(`Package Search device count changed by ${packageSearchDiff} compared to the previous day.`);
            console.log(`Managed Info device count changed by ${managedInfoDiff} compared to the previous day.`);
        }
    } catch (error) {
        console.error('Error fetching devices:', error);
    }
}

// Run the fetch function
fetchAndSaveDevices();