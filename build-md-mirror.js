#!/usr/bin/env node

/**
 * Builds a raw markdown mirror of all published content for bayton.md.
 * Wraps source .md files (with frontmatter) in a minimal HTML page
 * with Prism.js syntax highlighting.
 *
 * Also generates:
 * - /search-index.json for client-side Fuse.js search
 * - /search/index.html search UI (reuses fuse-search worker)
 * - / homepage with auto-generated content tree
 *
 * No dependencies required.
 *
 * Usage: node build-md-mirror.js
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '_src');
const OUT_DIR = path.join(__dirname, '_public_md');

const SKIP_DIRS = new Set(['_includes', '_data', '_layouts', 'node_modules']);

// ── Helpers ──

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function parseFrontmatter(content) {
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) return { data: {}, body: content };
  const body = content.slice(fmMatch[0].length).trim();
  const data = {};
  for (const line of fmMatch[1].split('\n')) {
    const m = line.match(/^(\w+):\s*['"]?(.+?)['"]?\s*$/);
    if (m) data[m[1]] = m[2];
  }
  return { data, body };
}

function stripMarkdown(md) {
  return md
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')  // frontmatter
    .replace(/!\[.*?\]\(.*?\)/g, '')                    // images
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1')              // links → text
    .replace(/#{1,6}\s+/g, '')                          // headings
    .replace(/[*_~`>]/g, '')                            // formatting
    .replace(/\n{2,}/g, '\n')                           // blank lines
    .trim();
}

function walkDir(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, results);
    } else if (entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

function getUrlPath(filePath, data) {
  if (data.permalink) return data.permalink;
  let rel = path.relative(SRC_DIR, filePath).replace(/\.md$/, '');
  if (rel === 'index') return '/';
  return '/' + rel + '/';
}

// ── Shared styles ──

const SHARED_HEAD = `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap" rel="stylesheet">`;

const OKAIDIA_BG = '#272822';
const OKAIDIA_FG = '#f8f8f2';
const OKAIDIA_GREEN = '#a6e22e';
const OKAIDIA_MUTED = '#75715e';
const OKAIDIA_BLUE = '#66d9ef';
const OKAIDIA_ORANGE = '#fd971f';

// ── Page templates ──

function wrapInHtml(mdContent, title, urlPath) {
  const canonical = `https://bayton.org${urlPath}`;
  const slug = urlPath.replace(/\//g, '-').replace(/^-|-$/g, '') || 'index';
  const filename = `${slug}.md`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
${SHARED_HEAD}
<title>${escapeHtml(title)} — bayton.md</title>
<link rel="canonical" href="${canonical}">
<link href="https://unpkg.com/prismjs@1.20.0/themes/prism-okaidia.css" rel="stylesheet">
<style>
  body { margin: 0; padding: 0; background: ${OKAIDIA_BG}; }
  pre { margin: 0; padding: 1rem; padding-top: 3rem; }
  code { font-size: 14px; line-height: 1.5; }
  .toolbar { position: fixed; top: 0.75rem; right: 0.75rem; display: flex; gap: 0.5rem; z-index: 10; }
  .toolbar button {
    background: rgba(255,255,255,0.1);
    border: none;
    border-radius: 6px;
    padding: 6px;
    cursor: pointer;
    color: ${OKAIDIA_FG};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  }
  .toolbar button:hover { background: rgba(255,255,255,0.2); }
  .toolbar button.copied { background: rgba(166,226,46,0.3); }
</style>
</head>
<body>
<div class="toolbar">
  <button id="copy-btn" title="Copy to clipboard" onclick="copyMd()">
    <span class="material-symbols-outlined">content_copy</span>
  </button>
  <button id="download-btn" title="Download as .md" onclick="downloadMd()">
    <span class="material-symbols-outlined">download</span>
  </button>
</div>
<pre><code class="language-markdown">${escapeHtml(mdContent)}</code></pre>
<script src="https://unpkg.com/prismjs@1.20.0/prism.js"></script>
<script src="https://unpkg.com/prismjs@1.20.0/components/prism-markdown.min.js"></script>
<script src="https://unpkg.com/prismjs@1.20.0/components/prism-yaml.min.js"></script>
<script>
const rawMd = document.querySelector('pre code').textContent;
function copyMd() {
  navigator.clipboard.writeText(rawMd).then(() => {
    const btn = document.getElementById('copy-btn');
    btn.classList.add('copied');
    btn.querySelector('span').textContent = 'check';
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.querySelector('span').textContent = 'content_copy';
    }, 2000);
  });
}
function downloadMd() {
  const blob = new Blob([rawMd], { type: 'text/markdown' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = ${JSON.stringify(filename)};
  a.click();
  URL.revokeObjectURL(a.href);
}
</script>
</body>
</html>`;
}

function buildSearchPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
${SHARED_HEAD}
<title>Search — bayton.md</title>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0; padding: 2rem;
    background: ${OKAIDIA_BG}; color: ${OKAIDIA_FG};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    line-height: 1.6;
  }
  a { color: ${OKAIDIA_GREEN}; text-decoration: none; }
  a:hover { text-decoration: underline; }
  .header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
  .header a { color: ${OKAIDIA_MUTED}; font-size: 0.9rem; }
  h1 { margin: 0; font-size: 1.4rem; }
  #search-field { position: relative; margin-bottom: 1.5rem; }
  #searchField {
    width: 100%; padding: 0.75rem 2.5rem 0.75rem 1rem;
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
    border-radius: 6px; color: ${OKAIDIA_FG}; font-size: 1rem;
    outline: none;
  }
  #searchField:focus { border-color: ${OKAIDIA_GREEN}; }
  #searchField::placeholder { color: ${OKAIDIA_MUTED}; }
  #search-clear {
    position: absolute; right: 0.5rem; top: 50%; transform: translateY(-50%);
    background: none; border: none; color: ${OKAIDIA_MUTED}; cursor: pointer;
    padding: 4px; display: flex; align-items: center;
  }
  #search-clear:hover { color: ${OKAIDIA_FG}; }
  #searchResults ul { list-style: none; padding: 0; margin: 0; }
  #searchResults li { margin-bottom: 1rem; }
  #searchResults h2 { font-size: 1rem; margin: 0 0 0.25rem; }
  #searchResults p { margin: 0; color: ${OKAIDIA_MUTED}; font-size: 0.85rem; }
  #searchResults a { display: block; padding: 0.75rem; border-radius: 6px; }
  #searchResults a:hover { background: rgba(255,255,255,0.05); text-decoration: none; }
  .search-no-results { color: ${OKAIDIA_MUTED}; }
  #debouncing { color: ${OKAIDIA_MUTED}; }
  #debouncing::after { content: "Searching..."; }
</style>
</head>
<body>
<div class="header">
  <h1>Search</h1>
  <a href="/">← bayton.md</a>
</div>
<div id="search-field">
  <input type="search" placeholder="Type a word to begin.." id="searchField">
  <button type="button" id="search-clear" aria-label="Clear search" hidden>
    <span class="material-symbols-outlined">close</span>
  </button>
</div>
<div id="searchResults"></div>
<script src="/js/fuse-search.js"></script>
</body>
</html>`;
}

function buildHomePage(pages) {
  // Build a tree from URL paths
  const tree = {};
  for (const p of pages) {
    const parts = p.url.split('/').filter(Boolean);
    if (parts.length === 0) continue;
    const section = parts[0];
    if (!tree[section]) tree[section] = [];
    tree[section].push(p);
  }

  // Sort sections alphabetically, pages by title within each
  const sections = Object.keys(tree).sort();

  let treeHtml = '';
  for (const section of sections) {
    const items = tree[section].sort((a, b) => a.title.localeCompare(b.title));
    const preview = items.slice(0, 5);
    treeHtml += `<div class="section">
  <h2><a href="/${section}/">${escapeHtml(section)}</a> <span class="count">${items.length}</span></h2>
  <ul>
    ${preview.map(p => `<li><a href="${escapeHtml(p.url)}">${escapeHtml(p.title)}</a></li>`).join('\n    ')}
    ${items.length > 5 ? `<li class="more">${items.length - 5} more pages</li>` : ''}
  </ul>
</div>`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
${SHARED_HEAD}
<title>bayton.md</title>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0; padding: 2rem;
    background: ${OKAIDIA_BG}; color: ${OKAIDIA_FG};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    line-height: 1.6;
    max-width: 900px;
  }
  a { color: ${OKAIDIA_GREEN}; text-decoration: none; }
  a:hover { text-decoration: underline; }
  h1 { font-size: 1.8rem; margin: 0 0 0.25rem; }
  .subtitle { color: ${OKAIDIA_MUTED}; margin: 0 0 1.5rem; font-size: 0.95rem; }
  .nav { display: flex; gap: 1rem; margin-bottom: 2rem; align-items: center; }
  .nav a {
    padding: 0.4rem 0.75rem; border-radius: 6px;
    background: rgba(255,255,255,0.08); color: ${OKAIDIA_FG};
    font-size: 0.85rem; display: flex; align-items: center; gap: 0.3rem;
  }
  .nav a:hover { background: rgba(255,255,255,0.15); text-decoration: none; }
  #search-field { position: relative; margin-bottom: 2rem; }
  #searchField {
    width: 100%; padding: 0.75rem 2.5rem 0.75rem 1rem;
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
    border-radius: 6px; color: ${OKAIDIA_FG}; font-size: 1rem;
    outline: none;
  }
  #searchField:focus { border-color: ${OKAIDIA_GREEN}; }
  #searchField::placeholder { color: ${OKAIDIA_MUTED}; }
  #search-clear {
    position: absolute; right: 0.5rem; top: 50%; transform: translateY(-50%);
    background: none; border: none; color: ${OKAIDIA_MUTED}; cursor: pointer;
    padding: 4px; display: flex; align-items: center;
  }
  #search-clear:hover { color: ${OKAIDIA_FG}; }
  #searchResults ul { list-style: none; padding: 0; margin: 0; }
  #searchResults li { margin-bottom: 1rem; }
  #searchResults h2 { font-size: 1rem; margin: 0 0 0.25rem; }
  #searchResults p { margin: 0; color: ${OKAIDIA_MUTED}; font-size: 0.85rem; }
  #searchResults a { display: block; padding: 0.75rem; border-radius: 6px; }
  #searchResults a:hover { background: rgba(255,255,255,0.05); text-decoration: none; }
  .search-no-results { color: ${OKAIDIA_MUTED}; }
  #debouncing { color: ${OKAIDIA_MUTED}; }
  #debouncing::after { content: "Searching..."; }
  .sections { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
  .section { padding: 1rem; border-radius: 8px; background: rgba(255,255,255,0.04); }
  .section h2 { margin: 0 0 0.5rem; font-size: 1.1rem; text-transform: capitalize; }
  .section h2 .count { color: ${OKAIDIA_MUTED}; font-size: 0.8rem; font-weight: normal; }
  .section ul { list-style: none; padding: 0; margin: 0; }
  .section li { padding: 0.15rem 0; font-size: 0.85rem; }
  .section li.more { color: ${OKAIDIA_MUTED}; font-style: italic; }
  .footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1); color: ${OKAIDIA_MUTED}; font-size: 0.8rem; }
  .footer a { color: ${OKAIDIA_BLUE}; }
</style>
</head>
<body>
<h1>bayton.md</h1>
<p class="subtitle">The raw markdown source for <a href="https://bayton.org">bayton.org</a></p>
<div class="nav">
  <a href="https://github.com/jasonbayton/11ty">
    <span class="material-symbols-outlined" style="font-size:18px">code</span> Source
  </a>
</div>
<div id="search-field">
  <input type="search" placeholder="Search all pages.." id="searchField">
  <button type="button" id="search-clear" aria-label="Clear search" hidden>
    <span class="material-symbols-outlined">close</span>
  </button>
</div>
<div id="searchResults"></div>
<div class="sections">
${treeHtml}
</div>
<div class="footer">
  ${pages.length} pages mirrored. Built from <a href="https://github.com/jasonbayton/11ty">github.com/jasonbayton/11ty</a>.
</div>
<script src="/js/fuse-search.js"></script>
</body>
</html>`;
}

// ── Main build ──

// Clean output directory
if (fs.existsSync(OUT_DIR)) {
  fs.rmSync(OUT_DIR, { recursive: true });
}

const files = walkDir(SRC_DIR);
const pages = [];
let count = 0;

for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, body } = parseFrontmatter(content);

  if (data.status !== 'publish') continue;

  const urlPath = getUrlPath(filePath, data);
  const title = data.title || path.basename(filePath, '.md');
  const html = wrapInHtml(content, title, urlPath);
  const outPath = path.join(OUT_DIR, urlPath, 'index.html');

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);

  pages.push({
    title,
    url: urlPath,
    content: stripMarkdown(body),
  });

  count++;
}

// ── Search index ──

const searchIndex = pages.map(p => ({
  title: p.title,
  url: p.url,
  content: p.content,
}));
fs.writeFileSync(
  path.join(OUT_DIR, 'search-index.json'),
  JSON.stringify(searchIndex)
);

// ── Fuse search worker (reuse from main site) ──

const workerSrc = path.join(SRC_DIR, '_includes', '_assets', 'js', 'fuse-search-worker.js');
const searchJsSrc = path.join(SRC_DIR, '_includes', '_assets', 'js', 'fuse-search.js');
fs.mkdirSync(path.join(OUT_DIR, 'js'), { recursive: true });
fs.copyFileSync(workerSrc, path.join(OUT_DIR, 'js', 'fuse-search-worker.js'));
fs.copyFileSync(searchJsSrc, path.join(OUT_DIR, 'js', 'fuse-search.js'));

// ── Search page ──

fs.mkdirSync(path.join(OUT_DIR, 'search'), { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, 'search', 'index.html'), buildSearchPage());

// ── Homepage (auto-generated content tree) ──

fs.writeFileSync(path.join(OUT_DIR, 'index.html'), buildHomePage(pages));

console.log(`Mirrored ${count} pages to ${OUT_DIR}`);
console.log(`Search index: ${searchIndex.length} entries`);
