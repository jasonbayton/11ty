const test = require('node:test');
const assert = require('node:assert/strict');
const { executeSysappsCall } = require('../netlify/functions/_shared/mika-sysapps');

const originalFetch = global.fetch;
test.afterEach(() => { global.fetch = originalFetch; });
const response = content => ({ ok: true, json: async () => ({ jsonrpc: '2.0', id: 1, result: { content: [{ type: 'text', text: content }] } }) });
for (const [name, args] of [
  ['sysapps_search', { query: 'oem:Oukitel label:camera' }],
  ['sysapps_list_devices', { make: 'Oukitel' }],
  ['sysapps_get_device_apps', { make: 'OUKITEL', model: 'WP60', os: '35' }],
]) {
  test(`${name} uses the dedicated service without forwarding credentials`, async () => {
    let calls = 0;
    global.fetch = async (url, options) => {
      calls++;
      assert.equal(url, 'https://sysapps.bayton.org/mcp');
      assert.equal(options.method, 'POST');
      assert.deepEqual(options.headers, { 'Content-Type': 'application/json', Accept: 'application/json' });
      assert.deepEqual(JSON.parse(options.body), { jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name, arguments: name === 'sysapps_get_device_apps' ? { limit: 20, ...args } : args } });
      assert.ok(options.signal instanceof AbortSignal);
      return response('{"items":[]}');
    };
    const result = await executeSysappsCall(name, args);
    assert.equal(calls, 1);
    assert.equal(result.result, '{"items":[]}');
    assert.deepEqual(result.sources, [{ title: 'Android System App Database', url: 'https://sysapps.bayton.org/' }]);
  });
}
test('malformed tool text cannot become cited evidence', async () => {
  global.fetch = async () => response('x'.repeat(8000));
  assert.deepEqual((await executeSysappsCall('sysapps_search', {})).sources, []);
});
test('does not call arbitrary MCP tools', async () => {
  global.fetch = async () => { throw new Error('must not fetch'); };
  assert.deepEqual((await executeSysappsCall('tools/list', {})).sources, []);
});
for (const [name, fake] of [
  ['HTTP 429', async () => ({ ok: false, status: 429 })],
  ['network timeout', async () => { throw new Error('timeout'); }],
  ['malformed JSON', async () => ({ ok: true, json: async () => { throw new Error('invalid JSON'); } })],
  ['RPC error', async () => ({ ok: true, json: async () => ({ jsonrpc: '2.0', id: 1, error: { message: 'failed' } }) })],
  ['tool error', async () => ({ ok: true, json: async () => ({ jsonrpc: '2.0', id: 1, result: { isError: true } }) })],
  ['wrong response ID', async () => ({ ok: true, json: async () => ({ jsonrpc: '2.0', id: 2, result: { content: [] } }) })],
  ['unexpected response', async () => ({ ok: true, json: async () => ({}) })],
]) {
  test(`${name} remains a soft lookup failure with no sources or retries`, async () => {
    let calls = 0;
    global.fetch = async (...args) => { calls++; return fake(...args); };
    const result = await executeSysappsCall('sysapps_search', { query: 'camera' });
    assert.equal(calls, 1);
    assert.deepEqual(result.sources, []);
    assert.match(result.result, /System apps/);
  });
}

