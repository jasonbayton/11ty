---
title: "Can I set Device Owner without a factory reset?"
published: '2026-03-22'
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
  order: 46000
sources:
  - https://androidenterprise.community/discussions/conversations/how-to-set-device-owner-on-company-owned-android-device-without-factory-reset/11662
  - https://developer.android.com/work/dpc/build-dpc
---
No, not on a device that has already been set up with user accounts.

Setting a device as fully managed (Device Owner mode) is only possible during the initial device setup, before any accounts are added. This is by design - Android enforces this restriction to prevent a management agent from silently taking control of a device that a user has already configured.

There are limited exceptions:

- **ADB command** (`dpm set-device-owner`): This can set Device Owner on a device that has been set up but has no Google accounts or secondary users present. However, this is a development and testing tool, not a production deployment method. It also requires USB debugging to be enabled and is not practical at scale. It cannot be used with AMAPI.

- **DPC migration**: If a device is already managed by one DPC, it may be possible to migrate to another DPC or to AMAPI without a factory reset, depending on vendor support. See [Can I migrate devices from a custom DPC to AMAPI?](/android/android-enterprise-faq/dpc-to-amapi-migration/) for details.

For production deployments, the supported methods all begin from a factory reset state: QR code, zero-touch, KME, NFC, DPC identifier, or managed Google account provisioning. See [How can I provision a fully managed device?](/android/android-enterprise-faq/provision-fully-managed-device/) for the full list.
