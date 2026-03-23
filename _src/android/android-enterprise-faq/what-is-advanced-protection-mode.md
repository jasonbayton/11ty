---
title: 'What is Advanced Protection, and can it be managed?'
published: '2026-03-22'
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
  key: "What is Advanced Protection, and can it be managed?"
  order: 9500
---
Advanced Protection is a device-level security mode introduced with Android 16. It bundles a broad set of hardened security settings behind a single toggle in **Settings > Security & Privacy**, and is designed for users at higher risk of targeted attacks - journalists, executives, activists, and similar.

When enabled, Advanced Protection activates the following protections:

- **Sideloading blocked** - apps can only be installed from the Play Store and preloaded app stores
- **Play Protect enforced** - Google Play Protect remains on and cannot be disabled
- **2G disabled** - the device will not connect to 2G networks, mitigating interception risks from IMSI catchers
- **Insecure Wi-Fi blocked** - the device will not auto-reconnect to known insecure (open/WEP) networks
- **USB restricted** - USB defaults to charging only while the device is locked, preventing data extraction
- **Inactivity reboot** - after 72 hours locked, the device reboots into a Before First Unlock (BFU) state where decryption keys are cleared from memory
- **Memory Tagging Extension (MTE)** - hardware-level memory safety on supported devices
- **Intrusion logging** - encrypted logs of sensitive system actions stored in the cloud
- **Scam and spam protections** - enhanced call screening and message scanning in Google Phone and Messages

This is distinct from the existing [Google Advanced Protection Program](https://landing.google.com/advancedprotection/) (APP), which is an account-level security programme requiring hardware security keys. The Android 16 Advanced Protection mode is a device-level feature that does not require APP enrolment, and is available to any user on a supported device.

## Enterprise management

As of early 2026, **Advanced Protection cannot be enforced or configured centrally by IT administrators through AMAPI**. There is no policy field in the Android Management API to toggle it on or off. It must be activated individually by the end user on each device.

Google does provide the [`AdvancedProtectionManager`](https://developer.android.com/reference/android/security/advancedprotection/AdvancedProtectionManager) API, which allows applications to query whether Advanced Protection is enabled and register callbacks for state changes. This means an EMM or compliance app could detect whether a user has enabled it and take action accordingly - for example, flagging non-compliant devices or gating access to sensitive resources - but it cannot enforce activation.

Many of the individual protections that Advanced Protection bundles are already available as separate AMAPI policies. For example, admins can already block sideloading (`installUnknownSourcesDisabled`), enforce Play Protect, restrict USB access, and manage system updates independently. What Advanced Protection offers is a user-facing shortcut that activates all of these at once, plus protections like MTE and intrusion logging that are not individually exposed through management APIs.

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">Looking ahead</div>

If Google exposes Advanced Protection as a manageable policy through AMAPI in a future feature drop, administrators could set a single security baseline rather than configuring dozens of individual restrictions. This would be a meaningful simplification for high-security deployments. For now, organisations that want these protections enforced should continue configuring the individual policies available through their EMM.

</div>

## Further reading

- [What's new in the 2026 Android Security Paper?](/blog/2026/03/reviewing-the-2026-security-paper/)
- [Android developer documentation: Advanced Protection Mode](https://developer.android.com/privacy-and-security/advanced-protection-mode)
- [Google Security Blog: Advanced Protection](https://security.googleblog.com/2025/05/advanced-protection-mobile-devices.html)
