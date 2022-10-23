---
title: 'What versions of Android supports Android Enterprise?'
published: '2022-10-23'
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
  key: 'What versions of Android supports Android Enterprise?'
  order: 5000
--- 
Android Enterprise was introduced with Android 5.0 Lollipop under the moniker _Android for Work_. 

With that said, very few OEMs originally supported Android Enterprise in the earliest days of its existence; Android Enterprise was not a component of the [Android Compatibility Definition Document](https://source.android.com/docs/compatibility/cdd) (CDD) nor did Google throw any significant weight behind it. It is commonly considered a mandatory requirement from Android Marshmallow (6.x) and above, with reasonably universal compatibility almost guaranteed from Android Nougat (7.x).

If considering support for older versions of Android today, AE compatibility should be only one small factor in the decision. Other consideriations should include:
- Android app compatibility for enterprise applications
- Security update support, for which only Android 10 and above is currently subject to Google's security backport support. Any older versions of Android require manual backporting by the OEM and cannot be guaranteed.
- The OEM and their commitment to security updates and support
- Management/API support for the Android Enterprise solution set, for example zero-touch is only supported on 8.0 and later. 
