/**
 * Netlify Function adapter for MCP-style content search.
 *
 * Endpoint: /.netlify/functions/mcp-search-content
 * Method: GET (query string) or POST (JSON body)
 */

const {
  buildSearchView,
  jsonResponse,
  loadIndex,
} = require('./_shared/content-index');

/**
 * Validate and normalise input parameters for search requests.
 *
 * @param {{query?: unknown, limit?: unknown}} params
 * @returns {{query: string, limit: number}}
 */
function validateSearchParams(params) {
  if (typeof params.query !== 'string' || params.query.trim().length < 2) {
    throw new Error('Parameter "query" must be a string with at least 2 characters.');
  }

  const rawLimit = params.limit ?? 5;
  const actualLimit = Number(rawLimit);

  if (!Number.isInteger(actualLimit) || actualLimit < 1 || actualLimit > 20) {
    throw new Error('Parameter "limit" must be an integer between 1 and 20.');
  }

  return {
    query: params.query.trim(),
    limit: actualLimit,
  };
}

/**
 * Parse request parameters from either query string or JSON body.
 *
 * @param {{httpMethod?: string, queryStringParameters?: Record<string, string>, body?: string | null}} event
 * @returns {{query?: unknown, limit?: unknown}}
 */
function parseParams(event) {
  if (event.httpMethod === 'POST' && event.body) {
    try {
      return JSON.parse(event.body);
    } catch {
      throw new Error('Request body must be valid JSON.');
    }
  }

  return {
    query: event.queryStringParameters?.query,
    limit: event.queryStringParameters?.limit,
  };
}

/**
 * Netlify Function entry point.
 */
exports.handler = async event => {
  try {
    const params = parseParams(event);
    const { query, limit } = validateSearchParams(params);

    const docs = await loadIndex();
    const searchableDocs = buildSearchView(docs);
    const q = query.toLowerCase();

    const results = searchableDocs
      .filter(doc => doc.haystack.includes(q))
      .slice(0, limit)
      .map(doc => ({
        title: doc.title,
        url: doc.url,
        snippet: (doc.content || '').slice(0, 320),
      }));

    return jsonResponse(200, {
      total: results.length,
      results,
    });
  } catch (error) {
    return jsonResponse(400, {
      error: 'search_failed',
      message: error.message,
    });
  }
};
