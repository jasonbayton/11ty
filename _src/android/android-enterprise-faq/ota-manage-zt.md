---
title: "Can a device be OTA managed from the zero-touch console?"
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
  key: "Can a device be OTA managed from the zero-touch console?"
  order: 43000
---
No. The zero-touch portal is a provisioning tool, not a management console. It delivers the DPC config with its extras to the device during the setup wizard, then plays no further role until the device is factory reset. Ongoing device management - policies, app deployment, compliance, updates, lock/wipe, reporting - all sits with an EMM.

## What the zero-touch portal actually does

The portal (and its [customer API](https://developers.google.com/zero-touch/reference/customer/rest)) is scoped to pre-provisioning activities only:

- Claim and unclaim device ownership from a reseller
- Create and assign configurations (DPC package name, enrolment token, server URL, contact details, company name, custom message)
- Set a [default configuration](/android/android-enterprise-faq/set-zt-default-configuration/) so newly added devices auto-assign
- Bulk import/update devices via CSV or API
- Manage portal user access within the customer account

Once a device completes the setup wizard and the DPC takes ownership, the zero-touch servers have no further communication with the device. There is no channel back to the portal to push configuration changes, apps, or commands. Devices do not "check in" to zero-touch.
