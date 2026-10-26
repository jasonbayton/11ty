const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), vm = require('node:vm');
const { getEventListeners } = require('node:events');

test('request deadline removes listeners and disposes its timer on completion and expiry', async () => {
  let expire, cleared = 0, now = 0;
  const mod = { exports: {} };
  vm.runInNewContext(fs.readFileSync('netlify/functions/_shared/mika-deadline.js', 'utf8'), {
    module: mod, AbortController, Date,
    setTimeout(callback) { expire = callback; return { unref() {} }; },
    clearTimeout() { cleared++; },
  });
  const deadline = mod.exports.createDeadline(100, () => now);
  assert.equal(await deadline.run(async () => 'in time'), 'in time');
  assert.equal(getEventListeners(deadline.signal, 'abort').length, 0);
  const pending = deadline.run(() => new Promise(() => {}));
  assert.equal(getEventListeners(deadline.signal, 'abort').length, 1);
  now = 100; expire();
  await assert.rejects(pending, error => error.code === 'MIKA_DEADLINE');
  assert.equal(getEventListeners(deadline.signal, 'abort').length, 0);
  deadline.close(); assert.equal(cleared, 1);
});
