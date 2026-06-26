---
title: 'New in Android 17 for enterprise'
published: '2026-06-26'
status: publish
author: 'Jason Bayton'
excerpt: "A comprehensive look at what's new for enterprise in Android 17, including platform changes, behaviour changes, and security improvements."
type: documentation
tags:
    - Enterprise
eleventyNavigation:
  order: 3100
layout: base.njk
sources:
  - https://developer.android.com/work/versions/android-17
  - https://developer.android.com/about/versions/17/behavior-changes-all
  - https://developer.android.com/about/versions/17/behavior-changes-17
  - https://developer.android.com/about/versions/17/features
  - https://developer.android.com/privacy-and-security/local-network-permission
  - https://developer.android.com/privacy-and-security/security-config
  - https://certificate.transparency.dev/
  - https://developer.android.com/ai/appfunctions
  - https://developers.google.com/identity/sms-retriever/overview
  - https://blog.google/security/whats-new-in-android-security-privacy-2026/
  - https://blog.google/products-and-platforms/platforms/android/android-show-io-edition-2026/
---

Android 17 (API level 37) was released to Pixel devices on June 16, 2026, with other OEMs expected to follow from late Q3 2026. Apps submitted to Google Play will be required to target API 37 from mid-2027 (exact date TBC).

This document covers both the features listed on Google's [official enterprise features page](https://developer.android.com/work/versions/android-17) and additional platform behaviour changes that carry significant enterprise impact.

## AI and automation controls

Android 17 sharpens enterprise management of on-device AI, with controls addressing two different aspects of agent behaviour. One (agentic automation) is new in Android 17; the other (App Functions) builds on a control introduced in Android 16.

### Agentic automation policy

A framework is established for AI agents to automate app workflows on Android 17. By default, automation is blocked inside work profiles, meaning AI agents cannot interact with managed apps in the work profile context.

On fully managed devices and the personal profile of COPE devices, administrators can disable AI automation entirely using:

```java
DevicePolicyManager.setNearbyAppStreamingPolicy(int)
```

This reuses the existing `setNearbyAppStreamingPolicy` API, which originally controlled nearby device streaming. On Android 17, the same method serves as the control point for agentic automation.

**Enterprise impact**: organisations concerned about AI agents interacting with corporate data or workflows have a policy-level control to disable it. The work profile boundary provides automatic protection for managed apps on BYOD devices. On fully managed devices, the default behaviour allows automation - administrators who want to restrict it must set the policy explicitly.

**AMAPI**: no AMAPI policy field for agentic automation control has been published as of June 2026. Custom DPCs can use the API directly.

### Device state for LLMs (App Functions)

