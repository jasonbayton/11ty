// Fixed, read-only system-app service. No browser/native credentials are forwarded.
const ENDPOINT = 'https://sysapps.bayton.org/mcp';
const TOOLS = new Set(['sysapps_search', 'sysapps_list_devices', 'sysapps_get_device_apps', 'sysapps_compare_devices']);

exports.executeSysappsCall = async function executeSysappsCall(toolName, args) {
  if (!TOOLS.has(toolName)) return { result: `Unknown sysapps tool: ${toolName}`, sources: [] };
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: toolName, arguments: toolName === 'sysapps_compare_devices' ? { ...args, diff_limit: 50 } : args } }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return { result: `System apps API error: HTTP ${response.status}`, sources: [] };
    const data = await response.json();
    if (data.jsonrpc !== '2.0' || data.id !== 1 || data.error) {
      return { result: 'System apps lookup failed: service could not complete the lookup', sources: [] };
    }
    const content = data.result?.content;
    if (!Array.isArray(content) || !content.length || (toolName === 'sysapps_compare_devices' && content.length !== 1) || content.some(item => item.type !== 'text' || typeof item.text !== 'string')) {
      return { result: 'System apps lookup failed: invalid service response', sources: [] };
    }
    return {
      result: content.map(item => {
        // Compact the richer API DTO before applying the existing context cap.
        if (toolName === 'sysapps_compare_devices' && !data.result.isError) return boundedComparison(JSON.parse(item.text));
        try { return JSON.stringify(JSON.parse(item.text)); } catch { return item.text; }
      }).join('\n').slice(0, 6000),
      sources: data.result.isError ? [] : [{ title: 'Android System App Database', url: 'https://sysapps.bayton.org/' }],
    };
  } catch (error) {
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
  if ([view.left.device_id, view.right.device_id].every(id => Number.isSafeInteger(id) && id > 0)) {
    view.comparison_url = `https://sysapps.bayton.org/compare?left=${view.left.device_id}&right=${view.right.device_id}`;
  }
  if (view.left_only.length > view.left_only_count || view.right_only.length > view.right_only_count) throw Error('inconsistent comparison counts');
  function serialize() {
    view.left_only_returned = view.left_only.length;
    view.right_only_returned = view.right_only.length;
    view.left_only_truncated = view.left_only.length < view.left_only_count;
    view.right_only_truncated = view.right_only.length < view.right_only_count;
    return JSON.stringify(view);
  }
  let result = serialize();
  while (result.length > 6000 && (view.left_only.length || view.right_only.length)) {
    if (view.right_only.length) view.right_only.pop(); else view.left_only.pop();
    result = serialize();
  }
  if (result.length > 6000) throw Error('comparison metadata exceeds result limit');
  return result;
}
