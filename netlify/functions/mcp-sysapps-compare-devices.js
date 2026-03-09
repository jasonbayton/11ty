/**
 * Netlify Function adapter for comparing system apps between two devices.
 *
 * Endpoint: /.netlify/functions/mcp-sysapps-compare-devices
 * Method: GET (query string) or POST (JSON body)
 */

const {
  isDevelopment,
  jsonResponse,
  noContentResponse,
  safeMessage,
} = require('./_shared/content-index');
const { compareDeviceSystemApps } = require('./_shared/system-app-index');

function parseParams(event) {
  if (event.httpMethod === 'POST') {
    if (!event.body) {
      throw new Error('POST requests must include a JSON body.');
    }

    try {
      return JSON.parse(event.body);
    } catch (parseError) {
      console.error('Failed to parse JSON body in mcp-sysapps-compare-devices:', parseError);
      const devDetail =
        isDevelopment() && parseError && parseError.message
          ? ` Parse error: ${parseError.message}`
          : '';
      throw new Error(`Request body must be valid JSON.${devDetail}`);
    }
  }

  return {
    left_make: event.queryStringParameters?.left_make,
    left_model: event.queryStringParameters?.left_model,
    left_os: event.queryStringParameters?.left_os,
    right_make: event.queryStringParameters?.right_make,
    right_model: event.queryStringParameters?.right_model,
    right_os: event.queryStringParameters?.right_os,
    diff_limit: event.queryStringParameters?.diff_limit,
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
    const result = await compareDeviceSystemApps(params);
    return jsonResponse(200, result);
  } catch (error) {
    const message = error && typeof error.message === 'string' ? error.message : '';
    const isClientError =
      message.includes('Parameter') ||
      message.includes('Request body must be valid JSON') ||
      message.includes('POST requests must include a JSON body');

    const statusCode = error && error.code === 'NOT_FOUND' ? 404 : isClientError ? 400 : 500;

    return jsonResponse(statusCode, {
      error: 'sysapps_compare_devices_failed',
      message: safeMessage(error, 'System-app compare failed.'),
    });
  }
};
