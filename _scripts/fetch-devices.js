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

    // Get the current time (ms) and thresholds
    const now = new Date();
    const NOW_MS = now.getTime();
    const DAY_MS = 24 * 60 * 60 * 1000;
    const NINETY_DAYS_MS = 90 * DAY_MS;

    // ---- helpers ----
    const getTime = (s) => {
      if (!s) return null;
      const d = new Date(s);
      const t = d.getTime();
      return Number.isNaN(t) ? null : t;
    };

    const mostRecentActivityMs = (device) => {
      const u = getTime(device.date_updated);
      const c = getTime(device.date_created);
      const t = Math.max(u ?? -Infinity, c ?? -Infinity);
      return Number.isFinite(t) ? t : null;
    };

    const withinMs = (timestampMs, windowMs) => {
      if (timestampMs == null) return false;
      // Clamp future timestamps to 'now'
      const ageMs = Math.max(0, NOW_MS - timestampMs);
      return ageMs <= windowMs;
    };

    const countByField = (devices, field) =>
      devices.reduce((acc, device) => {
        const key = device[field] || 'Unknown';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

    const countByCountry = (devices) =>
      devices.reduce((acc, device) => {
        const country = (device.countryCode || 'Unknown').toUpperCase();
        acc[country] = (acc[country] || 0) + 1;
        return acc;
      }, {});

    const sortCountsDesc = (counts) =>
      Object.fromEntries(
        Object.entries(counts).sort(([, a], [, b]) => b - a)
      );

    // ---- core processor (patched) ----
    function processDevices(devices) {
      // De-dupe by device.id while building 90-day set
      const seenIds = new Set();

      const nonStaleRecentDevices = devices.filter((device) => {
        if (!device?.id) return false;

        const t = mostRecentActivityMs(device);
        if (t == null) return false;

        const isWithin90 = withinMs(t, NINETY_DAYS_MS);
        if (!isWithin90) return false;

        if (seenIds.has(device.id)) return false;
        seenIds.add(device.id);
        return true;
      });

      // 24h set: based on the most recent of created/updated (as requested)
      const recent24hDevices = nonStaleRecentDevices.filter((device) => {
        const t = mostRecentActivityMs(device);
        return withinMs(t, DAY_MS);
      });

      // Aggregations
      const totalNonStaleRecentDevices = nonStaleRecentDevices.length;
      const totalRecent24hDevices = recent24hDevices.length;

      const devicesByOS = sortCountsDesc(countByField(nonStaleRecentDevices, 'os'));
      const devicesByMake = sortCountsDesc(countByField(nonStaleRecentDevices, 'make'));
      const devicesByCountry = sortCountsDesc(countByCountry(nonStaleRecentDevices));

      return {
        totalNonStaleRecentDevices,
        totalRecent24hDevices,
        totalLicensedDevices: 0, // License validation removed - always 0
        devicesByOS,
        devicesByMake,
        devicesByCountry,
        numberChangeByOS: {},
        numberChangeByMake: {},
        numberChangeByCountry: {}
      };
    }

    // Process devices for each service
    const managedSettingsDevices = devicesData.filter(d => d.service === 'managed-settings');
    const packageSearchDevices = devicesData.filter(d => d.service === 'package-search');
    const managedInfoDevices = devicesData.filter(d => d.service === 'managed-info');

    const managedSettingsResult = processDevices(managedSettingsDevices);
    const packageSearchResult = processDevices(packageSearchDevices);
    const managedInfoResult = processDevices(managedInfoDevices);

    // Read the previous day's data (if present)
    let previousData = null;
    if (fs.existsSync(outputPath)) {
      previousData = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
    }

    // Calculate number change for OS, make, and country against previous snapshot
    if (previousData) {
      ['managedSettings', 'packageSearch', 'managedInfo'].forEach((service) => {
        const currentData =
          service === 'managedSettings' ? managedSettingsResult
            : service === 'packageSearch' ? packageSearchResult
              : managedInfoResult;

        const prevData = previousData[service] || {};
        const prevOS = prevData.devicesByOS || {};
        const prevMake = prevData.devicesByMake || {};
        const prevCountry = prevData.devicesByCountry || {};

        const allOS = new Set([...Object.keys(currentData.devicesByOS), ...Object.keys(prevOS)]);
        for (const os of allOS) {
          const previousCount = prevOS[os] || 0;
          const currentCount = currentData.devicesByOS[os] || 0;
          currentData.numberChangeByOS[os] = currentCount - previousCount;
        }

        const allMakes = new Set([...Object.keys(currentData.devicesByMake), ...Object.keys(prevMake)]);
        for (const make of allMakes) {
          const previousCount = prevMake[make] || 0;
          const currentCount = currentData.devicesByMake[make] || 0;
          currentData.numberChangeByMake[make] = currentCount - previousCount;
        }

        const allCountries = new Set([...Object.keys(currentData.devicesByCountry), ...Object.keys(prevCountry)]);
        for (const country of allCountries) {
          const previousCount = prevCountry[country] || 0;
          const currentCount = currentData.devicesByCountry[country] || 0;
          currentData.numberChangeByCountry[country] = currentCount - previousCount;
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
      const managedSettingsDiff =
        managedSettingsResult.totalNonStaleRecentDevices - (previousData.managedSettings?.totalNonStaleRecentDevices || 0);
      const packageSearchDiff =
        packageSearchResult.totalNonStaleRecentDevices - (previousData.packageSearch?.totalNonStaleRecentDevices || 0);
      const managedInfoDiff =
        managedInfoResult.totalNonStaleRecentDevices - (previousData.managedInfo?.totalNonStaleRecentDevices || 0);

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