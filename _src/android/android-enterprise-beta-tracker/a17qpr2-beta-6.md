---
title: 'Android 17 QPR2 Beta 6 - CP41.260831.007'
parent: 'Android Enterprise build tracker'
published: '2026-09-28'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: ['Android Enterprise build tracker', 'Android', 'aebt-release-notes', 'aebt-android-17', 'aebt-qpr2', 'aebt-beta']
categories: ['Android Enterprise build tracker']
layout: base.njk
eleventyNavigation:
    title: 'Android 17 QPR2 Beta 6'
---

**Track:** QPR2 Beta | **Predecessor:** [QPR2 Beta 5](/android/android-enterprise-beta-tracker/a17qpr2-beta-5/) | **Milestone:** December 2026 stable

The policy type system becomes extensible, managed device detection narrows its scope, and device controllers gain the ability to manage affiliation IDs.

**DPC capabilities**

- **Policy identifier extensibility** - the policy type system has been refactored to support richer, typed policy identifiers beyond simple string-keyed entries. This is the architectural groundwork for compound policies that group related app management operations. One policy - content capture - was deliberately left on the old type, suggesting it will receive a specialised identifier
- **Application policy streamlining** (provisional) - a new flag extends the policy streamlining effort into a broader "application policy" scope, likely covering install, uninstall, and related app management operations as a compound policy rather than individual entries
- **Device admin race condition fix** (provisional) - a new flag addresses a race condition when enabling a device admin, fixing a correctness issue with concurrent admin enablement paths
- **ADB role bypass relocation** (provisional) - a new flag suggests the ADB role-bypassing security check is being relocated, tightening the security boundary around ADB access in managed environments
- **Affiliation ID management for device controllers** (provisional) - device controllers can now manage affiliation IDs, which determine whether a work profile and device owner belong to the same organisation. Previously only available to the device owner directly

**Other enterprise changes**

- **Managed device detection narrowed** - `isDeviceManaged()` no longer returns true for company-owned work profile (COPE) devices. The server-side implementation now checks only for a device owner. DPC apps or management tools relying on this method returning true for COPE deployments will see changed behaviour
- **Binder cache consistency at ownership transitions** - a new cache invalidation method is called at all four ownership state transition points (set device owner, clear management, set organisation-owned profile owner, provision multi-user managed device). This ensures cached managed device state stays consistent during provisioning and teardown
- **Visible background users API renamed** - the visible background users APIs have been renamed to include "Full" to distinguish full users from profile-type visible background users. The old methods are preserved as deprecated wrappers
- **Private profile creation check removed** - the deprecated `canAddPrivateProfile()` method has been removed from UserManager. Private Space creation checks are simplified elsewhere
