---
title: 'AMAPI policy compatibility'
published: '2025-01-19'
status: publish
permalink: false
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
layout: base.njk
eleventyNavigation:
  order: 7000
---.

**Deployment Scenarios:**

- **Fully Managed Device (FMD)**
- **Dedicated Device (DD)**
- **Company-Owned Device with Work Profile (COPE)**
- **Personally-Owned Device with Work Profile (BYOD)**

---

### Policy Settings Compatibility Table

| **Policy Setting**                               | **FMD** | **DD** | **COPE** | **BYOD** | **Minimum Android Version** |
|--------------------------------------------------|---------|---------|----------|----------|-----------------------------|
| `addUserDisabled`                                | Yes     | Yes     | Yes      | No       | 7.0                         |
| `adjustVolumeDisabled`                           | Yes     | Yes     | No       | No       | 6.0                         |
| `advancedSecurityOverrides`                      | Yes     | Yes     | Yes      | Yes      | 9.0                         |
| `alwaysOnVpnPackage`                             | Yes     | Yes     | Yes      | Yes      | 6.0                         |
| `applications`                                   | Yes     | Yes     | Yes      | Yes      | 5.0                         |
| `autoTimeRequired`                               | Yes     | Yes     | Yes      | No       | 5.0                         |
| `blockApplicationsEnabled`                       | Yes     | Yes     | No       | No       | 9.0                         |
| `bluetoothConfigDisabled`                        | Yes     | Yes     | No       | No       | 6.0                         |
| `cameraDisabled`                                 | Yes     | Yes     | Yes      | No       | 5.0                         |
| `complianceRules`                                | Yes     | Yes     | Yes      | Yes      | 5.0                         |
| `createWindowsDisabled`                          | Yes     | Yes     | No       | No       | 6.0                         |
| `credentialsConfigDisabled`                      | Yes     | Yes     | No       | No       | 6.0                         |
| `dataRoamingDisabled`                            | Yes     | Yes     | No       | No       | 5.0                         |
| `debuggingFeaturesAllowed`                       | Yes     | Yes     | No       | No       | 5.0                         |
| `defaultPermissionPolicy`                        | Yes     | Yes     | Yes      | No       | 6.0                         |
| `factoryResetDisabled`                           | Yes     | Yes     | Yes      | No       | 7.0                         |
| `frpAdminEmails`                                 | Yes     | Yes     | No       | No       | 6.0                         |
| `funDisabled`                                    | Yes     | Yes     | No       | No       | 6.0                         |
| `installAppsDisabled`                            | Yes     | Yes     | No       | No       | 6.0                         |
| `installUnknownSourcesAllowed`                   | Yes     | Yes     | Yes      | No       | 6.0                         |
| `keyguardDisabled`                               | Yes     | Yes     | No       | No       | 6.0                         |
| `keyguardDisabledFeatures`                       | Yes     | Yes     | Yes      | No       | 5.0                         |
| `kioskCustomLauncherEnabled`                     | No      | Yes     | No       | No       | 5.0                         |
| `locationMode`                                   | Yes     | Yes     | Yes      | No       | 5.0                         |
| `longSupportMessage`                             | Yes     | Yes     | Yes      | Yes      | 5.0                         |
| `maximumTimeToLock`                              | Yes     | Yes     | Yes      | No       | 5.0                         |
| `minimumApiLevel`                                | Yes     | Yes     | No       | No       | 5.0                         |
| `mobileNetworksConfigDisabled`                   | Yes     | Yes     | No       | No       | 6.0                         |
| `modifyAccountsDisabled`                         | Yes     | Yes     | No       | No       | 6.0                         |
| `mountPhysicalMediaDisabled`                     | Yes     | Yes     | No       | No       | 5.0                         |
| `networkEscapeHatchEnabled`                      | Yes     | Yes     | No       | No       | 6.0                         |
| `networkResetDisabled`                           | Yes     | Yes     | No       | No       | 6.0                         |
| `outgoingBeamDisabled`                           | Yes     | Yes     | No       | No       | 6.0                         |
| `passwordPolicies`                               | Yes     | Yes     | Yes      | Yes      | 5.0                         |
| `passwordRequirements`                           | Yes     | Yes     | Yes      | No       | 5.0                         |
| `permissionGrants`                               | Yes     | Yes     | Yes      | Yes      | 6.0                         |
| `permittedInputMethods`                          | Yes     | Yes     | No       | No       | 6.0                         |
| `persistentPreferredActivities`                  | Yes     | Yes     | No       | No       | 5.0                         |
| `policyEnforcementRules`                         | Yes     | Yes     | Yes      | Yes      | 6.0                         |
| `recommendedGlobalProxy`                         | Yes     | Yes     | No       | No       | 5.0                         |
| `removeUserDisabled`                             | Yes     | Yes     | Yes      | No       | 7.0                         |
| `safeBootDisabled`                               | Yes     | Yes     | No       | No       | 6.0                         |
| `screenCaptureDisabled`                          | Yes     | Yes     | Yes      | Yes      | 5.0                         |
| `setUserIconDisabled`                            | Yes     | Yes     | No       | No       | 6.0                         |
| `setWallpaperDisabled`                           | Yes     | Yes     | No       | No       | 5.0                         |
| `shareLocationDisabled`                          | Yes     | Yes     | Yes      | No       | 6.0                         |
| `shortSupportMessage`                            | Yes     | Yes     | Yes      | Yes      | 5.0                         |
| `skipFirstUseHintsEnabled`                       | Yes     | Yes     | No       | No       | 6.0                         |
| `smsDisabled`                                    | Yes     | Yes     | No       | No       | 5.0                         |
| `statusBarDisabled`                              | No      | Yes     | No       | No       | 6.0                         |
| `statusReportingSettings`                        | Yes     | Yes     | Yes      | Yes      | 5.0                         |
| `stayOnPluggedModes`                             | Yes     | Yes     | No       | No       | 6.0                         |
| `systemUpdate`                                   | Yes     | Yes     | No       | No       | 5.0                         |
| `tetheringConfigDisabled`                        | Yes     | Yes     | No       | No       | 5.0                         |
| `uninstallAppsDisabled`                          | Yes     | Yes     | No       | No       | 5.0                         |
| `unmuteMicrophoneDisabled`                       | Yes     | Yes     | No       | No       | 6.0                         |
| `usbFileTransferDisabled`                        | Yes     | Yes     | No       | No       | 6.0                         |
| `usbMassStorageEnabled`                          | Yes     | Yes     | No       | No       | 5.0                         |
| `vpnConfigDisabled`                              | Yes     | Yes     | No       | No       | 6.0                         |
| `wifiConfigDisabled`                             | Yes     | Yes     | No       | No       | 5.0                         |
| `wifiConfigsLockdownEnabled`                     | Yes     | Yes     | No       | No       | 5.0                         |
| `wifiRoamingConfigDisabled`                      | Yes     | Yes     | No       | No       | 8.0                         |
| `bluetoothDisabled`                              | Yes     | Yes     | No       | No       | 5.0                         |
| `cellBroadcastsConfigDisabled`                   | Yes     | Yes     | No       | No       | 6.0                         |
| `dateTimeConfigDisabled`                         | Yes     | Yes     | No       | No       | 6.0                         |
| `factoryResetProtectionPolicy`                   | Yes     | Yes     | No       | No       | 6.0                         |
| `encryptionPolicy`                               | Yes     | Yes     | No       | No       | 6.0                         |
| `minimumPasswordLength`                          | Yes     | Yes     | Yes      | Yes      | 5.0                         |
| `passwordQuality`                                | Yes     | Yes     | Yes      | Yes      | 5.0                         |
| `requirePasswordUnlock`                          | Yes     | Yes     | Yes      | Yes      | 5.0                         |
| `maximumFailedPasswordsForWipe`                  | Yes     | Yes     | Yes      | No       | 5.0                         |
| `passwordExpirationTimeout`                      | Yes     | Yes     | Yes      | No       | 5.0                         |
| `passwordHistoryLength`                          | Yes     | Yes     | Yes      | No       | 5.0                         |
| `maximumTimeToUnlock`                            | Yes     | Yes     | Yes      | No       | 5.0                         |
| `strongAuthUnlockTimeout`                        | Yes     | Yes     | Yes      | No       | 6.0                         |
| `autoUpdatePolicy`                               | Yes     | Yes     | No       | No       | 6.0                         |
| `bluetoothContactSharingDisabled`                | Yes     | Yes     | Yes      | No       | 6.0                         |
| `kioskCustomization`                             | No      | Yes     | No       | No       | 6.0                         |
| `advancedSecurityOverrides.untrustedAppsPolicy`  | Yes     | Yes     | Yes      | Yes      | 9.0                         |

---

**Notes:**

- **Yes** indicates the policy is applicable in the deployment scenario.
- **No** indicates the policy is not applicable in the deployment scenario.
- **Minimum Android Version** specifies the lowest Android version that supports the policy.

**Deployment Scenario Definitions:**

- **Fully Managed Device (FMD)**: Company-owned devices where the organization manages the entire device.
- **Dedicated Device (DD)**: Company-owned devices intended for a specific purpose (e.g., kiosks), also known as corporate-owned single-use (COSU) devices.
- **Company-Owned Device with Work Profile (COPE)**: Company-owned devices that have both work and personal profiles.
- **Personally-Owned Device with Work Profile (BYOD)**: Personal devices where only the work profile is managed by the organization.

---

**Explanation:**

- **Fully Managed Devices** have the broadest policy support since the entire device is under management.
- **Dedicated Devices** support most device-level policies but may have limitations based on their specialized use.
- **Company-Owned Devices with Work Profile** support both device-level and work-profile-level policies, but some device-level policies may not be applicable.
- **Personally-Owned Devices with Work Profile** primarily support policies within the work profile to respect user privacy; device-level policies are generally not applicable.

---
