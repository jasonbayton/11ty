# MCP server blueprint for bayton.org content

This repository exposes Bayton.org content through MCP and HTTP adapters so AI clients can:

- search content quickly,
- retrieve full document content when needed,
- query Android system-app data by device/package.

## Current architecture

1. Eleventy builds `/search-index.json` from `collections.all`, emitting `title`, `url`, `date`, and parsed `content` for each document.
2. Runtime loaders read `_public/search-index.json` and `_src/_data/packages.json`.
3. MCP endpoint exposes:
   - `search_content(query, limit)`
   - `get_content_by_url(url)`
   - `sysapps_list_devices(make?, model?, os?, offset?, limit?)`
   - `sysapps_get_device_apps(make, model, os, offset?, limit?)`
   - `sysapps_search(query, offset?, limit?)`
   - `sysapps_compare_devices(left_make, left_model, left_os, right_make, right_model, right_os, diff_limit?)`

### Important behavior

- Search is intentionally **two-step retrieval**:
  - `search_content` returns ranked results with a contextual `snippet`.
  - `get_content_by_url` returns full indexed `content` for exact URLs.
- Search ranking is not simple text matching:
  - exact/phrase matches are preferred first,
  - guide and docs content is boosted over blog posts,
  - newer content receives a recency bonus based on the indexed `date`,
  - if `date` is missing or unparsable, ranking falls back to extracting a year from the URL when possible.

## Files in this repo

- Local stdio MCP server: `api/mcp/eleventy-content-mcp-server.js`
- Remote MCP endpoint (Streamable HTTP): `netlify/functions/mcp.js`
- HTTP search adapter: `netlify/functions/mcp-search-content.js`
- HTTP lookup adapter: `netlify/functions/mcp-get-content-by-url.js`
- Shared index/search helpers: `netlify/functions/_shared/content-index.js`
- Netlify functions/routing: `netlify.toml`

## Setup

Install dependencies:

```bash
npm install
```

Build content:

```bash
npm run build
```

Run the local stdio MCP server:

```bash
node api/mcp/eleventy-content-mcp-server.js
```

## Netlify routes (clean API paths)

Configured in `netlify.toml`:

- `/api/mcp` -> protocol MCP endpoint
- `/api/mcp/search-content` -> HTTP search adapter
- `/api/mcp/get-content-by-url` -> HTTP lookup adapter
- `/api/mcp/sysapps/list-devices` -> HTTP sysapps device list adapter
- `/api/mcp/sysapps/get-device-apps` -> HTTP sysapps exact device lookup adapter
- `/api/mcp/sysapps/search` -> HTTP sysapps package/app search adapter
- `/api/mcp/sysapps/compare-devices` -> HTTP sysapps compare adapter
- `/mcp` -> protocol MCP endpoint (alias)

Function bundles include `_public/search-index.json` and `_src/_data/packages.json` via `netlify.toml`, and content-index loader logic also supports a remote `/search-index.json` fallback when local file access is unavailable.

## Usage examples

### 1) HTTP search and full retrieval

Search:

```bash
curl "https://bayton.org/api/mcp/search-content?query=android&limit=3"
```

Search with spaces in query text (URL-encoded):

```bash
curl "https://bayton.org/api/mcp/search-content?query=android%20enterprise&limit=3"
```

Search with spaces using `--data-urlencode`:

```bash
curl -G "https://bayton.org/api/mcp/search-content" \
  --data-urlencode "query=android enterprise" \
  --data-urlencode "limit=3"
```

Search with JSON `POST` (no URL encoding needed):

```bash
curl -X POST "https://bayton.org/api/mcp/search-content" \
  -H "Content-Type: application/json" \
  -d '{"query":"android enterprise","limit":3}'
```

Get full indexed content for one URL:

