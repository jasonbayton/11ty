---
title: "What is Lost Mode on Android Enterprise?"
published: '2026-03-23'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - FAQ
categories:
    - Fully managed
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 62500
---
Lost Mode is an Android Enterprise management feature that allows administrators to remotely lock and locate a company-owned device that has been lost or stolen.

### What does Lost Mode do?

When activated by an administrator:

- The device is locked, preventing unauthorised access
- The device's location is reported to the admin console
- An audio alert can be played to help physically locate the device
- A message and contact number can optionally be displayed on the lock screen

### Which devices support it?

Lost Mode is available on:

- **Fully managed devices** running Android 11 or later
- **COPE devices** (work profile on company-owned device) running Android 13 or later

It is an AMAPI-only feature. EMMs using a custom DPC do not have access to Lost Mode unless they have implemented their own equivalent.

### Does it require location services to be enabled?

Lost Mode can activate location reporting regardless of the device's existing location settings on fully managed devices. On COPE devices, location accuracy depends on the device's configuration and whether location services were enabled prior to activation.

### How do I enable it?

Lost Mode is activated through your EMM console. The specific steps vary by vendor - check your EMM's documentation for instructions. The feature must be supported by your EMM's AMAPI implementation.

**Sources:**
- [Android Enterprise Help: Lost mode](https://support.google.com/work/android/answer/13581513)
- [Android Enterprise Help: What's new - Lost Mode](https://support.google.com/work/android/answer/14193469)
