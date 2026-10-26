const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function handler(fetcher, key = 'synthetic-api-key') {
  const exports = {};
  vm.runInNewContext(fs.readFileSync('netlify/functions/orb-realtime-session.js', 'utf8'), {
    exports, process: { env: { OPENAI_API_KEY: key } }, fetch: fetcher,
    console: { error() {} }, require: name => {
      assert.equal(name, './_shared/content-index');
      return {
        jsonResponse: (statusCode, data) => ({ statusCode, headers: { 'cache-control': 'no-store' }, body: JSON.stringify(data) }),
        noContentResponse: () => ({ statusCode: 204 }),
      };
    },
  });
  return exports.handler;
}
test('voice session uses GA client secrets while retaining model, voice and grounded instructions', async () => {
  const h = handler(async (url, options) => {
    assert.equal(url, 'https://api.openai.com/v1/realtime/client_secrets');
    const body = JSON.parse(options.body);
    assert.equal(body.session.type, 'realtime');
    assert.equal(body.session.model, 'gpt-realtime-1.5');
    assert.equal(body.session.audio.output.voice, 'sage');
    assert.match(body.session.instructions, /use ONLY what it says/);
    assert.equal(body.model, undefined);
    return Response.json({ value: 'synthetic-ephemeral', expires_at: 123, session: { instructions: 'must-not-return-session-config' } });
  });
  const response = await h({ httpMethod: 'POST' });
  assert.equal(response.statusCode, 200);
  assert.equal(response.headers['cache-control'], 'no-store');
  assert.deepEqual(JSON.parse(response.body), { model: 'gpt-realtime-1.5', client_secret: { value: 'synthetic-ephemeral', expires_at: 123 } });
  assert.doesNotMatch(response.body, /synthetic-api-key|must-not-return/);
});
test('session failures and method guards retain safe responses', async () => {
  let calls = 0;
  const h = handler(async () => { calls++; return Response.json({ error: { message: 'private-provider-error' } }, { status: 404 }); });
  assert.equal((await h({ httpMethod: 'GET' })).statusCode, 405);
  assert.equal((await h({ httpMethod: 'OPTIONS' })).statusCode, 204);
  assert.equal(calls, 0);
  const bad = await h({ httpMethod: 'POST' });
  assert.equal(bad.statusCode, 502); assert.doesNotMatch(bad.body, /private-provider-error/);
  assert.equal((await handler(async () => Response.json({}))({ httpMethod: 'POST' })).statusCode, 502);
  assert.equal((await handler(async () => { throw Error('private-network-error'); })({ httpMethod: 'POST' })).statusCode, 502);
  assert.equal((await handler(async () => Response.json({}, { status: 429 }))({ httpMethod: 'POST' })).statusCode, 429);
});
function voiceBrowser(failHandshake = false) {
  const sent = [], requests = [], messages = [], peers = [];
  let stops = 0;
  const track = { stop() { stops++; } };
  class Peer {
    constructor() { this.closed = false; peers.push(this); }
    addTrack() {}
    createDataChannel() { return this.channel = { readyState: 'open', send(raw) { sent.push(JSON.parse(raw)); }, close() {} }; }
    async createOffer() { return { type: 'offer', sdp: 'synthetic-offer' }; }
    async setLocalDescription() {}
    async setRemoteDescription(answer) { assert.equal(answer.sdp, 'synthetic-answer'); this.channel.onopen(); }
    close() { this.closed = true; }
  }
  const window = {};
  const source = fs.readFileSync('_src/_includes/_assets/js/orb-chat.js', 'utf8').replace("  document.addEventListener('DOMContentLoaded'", "  window.TestVoiceEngine = VoiceEngine;\n  document.addEventListener('DOMContentLoaded'");
  vm.runInNewContext(source, {
    window, document: { addEventListener() {}, getElementById() { return null; } },
    navigator: { mediaDevices: { async getUserMedia() { return { getTracks: () => [track] }; } } },
    RTCPeerConnection: Peer, Audio: class { pause() {} }, setInterval: () => 1, clearInterval() {},
    console: { warn() {}, error() {} },
    fetch: async (url, options) => {
      requests.push({ url, options });
      if (url === '/api/orb-realtime-session') return Response.json({ client_secret: { value: 'synthetic-ephemeral' } });
      if (url === '/api/orb-realtime-tool') return Response.json({ result: 'grounded output', sources: [] });
      assert.equal(url, 'https://api.openai.com/v1/realtime/calls');
      assert.equal(options.headers.Authorization, 'Bearer synthetic-ephemeral');
      return new Response(failHandshake ? 'synthetic-sdp-error' : 'synthetic-answer', { status: failHandshake ? 400 : 200 });
    },
  });
  const engine = new window.TestVoiceEngine({ setState() {}, setAudioLevel() {} });
  engine.onAssistantMessage = text => messages.push(text);
  engine._playReadyChime = () => {};
  return { engine, peers, requests, sent, messages, stops: () => stops };
}
const settle = async () => { for (let i = 0; i < 10; i++) await new Promise(setImmediate); };
test('browser negotiates GA session and response fields, tool continuation and transcript deduplication', async () => {
  const f = voiceBrowser(); f.engine.startVoice(); await settle();
  assert.equal(f.engine.isLive, true);
  const update = f.sent.find(x => x.type === 'session.update').session;
  assert.equal(update.type, 'realtime');
  assert.deepEqual(update.output_modalities, ['audio']);
  assert.equal(update.audio.input.turn_detection.silence_duration_ms, 1400);
  assert.equal(update.audio.input.transcription.model, 'gpt-4o-mini-transcribe');
  assert.equal(update.audio.output.voice, 'sage');
  assert.ok(update.tools.some(x => x.name === 'search_bayton'));
  assert.equal(update.modalities, undefined);
  f.engine.dc.onmessage({ data: JSON.stringify({ type: 'response.output_audio_transcript.done', response_id: 'response-test', transcript: 'A concise answer' }) });
  f.engine.dc.onmessage({ data: JSON.stringify({ type: 'response.output_item.done', response_id: 'response-test', item: { type: 'message', role: 'assistant', content: [{ transcript: 'A concise answer' }] } }) });
  assert.deepEqual(f.messages, ['A concise answer']);
  f.engine.sendTextMessage('Test question');
  f.engine.dc.onmessage({ data: JSON.stringify({ type: 'response.output_item.done', item: { type: 'function_call', call_id: 'test-call', name: 'search_bayton', arguments: '{"query":"Android Enterprise"}' } }) });
  await settle();
  const responses = f.sent.filter(x => x.type === 'response.create');
  assert.equal(responses.length, 2);
  for (const response of responses) { assert.deepEqual(response.response.output_modalities, ['audio']); assert.equal(response.response.modalities, undefined); }
  f.engine.stopVoice(); assert.equal(f.stops(), 1); assert.equal(f.peers[0].closed, true);
});
test('failed SDP negotiation closes the peer and microphone and permits retry', async () => {
  const f = voiceBrowser(true); f.engine.startVoice(); await settle();
  assert.equal(f.engine.isConnecting, false); assert.equal(f.engine.isLive, false);
  assert.equal(f.stops(), 1); assert.equal(f.peers[0].closed, true); assert.equal(f.engine.pc, null);
});
