---
title: "Can I manage Private DNS settings through AMAPI?"
published: '2026-03-22'
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
  order: 45000
sources:
  - https://developers.google.com/android/management/release-notes
---
Yes. From February 2026, the Android Management API supports configuring Private DNS on company-owned devices running Android 10 and above.

The new `privateDnsSettings` policy field supports three modes:

- **User choice** - the end user can configure Private DNS in device settings (default behaviour)
- **Automatic** - the device uses the network's DNS-over-TLS server automatically when available
- **Specified host** - the administrator defines a specific Private DNS hostname, such as a corporate DNS resolver

This is available for fully managed devices and work profiles on company-owned devices. It does not apply to personally-owned work profile deployments.

Before this addition, administrators had no standardised way to enforce Private DNS configuration through AMAPI, and often relied on OEM-specific OEMConfig policies or VPN-based DNS solutions. This brings Private DNS management in line with what custom DPCs could already achieve through the platform `DevicePolicyManager` APIs.
