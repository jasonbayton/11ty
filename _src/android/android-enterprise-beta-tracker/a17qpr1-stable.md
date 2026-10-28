---
title: 'Android 17 QPR1 Stable - CP3A.261005.005'
parent: 'Android Enterprise build tracker'
published: '2026-10-28'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: ['Android Enterprise build tracker', 'Android', 'aebt-release-notes', 'aebt-android-17', 'aebt-qpr1', 'aebt-stable']
categories: ['Android Enterprise build tracker']
layout: base.njk
eleventyNavigation:
    title: 'Android 17 QPR1 Stable'
---

**Track:** QPR1 Stable | **Predecessor:** [A17 Stable (CP2A.260605.012)](/android/android-enterprise-beta-tracker/a17-stable/) | **Next milestone:** QPR2 stable (December 2026)

This is the first quarterly platform release for Android 17, shipping to Pixel devices with the October 2026 security patch. It represents four months of enterprise development from the initial June stable through the QPR1 beta programme. The headline additions are data leak prevention, Policy Engine V2 infrastructure, and a broad expansion of the policy streamlining initiative.

### Data leak prevention

An entirely new data leak prevention (DLP) framework arrives, giving DPC apps the ability to define rules that control how data moves between apps. Rules match on source app, destination app, and transfer type (data transfer or screen capture), with enforcement actions including block, redact, and report. Nine new framework classes handle rule definition, matching, and enforcement.

This mirrors the DLP capability that Chrome Enterprise already offers on ChromeOS devices, where `DataLeakPreventionRulesList` restricts clipboard, screenshot, printing, and file transfers by URL pattern. The Android implementation works by app rather than by URL, but the enforcement model is the same.

All DLP classes are shipped. The DPC-facing `setDataLeakPreventionRules()` API for writing rules and the `MANAGE_DEVICE_POLICY_DATA_LEAK_PREVENTION` permission are present in the beta track and expected in QPR2 stable.

### Policy Engine V2

Over 20 new feature flags land the infrastructure for migrating individual policy enforcement areas into a redesigned Policy Engine V2. Each flag gates one policy area - when enabled, that policy switches from legacy enforcement to the new typed resolution mechanism. The master switch is `policyEngineV2`.

Policy areas covered include account management, application visibility, application restrictions, audit logging, common criteria mode, content protection, keyguard features, lock task, password complexity, permission grants, screen capture, security logging, USB data signalling, and user restrictions, among others.

All V2 migration flags are provisional (still `false`). The infrastructure is in place but no individual policy has been switched over yet.

### Policy streamlining expansion

The typed `PolicyIdentifier` system continues its expansion. New policy categories now cover:

- **Connectivity** - physical SIM management, USB file transfer, USB data signalling, network reset, and Wi-Fi tethering minimum security level, each with typed allowed/disallowed values and minimum security level enforcement (WPA through WPA3)
- **Security** - safe boot, untrusted app installs, and app verification can now be managed through typed policies rather than legacy restriction APIs
- **Application management** - app install, app uninstall, and content safety app designation each get their own typed policy identifiers
- **Branding** - lock screen messages move to the typed policy system

Each policy category arrives as a new class under `android.app.admin.policy` with strongly typed values and constants.

All policy streamlining flags are provisional.

### Multi-user managed device progress

The `provisionMultiuserManagedUser()` API for provisioning managed users on multi-user devices is confirmed shipped. A new `STATUS_INCOMPATIBLE_OS_BUILD` error code (19) handles the case where the OS build does not support multi-user provisioning.

The framework-side API is ready, but neither ManagedProvisioning nor DevicePolicyPrebuilt (CloudDPC) currently expose MUM-specific activities or intent filters. The provisioning entry point exists in framework code but is not yet wired through the app layer.

A new kiosk user type (`USER_TYPE_FULL_KIOSK`) and admin status change broadcast (`ACTION_USER_ADMIN_STATUS_CHANGED`) also ship, supporting the multi-user device model.

### Scoped certificate management

Certificate key pair operations - `removeKeyPair`, `hasKeyPair`, and `generateKeyPair` - all gain a `scope` parameter, enabling DPC apps to manage certificates at either device-wide or profile scope. This is gated by the `enableDeviceCertificates` flag (provisional).

### Policy transparency callbacks

DPC apps can now subscribe to resolved policy state changes via `addResolvedDeviceWidePolicyCallback()`. When the effective policy value changes - whether because of a new admin, a policy update, or a conflict resolution - the callback fires with both the old and new values. The backing flag `policyTransparencyRefactorEnabled` has graduated to `true` (shipped).

### Graduated flags

Five flags have graduated from `false` to `true`, confirming these features are now live:

- **`policyTransparencyRefactorEnabled`** - the policy transparency callback system is active
- **`addUserInfoInProfileOffDeadlineAlarm`** - user info included in work profile off-deadline alarms
- **`checkPersonalSuspensionForAllProfiles`** - personal app suspension checks all profiles
- **`introduceGenericProvisioningError`** - generic provisioning error codes (including `STATUS_INCOMPATIBLE_OS_BUILD`)
- **`useHardenedFrpActiveCheck`** - hardened factory reset protection verification

These were all rolled back to `false` in the initial A17 stable release (June) but are now confirmed `true` in QPR1 stable.

### ManagedProvisioning hardening

The provisioning app receives security improvements:

- Backups explicitly disabled (`allowBackup="false"`)
- Cleartext HTTP traffic no longer permitted (removed `usesCleartextTraffic="true"`)
- Explicit network security configuration added (`networkSecurityConfig`)

### Removed flags

Eight flags have been removed entirely, confirming their features are now unconditional or abandoned:

- `associateDisallowGrantAdminWithPermission`, `removeDeviceAdminFeatureChecks`, `unsuspendNotSuspended`, `usePolicyIntersectionForPermittedInputMethods`, `userControlDisabledPackagesSettingsFix` - all previously `true`, now graduated out
- `enterpriseEsimUsingCarrierPrivileges` - replaced by `esimManagementEnabled`/`esimManagementUxEnabled`
- `policyStreamliningTests` - test-only flag, removed
- `wipeDeviceWhenWipedUserIsLastAdmin` - replaced by the broader `wipeDeviceWhenUserCannotBeRemoved`

### AOSP source status

Android 17 base source is available in AOSP (`android17-release` branch). QPR1 source has not yet been published - Google's 2026 AOSP schedule targets Q2 and Q4, so the Q4 drop is expected to include QPR1 source.
