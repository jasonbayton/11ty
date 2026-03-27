---
title: "Is it possible to migrate from fully managed to COPE without a factory reset?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - FAQ
categories:
    - Work profile
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "Is it possible to migrate from fully managed to COPE without a factory reset?"
  order: 31000
sources:
  - https://developers.google.com/android/management/dpc-migration
  - https://developer.android.com/reference/android/app/admin/DevicePolicyManager
---
No. There is no supported method to migrate a device from fully managed (Device Owner) to COPE - work profile on company-owned device (Profile Owner) - without a factory reset.

This is an Android platform constraint, not an EMM limitation. The management mode is set during initial device provisioning and cannot be changed in-place. There is no API in `DevicePolicyManager` or AMAPI to convert a Device Owner into a Profile Owner, or to add a work profile to an already-provisioned fully managed device while simultaneously changing the management architecture.

## Why can't this be done?

Fully managed and COPE are fundamentally different architectures:

- **Fully managed**: The EMM holds Device Owner. The entire device is under corporate control with no profile separation.
- **COPE (Android 11+)**: The EMM holds Profile Owner with a subset of device-level policies. There is a clear separation between a personal profile and a work profile, with privacy protections aligned to the BYOD model.

Converting between these modes would require restructuring the device's user and profile architecture at the OS level - creating a personal profile, migrating user data, and downgrading the DPC from Device Owner to Profile Owner. Android does not support this.

## What about DPC migration?

The AMAPI [DPC migration feature](https://developers.google.com/android/management/dpc-migration) only supports migrating from a custom DPC to Android Device Policy **within the same management mode**. It cannot change the mode itself. A fully managed device migrated via DPC migration remains fully managed.

## The recommended approach

The only path from fully managed to COPE is a factory reset and re-enrolment:

1. **Back up any user data** on the device that needs to be preserved.
2. **Wipe the device** through the EMM or manually.
3. **Re-provision as COPE** using QR code or [zero-touch enrolment](/android/what-is-android-zero-touch-enrolment/). Note that NFC provisioning and `afw#` are not available for COPE on Android 11+.
4. **Restore work apps and data** through Managed Google Play and any managed configurations.

For organisations managing large fleets, plan this as a phased rollout. [Zero-touch](/android/what-is-android-zero-touch-enrolment/) and [Samsung KME](/android/android-enterprise-faq/samsung-zero-touch/) can streamline reprovisioning significantly by ensuring devices automatically enrol into the correct COPE configuration on first boot after reset.

## A note on the old COPE model

Prior to Android 11, COPE was implemented as a "fully managed device with a work profile" (sometimes called WPoFMD). The device was provisioned as fully managed first, and a work profile was added on top. The EMM held full Device Owner control over the entire device.

Android 11 replaced this with a new architecture where the EMM acts as Profile Owner only, with a defined subset of device-level policies. This change improved user privacy but also means there is no continuity between the old and new COPE models. Devices running the old WPoFMD model on Android 9-10 cannot be migrated to the modern COPE model without a factory reset.

For more on the Android 11 COPE changes, see [Android 11 COPE changes](/android/android-11-cope-changes/).

