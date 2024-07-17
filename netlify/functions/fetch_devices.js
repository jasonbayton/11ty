const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const url = 'https://ping.projects.bayton.org/api/devices';
    const token = process.env.PING_API;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        // Ensure the response is an array
        if (!Array.isArray(data)) {
            throw new Error('Response is not an array');
        }

        // Get the current date
        const currentDate = new Date();

        // Function to calculate the difference in hours
        function hoursDifference(date1, date2) {
            const timeDifference = date2.getTime() - date1.getTime();
            return timeDifference / (1000 * 3600);
        }

        // Filter devices updated within the last 24 hours
        const recent24hDevices = data.filter(device => {
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
        const nonStaleRecentDevices = data.filter(device => {
            const updatedAt = new Date(device.updated_at);
            return !device.stale && daysDifference(updatedAt, currentDate) <= 90;
        });

        // Get the total count of non-stale devices updated within 90 days
        const totalNonStaleRecentDevices = nonStaleRecentDevices.length;

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

        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};