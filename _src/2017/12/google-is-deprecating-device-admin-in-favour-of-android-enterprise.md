---
title: 'Google is deprecating device admin in favour of Android Enterprise'
date: '2017-12-21T19:24:41+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 5155
tag:
    - airwatch
    - android
    - 'android enterprise'
    - EMM
    - Enterprise
    - google
    - MDM
    - mobileiron
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/google-is-deprecating-device-admin-in-favour-of-android-enterprise/73'
tags:
    - Enterprise
---
On Tuesday, Google[ finally announced](https://www.blog.google/products/android-enterprise/why-its-time-enterprises-adopt-androids-modern-device-management-apis/) their intention to deprecate a number of Android Device Admin APIs – which have enabled enterprise device management since Android 2.2 Froyo in 2010 – in order to promote[ Android Enterprise](/android/) (or work profile and managed device APIs as Google refer to them) as the default and only management APIs for Android devices from 2019.

The APIs to be removed with the Q release are:

- USES\_POLICY\_DISABLE\_CAMERA
- USES\_POLICY\_DISABLE\_KEYGUARD\_FEATURES
- USES\_POLICY\_EXPIRE\_PASSWORD
- USES\_POLICY\_LIMIT\_PASSWORD

In their announcement, Google state device admin will remain supported in Oreo now and through the next major release, Android P. One rather important caveat in Android P however is passcode enforcement will be deprecated ahead of being removed entirely in Android Q. Once Android Q is announced, Android Enterprise will be the only available solution for device management going forward.

This has been a long time coming.

As both an[ active proponent of Android Enterprise](/android/) and someone who’s seen device administrator capabilities[ abused by applications](https://www.linkedin.com/feed/update/urn:li:activity:6325045924510916608) over the years, this is a really exciting announcement; it reinforces and validates the long-held opinion I’ve had that Android Enterprise is the future of Android device management and will no doubt help to further improve the security of the Android platform.

What does that mean for organisations?
--------------------------------------

It depends to a degree, but it will sooner or later require a change in the way devices are managed. There’s a good chance many of the devices under management today won’t see an update to Android Q, since OEM’s typically provide only 18 months of support for updates. With Oreo being installed on only[ 0.5% of all Android devices](https://developer.android.com/about/dashboards/index.html), and Android P less than a year away already marking functionality as deprecated, it’s a good time to start[ thinking about a migration](/android/considerations-in-migrating-from-device-administrator-to-android-enterprise/).

As you might imagine, Oreo and earlier devices won’t be receiving this change and therefore device admin won’t be going away overnight, but eventually devices will give up or get flagged for renewal and the organisation will need to be able to support Android Enterprise within their chosen EMM platform when that happens.

That won’t be easy; a migration from legacy enrolment to Android Enterprise work-managed enrolment, a deployment scenario most comparable to the device administrator management of today’s devices, will require a factory reset of each device and will therefore be highly disruptive. A better idea, recommended both by Google and [myself](/android/considerations-in-migrating-from-device-administrator-to-android-enterprise/) previously, is to tie the migration in with the hardware lifecycle of the organisations Android estate.

Naturally that may be difficult or simply not possible for some organisations within the space of two years, so a hybrid management environment on the EMM platform will need to be supported during the migration.

Why is Android Enterprise better?
---------------------------------

The device admin API is based on an all-or-nothing approach requiring full device administrative permissions in order to manage a device. This applies to both corporately-owned devices and BYOD, which is hardly ideal. Furthermore, a Google account is required for public application installation, while enabling unknown sources is needed for private application installation. In both cases this has been something of a pain point, with the latter having the distinction of being a reluctantly accepted security risk.

Even when administrative permissions are granted, management APIs for individual OEMs are mostly non-existent and as such modern EMMs aren’t capable of managing just *any* Android device off the shelf. This is why Samsung is so dominant today, but more can be read about that[ here](/android/what-is-android-enterprise-and-why-is-it-used/#history).

Android Enterprise consists of a robust set of management APIs built right into GMS-certified devices that allow for universal and consistent management. Furthermore, with managed Google Play and managed Google Play accounts, not only will unknown sources be unavailable on work-managed devices by default, but only applications explicitly approved by administrators will be shown in managed Google Play, with silent application installation available as a standard feature. On the other hand for BYOD users, Android Enterprise finally enables managed access to corporate resources without the organisation taking full control of the personal device. More can be read about Android Enterprise[ here](/android/what-is-android-enterprise-and-why-is-it-used/).

Importantly, EMM vendors are already working on making migrations easier for organisations, with AirWatch[ announcing a switch](https://blogs.air-watch.com/2017/12/android-enterprise-front-center/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_recent_activity_details_shares%3BoW0BjYAOQIO0vjr6rsrJbw%3D%3D#.WjUXkkOnyRO) to an Android Enterprise-first deployment experience in the very near future only a few days ago.

Getting started
---------------

Ultimately the sooner organisations start evaluating Android Enterprise, the better. I’d recommend starting with[ considerations for migrating from device administrator to Android Enterprise](/android/considerations-in-migrating-from-device-administrator-to-android-enterprise/) for those familiar with Android Enterprise, or[ what is Android Enterprise and why is it used?](/android/what-is-android-enterprise-and-why-is-it-used/) for those who are just beginning the journey.

I’m always happy to hear from organisations managing Android devices, so please feel free to reach out for a chat and/or advice.

*Are you a considering or deploying Android Enterprise? Will you be looking to do so in 2018? Let me know your thoughts in the comments,*[ *@jasonbayton*](https://twitter.com/jasonbayton) *on twitter or* [*@bayton.org*](https://facebook.com/bayton.org) *on Facebook. If you’re on LinkedIn, you can also find me there –*[ */in/jasonbayton*](https://linkedin.com/in/jasonbayton)*.*