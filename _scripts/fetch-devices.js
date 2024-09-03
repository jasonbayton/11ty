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
        // Fetch devices
        const devicesResponse = await fetch(devicesUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        const devicesData = await devicesResponse.json();

        // Ensure the response is an array
        if (!Array.isArray(devicesData)) {
            throw new Error('Devices response is not an array');
        }

        // Fetch licenses for managed-settings and package-search
        const licensesResponse = await fetch(licensesUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // Fetch licenses for managed-info
        const managedInfoLicensesResponse = await fetch(managedInfoLicensesUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        const licensesData = await licensesResponse.json();
        const managedInfoLicensesData = await managedInfoLicensesResponse.json();

        // Ensure the responses are arrays
        if (!Array.isArray(licensesData) || !Array.isArray(managedInfoLicensesData)) {
            throw new Error('Licenses response is not an array');
        }

        // Extract valid license orgIds
        const validLicenseOrgs = new Set(licensesData);
        const validManagedInfoLicenseOrgs = new Set(managedInfoLicensesData);

        // Get the current date
        const currentDate = new Date();

        // Function to calculate the difference in hours
        function hoursDifference(date1, date2) {
            const timeDifference = date2.getTime() - date1.getTime();
            return timeDifference / (1000 * 3600);
        }

        // Function to calculate the difference in days
        function daysDifference(date1, date2) {
            const timeDifference = date2.getTime() - date1.getTime();
            return timeDifference / (1000 * 3600 * 24);
        }

        // Function to process devices by service
        function processDevices(devices, validLicenses) {
            // Filter devices updated within the last 24 hours
            const recent24hDevices = devices.filter(device => {
                const updatedAt = new Date(device.updated_at);
                return hoursDifference(updatedAt, currentDate) <= 24;
            });

            // Get the total count of devices updated within the last 24 hours
            const totalRecent24hDevices = recent24hDevices.length;

            // Filter out stale devices and those not updated within 90 days
            const nonStaleRecentDevices = devices.filter(device => {
                const updatedAt = new Date(device.updated_at);
                return !device.stale && daysDifference(updatedAt, currentDate) <= 90;
            });

            // Get the total count of non-stale devices updated within 90 days
            const totalNonStaleRecentDevices = nonStaleRecentDevices.length;

            // Count devices with valid licenses
            const licensedDevices = nonStaleRecentDevices.filter(device => validLicenses.has(device.orgId));
            const totalLicensedDevices = licensedDevices.length;

            // Count devices by OS and sort by number of devices in descending order
            const devicesByOS = nonStaleRecentDevices.reduce((acc, device) => {
                acc[device.os] = (acc[device.os] || 0) + 1;
                return acc;
            }, {});
            const sortedDevicesByOS = Object.fromEntries(
                Object.entries(devicesByOS).sort(([, a], [, b]) => b - a)
            );

            // Count devices by make and sort by number of devices in descending order
            const devicesByMake = nonStaleRecentDevices.reduce((acc, device) => {
                acc[device.make] = (acc[device.make] || 0) + 1;
                return acc;
            }, {});
            const sortedDevicesByMake = Object.fromEntries(
                Object.entries(devicesByMake).sort(([, a], [, b]) => b - a)
            );

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

                for (const os in currentData.devicesByOS) {
                    const previousCount = prevOS[os] || 0;
                    const currentCount = currentData.devicesByOS[os];
                    const numberChange = currentCount - previousCount;
                    currentData.numberChangeByOS[os] = numberChange;
                }

                for (const make in currentData.devicesByMake) {
                    const previousCount = prevMake[make] || 0;
                    const currentCount = currentData.devicesByMake[make];
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
            const managedSettingsDiff = result.managedSettings.totalNonStaleRecentDevices - previousData.managedSettings.totalNonStaleRecentDevices;
            const packageSearchDiff = result.packageSearch.totalNonStaleRecentDevices - previousData.packageSearch.totalNonStaleRecentDevices;
            const managedInfoDiff = result.managedInfo.totalNonStaleRecentDevices - previousData.managedInfo.totalNonStaleRecentDevices;

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