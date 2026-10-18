const test = require("node:test");
const assert = require("node:assert/strict");
const contentFeedEntries = require("./feed-entries.cjs");

function entry(type, url, date = "2026-01-01", status = "publish") {
  return { data: { type, status }, url, date: new Date(date), templateContent: `<p>${url}</p>` };
}

test("includes blog, docs, project docs and notes in date order", () => {
  const items = [
    entry("note", "/notes/1/", "2026-01-04"),
    entry("documentation", "/android/guide/", "2026-01-02"),
    entry("post", "/blog/post/"),
    entry("project-docs", "/projects/app/release-notes/1/", "2026-01-03"),
  ];
  const result = contentFeedEntries(items);
  assert.deepEqual(result.map(item => item.url), [
    "/blog/post/", "/android/guide/", "/projects/app/release-notes/1/", "/notes/1/",
  ]);
  assert.equal(result[0].templateContent, "<p>/blog/post/</p>");
  assert.equal(items[0].url, "/notes/1/");
});

test("excludes utility pages, archives, drafts and documents without public URLs", () => {
  const excluded = [
    entry("page", "/search/"), entry("archive", "/blog/"),
    entry("documentation", false), entry("post", "/draft/", "2026-01-01", "draft"),
  ];
  for (const item of excluded) {
    Object.defineProperty(item, "templateContent", { get() { throw new Error("Excluded body read"); } });
  }
  assert.deepEqual(contentFeedEntries(excluded), []);
});

test("surfaces unfinished aggregate content synchronously so Eleventy can retry", () => {
  const unfinished = entry("documentation", "/android/faq/");
  const premature = new Error("Tried to use templateContent too early");
  Object.defineProperty(unfinished, "templateContent", { get() { throw premature; } });
  assert.throws(() => contentFeedEntries([entry("post", "/blog/post/"), unfinished]), error => error === premature);
});

test("rendering an already selected section preserves its membership and IDs", () => {
  const items = [entry("archive", "/android/advisories/"), entry("documentation", "/android/legacy/", "2026-01-01", "draft")];
  const result = contentFeedEntries.renderFeedEntries(items);
  assert.deepEqual(result.map(item => item.url), items.map(item => item.url));
  assert.equal(result[1].data, items[1].data);
  assert.equal(result[1].templateContent, items[1].templateContent);
});
