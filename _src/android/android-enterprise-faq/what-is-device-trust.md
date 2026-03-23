---
title: "What is Device Trust from Android Enterprise?"
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
  order: 41000
sources:
  - https://bayton.org/blog/2025/10/device-trust-android-enterprise/
  - https://developers.google.com/android/management/device-trust-signals
  - https://developers.google.com/android/management/device-trust-register
---
Device Trust from Android Enterprise is a set of verified device signals that Google provides to registered security and identity partners. It is accessed through the AMAPI SDK (v1.3.0+) and offers over 20 signals covering device state, configuration, and compliance posture.

Key characteristics:

- It works across all ownership models: company-owned, BYOD, and even unmanaged devices
- Access is restricted to partners registered through the Android Enterprise Partner Portal
- It requires a minimum of Android 10
- Signals are provided as a snapshot to the calling application on-device and can be requested as frequently as needed

Device Trust is distinct from Play Integrity. Play Integrity is a general-purpose API available to any app developer for verifying device and app integrity. Device Trust is specifically designed for enterprise security and identity providers that need granular posture data to inform access decisions.

Google recommends running Play Integrity checks before relying on Device Trust signals. If a device fails Play Integrity, the signals reported through Device Trust should not be considered reliable, as the device itself cannot be trusted.

Current integration partners include CrowdStrike, Okta, Omnissa, Urmobo, and Zimperium, among others (including me!).

For a hands-on look at how Device Trust works, see [Device Trust from Android Enterprise: What it is and how it works](/blog/2025/10/device-trust-android-enterprise/).
