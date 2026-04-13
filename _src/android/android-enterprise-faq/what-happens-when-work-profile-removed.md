---
title: "What happens to my data when the work profile is removed?"
published: '2026-03-22'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - FAQ
categories:
    - Work profile
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 17500
---

When a work profile is removed - whether by the admin, the user, or an automated compliance action - everything inside the work profile is deleted. Everything outside it is left untouched.

### What is deleted

- All apps installed within the work profile
- All app data within those apps (emails, files, cached data, databases)
- The managed Google Play account (or managed Google account) associated with the work profile
- Work contacts, work call logs, and work calendar entries
- Files and downloads stored within the work profile's isolated storage
- All policies and configurations set by the EMM
- On Android 16+, managed eSIM profiles on personally-owned devices are [always wiped](/android/android-enterprise-faq/manage-esim/) when the work profile is removed

### What is preserved

- All personal apps and personal app data
- Personal photos, files, and downloads
- Personal Google account(s) and their data
- Personal contacts, call logs, and messages

### COPE devices (company-owned)

On **Android 11+** COPE devices, removing the work profile works the same as BYOD - work data is deleted, personal data survives, and the device transitions to an unmanaged personal device.

On **Android 8-10** COPE (legacy WPoFMD), the behaviour was different. Removing the device owner triggered a factory reset, wiping everything. Removing only the work profile while the device owner remained intact left the device in a partially managed state, which most EMMs handled by forcing a full wipe.

### What can trigger work profile removal?

- **Admin-initiated remote wipe**: The EMM admin issues a corporate wipe command. Only the work profile is removed on BYOD and Android 11+ COPE.
- **User-initiated removal**: Users can delete their own work profile from device settings. On company-owned devices, this may be restricted or show a message directing the user to contact IT.
- **Compliance enforcement**: If the device remains non-compliant with policy (password, encryption, patch level), the EMM may automatically remove the work profile. For AMAPI-based EMMs, the default is to remove the work profile after 10 days of non-compliance, though this is configurable.
- **Account invalidation**: If the managed account associated with the work profile is revoked or becomes invalid server-side, the work profile will eventually stop functioning and may be removed.

### Fully managed devices

On fully managed devices (no work profile), a wipe command or unenrolment triggers a **full factory reset**. All data on the device is erased. There is no personal/work separation to preserve.
