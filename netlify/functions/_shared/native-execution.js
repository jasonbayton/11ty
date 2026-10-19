/** Numeric, content-free native diagnostics. Never accept phase names from a request. */
const PHASES = ['analytics', 'index', 'search', 'model', 'tools'];
function createNativeTiming(clock = Date.now) {
  const started = clock();
  const durations = Object.fromEntries(PHASES.map(name => [name, 0]));
  return {
    start: () => clock(),
    end(name, from) {
      if (!PHASES.includes(name)) throw new Error('Unknown timing phase');
      durations[name] += Math.max(0, clock() - from);
    },
    async measure(name, operation) {
      const from = clock();
      try { return await operation(); }
      finally { this.end(name, from); }
    },
    header() {
      return [...PHASES.map(name => `${name};dur=${durations[name].toFixed(1)}`),
        `total;dur=${Math.max(0, clock() - started).toFixed(1)}`].join(', ');
    },
  };
}

/** Read-only calls in one model round are independent; consumption remains in original order. */
async function runNativeTools(calls, execute) {
  const results = new Array(calls.length);
  const failures = new Map();
  let next = 0;
  let stopped = false;
  async function worker() {
    while (!stopped && next < calls.length) {
      const index = next++;
      try { results[index] = await execute(calls[index]); }
      catch (error) { failures.set(index, error); stopped = true; }
    }
  }
  // Drain in-flight work before reporting failure. Nothing is detached after the response.
  await Promise.all(Array.from({ length: Math.min(3, calls.length) }, worker));
  if (failures.size) throw failures.get(Math.min(...failures.keys()));
  return results;
}
module.exports = { createNativeTiming, runNativeTools };
