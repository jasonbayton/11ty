---
title: 'Android 17 QPR3 Beta 1 - DP11.260918.006'
parent: 'Android Enterprise build tracker'
published: '2026-10-19'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: ['Android Enterprise build tracker', 'Android', 'aebt-release-notes', 'aebt-android-17', 'aebt-qpr3', 'aebt-beta']
categories: ['Android Enterprise build tracker']
layout: base.njk
eleventyNavigation:
    title: 'Android 17 QPR3 Beta 1'
---

**Track:** QPR3 Beta (new track) | **Branch point:** QPR2 Beta 7.1 (CP41.260831.019) | **Milestone:** March 2027 stable

The first QPR3 Beta brings the most enterprise-significant changes since QPR2 Beta 1, with new APIs, deeper policy engine infrastructure, and 17 new feature flags (14 provisional, all currently `false`).

### New APIs

**Managed user creation** - A new `@SystemApi` method `createManagedUser()` enables programmatic creation of managed users via `CreateManagedUserParams`, with async callbacks for success (`UserHandle`) or failure (`ManagedUserCreationException`). This is a key building block for multi-user management (MUM) scenarios. Gated by `createManagedUserApi` (provisionally `false`).

**Scoped certificate installation** - `installKeyPairWithScope()` adds an explicit scope parameter to certificate installation, and a new `installKeyPair` overload takes `Collection<Certificate>` with a scope integer. These complement the scoped certificate APIs (remove, has, generate, grant, revoke) introduced in QPR1/QPR2. Gated by `enableDeviceCertificatesPhase2` (provisionally `false`).

### Engine V2 / policy streamlining

The Engine V1-to-V2 migration trigger (`triggerDevicePolicyEngineMigration`) has been removed entirely, confirming V2 is now the sole engine path. Seven new `policyStreamlining*` flags gate additional policies being migrated to the typed engine model:

- **Bluetooth**, **camera access** (with new `CameraAccessPolicyHandler`), **complex-type policies**, **long support message**, **nearby app streaming**, **nearby notification streaming**, **time zone**, **Wi-Fi state** (with new `WifiStatePolicyHandler`)

The internal transport layer switched from string-based policy IDs to typed `PolicyIdentifierTransport` objects across all policy setter/getter methods. New `engine/Resource` and `engine/Scope` types provide structured device-wide vs per-user targeting.

### Other notable changes

- **`advancedSecurityLoggingEnabled` renamed to `advancedSecurityTelemetryEnabled`** - reflects the broader scope of the security telemetry subsystem
- **`securityLogStreamingEnabled`** (provisional) - real-time streaming delivery of security log events
- **`requestBugreportForMum`** (provisional) - bug report collection on multi-user managed devices
- **`forceResetAdbProvisionedDo`** (provisional) - force-reset of ADB-provisioned device owners
- **`canAdminGrantSensorsPermissions`** now takes a user ID (per-user sensor permission granting)
- **`canAddPrivateProfile()` deprecated** - throws `UnsupportedOperationException` in "Android D" (QPR3); replaced by `isUserTypeSupported()`
- **Provisioning logic refactored** - precondition checks moved to a dedicated `ProvisioningPreconditionChecker` with delegate pattern
- **GooglePermissionController** ships as platform build (version 330000000) rather than the Mainline module (373040300)

All 14 new flags return `false` - none have graduated yet.
