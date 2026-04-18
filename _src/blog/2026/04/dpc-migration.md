---
title: "What the last decade of Android Enterprise DPC migration could have been"
date: '2026-04-17'
status: publish
author: 'Jason Bayton'
excerpt: "Google shipped the platform APIs for wipe-free EMM migration in Android 9. No vendor has used them in eight years. I built a proof of concept that shows it works, and shows what we're missing."
type: post
tags:
  - Enterprise
---

I've [written](/blog/2024/01/amapi-migrations/) [about](/android/android-enterprise-emm-migration-guide/) DPC migration more than once over the years. Google introduced the platform APIs for wipe-free device migration between EMM vendors in Android 9.0 back in 2018. They've been sitting in the SDK ever since, and no EMM vendor I'm aware of has shipped cross-vendor migration using them. 

When Google publicly surfaced DPC migration within AMAPI in early 2024, I [wrote](/blog/2024/01/amapi-migrations/):

> The resurfaced DPC Migration functionality has been quite rather watered down on what it was originally purported to be... This is intended primarily for the looming turndown of the Play EMM API. DPC migration in this case can be leveraged to migrate all existing Android devices within a single EMM vendor from the Play EMM API-based custom DPC they have today, over to Android Device Policy and AMAPI, while maintaining management of the device within the solution.

That assessment hasn't changed. Useful for vendors modernising their backend, but it does nothing for organisations that want to change provider.

I spent a couple of days reading the APIs, building a proof of concept, and running it end-to-end on a Pixel 9 Pro XL. It works. Here's the video if you'd rather see it than read it, or scroll on for words galore.

https://youtu.be/0fYh-ElNEwU

## What the demo shows

The environment is straightforward: a Pixel 9 Pro XL running two DPCs. Google's TestDPC acts as the outgoing EMM, holding Device Owner with policies and restrictions applied. A DPC I built acts as the incoming EMM, implementing the Android 9+ `transferOwnership()` API and waiting to receive control.

The migration itself takes seconds. The outgoing DPC initiates the transfer, ownership passes to the incoming DPC, and the new DPC immediately applies its own policy set - camera disabled, apps installed - to prove it's genuinely in control rather than inheriting state from the previous owner. 

No wipe. 

No factory reset. 

No user interaction beyond the initial confirmation on the source side.

This is the end-to-end flow that could, today, allow an organisation to switch EMM vendor without resetting a single device. It's been possible since 2018. The APIs are public, documented, and functional.

## It's reasonably trivial, but that has never been the point

The engineering lift here is not large. Reading the API documentation, understanding the ownership transfer, handling the `PersistableBundle` for passing policy state across, verifying signatures, setting up `<support-transfer-ownership />` in the device admin XML. Even on the biggest, most complex EMM platforms today it'd be feasible within a release cycle.

Rather, unfortunately - and I've said this before - it comes down to commercials and perception. EMM vendors have no commercial incentive to support this and every commercial incentive to resist it. DPC migration is symmetric by design - to receive devices from another vendor, you have to be able to hand them off to another vendor. A vendor that implements inbound migration implicitly enables outbound migration. 

The moment a vendor supports DPC migration, their existing customers gain the technical ability to walk.

This is vendor lock-in. The wipe hasn't been a technical necessity for nigh on a decade.. it's a retention mechanism. If your platform, support, and pricing are genuinely competitive, you should want easy migration because you'd gain more inbound customers than you lose outbound. If you're not confident you can hold customers on merit, friction becomes your retention strategy. 

Eight years on, the industry has revealed its collective answer.

Unfortunately it comes at the direct expense of both customers and the ecosystem as a whole. Android looks harder to deal with, takes more effort, requires more thought.. while Apple shows just how easy it should be.

## What the demo doesn't show

The proof of concept demonstrates that on-device ownership transfer works. What it doesn't address is everything that lives server-side, which is not transferred through this process.

When a device moves from one EMM to another, it's moving between two different Android Enterprise binds. Each bind has its own enterprise ID, its own managed Google Play state, and its own Google Cloud Project on Google's backend. The `transferOwnership()` API handles the DPC handover on the device, but it doesn't touch any of this:

