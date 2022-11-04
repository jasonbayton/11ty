---
title: 'What is iOS Supervision and why is it used?'
date: '2017-02-23T19:48:23+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 4099
doccats:
    - iOS
tags:
    - Enterprise
Version:
    - '1.3'
publish_post_category:
    - '7'
discourse_permalink:
    - 'https://discuss.bayton.org/t/what-is-ios-supervision-and-why-is-it-used/45'
---
<div class="callout callout-success">

#### Looking for Android enterprise?

This topic discusses iOS Supervision. If you’re also looking for Android enterprise (Android for Work) please [click here](/docs/enterprise-mobility/android/what-is-android-enterprise-and-why-is-it-used/).

</div>

Introduction
------------

As someone who deals with mobile devices in the enterprise on a daily basis, I often encounter customers looking to purchase iPhones/iPads for their employees. Most of the time customers will have, or are looking to have an EMM (Enterprise Mobility Management) – or MDM (Mobile Device Management) – platform such as MobileIron, AirWatch, Soti, etc. to manage these devices, and that’s great.

The thing is, iOS devices are by default targeted more towards consumers, than enterprise. This means out of the box there are things we admins can’t remove or disable, such as:

- iMessage
- Activation lock (“find my iPhone”)
- Factory reset
- Airdrop/Airplay
- iBooks

For anyone who’s been on the receiving end of an activation-locked iOS device, I don’t have to say how difficult it is to convince Apple to unlock it. For those unfamiliar, the last time I had to do so it involved rifling through 2 years of paperwork for a receipt showing the company I called on behalf of truly owned the device in question; it took days of effort, scans of documents showing the company as legitimate and many hours on the phone to Apple through multiple escalations – all because a device was wiped without the end user removing their iTunes account before leaving. A lot of businesses won’t go through this process and render the device a brick, writing off hundreds of pounds(/euros/dollars) in the process.

Furthermore, a number of settings can be configured via the EMM platform, but easily overridden by the end-user, such as GPS, bluetooth and others. The platform can set and reset these settings by pushing out configuration profiles but ultimately the end-user has control over the device, as Apple intended.

iOS devices aren’t unmanageable by *any means*, but compared to the likes of Windows Phone and *some* Android manufacturers (gradually improving now due to Android Enterprise) where pushing a setting usually guarantees it won’t be changed, dealing with iOS devices can be a little frustrating at times.

Enter Supervision
-----------------

Supervision was introduced back in the days of iOS 5 as a way for the enterprise to enforce more control over corporately-owned devices. Even back then Apple understood the use of iOS in the enterprise was a growing market and they’ve been working at it ever since, gradually adding and improving restrictions with every release.

Having access to a Mac with Apple Configurator installed, it’s very simple to create a set of configuration profiles to do a few things, including:

- Skip some of the initial setup assistant prompts when an end-user turns the device on for the first time
- Preload applications through IPA files or via the public app store (including VPP)
- Update or deploy a custom iOS release, either via a fresh install (ipsw) or by restoring a backup from another device
- Prevent the iOS device from syncing with other computers
- Enroll the device into a compatible EMM platform
- Disable activation lock
- Configure the homescreen layout
- Prevent a factory reset

And plenty more. Even better, in combination with EMM, the act of putting the iOS device into Supervised mode alone means not having to spend time creating several configuration profiles; almost all EMM platforms on the market can take advantage of Supervision to enable/disable many of the options found in configurator over the air.