const comparison = () => ({
  left: { device_id: 1, make: 'Dell', model: 'XPS', os_api: '36', package_count: 302 },
  right: { device_id: 2, make: 'Google', model: 'Pixel 9', os_api: '35', package_count: 301 },
  shared_count: 300, left_only_count: 2, right_only_count: 1,
  shared: Array.from({length:50}, (_, i) => ({package_name:`shared.${i}`, label:'Shared'.repeat(80)})),
  left_only: [{package_name:'dell.one',label:'Dell one'}, {package_name:'dell.two',label:'Dell two'}],
  right_only: [{package_name:'pixel.one',label:'Pixel one'}],
});
const compareArgs = { left_make:'Dell',left_model:'XPS',left_os:'36',right_make:'Google',right_model:'Pixel 9',right_os:'35' };
test('comparison preserves exact device direction and unique packages rather than filling the cap with shared rows', async () => {
  global.fetch = async (url, options) => {
    const call = JSON.parse(options.body);
    assert.equal(call.params.name, 'sysapps_compare_devices');
    assert.deepEqual(call.params.arguments, { ...compareArgs, diff_limit:50 });
    return response(JSON.stringify(comparison()));
  };
  const result = await executeSysappsCall('sysapps_compare_devices', compareArgs);
  const data = JSON.parse(result.result);
  assert.equal(data.left.make, 'Dell'); assert.equal(data.right.model, 'Pixel 9');
  assert.equal(data.left.package_count,302); assert.equal(data.right.package_count,301);
  assert.deepEqual(data.left_only, comparison().left_only);
  assert.equal(data.comparison_url,'https://sysapps.bayton.org/compare?left=1&right=2');
  assert.equal(data.shared_count,300); assert.equal(data.shared,undefined);
  assert.equal(data.shared_items_status,'omitted_by_design');
  assert.equal(data.left_only_truncated,false); assert.equal(data.right_only_truncated,false);
});
test('comparison cap retains valid JSON, full totals and explicit returned/truncated flags', async () => {
  const data = comparison();
  data.left_only_count = 250; data.right_only_count = 200;
  data.left_only = Array.from({length:50}, (_, i) => ({package_name:`dell.${i}`,label:'Long label '.repeat(20)}));
  data.right_only = Array.from({length:50}, (_, i) => ({package_name:`pixel.${i}`,label:'Long label '.repeat(20)}));
  global.fetch = async () => response(JSON.stringify(data));
  const result = await executeSysappsCall('sysapps_compare_devices', compareArgs);
  assert.ok(result.result.length <= 6000);
  const view = JSON.parse(result.result);
  assert.equal(view.left_only_count,250); assert.equal(view.right_only_count,200);
  assert.equal(view.left_only_truncated,true); assert.equal(view.right_only_truncated,true);
  assert.equal(view.left_only_returned,view.left_only.length);
  assert.equal(view.right_only_returned,view.right_only.length);
  assert.ok(view.left_only.length > 0); assert.equal(view.right_only.length,0);
  assert.deepEqual(view.left_only[0],data.left_only[0]);
});
test('malformed comparison cannot become cited evidence', async () => {
  global.fetch = async () => response('{"left":null}');
  const result = await executeSysappsCall('sysapps_compare_devices', compareArgs);
  assert.deepEqual(result.sources,[]);
});

