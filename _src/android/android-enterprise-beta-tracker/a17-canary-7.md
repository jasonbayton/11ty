---
title: 'Canary - ZP11.260918.007'
parent: 'Android Enterprise build tracker'
published: '2026-10-12'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: ['Android Enterprise build tracker', 'Android', 'aebt-release-notes', 'aebt-android-17', 'aebt-canary']
categories: ['Android Enterprise build tracker']
layout: base.njk
eleventyNavigation:
    title: 'Canary - ZP11.260918.007'
---

**Track:** Canary | **Predecessor:** [Canary 6](/android/android-enterprise-beta-tracker/a17-canary-6/) | **Note:** canary builds are forward-looking and may not ship in the next stable release

A major canary update introducing an advanced security telemetry subsystem (51 new classes for process and network monitoring), a full Data Leak Prevention system service, managed user creation, three new policy engine handlers, and a wave of 21 new flags covering policy streamlining, security telemetry, and multi-user management.

**DPC capabilities**

- **Advanced security telemetry** (provisional) - a new subsystem of 51 classes gated by `advancedSecurityTelemetryEnabled`. Provides enterprise threat detection via process lifecycle events (`ProcessExecEvent`, `ProcessTerminateEvent`), network flow monitoring (`NetworkFlowEvent`, `NetworkSocketListenEvent`), and security agent health checks (`AgentStartEvent`, `AgentHeartbeatEvent`). This is kernel-level security telemetry for enterprise devices - a significant new capability with no predecessor on any track
- **Data Leak Prevention Manager** (provisional) - new `@SystemApi` system service (`DataLeakPreventionManager`) for content URI access checks, batch DLP operations, and print/screen capture enforcement. Methods include `checkContentUriAccess()`, `batchCheckContentUriAccess()`, `checkPrintingAction()`, and `precheckScreenCaptureAction()`. Supports three UI handling modes: SILENT, SYSTEM_OWNED, and CALLER_OWNED. Not present in the previous canary - this is the first appearance of a standalone DLP system service
- **Managed user creation API** (provisional) - new `createManagedUser(CreateManagedUserParams, Executor, OutcomeReceiver)` on `DevicePolicyManager`. Asynchronous creation of dedicated-task users for multi-user managed device deployments. Gated by `createManagedUserApi` (false). Only accepts `USER_TYPE_FULL_DEDICATED_TASK`
- **Device certificates phase 2** (provisional) - new `installKeyPair` overload with `Collection<Certificate>` and explicit scope parameter. Gated by `enableDeviceCertificatesPhase2`. Enables certificate scoping to specific contexts
- **21 new policy flags** (provisional) - all gated at `false`. The largest single-build flag batch to date, covering 13 policy streamlining domains (Bluetooth, camera access, content capture, long support message, nearby app/notification streaming, Wi-Fi state/Direct, set time zone, complex types, application policy), plus advanced security telemetry, security log streaming, managed user creation, per-user sensor permissions, bug reports for multi-user management, and several bug fix and refactoring gates
- **Camera, tethering, and Wi-Fi state policy handlers** (provisional) - three new `PolicyHandler` subclasses landed. `CameraAccessPolicyHandler` maps USER_CHOICE/ENABLED/DISABLED to camera restrictions. `TetheringPolicyHandler` enforces tethering and Wi-Fi tethering restrictions. `WifiStatePolicyHandler` enforces the Wi-Fi state restriction. Each integrates with the typed policy engine V2
- **PolicyIdentifier transport migration** - systematic migration from `policyIdentifier.getId()` to `policyIdentifier.toTransport()` across `setPolicy`, `getPolicy`, `getResolvedDeviceWidePolicy`, `getResolvedPerUserPolicy`, and `getEnforcingAdminsForPolicyIdentifier`. The new `PolicyIdentifierTransport` Parcelable enables richer typed policy identification across process boundaries
- **Kiosk to dedicated-task rename** - `USER_TYPE_FULL_KIOSK` renamed to `USER_TYPE_FULL_DEDICATED_TASK` and `isUserTypeKiosk()` to `isUserTypeDedicatedTask()`. Canary now aligns with the beta track naming (beta adopted this in QPR2 Beta 5). The scope broadens from kiosk-only to general dedicated-task user types
- **Security log streaming flag** - `securityLogStreamingEnabled` signals future real-time security event delivery. Currently canary has both the telemetry subsystem and streaming flag - together they represent a step-change in enterprise security monitoring capability
- **Per-user sensor permission grants** - `canAdminGrantSensorsPermissionsPerUser` flag and corresponding per-user userId parameter on `canAdminGrantSensorsPermissions()`. Sensor permissions can now be granted per-user rather than device-wide

**Other enterprise changes**

- **Policy engine V2 plumbing expanded** - `CONTENT_PROTECTION` and `MEMORY_TAGGING_EXTENSION` now conditionally handled by Engine V2 via `setIsHandledByEngineV2Supplier()`. New `buildOrThrow()` method on `PolicyDefinition` for safer construction. `Resource` and `Scope` interfaces added for formalised policy resource targeting
- **Legacy permission centralised** - new `LegacyPermissionRegistry` extracts DO/PO/financed DO permission lists from inline DPMS code into a single registry class
- **Visible background users API rename** - `isVisibleBackgroundUsersSupported()` deprecated in favour of `isVisibleBackgroundFullUsersSupported()`. The "Full" qualifier disambiguates from profile-type background users
- **triggerDevicePolicyEngineMigration removed** - the policy engine migration trigger is no longer exposed as public API
- **GooglePermissionController** - `ConfirmationActivity` removed from manifest, layout renames, and localisation string updates across all locales. No new enterprise permissions or components

**Cross-track note:** a notable convergence - canary now uses `USER_TYPE_FULL_DEDICATED_TASK`, matching QPR2 Beta's independent rename from `USER_TYPE_FULL_KIOSK`. The remaining cross-track divergences persist: canary carries `crossUserSuspensionEnabledRo` and `isRecursiveRequiredAppMergingEnabled` at `true`, the beta track still has streaming network log infrastructure that canary lacks, and several beta-track flags (`advancedSecurityLoggingEnabled`, `permissionManageAffiliationIds`) are not present on canary. The new security telemetry and DLP Manager subsystems are canary-first - not yet present on the beta track.
