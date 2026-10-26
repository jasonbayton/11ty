const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const helperFile = path.resolve('netlify/functions/_shared/native-mika.js');
const handlerFile = path.resolve('netlify/functions/orb-chat.js');
function fixture(options = {}) {
  const model = [], http = [], logs = [], constructors = [];
  const env = { OPENAI_API_KEY: 'synthetic-provider-key', ORB_DIRECTUS_API_KEY: 'synthetic-analytics-key', MIKA_NATIVE_ENABLED: options.enabled === false ? 'false' : 'true', CONTEXT: options.context || 'production' };
  if (options.unsetGate) delete env.MIKA_NATIVE_ENABLED;
  const fetcher = async (url, init = {}) => {
    http.push({ url: String(url), ...init });
    if (String(url).startsWith('https://ping.bayton.org/')) { if (options.analyticsBarrier) await options.analyticsBarrier; return Response.json({ data: [] }); }
    if (options.fetch) return options.fetch(url, init);
    return new Response('<p>Public documentation</p>');
  };
  const common = { Date: options.now ? class extends Date { static now() { return options.now(); } } : Date, Buffer, URL, AbortSignal, Response, process: { env }, fetch: fetcher, console: { error: (...x) => logs.push(x), warn: (...x) => logs.push(x) } };
  const helper = { exports: {} };
  vm.runInNewContext(fs.readFileSync(helperFile, 'utf8'), { ...common, module: helper, exports: helper.exports });
  class OpenAI {
    constructor(opts) {
      constructors.push(opts);
      this.chat = { completions: { create: async (params, requestOptions) => {
        if (options.beforeModel) options.beforeModel(params);
        model.push({ params: JSON.parse(JSON.stringify(params)), requestOptions });
        if (options.modelBarrier) await options.modelBarrier;
        if (options.providerError) throw new Error('synthetic-payload-canary');
        return options.replies?.shift() || { choices: [{ message: { content: 'Android Enterprise answer synthetic-payload-canary' }, finish_reason: 'stop' }] };
      } } };
    }
  }
  const index = {
    jsonResponse: (statusCode, body) => ({ statusCode, headers: { 'cache-control': 'no-store' }, body: JSON.stringify(body) }),
    noContentResponse: () => ({ statusCode: 204, body: '' }),
    loadSearchView: async () => { if (options.indexBarrier) await options.indexBarrier; return options.docs || []; },
    extractKeywords: () => ['android'],
    searchDocs: options.searchDocs || (() => ({ results: [{ title: 'Android Enterprise', url: '/android/', snippet: 'Established public source.' }] })),
  };
  const mod = { exports: {} };
  vm.runInNewContext(options.source || fs.readFileSync(handlerFile, 'utf8'), { ...common, module: mod, exports: mod.exports, require: name => {
    if (name === 'openai') return { OpenAI };
    // This fixture isolates handler policy. Responses wire/replay is exercised separately.
    if (name.endsWith('mika-responses')) return { createResponsesCompletion: client => options => client.chat.completions.create(options) };
    if (name.endsWith('content-index')) return index;
    if (name.endsWith('mika-content-lookup')) {
      const actual = require('../netlify/functions/_shared/mika-content-lookup');
      return { ...actual, lookupWebsiteContent: (docs, url, unused, budget) => actual.lookupWebsiteContent(docs, url, fetcher, budget) };
    }
    if (name.endsWith('content-lookup')) {
      const actual = require('../netlify/functions/_shared/content-lookup');
      return { lookupContent: (docs, params) => actual.lookupContent(docs, params, fetcher) };
    }
    if (name.endsWith('mika-sysapps-tools')) return require('../netlify/functions/_shared/mika-sysapps-tools');
    if (name.endsWith('mika-sysapps')) {
      const adapter = { exports: {} };
      vm.runInNewContext(fs.readFileSync(path.resolve('netlify/functions/_shared/mika-sysapps.js'), 'utf8'), {
        ...common, exports: adapter.exports,
        require: name => { assert.equal(name, './mika-sysapps-tools'); return require('../netlify/functions/_shared/mika-sysapps-tools'); },
      });
      return adapter.exports;
    }
    if (name.endsWith('native-mika')) return helper.exports;
    if (name.endsWith('native-execution')) return require('../netlify/functions/_shared/native-execution');
    throw Error(`Unexpected dependency ${name}`);
  } });
  return { ...mod.exports, helper: helper.exports, model, http, logs, constructors };
}
const envelope = (extra = {}) => ({ version: 1, retention: 'topics_only', message: 'Why does enterprise Wi-Fi provisioning fail? synthetic-payload-canary', history: [], ...extra });
const event = data => ({ httpMethod: 'POST', body: JSON.stringify(data) });

