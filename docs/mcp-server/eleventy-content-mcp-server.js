#!/usr/bin/env node

/**
 * MCP server exposing Eleventy-generated content.
 *
 * This implementation is intentionally small and heavily commented so it can
 * be used as a blueprint and adapted safely.
 */

const fs = require('node:fs/promises');
const path = require('node:path');
const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { z } = require('zod');

/**
 * Resolve paths relative to the repository root.
 */
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const SEARCH_INDEX_PATH = path.join(REPO_ROOT, '_public', 'search-index.json');

/**
 * Load and sanitise the generated search index.
 *
 * @returns {Promise<Array<{title: string, url: string, content: string}>>}
 */
async function loadIndex() {
  const raw = await fs.readFile(SEARCH_INDEX_PATH, 'utf8');
  const parsed = JSON.parse(raw);

  // Eleventy template currently emits a trailing empty object; remove invalid
  // entries so tool handlers can rely on a consistent shape.
  return parsed.filter(item => item && item.url && item.title);
}

/**
 * Build a tiny searchable view for quick keyword matching.
 *
 * @param {Array<{title: string, url: string, content: string}>} docs
 * @returns {Array<{title: string, url: string, content: string, haystack: string}>}
 */
function buildSearchView(docs) {
  return docs.map(doc => ({
    ...doc,
    haystack: `${doc.title}\n${doc.content}`.toLowerCase(),
  }));
}

async function main() {
  const docs = await loadIndex();
  const searchableDocs = buildSearchView(docs);

  const server = new McpServer({
    name: 'bayton-content',
    version: '0.1.0',
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
        limit: z.number().int().min(1).max(20).default(5),
      },
    },
    async ({ query, limit }) => {
      const q = query.toLowerCase();
      const actualLimit = limit ?? 5;
      const matches = searchableDocs
        .filter(doc => doc.haystack.includes(q))
        .slice(0, actualLimit)
        .map(doc => ({
          title: doc.title,
          url: doc.url,
          snippet: doc.content.slice(0, 320),
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
        url: z.string().min(1).describe('Path such as /docs/linux/ubuntu/...'),
      },
    },
    async ({ url }) => {
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
