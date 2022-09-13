---
title: "Is an EMM still required with zero-touch?"
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
  key: "Is an EMM still required with zero-touch?"
  order: 36000
--- 
Yes. 

Zero-touch is just a provisioning method which deploys an EMM agent to your device over the air (OTA), to enrol into a Fully Managed Device profile using Android Enterprise (not legacy Device Admin) APIs. Google do not provide a free EMM solution, though device management is available through Google Workspace (G Suite) with the appropriate licenses.

## Submit a question

Need something else answered? Submit an [issue](https://github.com/jasonbayton/11ty/issues/new?assignees=jasonbayton&labels=documentation&template=content-request.md&title=%5BContent+request%5D), tweet [@jasonbayton](https://twitter.com/jasonbayton) or tag me in a [LinkedIn](https://linkedin.com/in/jasonbayton) post. Questions may be republished on this document, or form the basis of a new document under [/android](/android).