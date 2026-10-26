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
async function transcript(handlerPath, index, docs, message, native) {
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
      if (name.endsWith('native-execution')) return require(path.join(current, '_shared/native-execution'));
      if (name.endsWith('content-lookup')) return require(path.join(current, '_shared/content-lookup'));
      throw Error(name);
    },
  });
  const payload = { message, history: [{ role: 'user', content: 'What about Android?' }, { role: 'assistant', content: 'Which deployment scenario?' }] };
  if (native) Object.assign(payload, { version: 1, retention: 'topics_only' });
  const response = await mod.exports.handler({ httpMethod: 'POST', body: JSON.stringify(payload) });
  return { model, status: response.statusCode, body: response.body };
}
test('complete prompts, pre-search ordering, sources and tool transcripts stay identical on both clients', async () => {
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
