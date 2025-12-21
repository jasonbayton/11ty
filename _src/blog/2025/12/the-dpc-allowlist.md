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

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">My DPC has been blocked by Google Play Protect</div>

For anyone landing here after searching for answers as to why you're seeing unsettling Play Protect warnings for safe, compliant apps, read [this help article](https://support.google.com/work/android/answer/16694822) and submit an appeal. 

Read more [below](#what-you-can-do-if-youre-affected).

</div>

Google has a habit of dropping significant changes into unassuming help centre articles, and the subject of this article regarding [Device Policy Controller (DPC) allowlisting](https://support.google.com/work/android/answer/16694822?hl=en) is no exception.

The changes, which went live earlier this year, involve a new "Approved Android Enterprise device policy controllers allowlist." It’s a dry title for what is essentially a mandatory "permission to operate" for any EMM or custom solution developer in the Android space.

While it might look like a routine security tweak on the surface, this move introduces a fundamental layer of gatekeeping to Android Enterprise that has far-reaching consequences for the wider ecosystem, consequences Google appears either to have overlooked or simply decided aren't their problem.

The premise is simple: Only DPCs verified and approved by Android Enterprise are now permitted during the Android Enterprise provisioning process. If your DPC isn't on the list, the enrolment can fail with a rather ominous message: "Harmful app blocked".

<img width="500px" src="https://cdn.bayton.org/uploads/2025/dpc-allowlist/Screenshot_20251219-184809.png">

On the surface, Google’s justification appears to be the typical "security and privacy" refrain. A DPC holds considerable power over an end-user device and could result in some rather unsavoury predicaments if a user could be convinced to factory reset their device, initiate provisioning, and enrol into a potential attacker's solution... But as is often the case with these top-down mandates, the "security" label is being used to justify a level of centralised control that feels increasingly stifling for the ecosystem.

What this results in is perhaps the most significant change to how a DPC operates since the introduction of Android Enterprise, in Android Lollipop (5.0).

## What's the context here? 

To understand the gravity of this, we first have to look at what a DPC actually is. 

In the Android management world, the DPC is the "agent" application, the Device Owner that holds the keys to the kingdom. It can communicate with a backend - typically but not always an EMM server - and may enforce policies like Wi-Fi settings, app restrictions, and password requirements directly on the OS.

At least, in the enterprise ecosystem. More broadly the community has leveraged custom DPCs for turning their applications into native Android kiosks, building community/open source management platforms, expanding solutions out to use cases like parental control, device leasing, and more. Consider [Acurast](https://acurast.com/), which uses Device Owner (DO) to put a device into a pool of worldwide resources developers can use for their decentralised computing needs, Xibo which is a DO-supported media client, or [FreeKiosk](https://github.com/RushB-fr/freekiosk) which does what it says on the tin.. amongst many others. 

DPCs are used for all sorts of functionality for all sorts of use cases. They can also run entirely locally through hard-coded restrictions/functionality in cases where the whole use case is to showcase the app utilising DPC functionality itself. Historically, Google didn't care whose DPC you used, nor what it did, provided it called the right APIs and didn't outright abuse either the user or the OS. This allowed for a flourishing ecosystem of solutions built upon custom DPCs.

In parallel to this more recently (well, 2019), Google introduced the Android Management API. This native-feel implementation of a consistent and centralised management platform has been the default and only option for enterprise vendors to build their enterprise management solutions for the last few years, following the deprecation of the Play EMM API. Custom DPCs haven't gone away, though without the Play EMM API there's no app or account management available. This _has_ to go through AMAPI. If you're an enterprise EMM vendor, Play access is a cornerstone of your solution.

AMAPI in turn has become more and more restrictive on who uses it and how; their permissible usage page has grown more complex and limited as time has progressed, most recently completely blocking new vendors from even touching the API without Google's approval of a vendor's business case, and then limiting the number of devices permitted to enrol without continued and repetitive applications for increased quotas. It's becoming quite a restrictive, overly-moderated experience.

As Google tightens the screws on AMAPI access, the custom DPC route has become a more appealing option. I can speak to several vendors I've worked with previously denied access to AMAPI who have turned to custom DPC, for example. For many use cases access to Google Play for app/account management isn't all that critical and achieves the goals in mind. Google's approval framework might suggest if a vendor can't get approval for AMAPI, they must automatically be doing something untoward, but given the permissible uses are limited and target some of the most popular use cases for restricted access - financing, device as a service (DaaS), and in-house solutions - that suggestion would be plainly wrong.

In any case, the move to start restricting custom DPCs could have been anticipated, though I'm not sure many (including me) did so. While I agree policing of the custom DPC market is beneficial (I'm sure _some_ fall for the mandate to wipe and enrol their devices into a malicious solution, I've seen worse), the way Google has gone about it leaves a terrible taste in my mouth.

## The problem with this

I want to be clear I am in favour of keeping the ecosystem safe. It's what I spend most of my days doing through the very DPCs in question (amongst other things). I'm also not just grumpy about this because it's change; I wrote of my support for [developer verification](/blog/2025/08/google-play-developer-verification/) just a few months ago. 

On the face of it, the restrictions aren't unreasonable. Frustrating though they may be in limiting choice and freedom for projects and organisations taking advantage of the Android Enterprise framework, what Google has put in place is fine - it's even slightly less restrictive than the requirements for AMAPI as there's no explicit restriction on in-house solutions. I also can't argue the [dev guidance](https://developers.google.com/android/play-protect/warning-dev-guidance) and [mobile unwanted software](https://developers.google.com/android/play-protect/mobile-unwanted-software) policies for some of the causes of being flagged outside of the allowlist, as it makes perfect sense - SMS, notifications, and accessibility permissions should absolutely be challenged given their sensitive nature, and a DPC should never be anything other than fully transparent with its capabilities and behaviours.

There are two very distinct issues I take with how this allowlist has come about, however.

### The first is the lack of communication, and the lack of time to prepare.

In the aforementioned developer verification announcements, Google provides a year for developers to get on board. There are multiple approaches to verification offered, and generally speaking even those slowest to adapt to change have a justifiable amount of time to figure things out. It's not dissimilar to Play EMM API being deprecated, that's been going on for a few years now with vendors still tip-toeing over to AMAPI. There was an iFrame approval change that was deprecated in 2021, and in 2023 [I was still writing about it](/android/google-play-iframe-approval-change/). Let's not even touch on Device Administrator deprecation.. 

Custom DPC changes? 

- No public announcement via the Android Enterprise [blog](https://blog.google/products/android-enterprise/).
- No customer community announcement, despite the [Android Enterprise Customer Community](https://www.androidenterprise.community/) being the primary hub for these sorts of discussions more recently.
- No advanced warning, and no time to prepare. One day it worked; the next, end users are seeing a message what they're doing was "Harmful".
- One helpdesk article appeared out of thin air at some point (and a couple of references in other docs).

Google made the change earlier this year and no one outside of existing partners would have known until their DPCs were being actively blocked, something demonstrated _in the customer community_ multiple times:

- [Play Protect blocking custom DPC apps — how to get approval or alternatives](https://www.androidenterprise.community/discussions/conversations/play-protect-blocking-custom-dpc-apps-%E2%80%94-how-to-get-approval-or-alternatives/11169)
- [Is there any way to disable Google Play Protect (GPP) during QR code enrollment?](https://www.androidenterprise.community/discussions/conversations/is-there-any-way-to-disable-google-play-protect-gpp-during-qr-code-enrollment-to/13952)
- [Play Protect is blocking our DPC app — appeal already submitted, looking for guidance](https://www.androidenterprise.community/discussions/conversations/play-protect-is-blocking-our-dpc-app-%e2%80%94-appeal-already-submitted-looking-for-guid/14046)
- [Google Play Protect’s new policy for custom DPC](https://www.androidenterprise.community/discussions/conversations/google-play-protects-new-policy-for-custom-dpc/13852)

This lack of communication feels tone-deaf. It ignores the reality of countless developers who have built livelihoods on the open nature of Android, only to be thrown face-first into an arbitrary wall.

### The second is how it's being enforced.

Google Play Protect was introduced as the world’s most widely deployed mobile threat protection service. Its job is to find malware, identify potentially harmful applications (PHAs), and keep users safe from actual threats, but here Google is using Play Protect as the gatekeeper, and by folding the "Approved DPC" list into Play Protect’s enforcement engine, Google has turned a tool designed for protection into a weapon of enforcement of Google's will. 

There's obviously a distinction between GPP flagging on sensitive permissions, which is valid and I take no issue with, versus GPP running off an arbitrary list of package names a team within Google has to maintain. The latter is mind-boggling to me.

The weaponisation of a tool many in the ecosystem have applauded as a beacon of Android security means when a user or an IT admin attempts to enrol a device using a DPC that isn't on Google's allowlist, Play Protect intervenes. 

It doesn't say, *"This vendor hasn't completed their paperwork."*, it displays some of the scariest warnings in the Android lexicon.

By using the same type of warning for a legitimate DPC as they do for an app trying to steal your banking information - **because the developer hasn't asked for permission from Google to use standardised, open APIs** - Google is intentionally blurring the line between *unauthorised* and *unsafe*. It isn't about code quality or actual PHA behaviour; it's about control. A perfectly safe, well-written DPC can be "blocked to protect the device" simply because the developer hasn't filed the right paperwork or doesn't fit Google’s current vision of what a DPC should be.

This is a massive erosion of trust. If "unsafe" just means "not a Google approved application," my prediction is we will eventually see the messaging for Play Protect soften, lowering the likelihood of taking actual malware warnings seriously. It all starts with an "oh ignore the warning, just continue", and authority is lost. Google is crying wolf to protect its ecosystem boundaries, and in doing so, they are devaluing the very security tool they claim is vital for the platform's health.

With this allowlist, the days of building a custom DPC for anything but what Google considers a justifiable use case are heading towards a reality where this may not be possible. Whether you’re a developer building an open-source management tool, or a company with a bespoke internal DPC for a fleet of industrial devices, you now have to go through an opaque verification process that is down to the interpretation of the human undertaking the approval at the time. If you're building anything else, that human may just not put the package name on the list.

By introducing this barrier, Google is having a very real impact on innovation and accessibility; the "guilty until proven innocent" approach blocking unverified DPCs by default during provisioning shows Google is treating any independent developer as a potential threat. This doesn't just stop "rogue" apps; it stops legitimate, innovative solutions that haven't been given Google's approval.

Again, I'm not against protection for users in the ecosystem. I find it, however, baffling with all the signals Play Protect gets from a device, with all of the ecosystem data Google consumes across billions of Android devices, all of the pattern recognition, user feedback, _all of this noise_ Google has chosen to forego every ounce of technology they use powering Android's industry-leading security.. for a list. Implemented with little to no consideration for the ramifications to businesses and communities.

## What you can do if you're affected

The answer is to get verified, because this new reality treats every custom DPC as hostile until you prove otherwise. 

If you're going to navigate it, here are the hoops; steps that should be unnecessary if Play Protect judged behaviour instead of defaulting to the ban-hammer:

* Align to Google’s permissible usage list: no device financing schemes; no surveillance-first builds; no silent push/preload/auto-install without explicit customer and end-user consent.
* Strip sensitive permissions to the minimum required to function so Play Protect has less to flag while you apply.
* Cross-check against the [Mobile Unwanted Software (MUwS)](https://developers.google.com/android/play-protect/mobile-unwanted-software) and [Potentially Harmful Applications (PHA) guidance](https://developers.google.com/android/play-protect/potentially-harmful-applications) so nothing in your application is misread as malicious.
* File the appeal once you’ve done the above.

_If you’re blocked mid-provisioning, tell admins and users plainly that the warning is about allowlisting, not malware, and point out the option for them to continue the install if present in the Play Protect warning._

## A call for transparency and over-communication

Standardisation is a good thing. I’ve spent years advocating for the **Android Management API (AMAPI)** and a more consistent experience across OEMs. But standardisation should not be achieved like this.

Google needs to decouple **technical safety** from **verification.** If an app isn't verified, the OS should tell the user that. It should say: *"This management tool is from an unverified developer. Proceed with caution."* It should **not** say: *"This app is trying to bypass security."* By using the PHA stick to enforce partner rules, Google is signalling that the wider community - the tinkerers, the niche hardware vendors, and the independent developers - are no longer a priority. It’s a move that lacks empathy for the diverse ways Android is used in the real world.

The ship has sailed to put a pause on this now, but it's not too late to put out visible announcements, talk about the security, justify the change - everything that was done with developer verification should be done here, too.

To the developers and vendors struggling with this: My advice is to document everything. Any failed appeal, any poor user experience, and any customer you lose because of a "Harmful App" warning. The only way Google changes course is when the volume of the ecosystem's frustration is seen and heard. Ensure you reach out on the [customer community](https://androidenterprise.community) and make your voice heard. We've made incredible changes through the community over the last few years.
