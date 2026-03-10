#!/usr/bin/env node

/**
 * Builds a raw markdown mirror of all published content for bayton.md.
 * Copies source .md files (with frontmatter intact) to _public_md/
 * at matching URL paths.
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
  const outPath = path.join(OUT_DIR, urlPath, 'index.md');

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.copyFileSync(filePath, outPath);
  count++;
}

// Copy the bayton.md homepage (kept outside _src/ to avoid 11ty processing)
const homePage = path.join(__dirname, 'md-home.md');
if (fs.existsSync(homePage)) {
  fs.copyFileSync(homePage, path.join(OUT_DIR, 'index.md'));
  count++;
}

console.log(`Mirrored ${count} pages to ${OUT_DIR}`);
