---
title: 'Why does zero-touch or KME not trigger after a factory reset on Android 15+?'
published: '2026-03-22'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - FAQ
categories:
    - Zero-touch
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "Why does zero-touch or KME not trigger after a factory reset on Android 15+?"
  order: 41500
target_file: '_src/android/android-enterprise-faq/android-15-provisioning-timing.md'
---
There are reports from the [Android Enterprise Customer Community](https://www.androidenterprise.community) and other forums of devices running Android 15 and later failing to trigger zero-touch or KME enrolment following a factory reset, instead defaulting to the personal setup wizard.

This behaviour appears to be related to timing changes in Android 15's setup flow. In some cases, the device completes the initial setup screens before the zero-touch or KME configuration is fetched and applied, resulting in the device landing on the home screen as an unmanaged personal device.

## Common causes and workarounds

**Network connectivity timing** - the device needs an active internet connection very early in the setup flow for zero-touch or KME to activate. If the device connects to Wi-Fi after certain setup screens have already been passed, the provisioning trigger may be missed. Ensure devices have network access as early as possible during setup, ideally via a known Wi-Fi network or mobile data.

**Profile assignment after reset** - if the device's IMEI or serial number was recently re-assigned in the zero-touch or KME portal, there can be a propagation delay. Verify that the correct configuration or profile is assigned and has had time to propagate before resetting the device.

**Dual-SIM devices** - on dual-SIM devices, the reseller should register the primary (first) IMEI. Registering the secondary IMEI can cause zero-touch to fail silently. Alternatively, register by serial number.

**Samsung-specific considerations** - configuring both zero-touch and KME on the same Samsung device is not recommended, as the two enrolment methods can conflict. Choose one and remove the other from the respective portal.

**GMS Core version** - devices with significantly outdated GMS Core versions may not process zero-touch enrolment correctly. This is more common on devices that have been in storage for an extended period. If the device can access the Play Store briefly before reset, allow GMS Core to update first.

## If provisioning still fails

1. Confirm the device IMEI or serial number is correctly registered in the zero-touch console or KME portal
2. Check that a valid configuration or profile is assigned (not just registered)
3. Factory reset the device again, ensuring Wi-Fi is connected at the earliest possible stage
4. If using a SIM, ensure mobile data is available before Wi-Fi is configured
5. Check for [known issues](https://developers.google.com/zero-touch/resources/known-issues) in Google's zero-touch documentation

If the issue persists across multiple devices of the same model, it may be an OEM-specific bug. Raise it with the OEM and consider logging it in the [Android Enterprise Customer Community](https://www.androidenterprise.community).
