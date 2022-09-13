---
title: "What happens if a device is uploaded to zero-touch with the wrong manufacturer?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - AE FAQ
    - AE Zero-touch
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "What happens if a device is uploaded to zero-touch with the wrong manufacturer?"
  order: 57000
--- 
The upload may complete successfully, but the device will not initiate the zero-touch enrolment flow once connected to a network. The device will need to be deregistered and re-registered with the correct manufacturer.

From 2020, the manufacturer field is no longer required for IMEI-based uploads and can be ommitted.

## Submit a question

Need something else answered? Submit an [issue](https://github.com/jasonbayton/11ty/issues/new?assignees=jasonbayton&labels=documentation&template=content-request.md&title=%5BContent+request%5D), tweet [@jasonbayton](https://twitter.com/jasonbayton) or tag me in a [LinkedIn](https://linkedin.com/in/jasonbayton) post. Questions may be republished on this document, or form the basis of a new document under [/android](/android).