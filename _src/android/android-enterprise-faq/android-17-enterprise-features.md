---
title: "What enterprise features are new in Android 17?"
published: '2026-06-21'
status: publish
author: 'Jason Bayton'
excerpt: "A summary of enterprise-relevant features and behaviour changes in Android 17 (API level 37), released June 2026."
type: documentation
tags:
    - FAQ
categories:
    - General
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 43000
sources:
  - https://developer.android.com/work/versions/android-17
  - https://developer.android.com/about/versions/17/behavior-changes-all
  - https://developer.android.com/about/versions/17/behavior-changes-17
  - https://developer.android.com/about/versions/17/features
---
Android 17 (API level 37) was released to Pixel devices on June 16, 2026. Apps submitted to Google Play will be required to target API 37 from mid-2027 (exact date TBC). Other OEMs are expected to begin rollouts from late Q3 2026.

### AI and automation controls

- **Agentic automation policy** - administrators can disable AI agent automation on fully managed devices and the personal profile of COPE devices using `DevicePolicyManager.setNearbyAppStreamingPolicy()`. Automation is blocked inside work profiles by default
- **Device state for LLMs** - authorised assistant apps can consume device-level data via the [App Functions framework](https://developer.android.com/ai/appfunctions) for context-aware responses. Work profile data is excluded. Administrators can disable this entirely using `DevicePolicyManager.setAppFunctionsPolicy(APP_FUNCTIONS_DISABLED)`

### Security and data protection

- **Cross-profile loopback traffic blocked** - apps can no longer use localhost (127.0.0.1) to communicate across profiles. This applies to all apps on Android 17 regardless of target API. There is no opt-out
- **Certificate Transparency enabled by default** - apps targeting API 37 must include Signed Certificate Timestamps (SCTs) in TLS connections. Internal enterprise CAs that do not publish to CT logs will need exemptions via [network security configuration](https://developer.android.com/privacy-and-security/security-config)
- **HID access gated** - direct access to raw Human Interface Device (HID) datastreams now requires the dangerous-level `ACCESS_HID` permission. Administrators can implicitly block this using `DevicePolicyManager.setUsbDataSignalingEnabled(false)`
- **Theft protection on by default** - Theft Detection Lock and Remote Lock are enabled by default on new, reset, and upgraded devices. Mark as Lost now requires biometric authentication to unlock
- **Advanced Protection enterprise management confirmed** - Google confirmed at I/O 2026 that enterprise policy enforcement of Advanced Protection Mode is coming later in 2026. See [What is Advanced Protection, and can it be managed?](/android/android-enterprise-faq/what-is-advanced-protection-mode/)

### Network and connectivity

- **Local network permission** - `ACCESS_LOCAL_NETWORK` becomes mandatory for apps targeting API 37. Apps accessing local printers, IoT devices, casting targets, or on-premises services must request this permission. IT administrators can pre-grant it using `DevicePolicyManager.setPermissionGrantState()`
- **USB4 and Thunderbolt support** - high-speed PCIe tunnelling is supported but respects `setUsbDataSignalingEnabled()`. If USB data access is restricted, high-speed tunnels are blocked
- **Encrypted Client Hello (ECH)** - TLS connections opportunistically encrypt the SNI field. Enterprises using transparent TLS inspection proxies that rely on SNI should evaluate compatibility
- **VPN app exclusion** - a new `ACTION_VPN_APP_EXCLUSION_SETTINGS` intent allows VPN apps to offer a system UI for per-app exclusion. Administrators should check with their VPN vendor on adoption plans

### App and platform behaviour changes

- **Large screen orientation mandatory** - Android 17 removes the opt-out for fixed orientation on displays 600dp or wider (introduced as optional in Android 16). All apps targeting API 37 must support free-form orientation on large screens
- **SMS OTP three-hour delay** - programmatic access to SMS messages containing OTPs is delayed by three hours for most apps. Apps using [SMS Retriever API](https://developers.google.com/identity/sms-retriever/overview) are unaffected. This applies to all apps on Android 17 regardless of target API
- **Cleartext traffic changes** - `android:usesCleartextTraffic` is planned for deprecation in a future release. Apps targeting API 37 default to blocking cleartext traffic; those relying on HTTP should migrate to network security configuration
- **Contacts Picker enhancement** - the system Contacts Picker now supports full-fidelity contact records across profile boundaries via secure one-by-one selection. Cross-profile visibility remains governed by `setCrossProfileContactsSearchDisabled()`

### Post-quantum cryptography

- **Keystore ML-DSA support** - Android Keystore now supports ML-DSA (Module-Lattice-Based Digital Signature Algorithm) on supported devices. Hybrid post-quantum APK signing pairs classical keys with ML-DSA. No immediate action required for most deployments

For a full list of enterprise changes, refer to [What's new for enterprise in Android 17](https://developer.android.com/work/versions/android-17) on the Android Developers site.
