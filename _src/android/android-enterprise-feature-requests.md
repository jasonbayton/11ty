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

Related to [this](/blog/2022/12/android-features-2023/) and [this](/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/) blog post. Here's my FR wishlist. Feel free to request an edit to add more!

## Universal

1. Granular app update management ([ref](https://bayton.org/blog/2022/12/android-features-2023/#Granular-app-update-management))
1. Granular (FOTA-esque) system update management ([ref](https://bayton.org/blog/2022/12/android-features-2023/#Granular-system-update-management))
1. Native kiosk improvements:
    1. app layouts, including multi-page layouts
    1. dual-app (split screen) for foldables/multi-screen (surface, flip/fold, dual-screeen POS, etc)
    1. Wallpaper support
    1. Intent launch support
    1. Support for admin text/banner configuration
    1. Layout lock
1. Native per-app VPN support (akin to iOS) ([ref](https://bayton.org/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/#Native-Per-app-VPN))
1. Break out screenshots from cast/screen sharing to allow management individually (use case of remote support blacking out the screen when screenshots are disabled)
1. Data management
    1. Data caps
    1. App-type allow/blocklists
1. Terminology updates – allowlist for whitelist, blocklist for blacklist (but in a way that doesn't break APIs, we don't need more of those)
1. More dedicated default APIs (like SMS recently – launcher, phone, browser, etc, etc). Preferred intent \*works\* but it could be improved.
1. Provisioning app caching for enrolment (DPC extras)
    1. Allow extras to list apps to pull at time of provisioning, rather than waiting for enrolment; particularly for required\_for\_setup this can speed things up a fair bit. Allow DPC to "take over" if provisioning is quick and/or apps are slow to DL.
1. Admin acceptances of T&C's & SUW prompts (GMS core)  
_(I know this has been a point of contention for years, but ultimately whether Google wants end users to accept them or not, the reality is the hundreds of thousands staged and/or set up remotely from end users means they never check the boxes anyway.)_
    1. For dedicated, multi-person devices, allow a config to accept SUW prompts for management and T&Cs on behalf of the company/admin, not the user. This is a massive time-suck for us today and doesn't suit the EDLA style deployment environments we work in. Allow ZT to be closer to actually ZT for stagers and provisioners
    1. Allow force-skip OEM SUW panels. Often these block enrolment until something is done on the device.
    1. Admin-configured SUW panel for support and/or enterprise information
1. Config of display density
1. Config of timezone after provisioning
1. Config of locale after provisioning
1. A universal Android "offline solution" akin to what apple offers for backup/restore. Swapping devices is still such a pain even on 13; cloud services are OK in what they restore, and the OEM solutions (Pixel, Samsung, etc) are a little better, but it's almost never guaranteed to be a carbon copy from one device to another, or even restoring the same device. I used to leverage TWRP, then later Helium, occasionally ADB backups, to do backup & restore as needed, but it's all too much effort or too technical for the wider market – it's such a low-hanging fruit

## Handsets/tablets

1. Work/Personal SIM management ([ref](https://bayton.org/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/#Work-profile-SIM-management))
    1. Assignment of a SIM to the WP phone, contacts, etc.
    1. Cross-profile management to improve Android Auto experience (caller ID!!)
    1. Split of work/personal SMS
    1. Config of work SIM settings (Settings \> N&I \> SIM) in WP deployments
1. Native launcher (AOSP) features:
    1. Wallpaper management
    1. Widget management
    1. Access to the feed
    1. Removal of Google account features (for admins)
    1. Managed config of home settings
    1. Layout/folder management
    1. Config of app shortcuts (long-press menu)
1. Config of roaming
1. Improve battery optimisation & accessibility APIs to be leveraged by admins (two frequent OEMconfig APIs!)
1. Block adding apps to DA (WP/COPE)
1. Configure emergency alerts  
_Context is dedicated devices have on more than one occasion in stores all started showing amber alerts and similar – not really the expectation of a managed device_
1. Configure print services
    1. Push and default a print service
    1. Fathom a system of printer remote add/configure

## Wear

1. Untethered provisioning
    1. ZT as a reasonable default
    1. NFC
    1. SUW flow support for untethered provisioning
1. Hardware management (context of full-fat Android for the things we do with hardware already)
    1. Buttons
    1. Radio 
    1. Screen
1. Basic management action support (reboot, lock, passcode, all the native stuff that may not have been ported from full-fat Android)
1. Untethered use (remove the requirement for tether under circumstances of reliable connectivity)
1. Kiosk options (but not Android kiosk, more wear-launcher config)
1. App deployment support (tethered/not)
    1. Tethered – what companion apps are permitted from the device, under what profile, support for dedicated wear managed config sent from handset apps
    1. Standalone, pull down apps from play and allow managed config
1. Multiple user support
    1. When tethered, work/personal profile app management
    1. Disable WP from wearable
    1. Cross device profile sync
    1. Ephemeral/multi-user support as an extension of the handset config
1. Industrial use case support (wear for wearable barcode scanners, data input, etc) so we can justify building with wear rather than AOSP as is the case today for small-screen industrial devices.
1. Open up wear to more OEMs (this isn't a FR, so much as a biz decision to boost wear in the ecosystem)

## Unrelated FR

1. Cuttlefish builds for TV, Automotive, Wear allowing virtual enterprise testing. Polestar aren't interested in loaning me a car.