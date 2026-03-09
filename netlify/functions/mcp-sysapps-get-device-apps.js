/**
 * Netlify Function adapter for fetching system apps by exact device.
 *
 * Endpoint: /.netlify/functions/mcp-sysapps-get-device-apps
 * Method: GET (query string) or POST (JSON body)
 */

const {
  isDevelopment,
  jsonResponse,
  noContentResponse,
  safeMessage,
} = require('./_shared/content-index');
const { getDeviceSystemApps } = require('./_shared/system-app-index');

function parseParams(event) {
  if (event.httpMethod === 'POST') {
    if (!event.body) {
      throw new Error('POST requests must include a JSON body.');
    }

    try {
      return JSON.parse(event.body);
    } catch (parseError) {
      console.error('Failed to parse JSON body in mcp-sysapps-get-device-apps:', parseError);
      const devDetail =
        isDevelopment() && parseError && parseError.message
          ? ` Parse error: ${parseError.message}`
          : '';
      throw new Error(`Request body must be valid JSON.${devDetail}`);
    }
  }

  return {
    make: event.queryStringParameters?.make,
    model: event.queryStringParameters?.model,
    os: event.queryStringParameters?.os,
    offset: event.queryStringParameters?.offset,
    limit: event.queryStringParameters?.limit,
  };
}

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
    const result = await getDeviceSystemApps(params);
    return jsonResponse(200, result);
  } catch (error) {
    const message = error && typeof error.message === 'string' ? error.message : '';
    const isClientError =
      message.includes('Parameter') ||
      message.includes('Request body must be valid JSON') ||
      message.includes('POST requests must include a JSON body');

    const statusCode = error && error.code === 'NOT_FOUND' ? 404 : isClientError ? 400 : 500;

    return jsonResponse(statusCode, {
      error: 'sysapps_get_device_apps_failed',
      message: safeMessage(error, 'System-app device lookup failed.'),
    });
  }
};
