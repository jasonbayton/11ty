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
 * Build a JSON HTTP response with standard headers for Netlify Functions.
 *
 * @param {number} statusCode
 * @param {unknown} payload
 * @returns {{statusCode: number, headers: Record<string, string>, body: string}}
 */
function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
    body: JSON.stringify(payload, null, 2),
  };
}

/**
 * Load and normalise Eleventy search index entries.
 *
 * @returns {Promise<Array<{title: string, url: string, content: string}>>}
 */
async function loadIndex() {
  let raw;

  try {
    raw = await fs.readFile(SEARCH_INDEX_PATH, 'utf8');
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      throw new Error(
        `Search index not found at ${SEARCH_INDEX_PATH}. Ensure the Eleventy build has completed before invoking this endpoint.`
      );
    }

    throw error;
  }

  let parsed;
  if (!raw || raw.trim() === '') {
    parsed = [];
  } else {
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      throw new Error(`Failed to parse search index at ${SEARCH_INDEX_PATH}: ${error.message}`);
    }
  }

  if (!Array.isArray(parsed)) {
    throw new Error(
      `Search index at ${SEARCH_INDEX_PATH} is invalid: expected an array of documents.`
    );
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

module.exports = {
  buildSearchView,
  jsonResponse,
  loadIndex,
};
