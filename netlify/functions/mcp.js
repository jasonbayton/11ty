/**
 * Netlify Function exposing a Streamable HTTP MCP endpoint.
 *
 * Route: /mcp (via exported config)
 *
 * This provides a remote MCP-compatible endpoint for clients that support
 * Streamable HTTP directly, or via local proxy tools such as `mcp-remote`.
 */

const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const {
  WebStandardStreamableHTTPServerTransport,
} = require('@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js');
const {
  buildSearchView,
  createSearchMatcher,
  loadIndex,
} = require('./_shared/content-index');

/**
 * Validate and normalise search parameters.
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
 * Build the MCP server and register tools/resources.
 *
 * @returns {Promise<McpServer>}
 */
async function createServer() {
  const docs = await loadIndex();
  const searchableDocs = buildSearchView(docs);

  const server = new McpServer({
    name: 'bayton-content-remote',
    version: '0.1.0',
  });

  // Tool: keyword search over title + content.
  server.registerTool(
    'search_content',
    {
      title: 'Search site content',
      description: 'Keyword search across titles and body text from search-index.json.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', minLength: 2, description: 'Search query in plain text.' },
          limit: {
            type: 'number',
            minimum: 1,
            maximum: 20,
            default: 5,
            description: 'Maximum number of results to return.',
          },
        },
        required: ['query'],
      },
    },
    async params => {
      const { query, limit } = validateSearchParams(params);
      const matcher = createSearchMatcher(query);
      const results = searchableDocs
        .filter(doc => matcher.test(doc.haystack))
        .slice(0, limit)
        .map(doc => ({
          title: doc.title,
          url: doc.url,
          snippet: (doc.content || '').slice(0, 320),
        }));

      return {
        content: [{ type: 'text', text: JSON.stringify({ total: results.length, results }, null, 2) }],
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
        type: 'object',
        properties: {
          url: { type: 'string', minLength: 1, description: 'Path such as /android/...' },
        },
        required: ['url'],
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
