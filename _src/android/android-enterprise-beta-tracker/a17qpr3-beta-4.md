---
title: 'Android 17 QPR3 Beta 4 - DP11.261030.003'
parent: 'Android Enterprise build tracker'
published: '2026-11-16'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: ['Android Enterprise build tracker', 'Android', 'aebt-release-notes', 'aebt-android-17', 'aebt-qpr3', 'aebt-beta']
categories: ['Android Enterprise build tracker']
layout: base.njk
eleventyNavigation:
    title: 'Android 17 QPR3 Beta 4'
---

**Track:** QPR3 Beta | **Predecessor:** [QPR3 Beta 3](/android/android-enterprise-beta-tracker/a17qpr3-beta-3/) | **Milestone:** March 2027 stable

QPR3 Beta 4 expands the enterprise surface with 19 new feature flags, new complex-type policies for Wi-Fi SSID and USB device access, and continued policy streamlining buildout. Five of the new flags specifically gate work-profile support for assistant and search experiences. No flags graduate to true in this build.

### Work profile feature gates for assistant and search (provisional)

Five new flags gate work-profile support for assistant and search experiences:

- `bonoboWorkProfileSupportEnabled` - Google assistant work profile support (provisional)
- `circleToSearchWorkProfileSupportEnabled` - Circle to Search in work profiles (provisional)
- `floatyWorkProfileSupportEnabled` - floating windows work profile support (provisional)
- `appFunctionsWorkProfileSupportEnabled` - app functions in work profiles (provisional)
- `workProfileAssistantCapabilitiesEnabled` - work profile assistant capabilities (provisional)

All return `false`. These signal that enterprise is a first-class consideration for the next generation of on-device AI and search features.

### Wi-Fi SSID restriction complex policy (provisional)

New `WifiSsidRestriction` policy type with allowlist/denylist enforcement. Admins can restrict which Wi-Fi SSIDs are available, with mutual exclusion (cannot set both allowlist and denylist). Backed by `WifiSsidRestrictionTransport` parcelling and `WIFI_SSID_RESTRICTION_METADATA`. Gated by `policyStreamliningWifiSsidPolicy` (false).

### USB device access complex policy (provisional)

Full `USB_DEVICE_ACCESS` complex-type policy with granular device matching: `vendorId` (0-65535), `productId` (0-65535), `classCode` (0-255). This allows fine-grained USB device allowlisting rather than the existing binary USB on/off approach. +354 lines in `DeviceConnectivityManagementPolicies.java`.

### Content safety fallback behaviour (provisional)

New `CONTENT_SAFETY_FALLBACK_BEHAVIOR` PolicyIdentifier with ALLOWED (2) / BLOCKED (1) values and `@ContentSafetyFallbackBehavior` annotation. Paired with `MANAGE_DEVICE_POLICY_CONTENT_SAFETY_FALLBACK_BEHAVIOR` permission in PermissionController (gated by `contentRestrictionApiV2`).

### Policy callback invoke-on-register pattern

Policy callback registration methods renamed from `addResolved*PolicyCallback` to `addAndInvokeResolved*PolicyCallback` and now return a `PolicyValueTransport` containing the current value at registration time. This eliminates the race condition where a callback could miss the current policy value between registration and the first invocation. Both device-wide and per-user variants updated.

### Network event type-safe parcelling

`retrieveNetworkLogs()` return type changed from `List<NetworkEvent>` to `ParceledListSlice<NetworkEvent.ParcelWrapper>`. New inner class `NetworkEvent.ParcelWrapper` added for type-safe parcelling across process boundaries. `NetworkLoggingHandler` refactored for multi-callback invocation.

### UserManager type extensibility

New `USER_BASE_TYPE_PROFILE` constant (`@SystemApi`), `getPossibleUserTypes(boolean)` method, and `isValidUserTypeNameFormat(String)` validation. Foundation for an extensible user-type framework that could support additional user types beyond the current fixed set.

### New DPM methods

- `hasDevicePolicyPermissionGlobally(int, String, String)` - `@SystemApi` MODULE_LIBRARIES global permission check
- `hasDevicePolicyPermissionForUser(int, String, String, UserHandle)` - `@SystemApi` MODULE_LIBRARIES per-user permission check

### Server-side changes

- **StreamlinedPolicies `Delegate` interface formalised** - six methods (`getDpcType`, `getEnforcingAdmin`, `getEnforcingAdminsForResolvedPolicy`, `getPermissionChecker`, `getProfileParentId`, `isProfileUser`) with `PolicyHandlerDelegate` wrapper routing through `DevicePolicyEngine`
- **`ProvisioningErrorFormatter`** (120 lines) - structured provisioning error message generation
- **`PrinterConfigurationsResolution`** (57 lines) and **`PrintingPolicies`** (177 lines) - printing policy infrastructure
- **`PolicyDefinitionFactory`** (+98 lines) - new `CONTENT_SAFETY_APPS`, `GENERIC_CONTENT_SAFETY_APP`, `AUDIT_LOGGING` definitions
- **`ProvisioningPreconditionChecker`** (+136 lines) - `IncompatibleAccountsTracker` integration

### Other changes

- **19 new flags** (all gated) including `disallowAdbSideloading`, `keyguardDisableQsTiles`, `multiUserPolicyEnabled`, `unifiedManagedDeviceApis`, `userTypePolicyEnabled`, `decoupleWifiEnterprise`, `enablePersonalContextWorkProfile`, `enableUserScopedResources`, `policyStreamliningPinnedLauncherItems`, `forceNewEsidCalculation`, `reapplyPermissionGrantOnPackageInstall`, `allowDedicatedTaskUserLogoutOnHsum`, `deviceManagementPrivacyDisclosure`
- **2 flags removed** - `policyStreamliningBluetoothSharing` and `policyStreamliningScreenCaptureApi` (never graduated, deleted)
- **5 new permissions** in PermissionController: printing, content safety fallback, pinned launcher items (manage + read), and physical SIM
- **GooglePermissionController** gains `DeviceStateAppFunctionService` exported service and runtime reads for `decouple_wifi_enterprise` and `unified_managed_device_apis` flags
- **ManagedProvisioning** gains `OBSERVE_ROLE_HOLDERS` permission and `DefaultUnprivilegedOnboardingTaskManager` task lifecycle
- **NexusLauncherRelease** adds work profile UI strings (`home_missing_work_profile_support`, work profile education, scheduler intent) and quiet-mode layout
