---
title: 'Android Enterprise feature requests'
published: '2023-02-16'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - General
layout: base.njk
eleventyNavigation:
  order: 1000
---

Related to [this](/blog/2022/12/android-features-2023/) and [this](/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/) blog post. Here's my FR wishlist. Feel free to [request an edit](https://github.com/jasonbayton/11ty/blob/main/_src/android/android-enterprise-feature-requests.md) to add more!

## All platforms (TV, Wear, Automotive, Mobile)

<div class="responsive-table-wrapper">

| #  | Feature                 | Notes | Implemented |
|----|-------------------------|-------|-------------|
| 01 | Granular app update management | [ref](/blog/2022/12/android-features-2023/#Granular-app-update-management) | |
| 02 | Granular (FOTA-esque) system update management | [ref](/blog/2022/12/android-features-2023/#Granular-system-update-management) | |
| 03 | Native kiosk improvements: | |                        |
|    | 1. App layouts, including multi-page layouts | | |
|    | 2. Dual-app mode (split screen) for foldables/multi-screen (surface, flip/fold, dual-screeen POS, etc) | | |
|    | 3. Wallpaper support | | |
|    | 4. Intent launch support | | |
|    | 5. Support for admin text/banner configuration | | |
|    | 6. Layout lock | | |
| 04 | Native per-app VPN support (akin to iOS) | [ref](/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/#native-per-app-vpn) |  |
| 05 | Support individual screen capture/screen record to allow management individually |  |  |
| 06 | Data management: |  |  |
|    | 1. Data caps |  |  |
|    | 2. App-level allow/blocklists |  |  |
| 07 | ~~Terminology updates – allowlist for whitelist, blocklist for blacklist~~ | In progress | ✅ |
| 08 | More default application APIs, like [SMS](https://developer.android.com/reference/android/app/admin/DevicePolicyManager#setDefaultSmsApplication(android.content.ComponentName,%20java.lang.String)) <span class="label label-sup label-green"><span class="material-symbols-outlined">android</span> 10</span> and [phone/dialer](https://developer.android.com/reference/android/app/admin/DevicePolicyManager#setDefaultDialerApplication(java.lang.String)) <span class="label label-sup label-green"><span class="material-symbols-outlined">android</span> 14</span>: launcher, browser, camera, etc, etc). | Preferred intent _works_ for tested use cases, but it is wholly unfriendly for organisations |  |
| 09 | Provisioning app caching for enrolment (DPC extras) | Allow pre-fetch of applications during the provisioning process to support faster `REQUIRED_FOR_SETUP` app deployments |  |
|    | 1. Via Play Store |  |
|    | 2. Via external/local source |  |
| 10 | Admin acceptances of T&C's & SUW prompts (GMS core): | Whether Google wants end users to accept these or not, the hundreds of thousands of staged devices in warehouses will never see end users acceptance anyway. |   |
|    | 1. For dedicated devices, allow a config to accept SUW prompts for management and T&Cs on behalf of the company/admin, not the user. | This is a massive time-suck for us today and doesn't suit the EDLA style deployment environments we work in. | <span class="label label-green"><span class="material-symbols-outlined">android</span> 15</span> Dedicated device SUW customisation coming with Android 15 |
|    | 2. Allow force-skip OEM SUW panels. Often these block enrolment until something is done on the device. |  |  |
|    | 3. Admin-configured SUW panel for support and/or enterprise information. |  |  |
| 11 | Config of display density (zoom) | For certain applications, embiggening the font/display size makes sense. |  |
| 12 | Config of time zone after provisioning | As of <span class="label label-green"><span class="material-symbols-outlined">android</span> 14</span> this is automatic, but it'd be nice to get some manual config. |  |
| 13 | Config of locale after provisioning | As of <span class="label label-green"><span class="material-symbols-outlined">android</span> 14</span> this is automatic, but it'd be nice to get some manual config. |  |
| 14 | A universal Android backup/restore solution. Preferably offline/self-hosted. | Swapping devices is still such a pain; cloud services are OK in what they restore, and the OEM solutions (Samsung, etc) are a little better, but it's almost never guaranteed to be a carbon copy from one device to another, or even restoring the same device. |  |
| 15 | Passwordless Factory Reset Protection (FRP), allowing organisations to restrict setup of a device without the need to provide authentication for it (that often needs changing). | Support on-demand auth/unlock code generation from a service-assigned account, or lean on passkey/other auth methods instead. |  |
| 16 | EMM persistence after a factory reset. | Similar to FRP but allowing the DPC to write a management bit to a protected partition (like KME), allowing a device to be reset in an unauthorised manner while still requiring a device goes back into management. |  |
| 17 | Enforce support for DPC migration, and improve UX for customers. | See what [apple are doing](https://9to5mac.com/2023/07/29/an-upgrade-return-to-service-will-increase-mdm-vendor-flexibility/) for comparison. | 🚧 [Partially added](https://bayton.org/blog/2024/01/amapi-migrations/) in AMAPI in Jan 2024. <span class="label label-green"><span class="material-symbols-outlined">android</span> 9/11</span> |
| 18 | Logging/debugging capability during setup/enrolment |  |  |
|    | 1. Give admins a means of allowing the existing feedback option in ADP to be shared with the system share activity.  |  |  |
|    | 2. Allow admins to generate a bug report during setup  |  |  |

</div>

## Mobile devices

<div class="responsive-table-wrapper">

| #  | Feature                 | Notes | Implemented |
|----|-------------------------|-------|-------------|
| 19 | Work/Personal SIM management | [ref](/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/#Work-profile-SIM-management) |  |
|    | 1. Assignment of a SIM to the WP phone, contacts, etc. |  |  BETA in <span class="label label-green"><span class="material-symbols-outlined">android</span> 14</span> for COPE (Corp owned work profile) |
|    | 2. ~~Cross-profile management to improve Android Auto experience (caller ID!!)~~ |  | <span class="label label-green"><span class="material-symbols-outlined">android</span> 14</span> |
|    | 3. ~~Split of work/personal SMS~~ |  | <span class="label label-green"><span class="material-symbols-outlined">android</span> 14</span> |
|    | 4. Config of work SIM settings (Settings > N&I > SIM) in WP deployments  |  |  |
| 20 | Native launcher (AOSP) features: | See _Microsoft's managed launcher_ for reference. |  |
|    | 1. Wallpaper management |  |  |
|    | 2. Widget management |  |  |
|    | 3. Access to the feed |  |  |
|    | 4. Removal of Google account features (for admins) |  |  |
|    | 5. Managed config of home settings |  |  |
|    | 6. Layout/folder management |  |  |
|    | 7. Config of app shortcuts (long-press menu) |  |  |
| 21 | Enhance roaming APIs to include `FORCED_ON`, rather than just blocked. |  |  |
| 22 | Add DO control over all special permissions on fully managed, company owned and dedicated devices. |  |  |
| 23 | Block adding apps as device admins (WP/COPE/FM) |  |  |
| 24 | Configure emergency alerts. | I've had my fair share of devices showing amber alerts and similar in deployed locations – not really the expectation of a managed device |  |
| 25 | Configure print services: |  |  |
|    | 1. Push and default a print service |  |  |
|    | 2. Fathom a system of printer remote add/configure |  |  |
|    | 3. ~~Control access to printing~~ | [Added in 2023](https://developers.google.com/android/management/reference/rest/v1/enterprises.policies#printingpolicy) | <span class="label label-green"><span class="material-symbols-outlined">android</span> 9.0</span> |

</div>

## Wear

<div class="responsive-table-wrapper">

| #  | Feature                 | Notes | Implemented |
|----|-------------------------|-------|-------------|
| 26 | Untethered provisioning |  |  |
|    | 1. ZT as a reasonable default |  |  |
|    | 2. NFC |  |  |
|    | 3. Set up wizard (SUW) flow support for untethered provisioning |  |  |
| 27 | Hardware management (context of full-fat Android for the things we do with hardware already) |  |  |
|    | 1. Buttons |  |  |
|    | 2. Radio  |  |  |
|    | 3. Screen |  |  |
| 28 | Basic management action support (reboot, lock, passcode, all the native stuff that may not have been ported from full-fat Android) |  |  |
| 29 | Untethered use (remove the requirement for tether under circumstances of reliable connectivity) |  |  |
| 30 | Kiosk options (but not Android kiosk, more wear-launcher config) |  |  |
| 31 | App deployment support (tethered/not) |  |  |
|    | 1. Tethered – what companion apps are permitted from the device, under what profile, support for dedicated wear managed config sent from handset apps |  |  |
|    | 2. Standalone, pull down apps from play and allow managed config |  |  |
| 32 | Multiple user support |  |  |
|    | 1. When tethered, work/personal profile app management |  |  |
|    | 2. Disable WP from wearable |  |  |
|    | 3. Cross device profile sync |  |  |
|    | 4. Ephemeral/multi-user support as an extension of the handset config |  |  |
| 33 | Industrial use case support (wear for wearable barcode scanners, data input, etc) so we can justify building with wear rather than AOSP as is the case today for small-screen industrial devices. |  |  |
| 34 | Open up wear to more OEMs (this isn't a FR, so much as a biz decision to boost wear in the ecosystem) |  |  |

</div>

## Non-mobile

<div class="responsive-table-wrapper">

| #  | Feature                 | Notes | Implemented |
|----|-------------------------|-------|-------------|
| 35 | Align unified provisioning method options across all non-mobile platforms - TV, Android Automotive, Wear. | I'm hoping BTE will actually handle this with managed Google accounts |  |
| 36 | Push notifications for webapps support | | |

</div>

## Ecosystem 

<div class="responsive-table-wrapper">

| #  | Feature                 | Notes | Implemented |
|----|-------------------------|-------|-------------|
| 37 | Cuttlefish builds for TV, Automotive, Wear allowing virtual enterprise testing. | Polestar aren't interested in loaning me a car. |  |
| 38 | Zero-touch customer device uploads. | Every other OOBE solution on the market allows for customer-driven uploads. Resellers are a frustrating friction point harming ZT adoption for existing estates. |  |
| 39 | Multi-app selection/import in Google Play iFrame |  |  |
| 40 | **AMAPI feature parity with on-device APIs** | Seriously, where's offline firmware update management? |  |
| 41 | Give some love to AER | Public reqs are unchanged since <span class="label label-green"><span class="material-symbols-outlined">android</span> 12</span>, it appears innovation here has stopped. | |

</div>