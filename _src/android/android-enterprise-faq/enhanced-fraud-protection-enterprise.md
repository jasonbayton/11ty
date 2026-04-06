---
title: "What is enhanced fraud protection, and can it block enterprise apps?"
published: '2026-04-04'
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
  order: 64800
sources:
  - https://security.googleblog.com/2026/02/keeping-google-play-android-app-ecosystem-safe-2025.html
  - https://developer.android.com/privacy-and-security/fraud-protection
---

Enhanced fraud protection is a Google Play Protect feature that automatically blocks the installation of sideloaded apps requesting sensitive permissions commonly associated with financial fraud, such as reading SMS messages, accessing notifications, or using accessibility services.

As of early 2026, it is active in 185 markets across approximately 2.8 billion devices.

### Can it affect enterprise apps?

Yes, in specific circumstances. If an organisation distributes line-of-business apps by sideloading (installing APKs outside of managed Google Play or an EMM agent), and those apps request sensitive permissions, enhanced fraud protection may block the installation.

This is most likely to affect:

- Apps distributed via email, file share, or web download rather than through managed Google Play
- Apps that legitimately require accessibility services, SMS reading, or notification access for business purposes
- Apps installed through `adb` during development or staging that are then handed to end users

### What is NOT affected?

- **Apps installed via the EMM agent** (Device Policy Controller) are not subject to enhanced fraud protection
- **Private apps uploaded to managed Google Play** are not affected
- **Public apps installed from Google Play** are not affected

### What should administrators do?

1. **Distribute apps through managed Google Play or the EMM agent** - this is the most reliable way to avoid enhanced fraud protection interference
2. **Review app permissions** - if an app requests SMS, notification, or accessibility permissions, ensure there is a genuine business justification. Removing unnecessary permission requests reduces the risk of being flagged
3. **Use AMAPI direct APK installation** - for apps that cannot be published to managed Google Play, [direct APK installation through AMAPI](/android/android-enterprise-faq/amapi-direct-apk-installation/) provides a supported distribution path that bypasses enhanced fraud protection

Enhanced fraud protection is distinct from the [content protection policy](/android/android-enterprise-faq/content-protection-policy/), which focuses on detecting deceptive app UI patterns on Android 15+ fully managed devices.
