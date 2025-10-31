const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

async function fetchAndSaveDevices() {
    const devicesUrl = 'https://ping.bayton.org/items/devices?limit=-1';
    const token = process.env.PINGDIR_API;
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

        // Fetch devices
        const devicesResponse = await fetch(devicesUrl, fetchOptions);

        // Check if response is successful
        if (!devicesResponse.ok) {
            throw new Error(`Failed to fetch devices: ${devicesResponse.status} ${devicesResponse.statusText}`);
        }

        // Parse JSON response
        const responseData = await devicesResponse.json();

        // Extract devices array from the data wrapper
        if (!responseData || !responseData.data) {
            throw new Error('Devices response is missing data property');
        }
        const devicesData = responseData.data;

        // Ensure the response contains an array
        if (!Array.isArray(devicesData)) {
            throw new Error('Devices response data is not an array');
        }

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

        // Count devices by a specific field
        const countByField = (devices, field) => {
            return devices.reduce((acc, device) => {
                const key = device[field] || 'Unknown';
                acc[key] = (acc[key] || 0) + 1;
                return acc;
            }, {});
        };

        // Count devices by country (case-insensitive)
        const countByCountry = (devices) => {
            return devices.reduce((acc, device) => {
                const country = (device.countryCode || 'Unknown').toUpperCase(); // Normalize to uppercase
                acc[country] = (acc[country] || 0) + 1;
                return acc;
            }, {});
        };

        // Function to process devices by service
        function processDevices(devices) {
            // Create a Map to track unique device IDs
            const uniqueDevices = new Map();

            // Filter out devices not updated within 90 days and exclude duplicates
            const nonStaleRecentDevices = devices.filter(device => {
                const updatedAt = new Date(device.date_updated);
                // Validate required device fields
                if (!device.id || !device.date_updated) {
                    return false;
                }
                // Check if device is updated within the last 90 days
                if (daysDifference(updatedAt, currentDate) <= 90) {
                    // Check if the device ID is unique
                    if (!uniqueDevices.has(device.id)) {
                        uniqueDevices.set(device.id, device);
                        return true; // Include the device
                    }
                }
                return false; // Exclude the device if it's too old or a duplicate
            });

            // Filter devices updated within the last 24 hours
            const recent24hDevices = nonStaleRecentDevices.filter(device => {
                const updatedAt = new Date(device.date_updated);
                return hoursDifference(updatedAt, currentDate) <= 24;
            });

            // Get the total counts
            const totalNonStaleRecentDevices = nonStaleRecentDevices.length;
            const totalRecent24hDevices = recent24hDevices.length;

            // Count devices by OS, make, and country
            const devicesByOS = countByField(nonStaleRecentDevices, 'os');
            const devicesByMake = countByField(nonStaleRecentDevices, 'make');
            const devicesByCountry = countByCountry(nonStaleRecentDevices);

            // Sort counts in descending order
            const sortCountsDesc = counts => {
                return Object.fromEntries(
                    Object.entries(counts).sort(([, a], [, b]) => b - a)
                );
            };

            const sortedDevicesByOS = sortCountsDesc(devicesByOS);
            const sortedDevicesByMake = sortCountsDesc(devicesByMake);
            const sortedDevicesByCountry = sortCountsDesc(devicesByCountry);

            return {
                totalNonStaleRecentDevices,
                totalRecent24hDevices,
                totalLicensedDevices: 0, // License validation removed - always 0
                devicesByOS: sortedDevicesByOS,
                devicesByMake: sortedDevicesByMake,
                devicesByCountry: sortedDevicesByCountry,
                numberChangeByOS: {},
                numberChangeByMake: {},
                numberChangeByCountry: {}
            };
        }

        // Process devices for each service
        const managedSettingsDevices = devicesData.filter(device => device.service === 'managed-settings');
        const packageSearchDevices = devicesData.filter(device => device.service === 'package-search');
        const managedInfoDevices = devicesData.filter(device => device.service === 'managed-info');

        const managedSettingsResult = processDevices(managedSettingsDevices);
        const packageSearchResult = processDevices(packageSearchDevices);
        const managedInfoResult = processDevices(managedInfoDevices);

        // Read the previous day's data
        let previousData = null;
        if (fs.existsSync(outputPath)) {
            previousData = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
        }

        // Calculate number change for OS, make, and country
        if (previousData) {
            ['managedSettings', 'packageSearch', 'managedInfo'].forEach(service => {
                const currentData = service === 'managedSettings' ? managedSettingsResult
                    : service === 'packageSearch' ? packageSearchResult
                        : managedInfoResult;
                const prevData = previousData[service] || {};
                const prevOS = prevData.devicesByOS || {};
                const prevMake = prevData.devicesByMake || {};
                const prevCountry = prevData.devicesByCountry || {};

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

                // Combine all country keys
                const allCountries = new Set([...Object.keys(currentData.devicesByCountry), ...Object.keys(prevCountry)]);
                for (const country of allCountries) {
                    const previousCount = prevCountry[country] || 0;
                    const currentCount = currentData.devicesByCountry[country] || 0;
                    const numberChange = currentCount - previousCount;
                    currentData.numberChangeByCountry[country] = numberChange;
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