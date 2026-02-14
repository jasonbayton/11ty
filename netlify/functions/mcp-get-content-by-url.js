/**
 * Netlify Function adapter for MCP-style URL lookup.
 *
 * Endpoint: /.netlify/functions/mcp-get-content-by-url
 * Method: GET (query string) or POST (JSON body)
 */

const { jsonResponse, loadIndex } = require('./_shared/content-index');

/**
 * Validate and normalise URL lookup parameters.
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
 * Parse request parameters from either query string or JSON body.
 *
 * @param {{httpMethod?: string, queryStringParameters?: Record<string, string>, body?: string | null}} event
 * @returns {{url?: unknown}}
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
    url: event.queryStringParameters?.url,
  };
}

/**
 * Netlify Function entry point.
 */
exports.handler = async event => {
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
    return jsonResponse(400, {
      error: 'lookup_failed',
      message: error.message,
    });
  }
};
