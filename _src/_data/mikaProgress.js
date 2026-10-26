// Trial UI is enabled only for draft branch deployments.
module.exports = process.env.BRANCH === 'draft' && process.env.CONTEXT === 'branch-deploy';
