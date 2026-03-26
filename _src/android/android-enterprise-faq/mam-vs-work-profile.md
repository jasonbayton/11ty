---
title: "What is the difference between MAM and work profiles for BYOD?"
published: '2026-03-26'
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
  order: 17600
sources:
  - https://learn.microsoft.com/en-us/intune/intune-service/apps/android-deployment-scenarios-app-protection-work-profiles
  - https://support.google.com/work/android/answer/7502354
---
MAM (Mobile Application Management) and work profiles are both approaches to protecting corporate data on personal devices, but they work differently.

**MAM (app protection policies)**

MAM applies data loss prevention policies at the application level without requiring device enrolment. The EMM manages individual apps rather than the device. This is sometimes called "MAM without enrolment" or "MAM-only". With MAM:

- No device enrolment is required
- Policies apply only to supported apps (typically Microsoft or apps integrated with the MAM SDK)
- Corporate data within those apps is protected (copy/paste restrictions, save-as controls, encryption)
- The organisation has no visibility into the device itself
- There is no separate container - managed and personal apps coexist in the same space

**Work profiles (Android Enterprise)**

A work profile creates an operating system-level container that separates work apps and data from personal apps and data. With work profiles:

- The device is enrolled with the EMM
- All apps within the work profile are managed, regardless of whether they have MAM SDK integration
- Data separation is enforced by Android at the OS level, not by individual apps
- The organisation gains device-level compliance information (OS version, patch level, encryption status)
- VPN, Wi-Fi, and certificate configurations can be deployed to the work profile

**Which should I use?**

Work profiles provide stronger isolation and broader app support. MAM is lighter-touch and may be preferred when enrolment is not desired or when only a small number of specific apps need protection. Some organisations use both: work profiles for users who need full corporate app access, and MAM-only for users who need access to just one or two apps (such as email).

The choice is often EMM-specific. Not all EMMs support MAM without enrolment on Android, and the available policy controls vary.