```bash
curl "https://bayton.org/api/mcp/get-content-by-url?url=/android/"

# List available device tuples in system-app dataset
curl "https://bayton.org/api/mcp/sysapps/list-devices?limit=3"

# Fetch complete system-app list for a device (omit limit/offset for full result)
curl -G "https://bayton.org/api/mcp/sysapps/get-device-apps" \
  --data-urlencode "make=Samsung" \
  --data-urlencode "model=SM-A546B" \
  --data-urlencode "os=14"

# Search system-app dataset by package/app/alias
curl "https://bayton.org/api/mcp/sysapps/search?query=bluetooth&limit=3"
```

### 2) Protocol endpoint sanity check

The MCP endpoint expects MCP-compatible headers/transport. A bare `curl` may return `Not Acceptable`.

Minimal header check:

```bash
curl -i -H "Accept: text/event-stream" "https://bayton.org/api/mcp"
```

### 3) Inspect the MCP server

```bash
npx @modelcontextprotocol/inspector npx mcp-remote@next https://bayton.org/api/mcp
```

## Client configuration examples

### Claude Desktop (remote MCP via `mcp-remote`)

```json
{
  "mcpServers": {
    "bayton-content": {
      "command": "npx",
      "args": [
        "mcp-remote@next",
        "https://bayton.org/api/mcp"
      ]
    }
  }
}
```

### OpenAI API (Responses API MCP tool)

```python
from openai import OpenAI

client = OpenAI()

resp = client.responses.create(
    model="gpt-5",
    input="Find Android 14 enterprise changes and summarize with source URLs.",
    tools=[
        {
            "type": "mcp",
            "server_label": "bayton_content",
            "server_url": "https://bayton.org/api/mcp",
            "require_approval": "never"
        }
    ]
)

print(resp.output_text)
```

### Gemini API (Google GenAI SDK + MCP)

Gemini SDKs support MCP integration (currently documented as experimental), with automatic tool calling support in Python and JavaScript SDKs.

Python example using a stdio bridge to your remote MCP endpoint:

```python
import asyncio
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from google import genai

client = genai.Client()

server_params = StdioServerParameters(
    command="npx",
    args=["-y", "mcp-remote@next", "https://bayton.org/api/mcp"],
)

async def run():
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            response = await client.aio.models.generate_content(
                model="gemini-2.5-flash",
                contents="Search bayton.org for Android 14 policy changes.",
                config=genai.types.GenerateContentConfig(
                    tools=[session],
                ),
            )
            print(response.text)

asyncio.run(run())
```

Notes:

- Gemini MCP support is currently documented as experimental.
- Built-in support is tools-focused; resources/prompts support may vary by SDK/version.

### Claude Messages API (MCP connector)

```bash
curl https://api.anthropic.com/v1/messages \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: mcp-client-2025-04-04" \
  -d '{
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 1000,
    "messages": [{"role": "user", "content": "Search Bayton for Android 14 policy content."}],
    "mcp_servers": [
      {
        "type": "url",
        "name": "bayton-content",
        "url": "https://bayton.org/api/mcp"
      }
    ]
  }'
```

## Local development

Run Netlify emulation:

```bash
netlify dev
```

Then test:

```bash
curl "http://localhost:8888/api/mcp/search-content?query=android&limit=3"
curl "http://localhost:8888/api/mcp/get-content-by-url?url=/android/"
```

## Production notes

- `search_content` is optimized for discovery, not full grounding.
- For LLM grounding, call `get_content_by_url` on the best search hits.
- Cache behavior is per warm function container; new deploys refresh index data.

## References

- OpenAI MCP + connectors guide: https://platform.openai.com/docs/guides/tools-connectors-mcp
- OpenAI MCP integrations guide: https://platform.openai.com/docs/mcp
- Gemini function calling + MCP section: https://ai.google.dev/gemini-api/docs/function-calling
- Anthropic MCP connector (Messages API): https://docs.anthropic.com/en/docs/agents-and-tools/mcp-connector
- Anthropic Claude Code/Desktop MCP config docs: https://docs.anthropic.com/en/docs/claude-code/mcp
