---
title: 'Android 17 QPR3 Beta 3 - DP11.261016.003'
parent: 'Android Enterprise build tracker'
published: '2026-10-30'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: ['Android Enterprise build tracker', 'Android', 'aebt-release-notes', 'aebt-android-17', 'aebt-qpr3', 'aebt-beta']
categories: ['Android Enterprise build tracker']
layout: base.njk
eleventyNavigation:
    title: 'Android 17 QPR3 Beta 3'
---

**Track:** QPR3 Beta | **Predecessor:** [QPR3 Beta 2](/android/android-enterprise-beta-tracker/a17qpr3-beta-2/) | **Milestone:** March 2027 stable

QPR3 Beta 3 is the largest single-build enterprise surface delta this tracker has recorded. Three major subsystems land simultaneously: Data Leak Prevention with a complete rules and enforcement stack, Advanced Security Telemetry with XDR-style monitoring, and Policy Streamlining V2 with a generic API and 43 per-policy sub-flags. Seven flags flip to true, including the policy streamlining master gate.

### Policy streamlining master gate enabled

The `policyStreamlining` flag flips to `true`, activating the top-level gate for the AMAPI-aligned typed policy namespace. 43 per-policy sub-flags are added covering Bluetooth, camera, printing, Wi-Fi, ADB, USB, MTE, security logging, developer options, nearby streaming, and more. A new server-side `StreamlinedPolicies` class (~210 lines) implements the generic `setPolicy()`, `getPolicy()`, `getResolvedPerUserPolicy()`, and `subscribeToResolvedPerUserPolicy()` API backbone. All 43 per-policy sub-flags remain gated (return `false`), but the infrastructure is now live.

Six other flags also flip to `true`: `dpmSecurityLevelWpaOnly`, `enforcingAdminExtraEnabled`, `enforcingAdminGetComponentNameEnabled`, `managedEsimOutgoingTransferPolicy`, `secureAdbRoleBypassing`, and `setTimeCoexistence`.

### Data Leak Prevention framework

A complete DLP stack lands across two packages (~38 classes total):

- **API layer** (`android.app.admin.dataleakprevention`) - `DataLeakPreventionManager` as a `@SystemApi` system service with content URI access checking, batch operations, and screen capture pre-checks. Rules defined via `DataLeakPreventionRules` with app-based and storage-based source/destination matchers. Verdict hierarchy: allow, block, or redact. New DPM operation `OPERATION_SET_DATA_LEAK_PREVENTION_RULES` (43) and policy identifier `DATA_LEAK_PREVENTION_RULES_POLICY`
- **Reporting layer** (`android.app.admin.reporting.dataleakprevention`) - 23-class reporting subsystem with 16 transfer action types covering copy-paste, screen capture (image and video), intent sharing, file operations (read, write, create, close, copy, move, zip), URI permission grants and checks, and printing

### Advanced Security Telemetry

27 new XDR-style classes under `android.app.admin.reporting.securitytelemetry` covering:

- **Process lifecycle** - `ProcessExecEvent` and `ProcessTerminateEvent` with parent process attribution, image file hashes, and TCB (Trusted Computing Base) attributes
- **Network monitoring** - `NetworkFlow` with community ID, local/remote endpoints, protocol, direction (incoming/outgoing), and byte counters; `NetworkSocketListenEvent` for socket monitoring
- **Agent monitoring** - `AgentStartEvent` and `AgentHeartbeatEvent` for security agent health tracking

Gated behind `advancedSecurityTelemetryEnabled` (false) and `xdrReportingEnabled` (false).

### New DPM APIs and constants

- `setMtePolicy(int)` / `setMtePolicy(String, int)` - Memory Tagging Extension policy control
- `setContentProtectionPolicy(ComponentName, int)` / `getContentProtectionPolicy(ComponentName)` - content protection toggle per admin
- `setAppFunctionsPolicy(int)` - app functions policy control
- `isOutgoingEsimTransferAllowed(int)` - eSIM outgoing transfer check
- `POLICY_SCOPE_LOGIN_SCREEN` (4) - new policy scope for login screen
- `LOGIN_ATTEMPT_STATUS_FAILED` / `LOGIN_ATTEMPT_STATUS_SUCCESS` - login attempt tracking constants
- `STATUS_SINGLE_USER_DEVICE_MANAGEMENT_NOT_SUPPORTED` (25) - new provisioning status

### Policy Engine V2 abstractions

New engine-level constructs formalise policy targeting and propagation:

- `Resource` - `DeviceWide` (singleton) or `PerUser` (cached per userId)
- `Scope` - `Device` (singleton) or `User` (cached per userId)
- `PolicyPropagationRule` - six values: `SELF`, `LOGIN_TO_DEVICE`, `DEVICE_TO_DEVICE`, `DEVICE_TO_USER`, `INHERITABLE_PROFILE`, `SESSION_ACTIVE`

Legacy handlers (`EnumStoredAsBooleanPolicyHandler`, `EnumStoredAsGlobalAndLocalBooleanPolicyHandler`, `ListOfPackageIdentifierPolicyHandler`) are deleted, their functionality absorbed into a new `SimplePolicyHandler` base class.

### 28+ new permissions

The PermissionController gains 28+ feature-flagged `MANAGE_DEVICE_POLICY_*` permissions including advanced security telemetry, bugreport, DLP, developer options, ethernet, MTE, nearby streaming, physical media, reboot, user removal, USB access, Wi-Fi, and more. Notable additions: `MANAGE_DEVICE_POLICY_DATA_LEAK_PREVENTION`, `MANAGE_DEVICE_POLICY_ADVANCED_SECURITY_TELEMETRY`, `MANAGE_DEVICE_POLICY_REBOOT`, and `MANAGE_DEVICE_POLICY_REMOVE_USERS`.

### Other changes

- **Flags.java structural overhaul** - all `FLAG_*` string constants removed, replaced with direct boolean accessor methods. 52 new flags, 5 removed (4 graduated into unconditional behaviour, 1 renamed)
- **Policy validator framework** - new `android.app.admin.validator` package with type-safe validators for enum, integer, string, list, and complex policy values
- **Policy metadata framework** - 14 domain-organised metadata classes covering advanced security, application management, branding, cross-device, DLP, date/time, device connectivity, device radio, reporting, security, sensors, and system policies
- **PolicyDefinitionFactory expansion** (+336 lines) - 15+ new factory-built policy definitions wired to enforcement
- **DevicePolicyPrebuilt removed** - CloudDPC prebuilt no longer present in the factory image extraction, possibly indicating a delivery mechanism change
- **`deviceTheftImplEnabled`** graduated (removed, now unconditional)
- **`enableNullableAdminComponent`** renamed to `enableNullableAdminForAffiliationIds`
