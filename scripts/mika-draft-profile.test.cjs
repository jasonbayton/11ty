const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const generator = path.join(__dirname, 'create-mika-draft-profiler.cjs');
const generated = path.join(root, 'netlify/functions/mika-draft-profile.js');
const modelProbe = path.join(root, 'netlify/functions/mika-draft-model-probe.js');
const streamProbe = path.join(root, 'netlify/functions/mika-draft-stream-probe.mjs');
function generate(branch, context, modelProbe = '1') {
  execFileSync(process.execPath, [generator], { cwd: root, env: { ...process.env, BRANCH: branch, CONTEXT: context, MIKA_MODEL_PROBE: modelProbe } });
}
test('fixed profiler is generated only for the draft branch and removed for production/previews', async () => {
  try {
    for (const [branch, context] of [['main', 'production'], ['draft', 'deploy-preview'], ['feature/test', 'branch-deploy']]) {
      generate(branch, context); assert.equal(fs.existsSync(generated), false); assert.equal(fs.existsSync(streamProbe), false); assert.equal(fs.existsSync(modelProbe), false);
    }
    generate('draft', 'branch-deploy', '0'); assert.equal(fs.existsSync(modelProbe), false);
    generate('draft', 'branch-deploy'); assert.equal(fs.existsSync(generated), true); assert.equal(fs.existsSync(streamProbe), true); assert.equal(fs.existsSync(modelProbe), true);
    const { handler } = require(generated);
    assert.equal((await handler({ httpMethod: 'GET' })).statusCode, 405);
    if (fs.existsSync(path.join(root, '_public/search-index.json'))) {
      const first = JSON.parse((await handler({ httpMethod: 'POST', body: 'private-canary-314159' })).body);
      assert.equal(first.parity, true); assert.equal(first.cacheHit, false);
      const second = JSON.parse((await handler({ httpMethod: 'POST' })).body);
      assert.equal(second.parity, true); assert.equal(second.cacheHit, true);
      assert.equal(first.indexHash, second.indexHash);
      assert.ok(!JSON.stringify(first).includes('314159'));
      assert.ok(first.baselineMs >= 0 && first.candidateMs >= 0);
    }
  } finally { generate('main', 'production'); }
  assert.equal(fs.existsSync(generated), false); assert.equal(fs.existsSync(streamProbe), false); assert.equal(fs.existsSync(modelProbe), false);
});

