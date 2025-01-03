---
title: "How can apps be managed in the Private Space?"
published: '2024-11-11'
status: publish
author: 'Jason Bayton'
excerpt: ''
categories:
    - Private Space
type: documentation
tags: 
    - FAQ
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 1000
--- 
Application management within the Private Space is limited to only company-owned work profile devices. Personally owned devices - or BYOD - cannot manage the Personal Space in any way. Fully managed devices do not support Private Space.

For company-owned work profile devices enrolled into AMAPI, the personal usage policies of **personal Play Store mode** and **personal applications** apply both to the parent (personal) profile, _and_ the Private Space.

<div class="callout callout-red">

If your EMM uses a custom DPC with Play EMM API, this feature will be available in future. Until then it is not possible to restrict applications within the Private Space.

_[via](https://developer.android.com/work/versions/android-15), updated by Google on 2024-11-12 to clarify custom DPC status_.

</div>

If your organisation already leverages policies to allow or block applications in the parent profile on a COPE device, these will carry over automatically to the Personal Space.

**Note**: It is not possible to set different personal Play Store modes, or configure separate allow/blocklist policies between the parent profile and the Personal Space. 
