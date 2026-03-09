/**
 * Shared helpers for querying the Android system-app dataset.
 *
 * Data source: _src/_data/packages.json
 */

const fs = require('node:fs/promises');
const path = require('node:path');

const PACKAGES_PATH = path.resolve(process.cwd(), '_src', '_data', 'packages.json');
const DEFAULT_PAGE_LIMIT = 25;
const MAX_PAGE_LIMIT = 100;
const DEFAULT_COMPARE_LIMIT = 50;
const MAX_COMPARE_LIMIT = 100;

let cachedData = null;

function normaliseMake(make) {
  return typeof make === 'string' ? make.trim().toLowerCase() : '';
}

function buildDeviceKey(make, model, os) {
  return `${normaliseMake(make)}|||${String(model).trim()}|||${String(os).trim()}`;
}

function parseJson(raw, fallbackMessage) {
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(fallbackMessage || 'System apps data is malformed.');
  }
}

function dedupeStringsPreserveOrder(values) {
  const seen = new Set();
  const deduped = [];

  for (const value of values) {
    if (typeof value !== 'string') {
      continue;
    }

    const trimmed = value.trim();
    if (!trimmed) {
      continue;
    }

    const key = trimmed.toLowerCase();
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    deduped.push(trimmed);
  }

  return deduped;
}

function sanitizeDevice(device) {
  if (!device || typeof device !== 'object') {
    return null;
  }

  const make = typeof device.make === 'string' ? device.make.trim() : '';
  const model = typeof device.model === 'string' ? device.model.trim() : '';
  const os = typeof device.os === 'string' ? device.os.trim() : '';

  if (!make || !model || !os) {
    return null;
  }

  return { make, model, os };
}

function parseInteger(value, name) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) {
    throw new Error(`Parameter "${name}" must be an integer.`);
  }

  return parsed;
}

function validatePaginationParams(params, options = {}) {
  const defaultLimit = options.defaultLimit ?? DEFAULT_PAGE_LIMIT;
  const maxLimit = options.maxLimit ?? MAX_PAGE_LIMIT;
  const allowUnpaged = Boolean(options.allowUnpaged);

  const hasLimit = params.limit !== undefined;
  const hasOffset = params.offset !== undefined;

  if (allowUnpaged && !hasLimit && !hasOffset) {
    return { paged: false, offset: 0, limit: null };
  }

  const limit = hasLimit ? parseInteger(params.limit, 'limit') : defaultLimit;
  const offset = hasOffset ? parseInteger(params.offset, 'offset') : 0;

  if (limit < 1 || limit > maxLimit) {
    throw new Error(`Parameter "limit" must be between 1 and ${maxLimit}.`);
  }

  if (offset < 0) {
    throw new Error('Parameter "offset" must be greater than or equal to 0.');
  }

  return { paged: true, offset, limit };
}

function validateRequiredString(value, name) {
  if (typeof value !== 'string' || value.trim().length < 1) {
    throw new Error(`Parameter "${name}" must be a non-empty string.`);
  }

  return value.trim();
}

