// Adapt the existing handler without changing its prompts, tools or JSON clients.
// Native progress carries fixed stages/counts only; website progress also allows public titles.
// Tool arguments, retrieved text and native request data stay private.
const STAGES = new Set(['index', 'search', 'review', 'read', 'system_apps', 'external', 'search_done', 'read_done']);
exports.progressResponse = async function progressResponse(request, handler, context = {}, { heartbeatMs = 3000 } = {}) {
  const event = {
    httpMethod: request.method,
    headers: Object.fromEntries(request.headers),
    body: ['GET', 'HEAD', 'OPTIONS'].includes(request.method) ? null : await request.text(),
  };
  let native = request.headers.get('x-bayton-client') === 'android';
  try {
    const parsed = JSON.parse(event.body || '{}');
    native ||= Boolean(parsed && typeof parsed === 'object' && ['version', 'retention', 'context'].some(key => Object.hasOwn(parsed, key)));
  } catch { /* The handler owns validation and its original error response. */ }
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
      if (!native && (stage === 'search_done' || stage === 'read_done') && Array.isArray(details.titles)) {
        data.titles = details.titles.filter(title => typeof title === 'string').slice(0, 1).map(title => title.replace(/[\x00-\x1f\x7f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120));
      }
      emit('progress', data);
      resolveReady();
    },
  })).catch(() => ({ statusCode: 500, headers: { 'content-type': 'application/json' }, body: JSON.stringify({ error: 'request_failed' }) }))
    .then(response => {
      try {
        if (started) {
          const headers = {};
          if (native) for (const [key, value] of Object.entries(response.headers || {})) {
            if (['server-timing', 'x-mika-attachments'].includes(key.toLowerCase())) headers[key.toLowerCase()] = value;
          }
          const data = JSON.parse(response.body);
          if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid completion');
          emit('complete', { ok: response.statusCode >= 200 && response.statusCode < 300, data, ...(native ? { headers } : {}) });
        }
        return response;
      } catch {
        // A malformed terminal body must not strand the stream or disclose it.
        const data = { error: 'request_failed' };
        if (started) emit('complete', { ok: false, data });
        return { statusCode: 500, headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) };
      } finally {
        stopHeartbeat();
        if (controller) { try { controller.close(); } catch {} finally { controller = null; } }
        resolveReady();
      }
    });
  // Keep the existing bounded request alive if the browser closes its progress stream.
  if (typeof context.waitUntil === 'function') context.waitUntil(result);
  await ready;
  if (started) return new Response(body, { headers: { 'content-type': 'text/event-stream; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff', ...(native ? { 'X-Mika-Attachments': '2' } : {}) } });
  // Validation errors and preflight retain the original status/body.
  const response = await result;
  return new Response(response.statusCode === 204 ? null : response.body, { status: response.statusCode, headers: response.headers });
};
