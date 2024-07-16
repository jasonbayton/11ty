const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

module.exports = async function() {
    const url = 'https://ping.projects.bayton.org/api/devices';
    const token = process.env.PING_API;
    const outputPath = path.join(__dirname, 'devices.json');

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Get the current date
        const currentDate = new Date();

        // Function to calculate the difference in days
        function daysDifference(date1, date2) {
            const timeDifference = date2.getTime() - date1.getTime();
            return timeDifference / (1000 * 3600 * 24);
        }

        // Function to calculate the difference in hours
        function hoursDifference(date1, date2) {
            const timeDifference = date2.getTime() - date1.getTime();
            return timeDifference / (1000 * 3600);
        }

        // Filter out stale devices and those not updated within 90 days
        const nonStaleRecentDevices = data.filter(device => {
            const updatedAt = new Date(device.updated_at);
            return !device.stale && daysDifference(updatedAt, currentDate) <= 90;
        });

        // Filter devices updated within the last 24 hours
        const recent24hDevices = data.filter(device => {
            const updatedAt = new Date(device.updated_at);
            return hoursDifference(updatedAt, currentDate) <= 24;
        });

        // Get the total count of non-stale devices updated within 90 days
        const totalNonStaleRecentDevices = nonStaleRecentDevices.length;

        // Get the total count of devices updated within the last 24 hours
        const totalRecent24hDevices = recent24hDevices.length;

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

        const result = {
            totalNonStaleRecentDevices,
            totalRecent24hDevices,
            devicesByOS,
            devicesByMake
        };

        // Check if the existing data is different from the new data
        let isNewData = true;
        if (fs.existsSync(outputPath)) {
            const existingData = fs.readFileSync(outputPath, 'utf-8');
            if (existingData === JSON.stringify(result, null, 2)) {
                isNewData = false;
            }
        }

        if (isNewData) {
            // Write the result to a JSON file
            fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
            console.log("Data has changed, writing to devices.json");
        } else {
            console.log("No change, skipping write to devices.json");
        }

        // Log success or failure
        if (totalNonStaleRecentDevices > 0) {
            console.log("PING retrieval success");
        } else {
            console.log("PING retrieval failure");
        }

        // Return the result for Eleventy to use
        return result;

    } catch (error) {
        console.error('Error fetching devices:', error);
        console.log("PING retrieval failure");
        return {};
    }
};