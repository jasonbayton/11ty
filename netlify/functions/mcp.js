/**
 * Netlify Function exposing a Streamable HTTP MCP endpoint.
 *
 * Route: /mcp (via exported config)
 *
 * This provides a remote MCP-compatible endpoint for clients that support
 * Streamable HTTP directly, or via local proxy tools such as `mcp-remote`.
 */

const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const z = require('zod/v4');
const {
  WebStandardStreamableHTTPServerTransport,
} = require('@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js');
const {
  loadIndex,
  loadSearchView,
  noContentResponse,
  searchDocs,
  validateSearchParams,
  validateUrlParams,
} = require('./_shared/content-index');
const {
  compareDeviceSystemApps,
  getDeviceSystemApps,
  listSystemAppDevices,
  searchSystemApps,
} = require('./_shared/system-app-index');

/**
 * Build the MCP server and register tools/resources.
 *
 * @returns {Promise<McpServer>}
 */
async function createServer() {
  const docs = await loadIndex();
  const searchableDocs = await loadSearchView();

  const server = new McpServer({
    name: 'bayton-content-remote',
    version: '0.2.0',
  });

  // Tool: keyword search over title + content.
  server.registerTool(
    'search_content',
    {
      title: 'Search site content',
      description: 'Keyword search across titles and body text from search-index.json.',
        inputSchema: {
          query: z.string().min(2).describe('Search query in plain text.'),
          limit: z.number().int().min(1).max(30).default(20).describe('Maximum number of results to return.'),
        },
    },
    async params => {
      const { query, limit } = validateSearchParams(params);
      const { totalMatches, results } = searchDocs(searchableDocs, query, limit);

      return {
        content: [{ type: 'text', text: JSON.stringify({ totalIndexed: searchableDocs.length, totalMatches, returned: results.length, results }, null, 2) }],
      };
    }
  );

  // Tool: exact content fetch by URL.
  server.registerTool(
    'get_content_by_url',
    {
      title: 'Get content by URL',
      description: 'Return title and content for an exact site URL.',
        inputSchema: {
          url: z.string().min(1).describe('Path such as /android/...'),
        },
    },
    async params => {
      const { url } = validateUrlParams(params);
      const found = docs.find(doc => doc.url === url);

      if (!found) {
        return {
          content: [{ type: 'text', text: `No content found for URL: ${url}` }],
          isError: true,
        };
      }

      return {
        content: [{ type: 'text', text: JSON.stringify(found, null, 2) }],
      };
    }
  );

  // Tool: list available system-app devices.
  server.registerTool(
    'sysapps_list_devices',
    {
      title: 'List system-app devices',
      description: 'List available make/model/os tuples in the system-app dataset.',
      inputSchema: {
        make: z.string().optional().describe('Optional OEM filter (case-insensitive exact match).'),
        model: z.string().optional().describe('Optional model filter (exact match).'),
        os: z.string().optional().describe('Optional OS filter (exact match).'),
        offset: z.number().int().min(0).default(0).describe('Result offset.'),
        limit: z.number().int().min(1).max(100).default(25).describe('Maximum number of results to return.'),
      },
    },
    async params => ({
      content: [{ type: 'text', text: JSON.stringify(await listSystemAppDevices(params), null, 2) }],
    })
  );

  // Tool: fetch system apps for one exact device.
  server.registerTool(
    'sysapps_get_device_apps',
    {
      title: 'Get system apps for a device',
      description:
        'Return the system-app list for an exact make/model/os device tuple. Omit limit/offset to return all apps.',
      inputSchema: {
        make: z.string().min(1).describe('OEM name (case-insensitive exact match).'),
        model: z.string().min(1).describe('Device model (exact match).'),
        os: z.string().min(1).describe('OS version (exact match).'),
        offset: z.number().int().min(0).optional().describe('Result offset for paged calls.'),
        limit: z.number().int().min(1).max(100).optional().describe('Page size for paged calls.'),
      },
    },
    async params => {
      const result = await getDeviceSystemApps(params);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  // Tool: search for system apps globally.
  server.registerTool(
    'sysapps_search',
    {
      title: 'Search system apps',
      description: 'Search package names, app names, and aliases in the system-app dataset.',
      inputSchema: {
        query: z.string().min(2).describe('Search query in plain text.'),
        offset: z.number().int().min(0).default(0).describe('Result offset.'),
        limit: z.number().int().min(1).max(100).default(25).describe('Maximum number of results to return.'),
      },
    },
    async params => ({
      content: [{ type: 'text', text: JSON.stringify(await searchSystemApps(params), null, 2) }],
    })
  );

  // Tool: compare system apps between two exact devices.
  server.registerTool(
    'sysapps_compare_devices',
    {
      title: 'Compare system apps between devices',
      description: 'Return overlap and differences between two exact make/model/os device tuples.',
      inputSchema: {
        left_make: z.string().min(1).describe('Left device OEM.'),
        left_model: z.string().min(1).describe('Left device model.'),
        left_os: z.string().min(1).describe('Left device OS.'),
        right_make: z.string().min(1).describe('Right device OEM.'),
        right_model: z.string().min(1).describe('Right device model.'),
        right_os: z.string().min(1).describe('Right device OS.'),
        diff_limit: z.number().int().min(1).max(100).default(50).describe('Max number of left/right unique apps to return.'),
      },
    },
    async params => ({
      content: [{ type: 'text', text: JSON.stringify(await compareDeviceSystemApps(params), null, 2) }],
    })
  );

  return server;
}

/**
 * Convert Netlify event payloads into Web Standard Request objects.
 *
 * @param {{httpMethod: string, path: string, headers?: Record<string, string>, body?: string | null, isBase64Encoded?: boolean, rawQuery?: string, queryStringParameters?: Record<string, string>}} event
 * @returns {Request}
 */
function toWebRequest(event) {
  const headers = new Headers(event.headers || {});
  const protocol = headers.get('x-forwarded-proto') || 'https';
  const host = headers.get('host') || 'localhost';

  let query = '';
  if (typeof event.rawQuery === 'string' && event.rawQuery.length > 0) {
    query = event.rawQuery;
  } else if (event.queryStringParameters) {
    const params = new URLSearchParams();
    Object.entries(event.queryStringParameters).forEach(([key, value]) => {
      if (value != null) {
        params.set(key, value);
      }
    });
    query = params.toString();
  }

  const url = `${protocol}://${host}${event.path}${query ? `?${query}` : ''}`;

  const hasBody = event.body != null && event.body !== '';
  const body = hasBody
    ? event.isBase64Encoded
      ? Buffer.from(event.body, 'base64')
      : event.body
    : undefined;

  return new Request(url, {
    method: event.httpMethod,
    headers,
    body,
  });
}

/**
 * Convert a Web Standard Response into a Netlify Function response object.
 *
 * @param {Response} response
 * @returns {Promise<{statusCode: number, headers: Record<string, string>, body: string}>}
 */
async function fromWebResponse(response) {
  const headers = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });

  return {
    statusCode: response.status,
    headers,
    body: await response.text(),
  };
}

