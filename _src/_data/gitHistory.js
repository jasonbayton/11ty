const git = require('simple-git')();
const fg = require('fast-glob');

module.exports = async () => {
    const files = await fg(['_src/**/*.md']);
    const history = {};
  
    for (const file of files) {
      const log = await git.log({ file, n: 3 }); // Limit to 3 commits per file
      history[`./${file}`] = log.all;
    }
  
    return history;
  };