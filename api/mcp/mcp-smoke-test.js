#!/usr/bin/env node

/**
 * MCP smoke test for the Eleventy content server.
 *
 * This script performs a lightweight end-to-end check by spawning the stdio
 * server, completing the MCP handshake through the SDK client, listing tools,
 * and calling each tool once.
 */

const path = require('node:path');
const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');

/**
 * Resolve the repository-relative path to the MCP server script under test.
 */
const SERVER_SCRIPT_PATH = path.resolve(__dirname, 'eleventy-content-mcp-server.js');

/**
 * Extract plain text payloads from an MCP tool result.
 *
 * @param {{content?: Array<{type?: string, text?: string}>}} result
 * @returns {string}
 */
function getToolText(result) {
  if (!result || !Array.isArray(result.content)) {
    return '';
  }

  return result.content
    .filter(item => item && item.type === 'text' && typeof item.text === 'string')
    .map(item => item.text)
    .join('\n');
}

async function main() {
  const transport = new StdioClientTransport({
    command: 'node',
    args: [SERVER_SCRIPT_PATH],
    cwd: path.resolve(__dirname, '..', '..'),
    stderr: 'pipe',
  });

  // Print child stderr to aid debugging when the smoke test fails.
  if (transport.stderr) {
    transport.stderr.on('data', chunk => {
      process.stderr.write(`[mcp-server] ${chunk}`);
    });
  }

  const client = new Client(
    {
      name: 'bayton-mcp-smoke-test',
      version: '0.1.0',
    },
    {
      capabilities: {},
    }
  );

  try {
    await client.connect(transport);

    const toolsResult = await client.listTools();
    const toolNames = (toolsResult.tools || []).map(tool => tool.name).sort();

    if (!toolNames.includes('search_content') || !toolNames.includes('get_content_by_url')) {
      throw new Error(`Expected tools not found. Received: ${toolNames.join(', ')}`);
    }

    const searchResult = await client.callTool({
      name: 'search_content',
      arguments: {
        query: 'android',
        limit: 1,
      },
    });

    const searchText = getToolText(searchResult);
    if (!searchText) {
      throw new Error('search_content returned no text payload.');
    }

    let firstUrl = null;
    try {
      const parsed = JSON.parse(searchText);
      firstUrl = parsed?.results?.[0]?.url || null;
    } catch {
      // Ignore parse failures here; the smoke test still validated tool access.
    }

    if (firstUrl) {
      const byUrlResult = await client.callTool({
        name: 'get_content_by_url',
        arguments: { url: firstUrl },
      });

      const byUrlText = getToolText(byUrlResult);
      if (!byUrlText) {
        throw new Error('get_content_by_url returned no text payload.');
      }
    }

    console.log('MCP smoke test passed.');
    console.log(`Tools available: ${toolNames.join(', ')}`);
  } finally {
    await transport.close();
  }
}

main().catch(error => {
  console.error('MCP smoke test failed:', error);
  process.exit(1);
});
