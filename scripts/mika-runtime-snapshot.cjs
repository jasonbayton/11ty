#!/usr/bin/env node
// Compare the exact public retrieval payload across Node runtimes using its digest.
const fs = require('node:fs');
const crypto = require('node:crypto');
const OriginalDate = Date;
global.Date = class extends OriginalDate {
  constructor(...args) { super(...(args.length ? args : ['2026-01-01T00:00:00Z'])); }
  static now() { return OriginalDate.parse('2026-01-01T00:00:00Z'); }
};
const index = process.argv[2] === 'baseline'
  ? require('./fixtures/mika-baseline/content-index.cjs')
  : require('../netlify/functions/_shared/content-index');
const docs = index.buildSearchView(index.parseIndex(fs.readFileSync(process.env.MIKA_PARITY_INDEX || '_public/search-index.json', 'utf8')));
const queries = ['What is the difference between fully managed and a work profile?', 'Android', 'policy', 'zero touch', 'zero-touch', 'COPE Android 11', 'Knox KME', 'custom DPC AMAPI', 'OEMConfig', 'Workspace ONE patch deployment', 'ws1', 'airwatch', 'omnissa', 'intune', 'café', '日本語', 'com.google.android.gms', 'C++', 'wifi (EAP)', 'no-such-term-314159', 'fully managed work profile', 'Knox', 'ſamsung'];
const results = [];
for (const query of queries) for (const limit of [1, 5, 8, 20]) results.push({ query, limit, result: index.searchDocs(docs, query, limit) });
console.log(JSON.stringify({ node: process.version, documents: docs.length, comparisons: results.length, sha256: crypto.createHash('sha256').update(JSON.stringify(results)).digest('hex') }));
