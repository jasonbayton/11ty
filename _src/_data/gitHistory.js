// const git = require('simple-git')();
// const fg = require('fast-glob');

// module.exports = async () => {
//     const files = await fg(['_src/**/*.md']);
//     const history = {};
  
//     for (const file of files) {
//       const log = await git.log({ file, n: 3 }); // Limit to 3 commits per file
//       history[`./${file}`] = log.all;
//     }
  
//     return history;
//   };

// This project uses a hybrid caching strategy to improve build performance by reducing repeated Git history scans.
// Workflow: `npm run refresh:git-history`: Updates a cached gitHistory.json by refreshing only changed files using `git diff HEAD~1` (or falling back to a full scan in CI).
// `npm run build`: Refreshes git history and then runs Eleventy for production builds.
// `npm run serve`: Same as build, but starts Eleventy in serve mode for local development.
// The cache is located in `_src/_data/gitHistory.json` and is automatically updated before every build/serve cycle."

const git = require('simple-git')();
const fs = require('fs');
const path = require('path');

const CACHE_PATH = path.resolve(__dirname, './gitHistory.json');

async function getChangedFiles() {
  try {
    const diff = await git.diff(['--name-only', 'HEAD~1']);
    const changed = diff.split('\n').filter(file => file.endsWith('.md'));

    if (changed.length === 0) {
      console.warn('⚠️ No changes detected or shallow clone detected, falling back to full scan.');
      const fallback = await git.raw(['ls-files', '_src/**/*.md']);
      return fallback.split('\n').filter(file => file.endsWith('.md'));
    }

    return changed;
  } catch (e) {
    console.error('Error fetching changed files, falling back to full markdown scan.', e);
    const files = await git.raw(['ls-files', '_src/**/*.md']);
    return files.split('\n').filter(file => file.endsWith('.md'));
  }
}

async function getGitLog(file) {
    const log = await git.log({ file, n: 5 });
    return log.all;
}

module.exports = async () => {
  let cache = {};
  let files = [];

  if (!fs.existsSync(CACHE_PATH)) {
    console.log('📦 No cache detected, running full scan...');
    const allFiles = await git.raw(['ls-files', '_src/**/*.md']);
    files = allFiles.split('\n').filter(file => file.endsWith('.md'));
  } else {
    cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8'));
    files = await getChangedFiles();
  }

  for (const file of files) {
    console.log(`📦 Refreshing history for: ${file}`);
    const history = await getGitLog(file);
    cache[`./${file}`] = history;
  }

  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
  console.log(`📦 gitHistory cache updated for ${files.length} file(s).`);
  return cache;
};
