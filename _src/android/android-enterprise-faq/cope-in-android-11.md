---
title: "How has COPE changed in Android 11?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - Work profile
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "How has COPE changed in Android 11?"
  order: 27000
---
Android 11 fundamentally changed how COPE works. Prior to Android 11, COPE was implemented as a work profile on a fully managed device (WPoFMD) - the device was fully managed with corporate visibility and control, and a work profile was layered on top for app separation.

From Android 11, Google replaced this with work profiles on company-owned devices (WPoCOD). COPE devices are no longer fully managed at their core. Instead, they are essentially enhanced work profile devices with a flag marking them as company-owned, which unlocks a handful of additional device-wide policies that standard BYOD work profiles don't have.

This was a significant reduction in corporate control. Organisations lost visibility of personal apps, network logs, and usage statistics. Device-wide VPN, parent profile app management, APN configuration, and certificate management on the personal side all went away.

For the full breakdown of what changed, including migration paths for existing deployments: [Android 11 COPE changes](/android/android-11-cope-changes/).

**Since Android 11**, the COPE model has remained architecturally the same - it is still a work profile on a company-owned device. Google has incrementally added back some capabilities in later releases:

- **Android 12** introduced personal usage policies allowing organisations to control whether personal accounts, camera, and screen capture are available on the device. These are coarse controls compared to what WPoFMD offered, but better than nothing.
- **Android 13** added the notification permission requirement, which impacts how work apps surface notifications after initial setup.
- **Android 14** refined work profile behaviour and introduced cross-profile restrictions.
- **Android 15** introduced [Private Space](/android/what-is-android-15-private-space/), which is relevant for COPE as it creates another isolated area on the device that admins have no visibility of. Private Space can be disabled on company-owned devices via policy.

If your organisation needs strong device-wide control and visibility, fully managed (COBO) remains the better choice. COPE is best suited to deployments where the organisation accepts limited personal-side visibility in exchange for offering employees genuine personal use on a company device.

