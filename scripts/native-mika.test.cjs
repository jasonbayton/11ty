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
    if (String(url).startsWith('https://ping.bayton.org/')) return Response.json({ data: [] });
    if (options.fetch) return options.fetch(url, init);
    return new Response('<p>Public documentation</p>');
  };
  const common = { Buffer, URL, AbortSignal, Response, process: { env }, fetch: fetcher, console: { error: (...x) => logs.push(x), warn: (...x) => logs.push(x) } };
  const helper = { exports: {} };
  vm.runInNewContext(fs.readFileSync(helperFile, 'utf8'), { ...common, module: helper, exports: helper.exports });
  class OpenAI {
    constructor(opts) {
      constructors.push(opts);
      this.chat = { completions: { create: async (params, requestOptions) => {
        model.push({ params: JSON.parse(JSON.stringify(params)), requestOptions });
        if (options.providerError) throw new Error('synthetic-payload-canary');
        return options.replies?.shift() || { choices: [{ message: { content: 'Android Enterprise answer synthetic-payload-canary' }, finish_reason: 'stop' }] };
      } } };
    }
  }
  const index = {
    jsonResponse: (statusCode, body) => ({ statusCode, headers: { 'cache-control': 'no-store' }, body: JSON.stringify(body) }),
    noContentResponse: () => ({ statusCode: 204, body: '' }),
    loadSearchView: async () => options.docs || [],
    extractKeywords: () => ['android'],
    searchDocs: () => ({ results: [{ title: 'Android Enterprise', url: '/android/', snippet: 'Established public source.' }] }),
  };
  const mod = { exports: {} };
  vm.runInNewContext(options.source || fs.readFileSync(handlerFile, 'utf8'), { ...common, module: mod, exports: mod.exports, require: name => {
    if (name === 'openai') return { OpenAI };
    if (name.endsWith('content-index')) return index;
    if (name.endsWith('content-lookup')) {
      const actual = require('../netlify/functions/_shared/content-lookup');
      return { lookupContent: (docs, params) => actual.lookupContent(docs, params, fetcher) };
    }
    if (name.endsWith('native-mika')) return helper.exports;
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
 assert.match(tool.content,/# Full guide/);assert.match(tool.content,/\*\*Bold\*\*/);
 assert.deepEqual(JSON.parse(response.body).sources,[{title:'Android guide',url:'https://bayton.org/android/guide/'}]);
 assert.ok(f.model.every(m=>m.params.store===false));
 assert.ok(!JSON.stringify(f.http.filter(h=>h.url.startsWith('https://ping'))).includes('synthetic-payload-canary'));
});
