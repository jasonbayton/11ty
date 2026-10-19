/** Native envelope and fixed-vocabulary analytics for the established Orb handler. */
const MAX_BODY = 48000;
class NativeRequestError extends Error {
  constructor(status, code) { super(code); this.status = status; }
}
function reject(condition, code, status = 400) { if (!condition) throw new NativeRequestError(status, code); }
function object(v) { return v !== null && typeof v === 'object' && !Array.isArray(v); }
function validateNative(parsed, raw) {
  reject(Buffer.byteLength(raw, 'utf8') <= MAX_BODY, 'request_too_large', 413);
  reject(object(parsed) && parsed.version === 1 && parsed.retention === 'topics_only', 'invalid_native_version');
  reject(Object.keys(parsed).every(k => ['version', 'retention', 'message', 'history', 'context'].includes(k)), 'invalid_native_field');
  reject(typeof parsed.message === 'string' && parsed.message.trim() && parsed.message.length <= 6000, 'invalid_message');
  reject(Array.isArray(parsed.history) && parsed.history.length <= 10, 'invalid_history');
  for (const h of parsed.history) {
    reject(object(h) && Object.keys(h).every(k => ['role', 'content'].includes(k)) && ['user', 'assistant'].includes(h.role) && typeof h.content === 'string' && h.content.length <= 12000, 'invalid_history_entry');
  }
  if ('context' in parsed) {
    const c = parsed.context;
    reject(object(c) && Object.keys(c).every(k => ['kind', 'title', 'content'].includes(k)) && typeof c.kind === 'string' && c.kind.length <= 64 && typeof c.title === 'string' && c.title.length <= 120 && object(c.content), 'invalid_context');
    let nodes = 0;
    function walk(v, depth) {
      reject(depth <= 16 && ++nodes <= 2000, 'context_too_complex', 413);
      if (v !== null && typeof v === 'object') Object.values(v).forEach(x => walk(x, depth + 1));
    }
    walk(c.content, 0);
  }
  return parsed;
}
const TOPICS = [
  ['enterprise-wifi', /\b(eap|peap|ttls|wifi|wi-fi|ssid|802\.1x)\b/i, 'enterprise Wi-Fi'],
  ['certificates', /\b(certificate|certificates|scep|pkcs|ca cert)\b/i, 'certificates'],
  ['managed-config', /\b(managed.?config|app.?restriction|configuration changes)\b/i, 'managed configuration'],
  ['provisioning', /\b(provision|provisioning|enrol|enroll|enrolment|enrollment|qr|dpc)\b/i, 'provisioning'],
  ['zero-touch', /\b(zero.?touch|kme)\b/i, 'automated enrolment'],
  ['work-profile', /\b(work.?profile|cope|byod)\b/i, 'work profiles'],
  ['kiosk', /\b(kiosk|dedicated|lock.?task)\b/i, 'kiosk management'],
  ['policy', /\b(policy|policies|compliance|restriction)\b/i, 'device policy'],
  ['apps', /\b(app|apps|package|packages|managed.?google.?play)\b/i, 'application management'],
];
const INTENTS = [
  ['troubleshoot', /\b(error|fail|failed|failure|fails|broken|problem|issue|not working|doesn't|cannot|can't)\b/i, 'Troubleshoot'],
  ['compare', /\b(compare|comparison|difference|differences|changed|changes)\b/i, 'Compare'],
  ['configure', /\b(configure|set up|setup|deploy|how to|how do|how can)\b/i, 'Configure'],
];
const TOOLS = { 'provisioning QR': 'QR tool', 'managed config': 'config tool', policy: 'policy tool', 'JSON file': 'JSON attachment' };
function classifyTopic(message, kind) {
  const topic = TOPICS.find(([,pattern]) => pattern.test(message)) || ['general', null, 'Android Enterprise'];
  const intent = INTENTS.find(([,pattern]) => pattern.test(message)) || ['explain', null, 'Explain'];
  const tool = Object.hasOwn(TOOLS, kind || '') ? TOOLS[kind] : 'general chat';
  // Every output character comes from a fixed server vocabulary, never from the input.
  return { topic: topic[0], intent: intent[0], tool, question: `[Native MIKA] ${intent[2]} ${topic[2]} (${tool}).` };
}
async function saveTopic(summary, { fetch: fetcher = fetch, key = process.env.ORB_DIRECTUS_API_KEY } = {}) {
  if (!key) return;
  // Rebuild from fixed identifiers: callers cannot smuggle free text into persistence.
  const topic = TOPICS.find(([id]) => id === summary.topic) || ['general', null, 'Android Enterprise'];
  const intent = INTENTS.find(([id]) => id === summary.intent) || ['explain', null, 'Explain'];
  const tool = Object.values(TOOLS).includes(summary.tool) ? summary.tool : 'general chat';
  const question = `[Native MIKA] ${intent[2]} ${topic[2]} (${tool}).`;
  const answer = 'Topic summary only. No question text, history, payload or answer retained.';
  const headers = { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
  const signal = AbortSignal.timeout(2000);
  try {
    const response = await fetcher(`https://ping.bayton.org/items/orb_questions?filter[question][_eq]=${encodeURIComponent(question)}&limit=1`, { headers, signal });
    if (!response.ok) return;
    const data = JSON.parse(await readTextBounded(response, 32000));
    const existing = data.data?.[0];
    if (existing && /^[a-zA-Z0-9-]{1,64}$/.test(String(existing.id))) {
      await fetcher(`https://ping.bayton.org/items/orb_questions/${existing.id}`, { method: 'PATCH', headers, signal, body: JSON.stringify({ count: Math.min(2147483647, (Number(existing.count) || 1) + 1), answer }) });
    } else if (!existing) {
      await fetcher('https://ping.bayton.org/items/orb_questions', { method: 'POST', headers, signal, body: JSON.stringify({ question, answer, count: 1 }) });
    }
  } catch (_) { /* Analytics failure must never log request data or fail an answer. */ }
}
async function readTextBounded(response, maximum) {
  const reader = response.body?.getReader();
  if (!reader) return '';
  const chunks = [];
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maximum) throw new NativeRequestError(413, 'response_too_large');
      chunks.push(Buffer.from(value));
    }
    return Buffer.concat(chunks).toString('utf8');
  } finally { await reader.cancel().catch(() => {}); }
}
module.exports = { validateNative, classifyTopic, saveTopic, readTextBounded, NativeRequestError };
