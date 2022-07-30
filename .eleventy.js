const { DateTime } = require("luxon");
const timeToRead = require('eleventy-plugin-time-to-read');
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({"_src/_includes/_assets/css": "/css"});
  eleventyConfig.addPassthroughCopy({"_src/_includes/_assets/js": "/js"});
  eleventyConfig.addPassthroughCopy({"_src/_includes/_assets/img": "/img"});
  eleventyConfig.addPassthroughCopy({"_src/_includes/_redirects": "/_redirects"});
  eleventyConfig.addPlugin(timeToRead, {
    speed: '1000 characters per minute',
    language: 'en',
    style: 'long',
    type: 'unit',
    hours: 'auto',
    minutes: true,
    seconds: false,
    digits: 1,
    output: function(data) {
      return data.timing;
    }
  });
  eleventyConfig.addFilter("postDate", (dateObj) => {
  return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL);
  });
// Options for the `markdown-it` library
  const markdownItOptions = {
    html: true,
  }
// Options for the `markdown-it-anchor` library
  const markdownItAnchorOptions = {
    permalink: true,
    symbol: "U+1F517",
  }
  const markdownLib = markdownIt(markdownItOptions).use(
    markdownItAnchor,
    markdownItAnchorOptions
  )
  eleventyConfig.setLibrary("md", markdownLib);
    return {
      dir: {
        input: "_src",
        output: "_public",
      },
    };
 
  };