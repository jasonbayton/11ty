---
title: 'The state of Android Enterprise in 2017'
date: '2017-11-27T16:12:00+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 9063
tag: []
post_format: []
discourse_permalink:
    - 'https://discuss.bayton.org/t/the-state-of-android-enterprise-in-2017/372'
publish_post_category:
    - '14'
tags:
    - Enterprise
---
The state of Android enterprise in 2017

*Enterprise mobility consultant and Android SME Jason Bayton reflects on the evolution of Android enterprise, where it is today, and what’s to come.*

If you’re an organization contributing to the ~30% market share of managed Android devices in the enterprise, (Q1 2017, Google) you may have heard of Android enterprise, formerly *Android for Work*. (You might have also seen some of my [Android enterprise-related content](/android/) in the last few months!)

As someone who’s managed Android devices for a number of years, I’ve felt the burden—as many have—of dealing with limited management capabilities, the Samsung lock-in, Google accounts, and more. Android enterprise is a program I feel is revolutionizing Android management.

However, it isn’t perfect, so read on as I take a step back to provide a reflection on where Android enterprise has been, where it is today, and what’s to come.

Building momentum
=================

Android enterprise isn’t new by any means; launched with Android Lollipop (5.0) back in 2014 and iterated upon with every Android release since, the idea of bringing a standardized enterprise management experience across all Android devices—and thus reducing both platform fragmentation and Samsung’s long-held dominance in the industry—seems like it’s increasingly garnering attention in 2017.

Over the last several months I’ve witnessed both customers and peers alike take an active interest in the newer, better alternative to *device administrator* (or *classic/legacy*) enrollment, either for their Android deployments, or for developers, adding EMM-managed configurations to their applications.

This is for good reason. With four deployment scenarios available—work profile, work-managed, COSU (corporate-owned, single use) and the most recent work profile on fully managed devices (or a “work-managed work profile” as I’ve been calling it, but otherwise akin to corporately-owned, personally enabled)—Android enterprise can adapt to suit various requirements:

**BYOD?** Go with *work profile*. It’ll allow the organization to manage a separate, yet integrated, fully-encrypted profile space (like a container) on the device and enforce basic device security, but leave everything else untouched. With both personal and work apps combined on the device (the latter indicated with a distinctive badge), it offers an efficient environment promoting both productivity and user-freedom.

**Corporately owned?** Go with *work-managed*. Using a number of provisioning methods, including the latest [zero-touch enrollment method launched with 8.0](/android/what-is-android-zero-touch-enrolment/), and rolling out to devices and resellers as I type, organizations can lock down a device, only permitting approved functions and applications. The end-user is therefore not given the freedom to use the device in a personal capacity.

**CYOD (choose your own device) or COPE (corporate-owned, personally-enabled)?** Go with *work profile on a fully managed device*. Launched with 8.0 and making its way to EMMs, this scenario pushes work applications and data into an encrypted, integrated profile. The device is fully managed *but* allows for personal use in the parent (non-work) profile.

Finally, for **single-use environments**, like kiosks in a shop, ruggedized devices used for delivery or transport, or anywhere else a device may be locked down to one or a limited number of applications, *COSU* utilizes the work-managed deployment scenario and locks the device to a remotely-managed kiosk environment.

