/**
 * Shared helpers for Netlify Function adapters over the Eleventy search index.
 *
 * These utilities intentionally mirror the MCP server's defensive handling so
 * behaviour stays consistent across local stdio MCP and Netlify HTTP runtime.
 */

const fs = require('node:fs/promises');
const path = require('node:path');

/**
 * Resolve the generated Eleventy search index path from the repository root.
 */
const SEARCH_INDEX_PATH = path.resolve(process.cwd(), '_public', 'search-index.json');

/**
 * Module-level cache to avoid re-reading and re-parsing the full search index
 * on every single invocation within the same warm function container.
 *
 * Netlify may still create new containers over time, so this is a best-effort
 * performance optimisation rather than a global cache guarantee.
 */
let cachedDocs = null;
let cachedSearchableDocs = null;

/**
 * Resolve the site origin for remote search-index fallback in serverless.
 *
 * @returns {string | null}
 */
function getSiteOrigin() {
  const candidates = [
    process.env.URL,
    process.env.DEPLOY_URL,
    process.env.SITE_URL,
  ];

  for (const value of candidates) {
    if (typeof value !== 'string' || value.trim().length < 1) {
      continue;
    }
    try {
      return new URL(value).origin;
    } catch {
      // Ignore invalid environment values.
    }
  }

  return null;
}

/**
 * Parse and normalise raw JSON search index content.
 *
 * @param {string} raw
 * @returns {Array<{title: string, url: string, content: string}>}
 */
function parseIndex(raw) {
  let parsed;
  if (!raw || raw.trim() === '') {
    parsed = [];
  } else {
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      throw new Error(safeMessage(error, 'Search index data is malformed.'));
    }
  }

  if (!Array.isArray(parsed)) {
    throw new Error('Search index data is invalid. Expected an array of documents.');
  }

  return parsed
    .filter(item => item && item.url && item.title)
    .map(item => ({
      title: String(item.title),
      url: String(item.url),
      content: item.content == null ? '' : String(item.content),
    }));
}

/**
 * Build a JSON HTTP response with standard headers for Netlify Functions.
 *
 * @param {number} statusCode
 * @param {unknown} payload
 * @returns {{statusCode: number, headers: Record<string, string>, body: string}}
 */
function jsonResponse(statusCode, payload) {
  const isSuccess = statusCode >= 200 && statusCode < 300;

  /** @type {Record<string, string>} */
  const headers = {
    'content-type': 'application/json; charset=utf-8',
    // Enable browser-based clients to call these endpoints cross-origin.
    'access-control-allow-origin': process.env.URL || 'https://bayton.org',
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-allow-headers': 'content-type',
  };

  if (isSuccess) {
    // Successful responses are cacheable for a short period because the
    // underlying index only changes when a new site build is deployed.
    headers['cache-control'] = 'public, max-age=3600';
    // Ensure shared caches differentiate responses when Origin varies.
    headers['vary'] = 'Origin';
  } else {
    // Avoid caching error or non-success responses.
    headers['cache-control'] = 'no-store';
  }

  return {
    statusCode,
    headers,
    body: JSON.stringify(payload, null, 2),
  };
}

/**
 * Build an empty 204 response with CORS headers for browser preflight checks.
 *
 * @returns {{statusCode: number, headers: Record<string, string>, body: string}}
 */
function noContentResponse() {
  const base = jsonResponse(204, {});
  base.headers['cache-control'] = 'no-store';
  delete base.headers.vary;
  return {
    ...base,
    body: '',
  };
}

/**
 * Determine whether to expose verbose internal error detail.
 *
 * @returns {boolean}
 */
function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}

/**
 * Convert internal errors into safe, user-facing messages.
 *
 * @param {Error} error
 * @param {string} fallbackMessage
 * @returns {string}
 */
function safeMessage(error, fallbackMessage) {
  if (isDevelopment() && error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}

/**
 * Load and normalise Eleventy search index entries.
 *
 * @returns {Promise<Array<{title: string, url: string, content: string}>>}
 */
async function loadIndex() {
  if (cachedDocs) {
    return cachedDocs;
  }

  try {
    const raw = await fs.readFile(SEARCH_INDEX_PATH, 'utf8');
    cachedDocs = parseIndex(raw);
    cachedSearchableDocs = null;
    return cachedDocs;
  } catch (error) {
    if (!(error && error.code === 'ENOENT')) {
      throw new Error(safeMessage(error, 'Failed to load the search index.'));
    }
  }

  const origin = getSiteOrigin();
  if (!origin) {
    const detail = isDevelopment() ? ` (${SEARCH_INDEX_PATH})` : '';
    throw new Error(`Search index is unavailable. Ensure the Eleventy build has completed${detail}.`);
  }

  let response;
  try {
    response = await fetch(`${origin}/search-index.json`, {
      headers: { accept: 'application/json' },
    });
  } catch (error) {
    throw new Error(safeMessage(error, 'Search index is unavailable. Ensure the Eleventy build has completed.'));
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Search index is unavailable. Ensure the Eleventy build has completed.');
    }
    throw new Error(`Search index fetch failed with status ${response.status}.`);
  }

  let raw;
  try {
    raw = await response.text();
  } catch (error) {
    throw new Error(safeMessage(error, 'Failed to read search index response.'));
  }

  cachedDocs = parseIndex(raw);
  cachedSearchableDocs = null;
  return cachedDocs;
}

