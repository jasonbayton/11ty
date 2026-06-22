#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");

const includeOutput = process.argv.includes("--include-output");

const roots = [
  ".eleventy.js",
  "README.md",
  "netlify.toml",
  "package.json",
  ".github",
  "_scripts",
  "api",
  "netlify",
  "scripts",
  "_src",
];

if (includeOutput) {
  roots.push("_public");
}

const ignoredDirs = new Set([
  ".git",
  ".netlify",
  "node_modules",
]);

const ignoredFiles = new Set([
  "package-lock.json",
]);

const textExtensions = new Set([
  "",
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".njk",
  ".toml",
  ".txt",
  ".unpublished",
  ".xml",
  ".yaml",
  ".yml",
]);

const checks = [
  {
    name: "URL host is glued to another scheme",
    pattern: /(?:https?:)?\/\/[a-z0-9.-]+\.[a-z]{2,}https?:\/\//gi,
  },
  {
    name: "Domain is glued to a URL scheme",
    pattern: /(?<!\/)\b(?:www\.)?[a-z0-9.-]+\.[a-z]{2,}https?:\/\//gi,
  },
];

function isTextFile(filePath) {
  if (ignoredFiles.has(path.basename(filePath))) {
    return false;
  }

  return textExtensions.has(path.extname(filePath));
}

function walk(entryPath, files) {
  if (!fs.existsSync(entryPath)) {
    return;
  }

  const stats = fs.statSync(entryPath);
  const baseName = path.basename(entryPath);

  if (stats.isDirectory()) {
    if (ignoredDirs.has(baseName)) {
      return;
    }

    for (const child of fs.readdirSync(entryPath)) {
      walk(path.join(entryPath, child), files);
    }
    return;
  }

  if (stats.isFile() && isTextFile(entryPath)) {
    files.push(entryPath);
  }
}

function getColumn(line, index) {
  return line.slice(0, index).length + 1;
}

const files = [];

for (const root of roots) {
  walk(path.join(repoRoot, root), files);
}

const findings = [];

for (const file of files) {
  const relFile = path.relative(repoRoot, file);
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split(/\r?\n/);

  lines.forEach((line, lineIndex) => {
    for (const check of checks) {
      check.pattern.lastIndex = 0;
      let match;

      while ((match = check.pattern.exec(line)) !== null) {
        findings.push({
          file: relFile,
          line: lineIndex + 1,
          column: getColumn(line, match.index),
          check: check.name,
          match: match[0],
        });
      }
    }
  });
}

if (findings.length) {
  console.error(`Malformed URL check failed with ${findings.length} finding(s):`);
  for (const finding of findings) {
    console.error(
      `${finding.file}:${finding.line}:${finding.column} ${finding.check}: ${finding.match}`,
    );
  }
  process.exit(1);
}

console.log(`Malformed URL check passed across ${files.length} file(s).`);
