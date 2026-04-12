---
title: 'New in Android 16 for enterprise'
published: '2025-11-01'
status: publish
author: 'Jason Bayton'
excerpt: "A comprehensive look at what's new for enterprise in Android 16, including platform changes, AMAPI additions, and ecosystem updates."
type: documentation
tags:
    - Enterprise
eleventyNavigation:
  order: 3000
layout: base.njk
sources:
  - https://developer.android.com/work/versions/android-16
  - https://developers.google.com/android/management/release-notes
  - https://developer.android.com/about/versions/16/behavior-changes-16
  - https://developers.google.com/android/management/default-application-settings
  - https://developers.google.com/android/management/5g-network-slicing
---

Android 16 (API level 36) was released on June 10, 2025. It introduces new enterprise management capabilities and marks a shift in Android's release model - under Google's trunk stable approach, there is one major platform release per year with API and behaviour changes (Q2), and one minor platform release with new APIs but no behaviour changes (Q4). Separately, quarterly feature drops deliver AMAPI, ecosystem, and infrastructure updates independent of the platform release cycle.

Apps submitted to Google Play must target API 36 from **August 31, 2026**. Privately distributed apps not published to the public Play Store are not immediately affected.

This document covers the Android 16 platform features. For AMAPI and ecosystem additions that shipped alongside or after the platform release, see [Ecosystem and infrastructure changes](#ecosystem-and-infrastructure-changes) below.

## Network management

### Thread network control

Administrators can block the use of [Thread](https://www.threadgroup.org/) networks on managed devices using the `UserManager.DISALLOW_THREAD_NETWORK` restriction. Thread is a low-power mesh networking protocol used for IoT devices - in enterprise environments where IoT connectivity is tightly controlled, this restriction prevents managed devices from participating in Thread networks.

Available across all deployment modes once rolled out, regardless of OEM, EMM, or management mode.

### NFC controller management

Android 16 adds programmatic control over the NFC radio:

- `NfcAdapter.enable()` and `NfcAdapter.disable()` allow the DPC to toggle the NFC controller directly
- `UserManager.DISALLOW_CHANGE_NEAR_FIELD_COMMUNICATION_RADIO` prevents users from changing NFC settings themselves

This is useful for dedicated devices where NFC should only be active during specific workflows (e.g. point-of-sale), or for security policies that require NFC to be disabled fleet-wide.

For custom DPCs, these APIs are restricted to Device Owners and Profile Owners of company-owned devices. For AMAPI, NFC control is available through the device connectivity policy.


## Provisioning and setup

### Streamlined setup flow

The enterprise provisioning experience has been simplified. Education screens shown during setup have been removed as dedicated steps - any educational content now appears during loading screens, requiring no additional user interaction. The `EXTRA_PROVISIONING_SKIP_EDUCATION_SCREENS` intent extra is deprecated and ignored.

This reduces the number of taps required to complete provisioning, which is particularly helpful for large-scale deployments where every extra step adds friction.

### Automatic time and timezone

New `DevicePolicyManager` methods allow administrators to control automatic time and timezone synchronisation:

- `setAutoTimePolicy(int)` - controls whether the device obtains time from the network automatically
- `setAutoTimeZonePolicy(int)` - controls whether the timezone is obtained automatically

Available to DPCs of fully managed devices or work profiles on company-owned devices. For AMAPI, time and timezone management is handled through existing policy fields.

## App management

### AppFunctionManager policy

A new policy controls app functions - pieces of functionality that apps expose to the system for cross-app orchestration (for example, allowing one app to invoke a capability from another):

- On fully managed devices, administrators can disable app functions entirely
- On devices with work profiles, administrators can prevent personal profile apps from invoking app functions exposed by work profile apps

This provides a data boundary control for organisations concerned about cross-app data flow between managed and unmanaged contexts.

Available through `DevicePolicyManager.setAppFunctionsPolicy(int)` for custom DPCs. AppFunctions is currently in beta/experimental preview and the API surface is subject to change. AMAPI support is expected to follow.

## Security

### Advanced Protection mode

[Advanced Protection](https://support.google.com/accounts/answer/7539956) mode activates Google's strongest security features with a single toggle (Settings > Security & privacy > Advanced Protection > Device Protection). When enabled, it:

- Blocks installing apps from unknown sources permanently
- Blocks USB data transfer while the device is locked (new USB connections are charge-only; connections started while unlocked remain active)
- Enables automatic inactivity reboot (restarts the device after 72 hours of being locked)
- Activates theft protection, network security, and web browsing safety features
- Disables 2G and WEP connections

An Advanced Protection API allows third-party apps to check whether the mode is active and enable their own security hardening in response.

<div class="callout callout-orange">
<div class="callout-heading">User activation required</div>
Advanced Protection mode must be activated individually by users - it cannot currently be enforced centrally by IT administrators through AMAPI or a custom DPC. However, organisations can recommend or guide users to enable it as part of a security onboarding process.
</div>

### Identity Check

Identity Check requires biometric re-authentication for sensitive actions when the device is outside trusted locations. When enabled, actions such as changing passkeys, modifying security settings, or accessing sensitive app data require fingerprint or face authentication - PIN, pattern, or password alone are not sufficient.

<div class="callout callout-orange">
<div class="callout-heading">User activation required</div>
Identity Check must be activated by the user individually. AMAPI policy can be used to configure Identity Check settings on fully managed and COPE devices, but full admin enforcement is not yet available and is on Google's roadmap. See <a href="/android/android-enterprise-faq/identity-check-android/">What is Identity Check?</a> for more detail.
</div>

### Remote Key Provisioning (RKP) only

Devices launching with Android 16 support only Remote Key Provisioning for hardware attestation - factory-provisioned keys are no longer used. This means attestation certificates are short-lived and per-application, generated through Google's RKP infrastructure rather than burned into the device at the factory.

This is a continuation of the transition that began with Android 12 (RKP introduced), Android 13 (RKP became mandatory for new device launches), and Android 15 (RKP support was made optional for OEMs, with factory keys as the fallback). In Android 16, RKP is the only supported path.

Organisations relying on key attestation for device trust should ensure their attestation validation infrastructure supports RKP-issued certificates.

For more on the root certificate transition, see [Why is my key attestation validation failing?](/android/android-enterprise-faq/key-attestation-root-certificate-change/)

## Large screen behaviour changes

### Display rendering changes

Apps targeting API 36 can no longer enforce fixed orientation, aspect ratio, or resizability restrictions on displays with a smallest width of 600dp or greater. Specifically:

- `android:screenOrientation` is ignored
- `android:resizeableActivity="false"` is ignored
- Aspect ratio declarations (`android:minAspectRatio`, `android:maxAspectRatio`) are ignored
- `setRequestedOrientation()` has no effect

Apps fill the entire display window regardless of these declarations. This does **not** affect phones (sub-600dp screens), and lock task mode itself is unaffected - the change is in how apps render within a locked context.

A temporary opt-out is available via the `android.window.PROPERTY_COMPAT_ALLOW_RESTRICTED_RESIZABILITY` manifest property, but this will not apply from API level 37 onward.

**Enterprise impact**: kiosk and dedicated device deployments on tablets or large-screen hardware should audit apps for fixed orientation or non-resizable declarations. Apps that rely on a specific orientation for their UI layout may need updates. Test on target hardware before rolling out Android 16 to large-screen devices.

### Desktop windowing and connected displays (QPR3 - March 2026)

Android 16 QPR3 brings connected display support to general availability. When a compatible device is connected to an external monitor, it provides a full desktop windowing environment with:

- Free-form and maximised windows with a taskbar
- Mouse and keyboard support
- Cursor movement between the device screen and external display
- Multi-instance app support for apps that support it (e.g. Chrome, Keep)

For enterprise deployments, this means Android devices can serve as desktop replacements in specific use cases. Dedicated device deployments should test connected display behaviour to ensure kiosk or single-app configurations behave correctly when external displays are attached.

## Behaviour changes affecting all apps

### Local network permission (opt-in)

Android 16 introduces a new permission model for local network access. Previously, any app with the `INTERNET` permission could access LAN resources (mDNS, SSDP, raw sockets to local addresses). Android 16 introduces a new runtime permission that gates LAN access separately.

In Android 16, this is **opt-in only** - apps must declare they want to be subject to the new permission model. Mandatory enforcement begins with **Android 17** (API level 37), where apps targeting API 37 or higher must either request the `ACCESS_LOCAL_NETWORK` runtime permission or use system-mediated device pickers. Enterprise apps that interact with local network devices (printers, IoT hardware, point-of-sale systems) should plan for this change.

### NFC and Bluetooth changes

Android 16 includes Bluetooth stack changes for improved connectivity with peripheral devices, including new intents for bond loss (`ACTION_KEY_MISSING`) and encryption state changes (`ACTION_ENCRYPTION_CHANGE`). Enterprises using Bluetooth peripherals (scanners, printers, payment terminals) should test device pairing stability after the update.

## Ecosystem and infrastructure changes

The following features shipped via AMAPI updates, Google Play infrastructure, or other ecosystem services around the Android 16 timeframe. They are not Android 16 platform changes but are relevant to the enterprise story.

### APN configuration (AMAPI - May 2025)

AMAPI gained `apnPolicy` support (within `deviceConnectivityManagement`), allowing administrators to define and enforce Access Point Names directly through policy. Policy-enforced APNs override any user-configured APNs on the device. This is particularly relevant for organisations using private mobile networks or requiring specific carrier APN settings across a fleet.

Custom DPCs have had APN management through `DevicePolicyManager.addOverrideApn()` since Android 9 (API level 28).

### 5G network slicing (AMAPI - May 2025)

AMAPI supports [5G network slicing](https://developers.google.com/android/management/5g-network-slicing) configuration, allowing organisations to route business application traffic through dedicated virtual network slices.

5G slicing support in Android is not new to Android 16 - work profile-wide routing has been available since Android 12 via `preferentialNetworkService`, and per-app routing with up to five slices was introduced in Android 13 via `preferentialNetworkServiceSettings`. The May 2025 AMAPI release expanded documentation and policy support for these capabilities.

Requires carrier support and compatible 5G hardware.

### EID retrieval for eSIM management (AMAPI - April 2025)

Administrators can retrieve device EID (Embedded Identity Document) values, which identify the embedded SIM hardware in a device. This supports scalable eSIM provisioning workflows where EID values need to be exported to carrier partners.

In AMAPI, the EID is available through the `EuiccChipInfo` field within `HardwareInfo` for corporate-owned devices. For personally-owned (BYOD) devices, a `REQUEST_DEVICE_INFO` command retrieves the EID separately.

On company-owned devices running Android 15+, administrators can also control whether users can add eSIM profiles themselves through the `userInitiatedAddEsimSettings` policy.

For more detail, see [How do I manage eSIM profiles on managed devices?](/android/android-enterprise-faq/manage-esim/)

### Android App Bundles for private apps (March 2025)

The Managed Google Play iFrame now supports [Android App Bundle](https://developer.android.com/guide/app-bundle) (AAB) uploads for private apps. Previously, private apps could only be uploaded as APKs through the iFrame.

AAB support enables larger app sizes and the full benefits of app bundles (optimised delivery, reduced download sizes per device). When creating new private apps through the iFrame, a Google-generated signing key is used. Existing apps can be migrated to AAB by uploading the signing key through the Play Console.

### Default application management (AMAPI - October 2025)

AMAPI supports remotely setting and enforcing [default applications](https://developers.google.com/android/management/default-application-settings) through the `defaultApplicationSettings` policy field. Administrators can provide a prioritised list of applications for each default app type (browser, phone dialler, SMS handler, and others). The system evaluates the list in order and sets the first installed, qualifying app as the default.

Optionally, users can be prevented from changing the default app selection. Starting with Android 16, device status reports also include `defaultApplicationInfo` if reporting is enabled.

For more detail, see [Can I control default applications through AMAPI?](/android/android-enterprise-faq/amapi-default-applications/)

### Zero-touch customer portal improvements

The zero-touch customer portal received two significant upgrades:

**Audit logging** - all actions in the zero-touch customer account are now logged with comprehensive detail, including who made the change, what changed, and before/after values. Logs are retained for a maximum of one year, with data available from March 2025 onward. Logs can be filtered by date range or searched by IMEI/serial number, and exported to CSV. See Google's [audit log documentation](https://support.google.com/work/android/answer/16042697) for details.

**Role-based access control** - three new roles have been added alongside the existing Owner and Admin roles:

- **Manager** - can manage devices and configurations
- **Assigner** - can assign devices to configurations
- **Viewer** - read-only access to portal data

### Conversational management via MCP (February 2026)

Google launched a Model Context Protocol (MCP) server for the Android Management API, enabling AI assistants to query enterprise device management data through natural language. The initial release is read-only - it retrieves fleet data but cannot modify policies or device state.

For more detail, see [What is the AMAPI MCP server?](/android/android-enterprise-faq/amapi-mcp-server/)

### Corporate badges in Google Wallet

Employees can add corporate ID badges to Google Wallet for NFC-based building access. This feature works on **Android 9.0+** devices with NFC, and is not specific to Android 16. The ability to provision corporate badges on managed devices through enterprise management was highlighted alongside the Android 16 enterprise feature drop.

For provisioning details, see Google's [corporate badge documentation](https://support.google.com/work/android/answer/16746772).