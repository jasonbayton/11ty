const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

async function fetchAndSavePackages() {
    const devicesUrl = 'https://ping-dir.projects.bayton.org/items/device_packages';
    const token = process.env.PINGDIR_API;
    const outputPath = path.join(__dirname, '../_src/_data', 'packages.json');

    try {
        const response = await fetch(devicesUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status} - ${response.statusText}`);
        }

        const json = await response.json();
        const rows = json.data || [];

        const result = {};

        for (const row of rows) {
            if (!row.system_packages) continue;

            const make = row.make || 'UnknownMake';
            const model = row.model || 'UnknownModel';
            const os = row.os || 'UnknownOS';
            const systemPackages = JSON.parse(row.system_packages || '[]');

            for (const { packageName, appName } of systemPackages) {
                if (!packageName) continue;

                if (!result[packageName]) {
                    result[packageName] = {
                        appNames: new Set(),
                        devices: new Set()
                    };
                }

                result[packageName].appNames.add(appName || packageName);
                result[packageName].devices.add(`${make}||${model}||${os}`);
            }
        }

        // Convert sets to arrays and split device info into objects, sorted by first app name
        const finalOutput = {};
        for (const pkg of Object.keys(result).sort((a, b) => {
            const aName = Array.from(result[a].appNames)[0] || a;
            const bName = Array.from(result[b].appNames)[0] || b;
            return aName.localeCompare(bName);
        })) {
            const data = result[pkg];
            finalOutput[pkg] = {
                appNames: Array.from(data.appNames),
                devices: Array.from(data.devices).map(str => {
                    const [make, model, os] = str.split('||');
                    return { make, model, os };
                })
            };
        }

        fs.writeFileSync(outputPath, JSON.stringify(finalOutput, null, 2));
        console.log(`Data written to ${outputPath}`);
    } catch (err) {
        console.error('Failed to fetch and save packages:', err);
    }
}

fetchAndSavePackages();
