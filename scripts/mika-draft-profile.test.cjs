const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const generator = path.join(__dirname, 'create-mika-draft-profiler.cjs');
const generated = path.join(root, 'netlify/functions/mika-draft-profile.js');
const streamProbe = path.join(root, 'netlify/functions/mika-draft-stream-probe.mjs');
function generate(branch, context) {
  execFileSync(process.execPath, [generator], { cwd: root, env: { ...process.env, BRANCH: branch, CONTEXT: context } });
}
test('fixed profiler is generated only for the draft branch and removed for production/previews', async () => {
  try {
    for (const [branch, context] of [['main', 'production'], ['draft', 'deploy-preview'], ['feature/test', 'branch-deploy']]) {
      generate(branch, context); assert.equal(fs.existsSync(generated), false); assert.equal(fs.existsSync(streamProbe), false);
    }
    generate('draft', 'branch-deploy'); assert.equal(fs.existsSync(generated), true); assert.equal(fs.existsSync(streamProbe), true);
    const { handler } = require(generated);
    assert.equal((await handler({ httpMethod: 'GET' })).statusCode, 405);
    if (fs.existsSync(path.join(root, '_public/search-index.json'))) {
      const first = JSON.parse((await handler({ httpMethod: 'POST', body: 'private-canary-314159' })).body);
      assert.equal(first.parity, true); assert.equal(first.cacheHit, false);
      const second = JSON.parse((await handler({ httpMethod: 'POST' })).body);
      assert.equal(second.parity, true); assert.equal(second.cacheHit, true);
      assert.equal(first.indexHash, second.indexHash);
      assert.ok(!JSON.stringify(first).includes('314159'));
      assert.ok(first.baselineMs >= 0 && first.candidateMs >= 0);
    }
  } finally { generate('main', 'production'); }
  assert.equal(fs.existsSync(generated), false); assert.equal(fs.existsSync(streamProbe), false);
});
