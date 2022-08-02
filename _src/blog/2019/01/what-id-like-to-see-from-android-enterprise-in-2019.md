---
title: "What I'd like to see from Android Enterprise in 2019"
date: '2019-01-07T09:00:44+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 7335
tag:
    - '2019'
    - android
    - 'android enterprise'
    - EMM
    - Enterprise
    - 'Enterprise Mobility'
    - lookout
    - MDM
    - mtd
    - 'new year'
    - oemconfig
    - summit
    - uem
    - wandera
    - wants
    - wishlist
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/what-id-like-to-see-from-android-enterprise-in-2019/257'
tags:
    - Enterprise
    - Mobile
---
I’ve been advocating/evangelising and talking about Android Enterprise for a couple of years now, and have mainly focused on what’s present and available.

For a change, I thought I’d cover off a few things I’d like to see in the AE ecosystem in 2019 that I haven’t as yet.

To be clear, this isn’t simply a list of features for Google to implement in the solution set(s), because there are plenty of APIs available no one is making use of as yet. Rather I’m taking a bigger-picture view of the ecosystem as a whole as I see it right now (I’m going to start with a few feature requests though).

Let’s get started.

AE activation stats
-------------------

Android Enterprise has been a thing since Android 5.0 🍭, yet beyond a few finger in the air style graphs of Android Enterprise growth over the years, Google remain tight-lipped on actual figures around activations.

