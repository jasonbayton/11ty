/**
 * Netlify Function adapter for MCP-style URL lookup.
 *
 * Endpoint: /.netlify/functions/mcp-get-content-by-url
 * Method: GET (query string) or POST (JSON body)
 */

const {
  isDevelopment,
  jsonResponse,
  loadIndex,
  noContentResponse,
  safeMessage,
  validateUrlParams,
} = require('./_shared/content-index');

/**
 * Parse request parameters from either query string or JSON body.
 *
 * @param {{httpMethod?: string, queryStringParameters?: Record<string, string>, body?: string | null}} event
 * @returns {{url?: unknown}}
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
      console.error('Failed to parse JSON body in mcp-get-content-by-url:', parseError);
      const devDetail =
        isDevelopment() && parseError && parseError.message
          ? ` Parse error: ${parseError.message}`
          : '';
      throw new Error(`Request body must be valid JSON.${devDetail}`);
    }
  }

  return {
    url: event.queryStringParameters?.url,
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
    const { url } = validateUrlParams(params);

    const docs = await loadIndex();
    const found = docs.find(doc => doc.url === url);

    if (!found) {
      return jsonResponse(404, {
        error: 'not_found',
        message: `No content found for URL: ${url}`,
      });
    }

    return jsonResponse(200, found);
  } catch (error) {
    const message = error && typeof error.message === 'string' ? error.message : '';
    const isClientError =
      message.includes('Parameter') ||
      message.includes('Request body must be valid JSON') ||
      message.includes('POST requests must include a JSON body');

    const isServiceUnavailable = message.includes('Search index is unavailable');

    const statusCode = isClientError ? 400 : isServiceUnavailable ? 503 : 500;

    return jsonResponse(statusCode, {
      error: 'lookup_failed',
      message: safeMessage(error, 'Lookup request failed.'),
    });
  }
};
