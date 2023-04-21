---
title: "What's new for enterprise in Android 14"
date: '2023-04-20'
status: publish
author: 'Jason Bayton'
excerpt: "With the first beta live, it's time to see what's coming to Android 14"
type: post
tags:
    - Enterprise
---
Not too long ago Google [announced](https://android-developers.googleblog.com/2023/04/android-14-beta-1.html) the first beta of Android 14. 

As these things tend to go, the likelihood now of major additions is slim, and so beta 1 marks a good opportunity to review what we're likely to see when Android 14 officially launches later this year.

Related: [Bayton's Android Enterprise wishlist](/android/android-enterprise-feature-requests/)

Ready?

## Persistent screen-on during provisioning

If your Android experience is primarily centred around Samsung then this may not seem new, but for those of us who've spent time with most other OEMs in the ecosystem the screen turning off during provisioning is at minimum an inconvenience, at most the reason why provisioning or enrolment may fail. 

Often, and I see this more with AMAPI (Intune, Mambo, Wizy, etc) than Play EMM API (custom DPC - MobileIron, SOTI, VMware, etc), allowing the screen to time out and coming back to it a little later results in a failure to setup and a request to reset. In my use cases this isn't the end of the world. For large staging projects this would be beyond frustrating. 

Well in any case, for non-Samsung (or other OEMs that don't already support it) devices, once Android 14 lands this will be a thing of the past. 

## 