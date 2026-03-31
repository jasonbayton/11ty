---
title: "Introduction to work profile"
published: '2023-06-21'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - Work profile
eleventyNavigation:
  order: 1000
layout: base.njk
---
Android's work profile was introduced in Android 5.0 Lollipop to address the challenge of managing and securing corporate data on personal devices. In Android 10 this was expanded to the COPE use case, allowing an organisation to inflate a work profile on a fully managed device, while keeping complete control over said device. Finally, in Android 11, [Google adjusted the COPE use case](/blog/2020/02/android-enterprise-in-11-google-reduces-visibility-and-control-with-cope-to-bolster-privacy/) to mirror that of BYOD, with a modicum of additional device management to aid balance between control and privacy.

So then, what is work profile?

## Overview

The Android work profile creates an isolated and separately encrypted user profile on devices within which an organisation has complete control over apps and data. Under the hood, it is built on Android's [multi-user framework](https://source.android.com/docs/devices/admin/managed-profiles) - the work profile is a secondary managed user that shares certain system-wide services (Wi-Fi, Bluetooth, NFC) with the primary user, but maintains entirely separate app data, storage, and encryption keys.

This profile is completely separate from the parent, or personal profile, meaning work and personal data are never combined save for select cross-profile functionality that offers improved data visibility and user convenience; an example of this is searching work contacts from the personal dialler, APIs for which are of course organisation-managed. When users interact with their work profile, they are doing so with applications and data an organisation manages.

Applications in a work profile are marked with a (normally) blue badge, and usually separately listed in the Android launcher either in a folder (older Android versions) or a separate launcher tab (newer Android versions). It's very possible to see the same application both in the parent and work profile, so the badge is the only differentiation between a personal and work version of the application. Like having the same application installed on other _users_ on an Android device, even though the same app is present, where the app data is _stored_ and how it is _encrypted_ is distinctly different.

## Benefits

The work profile offers some key benefits as a deployment scenario for both users and organisations.

For users, it allows them to use their personal devices for work-related activities, or a corporate device for personal activities, without having to worry about their personal data being accessed by their employer. It also allows them to easily switch the work profile on or off with a tap, making it more convenient to separate their personal and work lives.

For organisations, the work profile offers the ability to secure work-related data and applications on personal (or personally enabled) devices without having to manage an entire separate device or require users to use company-provided devices. This can save money and increase productivity for both organisations and users without giving up security or convenience. As an added benefit, organisations are able to enforce basic security over the entire device in both BYOD and COPE, such as mandating a particular password policy or preventing the installation of [unknown applications](/android/why-you-shouldnt-install-apps-from-unknown-sources/) on the parent profile.

In Android 14, Google further improved the user and admin experience of the work profile. More can be read on that [here](/blog/2023/08/work-profile-in-14/).

## Work profile lifecycle

### Creation

How a work profile is created depends on the ownership model.

