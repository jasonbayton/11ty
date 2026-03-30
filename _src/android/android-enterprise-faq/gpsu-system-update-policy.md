---
title: "Are Google Play System Updates managed by Android Enterprise system update policies?"
published: '2026-03-28'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - FAQ
categories:
    - General
    - Fully managed
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 67000
sources:
  - https://support.google.com/work/android/answer/13791272
  - https://developer.android.com/work/dpc/system-updates
  - https://bayton.org/android/gpsu-system-update/
target_file: _src/android/android-enterprise-faq/gpsu-system-update-policy.md
---
No. As of early 2024, Google Play System Updates (Mainline modules) are no longer controlled by Android Enterprise system update policies.

Previously, the system update policy applied to both OTA system updates and Google Play System Updates. This is no longer the case - Mainline updates now download automatically in the background and install on the next device reboot, regardless of any configured system update policy, freeze period, or maintenance window.

This means:

- **Freeze periods do not apply** to Mainline updates. Even during a configured freeze window, GPSU updates will continue to install
- **Maintenance windows are ignored** for Mainline update installation
- **Postpone policies have no effect** on when Mainline updates are applied
- The device behaves like an unmanaged device specifically for Mainline updates

Administrators can still use compliance policies to **check** that devices have current Mainline modules installed, but cannot directly **control** the timing of their installation.

OTA system updates (full Android version upgrades and monthly security patches) continue to respect system update policies as before.

For more details, see [Google Play System Updates and Android Enterprise](/android/gpsu-system-update/).
