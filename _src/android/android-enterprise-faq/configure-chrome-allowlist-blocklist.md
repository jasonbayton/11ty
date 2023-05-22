---
title: "How do I configure the allowlist/blocklist domains for Chrome?"
published: '2023-05-22'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - App management
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 63000
--- 
To permit or block a selection of URLs in Chrome managed config, you need to add the URLs to the relevant list. The format for this is as follows:

`[scheme://][.]host[:port][/path][@query]`

Setting multiple URLs in succession would look like this:

`["http://www.example.com", "https://www.example.com", "http://*", "https://example.com?sda"]`

More format examples can be found [here](https://support.google.com/chrome/a/answer/9942583), but in a nutshell:

- `*` targets everything. This is useful for preventing access to everything via a blocklist, then explicitly allowlisting certain domains or URLs.
- `192.0.2.1` targets this specific IP
- `.domain.com` explicitly blocks the root domain, but not its subdomains
- `domain.com` blocks everything in that domain

It's important to note that some EMMs require brackets for this to work properly, which is why I used them in the multiple URLs example. Google's documentation doesn't mention this, but it's a crucial step.