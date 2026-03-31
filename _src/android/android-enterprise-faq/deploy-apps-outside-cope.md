---
title: "Can organisations deploy applications to the parent profile in a COPE deployment?"
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
  key: "Can organisations deploy applications to the parent profile in a COPE deployment?"
  order: 30000
sources:
  - https://developers.google.com/android/management/reference/rest/v1/enterprises.policies
  - https://developer.android.com/work/versions/android-11
---
The short answer is no - not on any modern COPE deployment. The longer answer depends on which era of COPE is in question.

### Android 8-10 (work profile on fully managed device)

On Android 8-10, COPE was implemented as a work profile inflated on top of a fully managed device. Because the EMM held device owner privileges, it had the same level of control as a fully managed deployment - including the ability to deploy applications to the parent (personal) profile.

In practice, this was limited. Some custom DPC EMMs - notably VMware Workspace ONE UEM - supported uploading APKs to the console for parent profile deployment. However, no EMMs supported pushing Google Play applications to both profiles simultaneously. It was a niche capability used primarily for deploying in-house apps or security tools (like MTD agents) to the personal side.

### Android 11+ (work profile on company owned device)

Google fundamentally redesigned COPE in Android 11. The device is no longer fully managed with a work profile on top. Instead, it uses an enhanced work profile model where the EMM is a profile owner, not a device owner. This was an explicit trade-off: more user privacy at the cost of IT control.

Deploying or force-installing applications to the parent profile is **not possible** on Android 11+, regardless of whether the EMM uses AMAPI or a custom DPC. The OS-level change applies to all management architectures.

### What organisations can do instead

Through [personal usage policies](/android/android-enterprise-faq/manage-personal-apps-work-profile), COPE deployments on Android 11+ can control which apps are *available* in the personal Play Store:

- **Allowlist mode** (`personalPlayStoreMode: WHITELIST`) - restricts the personal Play Store to only apps explicitly approved by the administrator. Everything else is blocked and automatically uninstalled if already present.
- **Blocklist mode** (`personalPlayStoreMode: BLACKLIST`) - allows full Play Store access, blocking only specific apps listed by the administrator.

These policies control availability, not installation. The organisation cannot force-install apps to the personal side or silently deploy managed configurations to personal apps, but they absolutely can dictate what is and isn't permitted on the personal profile. It is management - just not the same granular, per-app management available within the work profile.

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">This does not grant visibility</div>

Personal usage policies do not give the organisation visibility into which apps are installed on the personal profile, what data they contain, or how they are used. The organisation controls the catalogue, but the user's actual app usage remains private. This is by design. For more on privacy in work profile deployments, see [what is a work profile?](/android/what-is-android-work-profile/)
</div>

### If full parent profile control is needed

Organisations that genuinely need to deploy and manage apps across the entire device should use a **fully managed** (work-only) deployment instead of COPE. This gives device owner-level control but removes the personal profile entirely. There is no middle ground on Android 11+ - it is either full control with no personal space, or a work profile with privacy boundaries.

For more on the COPE changes, see [Android 11 COPE changes](/android/android-11-cope-changes/).
