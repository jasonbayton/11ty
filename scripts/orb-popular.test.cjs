const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const { publicTopicQuestion, classifyTopic } = require('../netlify/functions/_shared/native-mika');

function fixture(rows, options = {}) {
  const requests = [];
  const mod = { exports: {} };
  vm.runInNewContext(fs.readFileSync('netlify/functions/orb-popular.js', 'utf8'), {
    module: mod, exports: mod.exports,
    require: createRequire(require('node:path').resolve('netlify/functions/orb-popular.js')),
    process: { env: options.noKey ? {} : { ORB_DIRECTUS_API_KEY: 'synthetic-key' } },
    console: { error() {} },
    fetch: async (url, init) => {
      requests.push({ url, init });
      if (options.failure) throw new Error('synthetic network failure');
      return { ok: true, json: async () => ({ data: rows }) };
    },
  });
  return { handler: mod.exports.handler, requests };
}

test('native summaries become readable questions without internal source or tool labels', () => {
  assert.equal(publicTopicQuestion('[Native MIKA] Explain Android Enterprise (general chat).'), 'Can you explain Android Enterprise?');
  assert.equal(publicTopicQuestion('[Native MIKA] Troubleshoot provisioning (QR tool).'), 'How do I troubleshoot provisioning?');
  assert.equal(publicTopicQuestion('[Native MIKA] Configure enterprise Wi-Fi (text attachment).'), 'How do I configure enterprise Wi-Fi?');
  assert.equal(publicTopicQuestion('[Native MIKA] Compare managed configuration (config tool).'), 'How do I compare options for managed configuration?');
  assert.equal(publicTopicQuestion('[Native MIKA] Explain certificates (PDF attachment).'), 'Can you explain certificates?');
});

test('normal website questions are retained while malformed internal summaries are excluded', () => {
  const ordinary = 'What is zero-touch enrolment and which devices support it?';
  assert.equal(publicTopicQuestion(ordinary), ordinary);
  for (const value of [null, undefined, 7, {}, '', '   ', '[Native MIKA] Explain private-canary (general chat).', '[Native MIKA] Explain Android Enterprise (private-canary).', '[Native MIKA] Explain Android Enterprise (general chat). private-canary']) {
    assert.equal(publicTopicQuestion(value), null);
  }
});

test('native classification remains fixed-vocabulary logging rather than original question storage', () => {
  const summary = classifyTopic('Please explain enterprise Wi-Fi for private-canary@example.test', 'Picture');
  assert.equal(summary.question, '[Native MIKA] Explain enterprise Wi-Fi (picture attachment).');
  assert.equal(publicTopicQuestion(summary.question), 'Can you explain enterprise Wi-Fi?');
  assert.ok(!JSON.stringify(summary).includes('private-canary'));
});

test('popular endpoint formats existing rows and deduplicates tool variants before selecting', async () => {
  const f = fixture([
    { question: '[Native MIKA] Explain Android Enterprise (general chat).' },
    { question: '[Native MIKA] Explain Android Enterprise (picture attachment).' },
    { question: 'Can you explain Android Enterprise?' },
    { question: 'Can I still build a custom DPC?' },
    { question: '[Native MIKA] Explain private-canary (general chat).' },
    { question: null }, null,
  ]);
  const response = await f.handler({ httpMethod: 'GET' });
  assert.equal(response.statusCode, 200);
  assert.deepEqual(JSON.parse(response.body).questions.sort(), ['Can I still build a custom DPC?', 'Can you explain Android Enterprise?'].sort());
  assert.equal(f.requests.length, 1);
  assert.match(f.requests[0].url, /sort\[\]=-count&limit=15/);
});

test('popular endpoint keeps the five-question cap and existing failure/HTTP handling', async () => {
  const rows = Array.from({ length: 10 }, (_, i) => ({ question: `Website question ${i}?` }));
  const f = fixture(rows);
  const result = JSON.parse((await f.handler({ httpMethod: 'GET' })).body);
  assert.equal(result.questions.length, 5);
  assert.equal(new Set(result.questions).size, 5);
  assert.equal((await f.handler({ httpMethod: 'OPTIONS' })).statusCode, 204);
  assert.equal((await f.handler({ httpMethod: 'POST' })).statusCode, 405);
  for (const options of [{ noKey: true }, { failure: true }]) {
    const unavailable = fixture(rows, options);
    assert.deepEqual(JSON.parse((await unavailable.handler({ httpMethod: 'GET' })).body), { questions: [] });
    if (options.noKey) assert.equal(unavailable.requests.length, 0);
  }
});
