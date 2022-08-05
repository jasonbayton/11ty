const { DateTime } = require("luxon");
const timeToRead = require("eleventy-plugin-time-to-read");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const _ = require("lodash");
const pluginDate = require('eleventy-plugin-date');
const dates = require("./_src/_data/dates.js");
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPassthroughCopy({"_src/_includes/_assets/css": "/css"});
  eleventyConfig.addPassthroughCopy({"_src/_includes/_assets/js": "/js"});
  eleventyConfig.addPassthroughCopy({"_src/_includes/_assets/img": "/img"});
  eleventyConfig.addPassthroughCopy({"_src/_includes/_redirects": "/_redirects"});
  eleventyConfig.addPassthroughCopy({"_src/favicon.ico": "/favicon.ico"});
  eleventyConfig.addPlugin(pluginDate);
  eleventyConfig.addFilter("dateYear", dates.dateYear);
  eleventyConfig.addFilter("dateISO", dates.dateISO);
  eleventyConfig.addFilter("dateFeed", dates.dateFeed);
  eleventyConfig.addFilter("dateFull", dates.dateFull);
  eleventyConfig.addFilter("dateFormat", dates.dateFormat);
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

// nice post dates
  eleventyConfig.addFilter("postDate", (dateObj) => {
  return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL);
  });

// Options for the `markdown-it` library
const linkAfterHeader = markdownItAnchor.permalink.linkAfterHeader({
  class: "heading-anchor",
  symbol: "<sup>#</sup>",
  style: "aria-labelledby",
});
const markdownItAnchorOptions = {
  level: [1, 2, 3, 4],  
  tabIndex: false,
  permalink(slug, opts, state, idx) {
    state.tokens.splice(
      idx,
      0,
      Object.assign(new state.Token("div_open", "div", 1), {
        // Add class "header-wrapper [h1 or h2 or h3]"
        attrs: [["class", `heading-wrapper`]],
        block: true,
      })
    );

    state.tokens.splice(
      idx + 4,
      0,
      Object.assign(new state.Token("div_close", "div", -1), {
        block: true,
      })
    );

    linkAfterHeader(slug, opts, state, idx + 1);
  },
};

/* Markdown Overrides */
let markdownLibrary = markdownIt({
  html: true,
}).use(markdownItAnchor, markdownItAnchorOptions);

// This is the part that tells 11ty to swap to our custom config
eleventyConfig.setLibrary("md", markdownLibrary);

// break posts by year
  eleventyConfig.addCollection("postsByYear", (collection) => {
    return _.chain(collection.getAllSorted())
      .groupBy((post) => post.date.getFullYear())
      .toPairs()
      .reverse()
      .value();
  });

// Search!
  const elasticlunr = require("elasticlunr");

  module.exports = function(collection) {
    var index = elasticlunr(function() {
      this.addField("title");
      this.setRef("id");
    });

    collection.forEach(page => {
      index.addDoc({
        id: page.url,
        title: page.template.frontMatter.data.title
      });
    });
    return index.toJSON();
  };

// 11ty output
    return {
      dir: {
        input: "_src",
        output: "_public",
      },
    };
 
  };