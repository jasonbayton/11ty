importScripts("https://cdn.jsdelivr.net/npm/fuse.js@6.6.2");

let fuse = null;

self.onmessage = async function (e) {
  const { type, data } = e.data;

  if (type === "init") {
    try {
      const res = await fetch("/search-index.json");
      const searchData = await res.json();
      fuse = new Fuse(searchData, data.options);
      self.postMessage({ type: "ready" });
    } catch (err) {
      self.postMessage({ type: "error", data: { message: err.message } });
    }
  }

  if (type === "search") {
    if (!fuse) return;
    const results = fuse.search(data.query, { limit: 30 });
    self.postMessage({ type: "results", data: { results, query: data.query } });
  }
};
