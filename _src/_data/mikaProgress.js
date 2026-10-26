// Enable lookup progress on the live site and the tested draft branch.
module.exports = process.env.CONTEXT === 'production'
  || (process.env.BRANCH === 'draft' && process.env.CONTEXT === 'branch-deploy');
