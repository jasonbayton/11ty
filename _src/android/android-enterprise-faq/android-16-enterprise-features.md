---
title: "What enterprise features are new in Android 16?"
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
  order: 42000
sources:
  - https://developer.android.com/work/versions
  - https://developers.google.com/android/work/requirements
  - https://support.google.com/work/android/answer/16319376
---
Android 16 introduces several enterprise-relevant features and policy enhancements. It also marks the shift to a semi-annual release cadence, with a major platform update in Q2 and a smaller feature update in Q4 each year.

**Network management**
- Block the use of Thread networks on managed devices
- Enable or disable the NFC controller
- Configure APN settings via AMAPI
- Support for 5G network slicing configuration

**Provisioning and setup**
- Streamlined enterprise setup flow, reducing provisioning steps and failure rates
- Zero-touch customer portal improvements including audit logging and granular admin roles
- Automatic time and timezone configuration control

**App management**
- Managed Google Play now supports Android App Bundles (AAB) for private apps, simplifying deployment and updates
- AppFunctionManager policy for controlling app function availability

**Device information**
- Admins can retrieve device EID values for both corporate-owned and BYO devices, supporting eSIM management workflows

**Security**
- Advanced Protection mode brings Google's strongest security features to enterprise devices with a single toggle
- Identity Check requires biometric authentication for sensitive app access when outside trusted locations

For a full list of enterprise changes, refer to [What's new for Android in the enterprise](https://developer.android.com/work/versions) on the Android Developers site.
