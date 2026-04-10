---
title: "Is it possible to manage personal applications on a work profile device?"
published: '2024-11-11'
status: publish
author: 'Jason Bayton'
excerpt: ''
categories:
    - App management
type: documentation
tags: 
    - FAQ
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 1000
--- 
Yes, but only on **company-owned** work profile (COPE) devices. Personally-owned work profile devices (BYOD) offer no personal app management whatsoever - the EMM has zero visibility into or control over the personal profile on BYOD.

### How it works

On company-owned devices running Android 11+, personal usage policies allow organisations to control which apps are available in the personal Play Store. There are two modes:

**Blocklist mode** - the default-like behaviour. Users have full access to Google Play, but specific apps listed by the administrator are blocked. Any blocked app already installed on the personal profile is automatically uninstalled.

**Allowlist mode** - the restrictive option. The personal Play Store shows only apps explicitly approved by the administrator. Everything else is unavailable, and any app not on the allowlist that is already installed will be automatically removed.

In AMAPI, this is configured through the `personalUsagePolicies` object within the policy resource:

```json
"personalUsagePolicies": {
  "personalPlayStoreMode": "BLOCKLIST",
  "personalApplications": [
    {
      "packageName": "com.example.unwanted.app",
      "installType": "BLOCKED"
    }
  ]
}
```

For allowlist mode, set `personalPlayStoreMode` to `ALLOWLIST` and list permitted apps with `installType: "AVAILABLE"`.

Custom DPC EMMs implement this differently depending on the vendor. Microsoft Intune exposes it as a "restricted apps list" under COPE device restriction profiles. Omnissa Workspace ONE, SOTI MobiControl, and others surface similar controls through their respective policy consoles, though the underlying enforcement is the same Android platform mechanism.

### What else can be controlled on the personal profile?

Beyond app availability, `personalUsagePolicies` supports several other controls on company-owned devices:

- **Camera** - can be disabled on the personal profile
- **Screen capture** - can be disabled on the personal profile (this also blocks Circle to Search)
- **Work profile pause duration** - `maxDaysWithWorkOff` sets how long a user can keep the work profile paused (minimum 3 days)
- **Account types** - restrict which account types users can add on the personal side
- **Private Space** - on Android 15+, administrators can prevent the creation of a [Private Space](/android/what-is-android-15-private-space/)
- **Unknown sources** - sideloading can be blocked on the personal profile as a separate policy

### What it does not do

These policies do **not** provide any access or visibility to the applications or data within the personal profile. The organisation controls the catalogue of what can be installed, but cannot see which apps are actually installed, what data they contain, or how they are used. Personal privacy is maintained by design.

Personal usage policies also do not affect pre-installed system apps or OEM apps on the personal side. These are part of the device image and remain present regardless of allowlist or blocklist settings. For more on how system apps behave on COPE, see [system app management on COPE devices](/android/android-enterprise-faq/system-app-management-cope/).

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">Sideloading is a separate concern</div>

The personal app allowlist and blocklist only govern the Play Store. If unknown sources is enabled on the personal profile, users can sideload apps that bypass these restrictions entirely. For most COPE deployments, blocking unknown sources on the personal profile is strongly recommended alongside any app restriction policy.
</div>

For more on what changed with COPE in Android 11 and why these policies exist, see [Android 11 COPE changes](/android/android-11-cope-changes/) and [can organisations deploy apps to the parent profile?](/android/android-enterprise-faq/deploy-apps-outside-cope/).