---
title: "Does Samsung support zero-touch?"
published: '2019-04-26'
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
  key: "Does Samsung support zero-touch?"
  order: 50000
---
As of [late 2020](/2020/11/google-announce-big-changes-to-zero-touch/), yes. Samsung devices running Android 9.0 or later support Google zero-touch enrolment alongside Samsung's own Knox Mobile Enrolment (KME) service.

### Zero-touch vs KME

Both achieve the same outcome - a device that enrols into the organisation's EMM without manual intervention at first boot. The differences are in features and scope:

**Zero-touch** is OEM-agnostic and managed through the [zero-touch portal](/android/what-is-android-zero-touch-enrolment/). For organisations with mixed-OEM fleets, it provides a single provisioning workflow across Samsung, Pixel, and other supported devices.

**KME** is Samsung-specific and has been available longer for Android Enterprise provisioning (since Knox 2.8). It offers additional capabilities over zero-touch, including:

- **Re-enrolment persistence** - if a user factory resets or uninstalls the EMM agent, KME will automatically re-initiate enrolment on the next boot
- **QR code provisioning without pre-configured network access** - KME QR codes can embed Wi-Fi credentials, so the device connects automatically during setup without manual network configuration. The device still needs internet connectivity to complete enrolment, but the setup step is simplified
- **On-premises deployment** via KME Direct for environments without internet access
- **Greater setup wizard control** - customisation of the provisioning UX

KME is free to use, though some optional advanced settings require a Knox Suite licence. Devices must be purchased through a KME-supported reseller to be registered in the KME portal.

### Which should I use?

For a Samsung-only fleet, KME is the more feature-rich option. For mixed-OEM fleets, zero-touch provides consistency. Both support fully managed, dedicated, and COPE deployments. Zero-touch provisions company-owned devices only - it does not support personally-owned (BYOD) work profile enrolment. KME supports work profile enrolment for both company-owned and BYOD scenarios.

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">Do not use both on the same device</div>

Configuring both KME and zero-touch on the same Samsung device is not supported. It can cause configuration conflicts and out-of-sync states that are difficult to debug. Pick one method per device.

</div>

For more on Samsung's broader enterprise capabilities, see [Does Samsung support Android Enterprise?](/android/android-enterprise-faq/does-samsung-support-android-enterprise/).

