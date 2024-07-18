const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

async function fetchAndSaveDevices() {
    const devicesUrl = 'https://ping.projects.bayton.org/api/devices';
    const licensesUrl = 'https://ping.projects.bayton.org/api/licenses/org.bayton.managedsettings';
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

        // Fetch licenses
        const licensesResponse = await fetch(licensesUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        const licensesData = await licensesResponse.json();

        // Ensure the response is an array
        if (!Array.isArray(licensesData)) {
            throw new Error('Licenses response is not an array');
        }

        // Extract valid license orgIds
        const validLicenseOrgs = new Set(licensesData);

        // Get the current date
        const currentDate = new Date();

        // Function to calculate the difference in hours
        function hoursDifference(date1, date2) {
            const timeDifference = date2.getTime() - date1.getTime();
            return timeDifference / (1000 * 3600);
        }

        // Filter devices updated within the last 24 hours
        const recent24hDevices = devicesData.filter(device => {
            const updatedAt = new Date(device.updated_at);
            return hoursDifference(updatedAt, currentDate) <= 24;
        });

        // Get the total count of devices updated within the last 24 hours
        const totalRecent24hDevices = recent24hDevices.length;

        // Function to calculate the difference in days
        function daysDifference(date1, date2) {
            const timeDifference = date2.getTime() - date1.getTime();
            return timeDifference / (1000 * 3600 * 24);
        }

        // Filter out stale devices and those not updated within 90 days
        const nonStaleRecentDevices = devicesData.filter(device => {
            const updatedAt = new Date(device.updated_at);
            return !device.stale && daysDifference(updatedAt, currentDate) <= 90;
        });

        // Get the total count of non-stale devices updated within 90 days
        const totalNonStaleRecentDevices = nonStaleRecentDevices.length;

        // Count devices with valid licenses
        const licensedDevices = nonStaleRecentDevices.filter(device => validLicenseOrgs.has(device.orgId));
        const totalLicensedDevices = licensedDevices.length;

        // Count devices by OS
        const devicesByOS = nonStaleRecentDevices.reduce((acc, device) => {
            acc[device.os] = (acc[device.os] || 0) + 1;
            return acc;
        }, {});

        // Count devices by make
        const devicesByMake = nonStaleRecentDevices.reduce((acc, device) => {
            acc[device.make] = (acc[device.make] || 0) + 1;
            return acc;
        }, {});

        // Read the previous day's data
        let previousData = null;
        if (fs.existsSync(outputPath)) {
            previousData = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
        }

        const result = {
            totalNonStaleRecentDevices,
            totalRecent24hDevices,
            totalLicensedDevices,
            devicesByOS,
            devicesByMake,
            numberChangeByOS: {},
            numberChangeByMake: {}
        };

        // Calculate number change for OS
        if (previousData) {
            for (const os in devicesByOS) {
                const previousCount = previousData.devicesByOS[os] || 0;
                const currentCount = devicesByOS[os];
                const numberChange = currentCount - previousCount;
                result.numberChangeByOS[os] = numberChange;
            }

            // Calculate number change for Make
            for (const make in devicesByMake) {
                const previousCount = previousData.devicesByMake[make] || 0;
                const currentCount = devicesByMake[make];
                const numberChange = currentCount - previousCount;
                result.numberChangeByMake[make] = numberChange;
            }
        }

        // Ensure the _data directory exists
        const dataDir = path.dirname(outputPath);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Write the result to a JSON file
        fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

        console.log('Data fetched and saved to', outputPath);

        // Compare with previous data and output the difference
        if (previousData) {
            const deviceDifference = totalNonStaleRecentDevices - previousData.totalNonStaleRecentDevices;
            console.log(`Device count changed by ${deviceDifference} compared to the previous day.`);
        }
    } catch (error) {
        console.error('Error fetching devices:', error);
    }
}

// Run the fetch function
fetchAndSaveDevices();