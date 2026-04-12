---
title: "Is Android Enterprise supported on XR headsets?"
published: '2026-03-23'
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
  order: 4000
---
Yes. Google has published [Android Enterprise for Android XR](https://developers.google.com/android/work/xr-management) documentation, confirming management support for XR headsets and wired glasses. 

### What's available

Management is possible on **fully managed** devices only. There is no work profile - COPE or BYOD - support. EMMs may use AMAPI or a custom DPC.

The XR validation requirements are adapted from the standard mobile set:

- **Core management is intact** - provisioning (QR, zero-touch, DPC identifier), security (passcode, wipe, compliance, Play Integrity), silent app distribution, managed configurations, Wi-Fi, certificates, and system update policies are all required
- **Camera and screen capture controls are mandatory** - reflecting the always-on spatial cameras in XR headsets
- **Dedicated device features are included** - lock task mode, persistent preferred activities, and dedicated device security policies are part of the XR validation, confirming Google expects many XR deployments to be kiosk-style
- **Some mobile features are relaxed or removed** - NFC provisioning, eSIM, Smart Lock, keyguard features, and advanced IME management are absent. Advanced VPN, store layouts, and several Play management features are recommended rather than required

### XR-specific considerations

- Lock task mode supports a single 3D app only. No status bar means no notifications or Quick Settings in lock task
- Media Projection (screen casting) must be limited to 2880x2880 resolution
- Custom DPCs for XR require managed Google Accounts for enrolment

### What devices are available?

- **Samsung Galaxy XR** - the only shipping Android XR headset (launched October 2025). Samsung Knox management is also available. Samsung has committed to five years of software and security updates for Galaxy XR
- **XREAL Project Aura**, **Samsung smart glasses**, and **Google AI glasses** are announced for 2026 but not yet available

### What should I plan for?

- **Fully managed only** - XR devices are company-owned, purpose-deployed hardware under this management model
- **Confirm EMM support** before purchasing at scale. Not all EMMs will have XR support immediately
- **Samsung Knox** provides additional management capabilities for Galaxy XR alongside Android Enterprise
- **Test lock task mode** carefully if planning kiosk-style deployments - the single 3D app limitation and lack of notifications are material constraints

For a detailed analysis including the full feature comparison with mobile validation, see [Android Enterprise lands on Android XR](/blog/2026/04/android-enterprise-lands-on-android-xr/).
