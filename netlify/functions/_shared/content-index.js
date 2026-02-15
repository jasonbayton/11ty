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
    'access-control-allow-origin': '*',
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
 * Create a search matcher that prefers whole-word matching for simple terms,
 * and falls back to escaped substring matching for complex queries.
 *
 * @param {string} query
 * @returns {RegExp}
 */
function createSearchMatcher(query) {
  const normalised = query.trim().toLowerCase();
  const escaped = normalised.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  if (/^[\p{L}\p{N}_-]+$/u.test(normalised)) {
    return new RegExp(`\\b${escaped}\\b`, 'iu');
  }

  return new RegExp(escaped, 'iu');
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
    return content.slice(0, 320);
  }

  const start = Math.max(0, index - 120);
  const end = Math.min(content.length, index + 200);
  const prefix = start > 0 ? '...' : '';
  const suffix = end < content.length ? '...' : '';
  return `${prefix}${content.slice(start, end)}${suffix}`;
}

/**
 * Search docs with lightweight relevance ranking and contextual snippets.
 *
 * @param {Array<{title: string, url: string, content: string, haystack: string}>} searchableDocs
 * @param {string} query
 * @param {number} limit
 * @returns {Array<{title: string, url: string, snippet: string}>}
 */
function searchDocs(searchableDocs, query, limit) {
  const matcher = createSearchMatcher(query);
  const titleMatcher = createSearchMatcher(query);

  const ranked = searchableDocs
    .filter(doc => matcher.test(doc.haystack))
    .map(doc => {
      const titleHit = titleMatcher.test(doc.title);
      const contentIndex = doc.content ? doc.content.search(matcher) : -1;
      const positionScore = contentIndex < 0 ? 0 : Math.max(0, 40 - Math.floor(contentIndex / 80));
      const score = (titleHit ? 100 : 0) + positionScore;

      return {
        title: doc.title,
        url: doc.url,
        snippet: buildMatchSnippet(doc.content || '', matcher),
        score,
      };
    })
    .sort((a, b) => b.score - a.score);

  return ranked.slice(0, limit).map(({ score, ...result }) => result);
}

module.exports = {
  buildSearchView,
  createSearchMatcher,
  searchDocs,
  isDevelopment,
  jsonResponse,
  loadIndex,
  safeMessage,
};
