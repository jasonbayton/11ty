#!/usr/bin/env node
// No diagnostic function is created for production or pull-request previews.
const fs = require('node:fs');
const path = require('node:path');
const destination = path.resolve(__dirname, '../netlify/functions/mika-draft-profile.js');
if (process.env.BRANCH !== 'draft' || process.env.CONTEXT !== 'branch-deploy') {
  fs.rmSync(destination, { force: true });
  process.exit(0);
}
fs.writeFileSync(destination, `const fs = require('node:fs');
const crypto = require('node:crypto');
const { performance } = require('node:perf_hooks');
const old = require('../../scripts/fixtures/mika-baseline/content-index.cjs');
const next = require('./_shared/content-index');
const message = 'What is the difference between fully managed and a work profile?';
let docs, sample = 0;
function workload(index) {
  const keys = old.extractKeywords(message), seen = new Set(), results = [];
  const add = (found, prepend) => {
    for (const row of found) if (!seen.has(row.url)) {
      seen.add(row.url); if (prepend) results.unshift(row); else results.push(row);
    }
  };
  for (let i = 0; i < keys.length - 1; i++) add(index.searchDocs(docs, keys[i] + ' ' + keys[i + 1], 20).results, true);
  for (const key of keys) add(index.searchDocs(docs, key, 10).results, false);
  add(index.searchDocs(docs, message, 5).results, true);
  return crypto.createHash('sha256').update(JSON.stringify(results)).digest('hex');
}
exports.handler = async event => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: '' };
  const cacheHit = Boolean(docs), started = performance.now();
  const raw = fs.readFileSync('_public/search-index.json', 'utf8');
  docs ||= old.buildSearchView(old.parseIndex(raw));
  const loaded = performance.now();
  const measured = {};
  const order = sample++ % 2 ? [['candidate', next], ['baseline', old]] : [['baseline', old], ['candidate', next]];
  for (const [name, index] of order) {
    const from = performance.now();
    const hash = workload(index);
    measured[name] = { hash, ms: performance.now() - from };
  }
  const baselineHash = measured.baseline.hash, candidateHash = measured.candidate.hash;
  return { statusCode: 200, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }, body: JSON.stringify({
    runtime: process.version, documents: docs.length, cacheHit,
    indexHash: crypto.createHash('sha256').update(raw).digest('hex'),
    baselineMs: measured.baseline.ms, candidateMs: measured.candidate.ms,
    indexMs: loaded - started, parity: baselineHash === candidateHash, baselineHash, candidateHash
  }) };
};
`);
