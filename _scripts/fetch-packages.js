const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

async function fetchAndSavePackages() {
    const devicesUrl = 'https://ping.bayton.org/items/device_packages?limit=-1';
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

            for (const pkgEntry of systemPackages) {
                const { packageName, appName } = pkgEntry;
                if (!packageName) continue;

                if (!result[packageName]) {
                    result[packageName] = {
                        namesByLocale: new Map(),
                        fallbackNames: [],
                        userFacing: false,
                        devices: new Set()
                    };
                }

                if (typeof appName === 'object' && appName !== null) {
                    const loc = appName.locale?.toLowerCase();
                    if (loc && typeof appName.value === 'string') {
                        result[packageName].namesByLocale.set(loc, appName.value);
                    }
                } else if (typeof appName === 'string') {
                    // Store the value directly for non-object appName, using empty string as locale key
                    result[packageName].namesByLocale.set('', appName);
                }

                // Track fallback names if no locale and value is string and not yet seen
                if (typeof appName === 'string' && !result[packageName].fallbackNames.includes(appName)) {
                    result[packageName].fallbackNames.push(appName);
                }

                if ('userFacing' in pkgEntry) {
                    result[packageName].userFacing ||= pkgEntry.userFacing === true;
                }

                result[packageName].devices.add(`${make}||${model}||${os}`);
            }
        }

        // Refactored output structure
        const finalOutput = {};
        for (const pkg of Object.keys(result).sort((a, b) => {
            const aName = (() => {
                const data = result[a];
                const nameMap = data.namesByLocale;
                const fallbackNames = data.fallbackNames;
                let preferredName;
                if (nameMap.has('en-us')) {
                    preferredName = nameMap.get('en-us');
                } else {
                    const fallback = Array.from(nameMap.entries()).find(([k]) => k.startsWith('en'));
                    if (fallback) {
                        preferredName = fallback[1];
                    } else if (fallbackNames.length > 0) {
                        preferredName = fallbackNames[0];
                    } else {
                        preferredName = Array.from(nameMap.values())[0] || a;
                    }
                }
                return preferredName || a;
            })();
            const bName = (() => {
                const data = result[b];
                const nameMap = data.namesByLocale;
                const fallbackNames = data.fallbackNames;
                let preferredName;
                if (nameMap.has('en-us')) {
                    preferredName = nameMap.get('en-us');
                } else {
                    const fallback = Array.from(nameMap.entries()).find(([k]) => k.startsWith('en'));
                    if (fallback) {
                        preferredName = fallback[1];
                    } else if (fallbackNames.length > 0) {
                        preferredName = fallbackNames[0];
                    } else {
                        preferredName = Array.from(nameMap.values())[0] || b;
                    }
                }
                return preferredName || b;
            })();
            return aName.localeCompare(bName);
        })) {
            const data = result[pkg];
            const nameMap = data.namesByLocale;
            const fallbackNames = data.fallbackNames;

            let preferredName;
            if (nameMap.has('en-us')) {
                preferredName = nameMap.get('en-us');
            } else {
                const fallback = Array.from(nameMap.entries()).find(([k]) => k.startsWith('en'));
                if (fallback) {
                    preferredName = fallback[1];
                } else if (fallbackNames.length > 0) {
                    preferredName = fallbackNames[0];
                } else {
                    preferredName = Array.from(nameMap.values())[0] || pkg;
                }
            }

            const seenNames = new Set();
            seenNames.add(preferredName);

            const additionalLocales = Array.from(nameMap.entries())
                .filter(([_, name]) => !seenNames.has(name))
                .map(([locale, name]) => {
                    seenNames.add(name);
                    return { locale, name };
                });

            for (const fallbackName of fallbackNames) {
                if (!seenNames.has(fallbackName)) {
                    additionalLocales.push({ locale: '', name: fallbackName });
                    seenNames.add(fallbackName);
                }
            }

            finalOutput[pkg] = {
                appName: preferredName,
                userFacing: data.userFacing,
                additionalLocales,
                devices: Array.from(data.devices).map(str => {
                    const [make, model, os] = str.split('||');
                    return { make, model, os };
                })
            };
        }

        fs.writeFileSync(outputPath, JSON.stringify(finalOutput, null, 2));
        console.log(`Data written to ${outputPath}`);

        // Output latest device info for use in commit messages
        if (rows.length > 0) {
        // Find the row with the latest date_time
        const latestDevice = rows.reduce((latest, row) => {
            if (!row.date_time) return latest;
            if (!latest) return row;
            // Compare ISO timestamps
            return new Date(row.date_time) > new Date(latest.date_time) ? row : latest;
        }, null);

        if (latestDevice) {
            const latestDeviceInfo = [
                latestDevice.make || 'UnknownMake',
                latestDevice.model || 'UnknownModel',
                latestDevice.os || 'UnknownOS'
            ].join(' | ');
            fs.writeFileSync(
                path.join(__dirname, '../_src/_data', 'latest-device.txt'),
                latestDeviceInfo
            );
            console.log(`Latest device: ${latestDeviceInfo}`);
        } else {
            console.log('No latest device found.');
        }
    }
    } catch (err) {
        console.error('Failed to fetch and save packages:', err);
    }
}

fetchAndSavePackages();