test('large collection pages preserve JSON, totals and a continuation without skipping locally omitted rows', async () => {
  const items = Array.from({ length: 25 }, (_, i) => ({ package_name: `package.${i}`, label: 'Long '.repeat(100) }));
  global.fetch = async () => response(JSON.stringify({ items, total: 200, limit: 25, offset: 30,
    pagination: { paging_mode: 'sql_offset', has_more: true, next_offset: 55 } }));
  const result = await executeSysappsCall('sysapps_search', { query: 'package', offset: 30 });
  assert.ok(result.result.length <= 6000);
  const data = JSON.parse(result.result);
  assert.equal(data.total, 200);
  assert.ok(data.items.length > 0 && data.items.length < 25);
  assert.equal(data.context_omitted_rows, 25 - data.items.length);
  assert.equal(data.pagination.next_offset, 30 + data.items.length);
  assert.equal(data.pagination.has_more, true);
  assert.deepEqual(data.items, items.slice(0, data.items.length));
});
test('an oversized first collection row fails softly rather than issuing a non-advancing continuation', async () => {
  global.fetch = async () => response(JSON.stringify({ items: [{ label: 'x'.repeat(7000) }], total: 1, offset: 0 }));
  const result = await executeSysappsCall('sysapps_search', { query: 'large' });
  assert.deepEqual(result.sources, []);
  assert.match(result.result, /narrower lookup/);
});
test('comparison passes through explicit paging and retains safe per-section continuation on context trimming', async () => {
  const data = comparison();
  data.left_only_count = 250; data.right_only_count = 200;
  data.left_only = Array.from({ length: 50 }, (_, i) => ({ package_name: `dell.${i}`, label: 'Long label '.repeat(20) }));
  data.right_only = Array.from({ length: 50 }, (_, i) => ({ package_name: `pixel.${i}`, label: 'Long label '.repeat(20) }));
  data.pagination = { section: 'all', paging_mode: 'sql_offset', offset: 100, next_offset: 150, has_more: true };
  global.fetch = async (_, options) => {
    assert.deepEqual(JSON.parse(options.body).params.arguments, { ...compareArgs, diff_limit: 100, diff_offset: 100 });
    return response(JSON.stringify(data));
  };
  const view = JSON.parse((await executeSysappsCall('sysapps_compare_devices', { ...compareArgs, diff_limit: 100, diff_offset: 100 })).result);
  assert.equal(view.pagination.next_offset, null);
  assert.equal(view.continuations.left_only.diff_offset, 100 + view.left_only.length);
  assert.equal(view.continuations.right_only.diff_offset, 100 + view.right_only.length);
  assert.equal(view.continuations.right_only.diff_section, 'right_only');
});
test('an explicitly requested shared comparison page is not omitted and retains service cursor', async () => {
  const data = comparison();
  data.shared = [{ package_name: 'shared.one', label: 'Shared one' }];
  data.left_only = []; data.right_only = [];
  data.pagination = { section: 'shared', paging_mode: 'sql_cursor', after: '', next_after: 'shared.one', next_offset: null, has_more: true };
  global.fetch = async () => response(JSON.stringify(data));
  const view = JSON.parse((await executeSysappsCall('sysapps_compare_devices', { ...compareArgs, diff_section: 'shared', diff_after: '' })).result);
  assert.deepEqual(view.shared, data.shared);
  assert.equal(view.shared_items_status, 'requested');
  assert.equal(view.pagination.next_after, 'shared.one');
});
test('package guidance and intelligence survive bounded detail with explicit inventory omissions', async () => {
  const data = { package_name: 'com.example.app', guidance: { summary: 'A curated explanation.' }, intelligence: { insights: ['Observed signing evidence.'], permissions: [] },
    seen_on: Array.from({ length: 100 }, (_, i) => ({ model: `Device ${i} ` + 'x'.repeat(100) })), labels: [] };
  global.fetch = async (_, options) => {
    assert.equal(JSON.parse(options.body).params.name, 'sysapps_get_package');
    return response(JSON.stringify(data));
  };
  const result = await executeSysappsCall('sysapps_get_package', { package_name: 'com.example.app' });
  assert.ok(result.result.length <= 6000);
  const view = JSON.parse(result.result);
  assert.deepEqual(view.guidance, data.guidance);
  assert.deepEqual(view.intelligence.insights, data.intelligence.insights);
  assert.ok(view.context_omissions.seen_on > 0);
  assert.equal(view.package_url, 'https://sysapps.bayton.org/packages/com.example.app');
});

test('locally trimmed terminal cursor pages advertise remaining evidence and advance by emitted package names', async () => {
  const data = comparison();
  data.left_only = []; data.right_only = [];
  data.shared = Array.from({ length: 20 }, (_, i) => ({ package_name: `shared.${i}`, label: 'Long label '.repeat(30) }));
  data.pagination = { section: 'shared', paging_mode: 'sql_cursor', after: 'previous', has_more: false, shared_has_more: false, next_after: null, next_offset: null };
  global.fetch = async () => response(JSON.stringify(data));
  const view = JSON.parse((await executeSysappsCall('sysapps_compare_devices', { ...compareArgs, diff_section: 'shared', diff_after: 'previous' })).result);
  assert.equal(view.pagination.has_more, true);
  assert.equal(view.pagination.shared_has_more, true);
  assert.equal(view.continuations.shared.diff_after, view.shared.at(-1).package_name);
  assert.ok(view.shared.length > 0 && view.shared.length < data.shared.length);
});
test('a comparison row larger than the context cap fails softly rather than looping the same cursor', async () => {
  const data = comparison();
  data.left_only = []; data.right_only = [];
  data.shared = [{ package_name: 'shared.first', label: 'x'.repeat(7000) }];
  data.pagination = { section: 'shared', paging_mode: 'sql_cursor', after: 'previous', has_more: false };
  global.fetch = async () => response(JSON.stringify(data));
  const result = await executeSysappsCall('sysapps_compare_devices', { ...compareArgs, diff_section: 'shared', diff_after: 'previous' });
  assert.deepEqual(result.sources, []);
  assert.match(result.result, /narrower lookup/);
});