test('fixed model probe rejects arbitrary inputs and preserves guarded inputs across generation controls', async () => {
  const vm = require('node:vm');
  const { createRequire } = require('node:module');
  const probeFile = path.join(root, 'netlify/functions/mika-draft-model-probe.js');
  try {
    generate('draft', 'branch-deploy');
    const requests = [], responseRequests = [], indexCalls = [], fetchAttempts = [];
    class OpenAI {
      constructor() { this.chat = { completions: { create: async options => {
        requests.push(JSON.parse(JSON.stringify(options)));
        await new Promise(resolve => setTimeout(resolve, 2));
        if (options.messages.some(message=>message.role==='user' && message.content==='Write me a Python script to scrape a website.') && !options.messages.some(message=>message.role==='tool')) return {model:'synthetic-snapshot',choices:[{finish_reason:'tool_calls',message:{role:'assistant',tool_calls:[{id:'forced-save',type:'function',function:{name:'save_question',arguments:JSON.stringify({question:'synthetic-question',answer:'synthetic-answer'})}}]}}]};
        return { model: 'synthetic-snapshot', choices: [{ finish_reason: 'stop', message: { content: 'No. QR provisioning starts with Android 7.0.' } }], usage: { completion_tokens: 12, completion_tokens_details: { reasoning_tokens: 0 } } };
      } } };
        this.responses = { create: async options => {
          responseRequests.push(JSON.parse(JSON.stringify(options)));
          await new Promise(resolve=>setTimeout(resolve,2));
          const failed = options.input.some(item=>item.role==='user' && item.content.startsWith('Could you tell'));
          const incomplete = options.input.some(item=>item.role==='user' && item.content.startsWith('Is zero-touch'));
          const read = options.input.some(item=>item.role==='user' && item.content.startsWith('Read the complete'));
          const output = (read || incomplete || failed) && !options.input.some(item=>item.type==='function_call_output') ? [
            {type:'reasoning',id:'opaque',encrypted_content:'synthetic-encrypted-canary',summary:[]},
            {type:'message',id:'preamble',role:'assistant',phase:'commentary',content:[{type:'output_text',text:'Checking evidence'}]},
            {type:'function_call',id:'item-id',call_id:'response-call',name:'save_question',arguments:'{}'},
          ] : [{type:'message',role:'assistant',phase:'commentary',content:[{type:'output_text',text:'Do not display this preamble.'}]},{type:'message',role:'assistant',phase:'final_answer',content:[{type:'output_text',text:'No. QR starts with Android 7.0.'}]}];
          return {model:'synthetic-snapshot',status:failed?'failed':incomplete?'incomplete':'completed',incomplete_details:incomplete?{reason:'max_output_tokens'}:null,output,usage:{input_tokens:200,output_tokens:40,output_tokens_details:{reasoning_tokens:options.reasoning.effort==='low'?20:0}}};
        } };
      }
    }
    const mod = { exports: {} }, localRequire = createRequire(probeFile);
    vm.runInNewContext(fs.readFileSync(probeFile, 'utf8'), {
      module: mod, exports: mod.exports, Buffer, URL, AbortSignal, Response, Date, console,
      process: { env: { OPENAI_API_KEY: 'synthetic-key-never-expose', ORB_DIRECTUS_API_KEY: 'synthetic-analytics-key' } },
      fetch: (...args) => { fetchAttempts.push(args); throw Error('The synthetic probe must not write analytics'); },
      require: name => {
        if (name === 'openai') return { OpenAI };
        if (name === './_shared/content-index') return { ...localRequire(name), loadSearchView: async () => [], extractKeywords: () => ['qr'], searchDocs: () => { indexCalls.push(1); return { results: [{ title: 'Provisioning', url: '/android/provisioning/', snippet: 'QR starts at Android 7.0.' }] }; } };
        return localRequire(name);
      },
    });
    const call = body => mod.exports.handler({ httpMethod: 'POST', body: JSON.stringify(body) });
    assert.equal((await mod.exports.handler({ httpMethod: 'GET' })).statusCode, 405);
    for (const body of [{ case:'not-a-probe-case', variant:'baseline' }, {case:'qr-read',variant:'high'}, {case:'qr-read',variant:'baseline',message:'private-canary'}, {case:'qr-read',variant:'luna-low',model:'untrusted-model'}, {case:'qr-read',variant:'luna-low',history:[]}, {case:['qr-short'],variant:'baseline'}, {case:{toString:null},variant:'baseline'}, null, []]) assert.equal((await call(body)).statusCode,400);
    assert.equal(requests.length,0);
    const results = await Promise.all(['baseline','responses-none','responses-low','luna-low'].map(variant=>call({case:'qr-short',variant})));
    const rows = results.map(result=>JSON.parse(result.body));
    assert.ok(indexCalls.length>0);
    for(const row of rows.slice(1)) assert.equal(rows[0].calls[0].messagesHash,row.calls[0].messagesHash);
    assert.equal(rows[0].calls[0].toolsHash,rows[1].calls[0].toolsHash);
    assert.equal(rows[0].calls[0].inputHash,rows[1].calls[0].inputHash);
    assert.equal(requests[0].temperature,0.3);assert.equal(requests[0].reasoning_effort,undefined);
    assert.equal(responseRequests[0].temperature,0.3);assert.equal(responseRequests[0].reasoning.effort,'none');
    assert.equal(responseRequests[1].temperature,undefined);assert.equal(responseRequests[1].reasoning.effort,'low');
    assert.equal(responseRequests[2].model,'gpt-6-luna');assert.equal(responseRequests[2].reasoning.effort,'low');assert.equal(responseRequests[2].temperature,undefined);
    assert.equal(rows[3].calls[0].requestedModel,'gpt-6-luna');
    assert.deepEqual(responseRequests[0].input,requests[0].messages);
    for(const request of responseRequests){ assert.equal(request.store,false);assert.equal(request.max_output_tokens,800);assert.ok(request.tools.every(tool=>tool.strict===false)); }
    for (const request of requests) { assert.equal(request.model,'gpt-5.4-mini');assert.equal(request.max_completion_tokens,800);assert.equal(request.store,false); }
    const history = JSON.parse((await call({case:'qr-followup',variant:'luna-low'})).body);
    assert.ok(responseRequests.at(-1).input.some(item=>item.role==='assistant' && item.content==='QR code provisioning starts with Android 7.0.'));
    assert.equal(history.calls[0].requestedModel,'gpt-6-luna');
    const forced = JSON.parse((await call({case:'refusal',variant:'baseline'})).body);
    assert.equal(forced.calls.length,2);
    assert.match(requests.at(-1).messages.find(message=>message.tool_call_id==='forced-save').content,/persistence is disabled/);
    const replay = JSON.parse((await call({case:'qr-read',variant:'responses-low'})).body);
    assert.equal(replay.calls.length,2);
    const replayInput = responseRequests.at(-1).input;
    assert.ok(replayInput.some(item=>item.encrypted_content==='synthetic-encrypted-canary'));
    assert.ok(replayInput.some(item=>item.phase==='commentary'));
    assert.equal(replayInput.filter(item=>item.type==='function_call').length,1);
    assert.equal(replayInput.find(item=>item.type==='function_call_output').call_id,'response-call');
    assert.ok(!JSON.stringify(replay).includes('synthetic-encrypted-canary'));
    assert.equal(fetchAttempts.length,0);
    const incomplete = JSON.parse((await call({case:'zero-touch',variant:'responses-low'})).body);
    assert.equal(incomplete.calls.length,1);assert.equal(incomplete.calls[0].finishReason,'length');assert.equal(incomplete.calls[0].incompleteReason,'max_output_tokens');
    assert.match(incomplete.answer.reply,/could not complete/);assert.ok(!incomplete.answer.reply.includes('Checking evidence'));
    const failed = JSON.parse((await call({case:'debut',variant:'responses-low'})).body);
    assert.equal(failed.calls.length,1);assert.equal(failed.calls[0].responseStatus,'failed');assert.deepEqual(failed.calls[0].tools,[]);assert.match(failed.answer.reply,/could not complete/);
    for (const row of rows) { assert.ok(!row.answer.reply.includes('preamble'));assert.equal(row.calls[0].model,'synthetic-snapshot');assert.ok(!JSON.stringify(row).includes('synthetic-key'));assert.ok(!JSON.stringify(row).includes('ABSOLUTE RULES')); }
  } finally { generate('main','production'); }
  assert.equal(fs.existsSync(probeFile),false);
});
