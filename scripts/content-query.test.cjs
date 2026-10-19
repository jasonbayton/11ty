const test = require('node:test');
const assert = require('node:assert/strict');
const { buildSearchView, searchDocs, validateSearchParams } = require('../netlify/functions/_shared/content-index');
const { validateContentQuery, queryContent } = require('../netlify/functions/_shared/content-query');
const docs = buildSearchView([
  { title: 'Android guide', url: '/android/guide/', content: 'Android enterprise guide', date: '2026-10-01' },
  { title: 'Android older', url: '/blog/2025/01/older/', content: 'Android enterprise older', date: '2025-01-01' },
  { title: 'Android newer', url: '/blog/2026/10/newer/', content: 'Android enterprise newer', date: '2026-10-18T23:59:59Z' },
]);
test('ordinary queries retain original validation, ranking and exact response shape', () => {
  for (const query of ['android', 'android enterprise', 'no matches', 'Android guide']) {
    for (const limit of [1, 2, 30]) {
      const params = { query, limit };
      assert.deepEqual(queryContent(docs, validateContentQuery(params)), searchDocs(docs, validateSearchParams(params).query, limit));
    }
  }
  assert.deepEqual(queryContent(docs, validateContentQuery({ query: 'android', sort: 'newest', section: 'Blog', offset: 10 })), searchDocs(docs, 'android', 20));
  for (const params of [{}, { query: 'x' }, { query: 42 }, { query: 'android', limit: 31 }]) {
    assert.throws(() => validateContentQuery(params), error => {
      try { validateSearchParams(params); } catch (original) { return original.message === error.message; }
      return false;
    });
  }
});
test('date range explicitly enables inclusive filtering, section, ordering and paging', () => {
  const filtered = queryContent(docs, validateContentQuery({ from: '2025-01-01', to: '2026-10-18', section: 'Blog', sort: 'newest', limit: 1 }));
  assert.equal(filtered.results[0].title, 'Android newer');
  assert.equal(filtered.totalMatches, 2);
  assert.equal(filtered.hasMore, true);
  assert.equal(filtered.results[0].date, '2026-10-18T23:59:59.000Z');
  const older = queryContent(docs, validateContentQuery({ from: '2025-01-01', sort: 'oldest', offset: 1, limit: 1 }));
  assert.equal(older.results[0].title, 'Android guide');
});
test('ordering/filter extensions require a date range and invalid ranges fail clearly', () => {
  for (const params of [{ from: '2026-02-30' }, { from: '2026-10-19', to: '2026-10-01' }, { from: '2026-01-01', sort: 'bad' }]) assert.throws(() => validateContentQuery(params));
});

test('MCP schema preserves ignored extension fields on undated legacy queries', () => {
  const z = require('zod/v4');
  const { contentSearchSchema } = require('../netlify/functions/_shared/content-query');
  const schema = z.object(contentSearchSchema);
  for (const extra of [{ sort: 'nonsense' }, { offset: -1 }, { section: 'elsewhere' }]) {
    const params = schema.parse({ query: 'android', ...extra });
    assert.deepEqual(queryContent(docs, validateContentQuery(params)), searchDocs(docs, 'android', 20));
  }
});
