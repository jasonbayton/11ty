const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const _ = require("lodash");
const pluginDate = require('eleventy-plugin-date');
const dates = require("./_src/_data/dates.js");
const embedYouTube = require("eleventy-plugin-youtube-embed");
const embedTwitter = require("eleventy-plugin-embed-twitter");
const slugify = require("slugify");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const { EleventyRenderPlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPassthroughCopy({"_src/_includes/_assets/css": "/css"});
  eleventyConfig.addPassthroughCopy({"_src/_includes/_assets/js": "/js"});
  eleventyConfig.addPassthroughCopy({"_src/_includes/_assets/img": "/img"});
  eleventyConfig.addPassthroughCopy({"_src/_includes/_redirects": "/_redirects"});
  eleventyConfig.addPassthroughCopy({"_src/favicon.ico": "/favicon.ico"});
  eleventyConfig.addPassthroughCopy({"_src/manifest.json": "/manifest.json"});
  eleventyConfig.addPassthroughCopy({"_src/pwabuilder-sw.js": "/pwabuilder-sw.js"});
  eleventyConfig.addPlugin(pluginDate);
  eleventyConfig.addPlugin(embedYouTube);
  eleventyConfig.addPlugin(embedTwitter);
  eleventyConfig.addFilter("dateYear", dates.dateYear);
  eleventyConfig.addFilter("dateISO", dates.dateISO);
  eleventyConfig.addFilter("dateFeed", dates.dateFeed);
  eleventyConfig.addFilter("dateFull", dates.dateFull);
  eleventyConfig.addFilter("dateFormat", dates.dateFormat);

// tag list
  eleventyConfig.addCollection("tagsList", function(collectionApi) {
    const tagsList = new Set();
    collectionApi.getAll().map( item => {
        if (item.data.tags) { // handle pages that don't have tags
            item.data.tags.map( tag => tagsList.add(tag))
        }
    });
    return tagsList;
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
  slugify: (str) => slugify(str),
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

// Markdown Overrides 
let markdownLibrary = markdownIt({
  html: true,
}).use(markdownItAnchor, markdownItAnchorOptions);
eleventyConfig.setLibrary("md", markdownLibrary);

// break posts by year
  eleventyConfig.addCollection("postsByYear", (collection) => {
    return _.chain(collection.getAllSorted())
      .groupBy((post) => post.date.getFullYear())
      .toPairs()
      .reverse()
      .value();
  });

// filter posts
  eleventyConfig.addFilter('offset', function(collection, amount) {
    return collection.slice(amount)
  });

// 11ty output
    return {
      dir: {
        input: "_src",
        output: "_public",
      },
    };
 
  };