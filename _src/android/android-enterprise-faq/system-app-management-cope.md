---
title: "How should system applications be handled on a COPE device?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - Work profile
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "How should system applications be handled on a COPE device?"
  order: 32000
--- 
System app behaviour on COPE devices changed fundamentally with Android 11. Understanding how it works across both eras is important for getting the personal profile experience right.

### Android 8-10 (work profile on fully managed device)

On Android 8-10, COPE was implemented as a work profile inflated on top of a fully managed device. The EMM held device owner privileges, meaning the entire device - personal side included - was under management.

During provisioning, the DPC extra `android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED` controls whether non-vital system apps are kept or disabled on the parent profile. This is supported through QR code, NFC, and zero-touch provisioning (but not DPC identifier).

My recommendation for COPE in this era was to **set this to true** - enable all system apps. The organisation is providing a device intended for personal use, so the closer to stock it feels, the more familiar the user will be with it. Gallery, calculator, health apps, camera, and other OEM app suites being present on the personal side should be harmless outside of the secure work profile.

If specific system apps need removing - bloatware, for instance - most EMMs support ad-hoc system app management post-provisioning. There is no reason to strip everything and selectively re-enable when the opposite approach is simpler and more user-friendly.

For more on how system apps are determined during provisioning, see [what are vital apps?](/android/what-are-vital-apps/).

### Android 11+ (work profile on company-owned device)

Google redesigned COPE in Android 11. The device is no longer fully managed with a work profile on top. Instead, it uses an enhanced work profile where the personal side is treated much like a consumer device. The EMM is a profile owner, not a device owner.

This means:

- **The personal profile retains all OEM and system apps by default.** There is no provisioning extra to strip or control them - the personal side provisions as it would on a consumer device.
- **The EMM cannot install, uninstall, or manage apps on the personal profile** in the way it could on Android 8-10. Parent profile app management was removed entirely.
- **Personal app control is limited to Play Store availability** through [personal usage policies](/android/android-enterprise-faq/manage-personal-apps-work-profile/) - allowlist or blocklist modes for Play Store apps. This does not affect pre-installed system apps.

In practice, this is the right outcome for most COPE deployments. Users get a personal profile that looks and feels like their own device, and the organisation controls what can be additionally installed from Google Play without dictating the core device experience.

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">What about work profile system apps?</div>

The work profile still follows the vital apps model. Which system apps appear in the work profile is determined by the OEM’s vital apps XML configuration, not by the admin. Admins can deploy additional apps to the work profile through managed Google Play, but cannot directly control which system apps are present in it. See [what are vital apps?](/android/what-are-vital-apps/) for details on how this works and why it varies between OEMs.
</div>

For the full picture on what changed with COPE in Android 11, see [Android 11 COPE changes](/android/android-11-cope-changes/).

