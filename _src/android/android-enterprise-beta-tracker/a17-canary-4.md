---
title: 'Canary 4 - ZP11.260515.009'
parent: 'Android Enterprise Beta Tracker'
published: '2026-06-15'
date: '2026-06-15T06:00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: ['Android Enterprise Beta Tracker', 'Android', 'aebt-release-notes']
categories: ['Android Enterprise Beta Tracker']
layout: base.njk
eleventyNavigation:
    title: 'Canary 4'
---

**Track:** Canary | **Note:** canary builds are forward-looking and may not ship in the next stable release

Significant build that introduces scaffolding for device admin deprecation and expands the policy metadata system.

## DPC capabilities

- **Device admin deprecation scaffolding** - over 30 methods gained an `isDeviceAdminFeatureDisabled()` check, all returning `false` for now. This is preparation for eventually disabling the legacy device admin API
- **Role-based device ownership** - the device ownership system now accepts a `RoleManager` reference, adding role-based management alongside traditional owner-based management

## Other enterprise changes

- **Several flags graduated** in this build: `addUserInfoInProfileOffDeadlineAlarm`, `checkPersonalSuspensionForAllProfiles`, `crossUserSuspensionEnabledRo`, and others moved to enabled in the canary track
- **Full enum policy metadata** - 13 policies gained complete metadata registration including eSIM transfer, universal clipboard, screen capture, Bluetooth sharing, and lockscreen message
- **Personal apps suspension fix** graduated - the multi-profile fix for personal apps suspension is now the default behaviour
- **Device state methods moved** - `hasAffiliationWithDevice` and `isDeviceProvisioned` moved to an internal interface, cleaning up the public API surface
- **Test flag removed** - the `policyStreamliningTests` flag used for internal validation was removed
