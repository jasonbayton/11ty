const { parseDocument } = require('htmlparser2');

// This is an excerpt, never markup for execution or a complete article body.
module.exports = function richSummary(html) {
  const root = parseDocument(String(html || ''), { decodeEntities: true });
  const runs = [];
  let length = 0, truncated = false;
  const excluded = new Set(['template', 'script', 'style', 'nav', 'noscript', 'iframe', 'svg', 'form', 'button']);
  const blocks = new Set(['p', 'div', 'section', 'article', 'blockquote', 'pre', 'ul', 'ol', 'h1', 'h2', 'h3', 'h4', 'table', 'tr']);
  function append(text, style = {}) {
    if (!text) return;
    if (length >= 600 || runs.length >= 40) { truncated = true; return; }
    let points = Array.from(text);
    if (points.length > 600 - length) { points = points.slice(0, 600 - length); truncated = true; }
    const value = points.join('');
    const previous = runs.at(-1);
    if (previous && ['bold', 'italic', 'code'].every(k => previous[k] === style[k])) previous.text += value;
    else runs.push({ text: value, ...style });
    length += points.length;
  }
  function boundary() {
    if (runs.length && !runs.at(-1).text.endsWith('\n\n')) append('\n\n');
  }
  function visit(node, style = {}, pre = false) {
    if (node.type === 'text') {
      let text = pre ? node.data.replace(/\r\n?/g, '\n').replace(/\t/g, '    ') : node.data.replace(/\s+/g, ' ');
      text = text.replace(/[\x00-\x08\x0b-\x1f\x7f-\x9f]/g, '');
      if (!pre && (!runs.length || /[\s]$/.test(runs.at(-1).text))) text = text.trimStart();
      append(text, style); return;
    }
    if (excluded.has(node.name) || node.attribs?.['aria-hidden'] === 'true' || node.attribs?.hidden !== undefined) return;
    if (blocks.has(node.name) || node.name === 'li') boundary();
    if (node.name === 'li') append('• ');
    if (['td', 'th'].includes(node.name) && runs.length) append(' | ');
    if (node.name === 'br') append('\n');
    const next = { ...style };
    if (['strong', 'b', 'h1', 'h2', 'h3', 'h4'].includes(node.name)) next.bold = true;
    if (['em', 'i'].includes(node.name)) next.italic = true;
    if (['code', 'pre'].includes(node.name)) next.code = true;
    for (const child of node.children || []) visit(child, next, pre || node.name === 'pre');
    if (blocks.has(node.name) || node.name === 'li') boundary();
  }
  visit(root);
  while (runs.length && !runs.at(-1).text.trim()) runs.pop();
  if (runs.length) runs.at(-1).text = runs.at(-1).text.trimEnd();
  // Hard cap the encoded excerpt, including pathological style fragmentation.
  const result = { version: 1, truncated, runs };
  while (Buffer.byteLength(JSON.stringify(result)) > 3500 && runs.length) { runs.pop(); result.truncated = true; }
  return result;
};
