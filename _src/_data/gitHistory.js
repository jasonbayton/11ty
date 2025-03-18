// This project uses a hybrid caching strategy to improve build performance by reducing repeated Git history scans.
// Workflow: `npm run refresh:git-history`: Updates a cached gitHistory.json by refreshing only changed files using `git diff HEAD~1` (or falling back to a full scan in CI).
// `npm run build`: Refreshes git history and then runs Eleventy for production builds.
// `npm run serve`: Same as build, but starts Eleventy in serve mode for local development.
// The cache is located in `_src/_data/gitHistory.json` and is automatically updated before every build/serve cycle."

const git = require('simple-git')();
const fs = require('fs');
const path = require('path');

const CACHE_PATH = path.resolve(__dirname, './gitHistory.json');
const CACHE_MAX_AGE_HOURS = 24;

async function getChangedFiles() {
  try {
    const diff = await git.diff(['--name-only', '--cached']);
    const unstaged = await git.diff(['--name-only']);
    const changedFiles = [...diff.split('\n'), ...unstaged.split('\n')]
      .filter(file => file.endsWith('.md'))
      .filter((value, index, self) => value && self.indexOf(value) === index);

    if (changedFiles.length === 0) {
      console.warn('📦 No changes detected, falling back to full scan.');
      const fallback = await git.raw(['ls-files', '_src/**/*.md']);
      return fallback.split('\n').filter(file => file.endsWith('.md'));
    }

    return changedFiles;
  } catch (e) {
    console.error('📦 Error fetching changed files, falling back to full markdown scan.', e);
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
    const stats = fs.statSync(CACHE_PATH);
    const ageInHours = (Date.now() - stats.mtimeMs) / (1000 * 60 * 60);

    if (ageInHours > CACHE_MAX_AGE_HOURS) {
      console.warn(`📦 Cache is older than ${CACHE_MAX_AGE_HOURS} hours. Running full scan.`);
      const allFiles = await git.raw(['ls-files', '_src/**/*.md']);
      files = allFiles.split('\n').filter(file => file.endsWith('.md'));
    } else {
      const cachedFiles = Object.keys(cache);
      const changedFiles = await getChangedFiles();
      files = changedFiles.filter(file => !cachedFiles.includes(`./${file}`));
    }
  }

  if (files.length === 0) {
    console.log('📦 Full scan up to date.');
    return cache;
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