For **personally owned (BYOD)** devices, the user installs the EMM agent from Google Play - or follows a web-based enrolment link - and the work profile is created during setup. For AMAPI-based EMMs this involves Android Device Policy (Google's DPC); for custom DPC vendors like Ivanti or Omnissa, their own agent acts as the DPC. The device does not need to be factory reset; the work profile is added on top of the existing personal setup.

For **company owned (COPE)** devices, the work profile is provisioned during the initial setup wizard via [zero-touch enrolment](/android/what-is-android-zero-touch-enrolment/), QR code, or (on Android 10 and below) NFC bump. The device is set up from scratch with the work profile created as part of the provisioning flow.

In both cases, a managed Google account is associated with the work profile, granting access to managed Google Play for corporate app distribution. For organisations using a managed Google Play Accounts enterprise (the most common setup), this account is silently generated during provisioning. For organisations with a managed Google domain (Google Workspace), the user's existing Workspace account is used instead.

### Pausing and toggling

Users can pause the work profile through the quick settings tile, the Settings app, the work tab in the app drawer, or through Digital Wellbeing schedules. The exact location varies by OEM and Android version.

When the work profile is paused:

- Work applications stop running and are no longer visible
- Work notifications stop
- Work apps stop consuming data and battery (on Android 13 and below)
- Calendar events from the work profile are hidden

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">How pausing actually works</div>

On Android 13 and below, pausing the work profile fully disables the profile user. The user process is shut down entirely - nothing runs in the background.

Google attempted to change this in Android 14, keeping the profile user running in the background while suspending apps (to allow background updates and caller ID continuity). This change was [reverted before the final Android 14 release](/blog/2023/09/work-profile-reverted-in-14/), likely due to concerns raised around battery and data usage during testing. The shipping behaviour on Android 14+ remains the same as Android 13: pausing fully disables the profile user.

</div>

On company-owned devices, administrators can set a `maxDaysWithWorkOff` policy (minimum 3 days) that limits how long the work profile can remain paused. If the user exceeds this limit, personal apps are suspended until the work profile is turned back on. This policy is not available on personally owned devices.

### Removal

The work profile can be removed in several ways:

- **By the user**: Through Settings, the user can delete the work profile. All work apps and data are removed; personal data is unaffected. On company owned devices, administrators can prevent this.
- **By the administrator**: The EMM can remotely wipe only the work profile without touching personal data (sometimes called a selective wipe or retire action, depending on the EMM).
- **Automatically**: If a maximum failed password attempts policy is set on the [work challenge](/android/android-enterprise-faq/what-is-a-work-challenge/) and the user exceeds it, the work profile can be automatically deleted.

When a work profile is removed from a BYOD device, the device returns to a completely unmanaged state. On a COPE device, depending on the EMM and policy configuration, a factory reset may be triggered instead.

## Differences between personally owned and company owned devices

For the user, the work profile whether used on a personally or company owned device is reasonably consistent in UX and design. But there are differences in what administrators can control.

### Personally owned (BYOD)

On BYOD devices, the EMM manages _only_ the work profile. The organisation has no visibility into personal apps, no access to personal data, and no ability to enforce policies outside the work profile beyond a handful of device-wide security basics (password complexity, blocking unknown sources).

The user can remove the work profile at any time without administrator approval. From Android 12, hardware identifiers (IMEI, serial number) are no longer exposed to the EMM on personally owned devices - an enrolment-specific ID is used instead.

### Company owned (COPE)

On company owned devices, the organisation retains additional control over the device as a whole, alongside managing the work profile. These additional capabilities include:

- Camera and screenshot control (device-wide)
- Factory reset and [FRP](/android/android-enterprise-faq/is-frp-enabled/) policies
- Bluetooth, USB data transfer, tethering, and Wi-Fi restrictions
- System update policies
- Data roaming controls
- Personal app management via [allowlist or blocklist](/android/android-enterprise-faq/manage-personal-apps-work-profile/)
- Maximum days the work profile can be paused (`maxDaysWithWorkOff`)

Importantly, even on COPE devices the organisation does not have visibility into personal app data or personal usage patterns. The additional controls are about restricting what _can_ be done on the personal side, not monitoring what _is_ being done.

The full list of company owned device policies is documented in [Google's AMAPI work profile policy reference](https://developers.google.com/android/management/policies/work-profile#company-owned_devices).

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">The Android 11 COPE shift</div>

Before Android 11, COPE was implemented as a work profile layered on top of a fully managed device. This gave administrators near-complete control over both profiles. From Android 11, Google rebuilt COPE to treat the personal side more like BYOD from a privacy perspective, with only the specific device-wide and personal usage policies listed above. This was a significant reduction in administrative control, and it caught many organisations off guard.

For a detailed breakdown of this change, see [Android Enterprise in 11: Google reduces visibility and control with COPE to bolster privacy](/blog/2020/02/android-enterprise-in-11-google-reduces-visibility-and-control-with-cope-to-bolster-privacy/).

</div>

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">A note on terminology</div>

This article references AMAPI policy names (such as `crossProfilePolicies` and `maxDaysWithWorkOff`) where specific policies are discussed. Custom DPC vendors like Ivanti, Omnissa, and others expose equivalent functionality through their own policy frameworks, often under different names. The underlying platform behaviour is the same regardless of the management API used.

</div>

## Cross-profile data sharing

By default, the work and personal profiles are strictly separated. Intents, files, clipboard content, and notifications do not cross the profile boundary unless the administrator explicitly permits it.

### Contacts

Cross-profile contact visibility is one of the more commonly configured exceptions, as it directly affects everyday usability - particularly caller ID.

The Android platform has progressively expanded cross-profile contact APIs across versions:

| Android version | Capability |
|---|---|
| 5.0 (API 21) | Phone number lookup (caller ID for work contacts) |
| 6.0 (API 23) | Email address lookup |
| 7.0 (API 24) | Contact name search and directory listing |

These are controlled by the administrator through cross-profile contact search policies. When enabled, the personal dialler can display the name and details of incoming calls from work contacts. When disabled, queries simply return empty results.

### Clipboard and intent sharing

Administrators can control whether copy and paste works between profiles, and which intents (such as opening links, sharing content, or launching specific activities) are allowed to cross the boundary. Both are disabled or restricted by default in most EMM configurations.

In AMAPI, these are managed through the `crossProfilePolicies` object, which provides separate controls for:

- Copy/paste between profiles
- Simple data sharing via intents (opening links, maps, sharing documents)
- Cross-profile contact search

For custom DPC implementations, `CrossProfileIntentFilter` provides equivalent intent-level control.

### Connected apps (Android 11+)

From Android 11, the [Connected Apps framework](https://developers.google.com/android/work/connected-apps/connected-apps) allows approved applications to display content from both profiles in a single view. Google Calendar is the most common example - it can show work and personal events side by side when enabled.

This requires both administrator consent (via policy) and user consent (always revocable).

## App management within the work profile

Applications in the work profile are distributed exclusively through managed Google Play. Administrators control app availability through their EMM console:

- **Force-installed/preinstalled apps** are silently pushed to the device without user action
- **Available apps** appear in the managed Play Store for the user to install at their discretion
- **Blocked apps** are prevented from installation entirely

Side-loading is not possible within the work profile under normal circumstances - [unknown sources](/android/why-you-shouldnt-install-apps-from-unknown-sources/) is disabled by default and cannot be enabled by the user.

Apps within the work profile support [managed configurations](/android/what-are-managed-configurations/), the same way fully managed devices do. This allows administrators to remotely configure settings such as server URLs, feature flags, and default behaviours without user intervention.

For more on how managed configurations work, see [What are managed configurations?](/android/what-are-managed-configurations/).

## Networking

### VPN

A VPN configured within the work profile routes _only_ work profile traffic. Personal apps and browsing are unaffected. This is a deliberate privacy boundary - on a BYOD device, the organisation should not be routing personal traffic through corporate infrastructure.

On COPE devices, a separate VPN can be configured at the device level for personal traffic, though this is uncommon.

Always-on VPN (available from Android 7.0) ensures the VPN connection starts at boot and stays running. When lockdown mode is enabled alongside always-on VPN, all network traffic is blocked until the VPN connects - no traffic leaks during the startup window. Administrators can further lock down the VPN by blocking uninstallation and preventing users from configuring alternative VPN apps.

Android supports only one active VPN connection per profile. This has implications for [MTD deployments](/android/mtd-and-android-enterprise/) where the MTD solution relies on a VPN slot.

For more on VPN behaviour across deployment scenarios, see [Is it possible to utilise a single VPN connection across the entire device?](/android/android-enterprise-faq/global-vpn-support/).

### Wi-Fi

Wi-Fi is a shared system service. A Wi-Fi network configured in the work profile is available device-wide, and vice versa. Enterprise Wi-Fi configurations (WPA2/3-Enterprise, EAP-TLS with certificate-based authentication) can be silently provisioned by the EMM into the work profile.

This shared behaviour is worth noting for organisations using network-based access controls - a corporate Wi-Fi network pushed to the work profile will also be available from the personal side of the device.

## The work challenge

The work challenge is a separate password or biometric requirement applied specifically to the work profile. It can operate independently of the device lock, requiring additional authentication when work apps are opened.

Administrators can configure the work challenge to:

- Share the device password (unlocking the device also unlocks the work profile)
- Require a unique password for the work profile, separate from the device lock
- Set complexity requirements (length, character types, biometric options)

For a fuller explanation, see [What is a work challenge?](/android/android-enterprise-faq/what-is-a-work-challenge/).

## OEM-specific considerations

While the work profile is an Android platform feature, the user experience varies across OEMs.

**Samsung** unified its work profile implementation in Android 13, merging the standard and Premium (Knox Platform for Enterprise) work profile into a single feature set. This moved the work profile toggle and related settings out of a dedicated settings section and into existing system settings categories (Manage accounts, Security and privacy, Sounds and vibration). Knox-specific restrictions such as per-profile microphone, camera, and clipboard controls remain available through Knox Service Plugin or OEMConfig.

**Battery optimisation** is a common source of issues. OEMs like Samsung, Xiaomi, OnePlus, and Vivo apply aggressive background process management that can delay or suppress work profile notifications, even when the profile is active. Organisations should consider configuring battery optimisation exemptions for critical work apps, and educating users about this behaviour.
