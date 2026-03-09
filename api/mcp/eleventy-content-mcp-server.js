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
const {
  compareDeviceSystemApps: compareDeviceSystemAppsShared,
  getDeviceSystemApps: getDeviceSystemAppsShared,
  listSystemAppDevices: listSystemAppDevicesShared,
  searchSystemApps: searchSystemAppsShared,
} = require('../../netlify/functions/_shared/system-app-index');

/**
 * Reuse the shared index/search helpers so Netlify HTTP and stdio MCP paths
 * stay aligned and avoid logic drift over time.
 */

async function main() {
  const docs = await loadIndex();
  const searchableDocs = await loadSearchView();

  const server = new McpServer({
    name: 'bayton-content',
    version: '0.2.0',
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
          limit: z.number().int().min(1).max(30).default(20).describe('Maximum number of results to return.'),
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

  /**
   * List available devices in the system-app dataset.
   */
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
      content: [
        {
          type: 'text',
          text: JSON.stringify(await listSystemAppDevicesShared(params), null, 2),
        },
      ],
    })
  );

  /**
   * Fetch system apps for one exact device.
   */
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
    async params => ({
      content: [
        {
          type: 'text',
          text: JSON.stringify(await getDeviceSystemAppsShared(params), null, 2),
        },
      ],
    })
  );

  /**
   * Search packages by package name, app name, or aliases.
   */
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
      content: [
        {
          type: 'text',
          text: JSON.stringify(await searchSystemAppsShared(params), null, 2),
        },
      ],
    })
  );

  /**
   * Compare package overlap and differences for two exact devices.
   */
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
      content: [
        {
          type: 'text',
          text: JSON.stringify(await compareDeviceSystemAppsShared(params), null, 2),
        },
      ],
    })
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(error => {
  // Fail fast and print enough context for operational debugging.
  console.error('Failed to start bayton-content MCP server:', error);
  process.exit(1);
});