function validateOptionalString(value) {
  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value !== 'string') {
    throw new Error('Optional filter parameters must be strings when provided.');
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function validateDeviceQueryParams(params) {
  return {
    make: validateRequiredString(params.make, 'make'),
    model: validateRequiredString(params.model, 'model'),
    os: validateRequiredString(params.os, 'os'),
  };
}

function validateDeviceListParams(params) {
  return {
    make: validateOptionalString(params.make),
    model: validateOptionalString(params.model),
    os: validateOptionalString(params.os),
  };
}

function validateSearchParams(params) {
  if (typeof params.query !== 'string' || params.query.trim().length < 2) {
    throw new Error('Parameter "query" must be a string with at least 2 characters.');
  }

  return { query: params.query.trim() };
}

function validateCompareParams(params) {
  return {
    left: {
      make: validateRequiredString(params.left_make, 'left_make'),
      model: validateRequiredString(params.left_model, 'left_model'),
      os: validateRequiredString(params.left_os, 'left_os'),
    },
    right: {
      make: validateRequiredString(params.right_make, 'right_make'),
      model: validateRequiredString(params.right_model, 'right_model'),
      os: validateRequiredString(params.right_os, 'right_os'),
    },
    diffLimit: params.diff_limit === undefined ? DEFAULT_COMPARE_LIMIT : parseInteger(params.diff_limit, 'diff_limit'),
  };
}

function compareDevices(a, b) {
  const makeCmp = a.make.localeCompare(b.make, undefined, { sensitivity: 'base' });
  if (makeCmp !== 0) {
    return makeCmp;
  }

  const modelCmp = a.model.localeCompare(b.model, undefined, { sensitivity: 'base' });
  if (modelCmp !== 0) {
    return modelCmp;
  }

  return a.os.localeCompare(b.os, undefined, { numeric: true, sensitivity: 'base' });
}

function formatPackageEntry(pkg) {
  return {
    packageName: pkg.packageName,
    appName: pkg.appName,
    userFacing: pkg.userFacing,
    aliases: pkg.aliases,
    devices: pkg.devices,
  };
}

function withPaging(items, page) {
  const total = items.length;

  if (!page.paged) {
    return {
      total,
      returned: items.length,
      offset: 0,
      limit: null,
      hasMore: false,
      nextOffset: null,
      items,
    };
  }

  const start = page.offset;
  const end = start + page.limit;
  const sliced = items.slice(start, end);
  const hasMore = end < total;

  return {
    total,
    returned: sliced.length,
    offset: page.offset,
    limit: page.limit,
    hasMore,
    nextOffset: hasMore ? page.offset + sliced.length : null,
    items: sliced,
  };
}

async function loadSystemAppData() {
  if (cachedData) {
    return cachedData;
  }

  let raw;
  try {
    raw = await fs.readFile(PACKAGES_PATH, 'utf8');
  } catch (error) {
    throw new Error('System apps dataset is unavailable. Ensure the repository data is present.');
  }

  const parsed = parseJson(raw, 'System apps dataset is malformed.');
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('System apps dataset is invalid. Expected an object keyed by package name.');
  }

  const deviceMap = new Map();
  const packageMap = new Map();

  for (const [packageName, rawEntry] of Object.entries(parsed)) {
    if (typeof packageName !== 'string' || packageName.trim().length < 1) {
      continue;
    }

    const entry = rawEntry && typeof rawEntry === 'object' ? rawEntry : {};
    const appName = typeof entry.appName === 'string' && entry.appName.trim()
      ? entry.appName.trim()
      : packageName;
    const userFacing = Boolean(entry.userFacing);

    const aliases = dedupeStringsPreserveOrder(
      Array.isArray(entry.additionalLocales)
        ? entry.additionalLocales.map(locale => (locale && typeof locale.name === 'string' ? locale.name : ''))
        : []
    );

    const rawDevices = Array.isArray(entry.devices) ? entry.devices : [];
    const packageDeviceMap = new Map();

    for (const rawDevice of rawDevices) {
      const device = sanitizeDevice(rawDevice);
      if (!device) {
        continue;
      }

      const key = buildDeviceKey(device.make, device.model, device.os);

      if (!packageDeviceMap.has(key)) {
        packageDeviceMap.set(key, device);
      }

      if (!deviceMap.has(key)) {
        deviceMap.set(key, {
          make: device.make,
          model: device.model,
          os: device.os,
          apps: [],
        });
      }

      deviceMap.get(key).apps.push(packageName);
    }

    const devices = Array.from(packageDeviceMap.values()).sort(compareDevices);
    const searchText = [packageName, appName, aliases.join(' ')].join('\n').toLowerCase();

    packageMap.set(packageName, {
      packageName,
      appName,
      userFacing,
      aliases,
      devices,
      searchText,
    });
  }

  const packages = Array.from(packageMap.values()).sort((a, b) =>
    a.packageName.localeCompare(b.packageName, undefined, { sensitivity: 'base' })
  );

  const deviceList = Array.from(deviceMap.values())
    .map(device => ({
      make: device.make,
      model: device.model,
      os: device.os,
      apps: Array.from(new Set(device.apps)).sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: 'base' })
      ),
    }))
    .sort(compareDevices);

  const packageLookup = new Map(packages.map(pkg => [pkg.packageName, pkg]));
  const deviceLookup = new Map(deviceList.map(device => [buildDeviceKey(device.make, device.model, device.os), device]));

  cachedData = {
    packages,
    packageLookup,
    devices: deviceList,
    deviceLookup,
  };

  return cachedData;
}

async function listSystemAppDevices(params) {
  const filters = validateDeviceListParams(params);
  const page = validatePaginationParams(params, { allowUnpaged: false });
  const data = await loadSystemAppData();

  const filtered = data.devices.filter(device => {
    if (filters.make && normaliseMake(device.make) !== normaliseMake(filters.make)) {
      return false;
    }

    if (filters.model && device.model !== filters.model) {
      return false;
    }

    if (filters.os && device.os !== filters.os) {
      return false;
    }

    return true;
  });

  const paged = withPaging(filtered, page);

  return {
    totalMatches: paged.total,
    returned: paged.returned,
    offset: paged.offset,
    limit: paged.limit,
    hasMore: paged.hasMore,
    nextOffset: paged.nextOffset,
    devices: paged.items.map(device => ({
      make: device.make,
      model: device.model,
      os: device.os,
      appCount: device.apps.length,
    })),
  };
}