/**
 * Netlify Function handler for the /mcp route.
 */
exports.handler = async event => {
  let transport;
  let server;

  try {
    if (event.httpMethod === 'OPTIONS') {
      return noContentResponse();
    }

    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          allow: 'POST, OPTIONS',
          'cache-control': 'no-store',
        },
        body: JSON.stringify(
          {
            jsonrpc: '2.0',
            error: {
              code: -32600,
              message: 'Method not allowed. Use POST for MCP requests.',
            },
            id: null,
          },
          null,
          2
        ),
      };
    }

    const request = toWebRequest(event);
    server = await createServer();
    transport = new WebStandardStreamableHTTPServerTransport({
      // Stateless mode is preferred for serverless request/response lifecycle.
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });

    await server.connect(transport);

    const response = await transport.handleRequest(request);
    return fromWebResponse(response);
  } catch (error) {
    console.error('MCP HTTP endpoint failed:', error);

    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify(
        {
          jsonrpc: '2.0',
          error: {
            code: -32603,
            message: 'Internal server error',
          },
          id: null,
        },
        null,
        2
      ),
    };
  } finally {
    if (transport) {
      await transport.close();
    }
    if (server) {
      await server.close();
    }
  }
};

/**
 * Ensure this function responds on /mcp rather than /.netlify/functions/mcp.
 */
exports.config = {
  path: '/mcp',
};
