const test = require('node:test');
const assert = require('node:assert/strict');
const { lookupWebsiteContent, MAX_INDEXED_TEXT_BYTES } = require('../netlify/functions/_shared/mika-content-lookup');
const { lookupContent, MarkdownUnavailableError } = require('../netlify/functions/_shared/content-lookup');
const doc = { title: 'Release index', url: '/projects/example/release-notes/', content: 'Release 1.0.0.6: Fixed an Android 15 edge-to-edge bug.', haystack: 'internal search data' };
test('successful Markdown keeps its complete content and established format', async () => {
  const raw = '# Article\n\n' + 'Complete content. '.repeat(5000);
  const found = await lookupWebsiteContent([doc], doc.url, async () => new Response(raw));
  assert.equal(found.content, raw); assert.equal(found.format, 'markdown');
  assert.equal(found.delivery, undefined);
});
test('404, HTML, redirect and network failure deliver complete indexed text with honest metadata', async () => {
  for (const fetcher of [async () => new Response('Missing', { status: 404 }), async () => new Response('<!doctype html><html>Missing</html>'), async () => { throw new TypeError('redirect rejected'); }, async () => { throw new DOMException('timeout', 'TimeoutError'); }]) {
    let requests = 0;
    const result = await lookupWebsiteContent([doc], doc.url, async (url, options) => {
      requests++; assert.equal(url, 'https://bayton.md/projects/example/release-notes/index.md');
      assert.equal(options.redirect, 'error'); assert.ok(options.signal);
      return fetcher();
    });
    assert.equal(requests, 1);
    assert.equal(result.content, doc.content); assert.equal(result.url, doc.url);
    assert.equal(result.format, 'text'); assert.equal(result.delivery, 'complete_indexed_text');
    assert.equal(result.haystack, undefined); assert.equal(result.sourceUrl, undefined);
    assert.match(result.note, /formatting and links were removed/);
  }
});
test('unknown or non-canonical paths cannot read a mirror or trigger text fallback', async () => {
  for (const url of ['/missing/', 'https://evil.test/', '//evil.test/', '/a/../b/', '/a\\b/', '/a/?q=1', '/a/#fragment']) {
    const docs = url === '/missing/' ? [doc] : [{ ...doc, url }];
    assert.equal(await lookupWebsiteContent(docs, url, () => { throw Error('No fetch allowed'); }), null);
  }
});
test('empty and oversized indexed text remain unavailable instead of silently clipping', async () => {
  const missing = async () => new Response('Missing', { status: 404 });
  for (const content of ['', '  ', 'x'.repeat(MAX_INDEXED_TEXT_BYTES + 1), 'é'.repeat(MAX_INDEXED_TEXT_BYTES / 2 + 1), 'x'.repeat(325361)]) {
    await assert.rejects(lookupWebsiteContent([{ ...doc, content }], doc.url, missing), MarkdownUnavailableError);
  }
  const content = 'x'.repeat(MAX_INDEXED_TEXT_BYTES);
  assert.equal((await lookupWebsiteContent([{ ...doc, content }], doc.url, missing)).content, content);
});
test('the public lookup contract still rejects a missing Markdown mirror', async () => {
  await assert.rejects(lookupContent([doc], { url: doc.url, format: 'markdown' }, async () => new Response('Missing', { status: 404 })), MarkdownUnavailableError);
});

test('absolute search-result URLs resolve only to an exact indexed path on the fixed origin',async()=>{
  let requests=0;
  const fetcher=async(url)=>{requests++;assert.equal(url,'https://bayton.md/projects/example/release-notes/index.md');return new Response('# Complete Markdown');};
  const result=await lookupWebsiteContent([doc],'https://bayton.org'+doc.url,fetcher);
  assert.equal(result.url,doc.url);assert.equal(result.format,'markdown');assert.equal(requests,1);
  for(const url of ['http://bayton.org'+doc.url,'https://bayton.org.evil.test'+doc.url,'https://user:pass@bayton.org'+doc.url,'https://bayton.org/a/../projects/example/release-notes/','https://bayton.org'+doc.url+'?q=1','https://bayton.org'+doc.url+'#fragment','https://bayton.org/not-indexed/']){
    assert.equal(await lookupWebsiteContent([doc],url,()=>{throw Error('No fetch allowed');}),null);
  }
});

test('exact indexed Unicode and percent-encoded paths retain their prior Markdown acceptance',async()=>{
  for(const url of ['/café/','/caf%C3%A9/']){
    const indexed={...doc,url};
    for(const input of [url,'https://bayton.org'+url]){
      const result=await lookupWebsiteContent([indexed],input,async()=>new Response('# Source'));
      assert.equal(result.url,url);assert.equal(result.content,'# Source');
    }
  }
});
test('new indexed-text delivery shares a byte budget across the turn and never clips',async()=>{
  const missing=async()=>new Response('Missing',{status:404});
  const budget={remaining:MAX_INDEXED_TEXT_BYTES};
  const content='x'.repeat(MAX_INDEXED_TEXT_BYTES/2);
  const indexed={...doc,content};
  for(let i=0;i<2;i++)assert.equal((await lookupWebsiteContent([indexed],doc.url,missing,budget)).content,content);
  assert.equal(budget.remaining,0);
  await assert.rejects(lookupWebsiteContent([indexed],doc.url,missing,budget),error=>error.reason==='budget');
  assert.equal(budget.remaining,0);
  assert.equal((await lookupWebsiteContent([indexed],doc.url,async()=>new Response('# Existing Markdown'),budget)).format,'markdown');
});