async function getDeviceSystemApps(params) {
  const deviceQuery = validateDeviceQueryParams(params);
  const page = validatePaginationParams(params, { allowUnpaged: true });
  const data = await loadSystemAppData();

  const deviceKey = buildDeviceKey(deviceQuery.make, deviceQuery.model, deviceQuery.os);
  const device = data.deviceLookup.get(deviceKey);

  if (!device) {
    const message = `No system app data found for device: ${deviceQuery.make} / ${deviceQuery.model} / ${deviceQuery.os}`;
    const error = new Error(message);
    error.code = 'NOT_FOUND';
    throw error;
  }

  const appRecords = device.apps
    .map(packageName => data.packageLookup.get(packageName))
    .filter(Boolean)
    .map(formatPackageEntry);

  const paged = withPaging(appRecords, page);

  return {
    device: {
      make: device.make,
      model: device.model,
      os: device.os,
    },
    totalApps: paged.total,
    returned: paged.returned,
    offset: paged.offset,
    limit: paged.limit,
    hasMore: paged.hasMore,
    nextOffset: paged.nextOffset,
    apps: paged.items,
  };
}

async function searchSystemApps(params) {
  const { query } = validateSearchParams(params);
  const page = validatePaginationParams(params, { allowUnpaged: false });
  const data = await loadSystemAppData();

  const term = query.toLowerCase();
  const matches = data.packages.filter(pkg => pkg.searchText.includes(term));
  const paged = withPaging(matches, page);

  return {
    totalMatches: paged.total,
    returned: paged.returned,
    offset: paged.offset,
    limit: paged.limit,
    hasMore: paged.hasMore,
    nextOffset: paged.nextOffset,
    results: paged.items.map(formatPackageEntry),
  };
}

async function compareDeviceSystemApps(params) {
  const validated = validateCompareParams(params);

  if (validated.diffLimit < 1 || validated.diffLimit > MAX_COMPARE_LIMIT) {
    throw new Error(`Parameter "diff_limit" must be between 1 and ${MAX_COMPARE_LIMIT}.`);
  }

  const data = await loadSystemAppData();

  const leftKey = buildDeviceKey(validated.left.make, validated.left.model, validated.left.os);
  const rightKey = buildDeviceKey(validated.right.make, validated.right.model, validated.right.os);

  const leftDevice = data.deviceLookup.get(leftKey);
  const rightDevice = data.deviceLookup.get(rightKey);

  if (!leftDevice) {
    const error = new Error(`No system app data found for left device: ${validated.left.make} / ${validated.left.model} / ${validated.left.os}`);
    error.code = 'NOT_FOUND';
    throw error;
  }

  if (!rightDevice) {
    const error = new Error(`No system app data found for right device: ${validated.right.make} / ${validated.right.model} / ${validated.right.os}`);
    error.code = 'NOT_FOUND';
    throw error;
  }

  const leftSet = new Set(leftDevice.apps);
  const rightSet = new Set(rightDevice.apps);

  const shared = leftDevice.apps.filter(pkg => rightSet.has(pkg));
  const leftOnly = leftDevice.apps.filter(pkg => !rightSet.has(pkg));
  const rightOnly = rightDevice.apps.filter(pkg => !leftSet.has(pkg));

  return {
    left: {
      make: leftDevice.make,
      model: leftDevice.model,
      os: leftDevice.os,
      totalApps: leftDevice.apps.length,
    },
    right: {
      make: rightDevice.make,
      model: rightDevice.model,
      os: rightDevice.os,
      totalApps: rightDevice.apps.length,
    },
    sharedCount: shared.length,
    leftOnlyCount: leftOnly.length,
    rightOnlyCount: rightOnly.length,
    sharedSample: shared.slice(0, validated.diffLimit),
    diffLimit: validated.diffLimit,
    leftOnly: leftOnly.slice(0, validated.diffLimit),
    rightOnly: rightOnly.slice(0, validated.diffLimit),
    leftOnlyHasMore: leftOnly.length > validated.diffLimit,
    rightOnlyHasMore: rightOnly.length > validated.diffLimit,
  };
}

function resetCache() {
  cachedData = null;
}

module.exports = {
  compareDeviceSystemApps,
  getDeviceSystemApps,
  listSystemAppDevices,
  loadSystemAppData,
  resetCache,
  searchSystemApps,
};
