---
title: 'UEM tools managing Android-powered cars'
date: '2019-03-12T16:57:55+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 9076
tag: []
post_format: []
discourse_permalink:
    - 'https://discuss.bayton.org/t/uem-tools-managing-android-powered-cars/376'
publish_post_category:
    - '14'
tags:
    - Enterprise
---
Last week, Volvo’s performance EV brand Polestar launched the [Polestar 2](https://www.polestar.com/press-release/2019/02/27/polestar-reveals-new-polestar-2), one of potentially many vehicles in the pipeline to be powered by Android, following Volvo’s partnership with Google some two years ago.

This evolution of the Android Auto most of us are familiar with now extends to controlling “basic functions like heating and cooling, seat position, or opening and closing the windows,” [according to The Verge](https://www.theverge.com/2017/5/15/15640596/google-android-auto-audi-volvo-apple-carplay-io-2017). In the years since then that could well be more, though it’ll remain separate from critical safety systems, something better left to manufacturers generally anyway.

With the level of control over vehicle systems available to Android, and [today’s capabilities for advanced device management](/2018/08/the-state-of-android-enterprise-in-2018/), it begs the question:

How far away is centralized, remote vehicle management?

It’s not like this is a new idea, Windows has found its place in many a machine, often managed through the same standard tools as the laptops and desktops the organizations also roll out, so this certainly isn’t a particularly far-fetched idea. And while Android Auto is the focus here, this could apply to many other types of devices.

Think about the use case: Imagine walking into the office car park, picking a vehicle and authenticating with your (managed) mobile device for access and a customized experience; you could have your seating position, mirrors, climate control, radio stations (or other media), and more all set to your preference when you get in, and automatically reset when you’re finished for when the next person came along.

Vehicles could leverage advanced [user management introduced with Android Pie](/2018/03/android-p-demonstrates-googles-focus-on-the-enterprise/#8-support-for-multiple-users-on-dedicated-devices) to allow organizations to authorize and provision temporary or persistent users with set applications, vehicle restrictions, and more.

Imagine the possibilities! From the same UEM platform organizations manage their field tablets or PoS systems today, they could set restrictions on:

- Top speed (software speed limiter)
- Geofencing
- Vehicle insights
- Multi-user support, with apps and configs pushed OTA
- Compliance alerts, remote disable
- Remote log collection
- Preventing disabling of traction control, regenerative braking, access to diagnostic ports
- Limiting charge rate or maximum capacity
- and undoubtedly so much more

Add in standard AE enticements like no personal Google accounts required (Android Auto does already offer this, but it isn’t managed) or permitted, a managed Play Store for only whitelisted Auto applications, and more; it’s a fascinating idea.

*But hold on*, I hear you say. *No UEM today is going to implement vehicle-based restrictions, particularly manufacturer specific.*

Well, to that I’d say you’re certainly making a valid point, at least partly.

Ultimately Android Enterprise solution sets will evolve with new features and functionality to reflect how Android is used, programs such as Android Enterprise Recommended for EMMs allow Google to mandate features to be implemented to remain compliant, so it could happen.

Where I doubt we’ll see any particular traction is in proprietary features by individual manufacturers, but that really doesn’t matter because we already have solution in place today:

OEMConfig.

Fresh in the minds of those [following Samsung over the last few weeks](/2019/03/february-was-an-interesting-month-for-oemconfig/), [OEMConfig](/android/what-is-oemconfig/) allows for zero-day support of features with zero implementation for UEM vendors. Utilizing Android Enterprise managed configurations, organizations could set all of the above mentioned restrictions and more as simply as configuring Gmail.

Some UEM vendors already have the industry vertical-specific policy templates available, so templates for vehicle policies wouldn’t be that far off. Or, they could go as far as building industry-specific consoles, like Microsoft has done with Intune for Education.

If vehicle manufacturers wanted to take this a step further, they could build home-grown management portals based on the Android Management API, maybe incorporate zero-touch support so vehicle systems automatically enroll into management based on the the company purchasing or leasing them.

The tech is already in place to support this right now, it’s just a case of fathoming how to leverage it. It’ll all need to begin with Android Auto supporting Android Enterprise; this could already be closer than we know, but if it is, Google are being awfully quiet about it. In the future, however, it should be inevitable.