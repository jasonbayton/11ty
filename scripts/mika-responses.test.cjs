const test = require('node:test');
const assert = require('node:assert/strict');
const { createResponsesCompletion } = require('../netlify/functions/_shared/mika-responses');
const options = messages => ({ model: 'gpt-6-luna', reasoning_effort: 'medium', messages, temperature: 0.3, max_completion_tokens: 4096, tools: [{ type: 'function', function: { name: 'lookup', parameters: { type: 'object', properties: { query: { type: 'string' } } } } }], tool_choice: 'auto', parallel_tool_calls: true });
const message = text => ({ type: 'message', role: 'assistant', phase: 'final_answer', content: [{ type: 'output_text', text }] });
test('Luna wire request preserves evidence, optional tools, budget and stateless privacy', async () => {
  let sent;
  const complete = createResponsesCompletion({ responses: { create: async request => { sent = structuredClone(request); return { status: 'completed', output: [message('Answer')] }; } } });
  const messages = [{ role: 'system', content: 'Original guards and mandatory pre-search evidence' }, { role: 'assistant', content: 'Prior answer' }, { role: 'user', content: 'Question' }];
  const result = await complete(options(messages));
  assert.deepEqual(sent.input, messages); assert.equal(sent.model, 'gpt-6-luna'); assert.deepEqual(sent.reasoning, { effort: 'medium' });
  assert.equal(sent.store, false); assert.equal(sent.max_output_tokens, 4096); assert.equal(sent.temperature, undefined);
  assert.equal(sent.tools[0].strict, false); assert.equal(sent.tools[0].parameters.required, undefined);
  assert.equal(sent.tool_choice, 'auto'); assert.equal(sent.parallel_tool_calls, true);
  assert.deepEqual(sent.include, ['reasoning.encrypted_content']); assert.equal(result.choices[0].message.content, 'Answer');
});
test('two lookup rounds retain opaque output and call IDs without duplicate assistant messages', async () => {
  const requests = []; let turn = 0;
  const outputs = [0,1].map(n => [{ type: 'reasoning', id: `r${n}`, encrypted_content: `opaque${n}`, summary: [] }, { type: 'message', role: 'assistant', phase: 'commentary', content: [{ type: 'output_text', text: 'Checking' }] }, { type: 'function_call', id: `item${n}`, call_id: `call${n}`, name: 'lookup', arguments: '{}' }]);
  const complete = createResponsesCompletion({ responses: { create: async request => { requests.push(structuredClone(request)); return { status: 'completed', output: outputs[turn++] || [message('Final')] }; } } });
  const messages = [{ role: 'user', content: 'Question' }];
  for (let n=0;n<2;n++) {
    const result = await complete(options(messages)); assert.equal(result.choices[0].finish_reason, 'tool_calls');
    assert.equal(result.choices[0].message.content, null); assert.equal(result.choices[0].message.tool_calls[0].id, `call${n}`);
    messages.push(result.choices[0].message, { role: 'tool', tool_call_id: `call${n}`, content: `Evidence${n}` });
  }
  messages.push({ role: 'system', content: 'Lookup limit reached. Use only retrieved evidence.' });
  const final = await complete({ ...options(messages), tool_choice: 'none' });
  const input = requests[2].input;
  assert.deepEqual(input.filter(item=>item.type==='reasoning'), outputs.flat().filter(item=>item.type==='reasoning'));
  assert.equal(input.filter(item=>item.type==='function_call').length, 2);
  assert.deepEqual(input.filter(item=>item.type==='function_call_output').map(item=>[item.call_id,item.output]), [['call0','Evidence0'],['call1','Evidence1']]);
  assert.equal(input.filter(item=>item.phase==='commentary').length, 2); assert.equal(input.filter(item=>item.tool_calls).length, 0);
  assert.equal(requests[2].tool_choice, 'none'); assert.equal(final.choices[0].message.content, 'Final');
});
test('failed and incomplete output cannot execute tools or disclose partial answers', async () => {
  for (const status of ['failed','incomplete']) {
    const complete = createResponsesCompletion({ responses: { create: async () => ({ status, output: [message('Partial secret'), { type:'function_call',call_id:'partial',name:'lookup',arguments:'{}' }] }) } });
    if (status === 'failed') { await assert.rejects(complete(options([{role:'user',content:'Question'}])), /generation failed/); continue; }
    const result = await complete(options([{role:'user',content:'Question'}]));
    assert.equal(result.choices[0].message.content, null); assert.equal(result.choices[0].message.tool_calls, undefined);
  }
});
test('concurrent requests never share replay state and provider refusals stay visible', async () => {
  const requests=[]; const client={responses:{create:async request=>{requests.push(structuredClone(request));return {status:'completed',output:[{type:'message',role:'assistant',content:[{type:'refusal',refusal:'Out of scope'}]}]};}}};
  const a=createResponsesCompletion(client), b=createResponsesCompletion(client);
  const replies=await Promise.all([a(options([{role:'user',content:'One'}])),b(options([{role:'user',content:'Two'}]))]);
  assert.deepEqual(requests.map(r=>r.input.map(x=>x.content)),[['One'],['Two']]);
  assert.ok(replies.every(r=>r.choices[0].message.content==='Out of scope'));
});

