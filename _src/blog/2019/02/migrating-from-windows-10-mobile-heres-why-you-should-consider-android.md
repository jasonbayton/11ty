---
title: "Migrating from Windows 10 Mobile? Here's why you should consider Android"
date: '2019-02-04T00:28:11+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 7601
tag:
    - AE
    - android
    - 'android enterprise'
    - Apple
    - comparison
    - 'Enterprise Mobility'
    - google
    - iOS
    - microsoft
    - 'windows 10'
    - 'Windows Mobile'
post_format: []
discourse_permalink:
    - 'https://discuss.bayton.org/t/migrating-from-windows-10-mobile-heres-why-you-should-consider-android/269'
publish_post_category:
    - '14'
tags:
    - Enterprise
---
The writing has been on the wall for a very, very long time. Without an ecosystem and an ever-dwindling user base, Windows 10 Mobile couldn’t have lasted forever. Now officially dead, Microsoft [recommends](https://support.microsoft.com/en-us/help/4485197/windows-10-mobile-end-of-support-faq) switching either to iOS or Android.

Both platforms have strengths and weaknesses, naturally. But particularly in the context of moving from Windows Mobile, I’d like to present a few reasons why you might consider Android over iOS for your enterprise needs.

Android is secure
-----------------

The perception of Android security being subpar has long been proven incorrect. From Google’s pivot to enterprise in Android 5.0 Lollipop to today, security has been a key focus of every release.

Not convinced?

In 2016 &amp; 2017, Gartner ranked Android higher than iOS in a number of areas, including kernel security, exploit protection, network security, workspace isolation and more; the results of which can be found in [this report](https://www.gartner.com/doc/3840064/mobile-oss-device-security-comparison) (2017) should you have a Gartner subscription, if not here’s an overview:

![](https://cdn.bayton.org/uploads/2019/02/image.png)
*Source: Gartner, December 2017. Thanks to [Samsung](https://s7d2.scene7.com/is/content/SamsungUS/samsungbusiness/solutions/samsung-knox/pdf/MobileDeviceSecurity-AComparisonofPlatforms-Feb12-2.pdf) for making this available on the public internet!*

Let’s dive a little deeper into Android security:

### Corporate/personal data separation

The two deployment scenarios that make use of the work profile are the aptly named work profile (BYOD) and fully managed devices with work profiles (COPE). In both scenarios, work data is securely isolated and separately encrypted on disk.

iOS may have app sandboxing, but so does Android with each application running as it’s own user ID (UID), with the added benefit of profile isolation providing a separate user space from the parent profile as well! Applications within each profile by default cannot communicate with one another, offering far greater work/personal application isolation than app sandboxing alone.

### Architecture component isolation

Android is built up of six major components:

- Applications
- Android framework
- Native libraries
- Android runtime
- Hardware Abstraction Layer (HAL)
- Kernel

Each of these components are isolated, running in their own domains, meaning should any vulnerability be exploited in one component, it will not grant access to the others by default.

Combined with such capabilities as verified boot, downgrade protection and more, devices are constantly monitored for unauthorised changes and will prevent a boot accordingly, ensuring the device remains secure.

### Monthly security patches

Android benefits from a monthly security patch cycle to maintain high levels of security against exploits and vulnerabilities discovered in the wild.

In 2017 over a billion devices were receiving security patches, this will only have increased further in 2018 following the introduction of Android Enterprise Recommended; devices in the Android Enterprise Recommended programme are mandated to push these updates within 90 days of Google’s release, with the Android One programme complimenting this further by mandating a security update every 30 days.

### Play Protect

Google’s Play Protect suite of solutions includes the world’s largest anti-virus service, analysing 500,000 applications, and scanning over 50 billion on Google Play, on-device and crawling the web every day.

Play Protect is always-on, and will take action on any known potentially harmful application (PHA) found on a device, as well as any known bad websites via the Safe Browsing service to proactively warn users of danger.

Play Protect of course isn’t infallible, and I’d support organisations who augment Play Protect’s capabilities with [an MTD solution](/android/mtd-and-android-enterprise/), however it’s an ever-improving service utilising machine learning to evolve over time, and does a pretty good job for most use cases. Combined with options to prevent installation of applications from unknown sources, USB debugging and more, a corporate device can safely and successfully avoid PHAs.

### Open source

Android’s open source nature allows anyone, anywhere to access the code that makes up the Android operating system.

Vulnerabilities and bugs therefore aren’t dependent on Google for discovery, but can be found by anyone who takes the time to dive into the repositories; the source remains under constant scrutiny by the wider community which leads to a stronger OS.

Android is evolving
-------------------

Some years ago recommending an Android device in the enterprise may have raised an eyebrow. Prior to Android 5.0 security was not perceived to be a priority and management (outside of Samsung at least) was hardly reliable.

A lot has changed since then.

GMS certified devices since Android 6.0 are mandated to support the Android Enterprise solution sets, guaranteeing a reliable, consistent user experience across OEMs.

The days of bringing devices on board and hoping the exchange profile applies successfully are very much over.

Even today things are improving still, with the [introduction of OEMConfig](/android/what-is-oemconfig/) OEMs can extend on the base set of Android Enterprise APIs in order to deliver bespoke management capabilities in a way that’s faster and more reliable than ever before. OEMConfig offers zero-day support for new features and capabilities without EMM vendors having to lift a finger.

<div class="callout callout-info">

### Did you know?

OEMs such as Samsung and Zebra have &gt;1000 APIs available in addition to fundamental Android Enterprise capabilities for incredibly granular management. Through OEMConfig, these APIs can be (and are for Zebra) exposed for simple, zero-day support of every new feature published. More and more OEMs will build out their unique management capabilities as OEMConfig evolves. </div>

Check out the [linked article](/android/what-is-oemconfig/) to understand how OEMConfig will transform Android management.

Android is flexible
-------------------

Organisations demand flexibility; in process, use-case, form factor and budget. Android is the most versatile mobile OS on the planet.

### Management scenarios

Considering BYOD? Dedicated? Something in between? With four individual solution sets to choose from, Android offers a management scenario to suit all applications.

![](https://cdn.bayton.org/uploads/2017/04/AEtypes-Page-6.png)
*From: [What is Android Enterprise and why is it used?](/android/what-is-android-enterprise-and-why-is-it-used/)*

The in-depth document [What is Android Enterprise and why is it used?](/android/what-is-android-enterprise-and-why-is-it-used/#enter-android-enterprise) outlines these deployment scenarios and their applications, while this [infographic](/android/infobyte-did-you-know-android-enterprise-deployment-scenarios/) offers a deep-dive on each deployment scenario specifically.

Whether your organisation wants to permit personal devices whilst managing corporate data on a secure, isolated, separately encrypted profile, or desires full control over the device, Android Enterprise offers all of this in a way that is quick and simple to manage.

### Provisioning methods

Perhaps devices are primarily located in a warehouse or other close-proximity situation where it makes sense to utilise a master device to provision devices with a bump, or perhaps devices are shipped directly to end users and should be set to provision over the air. Android can accommodate these scenarios and more.

There are a number of [provisioning methods](/android/android-enterprise-provisioning-guides/) available for Android devices, including:

- NFC bump
- QR code scan
- DPC identifier
- Zero-touch enrolment
- Knox Mobile Enrolment (KME)

As above, an NFC bump makes sense where many devices are located in close proximity, while QR code and DPC identifier offer a means for remote provisioning in ways that are easy to understand.

For newer devices (8.0+) to be ready to provision straight from the box, zero-touch enrolment provides the ability to pre-configure devices before they’re even taken out of the box.

For Samsung devices running Knox 2.8 or higher, the very same is supported through Knox Mobile Enrolment (without the 8.0 requirement).

More information of provisioning methods can be found in [What is Android Enterprise and why is it used?](/android/what-is-android-enterprise-and-why-is-it-used/#diving-deeper-with-work-managed-devices) and this handy [infographic](/android/infobyte-did-you-know-android-enterprise-work-managed-provisioning-methods/).

### Form factor

Are phones and tablets too.. *consumer*? Does your organisation rely on fixed endpoints, smart phone systems, bespoke logistics or warehouse scanners, specialised interactive displays, or something else?

Not only has Android shipped on phones and tablets in screen sizes ranging from the [minute](https://www.palm.com/product) to the [enormous](https://www.samsung.com/uk/tablets/galaxy-view-18-4-t670/), Android can be equally found on rugged devices, smart displays, point-of-sale endpoints, projectors and many other specialised hardware types.

If a form factor doesn’t exist that suits an organisations needs, one can be developed with any number of specialist hardware manufacturers.

No matter the application, there is – or can be – a form factor to suit. Android isn’t limited to *only* phones and tablets in a couple of sizes.

### Budget

Like Android’s flexibility in form factor, the same is true for budget.

While Apple continues to inflate the prices of their product lines to numbers which far exceed the budgets of many organisations (to their detriment), an Android Enterprise Recommended, GMS certified and *enterprise-suitable* device can be picked up for as little as £[70](https://www.nokia.com/phones/en_int/nokia-3), cheaper still with carrier-arranged hardware funds.

Organisations can of course opt for flagship handsets and pay the premiums associated with these feature-rich devices, however there’s no obligation to do so.

Those purchased on the mid-range scale benefit equally from security patches, OS upgrades, excellent battery life and more. These days budget doesn’t mean poor quality.

Android is simple to manage
---------------------------

Taking Gartner’s research into consideration, highlighting Android’s clear lead in security controls over iOS, here are some examples of how Android excels in simplicity of management:

### Managed Google Play

A corporate version of Google Play permitting only applications approved by administrators; the primary Play Store on fully managed devices, or the badged Play Store for work profile-enabled devices.

![](https://cdn.bayton.org/uploads/2019/01/Screenshot_20190131-174333.png)

Managed Google Play offers complete control over the applications permitted on a managed device without affecting the native look and feel of the device.

In conjunction with managed Google or Google Play accounts, applications can be distributed silently and simply, updated automatically, restricted from uninstallation and more.

Add in the ability to [create, manage and deploy in-house applications](/android/create-and-manage-private-apps-for-android-enterprise/) with only a few clicks, and a similar process for [deploying web applications](/android/create-and-manage-web-apps-for-android-enterprise/) for direct access to corporate sites and resources, and managed Google Play becomes a one-stop solution for all forms of quick, simple application management.

What’s more, organisations can take application distribution a step further with managed configurations; inputting within the EMM the relevant details, these applications can be preconfigured on installation, meaning far less work for end-users setting up their devices.

### System and application updates

System update control is critical in enterprise, administrators need the control to be able to force updates on devices, postpone updates, and schedule them for outside of working hours.

Application update control may be just as important, whether to update immediately, over WiFi only, not at all or during a scheduled time slot.

Android does all of this, providing complete, granular control over when and how updates occur for managed devices to ensure devices remain secure, or to offer a little extra time for testing before initiating a corporate roll-out. Samsung’s e-FOTA service takes this a step further, offering the ability to target a particular OS version until such time later versions have been validated by the business.

Android supports work/life balance
----------------------------------

It’s not all about how a device is managed during business hours, employees may be glued to their devices 7 days a week! Providing tools to promote a stronger work/life balance by encouraging downtime and trust amongst employees is crucial to ensure a happy, healthy and productive workforce. Here’s how Android can help:

### Turning off the work profile

Downtime is an important aspect of modern life. Being always-on, always connected can be detrimental to employee health and well-being, so providing tools to quickly and easy fully disconnect from work is an incredibly important feature, one which puts end-users in control as much as administrators.

The work profile can be turned off with a simple toggle of the quicksettings tile, or within the app drawer (OEM launcher support required) at any time. All corporate applications will temporarily disable and no notifications, sync or any other related activities will be performed until the profile is turned back on.

For countries with laws around the right to disconnect, EMM policies can automate this functionality as required, where supported.

### Promoting privacy

Another key benefit of the work profile over legacy, full-device management for BYOD deployments is **privacy**.

When an Android device is enrolled into a BYOD programme, the organisation creates a dedicated work profile on the device in which corporate applications and data reside; there is little device-level management the organisation can enforce, but more importantly, there is almost nothing an organisation can *see* in the parent profile (device) from a personal data point of view.

The apps users install, the data users generate, it is all completely invisible to the EMM solution managing the work profile, as the EMM agent (or DPC) sits within the isolated work profile it creates and not within the parent profile – or device-wide as it would be on other platforms.

For end-users, hoping the organisation is opting not to sync personal data up to the EMM console is not good enough. Choose a platform that doesn’t permit this to begin with: Android.

Check out this [dedicated article](https://www.brianmadden.com/opinion/BYOD-privacy-Dont-settle-for-less-than-Android-enterprise-in-2018) about BYOD and privacy for more on this topic.

Conclusion
----------

With the above in mind, hopefully the case for Android in the enterprise has been adequately made, but this is only scratching the surface. For more details on Android Enterprise, the modern management solution for Android devices, check out the vast selection of documents, guides and articles located here: [Android](/android).

*Are you a Windows Mobile/Phone customer/user still? Are you planning a move from the platform in light of its abandonment? Let me know in the comments, on* [*LinkedIn*](https://linkedin.com/in/jasonbayton) *or* [*@jasonbayton*](https://twitter.com/jasonbayton) *on Twitter.*