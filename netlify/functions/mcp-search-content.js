/**
 * Netlify Function adapter for MCP-style content search.
 *
 * Endpoint: /.netlify/functions/mcp-search-content
 * Method: GET (query string) or POST (JSON body)
 */

const {
  isDevelopment,
  jsonResponse,
  loadSearchView,
  noContentResponse,
  searchDocs,
  safeMessage,
  validateSearchParams,
} = require('./_shared/content-index');

/**
 * Parse request parameters from either query string or JSON body.
 *
 * @param {{httpMethod?: string, queryStringParameters?: Record<string, string>, body?: string | null}} event
 * @returns {{query?: unknown, limit?: unknown}}
 */
function parseParams(event) {
  if (event.httpMethod === 'POST') {
    if (!event.body) {
      throw new Error('POST requests must include a JSON body.');
    }
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
    return noContentResponse();
  }
  if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
    const response = jsonResponse(405, {
      error: 'method_not_allowed',
      message: 'Method must be GET, POST, or OPTIONS.',
    });
    return {
      ...response,
      headers: {
        ...response.headers,
        allow: 'GET, POST, OPTIONS',
      },
    };
  }

  try {
    const params = parseParams(event);
    const { query, limit } = validateSearchParams(params);

    const searchableDocs = await loadSearchView();
    const { totalMatches, results } = searchDocs(searchableDocs, query, limit);

    return jsonResponse(200, {
      totalIndexed: searchableDocs.length,
      totalMatches,
      returned: results.length,
      results,
    });
  } catch (error) {
    const message = error && typeof error.message === 'string' ? error.message : '';
    const isClientError =
      message.includes('Parameter') ||
      message.includes('Request body must be valid JSON') ||
      message.includes('POST requests must include a JSON body');

    const isServiceUnavailable = message.includes('Search index is unavailable');

    const statusCode = isClientError ? 400 : isServiceUnavailable ? 503 : 500;

    return jsonResponse(statusCode, {
      error: 'search_failed',
      message: safeMessage(error, 'Search request failed.'),
    });
  }
};
