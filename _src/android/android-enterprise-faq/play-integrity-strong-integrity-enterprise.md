---
title: "What is Strong Integrity, and why are my Android 13+ devices failing compliance?"
published: '2026-09-14'
status: publish
author: 'Jason Bayton'
excerpt: "Why Android 13+ devices can fail Strong Integrity despite being unmodified, how OS and vendor patch levels affect the verdict, and what Intune administrators should review before 31 October 2026."
type: documentation
tags:
    - FAQ
categories:
    - General
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 74500
sources:
  - https://developer.android.com/google/play/integrity/verdicts
  - https://developer.android.com/google/play/integrity/overview
  - https://developer.android.com/google/play/integrity/improvements
  - https://learn.microsoft.com/en-us/intune/whats-new/in-development
  - https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-android-enterprise-settings
  - https://learn.microsoft.com/en-us/intune/app-management/protection/ref-settings-android
  - https://learn.microsoft.com/en-us/intune/app-management/protection/troubleshoot-protection-logs
  - https://developer.android.com/google/play/integrity/remediation
  - https://developer.android.com/google/play/integrity/reference/com/google/android/play/core/release-notes
  - https://developers.google.com/android/management/device-trust-api
---

Strong Integrity is an optional device label returned by Google's [Play Integrity API](https://developer.android.com/google/play/integrity/overview). Apps and enterprise mobility management (EMM) platforms can use it when deciding whether to allow access to their services.

A genuine, unmodified device can fail this check because its security patches are too old. On Android 13 and above, that includes the vendor patch level, so the Android security update date you can see in Settings may not fully reflect reality.

## What changed

Google [updated the verdicts in May 2025](https://developer.android.com/google/play/integrity/improvements). The requirements for `MEETS_STRONG_INTEGRITY` depend on the Android version:

| Android version | Strong Integrity requirements |
|-----------------|------------------------------|
| Android 12 and below | Hardware-backed proof of boot integrity, with no requirement for a recent security update |
| **Android 13 and above** | `MEETS_DEVICE_INTEGRITY` **and security updates within the last year for all device partitions**, including the Android OS and vendor partitions |

On Android 13+, Device Integrity requires hardware-backed proof of a locked bootloader and a certified manufacturer OS image. Strong Integrity adds the patch-age requirement. A device can therefore continue to meet Device Integrity while losing Strong Integrity. [Google documents both definitions here](https://developer.android.com/google/play/integrity/verdicts).

Play Integrity can return several device labels together, including `MEETS_BASIC_INTEGRITY`, `MEETS_DEVICE_INTEGRITY`, and `MEETS_STRONG_INTEGRITY`. The service receiving them decides what to accept. Losing Strong Integrity only affects access where the policy actually requires it.

For an enterprise deployment, check whether the device is still receiving firmware updates and whether those updates are being installed. If the Android OS patch is recent but Strong Integrity still fails, ask the manufacturer about the vendor patch level as well. Installing every update offered doesn't guarantee the manufacturer has brought every partition within the required window.

## Example of enforcement

As of 12 October 2026, [Microsoft says Intune will enforce the updated definition by **31 October 2026**](https://learn.microsoft.com/en-us/intune/whats-new/in-development#plan-for-change-google-play-strong-integrity-definition-update-for-android-13-or-above). Until then, it has adjusted compliance and app protection policy behaviour to follow Google's backward compatibility guidance.

For affected Android 13+ devices:

- A compliance policy requiring Strong Integrity can mark the device non-compliant. Access then depends on the organisation's [Conditional Access policies](/android/android-enterprise-faq/conditional-access-android-enterprise/).
- An app protection policy requiring Strong Integrity can fail its conditional launch check. The configured action determines whether the user is warned, blocked, or has their organisational app data wiped. [Microsoft's policy diagnostics document these actions](https://learn.microsoft.com/en-us/intune/app-management/protection/troubleshoot-protection-logs).

Android 12 and below are unaffected by this particular change. Passing Strong Integrity on those versions gives you no assurance that the security patches are recent.

## Reviewing your policies

I'd start with the assigned policies, then look at the affected devices. There's little to gain from replacing a device before you've established which check failed and what your organisation requires.

In Intune's [Android Enterprise compliance policies](https://learn.microsoft.com/en-us/intune/device-security/compliance/ref-android-enterprise-settings), review **Play Integrity Verdict** and **Check strong integrity using hardware-backed security features**. In [Android app protection policies](https://learn.microsoft.com/en-us/intune/app-management/protection/ref-settings-android), review **Play integrity verdict**, **Play integrity verdict evaluation type**, and the associated conditional launch action.

You can set an explicit Android patch threshold through **Minimum security patch level** in compliance policies or **Min patch version** in app protection policies. These let you specify your own minimum date, including a stricter requirement than Google's one-year window. Review that date regularly as your patch requirements move forward.

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">Check what your patch policy covers</div>

A minimum Android patch date doesn't establish that the vendor partition is equally recent. Strong Integrity checks both. I wouldn't treat it as redundant simply because there's already a patch requirement in the compliance policy.

If you decide Device Integrity is sufficient for your deployment, assess the loss of that additional check before changing the policy.

</div>

Test representative devices before changing enforcement, particularly models approaching the end of their update support. Install available firmware updates and recheck the result. Where the manufacturer can no longer supply a qualifying build, plan replacement or a documented exception based on your security requirements. Users bringing their own devices will need notice too, especially if their only route back to access is a newer device.

## Checking a failed verdict

Start with the EMM's per-device compliance results or the affected app's policy diagnostics. How much of the underlying verdict is exposed depends on the product.

The API is called by an app, with its response evaluated by the service's backend. On Android 13+, Google only returns the optional Basic and Strong Integrity labels when the requesting app is licensed through Google Play (installed or updated by Play). A missing Strong Integrity label therefore needs investigating; it doesn't establish an outdated patch by itself. [Google's verdict documentation covers this restriction](https://developer.android.com/google/play/integrity/verdicts#optional-device-information-and-device-recall).

App developers can also display Google's [remediation dialogs](https://developer.android.com/google/play/integrity/remediation), including `GET_INTEGRITY` and `GET_STRONG_INTEGRITY`. These were added in [Play Integrity library 1.5.0 on 28 August 2025](https://developer.android.com/google/play/integrity/reference/com/google/android/play/core/release-notes). They guide users through supported fixes, but the app has to implement them, and a dialog can't supply a firmware update the manufacturer hasn't released.

## Relationship to Device Trust

[Device Trust from Android Enterprise](/android/android-enterprise-faq/what-is-device-trust/) gives approved partners device posture signals through the AMAPI SDK. Google [recommends checking Play Integrity before relying on those signals](https://developers.google.com/android/management/device-trust-api#prerequisites), since signals from a device that fails the integrity checks shouldn't be trusted.

That recommendation doesn't specify that every integration must require Strong Integrity. Play Integrity returns several signals about the app, device, and environment; the integrating service chooses its acceptance criteria. Device Trust adds posture information for the service to use in its access decision.
