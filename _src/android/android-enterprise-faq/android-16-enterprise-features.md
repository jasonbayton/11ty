---
title: "What enterprise features are new in Android 16?"
published: '2026-03-21'
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
  order: 42000
sources:
  - https://developer.android.com/work/versions/android-16
  - https://developers.google.com/android/management/release-notes
  - https://support.google.com/work/android/answer/16319376
---
Android 16 (API level 36) was released on June 10, 2025. Apps submitted to Google Play must target API 36 from August 31, 2026.

**Network management**
- Block Thread networks on managed devices via `DISALLOW_THREAD_NETWORK`
- Enable or disable the NFC controller programmatically
- Configure APN settings via AMAPI (`apnPolicy`)
- 5G network slicing configuration for per-app traffic routing

**Provisioning and setup**
- Streamlined enterprise setup flow, reducing provisioning steps
- Zero-touch customer portal: audit logging and granular role-based access (Manager, Assigner, Viewer)
- Automatic time and timezone configuration control

**App management**
- Managed Google Play iFrame supports Android App Bundle (AAB) uploads for private apps
- AppFunctionManager policy for controlling app function availability (beta)
- Default application management via AMAPI (`defaultApplicationSettings`)

**Device information**
- EID retrieval for eSIM management workflows via `EuiccChipInfo` and `REQUEST_DEVICE_INFO`

**Security**
- Advanced Protection mode: strongest security features with a single user toggle (not centrally enforceable)
- Identity Check: biometric re-authentication outside trusted locations
- Devices launching with Android 16 use Remote Key Provisioning (RKP) only

**Large screen behaviour changes**
- Apps targeting API 36 can no longer enforce fixed orientation, aspect ratio, or resizability on displays 600dp or greater
- Desktop windowing and connected display support reached GA in QPR3 (March 2026)

**Other changes**
- Local network permission introduced (opt-in in 16, mandatory in Android 17)
- Bluetooth intents for bond loss and encryption state changes
- MCP server for conversational fleet management (read-only, February 2026)
- Corporate badge provisioning on managed devices via Google Wallet (Android 9.0+)

For detailed coverage of each feature, see [Android 16: Enterprise features in detail](/android/android-16-enterprise-features/). For the early beta preview, see [What's new (so far) for enterprise in Android 16](/blog/2025/01/new-for-enterprise-android-16/).

For a full list of enterprise changes, refer to [What's new for Android in the enterprise](https://developer.android.com/work/versions) on the Android Developers site.