/**
 * Create a compact case-insensitive field for basic keyword matching.
 *
 * @param {Array<{title: string, url: string, content: string}>} docs
 * @returns {Array<{title: string, url: string, content: string, haystack: string}>}
 */
function buildSearchView(docs) {
  return docs.map(doc => ({
    ...doc,
    haystack: `${doc.title}\n${doc.content || ''}`.toLowerCase(),
  }));
}

/**
 * Load docs and return a cached searchable view for warm serverless containers.
 *
 * @returns {Promise<Array<{title: string, url: string, content: string, haystack: string}>>}
 */
async function loadSearchView() {
  const docs = await loadIndex();

  if (cachedSearchableDocs) {
    return cachedSearchableDocs;
  }

  cachedSearchableDocs = buildSearchView(docs);
  return cachedSearchableDocs;
}

/**
 * Validate and normalize search parameters used across MCP and HTTP adapters.
 *
 * @param {{query?: unknown, limit?: unknown}} params
 * @returns {{query: string, limit: number}}
 */
function validateSearchParams(params) {
  if (typeof params.query !== 'string' || params.query.trim().length < 2) {
    throw new Error('Parameter "query" must be a string with at least 2 characters.');
  }

  const actualLimit = Number(params.limit ?? 20);
  if (!Number.isInteger(actualLimit) || actualLimit < 1 || actualLimit > 30) {
    throw new Error('Parameter "limit" must be an integer between 1 and 30.');
  }

  return {
    query: params.query.trim(),
    limit: actualLimit,
  };
}

/**
 * Validate and normalize URL lookup parameters used across MCP and HTTP adapters.
 *
 * @param {{url?: unknown}} params
 * @returns {{url: string}}
 */
function validateUrlParams(params) {
  if (typeof params.url !== 'string' || params.url.trim().length < 1) {
    throw new Error('Parameter "url" must be a non-empty string.');
  }

  return { url: params.url.trim() };
}

/**
 * Create a search matcher that prefers whole-word matching for simple terms,
 * and falls back to escaped substring matching for complex queries.
 *
 * @param {string} query
 * @returns {RegExp}
 */
function createSearchMatcher(query) {
  const normalised = query.trim().toLowerCase();
  const escaped = normalised.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Treat spaces and hyphens as interchangeable so "zero touch" matches "zero-touch" and vice versa
  const flexible = escaped.replace(/[\s-]+/g, '[\\s-]+');

  if (/^[\p{L}\p{N}_\s-]+$/u.test(normalised)) {
    return new RegExp(`\\b${flexible}\\b`, 'iu');
  }

  return new RegExp(flexible, 'iu');
}

/**
 * Build a readable snippet around the first content match.
 *
 * @param {string} content
 * @param {RegExp} matcher
 * @returns {string}
 */
function buildMatchSnippet(content, matcher) {
  if (!content) {
    return '';
  }

  const index = content.search(matcher);
  if (index < 0) {
    return content.slice(0, 1000);
  }

  const start = Math.max(0, index - 300);
  const end = Math.min(content.length, index + 900);
  const prefix = start > 0 ? '...' : '';
  const suffix = end < content.length ? '...' : '';
  return `${prefix}${content.slice(start, end)}${suffix}`;
}

/**
 * Common English stop words to ignore when extracting keywords from queries.
 */
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'can', 'shall', 'to', 'of', 'in', 'for',
  'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'during',
  'before', 'after', 'above', 'below', 'between', 'out', 'off', 'over',
  'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when',
  'where', 'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more',
  'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own',
  'same', 'so', 'than', 'too', 'very', 'just', 'about', 'also', 'and',
  'but', 'or', 'if', 'because', 'until', 'while', 'it', 'its', 'this',
  'that', 'these', 'those', 'i', 'me', 'my', 'we', 'our', 'you', 'your',
  'he', 'him', 'his', 'she', 'her', 'they', 'them', 'their', 'what',
  'which', 'who', 'whom', 'hey', 'hi', 'hello', 'thanks', 'please',
  'tell', 'know', 'like', 'get', 'got', 'want', 'need', 'think',
]);

/**
 * Extract meaningful keywords from a query string, removing stop words.
 *
 * @param {string} query
 * @returns {string[]}
 */
