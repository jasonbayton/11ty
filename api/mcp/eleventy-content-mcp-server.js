#!/usr/bin/env node

/**
 * MCP server exposing Eleventy-generated content.
 *
 * This implementation is intentionally small and heavily commented so it can
 * be used as a blueprint and adapted safely.
 */

const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const z = require('zod/v4');
const {
  loadIndex,
  loadSearchView,
  searchDocs,
  validateSearchParams,
  validateUrlParams,
} = require('../../netlify/functions/_shared/content-index');

/**
 * Reuse the shared index/search helpers so Netlify HTTP and stdio MCP paths
 * stay aligned and avoid logic drift over time.
 */

async function main() {
  const docs = await loadIndex();
  const searchableDocs = await loadSearchView();

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
          query: z.string().min(2).describe('Search query in plain text.'),
          limit: z.number().int().min(1).max(20).default(5).describe('Maximum number of results to return.'),
        },
    },
    async params => {
      const { query, limit } = validateSearchParams(params);
      const { totalMatches, results } = searchDocs(searchableDocs, query, limit);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ totalIndexed: searchableDocs.length, totalMatches, returned: results.length, results }, null, 2),
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
          url: z.string().min(1).describe('Path such as /docs/linux/ubuntu/...'),
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
