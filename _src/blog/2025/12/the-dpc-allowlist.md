---
title: "Weaponising safety: Google Play Protect is now the custom DPC gatekeeper"
date: '2025-12-19'
status: publish
author: 'Jason Bayton'
excerpt: "This is a significant shift in how Android Enterprise operates, and the quiet nature of the rollout is arguably as damaging as the technical change itself."
type: post
tags:
  - Enterprise
---

Google has a habit of dropping significant changes into unassuming help centre articles, and the subject of this article regarding [Device Policy Controller (DPC) allowlisting](https://support.google.com/work/android/answer/16694822?hl=en) is no exception.

While it might look like a routine security tweak on the surface, this move introduces a fundamental layer of gatekeeping to Android Enterprise that has far-reaching consequences for the wider ecosystem, consequences Google appears either to have overlooked or simply decided aren't their problem.

Google's changes, which went live earlier this year, involve a new "Approved Android Enterprise device policy controllers allowlist." It’s a dry title for what is essentially a mandatory "permission to operate" for any EMM or custom solution developer in the Android space.

The premise is simple: Only DPCs verified and approved by Android Enterprise are now permitted during the Android Enterprise provisioning process. If your DPC isn't on the list, the enrolment can fail with a rather ominous message: "Harmful app blocked".

<img width="500px" src="https://cdn.bayton.org/uploads/2025/dpc-allowlist/Screenshot_20251219-184809.png">

On the surface, Google’s justification appears to be the typical "security and privacy" refrain. A DPC holds considerable power over an end-user device and could result in some rather unsavoury predicaments if a user could be convinced to factory reset their device, initiate provisioning, and enrol into a potential attackers' solution... But as is often the case with these top-down mandates, the "security" label is being used to justify a level of centralised control that feels increasingly stifling for the ecosystem.

What this results in is perhaps the most significant change since the introduction of Android Enterprise, in Android Lollipop (5.0).

## What's the context here? 

To understand the gravity of this, we first have to look at what a DPC actually is. In the Android management world, the DPC is the "agent" application, or Device Owner that holds the keys to the kingdom. It can communicate with a backend - typically but not always an (EMM) server - and may enforce policies like Wi-Fi settings, app restrictions, and password requirements directly on the OS.

At least, in the enterprise ecosystem. More broadly the community has leveraged custom DPCs for turning their applications into native Android kiosks, building community/open source management platforms, expanding solutions out to use cases like parental control, device leasing, and more. Consider [Acurast](https://acurast.com/), which uses DO to put a device into a pool of worldwide resources developers can use for their decentralised computing needs, and Xibo which is a DO-supported media client, or [FreeKiosk](https://github.com/RushB-fr/freekiosk) which does what it says on the tin.. amongst many others.

Historically, Google didn't care whose DPC you used, nor what it did, provided it called the right APIs and didn't outright abuse either the user or the OS. This allowed for a flourishing ecosystem of solutions built upon custom DPCs.

In parallel to this, Google introduced the Android Management API. This native-feel implementation of a consistent and centralised management platform has been the default and only option for enterprise vendors to build their enterprise management solutions for the last few years, following the deprecation of the Play EMM API. Custom DPCs have still been possible, though without the Play EMM API there's no app or account management available. This _has_ to go through AMAPI. If you're an enterprise EMM vendor, Play access is a cornerstone of your solution.

AMAPI in turn has become more and more restrictive on who uses it and how. Their permissible usage page has grown more complex and limited as time has gone on, most recently completely blocking new vendors from even touching the API without Google's approval of a vendor's business case, and then limiting the number of devices permitted to enrol without continued and repetitive applications for increased quotas. It's becoming quite an unpleasant, overly-moderated experience.

As Google tightens the screws on AMAPI access, the custom DPC route has become a more appealing option. I can speak to several vendors I've worked with previously denied access to AMAPI who have turned to custom DPC, for example. For many use cases access to Google Play for app/account management isn't all that critical. 

So, this move could have been anticipated, though I'm not sure many (including me) did so. While I agree policing of the custom DPC market is beneficial - I'm sure _some_ fall for the mandate to wipe and enrol their devices into a malicious solution - the way Google has gone about it leaves a terrible taste in my mouth.

Google are using **Google Play Protect (GPP)** as the gatekeeper. By folding the "Approved DPC" list into Play Protect’s enforcement engine, Google has turned a tool designed for protection into a weapon of enforcement of Google's will.

## When "Safety" Becomes a Stick

Google Play Protect was introduced as the world’s most widely deployed mobile threat protection service. Its job is to find malware, identify potentially harmful applications (PHAs), and keep users safe from actual threats.

Indeed, the most egregious part of this shift isn't the policy itself. It’s the weaponisation of a tool many in the ecosystem have applauded as a beacon of Android security. When a user or an IT admin attempts to enrol a device using a DPC that isn't on Google's allowlist, Play Protect intervenes. It doesn't say, *"This vendor hasn't completed their paperwork."*, it displays some of the scariest warnings in the Android lexicon.

By using the same warning for a niche (but legitimate) enterprise management tool as they do for a banking trojan - **just because they haven't asked for permission from Google to use standardised, open APIs**, Google is intentionally blurring the line between *unauthorised* and *unsafe*. 

This is a massive erosion of trust. If "unsafe" just means "not a Google approved application," users will eventually see the messaging for Play Protect soften, lowering the likelihood of taking actual malware warnings seriously. Google is crying wolf to protect its ecosystem boundaries, and in doing so, they are devaluing the very security tool they claim is vital for the platform's health.

This isn't about code quality or actual PHA behaviour; it's about control. A perfectly safe, well-written DPC can be "blocked to protect the device" simply because the developer hasn't filed the right paperwork or doesn't fit Google’s current vision of what a DPC should be.

## The end of the "Custom" DPC?

With this allowlist, the days of building a custom DPC for anything but what Google considers a justifiable use case are heading towards a reality where this may not be possible. Google is now the sole arbiter of what constitutes a "commercial enterprise use case." If you’re a developer building an open-source management tool, or a company with a bespoke internal DPC for a fleet of industrial devices, you now have to go through a verification process that is pretty opaque and down to the interpretation of the human undertaking the approval at the time.

By introducing this barrier, Google is having a very real impact on innovation and accessibility; the "guilty until proven innocent" approach blocking unverified DPCs by default during provisioning shows Google is treating any independent developer as a potential threat. This doesn't just stop "rogue" apps; it stops legitimate, innovative solutions that haven't been given Google's approval.

## The Silence is Deafening

If this were truly about "protecting users," as Google claims, where is the transparency? 

* **No Blog Post:** There has been no announcement on the official [Android Enterprise blog](https://blog.google/products/android-enterprise/). 
* **No Community Alert:** Despite the [Android Enterprise Customer Community](https://www.androidenterprise.community/) being the primary hub for these discussions, the first many admins heard of this was when their devices stopped enrolling.
* **The "Quiet" Rollout:** This change was implemented via a server-side switch. One day it worked; the next, your custom deployment was "Harmful."

This lack of communication is tone-deaf. It ignores the reality of thousands of developers who have built livelihoods on the "open" promise of Android. 

## What you can do (but shouldn’t have to)

Google’s answer is “get verified,” because the process treats every custom DPC as hostile until you prove otherwise. If you have to navigate it, here are the hoops; steps that should be unnecessary if Play Protect judged behaviour instead of defaulting to the ban-hammer:

* Align to Google’s permissible usage list: no device financing schemes; no surveillance-first builds; no silent push/preload/auto-install without explicit customer and end-user consent.
* Strip “sensitive” permissions to the minimum required to function so Play Protect has less to flag while you apply.
* Cross-check against the [Mobile Unwanted Software (MUwS)](https://developers.google.com/android/play-protect/mobile-unwanted-software) and [Potentially Harmful Applications (PHA) guidance](https://developers.google.com/android/play-protect/potentially-harmful-applications) so nothing in your manifest is misread as malicious.
* File the appeal once you’ve done the above.

_If you’re blocked mid-provisioning, tell admins and users plainly that the warning is about allowlisting, not malware, and point out the option fir them to continue the install, as this is provided in the Play Protect warning._

For absolute clarity, I agree with the requirements here for the most-part. Device financing is a particular sticking point for Google for reasons that aren't clear despite the ideal use case for DPC management it is.. my guess is it being a business decision because they have a Device Lock product facilitated by a few commercial partners which use basically all the same approaches as a DPC.. but you can draw your own conclusions.

## A Call for Empathy (and Transparency)

Standardisation is a good thing. I’ve spent years advocating for the **Android Management API (AMAPI)** and a more consistent experience across OEMs. But standardisation should not be achieved like this.

Google needs to decouple **technical safety** from **commercial verification.** If an app isn't verified, the OS should tell the user that. It should say: *"This management tool is from an unverified developer. Proceed with caution."* It should **not** say: *"This app is trying to bypass security."* By using the "Malware" stick to enforce "Partner" rules, Google is signalling that the wider community - the tinkerers, the niche hardware vendors, and the independent developers - are no longer a priority. It’s a move that lacks empathy for the diverse ways Android is used in the real world, beyond the sanitised walls of a corporate office.

To the developers and vendors caught in this net: My advice is to document everything. Every failed appeal, every "Ghost" rejection, and every customer you lose because of a "Harmful App" warning. The only way Google changes course is when the volume of the ecosystem's frustration is seen and heard. Ensure you reach out on the [customer community](https://androidenterprise.community) and make your voice heard.
