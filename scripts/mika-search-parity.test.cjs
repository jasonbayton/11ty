const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const root = path.resolve(__dirname, '..');
const baseline = path.join(__dirname, 'fixtures/mika-baseline');
const current = path.join(root, 'netlify/functions');
const queries = [
  'What is the difference between fully managed and a work profile?',
  'zero touch', 'zero-touch', 'Android Enterprise', 'Android', 'policy',
  'Is zero-touch limited to Android Enterprise Recommended devices?',
  'COPE Android 11', 'Knox KME', 'custom DPC AMAPI', 'OEMConfig',
  'Workspace ONE patch deployment', 'ws1', 'airwatch', 'omnissa', 'intune',
  'mobileiron', 'maas360', 'hexnode', 'scalefusion', 'café', '日本語',
  'com.google.android.gms', 'C++', 'wifi (EAP)', 'no-such-term-314159',
  'fully managed work profile', 'work profile fully managed', 'hello',
];
function load(file, { year = 2026, env = {}, logs = [] } = {}) {
  const mod = { exports: {} };
  class Clock extends Date {
    constructor(...args) { super(...(args.length ? args : [`${year}-01-01T00:00:00Z`])); }
    static now() { return Date.parse(`${year}-01-01T00:00:00Z`); }
  }
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), {
    module: mod, exports: mod.exports, require: createRequire(file),
    process: { env, cwd: () => root }, Date: Clock, URL, Buffer, AbortSignal, Response,
    console: { info: (...args) => logs.push(args) },
  }, { filename: file });
  return mod.exports;
}
const synthetic = [
  { title: 'Android title-only', url: '/android/title-only/', content: 'x'.repeat(1400), date: '2026-01-01' },
  { title: 'Empty Android', url: '/android/empty/', content: '', date: '2026-01-01' },
  ...[0, 299, 300, 301, 1000].map(n => ({ title: `Boundary ${n}`, url: `/android/boundary-${n}/`, content: 'x'.repeat(n) + ' Android work profile fully managed ' + 'y'.repeat(1500), date: '2026-01-01' })),
  ...Array.from({ length: 45 }, (_, n) => ({ title: 'Android tied', url: `/android/tie-${n}/`, content: 'Android work profile zero-touch policy café 日本語 com.google.android.gms', date: '2026-01-01' })),
  { title: 'Old blog', url: '/blog/2020/old/', content: 'Android work profile fully managed policy Workspace ONE airwatch ws1 omnissa', date: '2020-01-01' },
  { title: 'New blog', url: '/blog/2026/new/', content: 'Android fully managed work profile intune microsoft endpoint', date: '2026-01-01' },
  { title: 'Duplicate URL', url: '/android/tie-1/', content: 'Android work profile policy' },
];
function parity(raw, label) {
  let comparisons = 0;
  for (const year of [2025, 2026, 2027]) {
    const old = load(path.join(baseline, 'content-index.cjs'), { year });
    const next = load(path.join(current, '_shared/content-index.js'), { year });
    const docs = old.buildSearchView(raw);
    for (const query of queries) for (const limit of [1, 2, 4, 5, 8, 10, 20, 30]) {
      assert.equal(JSON.stringify(next.searchDocs(docs, query, limit)), JSON.stringify(old.searchDocs(docs, query, limit)), `${label}: ${year}, ${query}, limit ${limit}`);
      comparisons++;
    }
  }
  return comparisons;
}
test('independent baseline matches exact results across fallback, ties, boundaries, aliases and years', () => {
  assert.equal(parity(synthetic, 'synthetic'), queries.length * 8 * 3);
});
const indexPath = process.env.MIKA_PARITY_INDEX || path.join(root, '_public/search-index.json');
test('generated full index matches the independent baseline at every query and limit', { skip: !fs.existsSync(indexPath) }, () => {
  const old = load(path.join(baseline, 'content-index.cjs'));
  assert.equal(parity(old.parseIndex(fs.readFileSync(indexPath, 'utf8')), 'full index'), queries.length * 8 * 3);
});
async function transcript(handlerPath, index, docs, message, native, mikaProgress) {
  const model = [];
  const env = { OPENAI_API_KEY: 'synthetic-provider-key', MIKA_NATIVE_ENABLED: 'true' };
  const nativePolicy = load(path.join(current, '_shared/native-mika.js'), { env });
  let turn = 0;
  class OpenAI {
    constructor(options) {
      model.push({ constructor: JSON.parse(JSON.stringify(options)) });
      this.chat = { completions: { create: async (params, options) => {
        model.push(JSON.parse(JSON.stringify({ params, options })));
        if (turn++ === 0) return { choices: [{ finish_reason: 'tool_calls', message: { role: 'assistant', tool_calls: [{ id: 'search', type: 'function', function: { name: 'search_bayton', arguments: JSON.stringify({ query: 'Android work profile' }) } }] } }] };
        return { choices: [{ finish_reason: 'stop', message: { content: 'Android documentation answer' } }] };
      } } };
    }
  }
  const mod = { exports: {} };
  vm.runInNewContext(fs.readFileSync(handlerPath, 'utf8'), {
    module: mod, exports: mod.exports, Buffer, URL, AbortSignal, Response,
    process: { env }, console: { warn() {}, error() {} },
    require: name => {
      if (name === 'openai') return { OpenAI };
      if (name.endsWith('content-index')) return { ...index, loadSearchView: async () => docs };
      if (name.endsWith('native-mika')) return nativePolicy;
      if (name.endsWith('mika-sysapps')) return require(path.join(current, '_shared/mika-sysapps'));
      if (name.endsWith('native-execution')) return require(path.join(current, '_shared/native-execution'));
      if (name.endsWith('mika-content-lookup')) return require(path.join(current, '_shared/mika-content-lookup'));
      if (name.endsWith('content-lookup')) return require(path.join(current, '_shared/content-lookup'));
      throw Error(name);
    },
  });
  const payload = { message, history: [{ role: 'user', content: 'What about Android?' }, { role: 'assistant', content: 'Which deployment scenario?' }] };
  if (native) Object.assign(payload, { version: 1, retention: 'topics_only' });
  const response = await mod.exports.handler({ httpMethod: 'POST', body: JSON.stringify(payload) }, { mikaProgress });
  const approvedEvidenceRules = '\nSYSTEM APP EVIDENCE RULES:\n- os_api is an Android API level, not a marketing Android version. Use "API level" with the returned value; for example, os_api 37 means "API level 37", not "Android 37". If a marketing version is not established by retrieved evidence, use the API level verbatim.\n- Before comparing devices, the user must identify the reference model when several models match. "A Google Pixel" is ambiguous: ask which Pixel model and version; do not choose a representative model yourself, even if you name it in the answer. If multiple API levels exist for the selected model, ask which record/version to compare.\n- Compare only the exact contributed device records, not all devices or software builds. Explain any explicitly truncated result and never describe a partial list as a complete inventory.\n- For device comparison answers, state the exact records and total counts, show at most ten package examples, and link comparison_url when provided. Do not attempt to reproduce an entire returned inventory in the chat response.\n- Search result order and global device counts do not establish frequency within a selected OEM. Describe observed matches without claiming "most common" or "most commonly".\n';
  for (const call of model) if (handlerPath === path.join(current, 'orb-chat.js') && call.params?.messages) {
    assert.ok(call.params.messages[0].content.includes(approvedEvidenceRules));
    call.params.messages[0].content = call.params.messages[0].content.replace('\n' + approvedEvidenceRules, '');
  }
  // The dedicated sysapps API changes three parameter descriptions and adds a comparison tool.
  // Compare all tool schemas and all other descriptions exactly.
  for (const call of model) if (call.params?.tools) call.params.tools = call.params.tools.filter(tool => tool.function.name !== 'sysapps_compare_devices');
  for (const call of model) for (const tool of call.params?.tools || []) {
    const fn = tool.function;
    const field = { sysapps_search: 'query', sysapps_list_devices: 'os', sysapps_get_device_apps: 'os' }[fn.name];
    if (field) {
      const approved = {
        sysapps_search: 'Package name, app name, or keyword. For a named OEM or model, include filters in the same query, e.g. "oem:Oukitel label:camera" or "model:WP60 label:camera". Results describe observed packages, not a safety verdict; device counts are global, not counts for the selected OEM.',
        sysapps_list_devices: 'Android API level filter, e.g. "34" for Android 14 or "35" for Android 15',
        sysapps_get_device_apps: 'Android API level from sysapps_list_devices (exact match)',
      };
      if (handlerPath === path.join(current, 'orb-chat.js')) assert.equal(fn.parameters.properties[field].description, approved[fn.name]);
      fn.parameters.properties[field].description = '[reviewed dedicated sysapps API description]';
    }
  }
  return { model, status: response.statusCode, body: response.body };
}
test('prompts, search ordering, sources and transcripts retain parity except the pinned sysapps API contract updates', async () => {
  const old = load(path.join(baseline, 'content-index.cjs'));
  const next = load(path.join(current, '_shared/content-index.js'));
  const datasets = [old.buildSearchView(synthetic)];
  if (fs.existsSync(indexPath)) datasets.push(old.buildSearchView(old.parseIndex(fs.readFileSync(indexPath, 'utf8'))));
  for (const docs of datasets) for (const message of queries.slice(0, 20)) for (const native of [false, true]) {
    assert.deepEqual(await transcript(path.join(current, 'orb-chat.js'), next, docs, message, native), await transcript(path.join(baseline, 'orb-chat.cjs'), old, docs, message, native), `${message}, native=${native}`);
  }
});
test('optional search diagnostics use fixed labels and numbers without query or document content', () => {
  const logs = [];
  const next = load(path.join(current, '_shared/content-index.js'), { env: { MIKA_SEARCH_DIAGNOSTICS: 'true' }, logs });
  next.searchDocs(next.buildSearchView(synthetic), 'synthetic-private-query-314159', 8);
  assert.equal(logs.length, 1);
  assert.equal(logs[0][0], '[mika-search]');
  const data = JSON.parse(logs[0][1]);
  assert.deepEqual(Object.keys(data), ['documents', 'phraseMatches', 'totalMatches', 'returned', 'selectionMs', 'snippetMs', 'totalMs']);
  assert.ok(Object.values(data).every(value => typeof value === 'number' && value >= 0));
  assert.ok(!JSON.stringify(logs).includes('314159'));
});

