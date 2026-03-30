---
title: "Are employee-owned devices eligible for zero-touch?"
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
  key: "Are employee-owned devices eligible for zero-touch?"
  order: 60000
sources:
  - https://support.google.com/work/android/answer/7514005
  - https://developers.google.com/zero-touch/guides/overview
  - https://developers.google.com/android/management/provision-device
---
No. Zero-touch enrolment is exclusively for company-owned devices purchased through an [authorised zero-touch reseller](/android/what-is-android-zero-touch-enrolment/).

### Why the restriction?

The zero-touch process works like this: when an organisation buys devices from a participating reseller, the reseller registers those devices (by IMEI or serial number) in the organisation's [zero-touch portal](https://partner.android.com/zerotouch). This registration is what triggers automatic enrolment when the device is first powered on or factory reset.

Organisations cannot add devices to the zero-touch portal themselves - only resellers can claim devices into a customer account. There is no self-service mechanism to register arbitrary devices by IMEI. The [customer API](https://developers.google.com/zero-touch/reference/customer/rest) allows managing configurations on devices already assigned by resellers, but it cannot add new devices.

### Supported deployment scenarios

Zero-touch supports company-owned deployment modes only:

- **Fully managed** (complete corporate control, no personal space)
- **Dedicated** (kiosk/single-use)
- **COPE** (company-owned with a work profile for personal use)

It does **not** support personally-owned work profile (BYOD) enrolment. While zero-touch can deploy a work profile, this is only the company-owned variant (COPE) - not the same as a personal device with a work profile.

### BYOD alternatives

For enrolling employee-owned devices with a work profile, there are several provisioning methods that do not require reseller involvement:

- **Enrolment token link** - a URL the employee opens on their device to begin setup
- **QR code** - the employee scans a code from their device settings or the Android Device Policy app
- **Sign-in URL** - a custom web page where the employee authenticates before provisioning starts
- **Direct download** - the employee installs Android Device Policy from Google Play and enters/scans an enrolment token

All of these work for personally-owned work profile deployments. For more detail, see the [provisioning methods guide](/android/android-enterprise-provisioning-methods/).

### What about Samsung KME?

Samsung's Knox Mobile Enrolment follows a similar model - devices generally need to be purchased through a KME-participating reseller. However, KME supports work profile deployments for both company-owned and BYOD scenarios, and offers a QR code enrolment option for devices not registered by a reseller. See [Does Samsung support zero-touch?](/android/android-enterprise-faq/samsung-zero-touch/) for a full comparison.

### What if an employee buys a device that is already registered?

If someone purchases a second-hand device that is still registered in another organisation's zero-touch portal, the device will display a "Your device at work" screen on first boot or after factory reset. The new owner cannot remove the registration themselves - they need to contact the previous organisation (whose details may be shown on screen) and ask them to unclaim the device from their zero-touch portal.

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">Buying second-hand devices</div>

This is an increasingly common issue with the second-hand device market. Before purchasing used Android devices, it is worth verifying that the device has been deregistered from any zero-touch or KME portals. Unlike [Factory Reset Protection](/android/feature-spotlight-factory-reset-protection/), which is tied to a Google account and can be cleared with the correct credentials, zero-touch registration can only be removed by the organisation or reseller that registered it.

</div>

