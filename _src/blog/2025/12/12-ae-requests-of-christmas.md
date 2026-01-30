---
title: "The 12 AE requests of Christmas (2025 Edition)"
date: '2025-12-22'
status: publish
author: 'Jason Bayton'
excerpt: "Fa-la-la-la-laaa."
type: post
tags:
  - Enterprise
---

Christmas is upon us! Deck the halls with JSON schemas and so forth.

As we wrap up 2025, we’ve seen some massive wins for the Android Enterprise and the Android Management API (AMAPI) this year; APN overrides, custom apps, and Device Trust to name a few which I've covered off over on the [Android Enterprise Customer Community](https://www.androidenterprise.community/discussions/conversations/12-deliveries-of-ae-mas-what-shipped-in-android-enterprise-in-2025/14136). But let’s be honest: while Google has been busy with tightening permissible use policies, building out RCS archiving support, and creating a massive spread of Device Trust signals to consume, the community’s wishlist is still longer than the queue for a mulled wine at a Christmas market.

If Santa (or the Android Enterprise product team) is listening, here is what's on my list while we wait for the chestnuts to cool. 

## 12. Self-service zero-touch uploads

On the twelfth day of Christmas, Google could have given to me: the ability to actually add my own devices to zero-touch. 

Currently - and as with [every feature request article](/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/#zerotouch-customer-device-uploads) I've written since ZT's inception - we’re still tethered to authorised resellers for zero-touch. If a regional ops team buys 30 handsets locally to replace water-damaged devices on a construction site, that means 30 devices isolated from an existing ZT environment with no immediate (if ever) capability to get them added in. We need an admin upload process, perhaps tied into already-enrolled devices for a level of proof of ownership, an opt-out grace period similar to Apple Business Manager, or another means to prove ownership and claim our hardware without the reseller middleman.

Practically every other OOBE solution on the market across most OSes covers this and has done for years. This is crippling a fantastic tool.

## 11. Frictionless DPC migration

DPC migration has been supported since Android 9.0, and yet in 2025, migrating between EMMs still feels like performing open-heart surgery with a butter knife.. except that's probably actually doable without killing the subject, unlike the mandatory wipe needed for Android devices today. 

A customer splitting business units across two EMMs, or just migrating from a crappy vendor to something better, should be able to move a device from location A to location B with an admin click, not a wipe-and-reissue. We need Google to stop being afraid of vendor pushback and give us a native, reliable way to move management between EMMs without a factory reset. Apple’s already got "seamless migration" down in iOS 26, there's no justification for keeping it from the ecosystem any longer.

I despise having to write any sentence containing "Apple already.." - don't do this to me, Google.

## 10. Silent special permission grants

We own the devices. We are big boys and girls. So why am I still asking an end-user to manually navigate to *Settings > Special App Access* to toggle _Display over other apps_ or enable _Accessibility_? For dedicated/COSU devices, the EMM should be able to allowlist these permissions silently - think a warehouse picker app that needs overlay and accessibility for heads-up instructions without breaking kiosk mode, or granting the companion app data usage to get more usage details about the device.

By all means protect users generally, but if a company owned device, especially one flagged as **dedicated**, occasionally it would be nice if we could protect an admin's peace rather than the prospect of a potential end-user touching a kiosk unit.

## 9. Native VPN config

This is a nicety more than anything I'll be knocking doors down for, but another feature I'd like to see pulled out of OEM config and into AMAPI is the ability to create and initiate a native VPN config. 

I know apps handle this fine today, but why should I have to use an app? At best it's administrative overhead, at worst it's another subscription. 

In 2026, we shouldn't need a third-party app's managed configuration support just to set up a basic VPN. We need native JSON schemas within the AMAPI policy for IKEv2, L2TP, and IPsec. One policy to rule them all, without the extra APK bloat.

## 8. Provisioning-time logs

Admins live in fear of enrolment failure screens. When it happens, the device often resets, and the logs vanish into the digital ether. A batch of devices in an RF-dense factory failing QR enrolment at 80% can’t cough up `adb logcat`; a “send provisioning logs” button (Quick Share or pre-configured email) would let support correlate network issues or policy errors without a trip on-site.

## 7. Remote bug report fetching

DPM has `requestBugreport()`. AMAPI has... a lot of customer back-and-forth. Field scanners rebooting intermittently when the camera opens shouldn’t require a remote support session, email chains galore, or to send the device in for a service (because walking users through fetching their own bug report to send - if that's even possible while replicating the scenario - isn't normally going to happen). Bug report fetching needs a direct `ISSUE_COMMAND`, and perhaps a flag or two for where and how to send it.

It's one of those things that puts AMAPI vendors at a competitive disadvantage for support compared to their custom DPC counterparts. This basic functionality should have been prioritised from the outset.

## 6. Private DNS via policy

Private DNS capabilities are only gaining in popularity as more of the world cotton-on to the benefits of secure DNS. It's becoming a staple of modern network security. In 2026, being able to force a specific secure DNS provider via a policy simply has to happen.

I put this on the list literally because I'm struggling with this with a customer who has moved over from a custom DPC solution. Another competitive disadvantage to navigate. 

## 5. Public beta track support

Managed Play tracks are great. I use them to death and back, but public (open) beta apps aren't an option. If a developer has an open beta on the Play Store, we should be able to opt-in via track ID just like we do for private internal tracks, rather than begging for a duplicate internal track just to participate in open testing.

The whole tracks management in Play puts a lot of pressure on devs who may have just barely figured out the open testing options, and in a lot of cases pushing a bugfix into beta before the production version gets a bump is as good as it's going to get. 

Granted we have custom app support in AMAPI now to work around this, but how about we just make this work, too?

## 4. Managed config for app tracks

Currently, managed configurations have a terribly naughty habit of only respecting the Production version of an app. 

If I’m testing a new build on the "Alpha" track, I need my test configs to apply to *that* specific version; QA flagging a breaking change in “Alpha” is meaningless if the flag only hits Production.

Today I get around this mostly by writing JSON directly up to AMAPI with the managed properties that aren't exposed. It can be so much better than this.

## 3. Native ephemeral & multi-user

The Shared Device problem has been solved by third parties for years, but we’re still waiting for native AMAPI parity with the `UserManager` APIs. We want to create and manage ephemeral users (shift workers) directly through policy without relying on heavy-handed wrappers: cached apps, login/logout flows, and a data purge at logout - all driven by policy, not a custom shell app. Even better if it could hook into modern identity platforms within the Android accounts manager.

## 2. Offline system updates

The ability to push system updates from a local/offline location has been one of my most favourite custom DPC features. I don't use it so much today as [I no longer build Android devices](/blog/2020/12/on-building-android-devices/) (for now), but it remains the case that not every device has a suitable path to Google’s OTA servers. 

For air-gapped warehouses or secure labs, we need to point the device to a local file server and say _update from here._ A logistics hub with no internet should be able to stage an OEM-provided OTA on an SMB share and push it overnight via policy, not incite disruption with temporarily moving devices to a different network just to patch.

Likewise in environments that can't justify 1,000 devices all consuming internet bandwidth from an OTA, throwing it up internally is the obvious answer to this as the second-best would be touching devices with an update file on an SD card (where the OEM supports it). 

## 1. Companion extensibility

This is the big one. Google has been promising deeper extensibility for years. We need the AMAPI SDK to unlock the *entire* DPM/UM API surface for companion apps. If we could run any DPM call through a local extension, most of the items on this list would be solved overnight. Let the companion app be the bridge to the local OS power that the AMAPI can't (or won't) reach - whether that’s VPN policy control or feature toggling on rugged gear.

## Bonus: Policy-defined system update engine management for 3rd party clients

A bit of a long-shot, but I've been thinking about building a FOTA service for years. The huge barrier for entry is the need for the OEM to provide the necessary elevated permissions to make it possible to run correctly on-device. With a bit of policy magic for managed devices it would be wonderful to be able to offload OTA management to a particular package. This could also solve for the offline system update issue above, as well.

**What’s on your wishlist?** Did I miss a gap that's been haunting your 2025 deployments? [Let me know](/contact), and maybe - just maybe - we’ll see a few of these in the new year.

Happy holidays!