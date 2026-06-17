---
title: "What is the difference between AMAPI and a custom DPC?"
published: '2026-03-29'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - FAQ
categories:
    - General
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 43500
sources:
  - https://developers.google.com/android/management
  - https://developers.google.com/android/work/play/emm-api
  - https://developers.google.com/android/work/deprecations
  - https://developer.android.com/work/dpc/build-dpc
  - https://support.google.com/work/android/answer/16694822
---
Android Enterprise supports two management architectures, and they are fundamentally different in how the EMM controls the device.

### Custom DPC (Play EMM API)

A custom DPC (Device Policy Controller) is an EMM-developed application that runs on the device and directly calls Android's device management APIs. The EMM builds, maintains, and distributes this app - examples include Omnissa Workspace ONE Intelligent Hub, Ivanti's MDM agent, SOTI MobiControl, and IBM MaaS360.

With a custom DPC, the EMM's own app is the Device Owner or Profile Owner on the device. It receives policy from the EMM server and enforces it locally using [DevicePolicyManager](https://developer.android.com/reference/android/app/admin/DevicePolicyManager) and related platform APIs. Historically, app distribution was managed through the [Google Play EMM API](https://developers.google.com/android/work/play/emm-api).

This gives the EMM direct control over the enforcement layer, but also means they are responsible for keeping up with Android platform changes, handling compatibility across Android versions, and maintaining the DPC app itself.

You can still build a custom DPC. The constraint is not the ability to write an Android app that becomes Device Owner or Profile Owner; the constraint is access to Google's legacy enterprise services around it. New Play EMM API access is no longer available, so a new custom DPC cannot depend on managed Google Play app deployment, managed Google Play account provisioning, app approvals, entitlements, or app track management through that API. Since 2025, provisioning is also subject to Google's DPC allowlist, meaning an unapproved custom DPC may be blocked by Play Protect during enrolment. See [The DPC allowlist](/blog/2025/12/the-dpc-allowlist/) for the practical implications.

### AMAPI (Android Management API)

With [AMAPI](https://developers.google.com/android/management), Google provides the on-device management client - Android Device Policy (ADP). The EMM does not build a DPC. Instead, the EMM declares a desired policy state via a REST API, and Google's ADP app on the device enforces it.

The EMM's role shifts from building device-level enforcement logic to managing policy configuration and backend integration. Google handles the on-device agent, platform compatibility, and feature rollout.

AMAPI-based EMMs include Google's own management tools, Microsoft Intune (for BYOD work profiles, with corporate-owned migrations underway), Hexnode, Mosyle, and others. Many traditional custom DPC vendors are also migrating to AMAPI over time.

### Key differences

| | Custom DPC | AMAPI |
|---|---|---|
| **On-device agent** | EMM-built DPC app | Google's Android Device Policy |
| **Policy enforcement** | DPC calls Android APIs directly | Google's ADP enforces declared policy |
| **Feature availability** | Depends on EMM's implementation | Google ships features to ADP directly |
| **OEM features** | Can call OEM SDK APIs (e.g. Knox SDK) directly | Must use [OEMConfig](/android/what-is-oemconfig/) for OEM features |
| **App management API** | Google Play EMM API for legacy integrations; unavailable for new access | Android Management API |
| **New registrations** | New Play EMM API access is closed; custom DPC provisioning is subject to Google's DPC allowlist | Open - the recommended path for new EMM integrations |

### Deprecation and migration

Google is actively steering the ecosystem towards AMAPI. New Play EMM API access for custom DPC-style EMM integrations is no longer available, and significant portions of the Play EMM API were [deprecated in September 2021](https://developers.google.com/android/work/deprecations) and permanently turned off on 30 September 2025.

Existing custom DPC EMMs continue to function where they have migrated affected methods to the AMAPI SDK or alternative APIs, but organisations should be aware that the long-term direction is AMAPI. Many EMMs now offer both architectures during a transition period.

Devices can be [migrated from a custom DPC to AMAPI](/android/android-enterprise-faq/dpc-to-amapi-migration/) without a factory reset, provided the EMM supports it.
