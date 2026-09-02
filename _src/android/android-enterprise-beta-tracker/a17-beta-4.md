---
title: 'Android 17 Beta 4 - CP21.260330.008'
parent: 'Android Enterprise build tracker'
published: '2026-04-20'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: ['Android Enterprise build tracker', 'Android', 'aebt-release-notes']
categories: ['Android Enterprise build tracker']
layout: base.njk
eleventyNavigation:
    title: 'Android 17 Beta 4'
---

**Track:** Android 17 Beta | **Milestone:** June 2026 stable

The near-final Android 17 beta, carrying the typed policy engine (present since earlier betas) and cleaning up legacy APIs.

**DPC capabilities**

- **Typed policy interface** - `setPolicy`, `getPolicy`, `getResolvedDeviceWidePolicy`, and `getResolvedPerUserPolicy` are present with typed `PolicyIdentifier` parameters and built-in multi-admin resolution. These carry `@FlaggedApi` at API 10000 (provisional) and will ship when the backing flags graduate
- **DPM role bypass check** - a new method lets apps check whether a package is allowed to bypass device policy management role qualification requirements
- **Async provisioning callback** - multi-user device provisioning gained an async callback interface for reporting provisioning results without blocking

**Other enterprise changes**

- **Typed package policy framework** - `PackageIdentifier` and `PackagePolicyValue` landed, providing strongly typed infrastructure for policies that operate on specific packages
- **Policy streamlining flags** (provisional) - flags appeared for auto-time, Bluetooth sharing, factory reset, lockscreen message, maximum time to lock, screen capture, app install, and app uninstall - all still gated
- **Several legacy flags removed** (graduated out): `deviceOwnerForAll`, `fixDisabledByAdminShortMessageNotShown`, `fixUsbDataSignalingRestrictionAfterReboot`
- **Common criteria coexistence** (provisional) - a new flag for migrating Common Criteria mode to the policy coexistence model
- **Lockscreen info coexistence** (provisional) - a new flag for migrating lockscreen information display to the policy engine
- **Managed device definition** (provisional) - a flag for broadening what qualifies as a "managed device" beyond strict device owner or profile owner