Authorised assistant applications can consume device-level data through the [App Functions framework](https://developer.android.com/ai/appfunctions) to provide context-aware responses from on-device AI agents.

Key behaviour:
- Work profile data is **excluded** - the App Functions pipeline does not return data from work profile apps
- Administrators can globally disable the pipeline using `DevicePolicyManager.setAppFunctionsPolicy(DevicePolicyManager.APP_FUNCTIONS_DISABLED)`
- The `MANAGE_DEVICE_POLICY_APP_FUNCTIONS` permission is required to call this API

This is not new to Android 17. The `setAppFunctionsPolicy()` API and the `APP_FUNCTIONS_DISABLED` constant were both introduced in Android 16. What Android 17 adds is greater enterprise focus and documentation, including confirmed work profile isolation, rather than a brand-new control. The App Functions framework itself remains an evolving area rather than a finalised API.

**Enterprise impact**: the default behaviour allows assistant apps to read device-level data from the personal profile. Organisations deploying COPE or fully managed devices should evaluate whether this is acceptable. On work profile (BYOD) devices, work data is automatically excluded.

**AMAPI**: no AMAPI policy field for App Functions has been published as of June 2026. Custom DPCs can use `setAppFunctionsPolicy()` directly.

## Security and data protection

### Cross-profile loopback traffic blocked

Android 17 blocks cross-profile loopback traffic by default. Apps can no longer use localhost/loopback (127.0.0.1) connections to communicate across the personal and work profiles. Loopback traffic within the same profile is unaffected.

This change applies to **all apps** running on Android 17, regardless of target API level. There are no documented exceptions or opt-outs.

**Enterprise impact**: this is a security hardening measure that strengthens work profile isolation at the network level. Most enterprise apps will not be affected, as cross-profile loopback communication was never a documented or supported pattern. However, organisations should be aware that any app relying on localhost networking to bridge data between profiles will break on Android 17. This is most likely to affect bespoke internal apps or niche tooling that used loopback as an unofficial cross-profile data channel. The existing cross-profile data sharing policies (intent sharing, connected apps, clipboard) remain the supported mechanisms for controlled data exchange between profiles.

### Certificate Transparency enabled by default

Apps targeting API 37 have [Certificate Transparency](https://certificate.transparency.dev/) (CT) enabled by default. CT was opt-in in Android 16; Android 17 makes it the default for targeting apps, though apps can still opt out globally or per-domain in their [network security configuration](https://developer.android.com/privacy-and-security/security-config).

CT requires that certificates presented during a TLS handshake include Signed Certificate Timestamps (SCTs) from public CT logs. Most public CAs already include SCTs, but internal enterprise CAs typically do not.

Crucially, CT verification is **automatically disabled for connections that rely on user-added or custom (inline) trust anchors**, which is how private enterprise CAs are almost always configured on managed devices. Localhost is also exempt. As a result, most internal services behind a private CA are unaffected by default.

**Enterprise impact**: in practice CT does not break private-CA internal services unless an app is configured to validate those domains against the system trust store with CT enforced. Organisations should still be mindful of the default for public endpoints, and review their network security configuration if they explicitly enable CT for internal domains. Apps targeting older API levels are unaffected entirely.

### HID access control

Direct application access to raw Human Interface Device (HID) datastreams is now gated behind a dedicated `ACCESS_HID` permission in Android 17. Previously, apps with USB host permissions could access HID devices without an additional gate.

Administrators can implicitly block HID access on managed devices using:

```java
DevicePolicyManager.setUsbDataSignalingEnabled(false)
```

**Enterprise impact**: this adds a permission layer for apps that interact with USB input devices such as barcode scanners, card readers, or specialised industrial peripherals. Organisations deploying apps that use the HID API directly should ensure the `ACCESS_HID` permission is declared and test the access flow on target devices. Google's enterprise documentation describes this as a dangerous-level permission, but the platform API reference lists a more restricted protection level, so do not assume a standard user-facing runtime prompt will appear. For environments where HID access must be blocked entirely, the existing USB data signalling restriction serves as the enforcement mechanism.

**AMAPI**: USB data signalling control is available through `usbDataAccess` within `deviceConnectivityManagement`.

### USB4 and Thunderbolt PCIe tunnelling

Android 17 adds support for high-speed USB4 and Thunderbolt PCIe tunnelling. Importantly, this respects the existing USB data layer restrictions:

```java
DevicePolicyManager.setUsbDataSignalingEnabled(false)
```

If USB data access is restricted via policy, high-speed PCIe tunnels are blocked. This prevents data exfiltration through high-speed connections on managed devices where USB data transfer is restricted.

**Enterprise impact**: for most deployments, this requires no action. The existing USB data access policies automatically extend to cover the new high-speed tunnelling capability. Organisations using docking stations or Thunderbolt peripherals with managed devices should verify that their USB data access policy settings are appropriate for their use case.

### Theft protection on by default

Android 17 enables theft protection features by default on all new devices, factory-reset devices, and devices upgraded to Android 17. Previously, users had to opt in to these protections. The features enabled by default include:

- **Theft Detection Lock** - uses on-device motion sensors and machine learning to detect device snatching, then immediately locks the device
- **Remote Lock** - allows users to lock a lost device using their phone number from any device, without needing a Find My Device sign-in

Additional Android 17 theft hardening:
- **Mark as Lost** (Find Hub) now requires biometric authentication to unlock, in addition to the device passcode
- **PIN/password brute-force protection** on supported devices reduces unlock attempts and adds longer wait times between failures
- **IMEI on lock screen** makes the device IMEI visible from the lock screen (Android 12+) for ownership verification

**Enterprise impact**: on managed devices, administrators already have more granular control over lock behaviour, FRP, and device wipe through AMAPI or custom DPC policies. The main benefit is baseline security improvement - Android 17 devices ship with stronger theft protections active from initial setup, complementing whatever policies the EMM applies during enrolment. For BYOD devices with a work profile, these protections reduce the risk of corporate data exposure if the personal device is stolen during the window between theft and a remote wipe command. Administrators should be aware that the Mark as Lost biometric requirement may affect field support workflows where a colleague needs to access a device on behalf of a user.

### Advanced Protection Mode - enterprise management confirmed

Advanced Protection Mode (AAPM) was introduced in Android 16 as a user-initiated opt-in feature. When active, it enforces several restrictions at the platform level, including blocking sideloading, restricting USB data signalling, and mandating Play Protect scanning.

<div class="callout callout-green">
<div class="callout-heading callout-heading-small">Confirmed at Google I/O 2026</div>

At The Android Show: I/O Edition (May 12, 2026), Google [officially confirmed](https://blog.google/security/whats-new-in-android-security-privacy-2026/) that enterprise policy enforcement of Advanced Protection is coming later in 2026 with Android 17. Organisations will be able to **enable Advanced Protection by policy for managed devices**, allowing IT administrators to apply the full set of hardened protections across their fleet without relying on individual user activation.

Google has not yet specified whether this will be delivered as an AMAPI policy field, a custom DPC API, or both. No specific policy details have been published, but enterprise support is confirmed for later this year.

</div>

**Enterprise impact**: until the AMAPI policy for Advanced Protection is published, AAPM remains user-initiated. Once the enterprise policy ships, administrators will be able to enforce Advanced Protection as a single security baseline rather than configuring individual restrictions separately. For full coverage, see [What is Advanced Protection, and can it be managed?](/android/android-enterprise-faq/what-is-advanced-protection-mode/).

## Network and connectivity

### Local network permission enforcement

The `ACCESS_LOCAL_NETWORK` permission becomes mandatory for apps targeting API 37. This is the most significant enterprise-relevant behaviour change in Android 17.

- Apps targeting Android 17 are **blocked from accessing local network resources by default** - including mDNS/SSDP discovery, TCP/UDP connections to LAN devices, and NSD service resolution
- Apps targeting lower API levels get a **temporary implicit grant** if they hold the `INTERNET` permission, but this is a compatibility measure that will be removed in a future release
- IT administrators can pre-grant the permission using `DevicePolicyManager.setPermissionGrantState()`, avoiding runtime prompts on managed devices

**Enterprise impact**: apps that communicate with local printers, IoT devices, POS systems, Chromecast/casting targets, or on-premises services will need to request this permission. Line-of-business apps targeting API 37 should be tested for local network access before fleet-wide deployment.

**AMAPI**: the standard `permissionGrant` mechanism within `ApplicationPolicy` can be used to set `ACCESS_LOCAL_NETWORK` to `GRANT` for specific apps.

### Encrypted Client Hello (ECH)

Android 17 enables Encrypted Client Hello (ECH) by default for apps targeting API 37. ECH is a TLS extension that encrypts the Server Name Indication (SNI) field during the TLS handshake. When enabled, ECH is used if the remote server advertises support for it (sending ECH GREASE otherwise), with a transparent fallback to standard TLS where it is not available.

Apps can control ECH per-domain using the `<domainEncryption>` element in the network security configuration. Its `mode` takes either `enabled` or `disabled`; the default is `enabled` for apps targeting API 37 and `disabled` otherwise.

**Enterprise impact**: enterprises using transparent TLS inspection proxies that rely on reading the SNI to route or filter traffic may find that ECH prevents domain identification for connections to servers that support it. Network security teams should evaluate whether their proxy infrastructure handles ECH correctly, and apps connecting to inspection-sensitive internal networks may need ECH disabled via network security configuration.

### VPN app exclusion (split tunnelling)

Android 17 introduces `ACTION_VPN_APP_EXCLUSION_SETTINGS`, a standardised intent that VPN apps can use to open a system-managed settings screen where users select specific apps to bypass the VPN tunnel. Traffic from excluded apps routes over the underlying network directly.

This is a VPN-app-initiated feature - the system screen only appears when the VPN app explicitly invokes the intent. If the VPN app does not adopt it, users see no change.

**Enterprise impact**: the risk depends on whether the enterprise VPN app implements this intent. If it does, users on work profile (BYOD) devices could exclude work apps from the VPN, potentially routing corporate traffic outside the tunnel. Administrators should:

- Check with their VPN vendor whether the app will adopt the new intent, and whether managed configurations can disable it
- Review whether `vpnConfigDisabled: true` (AMAPI) or `DISALLOW_CONFIG_VPN` (custom DPC) prevents access to the exclusion screen
- On fully managed devices with always-on VPN and lockdown enabled, the practical risk is lower, as the administrator controls VPN configuration end-to-end

This does not change the underlying per-app VPN capability that already exists through `VpnService.Builder`. What is new is a standardised, persistent, user-facing interface for it.

## App and platform behaviour changes

### Contacts Picker enhancement

The system Contacts Picker is enhanced in Android 17 to allow apps to receive full-fidelity contact records across profile boundaries, transitioning to a secure one-by-one user selection model. Rather than apps querying the contacts provider directly across profiles, the system picker mediates the interaction and only shares individual records the user explicitly selects.

Cross-profile contact visibility remains governed by:

```java
DevicePolicyManager.setCrossProfileContactsSearchDisabled(ComponentName, boolean)
```

**Enterprise impact**: this is a positive change for data boundary enforcement. Apps that previously needed broad cross-profile contacts access to show a single contact can now use the picker to get exactly the record they need, with user consent. The existing `setCrossProfileContactsSearchDisabled()` policy continues to function as the master switch.

### Large screen orientation enforcement (mandatory)

Android 16 introduced restrictions preventing apps from enforcing fixed orientation, aspect ratio, or resizability on displays 600dp or wider, but allowed apps to opt out via `android.window.PROPERTY_COMPAT_ALLOW_RESTRICTED_RESIZABILITY`. **Android 17 removes the opt-out** - all apps targeting API 37 must support free-form orientation and resizing on large screens.

**Enterprise impact**: organisations deploying tablets, foldables, or connected displays as managed devices should test line-of-business and kiosk apps for layout issues. Apps that relied on fixed portrait or landscape orientation on large screens will need UI updates before targeting API 37. Lock task mode itself is unaffected - the change is in how apps render within a locked context.

### SMS OTP three-hour access delay

Android 17 delays programmatic access to SMS messages containing one-time passwords (OTPs) by three hours for most apps **targeting API 37 or higher**. During the delay, the `SMS_RECEIVED_ACTION` broadcast is withheld and SMS provider database queries are filtered for messages identified as containing OTPs. A related protection applies to WebOTP-format messages where an app is not the intended recipient, regardless of target API level.

Exempt apps include the default SMS app, assistant apps, and connected device companion apps. Apps using the [SMS Retriever API](https://developers.google.com/identity/sms-retriever/overview) or [SMS User Consent API](https://developers.google.com/identity/sms-retriever/user-consent/overview) are unaffected, as these use a targeted mechanism rather than broad SMS access.

**Enterprise impact**: organisations deploying apps that read SMS for two-factor authentication, device verification, or automated workflows should audit whether those apps read SMS directly or use the Retriever/Consent APIs. Apps reading raw SMS will see OTP messages delayed by three hours, which effectively breaks real-time OTP flows. Migration to SMS Retriever is the recommended path.

### Cleartext traffic changes

Cleartext (unencrypted HTTP) traffic has been blocked by default since Android 9 (API 28), so this default is not new in Android 17. What is new is that the `android:usesCleartextTraffic` manifest attribute is being deprecated: per Google's documentation it will be **ignored for apps targeting API 38 and higher**. Organisations should migrate any required HTTP exceptions to a [network security configuration](https://developer.android.com/privacy-and-security/security-config) file.

**Enterprise impact**: legacy internal apps that connect to HTTP-only internal services and rely on `usesCleartextTraffic="true"` should plan their migration to network security configuration. The attribute still functions for apps targeting API 37, but will be ignored once they target API 38 or higher.

### Background audio hardening

The audio framework enforces background audio restrictions more strictly in Android 17. Audio playback and volume APIs fail silently when an app is in the background, and audio focus requests return `AUDIOFOCUS_REQUEST_FAILED`.

Apps targeting API 37 additionally require a foreground service with while-in-use capabilities to play audio in the background.

**Enterprise impact**: VoIP apps, monitoring tools, and notification sound systems on managed devices should be tested against Android 17 to confirm they handle background audio correctly.

### Per-app keystore limits

Android 17 introduces limits on the number of keys a non-system app can store in the Android Keystore:

- Apps targeting API 37: 50,000 keys maximum
- All other apps: 200,000 keys maximum

**Enterprise impact**: unlikely to affect most enterprise apps, but organisations deploying certificate-heavy workloads (such as per-session VPN certificates or large-scale IoT device management) should audit keystore usage.

### App memory limits

Android 17 introduces device-based RAM limits for apps. Apps with extreme memory leaks may be terminated by the system with an exit reason of `REASON_OTHER` and description `MemoryLimiter:AnonSwap`.

**Enterprise impact**: most well-behaved apps will not be affected. Enterprise apps that process large datasets, handle extensive file operations, or run long-lived background sessions should be profiled to ensure they stay within limits.

## Post-quantum cryptography

Android 17 introduces hybrid post-quantum APK signing through a new APK Signature Scheme that pairs a classical signing key (RSA or EC) with the post-quantum algorithm ML-DSA (Module-Lattice-Based Digital Signature Algorithm). This future-proofs an app's signing identity against the potential threat of quantum-computing attacks.

**Enterprise impact**: this is forward-looking infrastructure. Organisations with long-lived signing keys or compliance requirements around cryptographic agility should begin evaluating PQC key rotation. For most deployments, no immediate action is required.

## Additional platform features

### Handoff - cross-device continuity

Android 17 introduces [Handoff](https://developer.android.com/about/versions/17/features#handoff), a framework for transferring an in-progress activity from one Android device to another. An activity opts in by calling `setHandoffEnabled()` and implementing `onHandoffActivityDataRequested()`.

**Enterprise impact**: for organisations deploying multiple devices per user, Handoff could improve productivity workflows. There is no confirmed documentation on how Handoff interacts with work profile boundaries. There is currently no AMAPI policy to enable or disable Handoff. For most deployments this is low-risk, as it requires explicit app developer adoption and does not activate by default.

## Android 17 readiness checks

1. **Identify apps that access local network resources** and work with developers to add `ACCESS_LOCAL_NETWORK` permission requests or migrate to system pickers. Consider pre-granting the permission via policy for known apps.
2. **Review internal CA usage** - CT is enabled by default for public endpoints when targeting API 37, but is disabled by default for the user-added or custom trust anchors that private enterprise CAs typically use. Confirm your apps' network security configuration if you explicitly enforce CT for internal domains
3. **Test line-of-business apps on Android 17** before fleet devices receive the update, paying particular attention to large-screen layouts, memory usage, background audio, and local network access
4. **Review internal apps for cleartext HTTP usage** and begin migration to network security configuration files ahead of the planned deprecation of `usesCleartextTraffic`
5. **Evaluate TLS inspection infrastructure** for ECH compatibility if your network relies on SNI-based traffic filtering
6. **Audit apps that read SMS for OTP handling** - migrate from raw SMS reading to the SMS Retriever or SMS User Consent APIs
7. **Check with your VPN vendor** whether they plan to adopt `ACTION_VPN_APP_EXCLUSION_SETTINGS`, and whether managed configurations can disable it
8. **Prepare for Advanced Protection by policy** - Google has confirmed enterprise enforcement is coming later in 2026. Evaluate whether your organisation would benefit from enabling it fleet-wide
9. **Review AI automation exposure** - evaluate whether `setNearbyAppStreamingPolicy()` and `setAppFunctionsPolicy()` need to be set for your deployment. The defaults allow automation on fully managed devices
10. **Review support workflows for theft protection changes** - the default-on theft protections and Mark as Lost biometric requirement may affect how support teams access devices on behalf of users

For the previous release, see [New in Android 16 for enterprise](/android/android-16-enterprise-features/).