test('progress is observational only and never runs for native requests', async () => {
  const next = load(path.join(current, '_shared/content-index.js'));
  const docs = next.buildSearchView(synthetic);
  const stages = [];
  const normal = await transcript(path.join(current, 'orb-chat.js'), next, docs, 'Android', false);
  assert.deepEqual(await transcript(path.join(current, 'orb-chat.js'), next, docs, 'Android', false, stage => stages.push(stage)), normal);
  assert.deepEqual(stages, ['index', 'search', 'search_done', 'review', 'search', 'search_done', 'review']);
  assert.deepEqual(await transcript(path.join(current, 'orb-chat.js'), next, docs, 'Android', false, () => { throw Error('disconnected'); }), normal);
  stages.length = 0;
  await transcript(path.join(current, 'orb-chat.js'), next, docs, 'Android', true, stage => stages.push(stage));
  assert.deepEqual(stages, []);
});

test('reported tool result count matches the passages actually loaded rather than capped source links', async () => {
  const next = load(path.join(current, '_shared/content-index.js'));
  const docs = next.buildSearchView(Array.from({ length: 10 }, (_, i) => ({ title: 'Android work profile ' + i, url: '/android/example-' + i + '/', content: 'Android work profile management documentation ' + i })));
  const counts = [];
  const result = await transcript(path.join(current, 'orb-chat.js'), next, docs, 'Android', false, (stage, details) => { if (stage === 'search_done') counts.push(details.matches); });
  const lastCall = result.model.at(-1).params;
  const toolMessage = lastCall.messages.find(message => message.role === 'tool');
  const loaded = (toolMessage.content.match(/^\[\d+\]/gm) || []).length;
  assert.equal(loaded, 8);
  assert.equal(counts.at(-1), loaded);
});
