module.exports = {
  eleventyComputed: {
    changes: data => data.gitHistory?.[data.page.inputPath] || null,
    eleventyNavigation: {
      key: data => data.title,
      parent: data => data.parent
    }
  }
}