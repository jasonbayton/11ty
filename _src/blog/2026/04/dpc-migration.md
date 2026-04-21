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

This view hasn't changed; useful for vendors modernising their backend, but it does nothing for organisations that want to change provider.

I wanted to get a feel for the capability first-hand, I've never truly taken the time to test it because no one supported it, so I spent a couple of days reading the APIs, building a proof of concept, and running it end-to-end on a Pixel 9 Pro XL. 

Here's the video if you'd rather see it than read it, or scroll on for words galore.

https://youtu.be/0fYh-ElNEwU

## What the demo shows

The environment is straightforward: a Pixel 9 Pro XL running two DPCs. Google's TestDPC acts as the outgoing EMM, holding Device Owner with policies and restrictions applied. The DPC I built acts as the incoming EMM. Both DPCs implement the Android 9+ `transferOwnership()` API and support receiving control.

The migration itself takes seconds. The outgoing DPC initiates the transfer, ownership passes to the incoming DPC, and the new DPC immediately applies its own policy set - camera disabled, apps installed - to prove it's genuinely in control rather than inheriting state from the previous owner. 

No wipe. 

This is the end-to-end flow that could, today, allow an organisation to switch EMM vendor without resetting a single device. It's been possible since 2018. The APIs are public, documented, and functional.

## It's reasonably trivial, but that has never been the point

The engineering lift here is not large. Reading the docs, understanding the ownership transfer, and implementing the needed changes.. even on the biggest, most complex EMM platforms today it'd be feasible within a release cycle.

Rather, unfortunately - and I've said this before - it comes down to commercials and perception. EMM vendors have no commercial incentive to support this and every commercial incentive to resist it. DPC migration is symmetric by design - to receive devices from another vendor, you have to be able to hand them off to another vendor. A vendor that implements inbound migration implicitly enables outbound migration. 

The moment a vendor supports DPC migration, their existing customers gain the technical ability to walk.

This is vendor lock-in. The wipe hasn't been a technical necessity for nigh on a decade.. it's a retention mechanism. If your platform, support, and pricing are genuinely competitive, you should want easy migration because you'd gain more inbound customers than you lose outbound. If you're not confident you can hold customers on merit, friction becomes your retention strategy. 

Eight years on, the industry has revealed its collective answer.

Unfortunately it comes at the direct expense of both customers and the ecosystem as a whole. Android looks harder to deal with, takes more effort, requires more thought.. while Apple shows just how easy it should be.

## What the demo doesn't show

The proof of concept demonstrates that on-device ownership transfer works. What it doesn't address is everything that lives server-side, which is not transferred through this process.

When a device moves from one EMM to another, it's moving between two different Android Enterprise enterprise IDs, the [bind](/android/android-enterprise-faq/what-is-the-bind/). Each bind has its own managed Google Play state, managed user accounts, and its own Google Cloud Project on Google's backend. The `transferOwnership()` API handles the DPC handover on the device, but it doesn't touch any of this:

- **Private apps** - published to the original enterprise ID. If the new EMM is bound to a different enterprise, those apps are no longer visible or installable. They'd need to be re-published under different package names, moved through a Google Play support ticket, or shared with the new enterprise from the old.
- **Play Store layouts** - configured per-enterprise. The new EMM starts with no layout. Any curated app collections, categories, or featured apps need to be rebuilt
- **App tracks** - developers who shared production or closed testing tracks with the old organisation ID need to add the new enterprise ID as a tester. Until they do, devices on the new EMM won't receive builds
- **Managed configurations** - stored in the old EMM's backend, not on the device. The new EMM needs equivalent configurations set up before migration or apps lose their settings

None of this is insurmountable, and it's exactly the same situation organisations are left in when doing a manual (wipe-first) migration, but it means a cross-vendor migration is never just "tap transfer and done." There's meaningful prep work: staging apps, configurations, and approvals in the new EMM before cutting devices over, coordinating with app developers who've shared tracks, and communicating with end users about what to expect. Skipping this prep risks users losing access to apps and services the moment the transfer completes.

This is an area where Google could help. If migration were an ecosystem-level feature rather than a device-level API, Google could handle every aspect of an enterprise to enterprise migration, covering app approvals, private app visibility, and Play configuration across binds. Today, none of that exists.

## Google's role

Google built the platform capability and then left activation to partner opt-in.

When Apple shipped MDM migration with iOS 26, iPadOS 26, and macOS 26 last year, they didn't ask give their EMM partners the choice not to support it. Through Apple Business Manager, organisations can reassign devices to a new MDM server, set an enforcement deadline, and the device migrates without a factory reset. User data intact. 

It's ecosystem-wide, and vendors don't get a vote on whether to participate.

Apple had the courage to force their ecosystem to be better. Google gave the same capability to partners to adopt or not as they pleased, and Android migrations remain disruptive by default.

### What about the watered-down version?

As I opened with, Google's AMAPI DPC migration [(ref)](/blog/2024/01/amapi-migrations/) allows devices managed by a custom DPC (Play EMM API-based) to migrate only to Android Device Policy and AMAPI within the same EMM vendor. 

The documentation is explicit:

> Note: This process is transparent to end users. It is a one-way only process (it cannot be undone once completed) and it cannot be used to migrate a device from one EMM to another.

## Could Google route around this via AMAPI?

Custom DPCs (in context of mainstream device management) are on borrowed time. The Play EMM API is deprecated, and every EMM vendor is slowly migrating to AMAPI. Within a few years, the majority of Android Enterprise deployments will be running Android Device Policy as the DPC, with vendor-specific backends behind it. There's no real reason for any vendor to invest in cross-vendor custom DPC migration at this point - the custom DPC itself for full-fat certified Android management is going the way of Device Admin.

So the question becomes: once everyone's on AMAPI, does Google finally enable AMAPI-to-AMAPI migration across vendors?

Technically, it could be trivial. All devices are running the same DPC (ADP). The policy model is Google's, the enterprises are Google's, the Google Cloud Projects are Google's. There's no proprietary agent to swap out, no custom policy schema to translate. Google basically owns every piece of the stack on the device _and_ the cloud side. 

But the commercial incentive problem hasn't gone anywhere. The same vendors who wouldn't implement cross-vendor custom DPC migration for the last eight years will not voluntarily opt-in to cross-vendor AMAPI migration either. The money they'd lose to outbound customers is the retention value of the wipe. Unless Google enforces this at the AMAPI rather than inviting vendors to adopt it - we'll end up with the same impasse on a newer stack.

Which brings it back to the core difference in approach; Apple forced their ecosystem, Google hasn't. AMAPI gives Google a cleaner shot at doing the right thing than they ever had with custom DPCs, because they control both sides of the transaction. Whether they take that shot is to be seen, but until they do it's a really big, fat, blot on the Android experience when comparing it to alternative options for mobile management in the ecosystem.

## What customers can do

Make your voice heard. 

The [Android Enterprise Customer Community](https://androidenterprisecustomer.community) exists for exactly this. If you've ever had to wipe a fleet to switch EMM, if you've ever stayed with a vendor longer than you wanted because the migration cost was prohibitive, if you've ever watched Apple customers do in a scheduled window what Android customers do with months of planning and a phased rollouts - say so. Vendor silence is easy when customer silence enables it.

Apple's showing how it can be done, hopefully Google doesn't wait another eight years to catch up.