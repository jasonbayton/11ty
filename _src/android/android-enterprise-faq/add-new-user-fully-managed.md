---
title: "Can I add/remove users on a fully managed device?"
published: '2024-11-11'
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
  order: 40000
sources:
  - https://developers.google.com/android/management/reference/rest/v1/enterprises.policies
  - https://developer.android.com/work/dpc/dedicated-devices/multiple-users
  - https://developer.android.com/reference/android/app/admin/DevicePolicyManager#createAndManageUser(android.content.ComponentName,java.lang.String,android.content.ComponentName,android.os.PersistableBundle,int)
---
Not through the device UI, no. On a fully managed device, end users are always blocked from adding or removing OS-level users regardless of policy configuration.

Whether the EMM can do it programmatically depends on the management architecture in use.

### AMAPI

AMAPI does not support secondary user management at all. While the policy schema includes `addUserDisabled` and `removeUserDisabled` fields, the [documentation](https://developers.google.com/android/management/reference/rest/v1/enterprises.policies) explicitly states that for devices where `managementMode` is `DEVICE_OWNER`, the user is never allowed to add or remove users. There is no API for the EMM to create, remove, or switch between OS-level users either.

### Custom DPC

A custom DPC operating as Device Owner has significantly more capability here. Android's [DevicePolicyManager](https://developer.android.com/reference/android/app/admin/DevicePolicyManager) exposes several user management APIs:

- `createAndManageUser()` - create secondary users programmatically (Android 7.0+)
- `removeUser()` - remove secondary users (Android 5.0+)
- `switchUser()` - switch the active user on the device (Android 7.0+)
- `startUserInBackground()` / `stopUser()` - manage user sessions without switching (Android 9.0+)

This is one of the remaining capability gaps between AMAPI and custom DPC. If your organisation relies on multi-user device scenarios, check whether your EMM exposes these APIs.

### Ephemeral users on dedicated devices

A common use case for secondary users is shared devices - kiosks, shift terminals, or front-of-house equipment. Custom DPCs can create **ephemeral users** (using the `MAKE_USER_EPHEMERAL` flag on `createAndManageUser()`), where all user data and apps are automatically deleted when the user session ends, the device switches users, or the device reboots. This requires Android 9.0+ and is documented in detail in Google's [dedicated devices guide](https://developer.android.com/work/dpc/dedicated-devices/multiple-users).

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">Multi-user support varies by device</div>

Not all Android devices support multiple OS-level users, even if the Android version does. This is a hardware and OEM decision. Before planning a multi-user deployment, verify that the target devices support secondary users - the DevicePolicyManager API will return specific error codes if the device has reached its user limit or does not support the feature.
