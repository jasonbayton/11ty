---
title: 'QPR1 Beta 4 - CP31.260522.006.A1'
parent: 'Android Enterprise Beta Tracker'
published: '2026-06-15'
date: '2026-06-15T00:00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: ['Android Enterprise Beta Tracker', 'Android', 'aebt-release-notes']
categories: ['Android Enterprise Beta Tracker']
layout: base.njk
eleventyNavigation:
    title: 'QPR1 Beta 4'
---

**Track:** QPR1 Beta | **Milestone:** September 2026 stable

Introduces the device controller concept, content safety apps rename, and WPA enforcement constant.

## DPC capabilities

- **Device controller package** - a new concept of a "device controller" separate from the traditional device owner or profile owner. The controller package is set during multi-user provisioning, persisted in the device's ownership data, and cleared when management is torn down. This is a lighter-weight management entity designed for shared and multi-user devices
- **Content safety apps** - the content restriction apps policy was renamed to content safety apps, settling on its final name after several iterations. The associated permission was also renamed
- **Parent-profile-aware streaming policy** (provisional) - the nearby app streaming policy gained parent-profile awareness, allowing it to be set and queried with profile context
- **WPA Wi-Fi security constant** (provisional) - a new constant value allows enforcing WPA as the minimum Wi-Fi security level

## Other enterprise changes

- **Sideloading control permission** - a new permission for controlling unknown sources installation, distinct from the existing sideloading restriction
- **Display management permission** - a new role-gated permission for managing displays appeared, relevant for devices connected to external screens
- **Three flags graduated** in this build: `addUserInfoInProfileOffDeadlineAlarm`, `checkPersonalSuspensionForAllProfiles`, and `wipeDeviceWhenUserCannotBeRemoved`
- **Two flags removed** (graduated out): `associateDisallowGrantAdminWithPermission` and `unsuspendNotSuspended`
- **Device state cache replaced** - the abstract device state cache was replaced by a concrete implementation with methods moved to internal interfaces
- **Provisioning pre-condition fix** - a fix ensured provisioning pre-conditions pass the correct user ID
