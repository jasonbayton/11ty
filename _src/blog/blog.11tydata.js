module.exports = {
  eleventyComputed: {
    changes: data => data.gitHistory?.[data.page.inputPath] || null,
  }
}