---
title: "How do app updates work in managed Google Play?"
published: '2026-06-28'
status: publish
author: 'Jason Bayton'
excerpt: "An overview of how managed Google Play handles app updates on enterprise-managed devices - timing, constraints, update modes, and what administrators can control."
type: documentation
tags:
    - FAQ
categories:
    - App management
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 68500
sources:
  - https://developers.google.com/android/management/control-app-updates
  - https://support.google.com/work/android/answer/9350374
  - https://developers.google.com/android/work/play/emm-api/update
---
App updates on managed Android devices follow the same fundamental mechanism as unmanaged devices, but administrators have additional controls over timing and behaviour.

**How updates are detected**

Google Play checks for available app updates approximately once per day. When an update is found, it is added to a queue. The update then installs the next time all of the default constraints are met simultaneously:

- The device is connected to Wi-Fi
- The device is charging
- The device is idle (not actively in use)
- The app being updated is not running in the foreground

Because of the daily check interval, it can take up to 24 hours for a newly published update to be detected, and then additional time for the constraints to align. In practice, most updates install within a few hours to a day under normal conditions.

The system may relax the idle, charging, and battery constraints if they are not met within a reasonable time frame. Network constraints are also relaxed for certain system packages such as Google Play Services and Mainline modules.

**Update modes**

Administrators can override the default update behaviour on a per-app basis using the auto-update mode policy. This applies identically regardless of whether the app is force-installed or set to available.

**Default** - updates follow the standard daily check and constraint logic described above. This is the behaviour when no mode is explicitly set.

**High priority** - the app updates as soon as a new version is published and reviewed by Google Play, rather than waiting for the normal daily queue and constraints. If the device is offline, the update installs upon reconnection. For apps with very large install bases, even high priority updates may still take up to 24 hours to propagate. If the app is in use when the update is ready, the system force-closes it to complete the install, which may disrupt users. The exception is kiosk (lock task) mode: a pinned app cannot be force-closed, so a high priority update to the kiosk app itself only installs once the app is allowed to close, which in practice means within an update window or on reboot.

**Postpone** - automatic updates are paused for 90 days from the point the app first becomes out of date, meaning the first time a newer version exists that the device has not installed. The 90-day clock is not reset by any further versions the developer publishes during that window; those simply queue up behind the postponement. After 90 days, the latest available version installs automatically using default mode behaviour, and only then does a new 90-day window begin the next time the app becomes out of date again. Users can still manually update the app through the Play Store during the postponement period.

**Systen update windows**

Separately from per-app update modes, administrators can define a daily system update window (best practice around 4 hours) during which the charging, idle, and foreground constraints are ignored for app updates. This allows updates to install during a predictable time slot even if the device is in active use, not charging, or has the app open.

In AMAPI, the maintenance window is configured through the system update policy - setting a windowed system update policy automatically applies that same window to Play app updates. Network constraints remain in effect even during a maintenance window.

It can take up to up to a day for a newly configured maintenance window to take effect on devices.

The maintenance window does not apply to apps in high priority or postpone mode. A high priority app updates immediately and force-closes itself if it is in the foreground, so it does not wait for the window. Postpone apps are not updating at all during the postponement period, so the window has no effect on them. The practical exception is a kiosk (lock task) app updating itself: because it cannot be force-closed, the update only lands when the app is allowed to close, which in a kiosk deployment typically means within an update window or on reboot.

**Install types**

All install types follow the same update rules. The install type controls whether the app is automatically installed on the device and whether the user can remove it - it does not change how updates are delivered or timed.

**Common observations**

- **Updates seem slow** - the daily check interval and constraint requirements mean updates rarely install instantly. If timing is critical, use high priority mode
- **Updates on dedicated devices** - kiosk devices that are always in use and rarely connected to Wi-Fi or charging may experience significant delays with default mode. The kiosk app itself is pinned in the foreground and cannot be force-closed, so high priority mode will not update it on its own; an update window, which relaxes the foreground constraint, is the reliable way to keep it current. High priority mode still helps for other apps on the device that are not pinned in the foreground
- **Work profile apps share APKs with the personal profile** - if the same app is installed in both the personal and work profiles, only one copy of the APK exists on the device. When the app updates, it updates for both profiles simultaneously. This cannot be controlled independently
- **Google Play Store and Google Play Services are exempt** - these system components update outside of the standard app update flow and cannot be postponed by administrators

For controls around delaying or holding app versions, see [Can I pin a specific OS or app version?](/android/android-enterprise-faq/os-app-version-pinning/). For troubleshooting apps that are stuck downloading, see [Why are managed Google Play apps stuck on pending?](/android/android-enterprise-faq/managed-play-apps-stuck-pending/).