test('native turns use established guidance/tools and persist only server vocabulary, including follow-ups', async () => {
  const f = fixture();
  const first = envelope({ context: { kind: 'provisioning QR', title: 'synthetic-payload-canary', content: { password: 'synthetic-payload-canary' } } });
  assert.equal((await f.handler(event(first))).statusCode, 200);
  assert.equal((await f.handler(event(envelope({ message: 'Explain that again', history: [{ role: 'user', content: 'synthetic-payload-canary' }, { role: 'assistant', content: 'synthetic-payload-canary' }] })))).statusCode, 200);
  assert.equal(f.model.length, 2);
  const params = f.model[0].params;
  assert.match(params.messages[0].content, /ABSOLUTE RULES/);
  assert.match(params.messages[0].content, /ANDROID ENTERPRISE FACTUAL GUARDRAILS/);
  assert.ok(params.tools.some(t => t.function.name === 'sysapps_search'));
  assert.ok(params.tools.some(t => t.function.name === 'fetch_url'));
  assert.match(params.messages.at(-1).content, /synthetic-payload-canary/);
  assert.equal(params.store, false);
  assert.equal(f.constructors[0].maxRetries, undefined);
  assert.equal(f.model[0].requestOptions, undefined);
  assert.ok(f.http.length >= 4);
  assert.ok(f.http.every(r => r.url.startsWith('https://ping.bayton.org/items/orb_questions')));
  assert.ok(!JSON.stringify(f.http).includes('synthetic-payload-canary'));
  assert.match(f.http.find(r => r.method === 'POST').body, /\[Native MIKA\]/);
  assert.ok(!JSON.stringify(f.logs).includes('synthetic-payload-canary'));
});

test('invalid native data and kill switch reject before paid work or analytics', async () => {
  for (const data of [envelope({ version: 2 }), envelope({ retention: 'none' }), envelope({ history: [{ role: 'system', content: 'instruction' }] }), envelope({ message: [] }), envelope({ context: [] }), envelope({ message: 'x'.repeat(6001) }), envelope({ history: Array(11).fill({ role: 'user', content: 'x' }) }), envelope({ extra: 'unknown' })]) {
    const f = fixture(); assert.equal((await f.handler(event(data))).statusCode, 400); assert.equal(f.model.length, 0); assert.equal(f.http.length, 0);
  }
  const f = fixture({ enabled: false }); assert.equal((await f.handler(event(envelope()))).statusCode, 503); assert.equal(f.model.length, 0);
  assert.equal((await f.handler(event(envelope({ history: [{ role: 'user', content: '日'.repeat(20000) }] })))).statusCode, 413);
});

test('taxonomy never emits any user-controlled value, title, kind or proposed summary', async () => {
  const f = fixture();
  const summary = f.helper.classifyTopic('email person@example.com secret private canary', 'synthetic-payload-canary');
  assert.equal(summary.topic, 'general'); assert.equal(summary.tool, 'general chat');
  await f.helper.saveTopic({ topic: 'synthetic-payload-canary', intent: 'synthetic-payload-canary', tool: 'synthetic-payload-canary', question: 'synthetic-payload-canary' });
  assert.ok(!JSON.stringify(f.http).includes('synthetic-payload-canary'));
});

test('provider errors never persist or log request or answer bodies', async () => {
  const f = fixture({ providerError: true });
  assert.equal((await f.handler(event(envelope()))).statusCode, 500);
  assert.ok(!JSON.stringify(f.http).includes('synthetic-payload-canary'));
  assert.ok(!JSON.stringify(f.logs).includes('synthetic-payload-canary'));
});

test('native tools retain the existing loop but cannot save raw questions', async () => {
  const replies = [{ choices: [{ finish_reason: 'tool_calls', message: { role: 'assistant', tool_calls: [
    { id: 'search', type: 'function', function: { name: 'search_bayton', arguments: JSON.stringify({ query: 'android' }) } },
    { id: 'save', type: 'function', function: { name: 'save_question', arguments: JSON.stringify({ question: 'synthetic-payload-canary', answer: 'synthetic-payload-canary' }) } },
  ] } }] }];
  const f = fixture({ replies });
  assert.equal((await f.handler(event(envelope()))).statusCode, 200);
  assert.equal(f.model.length, 2);
  assert.match(f.model[1].params.messages.find(m => m.tool_call_id === 'search').content, /Established public source/);
  assert.match(f.model[1].params.messages.find(m => m.tool_call_id === 'save').content, /logging is unavailable/);
  assert.ok(!JSON.stringify(f.http).includes('synthetic-payload-canary'));
});

