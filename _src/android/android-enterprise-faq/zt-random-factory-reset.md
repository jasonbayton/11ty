---
title: "Why are my zero-touch devices randomly factory resetting?"
published: '2026-03-30'
status: draft
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
  order: 59500
sources:
  - https://www.androidenterprise.community/discussions/conversations/zero-touch-mdm-phones-randomly-factory-resetting/11673
  - https://www.androidenterprise.community/discussions/conversations/zero-touch-phones-randomly-wipe-themselves/13555
---
This is a commonly reported issue, particularly with devices enrolled via [zero-touch enrolment](/android/what-is-android-zero-touch-enrolment/). Devices factory reset themselves shortly after setup, sometimes repeatedly.

### The most common cause: provisioning method mismatch

The most frequent root cause is a device configured for zero-touch enrolment being provisioned through a different method - such as a QR code, NFC bump, or manual setup. When this happens, the device enrols successfully through the alternative method, but the zero-touch configuration still applies in the background. The mismatch between the two provisioning methods causes a conflict, and the device resets to attempt zero-touch provisioning as intended.

**To resolve this:**
- If the device is assigned a zero-touch configuration, allow it to provision via zero-touch - do not use an alternative provisioning method
- If you need to use a different provisioning method, remove the device's zero-touch configuration from the portal first
- Ensure DPC extras in the zero-touch configuration match the enrolment token your EMM expects

### Other possible causes

**KME and zero-touch conflict**

On Samsung devices, Knox Mobile Enrolment (KME) and Google's zero-touch can conflict if both are configured for the same device. Check whether KME is also active and disable one or the other. See [Does Samsung support zero-touch?](/android/android-enterprise-faq/samsung-zero-touch/) for more on this interaction.

**Incomplete provisioning**

If the setup wizard does not complete fully - for example, due to network connectivity loss or Google Play Services failing to update - the device may reset as a recovery mechanism. Ensure devices have stable, unrestricted network connectivity throughout the entire setup process (see [network requirements](/android/android-enterprise-faq/network-requirements-android-enterprise/)).

**Outdated firmware**

Devices that have been in storage may have pre-installed Google Play Services too old to complete zero-touch provisioning. The device attempts to update, fails, and resets. Where possible, ensure devices are running reasonably current firmware before initial setup.

For more on zero-touch enrolment, see [What is Android zero-touch enrolment?](/android/what-is-android-zero-touch-enrolment/).
