---
title: 'Why are my work profile notifications delayed or missing?'
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
  order: 18500
sources:
  - https://www.maketecheasier.com/fix-delay-notification-android/
  - https://support.google.com/work/android/answer/6191949
  - https://developer.android.com/topic/performance/appstandby
---

Delayed or missing notifications from work profile apps is a common complaint, particularly for messaging and email applications like Teams, Outlook, and Slack.

The most frequent cause is Android's battery optimisation. Adaptive Battery and Doze mode aggressively limit background activity for apps that are not being actively used, and work profile apps are not exempt from this by default. When a work app is hibernated by the system, it cannot process push notifications until the next maintenance window, which may be minutes or longer.

## Resolving notification delays

**On the device:**
1. Open **Settings > Apps** and select the affected work app (look for the briefcase icon)
2. Tap **Battery** and set it to **Unrestricted** (rather than Optimised or Restricted)
3. On Samsung devices, also check **Settings > Battery > Background usage limits** and ensure the app is not in the sleeping or deep sleeping list

**Via EMM policy:**
- Some EMM platforms allow administrators to configure battery optimisation exemptions for specific apps. Check your EMM documentation for managed configuration options

**Other considerations:**
- Ensure the notification permission is granted for the app (required from Android 13 onwards - see [How do I manage the new notifications runtime permission in Android 13?](/android/android-enterprise-faq/android-13-notifications/))
- If the work profile is paused, notifications from work apps will not be delivered until the profile is resumed
- Network restrictions or VPN configurations that only apply within the work profile may also delay push notification delivery if the connection is intermittent
