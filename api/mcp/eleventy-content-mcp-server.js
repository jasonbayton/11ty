#!/usr/bin/env node

/**
 * MCP server exposing Eleventy-generated content.
 *
 * This implementation is intentionally small and heavily commented so it can
 * be used as a blueprint and adapted safely.
 */

const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  buildSearchView,
  createSearchMatcher,
  loadIndex,
} = require('../../netlify/functions/_shared/content-index');

/**
 * Reuse the shared index/search helpers so Netlify HTTP and stdio MCP paths
 * stay aligned and avoid logic drift over time.
 */

/**
 * Validate and normalise search tool inputs at runtime.
 *
 * @param {{query?: unknown, limit?: unknown}} params
 * @returns {{query: string, limit: number}}
 */
function validateSearchParams(params) {
  if (typeof params.query !== 'string' || params.query.trim().length < 2) {
    throw new Error('Parameter "query" must be a string with at least 2 characters.');
  }

  // Default to 5 when the client omits `limit`.
  const actualLimit = params.limit ?? 5;

  if (!Number.isInteger(actualLimit) || actualLimit < 1 || actualLimit > 20) {
    throw new Error('Parameter "limit" must be an integer between 1 and 20.');
  }

  return {
    query: params.query.trim(),
    limit: actualLimit,
  };
}

/**
 * Validate and normalise URL lookup inputs at runtime.
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


async function main() {
  const docs = await loadIndex();
  const searchableDocs = buildSearchView(docs);

  const server = new McpServer({
    name: 'bayton-content',
    version: '0.1.1',
  });

  /**
   * Search the Eleventy content by keyword.
   */
  server.registerTool(
    'search_content',
    {
      title: 'Search site content',
      description: 'Keyword search across titles and body text from search-index.json.',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search query in plain text.',
            minLength: 2,
          },
          limit: {
            type: 'number',
            description: 'Maximum number of results to return.',
            minimum: 1,
            maximum: 20,
            default: 5,
          },
        },
        required: ['query'],
      },
    },
    async params => {
      const { query, limit } = validateSearchParams(params);
      const matcher = createSearchMatcher(query);
      const matches = searchableDocs
        .filter(doc => matcher.test(doc.haystack))
        .slice(0, limit)
        .map(doc => ({
          title: doc.title,
          url: doc.url,
          snippet: (doc.content || '').slice(0, 320),
        }));

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ total: matches.length, results: matches }, null, 2),
          },
        ],
      };
    }
  );

  /**
   * Fetch one content item by its URL.
   */
  server.registerTool(
    'get_content_by_url',
    {
      title: 'Get content by URL',
      description: 'Return title and content for an exact site URL.',
      inputSchema: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'Path such as /docs/linux/ubuntu/...',
            minLength: 1,
          },
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
        content: [
          {
            type: 'text',
            text: JSON.stringify(found, null, 2),
          },
        ],
      };
    }
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(error => {
  // Fail fast and print enough context for operational debugging.
  console.error('Failed to start bayton-content MCP server:', error);
  process.exit(1);
});