function extractKeywords(query) {
  return query
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 2 && !STOP_WORDS.has(w));
}

/**
 * Search docs with lightweight relevance ranking and contextual snippets.
 *
 * Uses phrase matching first, then falls back to keyword-based matching
 * when the query is a full sentence (e.g. "is zero touch supported on
 * all devices?" won't match as a phrase, but the keywords "zero", "touch",
 * "supported", "devices" will find the right docs).
 *
 * @param {Array<{title: string, url: string, content: string, haystack: string}>} searchableDocs
 * @param {string} query
 * @param {number} limit
 * @returns {{totalMatches: number, results: Array<{title: string, url: string, snippet: string}>}}
 */
function searchDocs(searchableDocs, query, limit) {
  const matcher = createSearchMatcher(query);

  // 1. Phrase match (existing behaviour — works great for short/precise queries)
  const phraseResults = searchableDocs
    .filter(doc => matcher.test(doc.haystack))
    .map(doc => {
      const titleHit = matcher.test(doc.title);
      const contentIndex = doc.content ? doc.content.search(matcher) : -1;
      const positionScore = contentIndex < 0 ? 0 : Math.max(0, 40 - Math.floor(contentIndex / 80));
      // Boost guide/reference pages over blog posts — guides are evergreen, blogs are dated announcements
      const isGuide = doc.url.startsWith('/android/') || doc.url.startsWith('/docs/');
      const isBlog = doc.url.startsWith('/blog/');
      const typeBonus = isGuide ? 30 : (isBlog ? -15 : 0);
      // Recency bonus — extract year from URL (/blog/YYYY/...) or content, prefer newer content
      const yearMatch = doc.url.match(/\/(\d{4})\//);
      const docYear = yearMatch ? parseInt(yearMatch[1], 10) : 0;
      const currentYear = new Date().getFullYear();
      const recencyBonus = docYear > 0 ? Math.max(-20, Math.min(20, (docYear - currentYear + 3) * 5)) : 0;
      const score = (titleHit ? 100 : 0) + positionScore + 50 + typeBonus + recencyBonus;

      return {
        title: doc.title,
        url: doc.url,
        snippet: buildMatchSnippet(doc.content || '', matcher),
        score,
      };
    });

  // 2. Keyword fallback — when phrase match finds too few results
  const keywords = extractKeywords(query);
  let keywordResults = [];

  if (phraseResults.length < limit && keywords.length > 1) {
    const keywordMatchers = keywords.map(k => createSearchMatcher(k));
    const phraseUrls = new Set(phraseResults.map(r => r.url));
    const minKeywords = Math.max(2, Math.ceil(keywords.length * 0.6));

    keywordResults = searchableDocs
      .filter(doc => !phraseUrls.has(doc.url))
      .map(doc => {
        let matchCount = 0;
        let bestMatcher = null;
        for (const km of keywordMatchers) {
          if (km.test(doc.haystack)) {
            matchCount++;
            if (!bestMatcher) bestMatcher = km;
          }
        }
        return { doc, matchCount, bestMatcher };
      })
      .filter(r => r.matchCount >= minKeywords)
      .sort((a, b) => b.matchCount - a.matchCount)
      .slice(0, limit * 2)
      .map(r => {
        const snippetMatcher = r.bestMatcher || keywordMatchers[0];
        const titleHit = r.bestMatcher ? r.bestMatcher.test(r.doc.title) : false;
        const isGuide = r.doc.url.startsWith('/android/') || r.doc.url.startsWith('/docs/');
        const isBlog = r.doc.url.startsWith('/blog/');
        const kwTypeBonus = isGuide ? 30 : (isBlog ? -15 : 0);
        const kwYearMatch = r.doc.url.match(/\/(\d{4})\//);
        const kwDocYear = kwYearMatch ? parseInt(kwYearMatch[1], 10) : 0;
        const kwRecency = kwDocYear > 0 ? Math.max(-20, Math.min(20, (kwDocYear - new Date().getFullYear() + 3) * 5)) : 0;
        return {
          title: r.doc.title,
          url: r.doc.url,
          snippet: buildMatchSnippet(r.doc.content || '', snippetMatcher),
          score: (titleHit ? 80 : 0) + r.matchCount * 15 + kwTypeBonus + kwRecency,
        };
      });
  }

  // Merge, sort by score, deduplicate
  const all = phraseResults.concat(keywordResults).sort((a, b) => b.score - a.score);

  return {
    totalMatches: all.length,
    results: all.slice(0, limit).map(({ score, ...result }) => result),
  };
}

module.exports = {
  buildSearchView,
  createSearchMatcher,
  extractKeywords,
  searchDocs,
  isDevelopment,
  jsonResponse,
  noContentResponse,
  loadIndex,
  loadSearchView,
  safeMessage,
  validateSearchParams,
  validateUrlParams,
};
