---
title: "Can organisations deploy applications to the parent profile in a COPE deployment?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - Company owned work profile
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "Can organisations deploy applications to the parent profile in a COPE deployment?"
  order: 30000
--- 
**Android 8-10** – Yes, for work profiles on fully managed devices, however this would need to be supported by the EMM. VMware Workspace One UEM can do this for example by uploading an APK to the console, though there are no current examples of EMMs being able to push Google Play applications to both profiles.

**Android 11+** – No, this is not supported for work profiles on company owned devices.

