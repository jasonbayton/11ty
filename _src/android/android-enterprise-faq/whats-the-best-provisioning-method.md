---
title: "What’s the best provisioning method?"
published: '2019-04-26'
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
  key: "What’s the best provisioning method?"
  order: 11000
---

For a detailed breakdown of every provisioning method, see [Android Enterprise provisioning methods](/android/android-enterprise-provisioning-methods/). This FAQ focuses on which method to choose and why.

## For company-owned devices

**Zero-touch enrolment** (or **Samsung KME** for Samsung fleets) is the recommended approach wherever possible. The key advantages are:

- **Persistence** - if a device is factory reset, whether accidentally or intentionally, it will re-enter the provisioning flow automatically on next network connection. No user intervention is needed beyond connecting to Wi-Fi
- **No staging required** - devices can be shipped directly to end-users without IT needing to touch them first
- **Reduced support overhead** - there is no provisioning step to explain to end-users, no QR code to distribute, and nothing for the user to get wrong during setup

Zero-touch is not necessarily the _fastest_ method - a QR code or DPC identifier can get a device enrolled in about the same time - but speed is only one consideration. The operational benefits of persistence and zero-touch setup far outweigh a few seconds of difference.

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">Zero-touch availability</div>

Zero-touch works on all GMS-certified devices running Android 9.0 or later, but devices must be purchased from a zero-touch approved reseller for the reseller to register them against your zero-touch organisation. Samsung KME does not require a specific reseller - devices can be registered by IMEI or serial number directly, or through Samsung’s Knox Deployment Program.
</div>

If zero-touch or KME is not available, **QR code provisioning** is the next best option. QR codes are persistent, can be hosted anywhere (intranet, printed, emailed), do not require a dedicated provisioning device, and support [DPC extras](/android/android-enterprise-zero-touch-dpc-extras-collection/) for pre-configuration. QR codes are supported on Android 7.0 and later.

**DPC identifier** (`afw#setup` for AMAPI, or `afw#<vendor>` for custom DPCs) is a reasonable fallback when QR code scanning is not practical. It requires the user to type an identifier into the email field during setup, which introduces room for error, but it works on Android 6.0 and later.

**NFC tag provisioning** is still supported but increasingly niche. NFC Beam (device-to-device) was removed in Android 14, so only pre-programmed NFC tags work on modern devices. NFC also cannot provision COPE devices on Android 11 or later. Unless there is a specific reason to use NFC - such as provisioning in an environment where network access is restricted during setup - other methods are generally preferable.

## For BYOD (work profile)

Work profile provisioning on personally-owned devices is simpler, as the device is already set up. The most common approaches are:

- **Enrolment link or token URL** - the user opens a URL on their device, which triggers the EMM app download and work profile creation. This is the cleanest experience for most organisations
- **EMM app from Google Play** - the user installs the EMM app manually and signs in. This works well but puts more responsibility on the user to find and install the correct app
- **Managed Google account sign-in** - for organisations using Google Workspace or Cloud Identity, adding the managed account in device settings can trigger work profile creation automatically

