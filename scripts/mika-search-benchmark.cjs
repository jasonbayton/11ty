#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const { performance } = require('node:perf_hooks');
const old = require('./fixtures/mika-baseline/content-index.cjs');
const next = require('../netlify/functions/_shared/content-index');
const file = process.argv[2] || path.resolve('_public/search-index.json');
const docs = old.buildSearchView(old.parseIndex(fs.readFileSync(file, 'utf8')));
const message = 'What is the difference between fully managed and a work profile?';
function workload(search) {
  const keys = old.extractKeywords(message);
  for (let i = 0; i < keys.length - 1; i++) search(docs, keys[i] + ' ' + keys[i + 1], 20);
  for (const key of keys) search(docs, key, 10);
  search(docs, message, 5);
}
const samples = { baseline: [], candidate: [] };
for (let i = 0; i < 12; i++) {
  for (const [name, index] of i % 2 ? [['candidate', next], ['baseline', old]] : [['baseline', old], ['candidate', next]]) {
    const start = performance.now(); workload(index.searchDocs);
    if (i >= 2) samples[name].push(performance.now() - start);
  }
}
const median = values => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
console.log(JSON.stringify({ index: file, documents: docs.length, samples: samples.baseline.length, baselineMedianMs: median(samples.baseline), candidateMedianMs: median(samples.candidate), samplesMs: samples }, null, 2));
