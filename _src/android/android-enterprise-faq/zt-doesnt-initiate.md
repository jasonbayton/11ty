---
title: "The device registered with zero-touch, but doesn’t launch during setup, why?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - Zero-touch
    - Provisioning
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "The device registered with zero-touch, but doesn’t launch during setup, why?"
  order: 58000
--- 
This could be a few things:

- **Confirm a configuration is assigned** - a device registered in the zero-touch portal without a configuration applied will not initiate enrolment. Check the portal and ensure a configuration is present and assigned to the device.
- **Check the manufacturer and IMEI values** - the manufacturer name must match exactly what Google expects. The example CSV downloaded from the portal lists Google as the manufacturer, and resellers may not have updated it. Also confirm IMEIs are correct.
- **Check network connectivity** - the device must have internet access during setup. Try cellular data to rule out restricted or filtered Wi-Fi networks. See [network requirements](/android/android-enterprise-faq/network-requirements-android-enterprise/) if you need to allowlist endpoints.
- **Is the device running a supported Android version?** Zero-touch requires Android 8.0 or later. On most OEMs, Android 9.0+ is the practical minimum for reliable zero-touch support.
- **Does the OEM support zero-touch on this device?** Unless the device is Android Enterprise Recommended, zero-touch support is optional pre Android 9.0, and the OEM may not have implemented it.
- **Check for KME conflicts on Samsung devices** - if both Knox Mobile Enrolment and zero-touch are configured for the same device, they can conflict. See [Does Samsung support zero-touch?](/android/android-enterprise-faq/samsung-zero-touch/).
- **Are Google Play Services up to date?** Devices that have been in storage for an extended period may have outdated or buggy Play Services that fail to complete the zero-touch handshake. If possible, ensure the device firmware is reasonably current before setup. This may include an initial QR/NFC/etc setup, update, and reset.

