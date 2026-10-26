// Fixed, read-only system-app service. No browser/native credentials are forwarded.
const ENDPOINT = 'https://sysapps.bayton.org/mcp';
const TOOLS = new Set(require('./mika-sysapps-tools').tools.map(tool => tool.name));

exports.executeSysappsCall = async function executeSysappsCall(toolName, args, { signal } = {}) {
  if (!TOOLS.has(toolName)) return { result: `Unknown sysapps tool: ${toolName}`, sources: [] };
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: toolName, arguments: toolName === 'sysapps_compare_devices' ? { diff_limit: 50, ...args } : toolName === 'sysapps_get_device_apps' ? { limit: 20, ...args } : args } }),
      signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(10000)]) : AbortSignal.timeout(10000),
    });
    if (!response.ok) return { result: `System apps API error: HTTP ${response.status}`, sources: [] };
    const data = await response.json();
    if (data.jsonrpc !== '2.0' || data.id !== 1 || data.error) {
      return { result: 'System apps lookup failed: service could not complete the lookup', sources: [] };
    }
    const content = data.result?.content;
    if (!Array.isArray(content) || content.length !== 1 || content.some(item => item.type !== 'text' || typeof item.text !== 'string')) {
      return { result: 'System apps lookup failed: invalid service response', sources: [] };
    }
    return {
      result: data.result.isError ? content[0].text.slice(0, 6000)
        : toolName === 'sysapps_compare_devices' ? boundedComparison(JSON.parse(content[0].text))
        : toolName === 'sysapps_get_package' ? boundedPackage(JSON.parse(content[0].text))
        : boundedCollection(JSON.parse(content[0].text)),
      sources: data.result.isError ? [] : [{ title: 'Android System App Database', url: 'https://sysapps.bayton.org/' }],
    };
  } catch (error) {
    if (signal?.aborted) throw signal.reason;
    return { result: `System apps lookup failed: ${error.message || 'timeout'}`, sources: [] };
  }
};

// Shared inventories are irrelevant to a difference request. Preserve identities and
// total counts, prioritise left-only rows, and make every omission explicit.
function boundedComparison(data) {
  const device = value => {
    if (!value || typeof value.make !== 'string' || typeof value.model !== 'string' || typeof value.os_api !== 'string') throw Error('invalid comparison device');
    const identity = { device_id: value.device_id, make: value.make, model: value.model, os_api: value.os_api };
    if (Number.isInteger(value.package_count) && value.package_count >= 0) identity.package_count = value.package_count;
    return identity;
  };
  const count = value => { if (!Number.isInteger(value) || value < 0) throw Error('invalid comparison count'); return value; };
  const packages = values => {
    if (!Array.isArray(values)) throw Error('invalid comparison packages');
    return values.map(value => {
      if (typeof value.package_name !== 'string' || typeof value.label !== 'string') throw Error('invalid comparison package');
      return { package_name: value.package_name, label: value.label };
    });
  };
  const view = {
    left: device(data.left), right: device(data.right),
    shared_count: count(data.shared_count), shared_items_status: 'omitted_by_design',
    left_only_count: count(data.left_only_count), right_only_count: count(data.right_only_count),
    left_only: packages(data.left_only), right_only: packages(data.right_only),
    left_only_returned: 0, right_only_returned: 0,
    left_only_truncated: false, right_only_truncated: false,
    scope: 'Observed contributed device records only. Absence is not a universal device or OEM claim.',
  };
  if (data.pagination) view.pagination = { ...data.pagination };
  const section = data.pagination?.section || 'all';
  if (section === 'shared') {
    view.shared = packages(data.shared);
    view.shared_items_status = 'requested';
  }
  view.section = section;
  if ([view.left.device_id, view.right.device_id].every(id => Number.isSafeInteger(id) && id > 0)) {
    view.comparison_url = `https://sysapps.bayton.org/compare?left=${view.left.device_id}&right=${view.right.device_id}`;
  }
  if (view.left_only.length > view.left_only_count || view.right_only.length > view.right_only_count) throw Error('inconsistent comparison counts');
  function serialize() {
    view.left_only_returned = view.left_only.length;
    view.right_only_returned = view.right_only.length;
    view.left_only_truncated = view.left_only.length < view.left_only_count;
    view.right_only_truncated = view.right_only.length < view.right_only_count;
    const localTrimmed = view.left_only.length < data.left_only.length || view.right_only.length < data.right_only.length || (view.shared && view.shared.length < data.shared.length);
    if (view.pagination && localTrimmed) {
      // A shared service offset would skip locally omitted rows. Continue each
      // requested section independently from the evidence actually delivered.
      view.pagination = { ...data.pagination, has_more: true, next_offset: null, next_after: null };
      for (const key of ['left_only', 'right_only', ...(view.shared ? ['shared'] : [])]) {
        if (view[key].length < data[key].length) view.pagination[`${key}_has_more`] = true;
      }
      view.context_truncated = true;
      view.continuations = {};
      for (const key of ['left_only', 'right_only', ...(view.shared ? ['shared'] : [])]) {
        if (section !== 'all' && section !== key) continue;
        const rows = view[key];
        const offset = data.pagination.offset || 0;
        if (rows.length < data[key].length || data.pagination[`${key}_has_more`] || offset + rows.length < view[`${key}_count`]) {
          view.continuations[key] = data.pagination.paging_mode === 'sql_cursor'
            ? { diff_section: key, diff_after: rows.length ? rows.at(-1).package_name : data.pagination.after || '', diff_limit: 10 }
            : { diff_section: key, diff_offset: offset + rows.length, diff_limit: 10 };
        }
      }
    }
    return JSON.stringify(view);
  }
  let result = serialize();
  while (result.length > 6000 && (view.left_only.length || view.right_only.length || view.shared?.length)) {
    if (view.shared?.length) view.shared.pop(); else if (view.right_only.length) view.right_only.pop(); else view.left_only.pop();
    result = serialize();
  }
  if (result.length > 6000 ||
      ((data.left_only.length + data.right_only.length + (view.shared ? data.shared.length : 0)) > 0 &&
       view.left_only.length + view.right_only.length + (view.shared?.length || 0) === 0)) {
    throw Error('comparison metadata or first row exceeds result limit; request a narrower lookup');
  }
  return result;
}