for (const native of [false, true]) test(`handler uses Luna Responses through five rounds and forces a final answer, native=${native}`, async () => {
  const fs = require('node:fs'), vm = require('node:vm');
  const { createRequire } = require('node:module');
  const file = require.resolve('../netlify/functions/orb-chat');
  const localRequire = createRequire(file), requests = [], stages = [];
  let searches = 0, turns = 0, providerStatus = 'completed';
  const fetched = [];
  const fetcher = async url => { fetched.push(String(url)); return new Response('# Complete Markdown evidence marker. QR starts at Android 7.0.'); };
  const docs = [{ title:'Provisioning', url:'/android/provisioning/', content:'QR starts at Android 7.0.' }];
  class OpenAI {
    constructor() { this.responses = { create: async request => {
      assert.ok(searches > 0); requests.push(structuredClone(request));
      if (providerStatus !== 'completed') return {status:providerStatus,error:{message:'private-provider-payload'},output:[message('Partial answer'),{type:'function_call',call_id:'partial',name:'fetch_url',arguments:'{}'}]};
      const n = turns++;
      const call = (name,args) => ({ type:'function_call',call_id:`call${n}`,id:`item${n}`,name,arguments:JSON.stringify(args) });
      return { status:'completed',output:n<5?[n%2===0?call('search_bayton',{query:'QR provisioning'}):call('get_content_by_url',{url:'/android/provisioning/'})]:[message('No. QR provisioning starts at Android 7.0.')] };
    } }; }
  }
  const mod = {exports:{}};
  vm.runInNewContext(fs.readFileSync(file,'utf8'), {
    module:mod,exports:mod.exports,Buffer,URL,AbortSignal,Response,Date,console,
    process:{env:{OPENAI_API_KEY:'synthetic-key',MIKA_NATIVE_ENABLED:'true'}},fetch:fetcher,
    require:name=>name==='openai'?{OpenAI}:name.endsWith('content-index')?{
      ...localRequire(name),loadSearchView:async()=>docs,extractKeywords:()=>['QR'],searchDocs:()=>{searches++;return {results:[{...docs[0],snippet:docs[0].content}]};}
    }:name.endsWith('mika-content-lookup')?{...localRequire(name),lookupWebsiteContent:(docs,url,unused,budget)=>localRequire(name).lookupWebsiteContent(docs,url,fetcher,budget)}:name.endsWith('content-lookup')?{...localRequire(name),lookupContent:(docs,params)=>localRequire(name).lookupContent(docs,params,fetcher)}:localRequire(name),
  });
  const payload = {message:'Does Android 6 support QR provisioning?', ...(native ? {version:1, retention:'topics_only',history:[]} : {})};
  const response = await mod.exports.handler({httpMethod:'POST',body:JSON.stringify(payload)},{mikaProgress:(stage,details)=>{ stages.push(stage); if(native) assert.deepEqual(Object.keys(details || {}).filter(key=>key !== 'matches'), []); }});
  if(native) {assert.equal(response.headers['X-Mika-Attachments'],'2');assert.match(response.headers['server-timing'],/model/);}
  assert.equal(response.statusCode,200);assert.match(JSON.parse(response.body).reply,/No\. QR provisioning starts/);
  assert.equal(requests.length,6);
  for(const r of requests){assert.equal(r.model,'gpt-6-luna');assert.equal(r.reasoning.effort,'medium');assert.equal(r.store,false);assert.equal(r.temperature,undefined);assert.equal(r.max_output_tokens,4096);}
  assert.match(requests[0].input[0].content,/ABSOLUTE RULES/);assert.match(requests[0].input[0].content,/PRE-LOADED SEARCH RESULTS/);
  assert.match(requests[0].input[0].content,/QR starts at Android 7.0/);assert.equal(requests[5].tool_choice,'none');
  assert.equal(requests[5].input.filter(x=>x.type==='function_call_output').length,5);
  assert.ok(stages.includes('read_done'));
  assert.deepEqual(fetched,Array(2).fill('https://bayton.md/android/provisioning/index.md'));
  assert.ok(requests[5].input.some(item=>item.type==='function_call_output' && item.output.includes('Complete Markdown evidence marker.')));
  for (const status of ['incomplete','failed']) {
    providerStatus = status;
    const result = await mod.exports.handler({httpMethod:'POST',body:JSON.stringify({...payload,message:'Android Enterprise provisioning'})});
    assert.equal(result.statusCode,status==='failed'?500:200);
    const body=JSON.parse(result.body);assert.doesNotMatch(JSON.stringify(body),/Partial answer|private-provider-payload/);
    assert.ok(body.reply.length>20);assert.match(body.reply,status==='failed'?/Something went wrong/:/could not complete/);
    assert.equal(fetched.length,2);
  }
});

