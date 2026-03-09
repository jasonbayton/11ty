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

/**
 * Ensure MCP tool results are successful, not just non-empty.
 *
 * @param {{isError?: boolean, content?: Array<{type?: string, text?: string}>}} result
 * @param {string} toolName
 */
function assertToolSuccess(result, toolName) {
  if (result && result.isError) {
    const detail = getToolText(result) || 'Unknown MCP tool error';
    throw new Error(`${toolName} returned an MCP error: ${detail}`);
  }
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

    const expectedTools = [
      'get_content_by_url',
      'search_content',
      'sysapps_compare_devices',
      'sysapps_get_device_apps',
      'sysapps_list_devices',
      'sysapps_search',
    ];

    const missingTools = expectedTools.filter(tool => !toolNames.includes(tool));
    if (missingTools.length > 0) {
      throw new Error(`Expected tools not found. Received: ${toolNames.join(', ')}`);
    }

    const searchResult = await client.callTool({
      name: 'search_content',
      arguments: {
        query: 'android',
        limit: 1,
      },
    });
    assertToolSuccess(searchResult, 'search_content');

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
      assertToolSuccess(byUrlResult, 'get_content_by_url');

      const byUrlText = getToolText(byUrlResult);
      if (!byUrlText) {
        throw new Error('get_content_by_url returned no text payload.');
      }
    }

    const listDevicesResult = await client.callTool({
      name: 'sysapps_list_devices',
      arguments: { limit: 1 },
    });
    assertToolSuccess(listDevicesResult, 'sysapps_list_devices');

    const listDevicesText = getToolText(listDevicesResult);
    if (!listDevicesText) {
      throw new Error('sysapps_list_devices returned no text payload.');
    }

    let selectedDevice = null;
    try {
      const parsed = JSON.parse(listDevicesText);
      selectedDevice = parsed?.devices?.[0] || null;
    } catch {
      // Ignore parse failure until explicit assertion below.
    }

    if (!selectedDevice || !selectedDevice.make || !selectedDevice.model || !selectedDevice.os) {
      throw new Error('sysapps_list_devices did not return a usable device tuple.');
    }

    const unpagedResult = await client.callTool({
      name: 'sysapps_get_device_apps',
      arguments: {
        make: selectedDevice.make,
        model: selectedDevice.model,
        os: selectedDevice.os,
      },
    });
    assertToolSuccess(unpagedResult, 'sysapps_get_device_apps');

    const unpagedText = getToolText(unpagedResult);
    if (!unpagedText) {
      throw new Error('sysapps_get_device_apps returned no text payload for unpaged query.');
    }

    let unpagedApps = [];
    try {
      const parsed = JSON.parse(unpagedText);
      unpagedApps = Array.isArray(parsed?.apps) ? parsed.apps : [];
    } catch {
      // Ignore parse failures until validation below.
    }

    if (unpagedApps.length < 1) {
      throw new Error('sysapps_get_device_apps returned no apps for selected device.');
    }

    const fullPackageNames = unpagedApps
      .map(app => app.packageName)
      .filter(Boolean)
      .sort();

    const pagedPackageNames = [];
    let offset = 0;
    const limit = 10;
    let hasMore = true;
    let guard = 0;

    while (hasMore) {
      guard += 1;
      if (guard > 200) {
        throw new Error('sysapps_get_device_apps pagination loop guard exceeded.');
      }

      const pagedResult = await client.callTool({
        name: 'sysapps_get_device_apps',
        arguments: {
          make: selectedDevice.make,
          model: selectedDevice.model,
          os: selectedDevice.os,
          offset,
          limit,
        },
      });
      assertToolSuccess(pagedResult, 'sysapps_get_device_apps (paged)');

      const pagedText = getToolText(pagedResult);
      if (!pagedText) {
        throw new Error('sysapps_get_device_apps returned no text payload for paged query.');
      }

      let parsedPage;
      try {
        parsedPage = JSON.parse(pagedText);
      } catch {
        throw new Error('sysapps_get_device_apps paged response was not valid JSON.');
      }

      const apps = Array.isArray(parsedPage.apps) ? parsedPage.apps : [];
      apps.forEach(app => {
        if (app && app.packageName) {
          pagedPackageNames.push(app.packageName);
        }
      });

      hasMore = Boolean(parsedPage.hasMore);
      if (hasMore) {
        if (!Number.isInteger(parsedPage.nextOffset) || parsedPage.nextOffset <= offset) {
          throw new Error('sysapps_get_device_apps returned an invalid nextOffset.');
        }
        offset = parsedPage.nextOffset;
      }
    }

    const dedupedPaged = Array.from(new Set(pagedPackageNames)).sort();

    if (fullPackageNames.length !== dedupedPaged.length) {
      throw new Error(
        `sysapps_get_device_apps pagination mismatch: full=${fullPackageNames.length}, paged=${dedupedPaged.length}`
      );
    }

    for (let i = 0; i < fullPackageNames.length; i += 1) {
      if (fullPackageNames[i] !== dedupedPaged[i]) {
        throw new Error('sysapps_get_device_apps pagination returned a different package set.');
      }
    }

    const searchSystemAppsResult = await client.callTool({
      name: 'sysapps_search',
      arguments: {
        query: fullPackageNames[0].slice(0, 3),
        limit: 1,
      },
    });
    assertToolSuccess(searchSystemAppsResult, 'sysapps_search');

    const compareResult = await client.callTool({
      name: 'sysapps_compare_devices',
      arguments: {
        left_make: selectedDevice.make,
        left_model: selectedDevice.model,
        left_os: selectedDevice.os,
        right_make: selectedDevice.make,
        right_model: selectedDevice.model,
        right_os: selectedDevice.os,
        diff_limit: 10,
      },
    });
    assertToolSuccess(compareResult, 'sysapps_compare_devices');

    const compareText = getToolText(compareResult);
    if (!compareText) {
      throw new Error('sysapps_compare_devices returned no text payload.');
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