test('explicit Android marker keeps malformed JSON out of error logs', async () => {
  const f = fixture();
  const result = await f.handler({ httpMethod: 'POST', headers: { 'X-Bayton-Client': 'android' }, body: '{synthetic-payload-canary' });
  assert.equal(result.statusCode, 500);
  assert.equal(f.model.length, 0);
  assert.ok(!JSON.stringify(f.logs).includes('synthetic-payload-canary'));
});

test('website keeps original provider options, raw logging, tools and large request behaviour', async () => {
  const f = fixture();
  assert.equal((await f.handler(event({ message: 'Android Enterprise question? synthetic-payload-canary' }))).statusCode, 200);
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(f.model[0].params.store, undefined);
  assert.equal(f.model[0].requestOptions, undefined);
  assert.deepEqual(Object.keys(f.constructors[0]), ['apiKey']);
  assert.ok(f.http.some(r => r.method === 'POST' && r.body.includes('synthetic-payload-canary')));
  assert.equal(f.config, undefined);
  const large = fixture();
  assert.equal((await large.handler(event({ message: 'Android '.repeat(7000) }))).statusCode, 200);
  const error = fixture({ providerError: true });
  assert.equal((await error.handler(event({ message: 'Android question?' }))).statusCode, 500);
  assert.equal(error.logs[0][0], 'Orb chat error:');
  assert.equal(error.logs[0][1].message, 'synthetic-payload-canary');
});

test('native analytics reader stops oversized analytics responses', async () => {
  const f = fixture();
  await assert.rejects(f.helper.readTextBounded(new Response('x'.repeat(2000)), 1000), /response_too_large/);
});

module.exports = { fixture, event };

test('native access requires explicit enablement and false remains a kill switch', async () => {
  const production = fixture({ unsetGate: true });
  assert.equal((await production.handler(event(envelope()))).statusCode, 503);
  assert.equal(production.model.length, 0); assert.equal(production.http.length, 0);
  const enabled = fixture();
  assert.equal((await enabled.handler(event(envelope()))).statusCode, 200);
  assert.equal(enabled.model.length, 1);
  const preview = fixture({ unsetGate: true, context: 'deploy-preview' });
  assert.equal((await preview.handler(event(envelope()))).statusCode, 503);
  assert.equal(preview.model.length, 0); assert.equal(preview.http.length, 0);
  const disabled = fixture({ enabled: false });
  assert.equal((await disabled.handler(event(envelope()))).statusCode, 503);
  assert.equal(disabled.model.length, 0); assert.equal(disabled.http.length, 0);
  const invalid = fixture({ unsetGate: true });
  assert.equal((await invalid.handler(event(envelope({ version: 2 })))).statusCode, 400);
  assert.equal(invalid.model.length, 0); assert.equal(invalid.http.length, 0);
});

test('external documentation is not truncated at 4000 characters', async () => {
 const body='Public Android documentation. '.repeat(300)+' END_OF_COMPLETE_DOCUMENT';
 const f=fixture({fetch:async()=>new Response('<main><p>'+body+'</p></main>'),replies:[
  {choices:[{finish_reason:'tool_calls',message:{role:'assistant',content:null,tool_calls:[{id:'external',type:'function',function:{name:'fetch_url',arguments:JSON.stringify({url:'https://developer.android.com/work/'})}}]}}]},
  {choices:[{finish_reason:'stop',message:{content:'Complete public answer'}}]},
 ]});
 assert.equal((await f.handler(event(envelope()))).statusCode,200);
 const tool=f.model[1].params.messages.find(m=>m.role==='tool');
 assert.ok(tool.content.length>4000);assert.ok(tool.content.endsWith('END_OF_COMPLETE_DOCUMENT'));
});

