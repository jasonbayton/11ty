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
//const generateOgImages = require("./plugins/og_generator");

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
    "_src/_includes/assetlinks.json": ".well-known/assetlinks.json",
    "_src/favicon.ico": "favicon.ico",
    "_src/manifest.json": "manifest.json",
    "_src/pwabuilder-sw.js": "pwabuilder-sw.js",
    "_src/image": "image",
    "_src/_data/android_versions.json": "api/android_versions.json",
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

  const decodeHtmlEntities = value => {
    if (!value) {
      return "";
    }

    const named = {
      nbsp: " ",
      amp: "&",
      quot: "\"",
      apos: "'",
    };

    return value
      .replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity) => {
        if (entity[0] === "#") {
          const isHex = entity[1].toLowerCase() === "x";
          const number = parseInt(entity.slice(isHex ? 2 : 1), isHex ? 16 : 10);
          if (number === 60 || number === 62) {
            return match;
          }
          return Number.isFinite(number) ? String.fromCodePoint(number) : match;
        }

        const key = entity.toLowerCase();
        return Object.prototype.hasOwnProperty.call(named, key) ? named[key] : match;
      });
  };

  eleventyConfig.addFilter("parseContent", (content) => {
    // Remove tags from content
    return (
      decodeHtmlEntities(striptags(content))
        // Handle new lines
        .replaceAll(/(\r\n|\n|\r)/gm, " ")
        // Handle scaping
        .replaceAll("\\", "\\\\")
        // Handle control characters
        .replaceAll(/[\u0000-\u001F\u007F-\u009F]/g, "")
    );
  });

  eleventyConfig.addFilter("jsonString", value => {
    return JSON.stringify(value == null ? "" : String(value));
  });

// throttle watch
  eleventyConfig.setWatchThrottleWaitTime(600); // in milliseconds

// does content have headings with anchors
eleventyConfig.addFilter("hasHeading", content => {
  return /<div class="heading-wrapper">.*?<h[1-6][^>]*>.*?<\/h[1-6]>.*?<a class="heading-anchor"[^>]*>.*?<\/a>.*?<\/div>/s.test(content);
});

//eleventyConfig.addCollection("ogAllPages", (collectionApi) => {
//  const pages = collectionApi.getAll();
//  generateOgImages(pages); // Run the OG generator here
//  return pages; // You can safely return this even if unused elsewhere
//});

// 11ty output
    return {
      markdownTemplateEngine: "njk",
      dir: {
        input: "_src",
        output: "_public",
      },
    };
 
  };
