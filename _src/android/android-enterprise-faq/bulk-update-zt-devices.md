---
title: "Is it possible to bulk update zero-touch devices?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - Zero-touch
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "Is it possible to bulk update zero-touch devices?"
  order: 52000
--- 
Yes, via the CSV template provided, or the [customer API](https://developers.google.com/zero-touch/reference/customer/rest).

As of the 2026 portal update, the CSV format is now unified between upload and download - the exported file includes all device data fields plus the reseller name and ID, and can be modified and re-imported directly. This makes bulk updates considerably simpler than before.

