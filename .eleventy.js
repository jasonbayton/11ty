const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItDefList = require('markdown-it-deflist');
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
const pluginTOC = require("eleventy-plugin-nesting-toc");
const striptags = require("striptags");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyAutoCacheBuster = require("eleventy-auto-cache-buster");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(pluginTOC)
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginDate);
  eleventyConfig.addPlugin(embedYouTube);
  eleventyConfig.addPlugin(embedTwitter);
  eleventyConfig.addPlugin(eleventyAutoCacheBuster, {
    enableLogging: true,
    hashAlgorithm: "sha256",
    hashTruncate: 24,
  });
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
  eleventyConfig.addPassthroughCopy({
    "_src/_includes/_assets/css": "css",
    "_src/_includes/_assets/js": "js",
    "_src/_includes/_assets/img": "img",
    "_src/_includes/_assets/fonts": "fonts",
    "_src/_includes/_redirects": "_redirects",
    "_src/_includes/_headers": "_headers",
    "_src/_includes/robots.txt": "robots.txt",
    "_src/_includes/entID.xml": "projects/managed-settings/entID.xml",
    "_src/_includes/assetlinks.json": ".well-known/assetlinks.json",
    "_src/favicon.ico": "favicon.ico",
    "_src/manifest.json": "manifest.json",
    "_src/pwabuilder-sw.js": "pwabuilder-sw.js",
    "_src/image": "image"
  });

  eleventyConfig.addFilter("dateYear", dates.dateYear);
  eleventyConfig.addFilter("dateISO", dates.dateISO);
  eleventyConfig.addFilter("dateWithTime", dates.dateWithTime);
  eleventyConfig.addFilter("dateFull", dates.dateFull);
  eleventyConfig.addFilter("dateFormat", dates.dateFormat);

// truncate
  eleventyConfig.addFilter("truncate", function (str = "", limit = 30) {
    return str.toString()
      .trim()
      .split(/\s+/g, limit)
      .join(" ") + "&hellip;";
});


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
  slugify: (str) => {
    return str
      .toLowerCase() // convert to lowercase
      .replace(/[^\w\s]/gi, "") // remove special characters
      .replace(/\s+/g, "-"); // replace spaces with hyphens
  },

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
}).use(markdownItAnchor, markdownItAnchorOptions) .use(markdownItDefList);
eleventyConfig.setLibrary("md", markdownLibrary);
eleventyConfig.amendLibrary("md", mdLib => mdLib.enable("code"));

// break posts by year
  eleventyConfig.addCollection("postsByYear", (collection) => {
    return _.chain(collection.getAllSorted())
      .groupBy((post) => post.date.getFullYear())
      .toPairs()
      .reverse()
      .value();
  });

// filter posts
  eleventyConfig.addFilter("offset", function (collection, amount) {
    return collection.slice(amount);
  });

  eleventyConfig.addFilter("parseContent", (content) => {
    // Remove tags from content
    return (
      striptags(content)
        // Handle new lines
        .replaceAll(/(\r\n|\n|\r)/gm, " ")
        // Handle scaping
        .replaceAll("\\", "\\\\")
        // Handle control characters
        .replaceAll(/[\u0000-\u001F\u007F-\u009F]/g, "")
        // Remove html space entity
        .replaceAll("&nbsp;", " ")
    );
  });

// throttle watch
  eleventyConfig.setWatchThrottleWaitTime(600); // in milliseconds

// does content have heading
  eleventyConfig.addFilter("hasHeading", content => {
    return /<h[1-6][^>]*>/.test(content);
  });

// 11ty output
    return {
      markdownTemplateEngine: "njk",
      dir: {
        input: "_src",
        output: "_public",
      },
    };
 
  };