- **Private apps** - published to the original enterprise ID. If the new EMM is bound to a different enterprise, those apps are no longer visible or installable. They'd need to be re-published under different package names, moved through a Google Play support ticket, or shared with the new enterprise from the old.
- **Play Store layouts** - configured per-enterprise. The new EMM starts with no layout. Any curated app collections, categories, or featured apps need to be rebuilt
- **App tracks** - developers who shared production or closed testing tracks with the old organisation ID need to add the new enterprise ID as a tester. Until they do, devices on the new EMM won't receive builds
- **Managed configurations** - stored in the old EMM's backend, not on the device. The new EMM needs equivalent configurations set up before migration or apps lose their settings

None of this is insurmountable, but it means a cross-vendor migration is never just "tap transfer and done." There's meaningful prep work: staging apps, configurations, and approvals in the new EMM before cutting devices over, coordinating with app developers who've shared tracks, and communicating with end users about what to expect. Skipping this prep risks users losing access to apps and services the moment the transfer completes.

This is an area where Google could help. If migration were an ecosystem-level feature rather than a device-level API, Google could handle every aspect of an enterprise to enterprise migration, covering app approvals, private app visibility, and Play configuration across binds. Today, none of that exists.

## Google's role

Google built the platform capability and then left activation to partner opt-in.

When Apple shipped MDM migration with iOS 26, iPadOS 26, and macOS 26 last year, they didn't ask their EMM partners whether they'd like to support it, there was no choice. Through Apple Business Manager, organisations can reassign devices to a new MDM server, set an enforcement deadline, and the device migrates without a factory reset. User data intact. 

It's ecosystem-wide, and vendors don't get a vote on whether to participate.

Apple had the courage to force their ecosystem to be better. Google gave the same capability to partners to adopt or not as they pleased, and Android migrations remain disruptive by default.

## What about the watered-down version?

In January 2024, Google publicly surfaced DPC migration APIs within AMAPI. I [wrote](/blog/2024/01/amapi-migrations/) at the time that it was clearly aimed at the looming turndown of the Play EMM API rather than the cross-vendor use case customers actually need and want. It allows devices managed by a custom DPC (Play EMM API-based) to migrate to Android Device Policy and AMAPI within the same EMM vendor. Useful for vendors modernising their backend. Useless for organisations wanting to change vendor.

The documentation is explicit:

> Note: This process is transparent to end users. It is a one-way only process (it cannot be undone once completed) and it cannot be used to migrate a device from one EMM to another.

## Could Google route around this via AMAPI?

Custom DPCs are on borrowed time. The Play EMM API is deprecated, and every EMM vendor is slowly migrating to AMAPI. Within a few years, the majority of Android Enterprise deployments will be running Android Device Policy as the DPC, with vendor-specific backends behind it. There's no real reason for any vendor to invest in cross-vendor custom DPC migration at this point - the custom DPC itself for full-fat certified Android management is going the way of Device Admin.

So the question becomes: once everyone's on AMAPI, does Google finally enable AMAPI-to-AMAPI migration across vendors?

Technically, it could be trivial. All devices are running the same DPC (ADP). The policy model is Google's, not the vendor's. There's no proprietary agent to swap out, no custom policy schema to translate. Google owns every piece of the stack on the device side. 

But the commercial incentive problem hasn't gone anywhere. The same vendors who wouldn't implement cross-vendor custom DPC migration for the last eight years will not voluntarily implement cross-vendor AMAPI migration either. The money they'd lose to outbound customers is the retention value of the wipe. Unless Google bakes the handover into AMAPI itself - enforcing it at the Google Cloud level rather than inviting vendors to adopt it - we'll end up with the same impasse on a newer stack.

Which brings it back to courage. Apple forced their ecosystem. Google hasn't. AMAPI gives Google a cleaner shot at doing the right thing than they ever had with custom DPCs, because they control both sides of the transaction. Whether they take that shot is the question worth asking now.

## What customers can do

Short of waiting for Google, not much directly.

What you can do is make your voice heard. The [Android Enterprise Customer Community](https://androidenterprisecustomer.community) exists for exactly this. If you've ever had to wipe a fleet to switch EMM, if you've ever stayed with a vendor longer than you wanted because the migration cost was prohibitive, if you've ever watched Apple customers do in a scheduled window what Android customers do with months of planning and a phased rollouts - say so. Vendor silence is easy when customer silence enables it.

Apple's showing how it can be done, hopefully Google doesn't wait another eight years to catch up.
