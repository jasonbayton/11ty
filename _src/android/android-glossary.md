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

AAB (Android App Bundle)
------------------------

The modern app packaging format for Android, replacing the traditional [APK](#apk-android-package-kit) for Play Store distribution. An AAB is uploaded to Google Play, which then generates optimised APKs for each device configuration (screen density, CPU architecture, language). In Android Enterprise, AABs are relevant when publishing [private apps](#managed-google-play) to Managed Google Play - the Play Console requires AAB uploads. See [Manage private apps](/android/android-enterprise-faq/manage-private-apps/) for more.

ADB (Android Debug Bridge)
--------------------------

A command-line tool that lets developers and administrators communicate with Android devices over USB or Wi-Fi. ADB is commonly used in enterprise contexts for troubleshooting provisioning issues, sideloading [APKs](#apk-android-package-kit), setting [device owner](#device-owner) without factory reset, and debugging management policies. ADB access is typically restricted on managed devices via policy. See [Can I set device owner without factory reset?](/android/android-enterprise-faq/can-i-set-device-owner-without-factory-reset/) for one common ADB use case.

AE (Android Enterprise)
-----------------------

Shorthand for [Android Enterprise](#android-enterprise). Commonly used in forums, documentation, and conversation. See [What is Android Enterprise and why is it used?](/android/what-is-android-enterprise-and-why-is-it-used/) for the full overview.

Android Enterprise
------------------

Google's set of APIs, tools, and deployment models for managing Android devices in an enterprise context. Android Enterprise replaced [device administrator](#device-administrator) as the recommended management approach and provides standardised deployment scenarios including [fully managed](#work-managed), [work profile](#work-profile), [dedicated](#dedicated-device), and [COPE](#cope). It is supported on all [GMS-certified](#gms-certifiedcertification) devices. See [What is Android Enterprise and why is it used?](/android/what-is-android-enterprise-and-why-is-it-used/) for the full guide.

AER (Android Enterprise Recommended)
-------------------------------------

A programme run by Google that certifies devices, EMMs, and managed service providers (MSPs) that meet a defined set of enterprise requirements. For devices, AER requirements include minimum hardware specifications, consistent and timely security patch delivery, and support for key Android Enterprise features. For EMMs, requirements cover API completeness and management capabilities. See [What is Android Enterprise Recommended?](/android/what-is-android-enterprise-recommended/) for more.

AMAPI (Android Management API)
-------------------------------

The Android Management API is Google's current-generation management API for Android Enterprise. Rather than requiring each EMM to build their own [DPC](#dpc-device-policy-controller), AMAPI provides a cloud-based REST API that EMMs integrate with server-side, paired with a Google-built DPC called [Android Device Policy](#android-device-policy-adp). AMAPI uses a standardised JSON policy model, meaning the same policy structure works across all AMAPI-based EMMs.

AOSP (Android Open Source Project)
----------------------------------

The open-source codebase that forms the foundation of Android. AOSP includes the core OS, framework APIs, and default apps, but does not include Google Play Services, the Play Store, or other [GMS](#gms-certifiedcertification) components. Devices built purely on AOSP without GMS licensing (common in China and on some budget devices) do not officially support Android Enterprise. See [Is Android Enterprise supported in China?](/android/android-enterprise-faq/is-android-enterprise-supported-in-china/) and [Why do some devices omit GMS?](/android/why-devices-omit-gms/) for more context.

APN (Access Point Name)
-----------------------

A network configuration setting that defines the gateway between a mobile carrier's cellular network and the internet. In Android Enterprise, APNs can be configured remotely via EMM policy on fully managed and company-owned devices, which is important for organisations that use private APNs or need to ensure correct carrier connectivity. See [AMAPI APN management](/android/android-enterprise-faq/amapi-apn-management/) for details.

APK (Android Package Kit)
-------------------------

The file format used for distributing and installing applications on Android. An APK contains the app's compiled code, resources, assets, and manifest. In enterprise contexts, APKs are relevant when sideloading apps outside of [Managed Google Play](#managed-google-play), distributing internal apps, or troubleshooting installation issues. Android Enterprise generally discourages installation from [unknown sources](#unknown-sources) in favour of managed distribution. See also [AAB](#aab-android-app-bundle) for the modern distribution format.

Android Device Policy (ADP)
---------------------------

Android Device Policy is Google's own [DPC](#dpc-device-policy-controller) app, used exclusively with [AMAPI](#amapi-android-management-api). It replaces the need for EMMs to build and maintain their own DPC app. ADP receives policy instructions from Google's AMAPI cloud service and enforces them on the device using the `DevicePolicyManager` framework APIs. It is always on the [DPC allowlist](#dpc-allowlist) and is updated by Google independently of EMM release cycles.

API
---

One or more functions of an application or service that may be accessed by a 3rd party, either publicly or with authentication. As a practical example, the EMM agent on a device may request a passcode is set and/or validate it is both set and within policy requirements frequently by leaning on the relevant device API for this information.

BFU (Before First Unlock)
-------------------------

The device state after a reboot but before the user enters their PIN, pattern, or password for the first time. BFU is closely related to [Direct Boot](#direct-boot) - during BFU, only `directBootAware` apps can run and credential-encrypted storage is inaccessible. In Android Enterprise, BFU is relevant for security policies because certain management actions and compliance checks cannot execute until the device is unlocked.

BPP (Bulk Purchase Program)
----------------------------

A mechanism that allowed organisations to purchase paid apps in bulk through [Managed Google Play](#managed-google-play) and distribute licences to managed devices. Google has since removed support for paid app distribution through Managed Google Play. See [Managed Play paid apps no longer available](/android/android-enterprise-faq/managed-play-paid-apps-no-longer-available/) for details.

BYOD (Bring Your Own Device)
----------------------------

A deployment model where employees use their personally-owned devices for work. In Android Enterprise, BYOD is implemented using a [work profile](#work-profile) that creates a separate, encrypted container for work apps and data on the personal device. The organisation has no visibility into personal apps or data. See [Android Enterprise deployment scenarios](/android/infobyte-did-you-know-android-enterprise-deployment-scenarios) for a comparison with other deployment models. *(Pending publication)*

CDD (Compatibility Definition Document)
---------------------------------------

A document published by Google for each Android version that defines the requirements a device must meet to be considered compatible with Android. The CDD covers hardware requirements, API behaviour, security features, and more. Devices that pass the associated CTS (Compatibility Test Suite) and meet CDD requirements are eligible for [GMS certification](#gms-certifiedcertification). The CDD is [publicly available](https://source.android.com/docs/compatibility/cdd) and is useful for understanding what guarantees a given Android version provides to enterprise administrators.

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

DPM (DevicePolicyManager)
-------------------------

The core Android framework class that provides the APIs for device management. DPM is what [DPCs](#dpc-device-policy-controller) use under the hood to enforce policies - setting password requirements, configuring restrictions, managing certificates, controlling system updates, and more. [AMAPI](#amapi-android-management-api) abstracts over DPM via [Android Device Policy](#android-device-policy-adp), while [custom DPCs](#custom-dpc) call DPM APIs directly.

DLP (Data Loss Prevention)
--------------------------

A set of policies and controls designed to prevent sensitive corporate data from leaving the managed environment. In Android Enterprise, DLP is primarily enforced through [work profile](#work-profile) isolation - work apps cannot share data with personal apps, copy-paste between profiles can be restricted, and screenshot capture can be disabled within the work profile. On [COPE](#cope) and [fully managed](#work-managed) devices, additional DLP controls include disabling [unknown sources](#unknown-sources), restricting USB file transfer, and controlling Bluetooth sharing.

DA (Device Admin/Device Administrator)
--------------------------------------

Shorthand for [device administrator](#device-administrator). See below.

Device administrator
--------------------

This is the name for what can be considered the *legacy* method of managing an Android device. It is so called because when using an application that requires control over the device, such as an EMM agent, the application will prompt the user to grant it administrator privileges. Once granted, the application will have unrestricted access to device functionality and information in order to do whatever it needs without hindrance. This access is equally why device admin can be dangerous.

DO (Device Owner)
-----------------

Shorthand for [device owner](#device-owner). See below.

Device owner
------------

A technical term for what is now mostly associated with [work-managed](#work-managed). Device owner is the process of setting an EMM agent as the [device policy controller](#dpc-device-policy-controller) for the entire device. It is essentially what has replaced [device administrator](#device-administrator) on legacy devices and enrolments.

Device Trust
------------

A set of verified device signals provided by Google to registered enterprise security and identity partners through the AMAPI SDK (v1.3.0+). Device Trust offers over 20 signals covering device state, configuration, and compliance posture, enabling zero-trust access decisions without requiring full device management. It works across all ownership models — company-owned, BYOD, and even unmanaged devices — and requires a minimum of Android 10. Device Trust is distinct from [Play Integrity](#play-integrity); Play Integrity is a general-purpose API for verifying device and app integrity, while Device Trust provides granular posture data specifically for enterprise security providers. See [What is Device Trust?](/android/android-enterprise-faq/what-is-device-trust/) for more detail.

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

EDR (Endpoint Detection and Response)
-------------------------------------

A category of security solution that continuously monitors endpoints for suspicious activity and provides investigation and response capabilities. In Android Enterprise, EDR functionality is increasingly delivered through [MTD](#mtd-mobile-threat-defence) apps that integrate with the EMM via [application roles](#amapi-android-management-api) introduced in Android 15. EDR solutions on Android typically monitor network traffic, app behaviour, and device integrity signals.

EDLA (Enterprise Device Licensing Agreement)
--------------------------------------------

A Google licensing agreement for dedicated-use Android devices that aren't consumer smartphones or tablets - think digital signage, kiosks, point-of-sale terminals, and industrial handhelds. EDLA devices receive [GMS](#gms-certifiedcertification) certification and can run Google Play Services, but they are certified under different requirements than standard consumer devices (which use MADA). EDLA devices support Android Enterprise management. See [GMS vs EDLA](/android/android-enterprise-faq/gms-vs-edla-enterprise/) for more.

EMUI (Emotion UI)
-----------------

Huawei's custom Android skin, used on Huawei and formerly Honor devices. EMUI is relevant in the enterprise context because its deep customisations to the Android framework can cause inconsistencies with standard Android Enterprise provisioning and management behaviour. Huawei devices running EMUI may also lack [GMS](#gms-certifiedcertification) due to US trade restrictions, making them unsuitable for Android Enterprise deployments that require Google Play Services.

EFRP (Enterprise Factory Reset Protection)
------------------------------------------

An enterprise-specific extension of [FRP](#frp-factory-reset-protection) that allows administrators to designate which Google accounts can unlock a device after a factory reset, rather than relying on the previously signed-in account. EFRP is configured via EMM policy and is available on Android 11+ for fully managed and company-owned devices. See [FRP vs Enterprise FRP](/android/android-enterprise-faq/frp-vs-enterprise-frp/) for details.

eSIM (Embedded SIM)
-------------------

A SIM that is soldered into the device rather than inserted as a removable card, allowing remote provisioning of carrier profiles. In Android Enterprise, eSIM management is increasingly relevant for company-owned devices - administrators can provision, switch, or remove carrier profiles remotely without physical SIM swaps. Android 15 introduced enterprise eSIM management APIs. See [Manage eSIM](/android/android-enterprise-faq/manage-esim/) for more info.

Enrolment token (Enrollment - EN-US)
---------------

A credential generated by an EMM (via the AMAPI `enrollmentTokens.create` endpoint or equivalent in custom DPC platforms) that authorises a device to enrol into a specific enterprise with a specific policy. Enrolment tokens can be delivered as QR codes, NFC payloads, or [zero-touch](#zero-touch) configurations. In [AMAPI](#amapi-android-management-api), a token can be configured with `allowPersonalUsage` to control whether the device provisions as fully managed or with a work profile, and supports `oneTimeOnly` to restrict the token to a single use. Tokens have a configurable expiry, after which they can no longer be used for provisioning.

EMM (Enterprise Mobility Management)
-------------------------------------

Enterprise Mobility Management, the industry term for solutions that manage mobile devices, applications, and data in an enterprise context. EMM platforms (such as Microsoft Intune, Omnissa Workspace ONE, SOTI MobiControl, and others) provide the server-side console and infrastructure that administrators use to configure policies, deploy apps, and monitor devices. An EMM integrates with Android Enterprise either through [AMAPI](#amapi-android-management-api) or the legacy [custom DPC](#custom-dpc) model. Also sometimes referred to as UEM (Unified Endpoint Management) or MDM (Mobile Device Management), though these terms have slightly different scopes.

FQDN (Fully Qualified Domain Name)
-----------------------------------

A complete domain name that specifies the exact location of a host in the DNS hierarchy (e.g. `emm.example.com`). In Android Enterprise, FQDNs appear in [DPC extras](#dpc-extras) configurations for specifying EMM server addresses during provisioning, in network requirements for firewall allowlisting, and in Wi-Fi and VPN configurations pushed to managed devices.

FCM (Firebase Cloud Messaging)
------------------------------

Google's cloud messaging service that delivers push notifications and data messages to Android devices. In Android Enterprise, FCM is the primary mechanism EMMs use to send real-time policy updates, commands (like lock or wipe), and notifications to managed devices. Devices that cannot reach FCM endpoints will experience delays in receiving management commands. See [Network requirements for Android Enterprise](/android/android-enterprise-faq/network-requirements-android-enterprise/) for the required endpoints.

FM (Fully Managed)
------------------

Shorthand for a fully managed device deployment, also known as [device owner](#device-owner) or [work-managed](#work-managed). In a fully managed deployment, the EMM controls the entire device. See [What is Android Enterprise and why is it used?](/android/what-is-android-enterprise-and-why-is-it-used/#diving-deeper-with-work-managed-devices) for more.

FBE (File-based encryption)
---------------------------

The encryption scheme introduced in Android 7.0 that replaced full-disk encryption (FDE). FBE encrypts different files with different keys, allowing the system to boot to a functional state before the user enters their PIN (Direct Boot) and enabling each user profile to be encrypted independently. For Android Enterprise, FBE is significant because it means the work profile is encrypted with its own keys, separate from the personal profile. A [work challenge](#work-challenge) provides the decryption key for work profile data.

FOTA (Firmware Over The Air)
----------------------------

The delivery of firmware updates - including bootloader, radio, and other low-level components - to devices wirelessly. Some OEMs offer their own FOTA services (e.g. Samsung E-FOTA) that provide enterprise-grade control over firmware versioning and deployment scheduling, separate from Android Enterprise [system update policies](#system-update-policy). See also [OTA](#ota-over-the-air) 

FRP (Factory Reset Protection)
------------------------------

A security feature that requires the previous Google account credentials to be entered after a factory reset, preventing unauthorised use of a stolen or lost device. In Android Enterprise, FRP is particularly relevant for fully managed and company-owned devices. Administrators can configure which Google accounts are authorised to unlock a device after factory reset using `setFactoryResetProtectionPolicy()` (Android 11+). From Android 15, FRP remains active even when OEM unlock is enabled. See [Feature spotlight: Factory Reset Protection](/android/feature-spotlight-factory-reset-protection/) for more.

Extensibility framework
-----------------------

A capability within [AMAPI](#amapi-android-management-api) that allows EMMs to perform on-device operations that require local execution, without building a full [custom DPC](#custom-dpc). EMMs can designate an extension app via the `extensionConfig` field in an application's policy. This extension app communicates directly with [Android Device Policy](#android-device-policy-adp) on the device using the AMAPI SDK, enabling local command execution. At time of writing, the primary supported command is `ClearAppData`, with Google expanding available commands over time. The extensibility framework allows EMMs to differentiate their on-device capabilities while still using Google's standardised DPC.

Freeze period
-------------

A mechanism within the system update policy that allows administrators to define date ranges during which no OTA system updates are installed on managed devices. Freeze periods repeat annually, can be up to 90 days long, and must be separated by at least 60 days. They block both security patches and OS version upgrades indiscriminately. Available on Android 9.0+ for fully managed and company-owned devices only. 

HAL (Hardware Abstraction Layer)
--------------------------------

A platform layer in Android that provides a standard interface between the OS framework and device-specific hardware (camera, sensors, radio, etc.). HALs are relevant in enterprise contexts because they affect device consistency - OEM HAL implementations can cause behavioural differences across devices. HALs also determine what hardware features are available to management APIs.

GMS certified/certification
---------------------------

Not to be confused with the GMS license, which is simply permission for a company to use/distribute the Google suite of applications, GMS certification provides Google’s stamp of approval that a device meets Google’s recommended specifications and requirements. It is not a requirement for devices to be GMS certified in order to be made and sold – a notable example being the Amazon Fire line of tablets – however Android Enterprise is officially only supported on GMS certified devices and therefore purchasing non-GMS certified devices, such as low-cost options from China, is almost certainly going to result in difficulty managing them.

IAM (Identity and Access Management)
------------------------------------

A framework of policies and technologies for managing digital identities and controlling access to resources. In Android Enterprise, IAM is relevant when setting up [AMAPI](#amapi-android-management-api) projects (which require Google Cloud IAM configuration), configuring [SSO](#sso-single-sign-on) for managed apps, and managing which administrators can access the EMM console and zero-touch portal.

IDP (Identity Provider)
-----------------------

A service that authenticates users and provides identity tokens to applications. Common IDPs in Android Enterprise environments include Google Workspace, Microsoft Entra ID (Azure AD), and Okta. IDPs integrate with [EMM](#emm-enterprise-mobility-management) solutions for user authentication and with managed apps via [SSO](#sso-single-sign-on) for seamless access to corporate resources across the [work profile](#work-profile).

IMEI (International Mobile Equipment Identity)
-----------------------------------------------

A unique 15-digit identifier assigned to every mobile device. In Android Enterprise, IMEIs are used for device identification across a range of surfaces, including [zero-touch](#zero-touch) enrolment (devices are registered by IMEI or serial number), EMM inventory management, compliance reporting, and telecom expense tracking. On [work profile](#work-profile) BYOD deployments, IMEI access is be restricted for privacy reasons. From Android 10, non-privileged apps can no longer access IMEI.

KDC (Key Distribution Center)
-----------------------------

The Kerberos authentication server that issues tickets for accessing network resources. In Android Enterprise environments that use Kerberos for intranet authentication, managed Android devices need network access to the KDC (typically over [VPN](#vpn-virtual-private-network)) to obtain [TGTs](#tgt-ticket-granting-ticket) and service tickets for accessing corporate resources like SharePoint, intranet sites, and file shares.

KME (Knox Mobile Enrolment)
---------------------------

Samsung's proprietary zero-touch-like provisioning system for Samsung devices. KME allows organisations to register Samsung devices for automatic enrolment with their EMM, similar to Google's [zero-touch](#zero-touch) enrolment but managed through Samsung's Knox portal rather than the Android zero-touch portal. KME supports fully managed and dedicated device provisioning, and can be used alongside or instead of zero-touch depending on the deployment. Devices registered with KME automatically download and configure the EMM's [DPC](#dpc-device-policy-controller) on first boot.

KPE (Knox Platform for Enterprise)
-----------------------------------

Samsung's enterprise SDK and platform that provides device management capabilities beyond what standard Android Enterprise APIs offer. KPE is accessed through [OEMConfig](#oemconfig) via the [Knox Service Plugin (KSP)](#ksp-knox-service-plugin) or directly by [custom DPCs](#custom-dpc) that integrate the KPE SDK. KPE extends Android Enterprise - it does not replace it. See [Does Samsung support Android Enterprise?](/android/android-enterprise-faq/does-samsung-support-android-enterprise/) for more.

KSP (Knox Service Plugin)
--------------------------

Samsung's [OEMConfig](#oemconfig) app that exposes [KPE](#kpe-knox-platform-for-enterprise) capabilities to any EMM via [managed configurations](#managed-configurations). KSP is published on Google Play and can be deployed as a managed app through any EMM that supports OEMConfig. It provides granular Samsung-specific controls (hardware restrictions, network policies, firmware management) on top of standard Android Enterprise policies. See [Samsung Knox and Android Enterprise](/android/android-enterprise-faq/samsung-knox-android-enterprise-interaction/) for the full breakdown.

Lock task mode
--------------

The Android platform mechanism that powers [dedicated device](#dedicated-device) kiosk behaviour. When active, the device is restricted to a set of allowlisted apps - the status bar, home button, and overview button are hidden or disabled by default, and users cannot exit to the home screen. From Android 9, any app can be started in lock task mode without needing to support it explicitly. In [AMAPI](#amapi-android-management-api), lock task is configured by setting an app's `installType` to `KIOSK` or by enabling `kioskCustomLauncherEnabled`. The `kioskCustomization` object provides granular control over what UI elements remain visible. Lock task mode requires [device owner](#device-owner) privileges and is therefore only available on fully managed and dedicated devices, not [work profile](#work-profile) deployments. See [Android Enterprise deployment scenarios](/android/infobyte-did-you-know-android-enterprise-deployment-scenarios) for more.

MCP (Model Context Protocol)
----------------------------

An open protocol for connecting AI assistants to external data sources and tools. In the Android Enterprise context, MCP is relevant because [AMAPI](#amapi-android-management-api) now has an MCP server available, allowing AI assistants to query and manage Android Enterprise estates conversationally. See [AMAPI MCP server](/android/android-enterprise-faq/amapi-mcp-server/) for setup details.

MDM (Mobile Device Management)
-------------------------------

A term used broadly to describe solutions that manage mobile devices in an enterprise context. MDM is often used interchangeably with [EMM](#emm-enterprise-mobility-management), though technically MDM refers specifically to device-level management (policies, restrictions, remote wipe), while EMM encompasses a broader scope including application management, content management, and identity. In the Android Enterprise ecosystem, most solutions marketed as MDM are functionally EMMs. See also [EMM](#emm-enterprise-mobility-management).

MADA (Mobile Application Distribution Agreement)
-------------------------------------------------

The Google licensing agreement that standard consumer Android devices must hold to distribute Google apps (Play Store, Gmail, YouTube, etc.). MADA devices are the typical smartphones and tablets most people interact with. Compare with [EDLA](#edla-enterprise-device-licensing-agreement) for dedicated-use devices. See [GMS vs EDLA](/android/android-enterprise-faq/gms-vs-edla-enterprise/) for the differences.

MAM (Mobile Application Management)
------------------------------------

An approach to enterprise mobility that focuses on managing individual applications rather than the entire device. MAM solutions apply policies (encryption, copy-paste restrictions, authentication) at the app level without requiring device-level management. In the Android ecosystem, MAM is sometimes positioned as a lighter alternative to [work profile](#work-profile) for BYOD, but Google's recommended approach is to use a work profile for proper data separation, or [Device Trust](#device-trust) for zero-trust access without device-level management. See [MAM vs work profile](/android/android-enterprise-faq/mam-vs-work-profile/) for a detailed comparison.

Managed configurations
----------------------

Also referred to as app configuration, managed app config, or application restrictions. A framework capability that allows administrators to remotely push settings (key-value pairs) to applications on managed Android devices through their EMM. The app must declare a configuration schema (`app_restrictions.xml`) for managed configurations to work. Common examples include pushing Exchange profiles to email apps, configuring VPN settings, or setting a homepage in Chrome.

Managed Google Play
-------------------

The enterprise version of the Google Play Store, activated when an organisation sets up an Android Enterprise environment. Managed Google Play provides IT administrators with control over which apps are available to managed devices, supports silent (force) installation of apps, and enables distribution of private and web apps exclusive to the organisation. On fully managed devices, Managed Google Play replaces the standard Play Store entirely. On work profile deployments, it appears as a separate, badged Play Store within the work profile. Managed Google Play is not a separate product - it is a capability of the Android Enterprise platform, powered by the [enterprise binding](#managed-google-play-accounts).

GEM (Google Endpoint Management)
---------------------------------

Google's built-in device management capability within Google Workspace and Cloud Identity. GEM provides basic Android Enterprise management (work profile, app deployment, compliance policies) without requiring a third-party [EMM](#emm-enterprise-mobility-management). It is suitable for organisations already using Google Workspace that need straightforward mobile management. For more advanced management needs, Google Workspace can also be used alongside a third-party EMM. See [Workspace third-party EMM setup](/android/android-enterprise-faq/workspace-third-party-emm-setup/) for configuration details.

GPSU (Google Play System Updates)
---------------------------------

Shorthand for [Google Play System Updates](#google-play-system-updates-mainline). See below.

Google Play System Updates (mainline)
-------------------------------------

Also known as Project Mainline. A delivery mechanism introduced in Android 10 that allows Google to update core Android OS modules directly through Google Play, independently of the device OEM. As of Android 14, there are 37 updatable mainline modules covering connectivity, multimedia, and core framework components. Since April 2024, mainline updates are no longer governed by Android Enterprise system update policies. See [Google Play System Updates (mainline) are no longer managed by Android Enterprise system update policies](/android/gpsu-system-update/) for details.

MTE (Memory Tagging Extension)
-------------------------------

An ARM hardware security feature that helps detect memory safety bugs (buffer overflows, use-after-free) by tagging memory allocations. MTE is supported on newer Android devices and is part of Google's push toward memory-safe computing. In Android Enterprise, MTE contributes to the overall device security posture and is one of the advanced protection features available on supported hardware.

MTD (Mobile Threat Defence)
---------------------------

A category of security solution that detects and responds to threats on mobile devices - including malware, network attacks, phishing, and device vulnerabilities. In Android Enterprise, MTD apps commonly run alongside the [EMM](#emm-enterprise-mobility-management) agent and feed threat signals back to the EMM for compliance decisions. From Android 15, [AMAPI](#amapi-android-management-api) introduced application roles that allow MTD apps to receive elevated permissions. See [MTD and Android Enterprise](/android/mtd-and-android-enterprise/) for the full guide.

Management mode
---------------

The level of control an EMM has over a device, determined by how the device was provisioned. Android Enterprise supports three primary management modes: **fully managed** ([device owner](#device-owner)) where the EMM controls the entire device; **work profile** ([profile owner](#profile-owner)) where the EMM controls only the work container; and **dedicated** where a fully managed device is locked into a limited set of apps via [lock task mode](#lock-task-mode). The management mode is set during provisioning and cannot be changed without a factory reset (for fully managed) or work profile removal (for work profile).

Managed Google domain
---------------------

One of two enterprise types for Android Enterprise. A managed Google domain is tied to a verified domain name and typically associated with a Google Workspace subscription. It requires domain verification and provides additional identity integration. Compare with [Managed Google Play Accounts enterprise](#managed-google-play-accounts).

Managed Google Play Accounts
----------------------------------------

The more common enterprise type for Android Enterprise. A managed Google Play Accounts enterprise can be set up with any Google account, requires no domain verification, and takes minutes to configure. The EMM manages individual Android Enterprise accounts on devices, and Google doesn't associate these accounts with any particular user, enhancing privacy. From mid-2024, the new customer signup flow creates a zero-cost managed Google domain for all new binds. Compare with [Managed Google domain](#managed-google-domain).

NFC
---

Near Field Communication(s) – NFC is a radio on the device used for close-proximity data transmission. Android Pay utilises NFC for contactless payments, however it is also widely used in the EMM industry for device enrolment/provisioning, supporting the transmission of EMM server or Android Enterprise data from a host device to the target with a simple bump.

OOBE (Out-of-Box Experience)
----------------------------

The initial setup flow a user encounters when powering on a new or factory-reset Android device. The OOBE is intercepted by provisioning services that take over the device setup — [zero-touch](#zero-touch), Samsung [KME](#kme-knox-mobile-enrolment), Zebra StageNow, Elo View, and similar [OEM](#oem) or platform services that configure device management automatically.

OEM
---

Original Equipment Manufacturer, a manufacturer of devices such as Samsung, Sony or LG.

OTA (Over-the-Air)
------------------

The delivery mechanism for system updates (both Android version upgrades and security patches) distributed by device OEMs or carriers. OTA updates are the primary update type controlled by Android Enterprise [system update policies](#system-update-policy). Compare with [Google Play System Updates](#google-play-system-updates-mainline), which are delivered through Google Play infrastructure.

OEMConfig
---------

A standardised approach that allows OEMs to provide additional device management capabilities beyond the base Android Enterprise APIs, managed directly through any EMM. OEMConfig works by packaging OEM-specific configuration options into an app published on Google Play, which exposes its settings via [managed configurations](#managed-configurations). This means EMMs don't need to build custom integrations for each OEM - the OEM's configuration app acts as the bridge. See [What is OEMConfig?](/android/what-is-oemconfig/) for more.

PIM (Personal Information Management)
-------------------------------------

A category of applications covering email, calendar, contacts, and tasks. In Android Enterprise, PIM apps are commonly the first applications deployed to a [work profile](#work-profile), and their configuration (Exchange server settings, sync intervals, account credentials) is typically pushed via [managed configurations](#managed-configurations). Common enterprise PIM apps include Microsoft Outlook, Gmail, and Nine.

PiP (Picture-in-Picture)
------------------------

An Android feature that allows a video or app to continue playing in a small floating window while the user interacts with other apps. In Android Enterprise, PiP is relevant for [dedicated device](#dedicated-device) and kiosk deployments where administrators may need to explicitly allow or block PiP mode. When [lock task mode](#lock-task-mode) is active, PiP behaviour may be restricted depending on the kiosk configuration.

PHA (Potentially Harmful Application)
-------------------------------------

Google's classification for apps that exhibit malicious or risky behaviour, including malware, spyware, trojans, and apps that abuse device permissions. [Play Protect](#play-protect) scans for PHAs both on Google Play and on devices. In Android Enterprise, PHA detection feeds into compliance signals and is one reason why [unknown sources](#unknown-sources) installation is disabled by default on managed devices.

Parent profile
--------------

The parent profile is essentially *the device* on a BYOD or [COPE](#cope) [work profile](#work-profile) deployment. It is referred to as the parent profile as the work profile is integrated into it. Technically the profiles sit alongside each other on the device rather than the work profile being a “child” of the parent, however this is how it’s perceived and commonly explained.

Play Protect
------------

Google's built-in security service for Android devices. Play Protect scans apps installed from Google Play and via sideloading for malware and potentially harmful applications (PHAs). In the Android Enterprise context, Play Protect is particularly relevant because it enforces the [DPC allowlist](#dpc-allowlist) during provisioning - if an EMM's DPC is not on the allowlist, Play Protect will block it with a "Harmful app blocked" warning. Play Protect also contributes to [Play Integrity](#play-integrity) attestation signals. It can be configured through EMM policy but should generally remain enabled.

Play Integrity
--------------

Google's device integrity verification API, the successor to SafetyNet Attestation (which was shut down in January 2025). Play Integrity allows apps and services to verify that a device is genuine, running a recognised build of Android, and has not been tampered with. It returns integrity verdicts including device integrity, app integrity, and account licensing signals. In Android Enterprise, Play Integrity underpins compliance checks - EMMs use it to assess whether a device meets organisational security requirements.

Private Space
-------------

A user-facing feature introduced in Android 15 that creates an isolated area within the personal profile, protected by additional authentication (PIN, password, or biometric). Users can install apps into Private Space that are hidden from the launcher, notification shade, and recent apps. On company-owned devices, administrators can block Private Space creation via `DISALLOW_ADD_PRIVATE_PROFILE`. Private Space is not available on fully managed devices. Apps within Private Space do not route through a configured work VPN. See [What is Private Space?](/android/what-is-android-15-private-space/) for full details.

Play EMM API
------------

The legacy server-side API that [custom DPCs](#custom-dpc) used for managed Google Play operations - app approval and distribution, managed configurations, managed Google Play account provisioning, entitlements, and app track management. The Play EMM API was deprecated by Google in September 2021, with most methods permanently shut down in September 2025. All deprecated functionality has [AMAPI](#amapi-android-management-api) equivalents.

PO (Profile Owner)
------------------

Shorthand for [profile owner](#profile-owner). See below.

Profile owner
-------------

A technical term for what is now mostly referenced as [work profile](#work-profile). A profile owner is normally considered to be the [DPC](#dpc-device-policy-controller) installed on a device by an EMM solution or a user if downloaded from the Play Store. It has permission to create a work profile, manipulate it and remove it, but holds very little control over the [parent profile](#parent-profile)

Provisioning
------------

The act of preparing a device for enrolment. During provisioning the device will download and install a [DPC](#dpc-device-policy-controller), then set the device as [work-managed](#work-managed) before landing on the home screen (or just before depending on when EMM enrolment is prompted). In the [provisioning guides](/android/android-enterprise-provisioning-guides/), provisioning and enrolment are clearly referred to as two separate tasks for deploying a device. Once provisioning completes, the user can then enrol through the [DPC.](#dpc-device-policy-controller)

QR (Quick Response code)
------------------------

A two-dimensional barcode used as a provisioning method in Android Enterprise. During the [OOBE](#oobe-out-of-box-experience), scanning a QR code can pass enrolment configuration (EMM server details, [DPC extras](#dpc-extras), Wi-Fi credentials) to the device. QR codes can provision [fully managed](#work-managed) devices from factory reset, set up [COPE](#cope) work profiles, or (via [Android Device Policy](#android-device-policy-adp)) initiate [BYOD](#byod-bring-your-own-device) work profiles. See [Android Enterprise provisioning guides](/android/android-enterprise-provisioning-guides/) for instructions.

RKP (Remote Key Provisioning)
-----------------------------

A security mechanism that provisions cryptographic attestation keys to Android devices remotely via Google's servers, replacing the previous approach of embedding keys at the factory. RKP improves the scalability and security of [key attestation](#play-integrity), and is becoming the default for newer devices. In Android Enterprise, RKP underpins device integrity verification and certificate-based trust decisions.

SCEP (Simple Certificate Enrollment Protocol)
----------------------------------------------

A protocol for automated certificate enrolment, commonly used in enterprise environments to distribute device and user certificates for Wi-Fi (EAP-TLS), [VPN](#vpn-virtual-private-network), and email authentication. In Android Enterprise, SCEP profiles are configured through the EMM and pushed to managed devices. [AMAPI](#amapi-android-management-api) does not natively support SCEP - EMMs that support it typically do so through their [extensibility framework](#extensibility-framework) or companion apps.

SDK (Software Development Kit)
-------------------------------

A collection of tools, libraries, and documentation that developers use to build applications for a platform. In Android Enterprise, the Android SDK provides the `DevicePolicyManager` APIs that [DPCs](#dpc-device-policy-controller) use to enforce management policies. The SDK level (API level) is also relevant for compliance - from Android 14, apps targeting an SDK level more than one major version behind the device's OS version may be blocked from installation. See [Android 14 minimum SDK](/android/android-14-minimum-sdk/) for details.

SPL (Security Patch Level)
--------------------------

The date-based identifier for the set of security patches applied to an Android device, in the format YYYY-MM-DD. The day portion is typically either "01" (AOSP-only patches) or "05" (AOSP plus vendor/kernel patches). SPL is commonly used in EMM compliance policies to ensure devices are running reasonably current security updates. Viewable on a device under Settings > About phone > Android security patch level.

SSO (Single Sign-On)
--------------------

An authentication mechanism that allows users to sign in once and access multiple applications without re-entering credentials. In Android Enterprise, SSO is relevant for [work profile](#work-profile) and [fully managed](#work-managed) deployments where corporate apps need unified authentication - typically via an identity provider (IDP) like Azure AD/Entra ID or Google Workspace. SSO configurations are commonly pushed via [managed configurations](#managed-configurations) to browser and authentication apps.

SUW (Setup Wizard)
------------------

The Android system application that runs during the initial device setup flow ([OOBE](#oobe-out-of-box-experience)). In Android Enterprise, the Setup Wizard is where provisioning methods like [QR code](#qr-quick-response-code), [NFC](#nfc), [zero-touch](#zero-touch), and [DPC identifier](#dpc-identifier-dpci) are invoked. OEM customisations to the Setup Wizard can occasionally cause provisioning inconsistencies across different device manufacturers.

System update policy
--------------------

An AMAPI policy resource (`systemUpdatePolicy`) that controls how [OTA](#ota-over-the-air) system updates are installed on managed Android devices. Supports four modes: device default, automatic, windowed (daily maintenance window), and postpone (30-day deferral for OS upgrades only). Available on Android 8.0+ for fully managed and company-owned devices. 

TEM (Telecoms Expense Management)
----------------------------------

A solution category focused on managing and optimising an organisation's mobile and telecoms spending. TEM platforms track data usage, roaming charges, and plan costs across managed device fleets. While not directly an Android Enterprise feature, TEM solutions often integrate with [EMM](#emm-enterprise-mobility-management) platforms and use device identity data ([IMEI](#imei-international-mobile-equipment-identity), phone number) from managed devices.

TGT (Ticket Granting Ticket)
-----------------------------

A Kerberos authentication token issued by the [KDC](#kdc-key-distribution-center) that allows a client to request service tickets for accessing specific network resources without re-entering credentials. In Android Enterprise environments using Kerberos for intranet access, the managed device obtains a TGT after the user authenticates, which then enables [SSO](#sso-single-sign-on) across corporate web applications and file shares.

UEM (Unified Endpoint Management)
----------------------------------

The evolution of [EMM](#emm-enterprise-mobility-management), encompassing management of not just mobile devices but also desktops, laptops, IoT devices, and other endpoints from a single console. Most modern EMM vendors market themselves as UEM providers. In practice, when discussing Android Enterprise, the terms EMM, UEM, and [MDM](#mdm-mobile-device-management) are often used interchangeably, though UEM implies broader platform coverage. Examples include Microsoft Intune, Omnissa Workspace ONE, and SOTI MobiControl.

VPN (Virtual Private Network)
-----------------------------

A technology that creates an encrypted tunnel between a device and a corporate network, protecting data in transit and enabling access to internal resources. In Android Enterprise, VPN configuration is a key policy area - administrators can deploy always-on VPN profiles to ensure all traffic is routed through the corporate VPN, configure per-app VPN to restrict which apps use the tunnel, and set lockdown mode to block all network access if the VPN drops. Work profile deployments route only work app traffic through the VPN by default. See [Global VPN support](/android/android-enterprise-faq/global-vpn-support/) and [Multiple VPN connections](/android/android-enterprise-faq/multiple-vpn-connections/) for more.

Unknown sources
---------------

This is a setting on most Android devices to permit the installation of applications via means external to the official Play Store. If you’ve ever tried to install an APK file on a device, you will have been prompted to enable unknown sources. Installation of applications via unknown sources however contributes to well over 60% of all malware and other threats, and is therefore strongly discouraged – in fact, it’s disabled in Android Enterprise by default.

Vital apps
----------

Apps that are considered essential for the basic operation of a managed device and are therefore not disabled when an EMM applies a system app policy. On fully managed and dedicated devices, most pre-installed system apps are hidden by default - only apps on Google’s "vital apps" list remain enabled. This list typically includes core functions like the dialler, settings, and system UI components. EMMs can selectively re-enable additional system apps beyond the vital apps list. The vital apps list varies by device and Android version and is not published publicly by Google, which can make it difficult to predict exactly which apps will be available out of the box on a newly provisioned device.

Work challenge
--------------

A secondary passcode requirement for BYOD [work profile](#work-profile) devices. Not dissimilar to traditional container solutions which required a PIN in order to access the applications within. Essentially you’ll have one passcode to unlock the device, then another passcode requirement in order to open any work applications.

XR (eXtended Reality)
---------------------

An umbrella term covering virtual reality (VR), augmented reality (AR), and mixed reality (MR) devices. In the Android Enterprise context, XR devices like Meta Quest and other Android-based headsets are increasingly being deployed in enterprise environments for training, collaboration, and field service. Android Enterprise management support for XR devices is evolving - see [Android Enterprise on XR devices](/android/android-enterprise-faq/android-enterprise-on-xr-devices/) for the current state.

WP (Work Profile)
-----------------

Shorthand for [work profile](#work-profile). See below.

Work-managed
------------

Please see [What is Android Enterprise and why is it used &gt; Diving deeper with work-managed devices](/android/what-is-android-enterprise-and-why-is-it-used/#diving-deeper-with-work-managed-devices) for information on work-managed.

Work profile
------------

Please see [What is Android Enterprise and why is it used &gt; BYOD and work profile](/android/what-is-android-enterprise-and-why-is-it-used/#byod-and-work-profile) for information on work profile.

WPoFMD (Work Profile on Fully Managed Device)
-----------------------------------------------

The internal/technical name for the [COPE](#cope) deployment model as it existed before Android 11. In this model, a device was first provisioned as [fully managed](#work-managed), and then a [work profile](#work-profile) was layered on top. This gave organisations near-complete visibility and control over both the personal and work sides of the device - effectively a fully managed device that also happened to have a work profile. Google retired WPoFMD in Android 11, replacing it with [WPCoD](#wpcod-work-profile-on-company-owned-device), which drastically reduced organisational visibility into the personal side. The distinction matters because pre-Android 11 COPE deployments that relied on full device control were significantly impacted by the migration. See [COPE changes in Android 11](/android/android-11-cope-changes/) for details.

WPCoD (Work Profile on Company-Owned Device)
---------------------------------------------

The internal/technical name for the [COPE](#cope) deployment model as it exists from Android 11 onwards. In Android 11, Google completely redesigned COPE from [WPoFMD](#wpofmd-work-profile-on-fully-managed-device) (a work profile layered on top of a fully managed device) to a work profile deployment with slightly elevated company-owned controls. The practical difference is significant - WPCoD gives the organisation less visibility into the personal side of the device compared to the pre-Android 11 COPE model, but offers employees substantially more privacy. The term WPCoD appears frequently in Google documentation and AMAPI policy references (`allowPersonalUsage: ALLOWED` on a company-owned provisioning flow creates a WPCoD deployment). Also commonly written as WPoCOD.

Fully managed devices with work profiles
----------------------------------------

Please see [What is Android Enterprise and why is it used &gt; Diving deeper with work-managed devices](/android/what-is-android-enterprise-and-why-is-it-used/#diving-deeper-with-work-managed-devices) for information on fully managed devices with work profiles.

Zero-touch
----------

Please see [What is Android zero-touch enrolment?](/android/what-is-android-zero-touch-enrolment/) for information on zero-touch.