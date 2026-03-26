---
title: "What is Identity Check on Android?"
published: '2026-03-26'
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
  order: 42500
sources:
  - https://developer.android.com/work/versions/android-16
  - https://support.google.com/android/answer/15906498
---
Identity Check is a security feature introduced with Android 16 that requires biometric authentication for sensitive actions, even if someone has the device PIN or password.

When Identity Check is enabled, actions such as changing passkeys, modifying security settings, or accessing sensitive app data require the device owner's fingerprint or face authentication. A PIN, pattern, or password alone is not sufficient for these actions.

**How does this affect enterprise?**

For managed devices, Identity Check adds a layer of protection against scenarios where a device PIN is compromised or shared. This is particularly relevant for:

- Shared device or shift-based deployments where PINs may be known by multiple people
- High-security environments where biometric verification is required for sensitive operations
- Devices used in environments where shoulder-surfing or PIN observation is a concern

Identity Check can be configured through AMAPI policy on fully managed and corporate-owned work profile devices. Administrators can enforce biometric requirements for sensitive actions without relying solely on the standard screen lock.

This feature is part of Android's broader move towards zero-trust security principles at the device level, complementing existing features like Device Trust signals and hardware-backed attestation.
