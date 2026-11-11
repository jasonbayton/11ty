// Keep the CommonJS-compatible 7.x API; the existing installed version is pinned.
const { parseFragment } = require("parse5");

// RSS is a reading export. Remove actual script elements without reserialising
// the remaining HTML, so code examples, formatting and whitespace stay intact.
// This is not an HTML security sanitiser; other attributes and URLs are untouched.
module.exports = function stripFeedScripts(html) {
  if (!html) return ""; // Match the RSS plugin's existing empty-content handling.
  const fragment = parseFragment(html, { sourceCodeLocationInfo: true, scriptingEnabled: false });
  const ranges = [];
  const pending = [fragment];
  while (pending.length) {
    const node = pending.pop();
    if (node.tagName === "script") {
      const location = node.sourceCodeLocation;
      if (!location) throw new Error("Feed script has no source location.");
      // parse5 leaves an EOF-terminated script's end at its start offset.
      const end = location.endOffset > location.startOffset ? location.endOffset : html.length;
      ranges.push([location.startOffset, end]);
    } else {
      if (node.childNodes) for (const child of node.childNodes) pending.push(child);
      if (node.content) pending.push(node.content);
    }
  }
  ranges.sort((a, b) => a[0] - b[0]);
  let end = 0;
  const parts = [];
  for (const [start, stop] of ranges) {
    if (start > end) parts.push(html.slice(end, start));
    end = Math.max(end, stop);
  }
  parts.push(html.slice(end));
  return parts.join("");
};
