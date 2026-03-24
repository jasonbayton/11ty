---
title: 'Why does the work profile drain my battery?'
published: '2026-03-24'
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
  order: 18000
sources:
  - https://www.androidenterprise.community/discussions/conversations/intune-work-profile-battery-drain/2982
  - https://r1.community.samsung.com/t5/galaxy-s/samsung-galaxy-s24-battery-drains-when-work-profile-is-enabled/td-p/25906734
  - https://support.google.com/work/android/answer/6191949
---

The work profile runs a separate instance of Google Play Services, maintains its own app data, and syncs independently from the personal side of the device. This effectively doubles some of the background processes that would otherwise run once, and can result in noticeable battery impact.

Common contributors to work profile battery drain include:

- **Google Play Services** - the work profile runs its own instance of Play Services, which handles push notifications, account sync, and Play Protect scanning independently
- **App sync frequency** - work apps such as Outlook, Teams, or Slack maintain their own sync schedules within the work profile. If multiple apps are syncing frequently, the cumulative impact adds up
- **Battery optimisation exclusions** - some EMM vendors recommend or require that certain work apps are excluded from Android's battery optimisation (Adaptive Battery, Doze). This prevents the OS from hibernating those apps, increasing background activity
- **Play Protect scanning** - Play Protect runs separately within the work profile, scanning installed apps on its own schedule

## What can be done

**For end users:**
- Check battery usage in Settings to identify which work profile apps consume the most power
- Reduce sync frequency for work apps where possible (if not enforced by policy)
- Ensure the device OS and work apps are up to date, as battery improvements are shipped regularly
- Turn the work profile off when not needed, Digital Wellbeing allows scheduling this also.

**For administrators:**
- Review app sync and refresh policies - aggressive sync intervals across multiple apps compound battery drain
- Avoid blanket exclusions from battery optimisation unless genuinely required
- Consider deploying fewer apps to the work profile where practical
- On Samsung devices, check the Device Care battery settings for work profile apps being kept active unnecessarily

There is no way to eliminate the overhead of running a work profile entirely, as the separation is fundamental to how the profile provides data isolation. However, the impact should be manageable on modern devices with reasonable app deployment and sync configurations.