test('installed OpenAI SDK sends the Responses request through its real serialization path', async () => {
  const { OpenAI } = require('openai');
  let wire;
  const client = new OpenAI({ apiKey:'synthetic-key',maxRetries:0,fetch:async(url,init)=>{
    wire={url:String(url),body:JSON.parse(init.body)};
    return new Response(JSON.stringify({id:'synthetic',object:'response',status:'completed',output:[message('SDK answer')]}),{headers:{'content-type':'application/json'}});
  }});
  const result=await createResponsesCompletion(client)(options([{role:'user',content:'Android question'}]));
  assert.equal(wire.url,'https://api.openai.com/v1/responses');
  assert.equal(wire.body.model,'gpt-6-luna');assert.equal(wire.body.reasoning.effort,'medium');
  assert.equal(wire.body.store,false);assert.equal(wire.body.temperature,undefined);assert.equal(result.choices[0].message.content,'SDK answer');
});

test('native attachment parts survive the real SDK Responses wire with prior assistant history', async () => {
  const { OpenAI } = require('openai');
  const { userContent, validateNative } = require('../netlify/functions/_shared/native-mika');
  const png = Buffer.alloc(33); Buffer.from([137,80,78,71,13,10,26,10]).copy(png); png.write('IHDR',12); png.writeUInt32BE(1,16); png.writeUInt32BE(1,20);
  for (const [kind, mimeType, bytes, type] of [['Picture','image/png',png,'input_image'], ['PDF file','application/pdf',Buffer.from('%PDF-1.4\nsynthetic'),'input_file']]) {
    const payload = {version:2,retention:'topics_only',message:'Review this Android attachment',history:[],context:{kind,title:'reviewed title',content:{reviewed:true},file:{mimeType,data:bytes.toString('base64')}}};
    validateNative(payload,JSON.stringify(payload));
    let wire;
    const client = new OpenAI({apiKey:'synthetic-key',maxRetries:0,fetch:async(url,init)=>{
      wire={url:String(url),body:JSON.parse(init.body)};
      return new Response(JSON.stringify({id:'synthetic',object:'response',status:'completed',output:[message('Reviewed')]}),{headers:{'content-type':'application/json'}});
    }});
    await createResponsesCompletion(client)(options([{role:'assistant',content:'Previous Android answer'},{role:'user',content:userContent(payload)}]));
    assert.equal(wire.url,'https://api.openai.com/v1/responses');
    assert.deepEqual(wire.body.input[0],{role:'assistant',content:'Previous Android answer'});
    const parts = wire.body.input[1].content;
    assert.equal(parts[0].type,'input_text');assert.match(parts[0].text,/untrusted reference data/);
    assert.equal(parts[1].type,type);
    const data = `data:${mimeType};base64,${bytes.toString('base64')}`;
    if(type==='input_image') assert.equal(parts[1].image_url,data);
    else {assert.equal(parts[1].file_data,data);assert.equal(parts[1].filename,'attachment.pdf');}
    assert.equal(wire.body.store,false);assert.equal(wire.body.model,'gpt-6-luna');assert.deepEqual(wire.body.reasoning,{effort:'medium'});
  }
});

test('Responses forwards the absolute deadline cancellation and remaining timeout to the SDK', async () => {
  const controller = new AbortController(); let received;
  const complete = createResponsesCompletion({ responses: { create: async (_body, requestOptions) => {
    received = requestOptions; return { status: 'completed', output: [message('Within budget')] };
  } } });
  await complete(options([{ role: 'user', content: 'Question' }]), { signal: controller.signal, timeout: 1234 });
  assert.equal(received.signal, controller.signal); assert.equal(received.timeout, 1234);
});

test('the real SDK cancels a stalled fetch with the supplied request deadline and never retries', { timeout: 2000 }, async () => {
  const { OpenAI } = require('openai'); let attempts = 0;
  const controller = new AbortController();
  const client = new OpenAI({ apiKey: 'synthetic-key', maxRetries: 0, timeout: 150, fetch: async (_url, init) => {
    attempts++; assert.ok(init.signal);
    return new Promise((_, reject) => {
      const fail = () => reject(new DOMException('Aborted', 'AbortError'));
      if (init.signal.aborted) fail(); else init.signal.addEventListener('abort', fail, { once: true });
    });
  } });
  const timer = setTimeout(() => controller.abort(), 20);
  try {
    await assert.rejects(createResponsesCompletion(client)(options([{ role: 'user', content: 'Synthetic question' }]), { signal: controller.signal, timeout: 1000 }), error => error instanceof require('openai').APIUserAbortError);
    assert.equal(attempts, 1);
  } finally { clearTimeout(timer); }
});
