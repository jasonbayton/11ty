const test = require('node:test');
const assert = require('node:assert/strict');
const { lookupContent, markdownBody, MarkdownUnavailableError } = require('../netlify/functions/_shared/content-lookup');
const doc = { title: 'Guide', url: '/android/guide/', date: '2026-10-19', content: 'Legacy plain content' };
test('default and explicit text preserve exact response and never fetch', async () => {
 for (const format of [undefined, 'text']) {
  const found = await lookupContent([doc], { url: doc.url, format }, () => {throw Error('No network');});
  assert.equal(found,doc); assert.equal(JSON.stringify(found),JSON.stringify(doc));
 }
 assert.equal(await lookupContent([doc],{url:'/missing/',format:'markdown'},()=>{throw Error('No fetch for unknown path');}),null);
});
test('Markdown is complete, preserves structure/entities/whitespace and strips opening metadata only', async () => {
 const body='\n# Heading\n\n**Bold** and [link](/android/) &amp;\n\n```json\n{"a":1}\n```\n'+ 'long documentation '.repeat(500)+'AFTER_4000\n';
 const raw='---\r\ntitle: Guide\r\nstatus: publish\r\n---\r\n'+body;
 const result=await lookupContent([doc],{url:doc.url,format:'markdown'},async(url,init)=>{
  assert.equal(url,'https://bayton.md/android/guide/index.md'); assert.equal(init.redirect,'error'); return new Response(raw);
 });
 assert.equal(result.content,body); assert.equal(result.format,'markdown'); assert.equal(result.sourceUrl,'https://bayton.md/android/guide/index.md');
 assert.equal(markdownBody('---\ntitle: incomplete\n'), '---\ntitle: incomplete\n');
 assert.equal(markdownBody('    indented code\n'), '    indented code\n');
});
test('missing or invalid mirrors fail explicitly and foreign URLs never fetch', async () => {
 for(const fetcher of [async()=>new Response('missing',{status:404}),async()=>new Response('<!doctype html><html>Not found</html>'),async()=>{throw Error('Timeout');}])
  await assert.rejects(lookupContent([doc],{url:doc.url,format:'markdown'},fetcher),MarkdownUnavailableError);
 for(const url of ['https://evil.invalid/','//evil.invalid/','/\\evil.invalid/'])
  await assert.rejects(lookupContent([{...doc,url}],{url,format:'markdown'},()=>{throw Error('Must not fetch');}),MarkdownUnavailableError);
 await assert.rejects(lookupContent([doc],{url:doc.url,format:'html'}),/Parameter format/);
});

test('mirror emits exact raw sidecars for published content, including inherited notes, and excludes drafts', () => {
 const fs=require('node:fs'), os=require('node:os'), path=require('node:path'), cp=require('node:child_process');
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'bayton-md-sidecar-'));
 try {
  fs.copyFileSync(path.resolve('build-md-mirror.js'),path.join(root,'build-md-mirror.js'));
  const assets=path.join(root,'_src/_includes/_assets/js');fs.mkdirSync(assets,{recursive:true});
  for(const name of ['fuse-search-worker.js','fuse-search.js']) fs.writeFileSync(path.join(assets,name),'');
  const notes=path.join(root,'_src/notes');fs.mkdirSync(notes,{recursive:true});
  fs.writeFileSync(path.join(notes,'notes.11tydata.json'),'{"status":"publish"}');
  const published='---\ntitle: Published\n---\n# Real Markdown\n\n**Bold** &amp; `code`\n';
  fs.writeFileSync(path.join(notes,'123.md'),published);
  fs.writeFileSync(path.join(notes,'draft.md'),'---\ntitle: Draft\nstatus: draft\n---\nDRAFT_CANARY');
  cp.execFileSync(process.execPath,[path.join(root,'build-md-mirror.js')],{cwd:root});
  assert.equal(fs.readFileSync(path.join(root,'_public_md/notes/123/index.md'),'utf8'),published);
  assert.ok(!fs.existsSync(path.join(root,'_public_md/notes/draft/index.md')));
 } finally { fs.rmSync(root,{recursive:true,force:true}); }
});
