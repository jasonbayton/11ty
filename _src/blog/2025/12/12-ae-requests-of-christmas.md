---
title: "The 12 AE requests of Christmas (2025 Edition)"
date: '2025-12-21'
status: publish
author: 'Jason Bayton'
excerpt: "Fa-la-la-la-laaa."
type: post
tags:
  - Enterprise
---

Deck the halls with JSON schemas and fa-la-la-la-la.

As we wrap up 2025, we’ve seen some massive wins for the Android Enterprise and the Android Management API (AMAPI) this year; APN overrides, custom apps, and Device Trust to name a few (I'll cover these and more off in another article). But let’s be honest: while Google has been busy with tightening permissible use policies, building out RCS archiving support, and creating a massive spread of Device Trust signals to consume, the community’s wishlist is still longer than the queue for a mulled wine at a Christmas market.

If Santa (or the Android Enterprise product team) is listening, here is what's on my list while we wait for those next roadmap updates. 

## 12. Self-service zero-touch uploads

On the twelfth day of Christmas, Google gave to me: the ability to actually add my own devices. Currently - and as with [every feature request article](/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/#zerotouch-customer-device-uploads) I've written since ZT's inception - we’re still tethered to authorised resellers for zero-touch. If a regional ops team buys 30 handsets locally to replace water-damaged devices on a construction site, that means 30 devices isolated from an existing ZT environment with no immediate capability to get them added in. We need an "admin upload" portal, perhaps tied into already-enrolled devices for a level of proof of ownership, an opt-out grace period similar to Apple Business Manager, or another means to prove ownership and claim our hardware without the reseller middleman.

## 11. Frictionless DPC Migration

DPC migration has been supported since Android 9.0 via `transferOwnership`, and yet in 2025, migrating between EMMs still feels like performing open-heart surgery with a butter knife. A customer splitting business units across two EMMs, or just migrating from a crappy vendor to something better, should be able to move a device from location A to location B with an admin click, not a wipe-and-reissue. We need Google to stop being afraid of vendor pushback and give us a native, reliable way to move management between EMMs without a factory reset. Apple’s already got "seamless migration" down in iOS 26, there's no justification for keeping it from the ecosystem any longer.

## 10. Silent Special Permission Grants

We own the devices. We are big boys and girls. So why am I still asking an end-user to manually navigate to *Settings > Special App Access* to toggle "Display over other apps" or "Accessibility"? For dedicated/COSU devices, the EMM should be able to allowlist these permissions silently - think a warehouse picker app that needs overlay and accessibility for heads-up instructions without breaking kiosk mode, or granting the companion app data usage to get more usage details about the device.

## 9. Native VPN Config

In 2026 we shouldn't need a third-party app's managed configuration support just to set up a basic VPN. We need native JSON schemas within the AMAPI policy for IKEv2, L2TP, and IPsec. One policy to rule them all, without the extra APK bloat-so retail pop-up sites on LTE can bring up an always-on IKEv2 tunnel even if the client isn’t pre-installed.

## 8. Provisioning-Time Logs

Admins live in fear of enrolment failure screens. When it happens, the device often resets, and the logs vanish into the digital ether. A batch of devices in an RF-dense factory failing QR enrolment at 80% can’t cough up `adb logcat`; a “send provisioning logs” button (Quick Share or pre-configured email) would let support correlate Wi‑Fi drops or policy parse errors without a trip on-site.

## 7. Remote Bug Report Commands

DPM has `requestBugreport()`. AMAPI has... a lot of customer back-and-forth? Field scanners rebooting intermittently when the camera opens shouldn’t require “can you reproduce near IT.” We need a direct `ISSUE_COMMAND` for Bug Reports-just give us the `.zip`.

## 6. The "Holy Grail": SDK Extensibility

This is the big one. Google has been promising deeper extensibility for years. We need the AMAPI SDK to unlock the *entire* DPM/UM API surface for companion apps. If we could run any DPM call through a local extension, most of the items on this list would be solved overnight. Let the companion app be the bridge to the local OS power that the AMAPI can't (or won't) reach - whether that’s VPN policy control or feature toggling on rugged gear.

## 5. Public Beta Track Support

Managed Play tracks are great, but public/open beta apps aren't an option. If a developer has an open beta on the Play Store, we should be able to opt-in via track ID just like we do for private internal tracks, rather than begging for a duplicate internal track just to participate in Open Testing.

## 4. Managed Config for App Tracks

Currently, managed configurations have a naughty habit of only respecting the Production version of an app. If I’m testing a new build on the "Alpha" track, I need my test configs to apply to *that* specific version-QA flagging a breaking change in “Alpha” is meaningless if the flag only hits Production.

## 3. Native Ephemeral & Multi-User

The Shared Device problem has been solved by third parties for years, but we’re still waiting for native AMAPI parity with the `UserManager` APIs. We want to create and manage ephemeral users (shift workers) directly through policy without relying on heavy-handed wrappers: cached apps, login/logout flows, and a data purge at logout - all driven by policy, not a custom shell app. Even better if it could hook into modern identity platforms within the Android accounts manager.

## 2. Private DNS via Policy

`PRIVATE_DNS_MODE_PROVIDER_HOSTNAME` is a staple of modern network security. In 2026, being unable to force a specific secure DNS provider via a top-level JSON field simply has to happen.

## 1. Offline System Updates (Local URI)

And the final gift on our list: the ability to push system updates from a local URI. Not every device has a path to Google’s OTA servers. For air-gapped warehouses or secure labs, we need to point the device to a local file server and say, _Update from here._ A logistics hub with no internet should be able to stage an OEM-provided OTA on an SMB share and push it overnight via policy, not incite disruption with temporarily moving devices to a different network just to patch.

**What’s on your wishlist?** Did I miss a gap that's been haunting your 2025 deployments? Let me know in the comments, and maybe - just maybe - we’ll see a few of these in the new year.
