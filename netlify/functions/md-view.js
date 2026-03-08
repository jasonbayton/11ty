/**
 * Return markdown source for a page URL path.
 *
 * Route target is controlled by redirects in netlify.toml.
 */

const fs = require('node:fs/promises');
const path = require('node:path');

const MARKDOWN_INDEX_PATH = path.resolve(process.cwd(), '_public', 'md-index.json');
let cachedDocs = null;

function getSiteOrigin() {
  const candidates = [process.env.URL, process.env.DEPLOY_URL, process.env.SITE_URL];

  for (const value of candidates) {
    if (typeof value !== 'string' || value.trim().length < 1) {
      continue;
    }
    try {
      return new URL(value).origin;
    } catch {
      // Ignore invalid values and keep checking candidates.
    }
  }

  return null;
}

function parseIndex(raw) {
  let parsed;
  if (!raw || raw.trim() === '') {
    parsed = [];
  } else {
    parsed = JSON.parse(raw);
  }

  if (!Array.isArray(parsed)) {
    throw new Error('Markdown index is invalid. Expected an array.');
  }

  return parsed
    .filter(item => item && item.url)
    .map(item => ({
      title: item.title == null ? '' : String(item.title),
      url: String(item.url),
      markdown: item.markdown == null ? '' : String(item.markdown),
    }));
}

async function loadIndex() {
  if (cachedDocs) {
    return cachedDocs;
  }

  try {
    const raw = await fs.readFile(MARKDOWN_INDEX_PATH, 'utf8');
    cachedDocs = parseIndex(raw);
    return cachedDocs;
  } catch (error) {
    if (!(error && error.code === 'ENOENT')) {
      throw error;
    }
  }

  const origin = getSiteOrigin();
  if (!origin) {
    throw new Error('Markdown index is unavailable. Ensure the Eleventy build has completed.');
  }

  const response = await fetch(`${origin}/md-index.json`, {
    headers: { accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Markdown index is unavailable. Ensure the Eleventy build has completed.');
  }

  const raw = await response.text();
  cachedDocs = parseIndex(raw);
  return cachedDocs;
}

function normalizePath(inputPath) {
  if (typeof inputPath !== 'string' || inputPath.trim() === '') {
    return '/';
  }

  let normalized = inputPath.trim();

  try {
    normalized = decodeURIComponent(normalized);
  } catch {
    // Keep original if the input is malformed percent-encoding.
  }

  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }

  normalized = normalized.replace(/\/{2,}/g, '/');
  return normalized;
}

function candidatePaths(urlPath) {
  if (urlPath === '/') {
    return ['/'];
  }

  const trimmed = urlPath.endsWith('/') ? urlPath.slice(0, -1) : urlPath;
  return [`${trimmed}/`, trimmed];
}

function markdownResponse(statusCode, body, contentType) {
  return {
    statusCode,
    headers: {
      'content-type': contentType,
      'cache-control': statusCode >= 200 && statusCode < 300 ? 'public, max-age=3600' : 'no-store',
      'x-robots-tag': 'noindex, nofollow',
      'access-control-allow-origin': '*',
    },
    body,
  };
}

exports.handler = async event => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET,OPTIONS',
        'access-control-allow-headers': 'content-type',
        'cache-control': 'no-store',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return markdownResponse(405, 'Method must be GET or OPTIONS.\n', 'text/plain; charset=utf-8');
  }

  try {
    const requestedPath = normalizePath(event.queryStringParameters?.path || '/');
    const docs = await loadIndex();
    const wanted = candidatePaths(requestedPath);
    const found = docs.find(doc => wanted.includes(doc.url));

    if (!found) {
      return markdownResponse(404, `# Not Found\n\nNo markdown source found for \`${requestedPath}\`.\n`, 'text/markdown; charset=utf-8');
    }

    const body = found.markdown && found.markdown.trim().length > 0
      ? found.markdown.endsWith('\n')
        ? found.markdown
        : `${found.markdown}\n`
      : `# ${found.title || 'Untitled'}\n`;

    return markdownResponse(200, body, 'text/markdown; charset=utf-8');
  } catch (error) {
    console.error('md-view failed:', error);
    return markdownResponse(500, '# Internal Error\n\nUnable to load markdown content.\n', 'text/markdown; charset=utf-8');
  }
};