test('MIKA can read complete Markdown after searching while keeping canonical citations and native privacy', async () => {
 const article={title:'Android guide',url:'/android/guide/',content:'Plain indexed content'};
 const f=fixture({docs:[article],fetch:async()=>new Response('---\ntitle: Guide\n---\n# Full guide\n\n**Bold** documentation tail'),replies:[
  {choices:[{finish_reason:'tool_calls',message:{role:'assistant',content:null,tool_calls:[{id:'search',type:'function',function:{name:'search_bayton',arguments:'{"query":"android"}'}}]}}]},
  {choices:[{finish_reason:'tool_calls',message:{role:'assistant',content:null,tool_calls:[{id:'article',type:'function',function:{name:'get_content_by_url',arguments:'{"url":"/android/guide/"}'}}]}}]},
  {choices:[{finish_reason:'stop',message:{content:'Android guide https://bayton.org/android/guide/'}}]},
 ]});
 const response=await f.handler(event(envelope()));assert.equal(response.statusCode,200);
 const tool=f.model[2].params.messages.find(m=>m.tool_call_id==='article');
 assert.match(tool.content,/title: Guide/);assert.match(tool.content,/# Full guide/);assert.match(tool.content,/\*\*Bold\*\*/);
 assert.deepEqual(JSON.parse(response.body).sources,[{title:'Android guide',url:'https://bayton.org/android/guide/'}]);
 assert.ok(f.model.every(m=>m.params.store===false));
 assert.ok(!JSON.stringify(f.http.filter(h=>h.url.startsWith('https://ping'))).includes('synthetic-payload-canary'));
});

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
const tick = () => new Promise(resolve => setImmediate(resolve));

test('native timing headers contain only fixed numeric phases, including probes and errors; website has none', async () => {
  for (const options of [{}, { providerError: true }]) {
    const f = fixture(options);
    const result = await f.handler(event(envelope()));
    assert.match(result.headers['server-timing'], /^analytics;dur=\d+\.\d, index;dur=\d+\.\d, search;dur=\d+\.\d, model;dur=\d+\.\d, tools;dur=\d+\.\d, total;dur=\d+\.\d$/);
    assert.ok(!JSON.stringify(result.headers).includes('synthetic-payload-canary'));
  }
  const probe = await fixture().handler(event(envelope({ version: 2 })));
  assert.equal(probe.statusCode, 400);
  assert.ok(probe.headers['server-timing']);
  const website = await fixture().handler(event({ message: 'Android question?' }));
  assert.equal(website.headers['server-timing'], undefined);
});

test('native tool workers bound concurrency at three and return original order', async () => {
  const { runNativeTools } = require('../netlify/functions/_shared/native-execution');
  const barriers = Array.from({ length: 5 }, deferred);
  const started = [];
  let active = 0, highest = 0;
  const pending = runNativeTools([0, 1, 2, 3, 4], async index => {
    started.push(index); highest = Math.max(highest, ++active);
    await barriers[index].promise;
    active--; return index;
  });
  assert.deepEqual(started, [0, 1, 2]);
  barriers[2].resolve(); await tick();
  assert.deepEqual(started, [0, 1, 2, 3]);
  barriers[1].resolve(); await tick();
  assert.deepEqual(started, [0, 1, 2, 3, 4]);
  barriers[4].resolve(); barriers[3].resolve(); barriers[0].resolve();
  assert.deepEqual(await pending, [0, 1, 2, 3, 4]);
  assert.equal(highest, 3);
});

test('native tool failure drains in-flight work and starts no further calls', async () => {
  const { runNativeTools } = require('../netlify/functions/_shared/native-execution');
  const barriers = Array.from({ length: 4 }, deferred);
  const started = [];
  let finished = false;
  const pending = runNativeTools([0, 1, 2, 3], async index => {
    started.push(index); await barriers[index].promise;
    if (index === 1) throw new Error('Synthetic tool failure');
    return index;
  });
  // Attach rejection handling immediately; no background rejection may escape the handler.
  const observed = pending.then(() => { finished = true; }, error => { finished = true; return error; });
  barriers[1].resolve(); await tick();
  assert.equal(finished, false); assert.deepEqual(started, [0, 1, 2]);
  barriers[0].resolve(); barriers[2].resolve();
  assert.match((await observed).message, /Synthetic tool failure/);
  assert.deepEqual(started, [0, 1, 2]);
});

function externalRound() {
  return { choices: [{ finish_reason: 'tool_calls', message: { role: 'assistant', tool_calls:
    ['first', 'second'].map(id => ({ id, type: 'function', function: { name: 'fetch_url', arguments: JSON.stringify({ url: `https://developer.android.com/work/${id}/` }) } }))
  } }] };
}

test('native parallel completion preserves original tool-message and latest-source ordering', async () => {
  const first = deferred(), second = deferred(), started = [];
  const f = fixture({ replies: [externalRound(), { choices: [{ finish_reason: 'stop', message: { content: 'https://developer.android.com/work/second/' } }] }], fetch: async url => {
    const id = String(url).includes('/first/') ? 'first' : 'second'; started.push(id);
    await (id === 'first' ? first.promise : second.promise);
    return new Response(`<main>${id}</main>`);
  } });
  const pending = f.handler(event(envelope()));
  await tick(); assert.deepEqual(started, ['first', 'second']);
  second.resolve(); await tick(); first.resolve();
  const result = await pending;
  const tools = f.model[1].params.messages.filter(m => m.role === 'tool');
  assert.deepEqual(tools.map(m => m.tool_call_id), ['first', 'second']);
  assert.deepEqual(JSON.parse(result.body).sources, [{ title: 'developer.android.com/work/second/', url: 'https://developer.android.com/work/second/' }]);
});

test('website tools retain sequential execution and original provider behaviour', async () => {
  const first = deferred(), second = deferred(), started = [];
  const f = fixture({ replies: [externalRound()], fetch: async url => {
    const id = String(url).includes('/first/') ? 'first' : 'second'; started.push(id);
    await (id === 'first' ? first.promise : second.promise);
    return new Response('<main>Public documentation</main>');
  } });
  const pending = f.handler(event({ message: 'Android Enterprise?' }));
  await tick(); assert.deepEqual(started, ['first']);
  first.resolve(); await tick(); assert.deepEqual(started, ['first', 'second']);
  second.resolve(); const result = await pending;
  assert.equal(result.statusCode, 200); assert.equal(result.headers['server-timing'], undefined);
  assert.ok(f.model.every(call => call.params.store === undefined));
});

test('native topic persistence overlaps paid work but is awaited on success and provider failure', async () => {
  for (const providerError of [false, true]) {
    const barrier = deferred();
    const f = fixture({ analyticsBarrier: barrier.promise, providerError });
    let finished = false;
    const pending = f.handler(event(envelope())).then(result => { finished = true; return result; });
    await tick();
    assert.equal(f.model.length, 1, 'Analytics must not serialise index/model work');
    assert.equal(finished, false, 'The handler must still wait for topic persistence');
    barrier.resolve();
    assert.equal((await pending).statusCode, providerError ? 500 : 200);
    assert.ok(f.http.some(call => call.url.startsWith('https://ping.bayton.org/') && call.method === 'POST'));
    assert.ok(!JSON.stringify(f.http.filter(call => call.url.startsWith('https://ping.bayton.org/'))).includes('synthetic-payload-canary'));
  }
});

test('reviewed text files stay inert and preserve the established framework', async () => {
  const f = fixture();
  const text = '<!DOCTYPE test SYSTEM "https://private.invalid/secret"><password>synthetic-payload-canary</password>\napp.log: failed';
  const response = await f.handler(event(envelope({ version: 2, context: { kind: 'Text file', title: 'configuration.xml', content: { text } } })));
  assert.equal(response.statusCode, 200);
  assert.equal(response.headers['X-Mika-Attachments'], '2');
  assert.ok(f.model[0].params.messages.at(-1).content.includes(JSON.stringify(text).slice(1, -1)));
  assert.ok(f.model[0].params.messages[0].content.includes('ABSOLUTE RULES'));
  assert.equal(f.model[0].params.store, false);
  assert.ok(!JSON.stringify(f.http).includes('synthetic-payload-canary'));
  assert.ok(f.http.every(r => r.url.startsWith('https://ping.bayton.org/')));
});

test('pictures and PDFs are multimodal data, never base64 inside prompt text or analytics', async () => {
  const png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j2ioAAAAASUVORK5CYII=';
  for (const [kind, mimeType, data, type] of [
    ['Picture', 'image/png', png, 'image_url'],
    ['PDF file', 'application/pdf', Buffer.from('%PDF-1.4\nsynthetic-payload-canary\n%%EOF').toString('base64'), 'file'],
  ]) {
    const f = fixture();
    assert.equal((await f.handler(event(envelope({ version: 2, context: { kind, title: 'synthetic-payload-canary', content: {}, file: { mimeType, data } } })))).statusCode, 200);
    const content = f.model[0].params.messages.at(-1).content;
    assert.equal(content[0].type, 'text');
    assert.ok(!content[0].text.includes(data));
    assert.equal(content[1].type, type);
    if (type === 'file') assert.equal(content[1].file.file_data, `data:${mimeType};base64,${data}`);
    else assert.equal(content[1].image_url.url, `data:${mimeType};base64,${data}`);
    assert.ok(!JSON.stringify(f.http).includes(data));
    assert.ok(!JSON.stringify(f.http).includes('synthetic-payload-canary'));
    assert.ok(!JSON.stringify(f.logs).includes(data));
  }
});

test('attachment capability preserves older probes and rejects bad versions, formats and dimensions before paid work', async () => {
  const probe = fixture();
  const response = await probe.handler(event(envelope({ version: 2, message: '' })));
  assert.equal(response.statusCode, 400);
  assert.equal(JSON.parse(response.body).error, 'invalid_native_version');
  assert.equal(response.headers['X-Mika-Attachments'], '2');
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j2ioAAAAASUVORK5CYII=', 'base64');
  png.writeUInt32BE(100000, 16);
  for (const extra of [
    { version: 2 },
    { version: 2, context: { kind: 'Text file', title: 'log', content: { text: 'x'.repeat(262145) } } },
    { context: { kind: 'Text file', title: 'log', content: { text: 'x' } } },
    { version: 2, context: { kind: 'Picture', title: 'picture', content: {}, file: { mimeType: 'image/png', data: png.toString('base64') } } },
    { version: 2, context: { kind: 'PDF file', title: 'pdf', content: {}, file: { mimeType: 'application/pdf', data: Buffer.from('not a PDF').toString('base64') } } },
  ]) {
    const f = fixture();
    assert.ok((await f.handler(event(envelope(extra)))).statusCode >= 400);
    assert.equal(f.model.length, 0);
    assert.equal(f.http.length, 0);
  }
});

for (const native of [false,true]) {
  test(`lookup exhaustion finalises with evidence or clarification without another lookup, native=${native}`, async () => {
    const round = id => ({choices:[{finish_reason:'tool_calls',message:{role:'assistant',content:null,tool_calls:[{id,type:'function',function:{name:'search_bayton',arguments:'{"query":"Android"}'}}]}}]});
    const limit = native ? 2 : 5;
    const f = fixture({replies:[...Array.from({length:limit},(_,n)=>round(String(n))),{choices:[{finish_reason:'stop',message:{content:'Which Pixel model and Android version should I compare?'}}]}]});
    const payload = {message:'Compare Dell XPS Googlebook apps with a Google Pixel?',history:[{role:'user',content:'Samsung gallery app?'},{role:'assistant',content:'Samsung gallery package.'}]};
    const result = await f.handler(event(native ? envelope(payload) : payload));
    assert.match(JSON.parse(result.body).reply,/Which Pixel model/);
    assert.equal(f.model.length,limit+1);
    assert.deepEqual(f.model.map(m=>m.params.tool_choice),[...Array(limit).fill('auto'),'none']);
    assert.equal(f.model.at(-1).params.messages.filter(m=>m.role==='tool').length,limit);
    assert.match(f.model.at(-1).params.messages.at(-1).content,/All original scope and privacy rules still apply/);
    assert.match(f.model.at(-1).params.messages[0].content,/ABSOLUTE RULES/);
    if(native) assert.ok(f.model.every(m=>m.params.store===false));
  });
}
test('a provider returning no terminal text yields an honest bounded-lookup response', async () => {
  const f=fixture({replies:[{choices:[{finish_reason:'length',message:{content:null}}]}]});
  const result=await f.handler(event({message:'Android device apps?'}));
  assert.match(JSON.parse(result.body).reply,/could not complete this lookup within the current limits/);
  assert.equal(f.model.length,1);
});

test('both device lists then a direct comparison fit two rounds and preserve native privacy', async () => {
  const call=(id,name,args)=>({id,type:'function',function:{name,arguments:JSON.stringify(args)}});
  const args={left_make:'Dell',left_model:'XPS Googlebook',left_os:'37',right_make:'Google',right_model:'Pixel 9 Pro XL',right_os:'36'};
  const f=fixture({replies:[
    {choices:[{finish_reason:'tool_calls',message:{role:'assistant',tool_calls:[call('dell','sysapps_list_devices',{make:'Dell'}),call('pixel','sysapps_list_devices',{make:'Google',model:'Pixel 9 Pro XL',os:'36'})]}}]},
    {choices:[{finish_reason:'tool_calls',message:{role:'assistant',tool_calls:[call('comparison','sysapps_compare_devices',args)]}}]},
    {choices:[{finish_reason:'stop',message:{content:'The recorded Dell has dell.only, absent from this Pixel record.'}}]},
  ],fetch:async(url,options)=>{
    assert.equal(url,'https://sysapps.bayton.org/mcp');
    const rpc=JSON.parse(options.body);
    let data;
    if(rpc.params.name==='sysapps_list_devices') {
      const left=rpc.params.arguments.make==='Dell';
      data={items:[{make:left?'Dell':'Google',model:left?'XPS Googlebook':'Pixel 9 Pro XL',os_api:left?'37':'36'}],total:1};
    } else {
      assert.deepEqual(rpc.params.arguments,{...args,diff_limit:50});
      data={left:{make:'Dell',model:'XPS Googlebook',os_api:'37'},right:{make:'Google',model:'Pixel 9 Pro XL',os_api:'36'},shared_count:1,left_only_count:1,right_only_count:0,left_only:[{package_name:'dell.only',label:'Dell app'}],right_only:[]};
    }
    return Response.json({jsonrpc:'2.0',id:1,result:{content:[{type:'text',text:JSON.stringify(data)}]}});
  }});
  const result=await f.handler(event(envelope({message:'Compare recorded Dell XPS Googlebook API 37 to Pixel 9 Pro XL API 36'})));
  assert.equal(result.statusCode,200);assert.equal(f.model.length,3);
  assert.deepEqual(f.model.map(m=>m.params.tool_choice),['auto','auto','none']);
  const comparison=JSON.parse(f.model[2].params.messages.find(m=>m.tool_call_id==='comparison').content);
  assert.equal(comparison.left_only[0].package_name,'dell.only');
  assert.equal(comparison.left_only_truncated,false);
  const tool=f.model[0].params.tools.find(t=>t.function.name==='sysapps_compare_devices').function;
  assert.deepEqual(tool.parameters.required,Object.keys(args));
  assert.deepEqual(Object.keys(tool.parameters.properties),['diff_limit','diff_offset','diff_section','diff_after',...Object.keys(args)]);
  assert.match(tool.description,/never silently select/);
  assert.ok(f.model.every(m=>m.params.store===false));
  assert.ok(!JSON.stringify(f.http.filter(h=>h.url.startsWith('https://ping'))).includes('Pixel 9 Pro XL'));
});
for(const elapsed of [20000,25800,27000]) {
  test(`slow lookup respects the existing deadline and stops automatic tool selection at ${elapsed}ms`,async()=>{
    let now=0;
    const f=fixture({now:()=>now,replies:[
      {choices:[{finish_reason:'tool_calls',message:{role:'assistant',content:'I will compare those apps now.',tool_calls:[{id:'devices',type:'function',function:{name:'sysapps_list_devices',arguments:'{"make":"Google"}'}}]}}]},
      {choices:[{finish_reason:'stop',message:{content:'Which Pixel model should I compare?'}}]},
    ],fetch:async()=>{now=elapsed;return Response.json({jsonrpc:'2.0',id:1,result:{content:[{type:'text',text:'{"items":[],"total":0}'}]}});}});
    const result=await f.handler(event({message:'Compare Google Pixel apps?'}));
    if(elapsed<23500){assert.equal(f.model.length,2);assert.equal(f.model[1].params.tool_choice,'none');}
    else{assert.equal(f.model.length,1);assert.match(JSON.parse(result.body).reply,/could not complete/);}
  });
}

test('pre-round deadline bailout never returns an unexecuted tool preamble',async()=>{
  let reads=0;
  const f=fixture({now:()=>reads++===0?0:24000,replies:[{choices:[{finish_reason:'tool_calls',message:{role:'assistant',content:'I will check that device now.',tool_calls:[{id:'skipped',type:'function',function:{name:'sysapps_list_devices',arguments:'{"make":"Dell"}'}}]}}]}]});
  const result=await f.handler(event({message:'Dell Android apps?'}));
  assert.match(JSON.parse(result.body).reply,/could not complete/);
  assert.equal(f.model.length,1);
  assert.ok(!f.http.some(r=>r.url==='https://sysapps.bayton.org/mcp'));
});
test('provider ignoring final none cannot execute a sixth website round or expose an unfinished preamble',async()=>{
  const round=id=>({choices:[{finish_reason:'tool_calls',message:{role:'assistant',content:'I will keep looking.',tool_calls:[{id,type:'function',function:{name:'search_bayton',arguments:'{"query":"Android"}'}}]}}]});
  const f=fixture({replies:Array.from({length:6},(_,n)=>round(String(n)))});
  const result=await f.handler(event({message:'Android system apps?'}));
  assert.match(JSON.parse(result.body).reply,/could not complete/);
  assert.equal(f.model.length,6);assert.equal(f.model[5].params.tool_choice,'none');
  assert.equal(f.model[5].params.messages.filter(m=>m.role==='tool').length,5);
});

test('mandatory pre-search remains before the model with the original guard prompt',async()=>{
  for(const native of [false,true]){
    let searches=0;
    const f=fixture({beforeModel:()=>assert.ok(searches>0,'mandatory pre-search must finish before the first model request'),searchDocs:()=>{searches++;return {results:[{title:'A tangential candidate',url:'/projects/example/release-notes/',snippet:'A release, not an answer to this question.'}]};}});
    const response=await f.handler(event(native?envelope({message:'When did Android Enterprise start?'}):{message:'When did Android Enterprise start?'}));
    assert.equal(response.statusCode,200);assert.ok(searches>0);
    const system=f.model[0].params.messages[0].content;
    assert.match(system,/A tangential candidate/);assert.match(system,/A release, not an answer/);
    assert.match(system,/PRE-LOADED SEARCH RESULTS FROM BAYTON.ORG \(use these to answer - do NOT ignore them\)/);
    assert.match(system,/Android 5\.0 \(Lollipop\) in 2014/);
    assert.match(system,/NEVER fall back on general training knowledge/);
  }
});

test('website can answer after two lookup rounds without using all five',async()=>{
  const call=(id,name,args)=>({choices:[{finish_reason:'tool_calls',message:{role:'assistant',tool_calls:[{id,type:'function',function:{name,arguments:JSON.stringify(args)}}]}}]});
  const queries=[];
  const f=fixture({docs:[{title:'Introduction',url:'/android/introduction/',content:'A short introduction.'}],
    searchDocs:(_,query)=>{queries.push(query);return {results:query==='Android Enterprise debut Lollipop'?[
      {title:'Introduction',url:'/android/introduction/',snippet:'A history section is available in the complete article.'},
    ]:[{title:'Release notes',url:'/projects/example/release-notes/',snippet:'An unrelated release.'}]};},
    fetch:async()=>new Response('# Introduction\n\nAndroid Enterprise debuted with Android 5.0 (Lollipop) in 2014.\n'),
    replies:[call('targeted','search_bayton',{query:'Android Enterprise debut Lollipop'}),call('article','get_content_by_url',{url:'/android/introduction/'}),{choices:[{finish_reason:'stop',message:{content:'Android Enterprise debuted with Lollipop in 2014.'}}]}],
  });
  const response=await f.handler(event({message:'Could you tell me when Android Enterprise first came about?',history:[{role:'assistant',content:'It started in 2016.'}]}));
  assert.equal(response.statusCode,200);assert.equal(f.model.length,3);
  assert.deepEqual(f.model.map(m=>m.params.tool_choice),['auto','auto','auto']);
  assert.ok(queries.indexOf('Android Enterprise debut Lollipop')>0,'mandatory pre-search precedes the targeted tool query');
  const final=f.model[2].params.messages;
  assert.match(final[0].content,/An unrelated release/);
  const article=JSON.parse(final.find(m=>m.tool_call_id==='article').content);
  assert.match(article.content,/Lollipop\) in 2014/);
  assert.ok(!final.some(m=>m.role==='system' && /lookup limit/.test(m.content)));
});

