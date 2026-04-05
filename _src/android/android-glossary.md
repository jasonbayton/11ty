---
title: 'Android glossary'
published: '2018-01-26T00:49:17+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - General
layout: base.njk
eleventyNavigation:
  order: 23000
---
This document offers definitions and descriptions of commonly referenced acronyms, names, features and more that appear in published Android and Android Enterprise documents both here on bayton.org and elsewhere.

If there are definitions missing or incomplete, please feel free to suggest additions via [email](mailto:jason@bayton.org), [twitter](https://twitter.com/jasonbayton), a comment or use the feedback link at the bottom of the article.

AER (Android Enterprise Recommended)
-------------------------------------

A programme run by Google that certifies devices, EMMs, and managed service providers (MSPs) that meet a defined set of enterprise requirements. For devices, AER requirements include minimum hardware specifications, consistent and timely security patch delivery, and support for key Android Enterprise features. For EMMs, requirements cover API completeness and management capabilities. See [What is Android Enterprise Recommended?](/android/what-is-android-enterprise-recommended/) for more.

AMAPI (Android Management API)
-------------------------------

The Android Management API is Google's current-generation management API for Android Enterprise. Rather than requiring each EMM to build their own [DPC](#dpc-device-policy-controller), AMAPI provides a cloud-based REST API that EMMs integrate with server-side, paired with a Google-built DPC called [Android Device Policy](#android-device-policy). AMAPI uses a standardised JSON policy model, meaning the same policy structure works across all AMAPI-based EMMs.

Android Device Policy (ADP)
---------------------------

Android Device Policy is Google's own [DPC](#dpc-device-policy-controller) app, used exclusively with [AMAPI](#amapi-android-management-api). It replaces the need for EMMs to build and maintain their own DPC app. ADP receives policy instructions from Google's AMAPI cloud service and enforces them on the device using the `DevicePolicyManager` framework APIs. It is always on the [DPC allowlist](#dpc-allowlist) and is updated by Google independently of EMM release cycles.

API
---

One or more functions of an application or service that may be accessed by a 3rd party, either publicly or with authentication. As a practical example, the EMM agent on a device may request a passcode is set and/or validate it is both set and within policy requirements frequently by leaning on the relevant device API for this information.

BYOD (Bring Your Own Device)
----------------------------

A deployment model where employees use their personally-owned devices for work. In Android Enterprise, BYOD is implemented using a [work profile](#work-profile) that creates a separate, encrypted container for work apps and data on the personal device. The organisation has no visibility into personal apps or data. See [Android Enterprise deployment scenarios](/android/infobyte-did-you-know-android-enterprise-deployment-scenarios) for a comparison with other deployment models. *(Pending publication)*

COBO
----

Corporate Owned, Business Only. In which a device will have no capacity or capability to permit for personal usage; the Play Store will be locked down to only corporate applications, any options for sideloading APKs will be disabled and basic functions such as camera, account management and more may not be present. COBO devices can only be used in a corporate context. See [work-managed](#work-managed).

COPE
----

Corporate Owned, Personally Enabled. A COPE device will support both work and (limited) personal usage often by separating or containerising corporate data away from the personal space, allowing for the addition of a personal account, applications and more. Often COPE devices will see limited restrictions in the personal space, whilst DLP controls heavily restrict the movement of corporate data beyond the container, or work profile. See [fully managed devices with work profiles](#fully-managed-devices-with-work-profiles).

COSU (Kiosk)
------------

This term has been deprecated in favour of [Dedicated](#dedicated-device).

Custom DPC
----------

A custom DPC is a [Device Policy Controller](#dpc-device-policy-controller) app built and maintained by an individual EMM vendor, as opposed to Google's [Android Device Policy](#android-device-policy-adp). In the custom DPC model, each EMM developed their own Android app to enforce management policies on devices using the `DevicePolicyManager` framework APIs, paired with the [Play EMM API](#play-emm-api) for server-side app management. Google has deprecated this model in favour of [AMAPI](#amapi-android-management-api), and new custom DPC registrations are no longer accepted.

Compliance policy
-----------------

A set of rules defined in an EMM that determine whether a managed device meets organisational security requirements. Typical compliance checks include minimum [SPL](#spl-security-patch-level), device encryption status, [Play Integrity](#play-integrity) verdict, screen lock configuration, and whether the device has been rooted or has an unlocked bootloader. When a device falls out of compliance, the EMM can trigger remediation actions such as sending a notification, blocking access to corporate resources, wiping the work profile, or factory resetting the device. In [AMAPI](#amapi-android-management-api), compliance is driven by the policy `statusReportingSettings` and `complianceRules` (deprecated) or non-compliance detail reporting.

Dedicated device
----------------

Previously referred to as Corporate Owned, Single Use or COSU. Often associated with a kiosk, Dedicated devices are designed for single-purpose devices such as point-of-sale, asset tracking, fixed store display terminals, etc. A dedicated device may be locked down to one, or multiple applications and is often controlled via a kiosk profile through EMM.

Direct Boot
-----------

A device state available on Android 7.0+ devices using [FBE](#fbe-file-based-encryption) where the device has been powered on but the user has not yet unlocked it with their PIN, pattern, or password. During Direct Boot, only apps explicitly flagged as `directBootAware` can run - this is critical for use cases like alarms, accessibility services, and device management. For Android Enterprise, it means the [DPC](#dpc-device-policy-controller) can receive commands and apply some policies even before the user unlocks. On fully managed devices that enforce a screen lock, the device is in Direct Boot state after every reboot until the user authenticates.

Device administrator
--------------------

This is the name for what can be considered the *legacy* method of managing an Android device. It is so called because when using an application that requires control over the device, such as an EMM agent, the application will prompt the user to grant it administrator privileges. Once granted, the application will have unrestricted access to device functionality and information in order to do whatever it needs without hindrance. This access is equally why device admin can be dangerous.

Device owner
------------

A technical term for what is now mostly associated with [work-managed](#work-managed). Device owner is the process of setting an EMM agent as the [device policy controller](#dpc-device-policy-controller) for the entire device. It is essentially what has replaced [device administrator](#device-administrator) on legacy devices and enrolments.

DPC (Device Policy Controller)
------------------------------

DPC, or Device Policy Controller, is one name for the EMM agent locally installed on a mobile device. Some examples of a DPC include MobileIron Mobile@Work and AirWatch Agent. These applications control and enforce policies on devices sent down from the EMM server.

DPC allowlist
-------------

A list of [DPC](#dpc-device-policy-controller) apps approved by Google to provision Android Enterprise devices. Since 2025, Google Play Protect checks this list during provisioning and blocks any DPC that isn't on it. [Android Device Policy](#android-device-policy-adp) is always on the allowlist. Custom DPCs that haven't been explicitly approved will trigger a "Harmful app blocked" warning during provisioning. For more, see [Play Protect blocked my DPC, why?](/android/android-enterprise-faq/play-protect-blocked-my-dpc-why/)

DPC extras
----------

These are optional snippets of configuration (or metadata) an administrator can pass to the [DPC](#dpc-device-policy-controller) in order to configure additional dynamic functionality into the [DPC](#dpc-device-policy-controller). An example of this would be sending the console URL for a hosted EMM platform, user names and/or passwords for automatic staging, whether system apps should be enabled or disabled and more.

DPC identifier (DPCi)
---------------------

A provisioning method for Android Enterprise [work-managed](#work-managed) enrolments, DPC identifiers are provided and maintained by Google for EMM partners supporting Android Enterprise [work-managed](#work-managed) enrolment. The DPC identifier is entered during setup in place of the Google account when asked to sign in to the device and starts with **AFW#**. Some examples of a DPCi are:

- afw#mobileiron.cloud
- afw#airwatch
- afw#blackberry
- afw#meraki

Some external documentation may also reference this as **EMM token** or **Wireless Enrolment Token (WET)**

Enrolment token
---------------

A credential generated by an EMM (via the AMAPI `enrollmentTokens.create` endpoint or equivalent in custom DPC platforms) that authorises a device to enrol into a specific enterprise with a specific policy. Enrolment tokens can be delivered as QR codes, NFC payloads, or [zero-touch](#zero-touch) configurations. In [AMAPI](#amapi-android-management-api), a token can be configured with `allowPersonalUsage` to control whether the device provisions as fully managed or with a work profile, and supports `oneTimeOnly` to restrict the token to a single use. Tokens have a configurable expiry, after which they can no longer be used for provisioning.

EMM (Enterprise Mobility Management)
-------------------------------------

Enterprise Mobility Management, the industry term for solutions that manage mobile devices, applications, and data in an enterprise context. EMM platforms (such as Microsoft Intune, Omnissa Workspace ONE, SOTI MobiControl, and others) provide the server-side console and infrastructure that administrators use to configure policies, deploy apps, and monitor devices. An EMM integrates with Android Enterprise either through [AMAPI](#amapi-android-management-api) or the legacy [custom DPC](#custom-dpc) model. Also sometimes referred to as UEM (Unified Endpoint Management) or MDM (Mobile Device Management), though these terms have slightly different scopes.

FBE (File-based encryption)
---------------------------

The encryption scheme introduced in Android 7.0 that replaced full-disk encryption (FDE). FBE encrypts different files with different keys, allowing the system to boot to a functional state before the user enters their PIN (Direct Boot) and enabling each user profile to be encrypted independently. For Android Enterprise, FBE is significant because it means the work profile is encrypted with its own keys, separate from the personal profile. A [work challenge](#work-challenge) provides the decryption key for work profile data.

FRP (Factory Reset Protection)
------------------------------

A security feature that requires the previous Google account credentials to be entered after a factory reset, preventing unauthorised use of a stolen or lost device. In Android Enterprise, FRP is particularly relevant for fully managed and company-owned devices. Administrators can configure which Google accounts are authorised to unlock a device after factory reset using `setFactoryResetProtectionPolicy()` (Android 11+). From Android 15, FRP remains active even when OEM unlock is enabled. See [Feature spotlight: Factory Reset Protection](/android/feature-spotlight-factory-reset-protection/) for more.

Extensibility framework
-----------------------

A capability within [AMAPI](#amapi-android-management-api) that allows EMMs to perform on-device operations that require local execution, without building a full [custom DPC](#custom-dpc). EMMs can designate an extension app via the `extensionConfig` field in an application's policy. This extension app communicates directly with [Android Device Policy](#android-device-policy-adp) on the device using the AMAPI SDK, enabling local command execution. At time of writing, the primary supported command is `ClearAppData`, with Google expanding available commands over time. The extensibility framework allows EMMs to differentiate their on-device capabilities while still using Google's standardised DPC.

Freeze period
-------------

A mechanism within the system update policy that allows administrators to define date ranges during which no OTA system updates are installed on managed devices. Freeze periods repeat annually, can be up to 90 days long, and must be separated by at least 60 days. They block both security patches and OS version upgrades indiscriminately. Available on Android 9.0+ for fully managed and company-owned devices only. 

GMS certified/certification
---------------------------

Not to be confused with the GMS license, which is simply permission for a company to use/distribute the Google suite of applications, GMS certification provides Google’s stamp of approval that a device meets Google’s recommended specifications and requirements. It is not a requirement for devices to be GMS certified in order to be made and sold – a notable example being the Amazon Fire line of tablets – however Android Enterprise is officially only supported on GMS certified devices and therefore purchasing non-GMS certified devices, such as low-cost options from China, is almost certainly going to result in difficulty managing them.

KME (Knox Mobile Enrolment)
---------------------------

Samsung's proprietary zero-touch-like provisioning system for Samsung devices. KME allows organisations to register Samsung devices for automatic enrolment with their EMM, similar to Google's [zero-touch](#zero-touch) enrolment but managed through Samsung's Knox portal rather than the Android zero-touch portal. KME supports fully managed and dedicated device provisioning, and can be used alongside or instead of zero-touch depending on the deployment. Devices registered with KME automatically download and configure the EMM's [DPC](#dpc-device-policy-controller) on first boot.

Lock task mode
--------------

The Android platform mechanism that powers [dedicated device](#dedicated-device) kiosk behaviour. When active, the device is restricted to a set of allowlisted apps - the status bar, home button, and overview button are hidden or disabled by default, and users cannot exit to the home screen. From Android 9, any app can be started in lock task mode without needing to support it explicitly. In [AMAPI](#amapi-android-management-api), lock task is configured by setting an app's `installType` to `KIOSK` or by enabling `kioskCustomLauncherEnabled`. The `kioskCustomization` object provides granular control over what UI elements remain visible. Lock task mode requires [device owner](#device-owner) privileges and is therefore only available on fully managed and dedicated devices, not [work profile](#work-profile) deployments. See [Android Enterprise deployment scenarios](/android/infobyte-did-you-know-android-enterprise-deployment-scenarios) for more.

MDM (Mobile Device Management)
-------------------------------

A term used broadly to describe solutions that manage mobile devices in an enterprise context. MDM is often used interchangeably with [EMM](#emm-enterprise-mobility-management), though technically MDM refers specifically to device-level management (policies, restrictions, remote wipe), while EMM encompasses a broader scope including application management, content management, and identity. In the Android Enterprise ecosystem, most solutions marketed as MDM are functionally EMMs. See also [EMM](#emm-enterprise-mobility-management).

Managed configurations
----------------------

Also referred to as app configuration, managed app config, or application restrictions. A framework capability that allows administrators to remotely push settings (key-value pairs) to applications on managed Android devices through their EMM. The app must declare a configuration schema (`app_restrictions.xml`) for managed configurations to work. Common examples include pushing Exchange profiles to email apps, configuring VPN settings, or setting a homepage in Chrome. See [What are managed configurations?](/android/what-are-managed-configurations/) for the full details.

Managed Google Play
-------------------

The enterprise version of the Google Play Store, activated when an organisation sets up an Android Enterprise environment. Managed Google Play provides IT administrators with control over which apps are available to managed devices, supports silent (force) installation of apps, and enables distribution of private and web apps exclusive to the organisation. On fully managed devices, Managed Google Play replaces the standard Play Store entirely. On work profile deployments, it appears as a separate, badged Play Store within the work profile. Managed Google Play is not a separate product - it is a capability of the Android Enterprise platform, powered by the [enterprise binding](#managed-google-play-accounts-enterprise). See [Understanding Managed Google Play](/android/understanding-managed-google-play/) for the full guide.

Google Play System Updates (mainline)
-------------------------------------

Also known as Project Mainline. A delivery mechanism introduced in Android 10 that allows Google to update core Android OS modules directly through Google Play, independently of the device OEM. As of Android 14, there are 37 updatable mainline modules covering connectivity, multimedia, and core framework components. Since April 2024, mainline updates are no longer governed by Android Enterprise system update policies. See [Google Play System Updates (mainline) are no longer managed by Android Enterprise system update policies](/android/gpsu-system-update/) for details.

Management mode
---------------

The level of control an EMM has over a device, determined by how the device was provisioned. Android Enterprise supports three primary management modes: **fully managed** ([device owner](#device-owner)) where the EMM controls the entire device; **work profile** ([profile owner](#profile-owner)) where the EMM controls only the work container; and **dedicated** where a fully managed device is locked into a limited set of apps via [lock task mode](#lock-task-mode). The management mode is set during provisioning and cannot be changed without a factory reset (for fully managed) or work profile removal (for work profile).

Managed Google domain
---------------------

One of two enterprise types for Android Enterprise. A managed Google domain is tied to a verified domain name and typically associated with a Google Workspace subscription. It requires domain verification and provides additional identity integration. Compare with [Managed Google Play Accounts enterprise](#managed-google-play-accounts-enterprise).

Managed Google Play Accounts
----------------------------------------

The more common enterprise type for Android Enterprise. A managed Google Play Accounts enterprise can be set up with any Google account, requires no domain verification, and takes minutes to configure. The EMM manages individual Android Enterprise accounts on devices, and Google doesn't associate these accounts with any particular user, enhancing privacy. From mid-2024, the new customer signup flow creates a zero-cost managed Google domain for all new binds. Compare with [Managed Google domain](#managed-google-domain).

NFC
---

Near Field Communication(s) – NFC is a radio on the device used for close-proximity data transmission. Android Pay utilises NFC for contactless payments, however it is also widely used in the EMM industry for device enrolment/provisioning, supporting the transmission of EMM server or Android Enterprise data from a host device to the target with a simple bump.

OEM
---

Original Equipment Manufacturer, a manufacturer of devices such as Samsung, Sony or LG.

OTA (Over-the-Air)
------------------

The delivery mechanism for system updates (both Android version upgrades and security patches) distributed by device OEMs or carriers. OTA updates are the primary update type controlled by Android Enterprise [system update policies](#system-update-policy). Compare with [Google Play System Updates](#google-play-system-updates-mainline), which are delivered through Google Play infrastructure.

OEMConfig
---------

A standardised approach that allows OEMs to provide additional device management capabilities beyond the base Android Enterprise APIs, managed directly through any EMM. OEMConfig works by packaging OEM-specific configuration options into an app published on Google Play, which exposes its settings via [managed configurations](#managed-configurations). This means EMMs don't need to build custom integrations for each OEM - the OEM's configuration app acts as the bridge. See [What is OEMConfig?](/android/what-is-oemconfig/) for more.

Parent profile
--------------

The parent profile is essentially *the device* on a BYOD or [COPE](#cope) [work profile](#work-profile) deployment. It is referred to as the parent profile as the work profile is integrated into it. Technically the profiles sit alongside each other on the device rather than the work profile being a “child” of the parent, however this is how it’s perceived and commonly explained.

Play Protect
------------

Google's built-in security service for Android devices. Play Protect scans apps installed from Google Play and via sideloading for malware and potentially harmful applications (PHAs). In the Android Enterprise context, Play Protect is particularly relevant because it enforces the [DPC allowlist](#dpc-allowlist) during provisioning - if an EMM's DPC is not on the allowlist, Play Protect will block it with a "Harmful app blocked" warning. Play Protect also contributes to [Play Integrity](#play-integrity) attestation signals. It can be configured through EMM policy but should generally remain enabled.

Play Integrity
--------------

Google's device integrity verification API, the successor to SafetyNet Attestation (which was shut down in January 2025). Play Integrity allows apps and services to verify that a device is genuine, running a recognised build of Android, and has not been tampered with. It returns integrity verdicts including device integrity, app integrity, and account licensing signals. In Android Enterprise, Play Integrity underpins compliance checks - EMMs use it to assess whether a device meets organisational security requirements. See [Understanding Play Integrity and device trust](/android/play-integrity-and-device-trust/) for full details.

Private Space
-------------

A user-facing feature introduced in Android 15 that creates an isolated area within the personal profile, protected by additional authentication (PIN, password, or biometric). Users can install apps into Private Space that are hidden from the launcher, notification shade, and recent apps. On company-owned devices, administrators can block Private Space creation via `DISALLOW_ADD_PRIVATE_PROFILE`. Private Space is not available on fully managed devices. Apps within Private Space do not route through a configured work VPN. See [What is Private Space?](/android/what-is-android-15-private-space/) for full details.

Play EMM API
------------

The legacy server-side API that [custom DPCs](#custom-dpc) used for managed Google Play operations - app approval and distribution, managed configurations, managed Google Play account provisioning, entitlements, and app track management. The Play EMM API was deprecated by Google in September 2021, with most methods permanently shut down in September 2025. All deprecated functionality has [AMAPI](#amapi-android-management-api) equivalents.

Profile owner
-------------

A technical term for what is now mostly referenced as [work profile](#work-profile). A profile owner is normally considered to be the [DPC](#dpc-device-policy-controller) installed on a device by an EMM solution or a user if downloaded from the Play Store. It has permission to create a work profile, manipulate it and remove it, but holds very little control over the [parent profile](#parent-profile)

Provisioning
------------

The act of preparing a device for enrolment. During provisioning the device will download and install a [DPC](#dpc-device-policy-controller), then set the device as [work-managed](#work-managed) before landing on the home screen (or just before depending on when EMM enrolment is prompted). In the [provisioning guides](/android/android-enterprise-provisioning-guides/), provisioning and enrolment are clearly referred to as two separate tasks for deploying a device. Once provisioning completes, the user can then enrol through the [DPC.](#dpc-device-policy-controller)

SPL (Security Patch Level)
--------------------------

The date-based identifier for the set of security patches applied to an Android device, in the format YYYY-MM-DD. The day portion is typically either "01" (AOSP-only patches) or "05" (AOSP plus vendor/kernel patches). SPL is commonly used in EMM compliance policies to ensure devices are running reasonably current security updates. Viewable on a device under Settings > About phone > Android security patch level.

System update policy
--------------------

An AMAPI policy resource (`systemUpdatePolicy`) that controls how [OTA](#ota-over-the-air) system updates are installed on managed Android devices. Supports four modes: device default, automatic, windowed (daily maintenance window), and postpone (30-day deferral for OS upgrades only). Available on Android 8.0+ for fully managed and company-owned devices. See [Managing system updates in Android Enterprise](/android/managing-system-updates-android-enterprise/) for the full guide.

UEM (Unified Endpoint Management)
----------------------------------

The evolution of [EMM](#emm-enterprise-mobility-management), encompassing management of not just mobile devices but also desktops, laptops, IoT devices, and other endpoints from a single console. Most modern EMM vendors market themselves as UEM providers. In practice, when discussing Android Enterprise, the terms EMM, UEM, and [MDM](#mdm-mobile-device-management) are often used interchangeably, though UEM implies broader platform coverage. Examples include Microsoft Intune, Omnissa Workspace ONE, and SOTI MobiControl.

Unknown sources
---------------

This is a setting on most Android devices to permit the installation of applications via means external to the official Play Store. If you’ve ever tried to install an APK file on a device, you will have been prompted to enable unknown sources. Installation of applications via unknown sources however contributes to well over 60% of all malware and other threats, and is therefore strongly discouraged – in fact, it’s disabled in Android Enterprise by default.

Vital apps
----------

Apps that are considered essential for the basic operation of a managed device and are therefore not disabled when an EMM applies a system app policy. On fully managed and dedicated devices, most pre-installed system apps are hidden by default - only apps on Google’s "vital apps" list remain enabled. This list typically includes core functions like the dialler, settings, and system UI components. EMMs can selectively re-enable additional system apps beyond the vital apps list. The vital apps list varies by device and Android version and is not published publicly by Google, which can make it difficult to predict exactly which apps will be available out of the box on a newly provisioned device.

Work challenge
--------------

A secondary passcode requirement for BYOD [work profile](#work-profile) devices. Not dissimilar to traditional container solutions which required a PIN in order to access the applications within. Essentially you’ll have one passcode to unlock the device, then another passcode requirement in order to open any work applications.

Work-managed
------------

Please see [What is Android Enterprise and why is it used &gt; Diving deeper with work-managed devices](/android/what-is-android-enterprise-and-why-is-it-used/#diving-deeper-with-work-managed-devices) for information on work-managed.

Work profile
------------

Please see [What is Android Enterprise and why is it used &gt; BYOD and work profile](/android/what-is-android-enterprise-and-why-is-it-used/#byod-and-work-profile) for information on work profile.

WPCoD (Work Profile on Company-Owned Device)
---------------------------------------------

The internal/technical name for the [COPE](#cope) deployment model as it exists from Android 11 onwards. In Android 11, Google completely redesigned COPE from a work profile layered on top of a fully managed device to a work profile deployment with slightly elevated company-owned controls. The practical difference is significant - WPCoD gives the organisation less visibility into the personal side of the device compared to the pre-Android 11 COPE model, but offers employees substantially more privacy. The term WPCoD appears frequently in Google documentation and AMAPI policy references (`allowPersonalUsage: ALLOWED` on a company-owned provisioning flow creates a WPCoD deployment).

Fully managed devices with work profiles
----------------------------------------

Please see [What is Android Enterprise and why is it used &gt; Diving deeper with work-managed devices](/android/what-is-android-enterprise-and-why-is-it-used/#diving-deeper-with-work-managed-devices) for information on fully managed devices with work profiles.

Zero-touch
----------

Please see [What is Android zero-touch enrolment?](/android/what-is-android-zero-touch-enrolment/) for information on zero-touch.