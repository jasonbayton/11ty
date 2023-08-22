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
discourse_permalink:
    - 'https://discuss.bayton.org/t/android-11-cope-changes/355'
---

Related to [this](/blog/2022/12/android-features-2023/) and [this](/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/) blog post. Here's my FR wishlist. Feel free to [request an edit](https://github.com/jasonbayton/11ty/blob/main/_src/android/android-enterprise-feature-requests.md) to add more!

## Platform-agnostic (TV, Wear, Automotive, Mobile)

1. Granular app update management ([ref](/blog/2022/12/android-features-2023/#Granular-app-update-management))
2. Granular (FOTA-esque) system update management ([ref](/blog/2022/12/android-features-2023/#Granular-system-update-management))
3. Native kiosk improvements:
    1. App layouts, including multi-page layouts
    2. Dual-app mode (split screen) for foldables/multi-screen (surface, flip/fold, dual-screeen POS, etc)
    3. Wallpaper support
    4. Intent launch support
    5. Support for admin text/banner configuration
    6. Layout lock
4. Native per-app VPN support (akin to iOS) ([ref](/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/#Native-Per-app-VPN))
5. Break out screenshots from cast/screen sharing to allow management individually (use case of remote support blacking out the screen when screenshots are disabled)
6. Data management
    1. Data caps
    2. App-type allow/blocklists
7. Terminology updates – allowlist for whitelist, blocklist for blacklist (but in a way that doesn't break APIs, we don't need more of those)
8. More dedicated default APIs (like SMS recently – launcher, phone, browser, etc, etc). Preferred intent _works_ for tested use cases but it could be improved.
9. Provisioning app caching for enrolment (DPC extras)
    1. Allow extras to list apps to pull at time of provisioning, rather than waiting for enrolment; particularly for required\_for\_setup this can speed things up a fair bit. Allow DPC to "take over" if provisioning is quick and/or apps are slow to DL.
10. Admin acceptances of T&C's & SUW prompts (GMS core). I know this has been a point of contention for years, but ultimately whether Google wants end users to accept them or not, the reality is the hundreds of thousands staged and/or set up remotely from end users means they never check the boxes anyway.
    1. For dedicated, multi-person devices, allow a config to accept SUW prompts for management and T&Cs on behalf of the company/admin, not the user. This is a massive time-suck for us today and doesn't suit the EDLA style deployment environments we work in. Allow ZT to be closer to actually ZT for stagers and provisioners
    2. Allow force-skip OEM SUW panels. Often these block enrolment until something is done on the device.
    3. Admin-configured SUW panel for support and/or enterprise information
11. Config of display density
12. Config of time zone after provisioning
13. Config of locale after provisioning
14. A universal Android "offline solution" akin to what Apple offers for backup/restore. Swapping devices is still such a pain even on 13; cloud services are OK in what they restore, and the OEM solutions (Pixel, Samsung, etc) are a little better, but it's almost never guaranteed to be a carbon copy from one device to another, or even restoring the same device. I used to leverage TWRP, then later Helium, occasionally ADB backups, to do backup & restore as needed, but it's all too much effort or too technical for the wider market – it's such a low-hanging fruit
15. Passwordless Factory Reset Protection (FRP), allowing organisations to restrict setup of a device without the need to provide authentication for it (that often needs changing). Instead, set the device in a state that requires and auth/unlock code generated from an account, or lean on passkey/other auth methods instead.
16. EMM persistence after a factory reset, similar to FRP but allowing the DPC to write a persistence bit to disk, allowing a device to be reset in an unauthorised manner while still requiring a device goes back into management rather than permitting unmanaged setup.
17. Enforce support for DPC migration, and improve UX for customers. See what [apple are doing](https://9to5mac.com/2023/07/29/an-upgrade-return-to-service-will-increase-mdm-vendor-flexibility/) for comparison.
18. Logging/debugging capability during setup/enrolment

## Mobile devices

1. Work/Personal SIM management ([ref](/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/#Work-profile-SIM-management))
    1. Assignment of a SIM to the WP phone, contacts, etc <span style="color:var(--blood-orange);"><b>⚠️ Partially added in 14 for COPE (Corp owned work profile)</b></span>
    2. ~~Cross-profile management to improve Android Auto experience (caller ID!!)~~ <span style="color:var(--blood-orange);"><b>Added in Android 14</b></span> 
    3. ~~Split of work/personal SMS~~ <span style="color:var(--blood-orange);"><b>Added in Android 14</b></span>
    4. Config of work SIM settings (Settings > N&I > SIM) in WP deployments
2. Native launcher (AOSP) features: (_Microsoft's managed launcher is a big inspiration here_)
    1. Wallpaper management
    2. Widget management
    3. Access to the feed
    4. Removal of Google account features (for admins)
    5. Managed config of home settings
    6. Layout/folder management
    7. Config of app shortcuts (long-press menu)
3. Enhance roaming APIs to include forced on, rather than just blocked.
4. Add DO permission options for battery optimisation & accessibility APIs for EMM control (two frequent OEMconfig APIs!)
5. Block adding apps as device admins (WP/COPE/FM)
6. Configure emergency alerts. _I've had my fair share of devices showing amber alerts and similar in deployed locations – not really the expectation of a managed device_
7. Configure print services
    1. Push and default a print service
    2. Fathom a system of printer remote add/configure

## Wear

1. Untethered provisioning
    1. ZT as a reasonable default
    2. NFC
    3. Set up wizard (SUW) flow support for untethered provisioning
2. Hardware management (context of full-fat Android for the things we do with hardware already)
    1. Buttons
    2. Radio 
    3. Screen
3. Basic management action support (reboot, lock, passcode, all the native stuff that may not have been ported from full-fat Android)
4. Untethered use (remove the requirement for tether under circumstances of reliable connectivity)
5. Kiosk options (but not Android kiosk, more wear-launcher config)
6. App deployment support (tethered/not)
    1. Tethered – what companion apps are permitted from the device, under what profile, support for dedicated wear managed config sent from handset apps
    2. Standalone, pull down apps from play and allow managed config
7. Multiple user support
    1. When tethered, work/personal profile app management
    2. Disable WP from wearable
    3. Cross device profile sync
    4. Ephemeral/multi-user support as an extension of the handset config
8. Industrial use case support (wear for wearable barcode scanners, data input, etc) so we can justify building with wear rather than AOSP as is the case today for small-screen industrial devices.
9. Open up wear to more OEMs (this isn't a FR, so much as a biz decision to boost wear in the ecosystem)

## Ecosystem 

1. Cuttlefish builds for TV, Automotive, Wear allowing virtual enterprise testing. Polestar aren't interested in loaning me a car.
2. Zero-touch customer device uploads
3. Multi-app selection/import in Google Play iFrame
4. AMAPI feature parity with on-device APIs (seriously, where's offline firmware update management?)
5. DPC/enterprise migration without device wipe