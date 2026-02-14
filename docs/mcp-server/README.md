# MCP server blueprint for bayton.org content

This guide shows one practical way to expose this Eleventy content as an MCP server so AI clients can:

- search the published content,
- fetch page/article metadata,
- retrieve rendered content snippets for grounding.

## Why this approach fits this repository

The site already generates a machine-readable search index at `/search-index.json` from `collections.all`, including `title`, `url`, and parsed `content`. That means your MCP server can use one consistent source for retrieval without needing to parse every template format itself.

## Architecture

1. **Build the site** with Eleventy.
2. **Read `_public/search-index.json`** as the core content catalogue.
3. **Expose MCP tools**:
   - `search_content(query, limit)`
   - `get_content_by_url(url)`
4. **Optionally expose MCP resources** for full-document access.

## Minimal implementation

A ready-to-run, commented example server is provided at:

- `docs/mcp-server/eleventy-content-mcp-server.js`

It uses:

- `@modelcontextprotocol/sdk` for the MCP protocol,
- a small in-memory index loaded from Eleventy output.

## Setup

Install dependencies (inside this repo):

```bash
npm install --save @modelcontextprotocol/sdk zod
```

Build content before starting the MCP server:

```bash
npm run build
```

Run the server:

```bash
node docs/mcp-server/eleventy-content-mcp-server.js
```

## Client configuration example

For MCP clients that support stdio servers:

```json
{
  "mcpServers": {
    "bayton-content": {
      "command": "node",
      "args": [
        "/workspace/11ty/docs/mcp-server/eleventy-content-mcp-server.js"
      ]
    }
  }
}
```

## Production hardening ideas

- Add a build hook so search index refresh happens before MCP server restart.
- Cache a lower-cased token field for faster keyword matching.
- Add URL allow-listing to avoid exposing unpublished routes.
- Add `lastModified` metadata (for example via git history) in tool responses.
- Add optional semantic retrieval (embeddings) alongside keyword search.
