---
title: "Can a MADA device be converted to EDLA?"
published: '2023-07-24'
status: publish
author: 'Jason Bayton'
excerpt: "Whether a GMS-certified (MADA) Android device can be converted to EDLA, and what options exist for manufacturers needing to switch."
categories:
    - General
type: documentation
tags:
    - FAQ
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 48000
sources:
  - https://bayton.org/android/android-enterprise-faq/gms-vs-edla-enterprise/
---
No. There is no in-field conversion path from MADA (GMS/Play Protect certified) to EDLA.

Google offered a grace period when the EDLA licence was introduced, allowing some manufacturers to transition existing MADA-certified devices. That window has long since closed.

## What this means in practice

A device certified under MADA cannot have its certification type changed to EDLA through a software update, a firmware change, or a configuration adjustment. The certification type is determined at the time of certification and tied to the device's CTS/GTS test results, the licence agreement the manufacturer signed, and the Google apps and services bundled with the device.

If a manufacturer needs a device to operate under EDLA instead of MADA, the device (or a new SKU of it) must go through the EDLA certification process from the start. This includes:

- Signing the EDLA agreement with Google
- Submitting the device build for CTS/GTS testing under EDLA requirements
- Supporting both SKUs (MADA and EDLA) for the licence period if more than 1,000 units of the MADA SKU are in the market

## Why organisations ask this question

The question typically comes up in two scenarios:

**Dedicated device deployments.** An organisation has purchased standard MADA-certified tablets or handhelds for use as kiosks, signage, or single-purpose terminals. They discover that EDLA devices would be more appropriate for the use case - fewer preloaded consumer apps, a form factor better suited to the deployment, or a certification requirement from their industry. The answer is that the existing devices remain MADA-certified and will function perfectly well for enterprise management. MADA devices support all Android Enterprise deployment scenarios including dedicated device (kiosk) mode. EDLA is a more appropriate starting point for future procurement, not a retroactive fix.

**Device manufacturer planning.** A manufacturer that initially certified a device under MADA wants to reposition it for the enterprise or dedicated-device market. The manufacturer must certify a new build or SKU under EDLA - the existing MADA certification cannot be converted.

## What to do instead

- If the device is already deployed and working, continue using it. MADA-certified devices support the full range of Android Enterprise management features.
- For future dedicated device purchases, specify EDLA-certified hardware from the outset. Speak to the device manufacturer or a specialist enterprise device vendor.
- See [What is the difference between GMS and EDLA certification for enterprise?](/android/android-enterprise-faq/gms-vs-edla-enterprise/) for a full comparison.
