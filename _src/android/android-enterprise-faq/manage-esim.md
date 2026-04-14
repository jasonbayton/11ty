---
title: "Is it possible to manage eSIM?"
published: '2024-11-11'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - General
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 1111
sources:
  - https://developer.android.com/work/versions/android-15
  - https://developers.google.com/android/management/reference/rest/v1/enterprises.devices/issueCommand
  - https://developers.google.com/android/management/reference/rest/v1/enterprises.devices
  - https://source.android.com/docs/core/connect/esim-euicc-api
--- 

Yes. From Android 15, AMAPI supports remote provisioning and management of eSIM profiles on managed devices. This includes deploying profiles, removing them, and controlling whether end users can add their own.

## How eSIM provisioning works

Enterprise eSIM deployment relies on the GSMA's SM-DP+ (Subscription Manager Data Preparation Plus) infrastructure. The flow works like this:

1. The organisation coordinates with a carrier to create eSIM profiles, providing device EIDs (Embedded Identity Document identifiers) so profiles are bound to specific hardware
2. The carrier prepares profiles on their SM-DP+ server and returns activation codes to the organisation
3. The EMM administrator pushes the activation code to the target device via the `ADD_ESIM` command
4. The device's Local Profile Assistant (LPA) connects to the SM-DP+ server, authenticates with its EID, and downloads the encrypted profile
5. The profile is installed on the device's eUICC and optionally activated

Where a partial eSIM profile is deployed - containing only a pointer to the SM-DP+ server rather than a full activation code - the device fetches the full configuration itself. This simplifies provisioning when device EIDs are pre-registered with the carrier.

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">Connectivity bootstrapping</div>

The device must already be online (typically via Wi-Fi or an existing SIM) to receive the ADD_ESIM command and download the profile. eSIM cannot provide the initial connectivity needed for enrolment - the device needs network access first.

</div>

## AMAPI capabilities

AMAPI provides three eSIM-related commands via `enterprises.devices.issueCommand`:

### ADD_ESIM (Android 15+)

Deploys an eSIM profile to the device. Parameters include:

- **activationCode** - the SM-DP+ activation code provided by the carrier
- **activationState** - controls whether the profile activates immediately after download:
  - `ACTIVATED` - the profile activates silently (company-owned devices only; rejected on personally-owned devices)
  - `NOT_ACTIVATED` - the profile downloads but the user must manually activate it

On success, the command returns the ICC ID of the installed profile.

### REMOVE_ESIM (Android 15+)

Deletes an eSIM profile from the device. Requires the `iccId` of the profile to remove.

### REQUEST_DEVICE_INFO

Retrieves the device EID on personally-owned devices (Android 13+), where EID is not automatically reported. The user is prompted to approve disclosure - they can decline.

## EID retrieval

Getting the EID is the first step in most eSIM workflows, since carriers need it to bind profiles to hardware.

- **Company-owned devices (Android 13+):** The EID is reported automatically via the `euiccChipInfo` field within `HardwareInfo` in the device resource. No user interaction needed.
- **Personally-owned devices (Android 13+):** The EID requires the `REQUEST_DEVICE_INFO` command. The user sees a prompt and can approve or decline. The command returns `PENDING_USER_ACTION` until the user responds, or `USER_DECLINED` if they refuse.

## User controls

On company-owned devices (Android 15+), the `userInitiatedAddEsimSettings` field within `deviceRadioState` controls whether users can add their own eSIM profiles. When restricted, users cannot add eSIMs through device settings - only admin-deployed profiles are permitted.

The `DISALLOW_CONFIG_MOBILE_NETWORKS` user restriction prevents users from deleting admin-managed eSIMs on company-owned devices.

On personally-owned work profile devices, users always retain the ability to delete managed eSIMs. This cannot be overridden.

## Behaviour on work profile removal

On Android 16+, when a work profile is removed from a personally-owned device, managed eSIM profiles are always wiped regardless of other policy settings. This is a platform-enforced behaviour to ensure carrier subscriptions provisioned through the enterprise do not persist after management is removed.

On company-owned devices, the behaviour depends on the wipe command configuration - eSIMs can optionally be retained or removed during a device wipe.

## Multiple Enabled Profiles (MEP)

Android 13 introduced support for Multiple Enabled Profiles, allowing a single eUICC chip to maintain multiple simultaneously active profiles. This enables dual SIM dual standby (DSDS) from a single eSIM chip - useful in enterprise scenarios where a device needs both a corporate and personal carrier subscription on one eSIM.

MEP requires hardware support - the device must declare the `android.hardware.telephony.euicc.mep` feature flag. Not all devices with eSIM support MEP.

## Custom DPC capabilities

Custom DPCs have limited eSIM management capabilities compared to AMAPI. The Android platform's `EuiccManager` class provides methods for downloading, switching, and deleting profiles (available since Android 9), but:

- **EID access** requires carrier privilege or `READ_PRIVILEGED_PHONE_STATE` - a privileged permission that third-party DPCs typically cannot hold. The AMAPI SDK (v1.7.0+) provides a workaround for custom DPCs that have integrated the SDK
- **Silent activation** and the managed eSIM lifecycle (user deletion prevention, wipe-behaviour policies) are built into Android Device Policy. Custom DPCs must use AMAPI SDK commands to access these capabilities
- The LPA (Local Profile Assistant) functionality is restricted to system apps

In practice, eSIM management through a custom DPC requires AMAPI SDK integration. Pure Play EMM API-based custom DPCs without the SDK cannot access the managed eSIM features introduced in Android 15.

## Carrier requirements

eSIM management depends entirely on carrier cooperation:

- The carrier must support enterprise bulk eSIM provisioning via SM-DP+
- Activation codes must be generated and provided to the organisation
- Not all carriers offer enterprise eSIM management - check with your carrier before planning an eSIM deployment
- Some carriers charge separately for eSIM provisioning services or require enterprise agreements

## Reporting

AMAPI provides eSIM telemetry through the device resource:

- **ICC ID** - available on Android 13+ for all SIM cards
- **Activation state** - reported for admin-managed eSIMs on Android 15+
- **Config mode** - indicates how the eSIM was configured (admin-managed vs user-added) on Android 15+
- **Telephony info** - general telephony information is available for all SIMs on fully managed devices (Android 6+), and for admin-added eSIMs across all management modes on Android 15+
