---
title: 'VMware announces end of support for Device Admin'
date: '2020-10-01T16:23:07+01:00'
status: publish
author: 'Jason Bayton'
excerpt: "This week, VMware announced their intention to end support for Device Admin based Android management."
type: post
id: 9140
tag:
    - airwatch
    - android
    - 'android enterprise'
    - Enterprise
    - vmware
post_format: []
discourse_permalink:
    - 'https://discuss.bayton.org/t/vmware-announces-end-of-support-for-device-admin/389'
publish_post_category:
    - '14'
tags:
    - Enterprise
---
This week, VMware [announced](https://kb.vmware.com/s/article/80971?lang=en_US&queryTerm=device+admin) their intention to end support for Device Admin based Android management.

A [topic](/2017/12/google-is-deprecating-device-admin-in-favour-of-android-enterprise/) I’ve [covered](/android/infobyte-did-you-know-device-admin-deprecation/) [in depth](/android/android-enterprise-vs-device-administrator-legacy-enrolment/) since Google’s announcement way back at the end of 2017, this has been a long time coming (*so* long), and trends with the wider ecosystem adoption of Android Enterprise over the last few years as Device Admin functionality has slowly but surely eroded away with each major Android release.

3 years on from that announcement it’s clear however DA isn’t going away as rapidly as some would hope; whether that’s due to slow device refresh cycles (some industries take *years* to swap out hardware), organisational reluctance, device choice (GMS-free devices, regional restrictions) or a lack of education (my [What is Android Enterprise](/android/what-is-android-enterprise-and-why-is-it-used/) doc still sees significant traffic on a monthly basis!), when many organisations enrol new devices today, irrespective of OS version, it’s still via Device Admin.

It goes without saying, given VMware’s (AirWatch’s) history and longevity, they have a not-insignificant share of those DA-managed devices today, and a fair amount of work ahead in realising their [Android Enterprise-first strategy](https://blogs.vmware.com/euc/2017/12/android-enterprise-front-center.html). This is a big step in the right direction.

What end of support means
-------------------------

Ending support itself possibly isn’t as immediately disruptive as it may sound; for devices running 9 and below still in 2022 it will continue to be possible to enrol Android devices into Device Admin for existing customers. What the end of support rather means is simply when customers reach out to VMware with an issue relating in any way to Device Admin management, it won’t be supported. Customers therefore are on their own should they choose to continue management of Android devices via DA.

In fact, the changes happening before this, as early as November 2020, referenced in the announcement and linked [here](https://kb.vmware.com/s/article/79206?lang=en_US), will be more disruptive as they’ll prevent all new customers from leveraging Device Admin, and all current customers from enrolling new Android 10+ devices as Device Admin. Those devices on 10 or later coinciding with when VMware’s Intelligent Hub switches to targeting API level 29 per Google Play policy referenced [here](https://developer.android.com/distribute/play-policies) with more detail [here](https://developer.android.com/distribute/best-practices/develop/target-sdk).

![](https://cdn.bayton.org/uploads/2020/09/20200930_180257.jpg)Because the technical ability to continue managing existing Device Admin devices isn’t going away, those customers who feel confident in their ability to self-support the management mode may continue to do so effectively until something on the platform ceases to work correctly. Unfortunately, given that lack of support and development, this pivotal point could be years – or months – and therefore would be an ongoing risk until devices are migrated away.

The inevitable 
---------------

It’s well documented that Android Enterprise is [simpler](/android/what-is-android-enterprise-and-why-is-it-used/), more [secure](/android/gartner-comparison-of-security-controls-for-mobile-devices-2019/) and more [flexible](/android/infobyte-did-you-know-android-enterprise-work-managed-provisioning-methods/) in its [approach](/android/considerations-for-choosing-android-in-the-enterprise/) to Android management, and for organisations the world over is the best way to manage devices. VMware’s push not only to ensure new customers leverage modern Android management by default in the near future, but to actively route customers to Android Enterprise as the only supported option for Android management in in the next few years is bold, yet not [without consideration](/2019/08/vmware-ws1-uem-1908-supports-android-enterprise-enrolments-on-closed-networks-and-aosp-devices/) of those organiastions who have struggled with the obvious limitations of device management in Google-restricted countries or devices without GMS as is often a problem with legacy fleets in some industry sectors.

VMware’s announcement is one of many I hope to see over time across the ecosystem as we transition fully from a Device Admin to an Android Enterprise-only world, and while some may not like the path ecosystem partners are taking, it is the inevitable, and brighter, future for Android management.