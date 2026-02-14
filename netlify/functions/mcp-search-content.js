/**
 * Netlify Function adapter for MCP-style content search.
 *
 * Endpoint: /.netlify/functions/mcp-search-content
 * Method: GET (query string) or POST (JSON body)
 */

const {
  buildSearchView,
  createSearchMatcher,
  isDevelopment,
  jsonResponse,
  loadIndex,
  safeMessage,
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

  const actualLimit = Number(params.limit ?? 5);

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
    } catch (parseError) {
      // Keep logs detailed for maintainers while keeping responses controlled.
      console.error('Failed to parse JSON body in mcp-search-content:', parseError);
      const devDetail =
        isDevelopment() && parseError && parseError.message
          ? ` Parse error: ${parseError.message}`
          : '';
      throw new Error(`Request body must be valid JSON.${devDetail}`);
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
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(204, {});
  }

  try {
    const params = parseParams(event);
    const { query, limit } = validateSearchParams(params);

    const docs = await loadIndex();
    const searchableDocs = buildSearchView(docs);
    const matcher = createSearchMatcher(query);

    const results = searchableDocs
      .filter(doc => matcher.test(doc.haystack))
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
    const isClientError =
      error.message.includes('Parameter') || error.message.includes('Request body must be valid JSON');

    const isServiceUnavailable = error.message.includes('Search index is unavailable');

    const statusCode = isClientError ? 400 : isServiceUnavailable ? 503 : 500;

    return jsonResponse(statusCode, {
      error: 'search_failed',
      message: safeMessage(error, 'Search request failed.'),
    });
  }
};
