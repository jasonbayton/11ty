// Adapt the existing handler without changing its prompts, tools or JSON clients.
// Only fixed stages, bounded counts and public document titles cross this boundary.
// Tool arguments, retrieved text and native request data stay private.
const STAGES = new Set(['index', 'search', 'review', 'read', 'system_apps', 'external', 'search_done', 'read_done']);
exports.progressResponse = async function progressResponse(request, handler, context = {}, { heartbeatMs = 3000 } = {}) {
  const event = {
    httpMethod: request.method,
    headers: Object.fromEntries(request.headers),
    body: ['GET', 'HEAD', 'OPTIONS'].includes(request.method) ? null : await request.text(),
  };
  const encoder = new TextEncoder();
  let controller, started = false, lastStage, resolveReady, heartbeat;
  function stopHeartbeat() { if (heartbeat) { clearInterval(heartbeat); heartbeat = null; } }
  const ready = new Promise(resolve => { resolveReady = resolve; });
  const body = new ReadableStream({
    start(value) { controller = value; },
    cancel() { controller = null; stopHeartbeat(); },
  });
  function emit(type, data) {
    if (!controller) return;
    try { controller.enqueue(encoder.encode(`event: ${type}\ndata: ${JSON.stringify(data)}\n\n`)); }
    catch { controller = null; stopHeartbeat(); }
  }
  const result = Promise.resolve().then(() => handler(event, {
    mikaProgress(stage, details = {}) {
      if (!STAGES.has(stage) || stage === lastStage) return;
      lastStage = stage;
      if (!started && heartbeatMs > 0) {
        heartbeat = setInterval(() => {
          if (!controller) return stopHeartbeat();
          try { controller.enqueue(encoder.encode(': keepalive\n\n')); }
          catch { controller = null; stopHeartbeat(); }
        }, heartbeatMs);
        heartbeat.unref?.();
      }
      started = true;
      const data = { stage };
      if (stage === 'search_done' && Number.isInteger(details.matches) && details.matches >= 0 && details.matches <= 20) data.matches = details.matches;
      if ((stage === 'search_done' || stage === 'read_done') && Array.isArray(details.titles)) {
        data.titles = details.titles.filter(title => typeof title === 'string').slice(0, 1).map(title => title.replace(/[\x00-\x1f\x7f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120));
      }
      emit('progress', data);
      resolveReady();
    },
  })).catch(() => ({ statusCode: 500, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ error: 'request_failed' }) }))
    .then(response => {
      if (started) emit('complete', { ok: response.statusCode >= 200 && response.statusCode < 300, data: JSON.parse(response.body) });
      stopHeartbeat();
      if (controller) { controller.close(); controller = null; }
      resolveReady();
      return response;
    });
  // Keep the existing bounded request alive if the browser closes its progress stream.
  if (typeof context.waitUntil === 'function') context.waitUntil(result);
  await ready;
  if (started) return new Response(body, { headers: { 'content-type': 'text/event-stream; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' } });
  // Validation errors, native requests and preflight retain the original status/body.
  const response = await result;
  return new Response(response.statusCode === 204 ? null : response.body, { status: response.statusCode, headers: response.headers });
};
