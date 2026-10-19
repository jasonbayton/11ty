const { searchDocs, validateSearchParams } = require('./content-index');
const z = require('zod/v4');
const contentSearchSchema = {
  query: z.string().min(2).optional().describe('Keyword query. Omit when browsing with an explicit date range.'),
  limit: z.number().int().min(1).max(30).default(20),
  summary_format: z.unknown().optional().describe('rich-v1 adds a bounded formatted excerpt; applies only with a date range.'),
  section: z.unknown().optional().describe('Blog, Docs or Notes; applies only with a date range.'),
  from: z.string().optional().describe('Inclusive indexed content date, YYYY-MM-DD.'),
  to: z.string().optional().describe('Inclusive indexed content date, YYYY-MM-DD.'),
  sort: z.unknown().optional().describe('relevance, newest or oldest; applies only with a date range.'),
  offset: z.unknown().optional().describe('Integer 0 to 10000; applies only with a date range.'),
};
function validateContentQuery(params) {
  if (!params || typeof params !== 'object' || Array.isArray(params)) throw Error('Parameter object is required.');
  const extended = params.from !== undefined || params.to !== undefined;
  if (!extended) {
    return { ...validateSearchParams(params), extended: false };
  }
  const query = params.query === undefined ? '' : params.query;
  if (typeof query !== 'string' || (query.trim().length && query.trim().length < 2)) throw Error('Parameter query must contain at least two characters.');
  if (!query.trim() && !params.section && !params.from && !params.to) throw Error('Parameter section or date is required without a query.');
  const limit = Number(params.limit ?? 20), offset = Number(params.offset ?? 0);
  if (!Number.isInteger(limit) || limit < 1 || limit > 30 || !Number.isInteger(offset) || offset < 0 || offset > 10000) throw Error('Parameter limit or offset is out of range.');
  if (params.section !== undefined && !['Blog', 'Docs', 'Notes'].includes(params.section)) throw Error('Parameter section is invalid.');
  if (params.summary_format !== undefined && params.summary_format !== 'rich-v1') throw Error('Parameter summary_format is invalid.');
  const sort = params.sort || (query.trim() ? 'relevance' : 'newest');
  if (!['relevance', 'newest', 'oldest'].includes(sort)) throw Error('Parameter sort is invalid.');
  for (const key of ['from', 'to']) {
    const value = params[key];
    if (value !== undefined && (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value)) throw Error(`Parameter ${key} must be a valid YYYY-MM-DD date.`);
  }
  if (params.from && params.to && params.from > params.to) throw Error('Parameter from must not be later than to.');
  return { query: query.trim(), limit, offset, section: params.section, from: params.from, to: params.to, sort, summaryFormat: params.summary_format, extended: true };
}
function queryContent(docs, params) {
  if (!params.extended) return searchDocs(docs, params.query, params.limit);
  const prefixes = { Blog: '/blog/', Docs: '/android/', Notes: '/notes/' };
  const candidates = docs.filter(doc => {
    if (params.section && (!doc.url.startsWith(prefixes[params.section]) || doc.url === prefixes[params.section])) return false;
    if (params.section === 'Blog' && !/^\/blog\/\d{4}\/\d{2}\/[^/]+\/?$/.test(doc.url)) return false;
    if (params.section === 'Notes' && !/^\/notes\/\d+\/?$/.test(doc.url)) return false;
    const timestamp = Date.parse(doc.date);
    if (!Number.isFinite(timestamp)) return false;
    const day = new Date(timestamp).toISOString().slice(0, 10);
    return (!params.from || day >= params.from) && (!params.to || day <= params.to);
  });
  const byUrl = new Map(candidates.map(doc => [doc.url, doc]));
  let results = params.query ? searchDocs(candidates, params.query, Math.max(candidates.length, 1)).results : candidates.map(doc => ({ title: doc.title, url: doc.url, snippet: String(doc.content || '').replace(/\s+/g, ' ').slice(0, 600) }));
  if (params.sort !== 'relevance') results.sort((a, b) => {
    const delta = Date.parse(byUrl.get(a.url).date) - Date.parse(byUrl.get(b.url).date);
    return (params.sort === 'oldest' ? delta : -delta) || a.url.localeCompare(b.url);
  });
  const totalMatches = results.length;
  return { version: 1, section: params.section || null, totalMatches, offset: params.offset, hasMore: params.offset + params.limit < totalMatches,
    results: results.slice(params.offset, params.offset + params.limit).map(result => ({ ...result, date: new Date(byUrl.get(result.url).date).toISOString(), ...(params.summaryFormat === 'rich-v1' ? { summary: byUrl.get(result.url).richSummary || null } : {}) })) };
}
module.exports = { validateContentQuery, queryContent, contentSearchSchema };
