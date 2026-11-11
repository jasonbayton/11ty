const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const strip = require("./feed-html.cjs");

test("preserves ordinary article HTML byte for byte", () => {
  const html = '<h2 id="intro">Intro</h2>\n<div class="callout"><b>Important</b>  text<br>\n<a href="/android/">Read</a><img src="/image.gif" alt="Picture"></div>\n<details><summary>More</summary><table><tr><td>One</td></tr></table></details><style>.test { color: red; }</style>';
  assert.equal(strip(html), html);
});

test("removes inline, external, mixed-case and data scripts with quoted greater-than", () => {
  const scripts = ['<script>window.data = {"x":"<p>data</p>"};</script>', '<SCRIPT src="/app.js" data-test="a>b"></SCRIPT>', '<script type="application/ld+json">{"name":"Data"}</script>', '<script type="module">import x from "x";</script>'];
  for (const script of scripts) assert.equal(strip(`before\n${script}\nafter`), "before\n\nafter");
});

test("preserves escaped code examples, comments and textarea literals", () => {
  const html = '<pre><code>&lt;script&gt;example()&lt;/script&gt;</code></pre><!-- <script>example()</script> --><textarea><script>literal</script></textarea>';
  assert.equal(strip(html), html);
});

test("finds scripts in templates, SVG and noscript while preserving fallback content", () => {
  assert.equal(strip('<template><script>hidden()</script><p>Template</p></template><svg><script>svg()</script><circle r="2"/></svg><noscript><script>data</script><p>Fallback</p></noscript>'), '<template><p>Template</p></template><svg><circle r="2"/></svg><noscript><p>Fallback</p></noscript>');
});

test("uses string offsets correctly with Unicode and adjacent scripts", () => {
  assert.equal(strip('😀 café<script>one()</script><script>two()</script>終'), '😀 café終');
  assert.equal(strip('before<script>unfinished'), 'before');
  assert.equal(strip(''), '');
});

test("matches empty-content handling and preserves CRLF source positions", () => {
  for (const html of [undefined, null, ""]) assert.equal(strip(html), "");
  assert.equal(strip('<p>Before</p>\r\n<script>one\r\ntwo</script>\r\n<p>After</p>'), '<p>Before</p>\r\n\r\n<p>After</p>');
});

test("removes script source correctly in table insertion contexts", () => {
  assert.equal(strip('<table><script>data()</script><tr><td>Cell</td></tr></table><p>After</p>'), '<table><tr><td>Cell</td></tr></table><p>After</p>');
});

test("removes the oversized embedded database without truncating visible content", () => {
  const data = 'x'.repeat(13_000_000);
  const article = '<h1>Database</h1><a href="https://sysapps.bayton.org/">Visit database</a>';
  assert.equal(strip(`${article}<script>window.packages="${data}";</script><p>End</p>`), `${article}<p>End</p>`);
});

test("every RSS article export filters scripts before URL conversion", () => {
  const source = path.join(__dirname, "../_src");
  const templates = fs.readdirSync(source).filter(name => /^rss.*\.njk$/.test(name));
  assert.equal(templates.length, 12);
  for (const name of templates) {
    const template = fs.readFileSync(path.join(source, name), "utf8");
    assert.match(template, /post\.templateContent \| stripFeedScripts \| htmlToAbsoluteUrls/, name);
  }
});