![](https://r2_worker.bayton.workers.dev/uploads/2018/05/IMG_20180508_094513.jpg)[At the Summit](/2018/05/android-enterprise-summit-2018-highlights/) I quipped:

> Over the last 12 months, Android Enterprise activations have grown 10x \[…\]
> 
> 10x as many devices sounds significant, and while I’m sure it is, we don’t know how much that really is as Google won’t release figures publicly.

Perhaps the number of activations isn’t huge. Perhaps the figures show a disproportionate number of one deployment scenario over another and that’s a reason to wait, or maybe something entirely different.

I think there’s almost an expectation the number of activations won’t blow anyone’s socks off, many orgs I talk to still today don’t know what Android Enterprise is. If the number is low, own it. It gives folks like me incentive to work harder raising awareness. If the numbers are great, it’s an opportunity for a bit of a boast. Win-win to me.

Therefore I’d like it if Google were transparent with stats and offered:

- Total activations
- Activations per year
- Deployment scenarios
- Market sectors (health, finance, logistics..)
- Android versions under management

Maybe more, where available.

That sort of information would be incredibly handy to have to hand when I’m writing docs or other collateral, in meetings with customers (“*Android Enterprise has proliferated in your market sector Mr. Customer”* is an easier sell than “*lots of my customers use it”* I think).

If nothing else, it gives me something to talk about and work with on what is otherwise a bit of an unknown quantity. Please and thanks, Goog!

Native Per-app VPN
------------------

Android supports only one active device-wide VPN connection at a time. Per-app VPN is possible, but requires the VPN be running (optionally set to *always on*) and capable of dynamically routing or allowing traffic to bypass. If the VPN app on the device doesn’t support per-app (because it isn’t supported natively), it can’t be used.

I want to see this fixed on a system level, and 10 years into Android I really wonder why it hasn’t been tackled yet.

On a related note, I often come across situations where an organisation makes use of a VPN connection for connecting back into the corp network in order to access corporate resources, while at the same time utilising something like an MTD solution which will also rely on VPN to manage traffic; the resulting two VPN networks on the device will clash and continuously bump each other off if both are in use.

While I wouldn’t expect multiple concurrent VPN connection support, perhaps some form of precedence would be useful to ensure the prioritised connection is maintained.

Toggle system apps after provisioning
-------------------------------------

A very nice feature G Suite supports today is the ability to dynamically toggle system applications on or off (enabled or disabled), once saved the system applications will either appear or vanish in real-time.

For all other EMMs on the market, that’s a flag set during the provisioning stage and if done incorrectly, requires a reset and reprovision to correct it.

It’s such a simple feature, but I think it would be very well received generally if this was possible to implement on a wider scale.

Multiple work profile support
-----------------------------

I’ve spoken to Google about this before, and I understand it’s technically rather difficult to implement, but even so I’m still listing it.

Picture this – you’re a consultant, a doctor, a contractor or any other profession where you may move between multiple organisations performing your various duties. You use your own device because it makes sense to do so. How many corporate devices would you be carrying around on various days otherwise?

Today, the first organisation with an EMM would likely have you enrol as a BYOD user to get your corporate apps and data securely, separately encrypted and isolated on disk in a work profile.

What about the other organisations? You may not be permitted to add multiple accounts within a work profile (nor *should* you, as that’d be mixing corporate data from multiple organisations!) so you’re a little stuck.

If you’ve ever tried to enrol your BYO device into multiple EMM platforms, after the first, the second will generate a prompt to say there’s already a work profile present and would you like to remove it.

Imagine if you didn’t have to.

Granted I see how complex this could get, even as an end user how would you differentiate between profiles just looking at multiple badged copies of Gmail. Maybe badge colours?

![](https://r2_worker.bayton.workers.dev/uploads/2019/01/image-1.png)(Can you imagine!)

And what of security? Would the organisation be able to enforce the requirement for a separate passcode to any of the others on the device? There are many aspects to take into consideration that I’ve likely not thought of yet, but I can fully understand why this is complex.

In any case, the number of times I’ve had this type of conversation with industry folks tells me there’s clear demand for the capability (and I’d certainly welcome it also, given I have my corporate EMM, lab/testing EMMs, customer EMMs when replicating issues and more), so I’d love to see *something* come to fruition here one day, though maybe not 2019.

Wallpaper management
--------------------

A common and recurring request I get from customers is *how do I set a custom wallpaper for our devices?*

Particular for organisations who’ve migrated from DA to AE, this functionality likely was there previously, and suddenly is not.

I’d very much like to see this introduced into Android Enterprise this year, whether via a Google Play Services update as the recent [blocking of unknown sources](/android/feature-spotlight-block-unknown-sources-on-work-profile-deployments/) was, or even in Android Q.

Data management
---------------

Another less frequent, but equally interesting feature request I’ve had in the past was more control over data management on devices.

Android devices can already report on estimated data usage and organisations with an EMM that supports it could potentially create policies that do something based on the data reported back, but it’s a little limited.

Being able to set a limit on-device and restrict network capabilities if that limit is surpassed, with the option of whitelisting applications which may continue to work for business activities or otherwise, would be pretty powerful and is one of the enticing features of products like Wandera that use a gateway (which isn’t supported on AE devices currently) to achieve the same sort of control.

For example, I could set a 3GB cap and only permit Gmail, Slack or other work applications to continue using data, while all others would only connect once connected to WIFI, or when the cycle resets.

Taking that a step further and being able to pull reports of app usage within the EMM console would be pretty neat also.

![](https://r2_worker.bayton.workers.dev/uploads/2019/01/image-2.png)Work profile SIM management
---------------------------

A number of people use dual-SIM phones in the enterprise, that way they can use their own devices, but benefit from a separate business line so as not to need to use their personal number.

While corporate apps and data reside securely in a work profile for both BYOD and COPE deployment scenarios, on the phone side of this, any calls or SMS messages received are shared between the work and personal profiles on the devices.

I think it would be excellent to be able to allocate a SIM to the work profile, meaning any calls of SMS messages would go only to the work phone/messages apps, and therefore add in that final level of isolation between work and personal.

Furthermore, when the work profile is toggled off, the device should automatically forward work calls to voicemail.

This seems like a really obvious feature missing from the work profile experience today, and I believe it’d be incredibly valuable for anyone leveraging dual-SIM capabilities!

Greater enforcement on OEMs not supporting AE
---------------------------------------------

Last year I came across a few OEMs who either aren’t doing a great job of supporting Android Enterprise on their handsets, or downright don’t care at all. [Xaiomi](/android/android-enterprise-device-support/poco-f1-android-enterprise-validation-report/), [OnePlus](/android/android-enterprise-device-support/oneplus-6t-validation-report/), to name a couple I wrote about, but there are naturally more that I haven’t gotten a hands-on with as yet.

Android Enterprise support has been mandatory for GMS certified devices since 6.0, and forms part of the CDD. The fact that there are devices on the market today which can’t even provision as a fully managed (work-managed) device on 8.0+ is shocking.

While I’m sure they’re already doing a tireless, thankless job of telling OEMs to sort themselves out, clearly when a huge name like Xiaomi openly demonstrates they’re not that bothered about enterprise, while expanding into more and more regions around the globe, Google need to bring the hammer down and put them in line. If not, eventually people are going to end up using them in an enterprise context and find they’re out of luck.

![](https://r2_worker.bayton.workers.dev/uploads/2019/01/image.png)Every OEM that doesn’t properly support Android Enterprise threatens Android in the enterprise as a whole. The industry needs reliable, consistent management across OEMs, otherwise more orgs will hit issues and start doubting the product.

Zero-touch customer device uploads
----------------------------------

Apple have allowed for the grandfathering of customer-owned devices into DEP for a long time now, as has Samsung with KME, and this has been a long-standing request I’ve had with Google.

<figure class="wp-block-image">![](https://r2_worker.bayton.workers.dev/uploads/2019/01/image-5.png)<figcaption>One of many threads with Google on this functionality!</figcaption></figure>Zero-touch is the only offering today that utilises a restrictive reseller-only model. I understand why this is, as in the wrong hands it could naturally cause problems, however if Samsung and Apple can do it, the big G themselves should be able to figure something out.

I’ll continue to mention it, hopefully this year we’ll get to a point where zero-touch enrolment could become as easy administratively as it is technically!

Ubiquitous Fully managed devices with work profiles support
-----------------------------------------------------------

With 8.0+ adoption increasing to 21.5% [as of October 2018](https://developer.android.com/about/dashboards/), any EMM/UEM vendors that don’t support fully managed devices with work profiles (COPE) today are stifling customers.

<figure class="wp-block-image">![](https://chart.googleapis.com/chart?chf=bg%2Cs%2C00000000&chd=t%3A0.2%2C0.3%2C3.0%2C7.6%2C17.9%2C21.4%2C28.2%2C21.5&chco=c4df9b%2C6fad0c&chl=Gingerbread%7CIce%20Cream%20Sandwich%7CJelly%20Bean%7CKitKat%7CLollipop%7CMarshmallow%7CNougat%7COreo&chs=500x250&cht=p)</figure>While three major platforms (MobileIron [Core](/2018/03/mobileiron-launch-android-enterprise-work-profiles-on-fully-managed-devices/), [Cloud](/2018/12/mobileiron-cloud-r58-supports-android-enterprise-fully-managed-devices-with-work-profiles/) and VMware [WS1 UEM](/2018/10/workspace-one-uem-1810-introduces-support-for-android-enterprise-fully-managed-devices-with-work-profiles/)) support it as of January 2019, that leaves a pretty large gap for customers utilising the likes of SOTI, Intune, IBM, or really anything else.

One feature I definitely want to see this year is migration support between fully managed and COPE. I can’t begin to imagine the number of organisations who opted for fully managed (work-managed) in the absence of COPE only to find out they need to wipe and re-provision devices for fully managed with work profile support, especially given Google support this capability and have done since its introduction.

Vendors I’ve spoken to have suggested – in contrast to Google – that it’s not super simple to implement, with teams of developers I can’t see it being that difficult if it was prioritised. It would be *so* good to see this implemented.

Support for native kiosk in Pie
-------------------------------

A whole slew of features were introduced in Pie for dedicated devices. A newly improved native kiosk experience, ephemeral users and more.

Right now I’m not aware of a single EMM that’s implemented these features to be leveraged by organisations (beyond a couple of APIs here and there, at least). With proprietary options like Microsoft launcher, WS1 launcher and MobileIron Kiosk there’s clearly no pressing need to do so (from the vendor perspective), but this year I do expect to see support creeping in, particularly as Pie adoption greatly exceeds Oreo in the same time period thanks to Project Treble.

Continue the march towards AE first
-----------------------------------

I finished 2018 dabbling with a few different EMM platforms I don’t often get hands-on with, and was surprised to see on one platform not only was Android Enterprise *not* actively promoted over legacy device admin, but it required manual, per-user flags set to enable AE enrolment!

Device admin is going away **this year**. EMM vendors should absolutely be encouraging customers to move to Android Enterprise as soon as possible, even if only to prevent a hoard of support tickets floating in once Android Q starts showing up in EMM device lists!

As an organisation, if your EMM vendor or MSP partner isn’t actively and openly discussing how best to migrate to Android Enterprise, should they be continuing to support your device fleet?

That’s up to you to decide.

But I’m hoping to see announcements left and right from vendors across the industry pushing Android Enterprise this year. It needs to be done!

Android Management API adoption
-------------------------------

Currently the only big player I’ve seen doing anything seriously with the Android Management API (AMAPI) is Microsoft. This year I’d like to see that grow.

Whether leveraging AMAPI for zero-day support of new features, or making use of it for effortless DPC migrations enabling the movement of managed devices from one EMM tenant to another (be it the same vendor or different), AMAPI seems to me like the future of Android management, and I’d like to see it leveraged this year far more.

Zero-touch availability
-----------------------

Zero-touch enrolment resellers were popping up all over the place in 2018, and it was incredible to see. Even I got in on the action and got [CWSI validated](https://cwsi.ie/resource/cwsi-partners-with-google-to-provide-android-zero-touch-enrolment-services/) as a zero-touch enrolment reseller towards the end of the year.

That said, there are still nowhere *near* enough zero-touch enrolment resellers in the wild, and while I know of many currently undergoing the process, they’re moving far too slowly.

This year I very much hope to see far more distributors, OEMs and carriers [signing on](/android/how-to-become-a-zero-touch-enrolment-reseller/) across the globe, so the frequent conversations with folks in the EMM community I have about resellers not being available in a region or to them specifically due to strict approved vendor lists happens far less often!

The process for ZT is very straightforward, the validation is a walk in the park. Potential resellers on the fence about implementing the APIs and such shouldn’t fret, while that’s in progress handling devices manually is simple and straightforward until ready to transition (and if KME/DEP are already integrated into PoS, it’ll be easier still).

Organisations around the world are sat on their thumbs waiting for zero-touch resellers to become available; I very much hope this will happen this year.

OEMConfig adoption
------------------

Following the announcement of OEMConfig at the [Partner Summit](/2018/05/android-enterprise-summit-2018-highlights/) last May, I made a bold statement:

> OEMConfig is very likely the most exciting announcement of the event for me as the implications are incredible.

This very much still stands as I write today, though despite early promise, and the recent induction into the [AppConfig community](https://www.appconfig.org/android), I haven’t seen a significant amount of adoption to date.

That doesn’t mean there hasn’t been *any* of course, Sony came out with their [Configuration Extension](/2018/08/hands-on-with-sonys-oemconfig/) which showed an excellent start (if a little lacking on breadth of capabilities), Huawei are working on an implementation, and a couple of other OEMs are looking at it also.

This year I’d like to see more OEMs publishing their own OEMConfig offerings, with a focus on the proprietary features so often unmanageable via EMM today (examples might include Huawei backup, Sony dynamic vibration, Nokia PureDisplay, etc).

Android One adoption
--------------------

2018 felt as though there was a staggering rise in the adoption of Android One devices. A lot of this comes down to HMD Global who shipped several through the year, though we also saw offerings from BQ, Motorola, Xiaomi and more.

Android One offers an experience that very much compliments Android Enterprise Recommended, taking the security patch mandate up from 90 to 30 days, an additional letter upgrade and provides a wonderfully bloat-free experience which is consistent across OEMs.

Android One devices are simple, reliable and easy to manage. I really want to see more OEMs offering either Android One devices, or Android One editions in 2019 (I’m looking squarely at you, Sony and Huawei).

Samsung ❤️ Google
-----------------

I don’t think there are many at this point who don’t know of the tension between Samsung &amp; Google over the last couple of years. This year I’d like to see them finally come together to bring zero-touch support to Samsung devices (as opposed to choosing KME *or* ZT) and introduce their lineup to Android Enterprise Recommended.

I can’t stress enough how many times I’ve seen Samsung excluded from the running because customers want to support multiple OEMs through one automated provisioning service and/or have decided only to select devices from Google’s AER list.

It’s time for that to change.

What do you want to see?
------------------------

Those are my requests for 2019. What do you want to see come to Android Enterprise or the ecosystem this year? Sound off in the comments, on Twitter, or on LinkedIn!