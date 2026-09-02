---
title: 'QPR2 Beta 3 - CP41.260731.005.B1'
parent: 'Android Enterprise build tracker'
published: '2026-08-15'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: ['Android Enterprise build tracker', 'Android', 'aebt-release-notes']
categories: ['Android Enterprise build tracker']
layout: base.njk
eleventyNavigation:
    title: 'Android 17 QPR2 Beta 3'
---

**Track:** QPR2 Beta | **Milestone:** December 2026 stable

Three enterprise flags graduated to enabled, and the DLP rules framework gained its set/get API.

**Flag graduations**

Three flags moved from provisional to enabled in this build:

- **Typed policy engine** (`policyStreamlining`) - the master switch for the new type-safe policy interface is now on. DPC apps will be able to use `setPolicy` and `getPolicy` with proper typed identifiers and built-in multi-admin conflict resolution
- **eSIM transfer control** (`managedEsimOutgoingTransferPolicy`) - DPC apps can now query whether an eSIM profile is allowed to be transferred off a managed device
- **WPA-only Wi-Fi** (`dpmSecurityLevelWpaOnly`) - administrators can enforce WPA as the minimum Wi-Fi security standard, blocking connections to open or WEP networks

**DPC capabilities**

- **Data leak prevention rules** - DPC apps can now set and retrieve DLP rules directly, mirroring the approach used on ChromeOS. This is the enforcement side of the DLP framework introduced in QPR1 Beta 5
- **Login attempt logging** (provisional) - DPC apps can report user login attempts (success or failure) to the security log, enabling audit trails for shared and multi-user devices
- **Per-user policy callbacks** - DPC apps can now register for real-time notifications when a per-user policy value changes, complementing the device-wide callbacks added in QPR1 Beta 6
- **Stricter sideloading control** - a new user restriction blocks all non-Play app installation including from registered app stores (Samsung Galaxy Store, Amazon Appstore, etc.). Paired with a new registered app store role

**Other enterprise changes**

- **Task continuity handoff policy** (provisional) - a new cross-device policy namespace controls whether task handoff between devices is permitted
- **Short support message policy** (provisional) - the customisable short support message shown to users is now available through the typed policy engine
- **Play Protect verification policy** (provisional) - Play Protect's verify apps setting can now be controlled through the typed policy engine
- **Wi-Fi policy restructured** - the Wi-Fi tethering, network selection, and local-only hotspot policies moved into a dedicated inner namespace, improving organisation
- **Five new permissions** (provisional) - registered for DLP rules, subscription management, task continuity, device identifiers, and support messages - several still gated behind false flags
- **XDR telemetry source registration** (provisional) - extended detection and reporting source registration appeared, though the backing flag is still off
- **Content restriction enforcement** landed in the QPR2 track, having previously been canary-only
