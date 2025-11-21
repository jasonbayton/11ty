const packages = require('./packages.json');
const deviceMap = {};

for (const [pkg, entry] of Object.entries(packages)) {
  for (const device of entry.devices) {
    const normalisedMake = typeof device.make === 'string'
      ? device.make.toLowerCase()
      : device.make;

    const key = `${normalisedMake}|||${device.model}|||${device.os}`;
    if (!deviceMap[key]) {
      deviceMap[key] = {
        make: normalisedMake,
        model: device.model,
        os: device.os,
        apps: []
      };
    }
    deviceMap[key].apps.push(pkg);
  }
}

// Return as an array, sorted for consistent rendering
module.exports = Object.values(deviceMap).sort((a, b) => {
  if (a.make === b.make) {
    if (a.model === b.model) return a.os.localeCompare(b.os, undefined, {numeric:true});
    return a.model.localeCompare(b.model);
  }
  return a.make.localeCompare(b.make);
});