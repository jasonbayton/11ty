---
title: "Are Private Space applications truly hidden?"
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
Applications within the Private Space may be detected through the use of ADB, or on-device [package viewers](/projects/package-search). While application _data_ is fully secure and isolated from visibility, the presence of the applications themselves cannot today be entirely hidden from view for anyone determined enough to go looking for them.

**Note**: From Android 16, on-device package managers can no longer detect applications outside of their own user. This reduces (but doesn't remove) the risk of application use being discovered.
