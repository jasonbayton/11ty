const { lookupContent, MarkdownUnavailableError } = require('./content-lookup');
// Generated pages may have complete indexed text but no Markdown mirror file.
// Bound this new fallback; never clip it or change existing Markdown delivery.
const MAX_INDEXED_TEXT_BYTES = 64 * 1024;
class IndexedTextUnavailableError extends MarkdownUnavailableError {
  constructor(reason) { super('A complete indexed-text read is unavailable.'); this.reason = reason; }
}
function canonicalPath(value) {
  if (typeof value !== 'string' || /[\\\x00-\x20\x7f]/.test(value)) return null;
  const path = value.startsWith('https://bayton.org/') ? value.slice('https://bayton.org'.length) : value;
  if (!path.startsWith('/') || path.startsWith('//')) return null;
  try {
    const parsed = new URL(path, 'https://bayton.org');
    const encoded = path.replace(/[^\x21-\x7e]/gu, character => encodeURIComponent(character));
    return parsed.origin === 'https://bayton.org' && parsed.pathname === encoded && !parsed.search && !parsed.hash ? path : null;
  } catch { return null; }
}
async function lookupWebsiteContent(docs, url, fetcher = fetch, budget = { remaining: MAX_INDEXED_TEXT_BYTES }) {
  // Validate independently: MarkdownUnavailableError also covers invalid sources.
  const path = canonicalPath(url);
  if (!path) return null;
  const found = docs.find(doc => doc.url === path);
  if (!found) return null;
  try {
    return await lookupContent(docs, { url: path, format: 'markdown' }, fetcher);
  } catch (error) {
    if (!(error instanceof MarkdownUnavailableError)) throw error;
    const text = typeof found.content === 'string' ? found.content : '';
    if (!text.trim()) throw new IndexedTextUnavailableError('empty');
    const bytes = Buffer.byteLength(text, 'utf8');
    if (bytes > MAX_INDEXED_TEXT_BYTES || bytes > budget.remaining) throw new IndexedTextUnavailableError('budget');
    budget.remaining -= bytes;
    return {
      title: found.title, url: found.url, content: text, format: 'text',
      delivery: 'complete_indexed_text',
      note: 'The Markdown source is unavailable. This is the complete text in the deployed search index; formatting and links were removed during indexing.',
    };
  }
}
module.exports = { lookupWebsiteContent, MAX_INDEXED_TEXT_BYTES, IndexedTextUnavailableError };
