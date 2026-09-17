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
  - https://developers.google.com/android/management/reference/rest/v1/enterprises.policies
  - https://support.google.com/work/android/answer/16713206
  - https://support.google.com/work/android/answer/10384040
--- 
Not by default. The Android backup service is disabled on fully managed devices, but administrators can now enable it through both AMAPI and custom DPC.

## Custom DPC

Custom DPC implementations can enable backup using [`DevicePolicyManager.setBackupServiceEnabled()`](https://developer.android.com/reference/android/app/admin/DevicePolicyManager#setBackupServiceEnabled(android.content.ComponentName,boolean)), available since Android 8.0. A device owner calling this method controls the backup service across all users on the device. By default the backup service is disabled on devices with a device owner.

When enabled, users can transfer data to a new fully managed device using the [Android Switch](https://support.google.com/work/android/answer/16713206) application - including texts, photos, contacts, calendars, and apps. The destination device must use the same managed Google account and be managed by the same EMM.

If your EMM is custom DPC-based, check whether it exposes this setting. Not all platforms surface it in their console.

## AMAPI

AMAPI now includes a [`backupService`](https://developers.google.com/android/management/reference/rest/v1/enterprises.policies) field on the policy resource, added in September 2026. This accepts three values:

| Value | Effect |
|-------|--------|
| `BACKUP_SERVICE_STATE_UNSPECIFIED` | No value set (backup remains disabled by default on fully managed devices) |
| `BACKUP_SERVICE_DISABLED` | Backup service is explicitly disabled |
| `BACKUP_SERVICE_ENABLED` | Backup service is enabled |

Setting `BACKUP_SERVICE_ENABLED` allows users to back up and restore device data through the Android backup service, including app data, call history, contacts, device settings, SMS messages, and photos/videos (if opted in). This closes a long-standing functional gap between AMAPI and custom DPC.

AMAPI also logs a `BackupServiceToggledEvent` in security logs (added April 2025), which records when the backup service state changes on a device.

## Work profile

For work profile deployments (both BYOD and COPE), a profile owner can also call `setBackupServiceEnabled()` to control backup within the managed profile specifically. However, on a device with both a device owner and a profile owner, backup for the managed profile is only enabled if **both** the device owner and the profile owner have enabled it.

## Practical advice

Regardless of whether backup is available, the organisation should provide end users with a cloud service - OneDrive, Google Drive, Dropbox, or similar - to which data is automatically synced. Device-level backup is useful for device transfer and recovery, but it is not a substitute for continuous cloud sync of critical data.

For organisations planning a migration between EMMs, backup and restore is particularly relevant. See the [EMM migration guide](/android/android-enterprise-emm-migration-guide/) for guidance on data preservation during cross-vendor moves.