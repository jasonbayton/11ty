---
title: "What are the AMAPI device quota limits?"
published: '2026-03-29'
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
  order: 71200
sources:
  - https://www.androidenterprise.community/discussions/conversations/feasibility-of-using-android-management-api-for-direct-management-and-limit-incr/9248
---
By default, all new Google Cloud projects using the Android Management API are allocated a "default" quota of **0** devices per project. This is separate from the API request rate limits covered elsewhere.

**What the device quota means**

The device quota limits how many devices can be enrolled across all enterprises created under a single Google Cloud project. For most organisations using a commercial EMM, this is managed by the EMM vendor and is not something individual customers need to worry about - the EMM's project quota covers their entire customer base.

**When this matters**

The quota becomes relevant if you are:

- Building a custom management solution directly on the AMAPI
- Running a proof of concept with the AMAPI quickstart
- Operating a smaller EMM platform with a growing device count

**Requesting an increase**

To obtain an initial quota, you must apply through Google's partner validation process. This involves demonstrating that your solution meets Google's requirements for an EMM partner. The process is documented in the [AMAPI permissible usage](https://developers.google.com/android/management/permissible-usage) page.

Note that quota increases are not automatic and require review. Community reports indicate response times of 7 or more business days, with some requests taking multiple weeks. Plan well ahead if you anticipate scaling beyond the default limit - do not wait until devices are failing to enrol before requesting an increase. Initiating the quota request early in the development or procurement phase avoids enrolment failures during growth.
