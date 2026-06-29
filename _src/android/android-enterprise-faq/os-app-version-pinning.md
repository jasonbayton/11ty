---
title: 'Can I pin a specific OS or app version on managed devices?'
published: '2026-06-26'
status: publish
author: 'Jason Bayton'
excerpt: "Android Enterprise can delay OS and app updates but cannot pin a device or app to a specific version. Here are the controls that exist and their limits."
type: documentation
tags:
    - FAQ
categories:
    - General
    - Fully managed
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 43600
sources:
  - https://developer.android.com/work/dpc/system-updates
  - https://developers.google.com/android/management/control-app-updates
  - https://support.google.com/work/android/answer/9350374
  - https://www.androidenterprise.community/android-enterprise-general-discussions-3/survey-os-app-version-pinning-part-1-2465
---

No. Android Enterprise does not currently support pinning a device to a specific OS version or holding an app at a specific version. The available controls delay updates, but all updates eventually install.

## OS update controls

Device owners (fully managed and dedicated devices) have three options:

- **Postpone** - delays each update for up to 30 days, after which the device prompts the user to install. Only one 30-day postponement per update
- **Windowed** - installs updates during a daily maintenance window
- **Automatic** - installs updates immediately

Freeze periods can suspend all OS updates for up to 90 days, with a mandatory 60-day gap between periods. This is the longest an organisation can hold a device on a specific OS version. Once the freeze expires, pending updates install.

Work profile (BYOD) devices are controlled by the end user. The organisation cannot set system update policies on personally-owned devices.

Google Play System Updates (Mainline modules) ignore all of these controls and install automatically regardless of any configured policy or freeze period. See [Are GPSU managed by system update policies?](/android/android-enterprise-faq/gpsu-system-update-policy/)

## App update controls

For a full explanation of how app updates are detected, queued, and installed, see [How do app updates work in managed Google Play?](/android/android-enterprise-faq/how-do-app-updates-work/)

App updates offer similar delay-only controls:

- **Postpone** - pauses app updates for up to 90 days, after which the latest version installs automatically
- **High priority** - forces updates as soon as a new version is published (within approximately 24 hours)
- **Minimum version code** - forces an update to at least a specified version, but cannot hold an app at that version if a newer one is published

You cannot install or hold a specific older app version through Managed Google Play. Only the latest available version can be installed. Google Play Store and Google Play Services updates cannot be paused at all.

On work profile devices, apps update simultaneously across both personal and work profiles since only one copy of the APK exists on the device.

## What about version pinning and rollbacks?

Google is actively surveying the Android Enterprise community (April 2026) about demand for OS and app version pinning, including capabilities like targeting a specific major version, specifying a minimum security patch level, pinning exact app versions, and rolling back problematic updates. This suggests these features are under consideration but not yet available.

Until pinning is available, the practical approach is:

- Use freeze periods strategically around critical business periods or new OS releases
- Test new OS versions with a pilot device group before allowing fleet-wide updates
- Work with app developers to ensure backward compatibility and timely updates
- Monitor Google Play System Update rollback tools for recovering from problematic Mainline updates

For broader guidance on managing major OS updates, see [What happens when a managed device receives a major Android update?](/android/android-enterprise-faq/major-os-update-managed-device/)
