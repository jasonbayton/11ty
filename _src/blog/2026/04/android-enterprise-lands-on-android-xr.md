---
title: "Android Enterprise lands on Android XR"
date: '2026-04-07'
status: publish
author: 'Jason Bayton'
excerpt: "Google has finally documented Android Enterprise support for XR devices. Here's what management looks like, and how it compares to mobile."
type: post
tags:
    - Enterprise
---

After months of "coming soon", Google has published the [Android Enterprise for Android XR](https://developers.google.com/android/work/xr-management) documentation, alongside a [support article](https://support.google.com/work/android/answer/16998029) detailing management capabilities for XR devices. It's been a long wait since the Galaxy XR launched late last year without enterprise support, and now we can finally see what Google has been working on.

The short version: it's fully managed only at the moment, the validation requirements are sensibly adapted for the form factor, and there's a curious statement about custom DPCs that I'll dig into below.

## What is Android XR?

For anyone not following the space, Android XR is Google's extended reality platform, announced in December 2024 in partnership with Samsung and Qualcomm. It's built on Android's foundation, which means existing Android apps can run in a spatial environment alongside native XR experiences. Think of it as Android, but for headsets and smart glasses rather than phones and tablets.

This matters for enterprise because it means organisations don't need to rebuild their app portfolio from scratch. The apps already deployed through managed Google Play can, in principle, run on XR devices.

Google categorises Android XR devices into two types:

- **Headsets and wired glasses** - standalone devices running a full OS instance. These are the manageable ones, available as video see-through (VST) or optical see-through (OST) variants
- **AI glasses** - lightweight companions with cameras, microphones, and speakers. These don't run a full OS and function as accessories to a primary device, so they're not independently managed

## What devices exist today?

The Android XR ecosystem is still young:

- **Samsung Galaxy XR** - launched October 2025 at $1,800. The first and currently only shipping Android XR headset. Powered by the Snapdragon XR2+ Gen 2
- **XREAL Project Aura** - tethered AR glasses announced for 2026. First AR glasses running Android XR, using a split-compute design with a tethered processing puck
- **Samsung smart glasses** - two models confirmed for 2026, developed in partnership with Google, Warby Parker, and Gentle Monster
- **Google AI glasses** - launching with Warby Parker and Gentle Monster for 2026, with Kering Eyewear confirmed as a future partner
- **Sony** - confirmed as a partner, no device announced yet

For enterprise today, the Galaxy XR is the only game in town. Everything else is announced or in development.

## What management is available?

The documentation confirms management is based on the **fully managed device** mode. No work profile, no COPE, no BYOD - just fully managed. Given the form factor and the current state of the ecosystem, this makes sense. XR headsets are far more likely to be company-owned, purpose-deployed devices than personal BYOD kit. At least for now (this guy notwithstanding).

EMMs can use either AMAPI or a custom DPC. The validation requirements are adapted from the standard mobile fully managed set, with some thoughtful changes that reflect the XR form factor.

### What's required (and matches mobile)

The core enterprise foundation is intact. All of the following are required for XR validation, just as they are on mobile:

- **Provisioning**: DPC identifier (afw#), QR code, and zero-touch enrolment
- **Security**: Device security challenge, Verify Apps, Direct Boot, hardware security, advanced passcode, wipe and lock, compliance enforcement, Play Integrity
- **App management**: Enterprise binding, silent app distribution, managed configurations (including 4-level nesting), managed Google Account provisioning
- **Connectivity**: Runtime permission management, Wi-Fi configuration and security, account management, certificate management (basic and advanced), factory reset protection
- **Device management**: System update policy

### What's been hardened for XR

Several features that are optional on mobile have been made _required_ for XR, and the choices are sensible:

- **Disable cameras** - mandatory on XR, optional on mobile. Given XR headsets have always-on spatial awareness cameras and potentially outward-facing cameras for passthrough, this is an obvious requirement. The privacy implications of an unmanageable camera on a headset in a corporate environment would be a non-starter
- **Screen capture management** - also mandatory. Screen capture on a spatial device could expose far more context than on a phone
- **System audio management** - required for XR, optional on mobile. Controlling audio output on a device strapped to someone's face matters more than on a phone in a pocket
- **System clock management** - required for XR
- **Advanced Wi-Fi management** - required for XR, optional on mobile
- **Advanced app control** - required for XR
- **Reboot device** - required for XR.
- **Persistent preferred activity management** - required. This is particularly relevant for kiosk-style XR deployments
- **MAC address retrieval** - required for XR, optional on mobile

### What's been relaxed or removed

On the other side, some mobile requirements have been downgraded or dropped entirely:

**Downgraded from required to recommended:**
- Advanced VPN management
- Delegated scope management
- Programmatic app approval
- Basic store layout management
- Google-hosted private app management
- Web app management
- Application track management
- Advanced application update management
- Managed Google Play Account lifecycle management
- Direct zero-touch configuration

This suggests Google is being pragmatic about the maturity of the XR EMM ecosystem. The core management is mandatory; the more advanced Play management features are encouraged but not gating. Sensible for a v1.

**Not currently present (present on mobile, absent from XR):**
- NFC provisioning
- Smart Lock management
- eSIM management
- Advanced IME management
- Keyguard features
- Lock screen messages
- Credential manager policy
- Policy transparency management
- Device admin deprecation requirements

This is compared to the required items on the fully managed checklist for mobile devices. Some of these may still be in flight, some may not apply to XR (device admin?). It's still early days for XR, so we'll see how things progress.

### What's been added for XR

A handful of features appear in the XR set that aren't in the standard mobile fully managed requirements, it looks like they've been folded in from dedicated, instead:

- **Dedicated device provisioning** - listed as required, reflecting that XR headsets are expected to commonly operate in kiosk or dedicated device modes
- **Security policies for dedicated devices** - required
- **Advanced lock task mode management** - recommended

This confirms what I'd expect: many XR enterprise deployments will be dedicated/kiosk-style, where the headset runs a specific application or set of applications (training, simulation, remote assistance) rather than serving as a general-purpose device.

### XR-specific notes

The documentation includes a couple of XR-specific technical callouts:

- **Lock task mode** currently supports locking to a single 3D app only. Notifications and Quick Settings are unavailable because there's no status bar. EMMs need to allowlist `com.android.systemui` and `com.google.xr.eyetracking.calibration` as helper system apps
- **Media Projection** (screen casting) must be limited to **2880x2880** resolution. Higher resolutions cause display issues

Neither is surprising, but both matter for customers deploying XR, as I've dealt with issues with `com.android.systemui` missing on mobile in the past, also.

## Custom DPCs: a confusing position

The XR management documentation states:

> New custom DPCs for managing Android XR are allowed and are eligible for validation, but these are not eligible for validation for managing mobile devices.

This reads as though new custom DPCs can be built _specifically for XR_, but those same DPCs cannot then be validated for mobile device management.

On the surface this might seem reasonable - separate validation tracks for separate form factors. But this doesn't align with how the DPC allowlist works today.

The [DPC allowlist](https://support.google.com/work/android/answer/16694822) that I [wrote about](/blog/2025/12/the-dpc-allowlist/) in December doesn't distinguish between form factors. There's no "mobile DPC" vs "XR DPC" distinction in the allowlist documentation. A DPC is a DPC - it calls DevicePolicyManager APIs, it gets registered as device owner, and it manages a device. The APIs are the same regardless of whether the device has a 6-inch screen or a spatial display.

I also can't find documentation on _how_ Google intends to enforce this distinction. If I build a custom DPC, get it approved for XR, and then provision a mobile device with it, what happens? Does Play Protect block it based on form factor? Is there a flag in the validation that ties a DPC package to a device type? The documentation doesn't say.

This feels like one of two things:

1. **A new policy direction** that Google is quietly introducing through the XR documentation - using form factor as a further restriction on DPC scope. If that's the case, it's a significant change that deserves its own announcement and clearer documentation, not a sentence buried in an XR management page
2. **A poorly worded statement** that's trying to say something more nuanced, like "XR-only vendors don't automatically qualify for mobile validation" (which makes sense)

Either way, if you're a vendor building a custom DPC and considering XR support, I'd strongly recommend seeking clarification from Google directly before assuming anything about cross-form-factor eligibility.

It's also worth noting the requirement for managed Google Accounts specifically for custom DPC enrolment on XR. This may add an additional hurdle for vendors targeting the XR space.

## No BYOD?!

Indeed, in the initial support announcement, no BYOD management option is available. This limits XR to company-owned deployments for now. Understandable given the hardware cost and typical use cases, but worth flagging for organisations thinking about shared or take-home XR devices. 

I've been advocating for many more work profiles-per-device for years, so this is not presently a step in the right direction 😅

## Where does this leave enterprise XR?

This is a solid foundation. Google hasn't rushed out a half-baked management layer; the fully managed validation is genuinely tailored for XR, with sensible changes. The inclusion of dedicated device features as required signals Google understands that most enterprise XR deployments will be purpose-built.

But it's early days. Only one device ships today. Work profile isn't available. The custom DPC policy is confusing. And the XR EMM ecosystem needs time to build out support.

If you're planning XR deployments today, here's where I'd focus:

- **Samsung Galaxy XR with Knox** is your most complete management option right now, regardless of whether your EMM supports the new XR validation
- **Confirm XR support with your EMM** before purchasing at scale. Not all EMMs will have XR validation on day one
- **Plan for fully managed** - there's no work profile path, so XR devices need to be treated as company-owned, purpose-deployed hardware
- **Test lock task mode carefully** - the single 3D app limitation and lack of status bar notifications are material constraints for kiosk deployments
- **Watch the custom DPC space** - if you're building or using a custom DPC, the form-factor restriction (if that's what it is) could limit your options

I'll be updating the [XR FAQ](/android/android-enterprise-faq/android-enterprise-on-xr-devices/) as more details emerge. If you have questions or spot anything I've missed, [let me know](/contact).
