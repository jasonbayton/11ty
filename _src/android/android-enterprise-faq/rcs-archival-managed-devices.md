---
title: "What is RCS archival, and which devices support it?"
published: '2026-06-26'
status: publish
author: 'Jason Bayton'
excerpt: "RCS archival lets third-party compliance apps capture RCS, SMS, and MMS messages on fully managed devices. Here is how it works and which devices support it."
type: documentation
tags:
    - FAQ
categories:
    - Fully managed
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 23500
sources:
  - https://blog.google/products/android-enterprise/rcs-archival/
  - https://developer.android.com/work/dpc/rcs-messages-archival
  - https://bayton.org/blog/2025/12/rcs-archival-clarifications/
  - https://www.androidenterprise.community/blog/news/product-update-rcs-archival-is-now-available-on-managed-android-devices/13539
---
RCS archival is an Android Enterprise feature that allows third-party archival apps to capture RCS, SMS, and MMS messages on fully managed devices for compliance purposes. It is designed for regulated industries - financial services, legal, government - where message retention is a legal requirement.

### How it works

When an IT administrator enables RCS archival on a fully managed device:

1. A partner archival app (such as CellTrust, Smarsh, or 3rd Eye) integrates with Google Messages
2. When a message is sent, received, edited, or deleted, the archival app is notified
3. The app reads the message data on the device and stores it for the organisation's compliance records
4. End-to-end encryption in transit is maintained - capture happens after decryption on the device, not by intercepting messages in transit

This approach mirrors how enterprise email archival has worked for years: the message is captured at the endpoint, not broken open en route.

### Which devices support it?

RCS archival is available **only on fully managed devices**. It does not work on:

- Personally-owned devices with a work profile (BYOD)
- Company-owned devices with a work profile (COPE)
- Any device that is not enrolled as fully managed

Google Messages must be the default messaging app on the device. Administrators can enforce this via AMAPI's default application management.

### What it does not do

RCS archival does not give employers access to personal messages on personal devices. It does not bypass encryption. It does not enable real-time monitoring or surveillance of messaging activity. The feature is scoped to company-owned, fully managed devices where the organisation has legitimate compliance obligations.

### Getting started

To implement RCS archival, organisations need:

- Fully managed Android devices running a supported version of Google Messages
- An approved archival partner app configured and deployed via the EMM
- AMAPI or custom DPC policies to set Google Messages as the default messaging app

For a detailed breakdown of the misconceptions around RCS archival, see [RCS Archival and you: clearing up the misconceptions](/blog/2025/12/rcs-archival-clarifications/).
