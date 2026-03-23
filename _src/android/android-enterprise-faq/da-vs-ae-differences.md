---
title: "What’s the difference between Device Admin and Android Enterprise?"
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
  key: "What’s the difference between Device Admin and Android Enterprise?"
  order: 6000
--- 
<div class="callout callout-red">
<div class="callout-heading callout-heading-small">Device Admin is deprecated</div>

Device Admin (DA) has been deprecated since Android 10 (2019). From Android 15, DA APIs are no longer available for new device activations. **Android Enterprise is the only supported path for managing Android devices.** If your organisation is still using Device Admin, migration to Android Enterprise should be treated as urgent.

</div>

For an in-depth take on this, check out:

- [Android Enterprise vs Device Admin: Why DA is no longer suitable](/android/android-enterprise-vs-device-administrator-legacy-enrolment/)
- [What is Android Enterprise?](/android/what-is-android-enterprise-and-why-is-it-used/)

### Historical context

Device Admin was introduced with Android 2.2 as a means of granting admin permissions to applications. Any number of admins could sit on a device and have excessive, often unnecessary control. It was widely abused by PHAs (malware, etc) and was very limited in scope of capability, leaving each OEM to build upon it in a fragmented and difficult to support manner.

Android Enterprise takes a more structured approach to device administration by permitting only one owner on a device at a time with scope for task delegation to other apps as defined by the management server. This approach is fundamentally more secure and easier to support as the APIs are universal cross-OEM.

Add in features such as no Google account management, silent app distribution, managed system updates, simple provisioning and streamlined enrolment, and it’s clear why Android Enterprise replaced Device Admin entirely.

