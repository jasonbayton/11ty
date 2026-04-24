---
title: 'Is it possible to “retire” (or enterprise wipe) a fully managed device?'
published: '2019-04-26'
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
  key: 'Is it possible to “retire” (or enterprise wipe) a fully managed device?'
  order: 23000
sources:
  - https://developers.google.com/android/management/reference/rest/v1/enterprises.devices/delete
  - https://developers.google.com/android/management/deprovision-device
  - https://developer.android.com/reference/android/app/admin/DevicePolicyManager#wipeData(int)
---
No. On a fully managed device, both an enterprise wipe/retire and a full wipe result in a factory reset. The entire device is under management with no separation between corporate and personal data, so there is nothing to selectively remove.

Android Enterprise requires a DPC actively enrolled as Device Owner to provide management policies. Removing the DPC means removing everything, and the device resets to factory settings.

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">EMM terminology varies</div>

EMMs use different labels for the same underlying action. "Retire", "enterprise wipe", "selective wipe", "delete device", and "unenrol" may all trigger a factory reset on a fully managed device. Always verify what the action does in your specific EMM before running it on a production device.

</div>

## What about COPE and work profile devices?

The behaviour is different for other deployment scenarios:

- **Work profile (BYOD)**: Removing management deletes only the work profile. Personal apps, data, and accounts are completely unaffected. This is the closest Android Enterprise gets to a true selective wipe. See [what happens when the work profile is removed](/android/android-enterprise-faq/what-happens-when-work-profile-removed/) for full details.
- **COPE (Android 11+)**: The EMM can remove just the work profile (preserving personal data), issue a full factory reset, or - with AMAPI - use the `RELINQUISH_OWNERSHIP` command to convert the device to an unmanaged personal device while preserving personal data. This is useful for device hand-off at the end of a hardware refresh cycle.
- **COPE (Android 8-10)**: The older architecture treated COPE as a fully managed device with a work profile on top. Removing management factory resets the device, same as fully managed.

## eSIM considerations

On Android 16+, managed eSIM profiles are automatically wiped when a work profile is removed from a personally-owned device, regardless of any wipe flags set. On company-owned devices, the `WIPE_ESIMS` flag can be used to control whether eSIM profiles are wiped during a factory reset.

If the organisation provisions eSIMs through the EMM, factor this into the retirement process - particularly if the eSIM contract is separate from the device lifecycle.

## Before you wipe

- **Check for [zero-touch](/android/what-is-android-zero-touch-enrolment/) or KME registration.** A factory-reset device that is still registered with zero-touch or KME will re-enrol automatically on next setup. Remove the device from the provisioning portal first if the intention is to fully decommission it.
- **Consider [factory reset protection (FRP)](/android/android-enterprise-faq/frp-vs-enterprise-frp/).** After a factory reset, FRP may require the previously signed-in Google account - or an admin-specified EFRP account - to complete device setup. If the managed account used during enrolment has been deleted, recovery can be difficult. Configure Enterprise FRP proactively, especially on Android 15+ where OEM unlocking no longer bypasses FRP.
- **Communicate with the user.** If the device has any personal data on it (even on a fully managed device where an employee has been using personal apps), give the user time to back up anything important before wiping.

