function renderFeedEntries(collection) {
  return collection.map(item => ({
    url: item.url,
    date: item.date,
    data: item.data,
    // Read every body synchronously so Eleventy can defer an unfinished feed
    // before the RSS plugin starts asynchronous URL conversion.
    templateContent: item.templateContent,
  })).sort((a, b) => a.date - b.date);
}

module.exports = function contentFeedEntries(collection) {
  const contentTypes = new Set(["post", "documentation", "project-docs", "note"]);
  return renderFeedEntries(collection.filter(item =>
    item.url && contentTypes.has(item.data.type) && item.data.status === "publish"
  ));
};
module.exports.renderFeedEntries = renderFeedEntries;
