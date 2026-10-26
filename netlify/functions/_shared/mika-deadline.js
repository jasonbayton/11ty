// One request-local generation deadline. Timers/listeners never outlive the turn.
const REQUEST_BUDGET_MS = 26000;
class MikaDeadlineError extends Error {
  constructor() { super('MIKA request deadline exceeded'); this.name = 'MikaDeadlineError'; this.code = 'MIKA_DEADLINE'; }
}
function createDeadline(milliseconds = REQUEST_BUDGET_MS, clock = Date.now) {
  const controller = new AbortController();
  const end = clock() + milliseconds;
  const expire = () => { if (!controller.signal.aborted) controller.abort(new MikaDeadlineError()); };
  const timer = setTimeout(expire, milliseconds);
  timer.unref?.();
  const remaining = () => Math.max(0, end - clock());
  function check() {
    if (!remaining()) expire();
    if (controller.signal.aborted) throw controller.signal.reason;
  }
  return {
    signal: controller.signal, remaining, check,
    async run(operation) {
      check();
      let aborted;
      const interrupted = new Promise((_, reject) => {
        aborted = () => reject(controller.signal.reason);
        controller.signal.addEventListener('abort', aborted, { once: true });
      });
      try {
        const value = await Promise.race([Promise.resolve().then(() => { check(); return operation(); }), interrupted]);
        check();
        return value;
      } finally { controller.signal.removeEventListener('abort', aborted); }
    },
    close() { clearTimeout(timer); },
  };
}
module.exports = { createDeadline, MikaDeadlineError, REQUEST_BUDGET_MS };
