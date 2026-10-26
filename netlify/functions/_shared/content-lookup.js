const { validateUrlParams } = require('./content-index');

class MarkdownUnavailableError extends Error {}

function validateLookupParams(params) {
  const { url } = validateUrlParams(params);
  const format = params.format === undefined ? 'text' : params.format;
  if (!['text', 'markdown'].includes(format)) throw Error('Parameter format must be text or markdown.');
  return { url, format };
}

async function lookupContent(docs, params, fetcher = fetch) {
  const { url, format } = validateLookupParams(params);
  const found = docs.find(doc => doc.url === url);
  if (!found || format === 'text') return found || null;
  // Only an exact indexed canonical path can select a mirror article.
  const source = new URL(`${found.url.replace(/\/$/, '')}/index.md`, 'https://bayton.md');
  if (!found.url.startsWith('/') || source.origin !== 'https://bayton.md' || source.username || source.password) {
    throw new MarkdownUnavailableError('Markdown source is unavailable for this URL.');
  }
  try {
    const response = await fetcher(source.href, {
      headers: { accept: 'text/markdown, text/plain;q=0.9' },
      redirect: 'error',
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw Error('Mirror lookup failed.');
    const raw = await response.text();
    // A missing-file HTML response must never be labelled as Markdown.
    if (/^\s*(?:<!doctype\s+html|<html\b)/i.test(raw)) throw Error('Mirror returned HTML.');
    const content = raw;
    if (!content.trim()) throw Error('Mirror article is empty.');
    return { ...found, content, format: 'markdown', sourceUrl: source.href };
  } catch (error) {
    // Cancellation is not evidence that the Markdown mirror is unavailable.
    if (error?.name === 'AbortError' || error?.code === 'MIKA_DEADLINE') throw error;
    throw new MarkdownUnavailableError('Markdown source is temporarily unavailable.');
  }
}
module.exports = { lookupContent, validateLookupParams, MarkdownUnavailableError };
