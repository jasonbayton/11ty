importScripts("https://cdn.jsdelivr.net/npm/fuse.js@6.6.2");

let fuse = null;
let searchData = [];

function normalizePath(path) {
  if (!path) return "/";

  let normalized = path;

  try {
    normalized = decodeURIComponent(normalized);
  } catch (_) {
    // Keep the raw path if it contains malformed encoding.
  }

  normalized = normalized.replace(/\/{2,}/g, "/");

  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }

  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }

  return normalized || "/";
}

self.onmessage = async function (e) {
  const { type, data } = e.data;

  if (type === "init") {
    try {
      const res = await fetch("/search-index.json");
      searchData = await res.json();
      fuse = new Fuse(searchData, data.options);
      self.postMessage({ type: "ready" });
    } catch (err) {
      self.postMessage({ type: "error", data: { message: err.message } });
    }
  }

  if (type === "match-url") {
    if (!searchData.length) return;

    const variants = Array.isArray(data.variants) ? data.variants.map(normalizePath) : [];
    const variantSet = new Set(variants);
    const item = searchData.find((entry) => entry.url && variantSet.has(normalizePath(entry.url))) || null;

    self.postMessage({ type: "matched-url", data: { item } });
  }

  if (type === "search") {
    if (!fuse) return;
    const hasCustomLimit = Number.isFinite(data.limit) && data.limit > 0;
    const limit = hasCustomLimit ? data.limit : 30;
    const results = fuse.search(data.query, { limit });
    self.postMessage({ type: "results", data: { results, query: data.query } });
  }
};
