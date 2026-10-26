---
title: 'Android 17 QPR3 Beta 2 - DP11.261002.005'
parent: 'Android Enterprise build tracker'
published: '2026-10-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: ['Android Enterprise build tracker', 'Android', 'aebt-release-notes', 'aebt-android-17', 'aebt-qpr3', 'aebt-beta']
categories: ['Android Enterprise build tracker']
layout: base.njk
eleventyNavigation:
    title: 'Android 17 QPR3 Beta 2'
---

**Track:** QPR3 Beta | **Predecessor:** [QPR3 Beta 1](/android/android-enterprise-beta-tracker/a17qpr3-beta-1/) | **Milestone:** March 2027 stable

QPR3 Beta 2 expands the policy streamlining initiative with five new flags and six new permissions, adds a standalone provisioning manager for multi-user setups, and wires the advanced security telemetry subsystem into the network logging pipeline.

### Policy streamlining expansion

Five new `policyStreamlining*` flags extend the Engine V2 migration to additional policy domains:

- **Incoming ADB** - end-to-end policy chain from flag (`policyStreamliningIncomingAdb`) through `INCOMING_ADB` policy definition, enforcer callback, and `MANAGE_DEVICE_POLICY_INCOMING_ADB` permission. DPCs will be able to manage ADB access via typed policy rather than legacy restriction APIs
- **Managed Wi-Fi credential sharing** - gates `MANAGE_DEVICE_POLICY_MANAGED_WIFI_CREDENTIALS_SHARING` permission for Wi-Fi credential sharing policy
- **Modes synchronisation** - gates `MANAGE_DEVICE_POLICY_MODES_SYNC` for cross-device mode sync policy
- **Printing** - printing restrictions via the typed policy engine
- In total, six new feature-flagged permissions land in the PermissionController manifest this build, including `MANAGE_DEVICE_POLICY_REMOVE_USERS` for device controller user removal

All five flags are provisional (return `false`).

### Multi-user managed user provisioning

A new `ProvisioningManager` class provides a standalone orchestrator for multi-user managed user setup. It validates provisioning preconditions via `ProvisioningPreconditionChecker`, then delegates to DPMS to set the active admin and profile owner on the target user. The provisioning action `android.app.admin.action.PROVISION_MULTIUSER_MANAGED_USER` is the entry point. This builds on the `createManagedUser()` API introduced in QPR3 Beta 1.

### Advanced security telemetry integration

The `NetworkLoggingHandler` gains an `AdvancedSecurityTelemetrySource` interface, connecting the advanced security telemetry subsystem (first introduced in Canary 7) to the network logging pipeline. When the DPC is not actively streaming logs, the handler schedules telemetry polling at 60-second intervals. This is the first concrete integration point between the new XDR-style telemetry system and the existing enterprise logging infrastructure.

### Policy handler refactoring

A new `SimplePolicyHandler` base class extracts the common store/get/resolve pattern from `PolicyHandler`. Several existing handlers - including `WifiStatePolicyHandler`, `TetheringPolicyHandler`, `CameraAccessPolicyHandler`, and `EnumStoredAsBooleanPolicyHandler` - now extend `SimplePolicyHandler` instead of `PolicyHandler` directly. This simplifies adding new typed policy handlers going forward.

### Other changes

- **`allowDeviceControllerRemoveUser`** (provisional) - new flag gating device controller user removal, paired with `MANAGE_DEVICE_POLICY_REMOVE_USERS` permission
- **Support message migration hooks** - `Owners` gains test methods for short and long support message migration, supporting the policy streamlining effort for branding messages
- **Removed flags** - `suspendPackagesCoexistence` (was `true`) and `useHardenedFrpActiveCheck` (was `true`) have been removed entirely, confirming these features are now unconditional behaviour
- **`advancedSecurityLoggingEnabled` renamed** - now `advancedSecurityTelemetryEnabled` (this rename first appeared in QPR3 Beta 1)
- **No new public DPM methods or DISALLOW_* restrictions** - the API surface is unchanged from QPR3 Beta 1

All new flags return `false` - none have graduated yet.
