---
title: 'Is it possible to bind Android Enterprise with multiple EMMs with one account?'
published: '2019-04-26T16:39:55+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - General
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: 'Is it possible to bind one Android Enterprise/Organisation ID with multiple EMMs?'
  order: 7000
--- 
<div class="callout">

With Google's Better Together Enterprise, support for this is on the way!

</div>

No. 

An Android Enterprise ID is associated with only one EMM at a time. Under all normal circumstances attempting to bind with the same Google account on another EMM will return an error stating an Enterprise already exists.

[It is possible to unbind](/android/android-enterprise-faq/delete-the-ae-bind/) from one EMM and then bind with another, however this will delete the existing Enterprise and create a brand new one, losing all approved applications, etc.

The only exception to the above is in high availability and/or disaster recovery scenarios where an instance of an EMM may be replicated, but no two EMMs should be generating managed Google Play accounts from the same Google account simultaneously.

