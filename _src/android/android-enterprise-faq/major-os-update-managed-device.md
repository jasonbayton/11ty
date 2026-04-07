---
title: "What happens when a managed device receives a major Android update?"
published: '2026-04-07'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - FAQ
categories:
    - General
    - Fully managed
    - Work profile
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 43000
sources:
  - https://developer.android.com/work/dpc/system-updates
  - https://source.android.com/docs/devices/admin/ota-updates
  - https://developer.android.com/work/versions
---
A major Android OS update (such as Android 15 to 16) delivered via OTA is not a factory reset - device management state, profiles, apps, and data all persist through the upgrade. There is no re-enrolment required.

### What survives

- **Device owner / profile owner registration** - the DPC remains registered as device or profile owner after the reboot into the new OS version
- **Work profile** - the profile, its apps, and all work data remain intact
- **Policies** - enterprise policies continue to apply. The device syncs with the EMM on next check-in and re-applies the current policy set
- **Managed configurations** - app-level managed configs are retained and continue to be served by the RestrictionsManager
- **App data** - both personal and work app data persist, just as with any OTA update
- **Zero-touch / KME registration** - cloud enrolment registrations are unaffected by OTA updates, as these are server-side records

### What to watch out for

Major version updates can introduce behavioural changes that affect managed devices, even without a re-enrolment:

- **Deprecated APIs and policy changes** - each Android version may deprecate or change the behaviour of management APIs. For example, Android 11 fundamentally changed the COPE model, automatically migrating legacy COPE devices to the new work profile on company-owned device experience during the upgrade. See [Android 11 COPE changes](/android/android-11-cope-changes/) for details
- **App compatibility** - apps targeting older SDK versions may lose functionality or encounter permission changes under a newer OS. Android 14 introduced a minimum targetSdkVersion requirement for app installation, and Android 15/16 raised it further
- **UI and behaviour changes** - Android 15 introduced edge-to-edge enforcement for apps targeting API 35, and Android 16 extends this with large screen layout changes. Kiosk and dedicated device apps are particularly affected. See [edge-to-edge FAQ](/android/android-enterprise-faq/edge-to-edge-dedicated-devices/)
- **OEM-specific bugs** - major OS updates from OEMs occasionally introduce enterprise-related issues. Samsung devices have historically seen zero-touch enrolment failures and work profile issues following major updates
- **Sticky configurations** - in some Android versions, certain configurations have been observed to become permanently applied after a reboot, making them unchangeable without re-enrolment. This was notably documented on Android 14

### How to prepare

- **Use system update policies** - device owners can set automatic, windowed, or postpone policies to control when OTA updates install. Postponement provides up to 30 days per update for testing. See [managing system updates](/android/android-enterprise-faq/gpsu-system-update-policy/) for more on what these policies control
- **Use freeze periods** - on Android 9+, freeze periods can suspend all system updates for up to 90 days, giving time to validate compatibility with business-critical apps. A 60-day gap between freeze periods is required
- **Test with a pilot group** - enrol test devices on the new OS version before allowing the update across the wider fleet. Most EMMs support phased rollout by device group
- **Review version-specific changes** - Google publishes enterprise-specific changes for each Android version at [What's new for Android in the enterprise](https://developer.android.com/work/versions). Check for deprecations, new restrictions, and behavioural changes that may affect deployed policies or apps
- **Monitor OEMConfig compatibility** - OEMConfig apps may need updates to support new OS versions. Check with the device manufacturer for updated OEMConfig releases ahead of major OS rollouts

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">Note on Google Play System Updates</div>

Google Play System Updates (Mainline modules) are no longer controlled by system update policies. They install automatically regardless of configured freeze periods or maintenance windows. Only traditional OTA updates (OS version upgrades and monthly security patches) respect system update policies. See <a href="/android/android-enterprise-faq/gpsu-system-update-policy/">Are GPSU managed by system update policies?</a>

</div>

System update policies apply only to fully managed and dedicated devices. For work profile (BYOD) deployments, the device owner is the end user, and the organisation has no control over when OS updates are installed.
