const test = require('node:test');
const assert = require('node:assert/strict');
const rich = require('./rich-summary.cjs');
const { parseIndex, buildSearchView, legacyDocument, searchDocs } = require('../netlify/functions/_shared/content-index');
const { queryContent, validateContentQuery, contentSearchSchema } = require('../netlify/functions/_shared/content-query');
const z = require('zod/v4');
const html = '<p>Plain <strong>bold <em>nested</em></strong> &amp; <code>code</code> 🙂.</p><p>Second paragraph.</p><ul><li>One</li><li>Two</li></ul><script>private script</script><style>private style</style><nav>private nav</nav><div hidden>private hidden</div>';
test('inert structured excerpts preserve paragraphs, nested styles, entities and lists', () => {
 const result = rich(html), text = result.runs.map(r => r.text).join('');
 assert.equal(result.version,1); assert.equal(result.truncated,false);
 assert.match(text,/🙂\.\n\nSecond paragraph\./); assert.match(text,/• One\n\n• Two/);
 assert.ok(result.runs.some(r=>r.bold&&r.italic&&r.text==='nested'));
 assert.ok(result.runs.some(r=>r.code&&r.text==='code')); assert.ok(!text.includes('private'));
 assert.ok(!JSON.stringify(result).includes('<'));
});
test('complete index load path preserves rich excerpts only on explicit opt-in', () => {
 const original = {title:'Example',url:'/blog/2026/10/example/',date:'2026-10-19',content:'Plain content'};
 const docs = parseIndex(JSON.stringify([{...original,richSummary:rich(html)}]));
 assert.equal(JSON.stringify(legacyDocument(docs[0])),JSON.stringify(original));
 const view = buildSearchView(docs);
 for (const summary_format of ['rich-v1','invalid',42]) {
   const params=z.object(contentSearchSchema).parse({query:'Plain',summary_format});
   assert.deepEqual(queryContent(view,validateContentQuery(params)),searchDocs(view,'Plain',20));
 }
 const plain=queryContent(view,validateContentQuery({from:'2026-01-01'}));
 assert.ok(!('summary' in plain.results[0]));
 const formatted=queryContent(view,validateContentQuery({from:'2026-01-01',summary_format:'rich-v1'}));
 assert.deepEqual(formatted.results[0].summary,rich(html));
 assert.throws(()=>validateContentQuery({from:'2026-01-01',summary_format:'invalid'}));
});
test('text, runs, UTF-8 and transport size remain bounded with explicit truncation', () => {
 const result=rich('<p>'+('🙂 <b>bold</b><em>italic</em>').repeat(1000)+'</p>');
 assert.ok(result.truncated); assert.ok(Array.from(result.runs.map(r=>r.text).join('')).length<=600);
 assert.ok(result.runs.length<=40); assert.ok(Buffer.byteLength(JSON.stringify(result))<=3500);
 const docs=buildSearchView(Array.from({length:30},(_,i)=>({title:'A'.repeat(200),url:`/blog/2026/10/${i}/`,date:'2026-10-19',content:'🙂'.repeat(600),richSummary:result})));
 const output=queryContent(docs,validateContentQuery({from:'2026-01-01',limit:30,summary_format:'rich-v1'}));
 assert.ok(Buffer.byteLength(JSON.stringify(output,null,2))<262144);
 assert.ok(!/[\uD800-\uDBFF]$/.test(result.runs.at(-1).text));
});

test('table cells stay separate, code blocks keep indentation and templates stay hidden', () => {
 const result=rich('<template>Hidden template</template><table><tr><td>First cell</td><td>Second cell</td></tr></table><pre><code>if ready:\n    launch()\nelse:\n    stop()</code></pre>');
 const text=result.runs.map(r=>r.text).join('');
 assert.ok(!text.includes('Hidden template'));
 assert.match(text,/First cell \| Second cell/);
 assert.match(text,/if ready:\n    launch\(\)\nelse:\n    stop\(\)/);
});
