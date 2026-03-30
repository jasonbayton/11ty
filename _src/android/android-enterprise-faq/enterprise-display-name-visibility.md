---
title: "Why is my organisation name showing on managed devices?"
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
  order: 1130
sources:
  - https://developers.google.com/android/management/release-notes
---
From January 2026, AMAPI defaults the `enterpriseDisplayNameVisibility` setting to `ENTERPRISE_DISPLAY_NAME_VISIBLE`. This means the enterprise name configured during the Android Enterprise bind setup is now displayed on company-owned devices by default - typically on the lock screen or in device settings.

### Why is this happening?

Previously, the enterprise name was not actively configured, so could result in differing experiences across vendors. The default behaviour change means organisations that never set this policy field are now seeing the enterprise name appear without having made any policy changes.

### How to control it

Through your EMM's AMAPI policy configuration, set `enterpriseDisplayNameVisibility` to one of:

- `ENTERPRISE_DISPLAY_NAME_VISIBLE` - the enterprise name is shown on the device (now the default)
- `ENTERPRISE_DISPLAY_NAME_NOT_VISIBLE` - the enterprise name is hidden

If the enterprise name shown is incorrect or undesirable, the display name itself is configured at the enterprise level during bind setup and can be updated through the AMAPI `enterprises.patch` method. This will require a support ticket to your EMM vendor.

### Which devices are affected?

This applies to company-owned devices (fully managed and COPE) managed through AMAPI-based EMMs. Personally-owned work profile devices are not affected.
