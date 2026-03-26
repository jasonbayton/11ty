---
title: "How do I set up zero-touch enrollment when my device reseller is not a zero-touch partner?"
published: '2026-03-26'
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
  order: 56500
sources:
  - https://androidenterprise.community/android-enterprise-general-discussions-3
  - https://www.android.com/enterprise/management/zero-touch/
---
Zero-touch enrollment requires devices to be registered in the zero-touch portal by an authorised reseller. If your device supplier is not a zero-touch partner, you have a few options:

**1. Purchase from a zero-touch partner reseller**

The most straightforward approach. Google maintains a directory of authorised zero-touch resellers at [androidenterprisepartners.withgoogle.com](https://androidenterprisepartners.withgoogle.com/resellers/). Many major distributors and carriers are partners. Switching to a partner reseller for future purchases ensures devices arrive pre-registered.

**2. Request your reseller joins the programme**

Resellers can apply to become zero-touch partners through Google's partner programme. If your preferred supplier has sufficient volume and interest, this may be worthwhile, though the onboarding process takes time.

**3. Use Samsung Knox Mobile Enrollment (KME) for Samsung devices**

Samsung KME is Samsung's equivalent to zero-touch and does not require a specific reseller partnership, though it works better with one. Any Samsung device can be added to KME by the organisation directly using the device IMEI or serial number. This is often the practical alternative for organisations purchasing Samsung devices from non-partner suppliers.

**4. Use QR code or sign-in URL provisioning as an alternative**

If automated enrollment through zero-touch is not available, QR code or Google account provisioning provides a manual but reliable enrollment path. These methods do not require reseller involvement and can be configured entirely within the EMM.

**What about adding previously purchased devices?**

Devices already purchased from a non-partner reseller cannot be retroactively added to the zero-touch portal by the organisation. Only authorised resellers can register devices. See the related FAQ: [Is it possible for an organisation to add previously-purchased devices to zero-touch?](/android/android-enterprise-faq/add-previously-bought-devices-to-zt/).