test('zero-result pre-search retains the source-only guard without inventing candidates',async()=>{
  let searched=false;
  const f=fixture({beforeModel:()=>assert.ok(searched),searchDocs:()=>{searched=true;return {results:[]};}});
  const stages=[];
  const response=await f.handler(event({message:'A question with no matching source'}),{mikaProgress:(stage,details)=>stages.push({stage,...details})});
  assert.equal(response.statusCode,200);
  const system=f.model[0].params.messages[0].content;
  assert.match(system,/Base your answers ENTIRELY on it/);
  assert.ok(!system.includes('PRE-LOADED SEARCH RESULTS'));
  assert.equal(stages.find(s=>s.stage==='search_done').matches,0);
});

test('generated page fallback delivers honestly labelled indexed text only to website calls',async()=>{
  const doc={title:'Release index',url:'/projects/example/release-notes/',content:'Release 1.0.0.6 fixed an Android 15 edge-to-edge bug.'};
  const read={choices:[{finish_reason:'tool_calls',message:{role:'assistant',tool_calls:[{id:'read',type:'function',function:{name:'get_content_by_url',arguments:JSON.stringify({url:doc.url})}}]}}]};
  for(const native of [false,true]){
    const stages=[];
    const f=fixture({docs:[doc],searchDocs:()=>({results:[{title:doc.title,url:doc.url,snippet:'Release index excerpt'}]}),fetch:async()=>new Response('Missing',{status:404}),replies:[read,{choices:[{finish_reason:'stop',message:{content:native?'The complete Markdown source is unavailable.':'Release 1.0.0.6 fixed an Android 15 edge-to-edge bug.'}}]}]});
    const response=await f.handler(event(native?envelope({message:'What changed in release 1.0.0.6?'}):{message:'What changed in release 1.0.0.6?'}),{mikaProgress:(stage,details)=>stages.push({stage,...details})});
    assert.equal(response.statusCode,200);assert.equal(f.model.length,2);
    const tool=f.model[1].params.messages.find(message=>message.tool_call_id==='read').content;
    if(native){assert.match(tool,/Markdown article is currently unavailable/);assert.ok(!tool.includes('edge-to-edge'));assert.deepEqual(stages,[]);}
    else{const body=JSON.parse(tool);assert.equal(body.content,doc.content);assert.equal(body.format,'text');assert.equal(body.delivery,'complete_indexed_text');assert.match(body.note,/formatting and links were removed/);assert.equal(body.url,doc.url);assert.deepEqual([...stages.find(s=>s.stage==='read_done').titles],[doc.title]);}
  }
});
