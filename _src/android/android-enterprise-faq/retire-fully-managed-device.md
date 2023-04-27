---
title: 'Is it possible to “retire” (or enterprise wipe) a fully managed device?'
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - Fully managed
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: 'Is it possible to “retire” (or enterprise wipe) a fully managed device?'
  order: 23000
--- 
No, both an enterprise wipe/retire/delete from the EMM and a full wipe on a fully managed device do the same thing, they reset the device back to factory settings.

Android Enterprise requires a DPC actively enrolled to provide management policies, without this, the device will reset.

