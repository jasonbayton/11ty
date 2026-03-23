---
title: 'Android Enterprise provisioning methods'
published: '2026-03-22'
status: publish
author: 'Jason Bayton'
excerpt: 'A comprehensive guide to every Android Enterprise provisioning method - how they work, when to use them, and the practical differences between AMAPI and custom DPC approaches.'
type: documentation
tags:
    - Provisioning
layout: base.njk
eleventyNavigation:
  order: 2500
---

<div class="callout callout-green">
<div class="callout-heading callout-heading-small">New to Android Enterprise?</div>

For an introduction to Android Enterprise, including the deployment scenarios referenced throughout this guide, have a read of [What is Android Enterprise and why is it used?](/android/what-is-android-enterprise-and-why-is-it-used/).

</div>

Provisioning is the process of turning a device from a fresh, out-of-box (or factory-reset) state into a managed device enrolled with an EMM. It is the first step in every Android Enterprise deployment, and the method chosen has direct implications for the end-user experience, the level of automation, and the operational overhead for IT.

Android Enterprise supports several provisioning methods. Some are designed for company-owned devices that start from a factory-reset state. Others are intended for personally-owned (BYOD) devices where a work profile is added to an already-configured device. A few work across both scenarios depending on how they are configured.

This guide covers each method in detail, explains when and why to use each one, and highlights the practical differences between [AMAPI](/android/android-enterprise-management-architectures/) and custom DPC implementations.

## Overview

The table below summarises all current provisioning methods, the deployment scenarios they support, and the minimum Android version required.

