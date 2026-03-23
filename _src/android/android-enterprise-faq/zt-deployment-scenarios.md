---
title: "What deployment scenario will a zero-touch device enrol under?"
published: '2019-04-26'
status: publish
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
  key: "What deployment scenario will a zero-touch device enrol under?"
  order: 45000
---
Zero-touch supports provisioning into any corporate-owned deployment scenario:

- **Fully managed** (COBO) - the device is entirely under corporate control with no personal profile
- **Dedicated** (COSU) - a fully managed device locked to a specific app or set of apps (kiosk mode). The device provisions as fully managed, and the policy determines that it operates as a dedicated device
- **COPE** - a corporate-owned device with a work profile for work/personal separation. Prior to Android 11 this was implemented as a work profile on a fully managed device (WPoFMD). From Android 11, it is a work profile on a company-owned device (WPoCOD) with enhanced privacy for the personal side

### How is the deployment scenario determined?

The deployment scenario is not set in the zero-touch portal itself. It is determined by the EMM configuration assigned to the device.

**For AMAPI-based EMMs**, the enrolment token includes an `allowPersonalUsage` setting:
- `PERSONAL_USAGE_ALLOWED` provisions a COPE device (work profile on company-owned device)
- `PERSONAL_USAGE_DISALLOWED` provisions a fully managed device
- `PERSONAL_USAGE_DISALLOWED_USERLESS` provisions a fully managed device without a user sign-in step (commonly used for dedicated/kiosk devices)

**For custom DPC EMMs**, the DPC extras payload provided in the zero-touch configuration determines the deployment scenario. The specific extras vary by vendor - check your EMM's documentation for the correct values.

In all cases, the zero-touch portal simply pulls the assigned configuration for the device during setup. The EMM handles the rest during provisioning and enrolment.

### What about BYOD?

Zero-touch is for corporate-owned devices only. It requires devices to be purchased through an authorised zero-touch reseller and registered to a zero-touch customer account. Employee-owned devices are not eligible for zero-touch enrolment.

For more on zero-touch, see [What is Android zero-touch enrolment?](/android/what-is-android-zero-touch-enrolment/).

