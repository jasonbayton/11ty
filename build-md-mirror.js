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
const BRAND_ACCENT = '#ff4500';   // bayton.org --orange
const OKAIDIA_MUTED = '#75715e';
const BRAND_BLUE = '#0283bd';     // bayton.org --main-blue
const BRAND_GREEN = '#15B007';    // bayton.org --main-green

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
  .toolbar-btn {
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
    text-decoration: none;
  }
  .toolbar-btn:hover { background: rgba(255,255,255,0.2); text-decoration: none; }
  .toolbar button:hover { background: rgba(255,255,255,0.2); }
  .toolbar button.copied { background: rgba(21,176,7,0.3); }
</style>
</head>
<body>
<div class="toolbar">
  <a href="/" class="toolbar-btn" title="Home">
    <span class="material-symbols-outlined">home</span>
  </a>
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
  a { color: ${BRAND_ACCENT}; text-decoration: none; }
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
  #searchField:focus { border-color: ${BRAND_ACCENT}; }
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
  // Build a nested tree structure from URL paths
  function insertIntoTree(node, parts, page) {
    if (parts.length === 0) {
      node._pages = node._pages || [];
      node._pages.push(page);
      return;
    }
    const [head, ...rest] = parts;
    if (!node[head]) node[head] = {};
    insertIntoTree(node[head], rest, page);
  }

  const root = {};
  for (const p of pages) {
    const parts = p.url.split('/').filter(Boolean);
    if (parts.length === 0) continue;
    insertIntoTree(root, parts, p);
  }

  // Recursively render the tree as nested <ul> with collapsible dirs
  function renderTree(node, depth = 0) {
    const dirs = Object.keys(node).filter(k => k !== '_pages').sort();
    const files = (node._pages || []).sort((a, b) => a.title.localeCompare(b.title));
    if (dirs.length === 0 && files.length === 0) return '';

    let html = '<ul>';
    for (const dir of dirs) {
      const childCount = countPages(node[dir]);
      const open = depth < 1 ? ' open' : '';
      html += `<li class="dir">
        <details${open}>
          <summary><span class="material-symbols-outlined icon">folder</span> ${escapeHtml(dir)} <span class="count">${childCount}</span></summary>
          ${renderTree(node[dir], depth + 1)}
        </details>
      </li>`;
    }
    for (const f of files) {
      html += `<li class="file"><span class="material-symbols-outlined icon">description</span> <a href="${escapeHtml(f.url)}">${escapeHtml(f.title)}</a></li>`;
    }
    html += '</ul>';
    return html;
  }

  function countPages(node) {
    let count = (node._pages || []).length;
    for (const k of Object.keys(node)) {
      if (k !== '_pages') count += countPages(node[k]);
    }
    return count;
  }

  const treeHtml = renderTree(root);

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
    font-size: 14px; line-height: 1.6;
    max-width: 900px;
  }
  a { color: ${BRAND_ACCENT}; text-decoration: none; }
  a:hover { text-decoration: underline; }
  h1 { font-size: 1.8rem; margin: 0 0 0.25rem; }
  .subtitle { color: ${OKAIDIA_MUTED}; margin: 0 0 1.5rem; font-size: 0.95rem; }
  .nav { display: flex; gap: 1rem; margin-bottom: 1.5rem; align-items: center; }
  .nav a {
    padding: 0.4rem 0.75rem; border-radius: 6px;
    background: rgba(255,255,255,0.08); color: ${OKAIDIA_FG};
    font-size: 0.85rem; display: flex; align-items: center; gap: 0.3rem;
  }
  .nav a:hover { background: rgba(255,255,255,0.15); text-decoration: none; }

  #search-field { position: relative; margin-bottom: 1.5rem; }
  #searchField {
    width: 100%; padding: 0.75rem 2.5rem 0.75rem 1rem;
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
    border-radius: 6px; color: ${OKAIDIA_FG}; font-size: 1rem; outline: none;
  }
  #searchField:focus { border-color: ${BRAND_ACCENT}; }
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

  /* Tree */
  .tree ul { list-style: none; padding-left: 1.25rem; margin: 0; }
  .tree > ul { padding-left: 0; }
  .tree li { padding: 2px 0; }
  .tree .icon { font-size: 16px; vertical-align: middle; margin-right: 2px; }
  .tree .dir > details > summary .icon { color: ${BRAND_GREEN}; }
  .tree .file .icon { color: ${OKAIDIA_MUTED}; }
  .tree .count { color: ${OKAIDIA_MUTED}; font-size: 0.8em; margin-left: 0.3em; }
  .tree summary {
    cursor: pointer; padding: 2px 4px; border-radius: 4px;
    list-style: none; display: flex; align-items: center; gap: 2px;
  }
  .tree summary::-webkit-details-marker { display: none; }
  .tree summary::before {
    content: '';
    display: inline-block; width: 0; height: 0;
    border-left: 5px solid ${OKAIDIA_FG}; border-top: 4px solid transparent; border-bottom: 4px solid transparent;
    margin-right: 4px; transition: transform 0.15s;
  }
  .tree details[open] > summary::before { transform: rotate(90deg); }
  .tree summary:hover { background: rgba(255,255,255,0.05); }
  .tree .file { display: flex; align-items: center; gap: 2px; padding-left: 13px; }

  .footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1); color: ${OKAIDIA_MUTED}; font-size: 0.8rem; }
  .footer a { color: ${BRAND_BLUE}; }
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
<div class="tree">
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
