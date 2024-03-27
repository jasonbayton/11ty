---
title: 'The Google Play iFrame app approval flow is deprecated'
published: '2023-08-20'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - App management
eleventyNavigation:
  order: 8000
layout: base.njk
---
Way back in September 2021 Google [deprecated the old app approval flow](https://developers.google.com/android/work/deprecations#app_approval_september_1_2022) in favour of an app select flow. This falls in line with the shift over to the Android Management API (AMAPI) and ongoing deprecation of the legacy PlayEMM API some of the larger EMM vendors are still reliant on.

## What's the difference?

Here's the app approval flow: 

![](https://cdn.bayton.org/uploads/2023/08/2023-08-20_23.42.19.gif)

And here's the app select flow:

![](https://cdn.bayton.org/uploads/2023/08/2023-08-20_23.43.37.gif)

These flows were taken from live environments at the time of writing, showing that still in 2023 vendors haven't yet made the switch.

Google's extended grace period for the switchover is December 2023, which means all vendors will need to migrate before this time, or face a disruption of the app selection process within the EMM console.

## How are organisation admins affected?

On the app approval flow, organisation admins are required to approve an app, confirm its continued approval on application update, and are then able to select it for import into their EMM of choice. This approval flow is also required in order to add applications to collections. With the newer app select flow, the entire approval requirement has been deprecated. There are more impactful changes needed on the EMM backend, but all the admin should notice is the absence of the approve button, with the application(s) of choice importing directly into policy or an app management location within the EMM. 

## More information

As this is predominantly an EMM vendor-led change, for questions on implications for on-premise EMM server installs, changes to EMM UX or UIs, or anything else outside of what's mentioned above, please contact your EMM. 

Refs: [Intune](https://techcommunity.microsoft.com/t5/intune-customer-success/support-tip-intune-moving-to-support-new-google-play-android/ba-p/3849875), [SOTI](https://discussions.soti.net/articles/google-managed-playstore-emm-deprecations-coming-in-december-1-2023-1)
