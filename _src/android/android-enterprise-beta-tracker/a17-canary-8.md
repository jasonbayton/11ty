---
title: 'Canary - ZP11.261016.008'
parent: 'Android Enterprise build tracker'
published: '2026-11-06'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: ['Android Enterprise build tracker', 'Android', 'aebt-release-notes', 'aebt-android-17', 'aebt-canary']
categories: ['Android Enterprise build tracker']
layout: base.njk
eleventyNavigation:
    title: 'Canary - ZP11.261016.008'
---

**Track:** Canary | **Predecessor:** [Canary 7](/android/android-enterprise-beta-tracker/a17-canary-7/) | **Note:** canary builds are forward-looking and may not ship in the next stable release

A structural refactoring build that extracts provisioning into a dedicated manager, flattens the policy handler hierarchy, wires Advanced Security Telemetry into the security log system, and lands two new typed policy domains: USB device access and printing. The StreamlinedPolicies generic API backbone (`setPolicy`/`getPolicy`/`subscribe`) is now implemented.

### DPC capabilities

- **StreamlinedPolicies generic API** - the `setPolicy()`, `getPolicy()`, `getResolvedPerUserPolicy()`, and `subscribeToResolvedPerUserPolicy()` backbone is now live in a new 210-line `StreamlinedPolicies` class. This is the single generic entry point for typed policy management, backed by the handler hierarchy. Each handler is registered by `PolicyIdentifier` for O(1) dispatch. The plumbing that has been building across the past several builds is now callable through a unified interface
- **USB device access policy** (provisional) - new typed policy class (`UsbDeviceAccess`) with a per-device allowlist and default access mode (USER_CHOICE or DISALLOWED). `UsbDeviceDetails` describes a USB device by vendor/product/class/subclass/protocol IDs plus manufacturer, product, serial, and interface names. DPC apps can allowlist specific USB devices by any combination of these fields - a significant improvement over the binary `DISALLOW_USB_FILE_TRANSFER` restriction
- **Printing policy** (provisional) - new `Printing` policy class with a `PRINTER_CONFIGURATIONS` typed policy identifier. Accompanying `PrinterConfigurations` value type enables managing printer allow/deny lists through the streamlined policy system. This is the first policy domain for print management in the enterprise framework
- **Advanced Security Telemetry wired to SecurityLog** - four new SecurityLog tags: `TAG_PROCESS_EXEC` (210052), `TAG_PROCESS_TERMINATE` (210053), `TAG_AGENT_START` (210054), `TAG_AGENT_HEARTBEAT` (210055). SecurityEvent now has dual-type backing (logd or AST), with a new `createFromParcel` factory that handles both. The AST subsystem from the previous canary is now fully plumbed into the standard security logging pipeline
- **Security log streaming callback** - new `ISecurityLogEventsCallback` AIDL interface and `setSecurityLogEventsCallback()` on DPMS. DPC apps can register for push delivery of security events via `onNewSecurityLogEvents()`, replacing poll-based `retrieveSecurityLogs()`. Combined with the `securityLogStreamingEnabled` flag from the previous build, this represents the full streaming security log architecture
- **DLP print reporting** - `PrintPayload` and `PrinterDestination` extend the Data Leak Prevention event reporting to cover print actions. `PrinterDestination` identifies a printer by service name, local ID, and display name with user affiliation state. This completes the DLP coverage for printing alongside the existing clipboard, screen capture, and file operation reporting
- **Per-package policy resource scope** - new `RESOURCE_PER_PACKAGE` constant (3) on `DevicePolicyManager`, alongside the existing DEVICE_WIDE (1) and PER_USER (2). Combined with `PackageIdentifier` now threading through the entire policy handler chain, this signals per-package policy resolution capability
- **User logout reporting** - new `reportUserLogout(UserInfo)` API on DevicePolicyManager for reporting user logout events to the device policy subsystem
- **Lockscreen message policy identifier** - `LOCKSCREEN_MESSAGE_POLICY` added to `DevicePolicyIdentifiers`, moving lock screen message management into the typed policy identifier system with a corresponding static `PolicyDefinition.LOCKSCREEN_MESSAGE`

### Policy engine architecture

- **Handler hierarchy flattened** - `PolicyHandler` is now abstract with five abstract methods parameterised by `PackageIdentifier`. `SimplePolicyHandler` implements the common non-package-scoped case. Six specialised handlers removed: `CameraAccessPolicyHandler`, `EnumStoredAsBooleanPolicyHandler`, `EnumStoredAsGlobalAndLocalBooleanPolicyHandler`, `ListOfPackageIdentifierPolicyHandler`, `TetheringPolicyHandler`, and `WifiStatePolicyHandler`. Their logic is absorbed into the generic infrastructure
- **PolicyDefinitionFactory migrated to static definitions** - `AUTO_TIME`, `AUTO_TIME_ZONE`, `CONTENT_PROTECTION`, `MEMORY_TAGGING`, and `LOCKSCREEN_MESSAGE` now resolve to static `PolicyDefinition` constants rather than inline factory construction. New factory added for `AdvancedSecurityOverrides.INCOMING_ADB`
- **ProvisioningManager extraction** - all provisioning logic (fully managed device, managed profile, multi-user managed device) extracted from DPMS into a standalone 588-line `ProvisioningManager` class with `Delegate` and `OemCallback` interfaces. DPMS now implements both, and the OEM lifecycle hooks are promoted from `final` to `@Override`
- **Policy validators** - `EnumValidator`, `IntegerValidator`, and `ListValidator` added for type-safe policy value validation. `ListOfIntegerPolicyValue` and `ListOfIntegerPolicySerializer` support integer-list policy values
- **SecurityLogMonitor AST integration** - deferred AST event buffer, `pullAdvancedSecurityTelemetryLogsLocked()` stub, `LogEventsConsumer` interface, and AST buffer lifecycle management across start/stop/reset/discard paths

### Other changes

- **Nearby app streaming flag graduation** - the `nearbyAppStreamingPolicySupportParentProfile` guard removed from `setNearbyAppStreamingPolicy()` and `getNearbyAppStreamingPolicy()`. The parent-profile parameter dropped from the AIDL. Nearby app streaming policy now unconditionally uses `throwIfParentInstance`, matching the notification streaming pattern
- **API signature changes** - `requestBugreport()` and `setLongSupportMessage()`/`getLongSupportMessage()` gain a caller package name parameter. This is consistent with the broader trend of caller identification for audit and attribution
- **SecurityLog user categories** - four new user category constants: UNKNOWN (0), AFFILIATED_SECONDARY (1), GUEST (2), DEDICATED_TASK (3). These classify the user context for security log events in multi-user scenarios
- **DPMS refactoring** - `mPolicyHandlers` map replaced by `mStreamlinedPolicies`. New `mUserIdsSeenSinceBoot` set tracks user IDs. `isForceResetAdbProvisionedDoEnforced()` and `updateIncomingAdbPolicyCache()` added. Extensive null-check pattern normalisation (compiler-driven, no behaviour change)

**Cross-track note:** this build continues the canary-first pattern for advanced security telemetry. The four new SecurityLog tags and the streaming callback interface are canary-only - the QPR3 Beta track carries the XDR-style reporting classes but does not yet have the SecurityLog integration. The printing and USB device access policy domains are also canary-first. The StreamlinedPolicies generic API is the culmination of the handler hierarchy work that has been building since QPR1 Beta - it is expected to appear on the beta track once the underlying flags are enabled.
