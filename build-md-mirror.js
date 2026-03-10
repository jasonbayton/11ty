#!/usr/bin/env node

/**
 * Builds a raw markdown mirror of all published content for bayton.md.
 * Wraps source .md files (with frontmatter) in a minimal HTML page
 * with Prism.js syntax highlighting.
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

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getTitle(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (fmMatch) {
    const titleMatch = fmMatch[1].match(/^title:\s*['"]?(.+?)['"]?\s*$/m);
    if (titleMatch) return titleMatch[1];
  }
  return path.basename(filePath, '.md');
}

function wrapInHtml(mdContent, title, urlPath) {
  const canonical = `https://bayton.org${urlPath}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)} — bayton.md</title>
<link rel="canonical" href="${canonical}">
<link href="https://unpkg.com/prismjs@1.20.0/themes/prism-okaidia.css" rel="stylesheet">
<style>
  body { margin: 0; padding: 0; background: #272822; }
  pre { margin: 0; padding: 1rem; }
  code { font-size: 14px; line-height: 1.5; }
</style>
</head>
<body>
<pre><code class="language-markdown">${escapeHtml(mdContent)}</code></pre>
<script src="https://unpkg.com/prismjs@1.20.0/prism.js"></script>
<script src="https://unpkg.com/prismjs@1.20.0/components/prism-markdown.min.js"></script>
<script src="https://unpkg.com/prismjs@1.20.0/components/prism-yaml.min.js"></script>
</body>
</html>`;
}

function isPublished(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) return false;
  return /^status:\s*publish\s*$/m.test(fmMatch[1]);
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

function getPermalink(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (fmMatch) {
    const plMatch = fmMatch[1].match(/^permalink:\s*(.+)$/m);
    if (plMatch) return plMatch[1].trim();
  }
  return null;
}

function getUrlPath(filePath) {
  const permalink = getPermalink(filePath);
  if (permalink) return permalink;
  let rel = path.relative(SRC_DIR, filePath).replace(/\.md$/, '');
  if (rel === 'index') return '/';
  return '/' + rel + '/';
}

// Clean output directory
if (fs.existsSync(OUT_DIR)) {
  fs.rmSync(OUT_DIR, { recursive: true });
}

const files = walkDir(SRC_DIR);
let count = 0;

for (const filePath of files) {
  if (!isPublished(filePath)) continue;

  const urlPath = getUrlPath(filePath);
  const mdContent = fs.readFileSync(filePath, 'utf8');
  const title = getTitle(filePath);
  const html = wrapInHtml(mdContent, title, urlPath);
  const outPath = path.join(OUT_DIR, urlPath, 'index.html');

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  count++;
}

// Copy the bayton.md homepage (kept outside _src/ to avoid 11ty processing)
const homePage = path.join(__dirname, 'md-home.md');
if (fs.existsSync(homePage)) {
  const mdContent = fs.readFileSync(homePage, 'utf8');
  const html = wrapInHtml(mdContent, 'bayton.md', '/');
  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), html);
  count++;
}

console.log(`Mirrored ${count} pages to ${OUT_DIR}`);
