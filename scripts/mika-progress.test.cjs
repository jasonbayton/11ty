const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { progressResponse } = require('../netlify/functions/_shared/mika-progress');
const json = (statusCode, data) => ({ statusCode, headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) });
const request = () => new Request('https://draft--bayton.netlify.app/api/orb-chat-progress', { method: 'POST', body: '{"message":"synthetic-private-canary"}' });
test('progress arrives before completion and carries only fixed stages, with an unchanged final payload', async () => {
  let finish;
  const barrier = new Promise(resolve => { finish = resolve; });
  let calls = 0;
  const response = await progressResponse(request(), async (event, context) => {
    calls++; assert.equal(JSON.parse(event.body).message, 'synthetic-private-canary');
    context.mikaProgress('search'); context.mikaProgress('search'); context.mikaProgress('synthetic-private-canary');
    await barrier; context.mikaProgress('read'); return json(200, { reply: 'Final answer', sources: [{ title: 'Public page', url: '/android/' }] });
  });
  assert.match(response.headers.get('content-type'), /event-stream/);
  const reader = response.body.getReader();
  assert.equal(new TextDecoder().decode((await reader.read()).value), 'event: progress\ndata: {"stage":"search"}\n\n');
  finish(); let rest = '';
  for (;;) { const part = await reader.read(); if (part.done) break; rest += new TextDecoder().decode(part.value); }
  assert.match(rest, /"stage":"read"/); assert.doesNotMatch(rest, /synthetic-private-canary/);
  assert.match(rest, /"reply":"Final answer"/); assert.equal(calls, 1);
});
test('preflight, validation and native responses retain JSON status and headers', async () => {
  for (const status of [400, 405, 500, 503]) {
    const response = await progressResponse(request(), async () => json(status, { error: 'original_error' }));
    assert.equal(response.status, status); assert.equal((await response.json()).error, 'original_error');
  }
  const response = await progressResponse(new Request('https://example.test/', { method: 'OPTIONS' }), async () => ({ statusCode: 204, headers: { allow: 'POST' }, body: '' }));
  assert.equal(response.status, 204); assert.equal(response.headers.get('allow'), 'POST');
});
test('provider fallback and unexpected failures do not leak exception details or leave a hanging stream', async () => {
  const response = await progressResponse(request(), async (_, context) => { context.mikaProgress('review'); throw Error('private-error-canary'); });
  const text = await response.text(); assert.match(text, /"ok":false/); assert.doesNotMatch(text, /private-error-canary/);
});
test('disconnecting progress delivery does not reject the existing handler or retry its work', async () => {
  let finish; const barrier = new Promise(resolve => { finish = resolve; });
  let completed = false, retained;
  const response = await progressResponse(request(), async (_, context) => { context.mikaProgress('search'); await barrier; context.mikaProgress('review'); completed = true; return json(200, { reply: 'answer' }); }, { waitUntil(promise) { retained = promise; } });
  await response.body.cancel(); finish(); await retained; assert.equal(completed, true); assert.ok(retained instanceof Promise);
});
function browser(fetcher, enabled = true, hasStreams = true) {
  const window = {};
  vm.runInNewContext(fs.readFileSync('_src/_includes/_assets/js/mika-text-request.js', 'utf8'), {
    window, document: { currentScript: { getAttribute: () => String(enabled) } },
    fetch: fetcher, ReadableStream: hasStreams ? ReadableStream : undefined, TextDecoder,
  });
  return window;
}
test('browser parser handles fragmented UTF-8, statuses and a single complete answer', async () => {
  const wire = 'event: progress\ndata: {"stage":"read"}\n\nevent: complete\ndata: {"ok":true,"data":{"reply":"café","sources":[]}}\n\n';
  const bytes = new TextEncoder().encode(wire); let index = 0;
  const updates = []; const client = browser(async url => {
    assert.equal(url, '/api/orb-chat-progress');
    return new Response(new ReadableStream({ pull(controller) { if (index === bytes.length) controller.close(); else controller.enqueue(bytes.slice(index, ++index)); } }), { headers: { 'content-type': 'text/event-stream' } });
  });
  const result = await client.mikaTextRequest({ message: 'test' }, stage => updates.push(stage));
  assert.equal(result.data.reply, 'café'); assert.deepEqual(updates, ['read']);
  assert.equal(client.mikaProgressLabel('<img src=x>'), '');
});
test('browser retains JSON fallback and never retries an interrupted generation', async () => {
  for (const [enabled, streams] of [[false, true], [true, false]]) {
    const client = browser(async url => { assert.equal(url, '/api/orb-chat'); return Response.json({ reply: 'unchanged' }); }, enabled, streams);
    assert.equal((await client.mikaTextRequest({})).data.reply, 'unchanged');
  }
  let calls = 0;
  const client = browser(async () => { calls++; return new Response('event: progress\ndata: {"stage":"read"}\n\n', { headers: { 'content-type': 'text/event-stream' } }); });
  await assert.rejects(client.mikaTextRequest({}), /interrupted/); assert.equal(calls, 1);
});
test('progress UI is enabled for production and the exact draft branch deployment', () => {
  const { execFileSync } = require('node:child_process');
  for (const [branch, context, expected] of [['draft', 'branch-deploy', true], ['main', 'production', true], ['draft', 'deploy-preview', false], ['draft-other', 'branch-deploy', false], ['', '', false]]) {
    const output = execFileSync(process.execPath, ['-e', 'console.log(require("./_src/_data/mikaProgress.js"))'], { env: { ...process.env, BRANCH: branch, CONTEXT: context }, encoding: 'utf8' });
    assert.equal(output.trim(), String(expected));
  }
});
test('coalesced progress keeps the actual search result and article read visible during review', async () => {
  const wire = ['event: progress\ndata: {"stage":"search"}\n\n', 'event: progress\ndata: {"stage":"search_done","matches":12,"titles":["Android 11 COPE changes"]}\n\n', 'event: progress\ndata: {"stage":"review"}\n\n', 'event: progress\ndata: {"stage":"read"}\n\n', 'event: progress\ndata: {"stage":"read_done","titles":["COPE migration options"]}\n\n', 'event: progress\ndata: {"stage":"review"}\n\n', 'event: complete\ndata: {"ok":true,"data":{"reply":"answer"}}\n\n'].join('');
  const client = browser(async () => new Response(wire, { headers: { 'content-type': 'text/event-stream' } }));
  const element = { style: {}, textContent: '' };
  const result = await client.mikaTextRequest({}, (stage, details) => client.mikaUpdateProgress(element, stage, details));
  assert.equal(result.data.reply, 'answer');
  assert.match(element.textContent, /12 search results loaded/);
  assert.match(element.textContent, /Read: COPE migration options/);
  assert.match(element.textContent, /Reviewing the information/);
  const second = { style: {}, textContent: '' };
  client.mikaUpdateProgress(second, 'search_done', { matches: 0, titles: [] });
  client.mikaUpdateProgress(second, 'review');
  assert.match(second.textContent, /0 search results loaded/);
  assert.doesNotMatch(second.textContent, /COPE/);
});
test('progress metadata excludes arguments and limits public title text and counts', async () => {
  const response = await progressResponse(request(), async (_, context) => {
    context.mikaProgress('search_done', { matches: 12, titles: ['Public\ntitle' + 'x'.repeat(200), 'extra'], arguments: 'private-canary' });
    context.mikaProgress('review');
    context.mikaProgress('search_done', { matches: 9000, titles: [null] });
    return json(200, { reply: 'answer' });
  });
  const text = await response.text();
  assert.doesNotMatch(text, /private-canary|extra|9000/);
  const first = JSON.parse(/data: (.*)/.exec(text)[1]);
  assert.equal(first.titles.length, 1); assert.equal(first.titles[0].length, 120); assert.equal(first.matches, 12);
  assert.doesNotMatch(first.titles[0], /\n/);
});
test('a quiet tool wait emits content-free heartbeats and still completes once', { timeout: 5000 }, async t => {
  // The server deliberately unrefs its heartbeat. Retain the test process while
  // awaiting it, just as an active HTTP connection retains the deployed server.
  const keepAlive = setInterval(() => {}, 1000);
  t.after(() => clearInterval(keepAlive));
  let finish; const gate = new Promise(resolve => { finish = resolve; });
  const response = await progressResponse(request(), async (_, context) => {
    context.mikaProgress('system_apps'); await gate; return json(200, { reply: 'answer' });
  }, {}, { heartbeatMs: 10 });
  const reader = response.body.getReader();
  assert.match(new TextDecoder().decode((await reader.read()).value), /system_apps/);
  assert.equal(new TextDecoder().decode((await reader.read()).value), ': keepalive\n\n');
  finish(); let rest = '';
  for (;;) { const chunk = await reader.read(); if (chunk.done) break; rest += new TextDecoder().decode(chunk.value); }
  assert.equal((rest.match(/event: complete/g) || []).length, 1);
  assert.match(rest, /"reply":"answer"/);
});
test('browser ignores heartbeat comments without changing progress or final history payload', async () => {
  const client = browser(async () => new Response(': keepalive\n\nevent: progress\ndata: {"stage":"system_apps"}\n\n: keepalive\n\nevent: complete\ndata: {"ok":true,"data":{"reply":"answer","sources":[]}}\n\n', { headers: { 'content-type': 'text/event-stream' } }));
  const stages = []; const result = await client.mikaTextRequest({}, stage => stages.push(stage));
  assert.deepEqual(stages, ['system_apps']); assert.equal(result.data.reply, 'answer');
});
