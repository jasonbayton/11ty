---
title: "What enterprise features are new in Android 15?"
published: '2024-11-01'
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
  order: 67000
---

Android 15 introduced several enterprise-relevant features and behaviour changes that impact device management.

### Security

- **Content protection policy** - a new AMAPI policy enables enhanced on-device scanning for apps that attempt social engineering tactics, such as fake system dialogs or overlay attacks. This leverages Play Protect's real-time behavioural analysis and is available on fully managed and dedicated devices. See [What is the content protection policy in AMAPI?](/android/android-enterprise-faq/content-protection-policy/)
- **Enterprise Factory Reset Protection (EFRP) always enforced** - on company-owned devices, EFRP is now enforced after a hard factory reset regardless of whether OEM unlocking was toggled on. Previously, enabling OEM unlocking could bypass EFRP
- **Private Space** - a new isolated profile area for personal apps, separate from the work profile. On company-owned devices, admins can disable Private Space via policy. See the [Private Space FAQ section](/android/android-enterprise-faq/) for details

### App behaviour changes

- **Foreground service restrictions** - certain foreground service types (camera, MediaProjection, data sync) can no longer be started from BOOT_COMPLETED broadcast receivers. This breaks common patterns used by kiosk management and fleet monitoring agents that relied on starting services at boot
- **PendingIntent cancellation on stopped state** - PendingIntents registered by an app are now wiped when the app enters the "stopped" state. This affects watchdog and self-healing flows in fleet management agents that relied on persistent alarms
- **Edge-to-edge display enforcement** - apps targeting API 35 are forced into edge-to-edge rendering, which can break kiosk app layouts that assumed fixed system bar dimensions. See [Why is my kiosk app UI broken after updating to Android 15?](/android/android-enterprise-faq/edge-to-edge-dedicated-devices/).

### eSIM management

- Initial support for deploying and managing eSIM profiles on company-owned devices, including the ability to push full and partial eSIM configurations and prevent their removal

For a full list of enterprise changes, refer to [What's new for Android in the enterprise](https://developer.android.com/work/versions/android-15) on the Android Developers site, and check out [Android 15: What's new for enterprise?](/blog/2024/10/actually-new-for-enterprise-android-15/) for a detailed breakdown.
