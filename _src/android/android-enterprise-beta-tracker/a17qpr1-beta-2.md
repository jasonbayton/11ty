---
title: 'QPR1 Beta 2 - CP31.260423.012.A1'
parent: 'Android Enterprise build tracker'
published: '2026-05-07'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: ['Android Enterprise build tracker', 'Android', 'aebt-release-notes']
categories: ['Android Enterprise build tracker']
layout: base.njk
eleventyNavigation:
    title: 'Android 17 QPR1 Beta 2'
---

**Track:** QPR1 Beta | **Milestone:** September 2026 stable

Introduces the kiosk user type, device controller role permissions, and assist content policy.

**DPC capabilities**

- **Device controller role expanded** - the device controller role gained permissions for device locking and runtime permission management, giving the controller more capability on shared devices
- **Assist content policy** (provisional) - a new flag for migrating the assist content restriction (controlling what data is shared with assistant apps) to the typed policy engine

**Other enterprise changes**

- **Kiosk user type** - a dedicated `USER_TYPE_FULL_KIOSK` user type appeared, designed specifically for kiosk device management. This mirrors the kiosk app mode available on ChromeOS
- **Backup service security log** - a new security log tag records when the backup service is toggled on or off, improving audit trails
- **Private DNS for profile owners** (provisional) - a new flag for allowing profile owners to set global private DNS, though this feature has had a volatile lifecycle across tracks
- **Retail demo force-remove** (provisional) - a new flag for allowing admin force-removal to skip feature checks in retail demo mode
- **Admin-aware permission summaries** - the permission controller gained strings for showing when a permission is enforced by an admin, improving transparency in the Settings UI
- **Package policy handler refactored** - the per-package policy serialisation was replaced by a more robust typed handler, settling the implementation after changes in Beta 1
- **Watch strong auth timeout** graduated to enabled in this build
- **Legacy provisioning params removed** - the older multi-user provisioning parameter classes and wrapper methods were cleaned up