All of these include silent application distribution via managed Google Play, which offers admin-approved public and corporate apps with the ability to automatically configure them when they’re installed, yet no need for a Google account. Work profile includes features like dual-passcode protection (both device and work profile separately), a simple quick-settings toggle for disabling the work profile on evenings/weekends, and DLP controls to prevent data moving between profiles without approval. Work-managed enables the removal of “bloatware” OEMs and carriers relentlessly push upon customers. Today, all of this is available on a [range of devices](https://www.android.com/intl/en_uk/enterprise/device-catalog/) that can suit almost any budget, form-factor, and requirement.

Sounds pretty good, doesn’t it?

But there’s still some way to go.
=================================

In terms of EMM management, Android adoption in the enterprise generally could be improved, with Android enterprise unsurprisingly moreso. Part of this is due to relatively limited marketing; although Google are putting more focus on security and enterprise functionality in their announcements, keynotes, and events recently, many organizations today still don’t know what Android enterprise is or does. (Nor did they know of Android for Work; and the rebrand didn’t help.)

Another aspect, besides security perceptions, is the F-word: *fragmentation*. Android enterprise was created to *reduce* fragmentation, however when it launched it was optional, meaning OEMs could choose to implement it… or not… Ironic, huh? Thankfully, this was put right in 6.0, so enterprises could search for devices based on other requirements, as long as they don’t opt for any of the 5.x devices that are, for whatever reason, still being sold today. Android enterprise started to feel more mature with Android 7.0, however 7.0 and higher only represent about [21% of the market](https://developer.android.com/about/dashboards/index.html), with 5.x–6.x combined representing over [58%](https://developer.android.com/about/dashboards/index.html). The sooner this changes, the better.

EMM vendors could also step up a little more. Even today, other OSes and Android features are being prioritized over Android enterprise. Case in point, it took AirWatch [until October](https://blogs.air-watch.com/2017/10/airwatch-support-android-enterprise-purpose-built-devices/) to finally support a COSU deployment, meaning up until now customers who wanted to mix COSU and other deployment scenarios would require two different implementations (I’ve done several like this, it’s not great).

On newer functionality, no EMM yet supports work profile on fully managed devices that launched with Oreo. This is easily the most comparable deployment scenario to device administrator (or *classic/legacy*) enrollment, which means we still don’t have that perfect middle-ground that will further bolster adoption for organizations currently sitting on the fence. You may argue Oreo was only released in August, but I’d counter that if EMMs have provided zero-day support for other platforms and OS updates, why not in this instance? Also, while zero-touch is an incredible tool for easing the Android enrollment process, it too is an optional feature (albeit one OEMs are currently jumping on to offer support). After the struggle getting earlier versions of Android enterprise off the ground, this came as a surprise to me.

Finally, OEMs also need to ensure they properly QA their implementations. Having tested a [number of devices](/android/android-enterprise-device-support/) independently already, I’ve found that there’s a real disparity both between OEMs, as well as between devices from a single OEM. Some won’t have NFC or QR code support enabled out of the box; some will follow the process as intended; and others will jump back to the start and expect to be set up like a normal device. All of this can be quickly and easily resolved with an OTA update (which I’ve seen happen with Nokia, Sony and others).

So what’s next for Android and Android enterprise?
==================================================

Well, Google will continue their march towards feature parity (and beyond) with Samsung and KNOX, as Samsung are still ahead in a few different areas and management capabilities (as you might expect, with Samsung’s offering having more time to mature). In the end, though, Google aim to have a unified experience across all compatible devices, allowing organizations to pick any device and know they can all be managed reliably and in the same way.

With the [introduction of project Treble](https://android-developers.googleblog.com/2017/05/here-comes-treble-modular-base-for.html) in Android 8.0, we should begin to see devices updated more frequently and for longer periods, as it separates the Android framework from the vendor/OEM implementation. This will make it much easier for OEMs to support enterprise-class devices such as the recently-announced Samsung Galaxy Note 8 [Enterprise Edition](https://news.samsung.com/us/galaxy-note8-enterprise-edition/). As the Note 8 runs 7.1.1, it’s possible Samsung won’t opt to support Treble with the upgrade to Oreo, but for devices launching with 8.0, all future platform upgrades will be much simpler and easier to undertake. I won’t be surprised to hear of other OEMs creating similar enterprise-oriented devices in the near future, as well. All of this is good news for organizations that have struggled with hardware lifecycles that are drastically different between consumer and enterprise devices.

Now that zero-touch enrollment has officially launched, as I mentioned, we’re already seeing OEMs jump on board, with resellers equally gearing up for this new wave of simpler, faster enrollment experiences. The list of devices and resellers is currently small but growing rapidly, and I imagine we’ll be spoiled for choice within the next 6 months, even if not all Android devices will benefit from it (due to the optional implementation). This alone will be enough to completely revolutionize Android management.

Finally, with OEMs and EMM vendors hopefully more aggressively supporting Android enterprise in the future, (in particular, work profiles on fully managed devices) we should see more organizations adopting this truly faster and better alternative to current legacy enrolment processes.

Final words
===========

Today, Android enterprise isn’t perfect, but it *is* a viable alternative to legacy management, and it has certainly come a very long way since its launch a little over 3 years ago. With help from OEMs and EMM vendors, I see no reason why it won’t be the default for Android management for all possible deployment scenarios in the not-too-distant future.

*Want to learn more about Android enterprise? Check out the* [*documentation I’ve been writing*](/android/) *on the subject, including the newest zero-touch enrollment process, or* [*find me on Twitter*](https://twitter.com/jasonbayton) *where I talk all things Android.*