const { DateTime } = require("luxon");
const timeToRead = require('eleventy-plugin-time-to-read');
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({"_src/_includes/_assets/css": "/css"});
  eleventyConfig.addPassthroughCopy({"_src/_includes/_assets/js": "/js"});
  eleventyConfig.addPassthroughCopy({"_src/_includes/_assets/img": "/img"});
  eleventyConfig.addPlugin(timeToRead);
  eleventyConfig.addFilter("postDate", (dateObj) => {
  return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL);
  });
  return {
    dir: {
      input: "_src",
      output: "_public",
    },
  };
};
