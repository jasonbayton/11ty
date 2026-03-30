---
title: "Can I manage APNs through AMAPI?"
published: '2026-03-27'
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
  order: 1120
sources:
  - https://developers.google.com/android/management/release-notes
---
Yes. From early 2026, AMAPI supports Access Point Name (APN) management through the `apnPolicy` setting within `DeviceConnectivityManagement`. This comes after years of support for custom DPC vendors.

### What can be configured?

Administrators can define APN configurations that are pushed to company-owned devices. These policy-enforced APNs override any user-configured APNs on the device, ensuring consistent cellular connectivity settings across the fleet.

This is particularly relevant for:
- Organisations using private APNs for cellular connectivity
- Deployments where devices must connect through a specific mobile network gateway
- Kiosk and dedicated device deployments relying solely on cellular data

### Limitations

- APN management applies to **company-owned devices only** (fully managed and COPE)
- The feature requires EMM support - check with your EMM vendor to confirm they have implemented the `apnPolicy` setting
- Personally-owned work profile devices are not supported for APN policy enforcement

### Prior to AMAPI support

Before this AMAPI addition, APN management was typically achieved through:
- OEM-specific APIs (such as Samsung Knox OEMConfig)
- Custom DPC implementations
- Manual configuration during device setup

The AMAPI approach standardises this across all Android Enterprise-compatible devices running supported Android versions.
