---
title: "What is the difference between GMS and EDLA certification for enterprise?"
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
  order: 4100
sources:
  - https://www.androidenterprise.community/android-enterprise-general-discussions-3/android-enterprise-gms-guidance-needed-2413
  - https://bayton.org/android/android-enterprise-faq/convert-mada-to-edla/
---
When evaluating Android devices for enterprise deployment, two certification types determine the management capabilities available: GMS (through the MADA agreement) and EDLA.

### GMS (Google Mobile Services) - MADA certified

GMS certification is the standard certification for consumer smartphones and tablets. Devices certified under the MADA (Mobile Application Distribution Agreement) include the full suite of Google apps and services - Play Store, Chrome, Gmail, Maps, and critically for enterprise, Google Play Protect and Android Enterprise support.

GMS-certified devices are listed on the [Android website](https://android.com/certified/) and typically support all Android Enterprise deployment scenarios: fully managed, work profile, COPE, and dedicated device (kiosk). Android Go, Android TV, WearOS, etc aren't obviously included in this, though Android XR should fall under much of the same mandate when it's ready.

### EDLA (Enterprise Device Licensing Agreement)

EDLA certification is designed for dedicated and enterprise-focused devices that may not suit the typical consumer GMS use case. This includes kiosks, digital signage, ruggedised handhelds, point-of-sale terminals, and other single-purpose devices.

### Which do I need?

- **Standard smartphones and tablets for knowledge workers**: GMS (MADA) certification. These devices will support all management scenarios and provide the full Android experience.
- **Kiosks, signage, ruggedised devices, or other dedicated-use hardware**: EDLA certification is typically more appropriate. The devices are designed for purpose and don't carry unnecessary consumer apps, services, and may be more appropriate in terms of formfactor.
- **AOSP (uncertified) devices**: These have no Google services, no Play Store, and limited Android Enterprise management support. They are not suitable for enterprise management through the Android Management API, but platforms may provide an alternative management framework under AOSP.