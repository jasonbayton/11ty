---
title: "How do I manage runtime permissions on managed Android devices?"
published: '2026-07-05'
status: publish
author: 'Jason Bayton'
excerpt: "How administrators can auto-grant, deny, or delegate runtime permissions on managed Android devices using AMAPI and custom DPC."
type: documentation
tags:
    - FAQ
categories:
    - General
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 44500
sources:
  - https://developers.google.com/android/management/reference/rest/v1/enterprises.policies
  - https://developer.android.com/reference/android/app/admin/DevicePolicyManager#setPermissionGrantState(android.content.ComponentName,java.lang.String,java.lang.String,int)
  - https://developer.android.com/work/versions/android-12
---
Through your EMM's policy, using either AMAPI's `permissionGrants` fields or a custom DPC's `setPermissionGrantState()` method. Administrators can set each runtime permission to one of three states: grant automatically, deny automatically, or leave the decision to the user.

## The three permission states

| State | Effect |
|-------|--------|
| **Grant** | Permission is silently granted. The user cannot revoke it - the toggle in Settings is greyed out. |
| **Deny** | Permission is silently denied. The user cannot grant it. |
| **Prompt** (default) | Standard Android behaviour - the app requests the permission and the user decides. |

When an admin sets Grant or Deny, the user has no control. Setting the state back to Prompt does not revoke a previously granted permission - it retains the existing state but returns control to the user.

## AMAPI configuration

AMAPI provides a layered hierarchy. Each level overrides the one above it:

1. **Policy-level `defaultPermissionPolicy`** - baseline for all apps (PROMPT, GRANT, or DENY)
2. **Policy-level `permissionGrants[]`** - overrides the default for specific permissions across all apps
3. **Per-app `defaultPermissionPolicy`** - overrides the policy default for one app
4. **Per-app `permissionGrants[]`** - overrides everything for a specific permission on a specific app

One exception: a per-app `defaultPermissionPolicy` does **not** override policy-level `permissionGrants[]`. An explicit policy-level permission grant always wins over a per-app default.

A common approach is to set the policy-level default to `PROMPT`, then use per-app grants for specific needs - for example, granting `ACCESS_FINE_LOCATION` to a fleet tracking app while leaving everything else to the user.

## Custom DPC configuration

Custom DPC implementations call `DevicePolicyManager.setPermissionGrantState()` per-app, per-permission. There is no layered hierarchy - each permission state is set individually. EMMs like Workspace ONE, Ivanti, and SOTI abstract this behind their own policy UI, but the underlying mechanism is a direct call for each permission on each app.

## Android 12+ sensor permission restriction

On Android 12 and above, **profile owners** (both BYOD work profile and COPE) **cannot grant** the following sensor-related permissions. Attempts to set `GRANT` will silently fail - the call returns `false` and the permission remains ungranted:

- `ACCESS_FINE_LOCATION`
- `ACCESS_COARSE_LOCATION`
- `ACCESS_BACKGROUND_LOCATION`
- `CAMERA`
- `RECORD_AUDIO`
- `ACTIVITY_RECOGNITION`
- `BODY_SENSORS`

On Android 16, Health Connect permissions (`android.health.connect.HealthPermissions`) are added to this list.

The ability to **deny** these permissions is unaffected for all deployment scenarios.

**Device owners** (fully managed and dedicated devices) can still grant sensor permissions by default. A device owner can opt out of this capability during provisioning by including `EXTRA_PROVISIONING_SENSORS_PERMISSION_GRANT_OPT_OUT` in provisioning extras, after which the same restrictions apply.

<div class="callout callout-red">
<div class="callout-heading callout-heading-small">Be aware of silent failures</div>

On Android 12 through 14, when a profile owner attempts to auto-grant a sensor permission, the call silently fails. There is no error, no notification, and no log entry that most EMMs surface. The admin configures the policy, it appears to be applied, and the permission is never actually granted. On Android 15+, if the DPC targets API 35 or above, the same call throws a `SecurityException` instead.

This is one of the most common causes of "the app stopped working after we migrated to work profile" reports. If you are managing work profile or COPE devices, do not rely on auto-granting sensor permissions. Set them to `PROMPT` and communicate to users that they will need to grant these when prompted.

</div>

## Permission groups

Setting the state for one permission in a group locks the entire group in the Settings UI. For example, granting `READ_CALENDAR` also prevents the user from revoking `WRITE_CALENDAR` through Settings, even if it was not explicitly configured. Best practice is to set the state for all permissions in a group if you configure any of them.

## Practical considerations

- **Test permission policies per deployment scenario.** Behaviour differs between fully managed, COPE, and BYOD - particularly for sensor permissions on Android 12+.
- **Don't blanket-grant everything.** Setting `defaultPermissionPolicy` to `GRANT` across all apps gives every app access to location, camera, and contacts without user awareness. This creates both a security risk and a privacy concern.
- **Notification permission (Android 13+)** is a runtime permission but is **not** on the sensor-restricted list. It can be auto-granted by both device owners and profile owners. Setting `GRANT` for `POST_NOTIFICATIONS` at the policy level is a sensible default to avoid users missing work notifications. See [Android 13 notifications FAQ](/android/android-enterprise-faq/android-13-notifications/) for details.
- **Some permissions are not runtime permissions.** Install-time (normal) permissions like internet access are always granted and cannot be managed. Special permissions like device admin, accessibility, and display-over-apps are handled through separate mechanisms.

For the full explanation of the permission hierarchy and version-specific behaviour, a more detailed guide is available separately.
