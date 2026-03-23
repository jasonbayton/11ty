---
title: "Why can't I find apps in managed Google Play after approving them?"
published: '2026-03-21'
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
  order: 67000
sources:
  - https://learn.microsoft.com/en-us/troubleshoot/mem/intune/app-management/troubleshoot-google-apps
  - https://support.google.com/googleplay/work/answer/6190634
notes: >
  Common issue across multiple EMMs. Root cause is usually the managed Google Play
  iFrame being in "Custom" (collections) mode. Verify current behaviour across
  major EMMs before publishing.
---
This is one of the most common managed Google Play issues reported by administrators.

The most likely cause is that your managed Google Play store is configured in **Custom layout mode** (also known as collections mode). When this mode is active, approved apps will not appear in the Play Store on managed devices until they are explicitly added to a collection.

Custom layout mode is typically enabled when an administrator edits collections within the managed Google Play iFrame in their EMM console. Once enabled, the store switches from showing all approved apps to showing only apps that have been placed in collections.

**To resolve:**
1. Open the managed Google Play iFrame in your EMM console
2. Navigate to the store layout or collections section
3. Add the missing app to an appropriate collection
4. Save and allow time for the change to propagate to devices

**If you want all approved apps to be visible without collections:**
- Some EMMs allow you to switch the store layout back from Custom to Basic mode, which shows all approved apps without requiring collections. The process for this varies by EMM.

**Other possible causes:**
- The app approval hasn't fully propagated yet. Allow up to an hour for newly approved apps to appear.
- The app is region-restricted and unavailable in the device's location.
- The app is assigned to a different policy or device group than the affected devices.
- For private apps, the app may still be in review or processing after upload.
