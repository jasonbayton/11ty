---
title: 'Is it possible to bind Android Enterprise with multiple EMMs?'
published: '2019-04-26T16:39:55+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
    - General
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: 'Is it possible to bind Android Enterprise with multiple EMMs?'
  order: 7000
--- 
No. 

An Android Enterprise bind is undertaken with only one EMM at a time. Under all normal circumstances attempting to bind with the same Google account on another EMM will return an error stating an Enterprise already exists.

It is possible to unbind from one EMM and then bind with another, however this will delete the existing Enterprise and create a brand new one, losing all approved applications, etc.

The only exception to the above is in high availability and/or disaster recovery scenarios where an instance of an EMM may be replicated, but no two EMMs should be generating managed Google Play accounts from the same Google account simultaneously.

