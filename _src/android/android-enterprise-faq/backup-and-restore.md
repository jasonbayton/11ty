---
title: "Is it possible to backup & restore device data on a fully managed device?"
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
  order: 62000
sources:
  - https://developer.android.com/reference/android/app/admin/DevicePolicyManager#setBackupServiceEnabled(android.content.ComponentName,boolean)
  - https://support.google.com/work/android/answer/16713206
  - https://support.google.com/work/android/answer/10384040
--- 
Not by default. The Android backup service is disabled on fully managed devices, and AMAPI does not yet expose a policy field to control it.

## Custom DPC

Custom DPC implementations can enable backup using [`DevicePolicyManager.setBackupServiceEnabled()`](https://developer.android.com/reference/android/app/admin/DevicePolicyManager#setBackupServiceEnabled(android.content.ComponentName,boolean)), available since Android 8.0. A device owner calling this method controls the backup service across all users on the device. By default the backup service is disabled on devices with a device owner.

When enabled, users can transfer data to a new fully managed device using the [Android Switch](https://support.google.com/work/android/answer/16713206) application - including texts, photos, contacts, calendars, and apps. The destination device must use the same managed Google account and be managed by the same EMM.

If your EMM is custom DPC-based, check whether it exposes this setting. Not all platforms surface it in their console.

## AMAPI

AMAPI does not currently include a backup policy field. The underlying platform API exists, but Android Device Policy does not expose it through the AMAPI REST API, so AMAPI-based EMMs cannot enable backup through the standard policy mechanism.

AMAPI does log a `BackupServiceToggledEvent` in security logs (added April 2025), which records when the backup service state changes - but this is an audit event, not a policy control.

This remains one of the functional gaps between custom DPC and AMAPI. Custom DPC vendors that have implemented `setBackupServiceEnabled()` have a meaningful advantage for organisations that need device data transfer during hardware refreshes or migrations.

## Work profile

For work profile deployments (both BYOD and COPE), a profile owner can also call `setBackupServiceEnabled()` to control backup within the managed profile specifically. However, on a device with both a device owner and a profile owner, backup for the managed profile is only enabled if **both** the device owner and the profile owner have enabled it.

## Practical advice

Regardless of whether backup is available, the organisation should provide end users with a cloud service - OneDrive, Google Drive, Dropbox, or similar - to which data is automatically synced. Device-level backup is useful for device transfer and recovery, but it is not a substitute for continuous cloud sync of critical data.

For organisations planning a migration between EMMs, backup and restore is particularly relevant. See the [EMM migration guide](/android/android-enterprise-emm-migration-guide/) for guidance on data preservation during cross-vendor moves.