// Keep complete JSON, totals and a continuation based on rows actually supplied
// to the model. Never slice through a record or silently skip omitted evidence.
function boundedCollection(data) {
  const key = Array.isArray(data.items) ? 'items' : Array.isArray(data.apps) ? 'apps' : null;
  if (!key) throw Error('invalid collection response');
  const rows = [...data[key]];
  const view = { ...data, [key]: rows };
  const originalLength = rows.length;
  function serialize() {
    if (rows.length < originalLength) {
      const offset = data.offset ?? data.pagination?.offset ?? 0;
      view.context_truncated = true;
      view.context_omitted_rows = originalLength - rows.length;
      view.pagination = { ...data.pagination, has_more: true, next_offset: offset + rows.length, next_after: null };
    }
    return JSON.stringify(view);
  }
  let result = serialize();
  while (result.length > 6000 && rows.length) { rows.pop(); result = serialize(); }
  if (result.length > 6000 || (originalLength && !rows.length)) throw Error('collection metadata or first row exceeds result limit; request a narrower lookup');
  return result;
}

function boundedPackage(data) {
  if (typeof data.package_name !== 'string') return boundedCollection(data);
  const view = { ...data, package_url: `https://sysapps.bayton.org/packages/${encodeURIComponent(data.package_name)}` };
  // Guidance and explanatory intelligence take precedence over long inventories.
  // All removals are disclosed; callers can retrieve labels/presence separately.
  const arrays = ['labels', 'seen_on', 'appears_in'];
  for (const key of arrays) if (Array.isArray(view[key])) view[key] = [...view[key]];
  if (data.intelligence) view.intelligence = { ...data.intelligence };
  for (const key of ['permissions', 'signers']) if (Array.isArray(view.intelligence?.[key])) view.intelligence[key] = [...view.intelligence[key]];
  const groups = arrays.map(key => [view, key]).concat(['permissions', 'signers'].map(key => [view.intelligence, key]));
  let result = JSON.stringify(view);
  for (const [parent, key] of groups) {
    while (result.length > 6000 && parent?.[key]?.length) {
      parent[key].pop();
      view.context_omissions ||= {};
      view.context_omissions[key] = (view.context_omissions[key] || 0) + 1;
      result = JSON.stringify(view);
    }
  }
  if (result.length > 6000) throw Error('package guidance exceeds result limit; use the package source page');
  return result;
}
