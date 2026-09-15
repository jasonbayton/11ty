---
title: "How do I restrict screenshots and screen recording on managed Android devices?"
published: '2026-09-13'
status: publish
author: 'Jason Bayton'
excerpt: "How administrators can block screenshots, screen recording, screen sharing, and related features on managed Android devices using AMAPI and custom DPC."
type: documentation
tags:
    - FAQ
categories:
    - General
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 44700
sources:
  - https://developers.google.com/android/management/reference/rest/v1/enterprises.policies
  - https://developer.android.com/reference/android/app/admin/DevicePolicyManager#setScreenCaptureDisabled(android.content.ComponentName,boolean)
  - https://developer.android.com/reference/android/view/WindowManager.LayoutParams#FLAG_SECURE
---

Through your EMM's policy, using the `screenCaptureDisabled` setting. When enabled, the platform applies `FLAG_SECURE` behaviour to all windows belonging to the managed user, which blocks screenshots, screen recording, screen sharing to non-secure displays, and blanks the Recents (recent apps) thumbnail for affected apps.

## What it blocks

| Blocked | Detail |
|---------|--------|
| User screenshots | Hardware button combo (Power + Volume Down) and gesture-based capture |
| Screen recording | Built-in screen recorder and third-party recording apps |
| Recents thumbnails | App previews in the recent apps overview appear blank |
| Screen sharing / casting | Mirroring to Chromecast, external displays, or video conferencing screen-share |
| Circle to Search | Gesture-triggered AI search that reads on-screen content |
| Assist structure | Context data passed to assistant apps (Android 6.0+) |

## What it does not block

| Not blocked | Why |
|-------------|-----|
| Physical camera | A user can photograph the screen with another device. Screen capture restrictions are a software control, not a physical one |
| Root-level capture tools | On a rooted or compromised device, tools with elevated privileges can circumvent FLAG_SECURE. This is outside the threat model for most enterprise deployments |

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">ADB screencap respects FLAG_SECURE</div>

On modern Android, `adb shell screencap` returns black pixels for windows protected by FLAG_SECURE. Standard ADB does not bypass the restriction. Some EMM remote view implementations use device-level services that may also respect or bypass the flag depending on implementation - check with your EMM vendor.

</div>

## AMAPI configuration

AMAPI exposes two `screenCaptureDisabled` fields depending on the scope:

**Work/managed scope** - set `screenCaptureDisabled: true` at the top level of the policy. This blocks screen capture for all apps in the managed profile or on the fully managed device.

**Personal scope (COPE only)** - set `personalUsagePolicies.screenCaptureDisabled: true` to block screen capture for personal-side apps on a company-owned device with a work profile. This is one of the few controls that reaches into the personal profile on COPE.

```json
{
  "screenCaptureDisabled": true,
  "personalUsagePolicies": {
    "screenCaptureDisabled": true
  }
}
```

## Custom DPC configuration

Custom DPCs call [`DevicePolicyManager.setScreenCaptureDisabled()`](https://developer.android.com/reference/android/app/admin/DevicePolicyManager#setScreenCaptureDisabled(android.content.ComponentName,boolean)), available since API 21 (Android 5.0). The method takes a boolean and applies to the calling admin's user scope.

From Android 6.0, this method also blocks the assist structure from being collected when an app belonging to the affected user is in the foreground - meaning assistant services cannot read on-screen content.

## Deployment scenario differences

| Scenario | Effect of `screenCaptureDisabled` |
|----------|-----------------------------------|
| **Fully managed** | Blocks capture device-wide. All apps are affected |
| **Dedicated (kiosk)** | Same as fully managed. Particularly relevant for devices displaying sensitive information in public-facing kiosks |
| **COPE** | Work scope: blocks capture only when a work app is in the foreground. Personal scope: requires `personalUsagePolicies.screenCaptureDisabled` separately. Both must be set for full device coverage |
| **BYOD (work profile)** | Blocks capture only when a work app is in the foreground. The user can still screenshot personal apps freely. The EMM has no control over the personal side |

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">COPE requires both fields for full coverage</div>

On COPE devices, setting only `screenCaptureDisabled: true` blocks capture for work apps but not personal apps. A user can still screenshot personal apps or anything visible on the personal side. To block capture across the entire device, set both the top-level `screenCaptureDisabled` and `personalUsagePolicies.screenCaptureDisabled` to `true`.

</div>

## Blocking Circle to Search without blocking screenshots

If the goal is to prevent AI-driven screen reading (Circle to Search, assistant context) without preventing users from taking screenshots, use `assistContentPolicy` (Android 15+) instead of `screenCaptureDisabled`. This controls whether AssistContent - screenshots and app information - can be sent to privileged assistant apps, while leaving user-initiated screenshot and screen recording functionality available.

This distinction matters for organisations that want to restrict data leakage through AI assistants but still allow users to capture their own screens for legitimate purposes like bug reporting or sharing non-sensitive content.

For a broader overview of controlling AI features on managed devices, see [How do I manage generative AI apps and features on managed devices?](/android/android-enterprise-faq/manage-generative-ai-managed-devices/).

## Interaction with other DLP controls

Screen capture restrictions are one layer of a broader data loss prevention strategy. Related controls include:

- **[Cross-profile copy and paste](/android/android-enterprise-faq/cross-profile-data-sharing/)** - controls whether clipboard data can move between work and personal profiles
- **USB data access** - controls file transfer over USB. See [How do I manage USB data access?](/android/android-enterprise-faq/usb-data-access-amapi/)
- **Bluetooth sharing** - the `DISALLOW_BLUETOOTH_SHARING` user restriction prevents sharing files via Bluetooth
- **NFC beam** - deprecated and removed in Android 14, but `DISALLOW_OUTGOING_BEAM` blocked NFC sharing on earlier versions

No single setting covers all data exfiltration paths. Evaluate which controls are appropriate for your risk profile rather than enabling everything - overly aggressive restrictions degrade the user experience without proportional security benefit.

## Practical considerations

- **Test before deploying broadly.** Blocking screen capture affects legitimate use cases. Support teams that rely on users sending screenshots of error messages will need alternative diagnostic approaches (remote view, bug reports via `requestBugreport()`).
- **Communicate the restriction.** Users who attempt a screenshot and see it blocked receive a brief system toast, but no detailed explanation. Proactive communication avoids confusion and support tickets.
- **Consider dedicated devices carefully.** On a kiosk displaying a product catalogue or menu, screen capture restrictions may be unnecessary and could interfere with accessibility features.
- **Disable USB debugging anyway.** Although `adb screencap` respects FLAG_SECURE on modern Android, USB debugging opens other data exfiltration paths (`adb pull`, `adb backup`). Disable it using `usbDataAccess` in AMAPI or the `DISALLOW_DEBUGGING_FEATURES` user restriction.
