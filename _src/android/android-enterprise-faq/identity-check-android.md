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
  - https://www.biometricupdate.com/202601/google-expands-identity-check-biometrics-use-with-android-update
---
Identity Check is a security feature introduced with Android 16 that requires biometric authentication for sensitive actions, even if someone has the device PIN or password.

When Identity Check is enabled, actions such as changing passkeys, modifying security settings, or accessing sensitive app data require the device owner's fingerprint or face authentication. A PIN, pattern, or password alone is not sufficient for these actions.

**How does this affect enterprise?**

For managed devices, Identity Check adds a layer of protection against scenarios where a device PIN is compromised or shared. This is particularly relevant for:

- Shared device or shift-based deployments where PINs may be known by multiple people
- High-security environments where biometric verification is required for sensitive operations
- Devices used in environments where shoulder-surfing or PIN observation is a concern

Identity Check requires individual user activation - there is no AMAPI policy field to enable or enforce it centrally. Users must opt in through **Settings > Security & Privacy** on each device. Administrators cannot toggle it on remotely, but can detect its state and build compliance rules around it.

### App-level biometric enforcement (Android 16 QPR2+)

From Android 16 QPR2, Identity Check extends beyond system settings to any app that uses the standard Android biometric prompt API. When the device is outside trusted locations, the PIN/password fallback is removed entirely for biometric prompts - the user must authenticate with a fingerprint or face. This applies to:

- Third-party apps that use `BiometricPrompt` for authentication (banking, authentication, MTD/EDR agents)
- Chrome Autofill for saved passwords
- Any app relying on biometric verification before granting access to sensitive content

For enterprise, this means any managed app using biometric prompt inherits stronger authentication outside trusted locations without the app developer needing to change anything. Administrators should ensure biometric enrolment is configured on devices where Identity Check is active, since there is no fallback to PIN/password outside trusted locations.

This feature is part of Android's broader move towards zero-trust security principles at the device level, complementing existing features like Device Trust signals and hardware-backed attestation.
