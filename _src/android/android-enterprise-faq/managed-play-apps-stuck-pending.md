---
title: "Why are managed Google Play apps stuck on pending?"
published: '2026-04-03'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - FAQ
categories:
    - App management
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 68000
sources:
  - https://support.google.com/googleplay/thread/216300041
  - https://support.google.com/work/android/answer/6145139
---
Apps showing as "pending" indefinitely after enrollment or policy assignment is one of the most commonly reported managed Google Play issues.

### Common causes

1. **Network connectivity** - the device needs a stable internet connection to download apps from Google Play. Verify the device can reach `play.google.com` and related Google services. See [network requirements for Android Enterprise](/android/android-enterprise-faq/network-requirements-android-enterprise/) for the full list of endpoints.

2. **Incorrect date and time** - if the device clock is significantly out of sync, Play Store authentication may fail silently. Ensure the device is set to automatic date and time, or configure this via policy.

3. **Insufficient storage** - the device may not have enough free space to download and install the app. This is particularly common on dedicated devices with limited internal storage.

4. **Sequential installation** - managed Google Play processes app installs in small batches. If many apps are assigned at once, some will remain pending while others download and install. This is expected behaviour and will resolve over time.

5. **Play Store cache** - corrupted cache data can cause download failures. Clearing the Play Store app's cache and data (Settings > Apps > Google Play Store > Clear cache/Clear storage) often resolves the issue.

6. **Google account sync** - on work profile devices, the managed Google Play account may not have synced correctly. Opening the managed Play Store app and allowing it to complete initial setup can resolve the issue.

7. **Stuck or pending system app** - Many OEMs now have system applications hosted in Google Play for updates. These can start updating at the same time managed applications are expected to come down, slowing things down in ways that might not look immediately visible.

### Steps to resolve

1. Verify network connectivity and that Google endpoints are not blocked
2. Check the device date and time are correct
3. Confirm sufficient storage space is available
4. Restart the device - this forces a re-sync with Google Play services and unsticks stuck updates.
5. If the issue persists, clear the Google Play Store cache and data
6. For work profile devices, open the managed Play Store app in the work profile to trigger a sync
7. Check the EMM console for app deployment errors that may provide more specific information

### When to escalate

If apps remain stuck after the above steps, the issue may be related to the EMM's app deployment configuration, a Google Play services outage, or a device-specific bug. Raise a support case with your EMM vendor if the problem persists.