| Method | Fully managed | Dedicated | COPE | Work profile (BYOD) | Min. Android | Notes |
|--------|:---:|:---:|:---:|:---:|:---:|-------|
| [QR code](#qr-code) | Yes | Yes | Yes | No | 7.0 | Most widely used manual method |
| [Zero-touch](#zero-touch-enrolment) | Yes | Yes | Yes | No | 9.0 (8.0 select OEMs) | Automated, no user interaction for IT |
| [Knox Mobile Enrolment](#knox-mobile-enrolment-kme) | Yes | Yes | Yes | No | Samsung Knox 2.4+ | Samsung devices only |
| [NFC](#nfc) | Yes | Yes | No | No | 6.0 | Niche, tag-based only on 10+ |
| [DPC identifier](#dpc-identifier) | Yes | Yes | Yes | No | 6.0 | Fallback manual method |
| [Enrolment link / token](#enrolment-link) | No | No | No | Yes | 5.1 | Simple URL-based BYOD enrolment |
| [Sign-in URL](#sign-in-url) | Yes | Yes | Yes | Yes | 5.1+ (BYOD), 7.0+ (company-owned) | AMAPI only, identity-driven |
| [Play Store / DPC download](#play-store-download) | No | No | No | Yes | 5.1 | User-initiated BYOD |
| [Settings-based](#settings-based) | No | No | No | Yes | 5.1 | Add work profile from device settings |

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">Company-owned vs personally-owned</div>

The distinction matters for provisioning. Company-owned methods (QR, zero-touch, KME, NFC, DPC identifier) require the device to be in a factory-reset state - the setup wizard is where provisioning begins. Personally-owned methods (enrolment link, Play Store download, Settings) work on a device that is already set up and in use, adding a work profile alongside the user's personal space.

COPE sits in the company-owned camp - it provisions from a factory-reset state but creates a work profile on a company-owned device, giving the user a personal space with some organisational oversight.

</div>

## Company-owned provisioning methods

These methods apply to devices in a factory-reset state. They are used for fully managed, dedicated, and COPE deployments.

### QR code

**Available from:** Android 7.0
**Supports:** Fully managed, dedicated, COPE

QR code provisioning is the most common manual provisioning method for company-owned devices. An administrator generates a QR code containing the provisioning configuration, and the person setting up the device scans it during the setup wizard.

#### How it works

1. The device boots into the setup wizard after a factory reset (or first boot)
2. At the welcome screen, the user taps six times in quick succession - this opens the QR code reader
3. On Android 7.0-8.x, this triggers a download of a QR reader app. On Android 9.0+, the QR reader is built in and launches immediately
4. The user scans the QR code
5. The device connects to Wi-Fi (if credentials are included in the QR payload), downloads the DPC, and begins enrolment
6. The DPC applies the initial policy and the device is ready for use

#### What is in the QR code

The QR code is a JSON payload containing key-value pairs that tell the device how to provision itself. The contents differ between AMAPI and custom DPC implementations.

**AMAPI:** The QR code JSON is generated automatically when an enrolment token is created via the API. It contains the enrolment token, Wi-Fi credentials (optional), and configuration for Android Device Policy. Administrators typically generate QR codes directly from their EMM console - no manual payload construction is needed.

**Custom DPC:** The QR code must contain the DPC package name, the download URL for the DPC APK, a SHA-256 checksum for verification, and any vendor-specific DPC extras (server URL, enrolment credentials, etc.). Many EMMs provide tools to generate these, while others require manual configuration.

Common optional fields for both:

- Wi-Fi SSID and password (so the device can connect without manual input)
- Locale and timezone
- Whether to skip device encryption (not recommended)
- Whether system apps should be enabled or disabled during provisioning

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">Wi-Fi in the QR code</div>

Including Wi-Fi credentials in the QR code removes a manual step during provisioning - the device connects automatically instead of requiring the user to select a network. This is particularly useful for staging environments or when provisioning large numbers of devices. Be mindful that the credentials are embedded in plain text within the QR payload, so treat QR codes containing Wi-Fi credentials as sensitive.

On Android 13+, if Wi-Fi is not included in the QR payload, the device will prompt for network selection before proceeding.

</div>

<div class="callout">
<div class="callout-heading callout-heading-small">QR code generator</div>

If you'd like to experiment with QR codes, or generate one for production with all available provisioning options in a simple form, take a look at my [QR code generator](/qr-generator).

</div>

#### When to use it

QR code provisioning is the right choice when:

- You are provisioning devices manually (not through a reseller or automated programme)
- Zero-touch or KME are not available for your devices
- You need to provision a mix of device types from different manufacturers
- You want a simple, EMM-agnostic method that works across all Android 7.0+ devices

It scales reasonably well for batch provisioning - print the QR code and hand it to whoever is setting up devices. For larger-scale deployments, zero-touch is more efficient.

### Zero-touch enrolment

**Available from:** Android 9.0 on all GMS-certified devices (Android 8.0 on select OEMs, Android 7.1 on Pixel)
**Supports:** Fully managed, dedicated, COPE

Zero-touch enrolment is Android's automated provisioning solution. Devices are pre-registered in a cloud portal before they are powered on, so they automatically enrol into the EMM the first time they connect to the internet - no manual intervention from IT required.

The name refers to the fact that IT does not need to physically touch the device to provision it. End users still interact with the setup wizard, but the management configuration is applied automatically.

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">Detailed zero-touch documentation</div>

For a full introduction to zero-touch, see [What is Android zero-touch enrolment?](/android/what-is-android-zero-touch-enrolment/). For a hands-on guide to the zero-touch portal, see [Zero-touch console device guide](/android/android-enterprise-zero-touch-console-device-guide/). For DPC extras configuration per EMM vendor, see [Zero-touch DPC extras collection](/android/android-enterprise-zero-touch-dpc-extras-collection/).

</div>

#### How it works

1. The organisation purchases devices from an [authorised zero-touch reseller](https://androidenterprisepartners.withgoogle.com/resellers/)
2. The reseller creates a customer account in the zero-touch portal and assigns the purchased devices (by IMEI or serial number) to it
3. The organisation logs into the [zero-touch portal](https://enterprise.google.com/android/zero-touch/customers) and creates one or more configurations specifying the EMM DPC and any DPC extras (enrolment token, server URL, etc.)
4. Configurations are assigned to devices - either individually or in bulk, with an optional default configuration for all new devices
5. When a device boots for the first time (or after a factory reset), it checks in with Google's zero-touch service, receives its configuration, downloads the DPC, and enrols automatically

The end user sees the setup wizard proceed as normal, but the device is already configured to enrol. The user cannot skip or bypass enrolment (unless the configuration is explicitly removed from the portal).

#### Zero-touch configurations

Each configuration includes:

- **EMM DPC:** The management app to install (Android Device Policy for AMAPI, the vendor's DPC for custom DPC implementations)
- **DPC extras:** A JSON payload passed to the DPC during provisioning (enrolment token, server URL, credentials for staging, etc.)
- **Company name:** Displayed during setup so the user knows which organisation is managing the device
- **Support contact:** Email and phone number shown if the user needs assistance during setup
- **Custom message:** Optional text displayed on the provisioning screen

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">Default configuration</div>

The zero-touch portal supports a default configuration that automatically applies to all new devices added by resellers. This is useful for organisations that always provision devices the same way, but be careful - if you change EMMs or configurations, any devices added after the change will use the new default, while existing devices retain their assigned configuration unless explicitly updated.

</div>

#### When to use it

Zero-touch is the recommended provisioning method for company-owned devices whenever possible. It provides:

- True out-of-box enrolment - devices can be shipped directly to end users
- No IT involvement in the physical provisioning step
- Enrolment persistence - factory-resetting the device triggers re-enrolment automatically
- Centralised management through the cloud portal

The main limitations are:

- Devices must be purchased from an authorised reseller (you cannot self-register devices, unlike KME)
- Requires an internet connection during setup
- Only supports company-owned deployment scenarios

### Knox Mobile Enrolment (KME)

**Available from:** Samsung devices with Knox 2.4+ firmware
**Supports:** Fully managed, dedicated, COPE

Knox Mobile Enrolment is Samsung's equivalent to zero-touch, exclusive to Samsung devices. It predates zero-touch and offers some capabilities that zero-touch does not. Samsung devices support both KME and zero-touch, so organisations can choose either (or both) depending on their needs.

#### How it works

The flow is similar to zero-touch:

1. Devices are registered in the [KME portal](https://central.samsungknox.com) - either by a reseller, uploaded via CSV by the organisation, or added manually using device IMEI/serial numbers
2. The organisation creates an MDM profile specifying the EMM agent and configuration details
3. Profiles are assigned to devices
4. On first boot or factory reset, the device contacts Samsung's KME service, downloads the DPC, and enrols automatically

#### Key differences from zero-touch

| | Zero-touch | KME |
|---|---|---|
| **Scope** | All GMS-certified Android 9.0+ devices | Samsung devices only |
| **Device registration** | Reseller only | Reseller or manual addition by IT |
| **Portal** | Google zero-touch portal | Samsung Knox Suite |
| **Customisation** | Configuration with DPC extras | More granular - Wi-Fi profiles, system update scheduling, setup wizard customisation |
| **Offline provisioning** | Not supported | Supported via QR code generated from KME |
| **Works with** | AMAPI and custom DPC | AMAPI and custom DPC |

#### AMAPI vs custom DPC with KME

**AMAPI:** The MDM profile specifies Android Device Policy as the agent, with the enrolment token passed in DPC extras.

**Custom DPC:** The MDM profile specifies the vendor's DPC APK download URL and vendor-specific DPC extras JSON.

Both approaches work, but the configuration payloads differ. Refer to your EMM vendor's documentation for the correct KME profile settings.

#### When to use it

KME is the natural choice when deploying Samsung devices. Its ability to manually register devices (without going through a reseller) makes it particularly useful for organisations that already have Samsung devices in stock. It also offers deeper Samsung-specific customisation options through the broader Knox platform.

For mixed-manufacturer fleets, use zero-touch as the primary method and KME as a complement for Samsung devices.

### NFC

**Available from:** Android 6.0
**Supports:** Fully managed, dedicated

NFC provisioning uses an NFC tag (or another device acting as an NFC tag emitter) to deliver the provisioning payload to a device during setup.

#### How it works

1. An NFC tag is programmed with the provisioning payload (same key-value pairs as a QR code - DPC package, download URL, checksum, Wi-Fi credentials, DPC extras)
2. During the setup wizard, the user taps the device against the NFC tag at the welcome screen
3. The device reads the payload, connects to Wi-Fi, downloads the DPC, and begins enrolment

The NFC tag should have sufficient memory to hold the provisioning payload. In practice, NFC Forum Type 2 tags such as the NTAG216 (888 bytes usable memory) are commonly used, as the provisioning payload including Wi-Fi credentials and DPC extras can exceed the capacity of smaller tags.

#### Current state

NFC provisioning is still officially supported but has become increasingly niche:

- **Android 10 deprecated Android Beam** (fully removed in Android 14), which was previously used for device-to-device NFC provisioning (one device bumps another). Only NFC tag-based provisioning works on Android 10+
- **Android 11+ does not support NFC for COPE** - it can only be used for fully managed and dedicated deployments
- Google has not formally deprecated NFC tag provisioning, but it receives minimal attention in current documentation
- QR codes have largely replaced NFC in practice, as they are simpler to create and do not require additional hardware

#### When to use it

NFC provisioning still has a place in specific scenarios:

- Staging environments with dedicated provisioning stations where devices are physically handled
- Ruggedised or industrial devices that may not have cameras for QR scanning
- Environments where NFC tags are already part of the provisioning workflow

For most deployments, QR codes or zero-touch are more practical.

### DPC identifier

**Available from:** Android 6.0
**Supports:** Fully managed, dedicated, COPE

The DPC identifier (sometimes called an EMM token) is a text string entered during the setup wizard in place of a Google account. It begins with `afw#` followed by the EMM vendor's identifier.

#### How it works

1. During the setup wizard, when prompted to sign in with a Google account, the user types the DPC identifier (e.g. `afw#setup` for AMAPI, `afw#hub` for Omnissa Workspace ONE)
2. The device recognises the `afw#` prefix and downloads the corresponding DPC from Google Play
3. The DPC launches and guides the user through the enrolment process

For a complete list of DPC identifiers by vendor, see the [DPC identifier collection](/android/android-enterprise-dpc-identifier-collection/).

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">System apps and DPC identifiers</div>

When provisioning via DPC identifier, the device disables most system apps by default. This can leave the device in an unexpected state if the EMM does not explicitly re-enable the apps needed for the deployment. QR code and zero-touch provisioning handle system app state more predictably. If you encounter missing apps or broken functionality after DPC identifier provisioning, check your system app policy.

</div>

#### When to use it

DPC identifiers are best treated as a fallback method:

- When no QR code is available
- When zero-touch or KME are not configured for the device
- As a quick way to provision a single device without generating a QR code first

For AMAPI-based EMMs, the identifier is `afw#setup`, which downloads Android Device Policy. The user then needs to enter an enrolment token or sign in to complete enrolment.

## Personally-owned provisioning methods

These methods are used for BYOD deployments where a work profile is added to the user's personal device. The device is already set up and in use.

### Enrolment link

**Available from:** Android 5.1
**Supports:** Work profile (BYOD)

An enrolment link is a URL that the user opens on their device. It triggers the work profile creation flow directly.

#### How it works

For AMAPI, the format is:

`https://enterprise.google.com/android/enroll?et=<enrolmentToken>`

The enrolment token is created by the EMM (via the AMAPI `enrollmentTokens.create` endpoint) with `allowPersonalUsage` set to `PERSONAL_USAGE_ALLOWED`. The link can be sent to users via email, a self-service portal, or any other channel.

When the user opens the link:

1. Android Device Policy (or the vendor's DPC for custom DPC implementations) is installed if not already present
2. The user is guided through work profile creation
3. The work profile is set up with the initial policy

Custom DPC EMMs typically have their own enrolment URL format. Check your vendor's documentation.

#### When to use it

Enrolment links are the cleanest BYOD experience:

- Users receive a single URL - no app store searching, no account configuration
- The link can be distributed through any channel (email, intranet, QR code for in-person onboarding)
- One-time-use tokens add security by ensuring each link can only be used once

### Sign-in URL

**Available from:** Android 5.1+ (BYOD), Android 7.0+ (company-owned)
**Supports:** All deployment scenarios
**AMAPI only**

The sign-in URL is an AMAPI-specific provisioning flow that ties enrolment to the user's corporate identity. Instead of distributing pre-generated tokens, the organisation configures a sign-in URL that authenticates users with their corporate credentials before provisioning begins.

#### How it works

1. The organisation configures `signinDetails` on the enterprise resource in AMAPI, specifying a custom URL hosted by the EMM or organisation
2. During provisioning (via QR code, zero-touch, or work profile setup), the device opens this URL
3. The user authenticates with their corporate credentials (SSO, SAML, etc.)
4. The server determines the correct policy based on the user's identity and creates an enrolment token
5. The device is redirected to `https://enterprise.google.com/android/enroll?et=<token>` to complete enrolment

This approach is particularly powerful for organisations that want identity-driven provisioning - where the policy applied depends on who the user is (their department, role, location, etc.) rather than which QR code they scanned.

#### When to use it

Sign-in URL provisioning is well-suited to:

- Organisations with existing SSO infrastructure
- Deployments where different users need different policies on the same device hardware
- Shared device programmes where the device is provisioned once but the user identity determines the experience

### Play Store download

**Available from:** Android 5.1
**Supports:** Work profile (BYOD)

The user manually downloads the EMM's DPC app from the Google Play Store and follows the enrolment flow within the app.

For AMAPI-based EMMs, the user downloads **Android Device Policy** from the Play Store. For custom DPC EMMs, the user downloads the vendor's agent (e.g. Omnissa Intelligent Hub, Ivanti Mobile@Work, Citrix Secure Hub).

This is the most user-driven method - it relies on the end user knowing which app to download and having the enrolment credentials to complete setup. It works, but provides a less guided experience than an enrolment link.

### Settings-based

**Available from:** Android 5.1
**Supports:** Work profile (BYOD)

On some devices, a work profile can be added from the device settings. The exact path varies by manufacturer and Android version, but is typically found under **Settings > Accounts > Add work profile** or **Settings > Google > Set up work profile**.

This method is not consistently available across all devices and OEM skins, so it should not be relied upon as a primary enrolment path.

## AMAPI vs custom DPC 

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">Custom DPC deprecation</div>

Google is actively transitioning the ecosystem from custom DPCs to AMAPI. New custom DPC registrations are no longer accepted, and several Play EMM API methods used by custom DPC vendors were deprecated in September 2021 with a turn-off date of September 30, 2025. Existing custom DPCs from established vendors continue to function, but organisations starting new Android Enterprise deployments should use an AMAPI-based EMM. 

</div>

### The DPC allowlist

Since 2025, Google Play Protect enforces a DPC allowlist during provisioning. Only DPCs explicitly approved by Google are permitted to complete the provisioning flow. If a DPC is not on the allowlist, Play Protect blocks installation with a "Harmful app blocked" warning - even if the app is a legitimate, established EMM agent.

This primarily affects custom DPC vendors. Android Device Policy (used by AMAPI) is always on the allowlist. Major EMM vendors (Omnissa, Ivanti, Microsoft, SOTI, IBM, etc.) are on the list, but smaller or less established DPCs may be blocked.

If you encounter this during provisioning, see [Play Protect blocked my DPC, why?](/android/android-enterprise-faq/play-protect-blocked-my-dpc-why/) for guidance.

## Choosing the right method

The best provisioning method depends on who owns the device, how many devices you are deploying, and what infrastructure you have in place.

### Company-owned devices

**Start with zero-touch.** If your devices are purchased from an authorised reseller and are running Android 9.0+, zero-touch should be your default. It removes the physical provisioning step entirely and ensures devices re-enrol if factory reset.

**Add KME for Samsung devices.** If you have Samsung devices, KME gives you additional flexibility - particularly the ability to register devices you already own, without needing a reseller.

**Fall back to QR codes.** For devices not covered by zero-touch or KME (older stock, niche OEMs, test devices), QR codes are the most versatile manual option.

**Use DPC identifiers sparingly.** They work in a pinch but offer a less predictable experience, particularly around system app behaviour. Keep them as a last resort.

**NFC only where it makes sense.** If your devices lack cameras (rare but possible on some industrial hardware) or you have an existing NFC-based staging workflow, NFC is available. Otherwise, use QR codes.

### Personally-owned devices (BYOD)

**Sign-in URL for identity-driven enrolment.** If you want the policy to be determined by who the user is, sign-in URL provisioning integrates with your existing SSO, and can trigger as soon as an in-scope Google account is added to the device.

**Enrolment links are the best experience.** A single URL sent via email or posted on an intranet. Clean, simple, and controlled.

**Play Store download as a fallback.** If an enrolment link cannot be distributed, users can download the DPC from the Play Store. Requires more user knowledge and is harder to support.

## Common provisioning issues

A few pitfalls come up repeatedly in real-world deployments:

**Device does not show QR reader after six taps.** Ensure the device is at the very first welcome screen (the language/region selection). Some OEMs have slightly different trigger points. On Android 7.0-8.x, the device needs internet access to download the QR reader component first.

**Zero-touch does not trigger.** Check that the device has a valid configuration assigned in the zero-touch portal, that the device IMEI matches what the reseller registered, and that the device has internet connectivity. See [Zero-touch doesn't initiate](/android/android-enterprise-faq/zt-doesnt-initiate/) for a detailed checklist.

**Enrolment fails with no useful error.** Check the enrolment token has not expired (AMAPI default is 1 hour), that the device has a stable internet connection, and that the EMM server is reachable. For custom DPCs, verify the DPC is on the [Play Protect allowlist](#the-dpc-allowlist).

**System apps missing after provisioning.** This is most common with DPC identifier provisioning, where system apps are disabled by default. Configure your enrolment payload to explicitly enable the system apps your deployment requires. See [What are vital apps?](/android/what-are-vital-apps/) for context.

**Device enters quarantine (AMAPI).** If an AMAPI enrolment token does not specify a `policyName`, and no `default` policy exists, the device enters a quarantined state. If a policy is not assigned within five minutes, the device is automatically factory reset. Always include a policy in the enrolment token.
