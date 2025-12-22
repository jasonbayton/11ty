---
title: "12 deliveries of AE-mas (What shipped in Android Enterprise in 2025)"
date: '2025-12-22'
status: publish
author: 'Jason Bayton'
excerpt: "All in, a pretty good year for Android Enterprise."
type: post
tags:
  - Enterprise
---
**Note:** [This is cross-posted from the Android Enterprise Customer Community](https://www.androidenterprise.community/discussions/conversations/12-deliveries-of-ae-mas-what-shipped-in-android-enterprise-in-2025/14136)

2025 was a *big* year for Android Enterprise.

This was the year several long-missed features finally landed, **Device Trust became a thing**, zero-touch got a compliance and audit boost, provisioning saw a revamp, and the Android Management API quietly kept adding the sort of controls that make admins' lives easier.

So, in the spirit of celebrating a strong year for the platform, here are **12 Features of AE-mas**, in no particular order, chosen somewhat at random as - would you believe - the list could have been longer should I have chosen not to follow the 12 days of Christmas as the theme..

## **12. APN overrides via AMAPI**

APN management finally arrived.

In May 2025, AMAPI gained `apnPolicy`, allowing admins to define and enforce APNs directly through policy. This closes a long-standing gap for cellular deployments where “just set the APN” has historically been anything but. It's great to see this functionality pulled out of OEM config and into the AMAPI layer, giving admins access to on-device APIs that have been effectively off-limits for years.

Read about APN [here](https://developers.google.com/android/management/reference/rest/v1/enterprises.policies#apnpolicy).

## **11. Developer verification for Android**

Developer verification isn't coming until next year, but we're talking about it already, and work is in progress to bring it to fruition now.

Developer verification raises the bar for Play publishers by requiring stronger identity verification. For enterprise, it’s a supply-chain win: fewer convincing lookalikes, higher friction for malicious publishers, and a clearer answer when security teams ask “who made this app, exactly?”. There’s pushback in the community, there's a lot of misunderstandings about the requirements and ramifications, but hopefully as time goes on this will settle on both sides through further transparency and discussion.

Organisations deploying private apps to their own tenants are currently exempt, but it remains a big change nonetheless, and organisations benefit from the wider boost in authenticity of apps and developers.

I covered off more about developer approval [here](https://bayton.org/blog/2025/08/google-play-developer-verification/).

## **10. Device Trust from Android Enterprise**

This was the year Device Trust arrived.

Device Trust enables real-time posture and integrity signals (Play Integrity verdicts, boot state, security patch recency, lock-screen presence, strong auth age, OS tamper signals) that can be evaluated continuously rather than only at enrolment, and on both managed and unmanaged devices. It's a huge boost for MAM-type deployments, security solutions, and allows traditionally EMM-dependent vendors the freedom to operate independently.

This isn’t a small feature. It fundamentally changes how Android Enterprise fits into modern security architectures.

I wrote more about Device Trust [here](https://bayton.org/blog/2025/10/device-trust-android-enterprise/).

## **9. Custom app management via AMAPI (`CUSTOM` install type)**

One of the most consequential releases of the year, perhaps even since AMAPI began half a decade ago.

AMAPI introduced first-class support for installing and managing custom applications using `installType: CUSTOM`, backed by signing certificate validation (`appSigningKeyFingerprints`) and explicit install and uninstall commands. It allows organisations reliant on line-of-business (LOB) internal applications to ditch any and all wild-west sideloading for a policy-driven, verifiable deployment, which is exactly what enterprise actually needs. All without the need for uploading apps to Google Play.

I wrote more about custom apps [here](https://bayton.org/blog/2025/08/amapi-apk-deployment/).

## **8. Zero-touch portal audit logs and admin roles**

The zero-touch portal became auditable and permission-scoped in 2025.

Google rolled out audit logs to the zero-touch customer portal, capturing all admin actions needed to ensure the platform is no longer a black hole of *who did what*. Alongside this came clearer admin role separation, reducing the blast radius of operational mistakes.

For regulated environments, this turned zero-touch from a black box into something governance teams could actually trust.

## **7. Android 16 provisioning improvements**

One of the greatest improvements to the enrolment flow happened in 2025, and it was *so* long overdue!

Android 16 brought a clear push toward more reliable setup flows, fewer steps, and the ability to update it on the fly, as opposed to being stuck adjusting it only on major version releases.

I put out a video nearer the start of the year, while 16 was still in beta, which you can see on LinkedIn [here](https://www.linkedin.com/posts/jasonbayton_androidenterprise-activity-7326566273050451969-eABI/).

With this newer approach, Google is beginning to leave behind the old managed provisioning flows baked into AOSP, though they're still there as a fallback today. It'll be interesting to see how this evolves.

## **6. Application roles in Android Management API**

This was unexpected.

Application Roles formalised entire classes of enterprise apps, including:

- `COMPANION_APP`  
- `KIOSK`  
- `MOBILE_THREAT_DEFENSE_ENDPOINT_DETECTION_RESPONSE`  
- `SYSTEM_HEALTH_MONITORING`

Apps assigned these roles can be exempt from background execution limits, power management, suspension, and hibernation on modern Android versions, with user control restricted by default.

This isn’t just about companion apps - it’s about enterprise software finally being treated as first-class by the OS, and adds much-needed flexibility with far less configuration and overhead.

## **5. Default application management policy**

Admins finally gained control over default apps.

AMAPI added a policy allowing admins to define a prioritised list of default applications per app type (browser, dialler, etc), setting the first qualifying app as default and preventing user changes.

For compliance-sensitive fleets - browsers, diallers, PDF viewers - this is the sort of boring control that saves hours.

It's predominantly Android 16+, but there's a few that go back a few versions of Android.

Read more about default applications [here](https://developers.google.com/android/management/default-application-settings).

## **4. RCS archival**

RCS has long been the compliance blind spot for Android Enterprise fleets, with SMS/MMS archiving handled by legacy tools while RCS was left out in the cold. In December, Google release a supported way to archive RCS/SMS/MMS on **fully managed** devices, with **Google Messages** as the mandated client. Once those prerequisites are met, admins can configure Messages to forward message bodies, metadata, and attachments to a SIEM/service/archival tool on a schedule or trigger with no needed workarounds or limitations of legacy solutions. It’s - to reiterate - Google Messages only for now (OEM messaging apps remain out of scope unless they add their own support), but it gives regulated orgs a sanctioned retention path for rich messaging at last.

It has been met with quite a bit of mixed feelings, and even more FUD. I go into more detail about RCS archiving [here](http:///blog/2025/12/rcs-archival-clarifications/).

## **3. App functions and cross-profile controls**

Android 16 brought app-to-app interaction under policy control.

New settings allow admins to govern whether apps can expose app functions, and whether personal-profile apps can invoke functions exposed by work-profile apps, bringing finer control to cross-profile linking scenarios.

Niche, but powerful for when this functionality takes off in enterprise workflows.

## **2. Android App Bundle (AAB) support in the Managed Play iframe**

This finally removed a long-standing enterprise limitation.

In March 2025, Android App Bundle uploads became supported in the Managed Google Play iframe. Private apps finally gained parity with public Play distribution, including split APK delivery and more efficient installations.

I wrote more about AAB [here](https://bayton.org/blog/2025/03/dabbling-with-aab-support-managed-google-play/).

## **1. Android’s accelerated platform release cadence**

The change that underpins everything above.

Android is shifting toward more frequent platform releases, with Android 16 landing far earlier than usual and signalling a broader move away from a single annual cadence.

Harder to track? Maybe. I'm having a lot more fun poking around the Android Canary builds looking for unreleased functionality than I do sleuthing around AOSP code, though!

Better for shipping enterprise capability without waiting a full year? Also yes.

## **Signing off**

Android Enterprise levelled up across the board in 2025.

From trust and supply-chain integrity to app management and provisioning improvements, the team set the bar really high this year. Let's hope the momentum continues in 2026!

**Which of these made the biggest difference for you this year, and what are you hoping lands in 2026?**

Happy holidays and here’s to a wonderful New Year!
