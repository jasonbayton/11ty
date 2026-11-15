function renderFeedEntries(collection, limit) {
  const sorted = [...collection].sort((a, b) => a.date - b.date);
  const selected = limit === undefined ? sorted : sorted.slice(Math.max(0, sorted.length - limit));
  return selected.map(item => ({
    url: item.url,
    date: item.date,
    data: item.data,
    // Read every body synchronously so Eleventy can defer an unfinished feed
    // before the RSS plugin starts asynchronous URL conversion.
    templateContent: item.templateContent,
  }));
}

module.exports = function contentFeedEntries(collection, limit) {
  const contentTypes = new Set(["post", "documentation", "project-docs", "note"]);
  return renderFeedEntries(collection.filter(item =>
    item.url && contentTypes.has(item.data.type) && item.data.status === "publish"
  ), limit);
};
module.exports.renderFeedEntries = renderFeedEntries;
