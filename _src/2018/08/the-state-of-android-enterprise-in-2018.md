---
title: 'The state of Android Enterprise in 2018'
date: '2018-08-10T16:48:00+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 9074
tag: []
post_format: []
discourse_permalink:
    - 'https://discuss.bayton.org/t/the-state-of-android-enterprise-in-2018/375'
publish_post_category:
    - '14'
tags:
    - Enterprise
---
It’s been only seven months since publishing my take on [the state of Android Enterprise in 2017](/android/what-is-android-zero-touch-enrolment/), but a lot has changed already. With the release of Android 9.0 Pie, it’s a good time to take a look. I’ll cover new management features and programs from Google; how vendors, hardware OEMs, and customers have responded; and where this is all going. If you haven’t read my previous article, you might want to get caught up, but otherwise, let’s dig in!

**Device admin deprecation**
----------------------------

This is huge news for the industry: from what should be Android 10/Q in 2019, device admin APIs (the basis of [legacy Android management](/2017/12/google-is-deprecating-device-admin-in-favour-of-android-enterprise/)) are being deprecated, and Android Enterprise management will be the only means for management. This will not impact devices running Android 9 Pie or older, however all new purchases and devices that are upgraded to Android 10/Q will not support device admin management.

What will be impactful, however, is the new [Google Play requirement](https://developer.android.com/distribute/best-practices/develop/target-sdk) to align all applications to API level 26 (Android 8 Oreo). This went into force for new applications on August 1, and all updates to existing apps will need to align by November 1. With this change, unified endpoint management/EMM vendors (UEMs) will no longer be able to enforce admin-defined passcodes for example, as this was deprecated in Android 7.0 for security reasons, and will be the first device admin API to completely disappear in 2019.

For organizations managing Android devices, this means Android Enterprise should now be a priority; even if there are no plans to refresh the Android estate immediately, I advie having the foundations and experience in place sooner rather than later.

**OEMConfig**
-------------

With legacy Android management, UEM vendors had to integrate proprietary OEM APIs before customers could use them, which could be a pain. For example, it’s taken nearly seven months (so far) for some vendors to integrate Samsung’s latest Knox APIs. This is the problem [OEMConfig sets out to fix](/android/what-is-oemconfig/).

Where Android Enterprise originally leveled the playing field to give all OEMs the same management capabilities, Google has repeatedly stated the AE APIs are only a base, and OEMs are welcome to add their own value-add APIs on top. The trouble is that history may repeat itself, with UEMs only supporting the proprietary APIs from the biggest OEMs, whilst the smaller OEMs get the cold shoulder.

With OEMConfig, the tables are turned: OEMs can easily publish their APIs into UEM solutions via managed Google Play configs. This uses one OEMConfig app that sits on the device, and one that is pushed to the Play Store. OEMs can provide zero-day support for all new management capabilities, and UEM vendors don’t have to lift a finger (well, beyond extending their managed app capabilities so that OEMConfig displays properly within their solution, but this is a walk in the park).

It’s a really significant solution I hope to see widely adopted soon, and I know that a few OEMs are already testing it.

**New enterprise improvements in Android 9 Pie**
------------------------------------------------

As with every version of Android since Android Enterprise was introduced, [Android 9 Pie](https://developer.android.com/work/versions/android-9.0) has a healthy set of improvements.

**A better work profile experience:** Today both work and personal applications are mixed within the app drawer, and it often leads to questions from end users about why their applications are duplicated. With Pie, this changes. Technically, applications are still duplicated, but now they’re presented to users in dedicated work and personal app drawer tabs, which makes far more sense. There is also a new way to turn the work profile on and off, via a toggle in the work app tab.

Additionally, new APIs allow switching between personal and work accounts within apps without having to come out of a personal app and open the work profile, and vice versa.

**Improved QR provisioning:** QR provisioning for work-managed devices remains popular. In Pie, Google has built the QR reader into the device, and you can embed Wi-Fi details in the QR code. This means you don’t have to connect to Wi-Fi and download a QR before provisioning, saving a lot of time.

**APN configuration support:** This will be welcomed by organizations that rely on private APNs to connect to secure mobile networks, or to route traffic through an MTD solution.

**Granular update control:** If postponing updates by 30 days wasn’t enough, with Pie, organizations will be able to postpone them for up to 90 days, with 60-day cooling off periods between.

**Shared device support and COSU:** COSU support in Android up to now has been… well… *manageable.* With Pie however, Google is unleashing a massive update to how devices manage and support multiple users. In addition, there’s new native kiosk functionality that far exceeds what we’ve seen previously—many organizations may even opt for the native Android implementation over the custom EMM kiosk implementations we see in frequent use today. Time will tell.

**Android Enterprise Recommended**
----------------------------------

Over the years, many organizations have asked for device recommendations, and more often than not it was an uncomfortable experience, because I couldn’t test every device on the market for compatibility with enterprise management. With the introduction of Android Enterprise, Google created the perfect environment for a new [validation process](https://www.android.com/intl/en_uk/enterprise/recommended/requirements/) to ensure that devices support it properly.

The resulting program, [Android Enterprise Recommended](https://www.android.com/intl/en_uk/enterprise/recommended/) (AER), has already made waves across the ecosystem—I have customers who now forego any device that isn’t part of it. As of June, the program had [39 devices from nine OEMs](https://www.blog.google/products/android-enterprise/android-enterprise-recommended-accelerates-more-devices-new-partners/); it includes tablets as well as phones, and rugged devices, too!

There’s more to AER than just devices though, and later this year we should start to see similar validation for the wider partner ecosystem, such as UEM vendors and solutions integrators (this tying in with Android Academy, another recent Google effort).

**Android management API**
--------------------------

Launched in late 2017, the Android Management API (AMAPI) takes all of the complexity of Android management and rolls it into an always up-to-date cloud-based platform.

With only a Google Cloud project and a few API calls, it’s possible to have an AMAPI solution in place offering simple, flexible Android management and zero-day API support without needing to build out a whole UEM solution around it.

There was a lot of chatter at the Android Enterprise Summit around this, with UEM vendors interested to see how they could effectively leverage it. Microsoft is one of the first big players I’ve seen to bring a solution to market, integrated with their platform.

**Partners are onboard with Android Enterprise**
------------------------------------------------

Now, let’s turn to the partner side. Many UEMs and OEMs have supported Android Enterprise for years (though some have only come more recently.) What have they done in response to the latest features?

MobileIron became the first (and still, the only as of writing that I’m aware of) UEM to support work profiles on fully managed devices, the coveted middle ground for Android management that I’ve been eagerly anticipating. (I even worked with MobileIron on their [official announcement](https://www.mobileiron.com/en/blog/one-android-device-two-modes-managed-device-work-profile).) They’re also promoting Android Enterprise first during the first-run wizard in MobileIron Cloud.

VMware [rebranded AirWatch](/2018/05/android-enterprise-first-airwatch-9-4-lands-with-a-new-name-and-focus/) to Workspace One UEM, and with it, introduced their Android Enterprise-first vision. All new customers will be prompted to set up Android Enterprise, with legacy device admin only available by explicit opt-in. VMware’s leadership in the UEM space adds a lot of weight behind Android Enterprise.

As I mentioned, Microsoft finally jumped all-in on the Android Management API to bring COSU support to Intune, which previously only supported the work profile. Work-managed (COBO) support is on the way as well.

OEMs like HMD Global are pushing really hard on Android Enterprise, with support built into their entire range of devices and everything from the Nokia 3.1 up to the 8 Sirocco being Android Enterprise Recommended.

Samsung, the most dominant Android OEM in the world, especially in the enterprise space, announced back in January that with the introduction of Knox 3.0, their unification with Android Enterprise was complete. This is significant! The support of a major player speaks volumes as to the importance of Android Enterprise going forward. (However, they’re still not onboard with programs like Android Enterprise Recommended, [zero-touch enrollment](/android/what-is-android-zero-touch-enrolment/), and OEMConfig.) As of writing, UEM vendors are completing their support, and AE-based Samsung capabilities are ready to be leveraged without fear of device admin deprecation.

**Project Treble seeing real-world use**
----------------------------------------

Another important OEM-centric innovation is Project Treble. [Last year, I wrote](/android/what-is-android-zero-touch-enrolment/): *“With the*[ *introduction of Project Treble*](https://android-developers.googleblog.com/2017/05/here-comes-treble-modular-base-for.html) *in Android 8.0, we should begin to see devices updated more frequently and for longer periods.”*

Nothing demonstrates this capability any better than when Google debuted the Android Pie developer preview not only to their Pixel lineup, but also to several other OEMs as well, back at Google I/O in May. This has never happened before!

It was all made possible thanks to Project Treble, and has continued to impress with every developer preview that followed. At one point, it took Sony only a few *hours* following Google announcing beta 2 (DP3) to push out an update, other OEMs only a few days; that speed is almost unheard of and is only possible thanks to Project Treble.

As OEMs become more comfortable with Project Treble and blistering time to market for updates, you can imagine the effect on fragmentation (which can still currently cause problems) and version support this will have.

**How customers have responded**
--------------------------------

Android Enterprise is still a new concept to many, but is really starting to pick up. In my last state of Android Enterprise article, I covered Project Treble, zero-touch enrollment and aggressive adoption by OEMs. So far, that’s all living up to my expectations.

I see it with customers and I see it with peers; the amount of interest my Android Enterprise documentation receives is increasing and the engagement I’m seeing over on LinkedIn, Twitter, and elsewhere when I post about Android Enterprise continues to grow.

It’s not too surprising; the announcement of the deprecation of device administrator APIs with Android Q/10 has certainly made some in the industry sit up and take notice; organizations want to know what they’ll need to be doing differently from next year, and a 10 times growth of Android Enterprise deployments (which Google announced back at the [Android Enterprise Summit](/2018/05/android-enterprise-summit-2018-highlights/) in May) reinforces this; the market is starting to pay attention.

Add to that the Android Enterprise-first approach the industry is taking and the continued growth of programs like zero-touch (with over 20 resellers, just under 20 UEMs, multiple OEMs, and over 30 devices supporting it today), quickly becoming a viable program for organizations across the world wanting seamless, hands-off, out-of-box enrollment of their Android estate, it’s clear to see why momentum is building.

Looking towards the future, I think we’re going to see a lot of usage for the Android Enterprise Recommended program. In addition, I think OEMConfig will lead the the rise of bespoke APIs. Without the previous hurdles, OEMs will take it into their own hands to provide unique and interesting new ways of managing their devices. Lastly, as more UEMs beyond MobileIron support work profiles on fully managed devices, we should see it push rapid AE adoption, as COPE is such a popular method of managing devices today.

**Final thoughts** 
-------------------

Again, everything in this article has happened in the last seven months, which I think speaks volumes in terms of Google’s commitment to Android Enterprise and the well-overdue sunsetting of legacy management.

There are many areas Android Enterprise can improve still today, feature parity being one of those, but the solution is rapidly maturing and has already been ready for adoption for some time.

I previously said there’s no reason Android Enterprise shouldn’t be the default for Android management in the not-too-distant future. Today, I’d say unless you’re actively waiting on COPE support from your UEM, there’s no reason you shouldn’t be investigating a migration to Android Enterprise right now.

As always, I’m excited to see Android Enterprise continue to evolve!

*Want to learn more about Android Enterprise? Check out the*[ *documentation I’ve been writing*](/android/) *on the subject or find me on* [*LinkedIn*](https://linkedin.com/in/jasonbayton) *and* [*Twitter*](https://twitter.com/jasonbayton)*, where I talk all things Android most days.*