[![](https://cdn.bayton.org/uploads/2017/02/Screenshot-2017-02-23-at-00.48.25.png)](https://cdn.bayton.org/uploads/2017/02/Screenshot-2017-02-23-at-00.48.25.png)
*Source: bayton.org, photo: MobileIron Core 9.2*

What remains after completing the Supervision process is a freshly installed (indeed, it performs a full reset – something to keep in mind) iOS device capable of being managed on a far more granular level than any out-of-the box iPhone or iPad, and subject to far fewer user-overrides.

Apple Configurator isn’t perfect
--------------------------------

There are, however, some downsides with Apple Configurator.

The first major inconvenience is requiring physical access to the device being Supervised. It isn’t possible with Apple Configurator to do this remotely; for a large number of iOS devices having to be Supervised in bulk, that means making use of some pretty interesting (and potentially costly) setups to avoid being limited by the number of USB ports on the machine:

[![](https://cdn.bayton.org/uploads/2017/02/hero-001.jpg)](https://cdn.bayton.org/uploads/2017/02/hero-001-e1487809076167.jpg)
*Photo: apple.bretford.com*

Also, should a device require a wipe, whether initiated from an EMM platform or by the end user (should factory reset not be disabled, or they figure out how to recover it via iTunes), it will factory reset to a stock, vanilla, un-Supervised state allowing the end-user to continue as if they had received a completely unmanaged device. It requires a trip back to the Mac for another round with Apple Configurator before it can be sent back out again.

Configurator is therefore far better suited to small businesses or offices wherein the iOS devices never venture too far. Larger organisations or those with considerable field teams will potentially feel the burden of needing to return to base when something goes wrong.

Thankfully Apple has put some thought into this, and have come up with an elegant solution to overcome these hurdles.

DEP, the Device Enrolment Program
---------------------------------

Launched in 2014 and gradually rolling out across the world, the Device Enrolment Program takes everything great about Apple Configurator and makes it zero-touch.

Starting with [company enrolment into DEP](https://www.apple.com/business/dep/), any devices purchased through Apple or an authorised reseller can be automatically assigned to the organisation’s DEP account and have configuration profiles pushed out wirelessly the moment the iPhone or iPad is turned on. What’s more, from the DEP console an EMM platform can be linked, offering an enrolment prompt on the device before the first-run setup even completes.

The biggest benefit? If the device is reset for any reason, being assigned via serial number to the DEP account means it automatically receives all configurations, EMM enrolment prompts and apps immediately on being turned on for the first time after the event. The only way to stop this is to remove the device from the DEP console (an irreversible action). Until then, the device is protected. This should theoretically greatly diminish the need to return to base.

The downside with DEP has been the potential inability to add every iOS device the organisation currently owns, be it due to device age (nothing before 2011) or the authorised-sellers requirement (directly via Apple or through an approved partner). This means if organisations have been using Apple Configurator up to this point, some devices may be unable to move over to DEP. For more recent purchases made through authorised channels though this won’t be an issue, nor will it be as of iOS 11, which introduced provisional DEP, the ability for organisations to manually add iOS devices into DEP via Configurator.

Additionally for organisations moving from Configurator to DEP, custom OS version and backup management functionality is not available, though for that use-case DEP perhaps isn’t suitable regardless.

Touching on VPP
---------------

When combining Supervision with VPP, the [Apple Volume Purchase Program](https://www.apple.com/business/vpp/), wherein both free and paid app licenses (and books) can be obtained in bulk and assigned to the organisation, it’s no longer a requirement to even set up an iTunes account on the device during or after enrolment – apps are pushed down automatically from the EMM platform after linking the VPP account and licencing is taken care of in the background.

Apps can be silently pushed, removed and their licenses can be applied or revoked – returning to the VPP licence pool for the apps in question – at any point. This renders the need to expense enterprise apps completely moot and makes managing applications substantially easier.

Conclusion
----------

Hopefully the benefits of Supervision, whether via Apple Configurator or DEP, have been adequately conveyed above. To summarise:

- Unsupervised iOS devices pose a greater risk to the Enterprise due to the issues that arise with activation lock
- Supervised devices offer more granular management, particularly for EMM platforms
- Apple Configurator offers a quick and easy solution for small SME, testing, devices illegible for DEP or those that remain close to base
- DEP offers much of the functionality of Apple Configurator, but entirely zero-touch, ready from the moment the device comes out of the box
- VPP in combination with Supervision makes app deployment much, much easier

If your organisation has struggled in the past with activation lock, iTunes account management, end-users overriding corporate policies or anything else above, it could well be time to consider Supervision.