---
title: "Can organisations see applications outside of the work profile on a COPE device?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
    - COPE
    - App management
    - Work profile
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "Can organisations see applications outside of the work profile on a COPE device?"
  order: 29000
--- 
**Android 8-10** – Yes. This is because the DPC sits both in and outside of the work profile normally, and the DPC will collect an app inventory surrounding it. Organisations can opt to disable this within the EMM under a privacy policy, and EMMs may even disable it by default, however do consider there is a privacy consideration when installing personal applications.

**Android 11+** – No, this is because in Android 11, work profiles on fully managed devices was deprecated in favour or work profiles on company owned devices. This new deployment scenario aligns the privacy aspect with that of a work profile deployment, [because it sort-of is one](/2020/02/android-enterprise-in-11-google-reduces-visibility-and-control-with-cope-to-bolster-privacy/).

