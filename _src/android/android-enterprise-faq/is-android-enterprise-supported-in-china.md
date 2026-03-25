---
title: 'Is Android Enterprise supported in China?'
parent: 'Android Enterprise FAQ'
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
  order: 0000
---
Android Enterprise is not officially supported in mainland China due to restrictions on Google services, which affects essential functionalities such as account management, app distribution, and in-built security services. In fact, there are [multiple countries](https://support.google.com/work/android/answer/6270910?hl=en) not officially supported.

For organisations operating in these countries, leveraging existing solutions that support AOSP or closed-network enrolment can be a viable alternative. Solutions like Workspace ONE UEM and Microsoft Intune offer support for these approaches. Notably a considerable amount of management capability will be lost without full Android Enterprise management, leaving only on-device API support (restrictions) or any value-adds the respective platforms offer atop this, such as APK deployment.

It is worth noting that Chinese OEMs such as Xiaomi, Oppo, and Vivo ship different ROM variants for domestic and global markets. Global ROM variants (sold outside of mainland China) typically include GMS and support Android Enterprise. Domestic ROM variants sold within China do not include GMS and therefore do not support Android Enterprise. If sourcing devices from these OEMs, confirm whether the device ships with a global or domestic ROM before planning an Android Enterprise deployment.