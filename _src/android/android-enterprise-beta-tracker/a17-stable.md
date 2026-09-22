---
title: 'Android 17 Stable - CP2A.260605.012'
parent: 'Android Enterprise build tracker'
published: '2026-06-16'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: ['Android Enterprise build tracker', 'Android', 'aebt-release-notes', 'aebt-android-17', 'aebt-stable']
categories: ['Android Enterprise build tracker']
layout: base.njk
eleventyNavigation:
    title: 'Android 17 Stable'
---

**Track:** Stable | **Predecessor:** [Android 16 Stable (April)](/android/android-enterprise-beta-tracker/a16-stable-apr/)

The first stable Android 17 release. This is a cross-version comparison against Android 16 - every difference is a genuine version change, not a beta progression. The headline story is the typed policy engine and multi-user device provisioning, both of which ship in this release with their API surfaces live.

**Multi-admin typed policy engine**

- **Typed policy API shipped** - DPC apps can now use `setPolicy`, `getPolicy`, `getResolvedDeviceWidePolicy`, and `getResolvedPerUserPolicy` with typed `PolicyIdentifier<T>` parameters. The engine mediates policy conflicts between multiple admins automatically. Eleven typed policies are defined: screen capture, auto-time, auto-timezone, eSIM outgoing transfer, lockscreen message, content restriction apps, app install, app uninstall, easter eggs, factory reset, and Bluetooth sharing. The API surface is live, but individual policy-streamlining flags remain gated at `false` - expect enablement in QPR releases
- **Cross-profile widget providers (enabled)** - `setCrossProfileWidgetProviders(Set)` is now live. DPCs can set all cross-profile widget providers in a single bulk call rather than adding and removing packages individually
- **Lock now coexistence (enabled)** - multiple admins can coexist when triggering device lock. The policy engine now mediates lock-now calls instead of the most restrictive admin winning silently
- **Permitted input methods intersection (enabled)** - when multiple admins set permitted input methods, the intersection is enforced. This is tighter than the previous union behaviour and improves security for multi-admin deployments
- **22 new policy streamlining flags (provisional)** - individual migration flags for app install, app uninstall, auto-time, auto-timezone, Bluetooth sharing, factory reset, easter eggs, keyguard status, lockscreen message, maximum time to lock, and screen capture API - all at `false`. These will progressively activate as the legacy DPM methods migrate to the typed engine

**Multi-user device management**

- **Multi-user provisioning API shipped** - a complete provisioning flow with state machine (unmanaged, started, completed), typed provisioning parameters, and async callbacks. EMMs can call `provisionMultiuserManagedDevice()` and `provisionMultiuserManagedUser()` to set up shared-device scenarios - kiosks, frontline workers, education labs
- **Device controller role (provisional)** - a new `DEVICE_CONTROLLER` role, lighter than device owner, purpose-built for shared-device controllers. It grants permissions for content protection, debugging features, input methods, lockscreen messages, organisation identity, safe boot, and time setting. Gated by `multiUserManagementDeviceProvisioning`
- **Provisioning naming normalised** - all multi-user provisioning actions and methods moved from `MultiUser` to `Multiuser` casing. DPCs referencing the old action strings (`ACTION_PROVISION_MULTI_USER_DEVICE`) should update to `ACTION_PROVISION_MULTIUSER_MANAGED_DEVICE`

**User restrictions**

- **Guest user restriction (shipped)** - the new `DISALLOW_ADD_GUEST` restriction lets DPCs explicitly block guest user creation without the broader `DISALLOW_ADD_USER`
- **Task continuity handoff (shipped)** - `DISALLOW_TASK_CONTINUITY_HANDOFF` replaces the A16 `DISALLOW_HANDOFF` with a clearer name. DPCs should migrate - the old restriction string is removed
- **Headless system user badge support** - `hasBadge()` now returns true for user 0 in headless system user mode, improving app management UX on HSU devices

**DPM role holder changes**

- **Account management permissions** - the device policy management role holder gains `COPY_ACCOUNTS` and `REMOVE_ACCOUNTS` (gated by `splitCreateManagedProfileEnabled`), supporting managed profile creation workflows
- **Biometric strength query** - `ACCESS_BIOMETRIC_SENSOR_STRENGTHS` added to DPM, system activity, and wallet roles
- **App function permissions** - `DISCOVER_APP_FUNCTIONS` and `EXECUTE_APP_FUNCTIONS_SYSTEM` added to the system activity and DPM roles
- **Show power menu** - `SHOW_POWER_MENU` permission added to the assistant and DPM roles (gated by `statusbarApiShowPowerMenu`)

**Other enterprise changes**

- **Feature flags baked into build** - the `FeatureFlags`/`FeatureFlagsImpl` runtime delegation layer was removed. All admin flags are now hardcoded static methods in the stable image - no runtime override possible
- **Nullable admin component (enabled)** - `enableNullableAdminComponent` shipped `true`, replacing the A16 `dontWriteIsSystemAuthority` flag. Allows admin components to be null in policy engine records, supporting role-based management without a concrete `DeviceAdminReceiver`
- **User-control-disabled-packages settings fix (enabled)** - the fix for user-control-disabled packages in Settings shipped enabled
- **Private profile creation simplified** - `canAddPrivateProfile()` now uses a simpler check, removing multiple legacy flag guards
- **Legacy multi-user methods removed** - `canAddMoreUsersLegacy()` deleted from UserManager; the `consistentMaxUsers` flag is now assumed true
- **Policy handler framework** - a new `PolicyHandler`/`PolicyHandlerFactory`/`PolicyValidator` framework landed in the device policy service. This is the typed handler lifecycle that replaces inline DPMS logic and will scale as more policies migrate
- **ManagedProvisioning onboarding unconditional** - the onboarding task service's feature flag gate was removed; it now exports unconditionally
- **App streaming role expanded** - companion device app streaming gained storage permissions, sensitive notifications access, and restricted RCS message reading (all gated by `expandAppStreamingRolePermissions`)
- **Home role gains app lock** - the home (launcher) role gained `LOCK_APPS` permission, gated by `appLockApis`, enabling launcher-level app locking
- **Supervision permissions broadened** - both supervision roles gained `MANAGE_SUPERVISION` (gated by `enableSupervisionManagerPolicyApis`)
- **RCS restrictions feature-flagged** - restricted RCS message access across companion and system roles moved from SDK version gating to a runtime feature flag
