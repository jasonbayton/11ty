---
title: "Google's Android Management API will soon support COPE"
date: '2020-07-01T23:40:27+01:00'
status: publish
author: 'Jason Bayton'
excerpt: "The COPE deployment scenario has been long sought-after in AMAPI, absent after most of the rest of the EMM market had adopted it in one way or another and even still following the unexpected news of the imminent change to how COPE is deployed in Android 11. Now, it's on the way"
type: post
id: 9078
tag:
    - 'android enterprise'
    - cope
    - 'Enterprise Mobility'
post_format: []
discourse_permalink:
    - 'https://discuss.bayton.org/t/googles-android-management-api-will-soon-support-cope/378'
publish_post_category:
    - '14'
tags:
    - Enterprise
---
The COPE deployment scenario has been long sought-after in AMAPI, absent after [most](/2019/10/why-intune-doesnt-support-android-enterprise-cope/) of the rest of the EMM market [had adopted](/android/android-enterprise-emm-cope-support/) it in one way or another and even still following the unexpected news of the imminent [change to how COPE is deployed in Android 11](/2020/02/android-enterprise-in-11-google-reduces-visibility-and-control-with-cope-to-bolster-privacy/) (for comparison, the only other *really* significant change to Android I’d consider is [Device Admin](/2017/12/google-is-deprecating-device-admin-in-favour-of-android-enterprise/), which is still ongoing almost 3 years after that announcement).

Earlier this month at the Android Enterprise Partner Summit (recaps: [2019](/2019/06/android-enterprise-partner-summit-2019-highlights/), [2018](/2018/05/android-enterprise-summit-2018-highlights/)) Google announced upcoming support for the Android 11 implementation of COPE in AMAPI, work profile on company-owned devices, and just yesterday [publicly announced](https://blog.google/products/android-enterprise/work-profile-new-standard-employee-privacy) it also.

In a surprise twist however, Google actually take this a step further by extending the implementation to as far back as Android 8.0, offering support effectively from when the original COPE, work profile on fully managed devices (WPoFMD), was introduced.

To be absolutely clear, AMAPI will not support WMoFMD running 8.0-10, but instead have backported, through an undisclosed, but likely similar approach to what’s been done before with things like [device-wide unknown sources](/android/feature-spotlight-block-unknown-sources-on-work-profile-deployments/), the ability to offer cross-profile capabilities to replicate Android 11’s work profile on company-owned devices. When a device is upgraded to Android 11, a migration will still occur, however it’ll be seamless when compared to WPoFMD.

What to expect with work profile on company-owned devices
---------------------------------------------------------

This has been covered mostly in the evolving [Android 11 COPE changes](/android/android-11-cope-changes/) doc, though to summarise the capabilities available for administrators, the following will be available with work profiles on company-owned devices:

- Asset management tools
- Personal usage policies
- Full device reset
- Personal app allow/block list
- Factory reset protection management
- Hardware management
- Block work profile removal
- OS features like telephone, connectivity, and location
- System update management
- Work profile max pause duration
- Device-wide security logs

Some of the key benefits over deploying a typical work profile (or, what would in future be referred to work profile on personally-owned devices) today include:

**The ability to fully reset the device** – bearing in mind personal data will be irreversibly removed if not backed up. On a typical work profile deployment today, only an enterprise wipe is available, meaning additional work is required after removing the work profile to prepare the device for re-deployment

**Factory reset protection (FRP)** – one of the biggest annoyances with work profile deployments to date, if the device is reset in an unauthorised manner with a personal Google account in use, it’ll invoke FRP, requiring in some instances for the device to be sent off for repair to wipe the FRP bit. Like a fully managed deployment, FRP can now be controlled to avoid this.

**Max pause duration for the work profile** – previously entirely at the whim of the end user, admins can define for how long the work profile can be paused at a time to ensure those pesky emails and work notifications can’t turned off indefinitely.

**App management** – not akin to WPoFMD, where admins could see all apps installed on a device, push apps to the personal profile, and had granular control overall, the ability to define allow/block lists for app types (like video) or apps individually, without visibility of whether those apps are actually installed, is still an improvement over a work profile deployment alone, considering there’s no control at all over this in work profile deployments today.

And, of course, the ability to provision the device out of the box directly as a corporate owned device, so no need to fumble through the wizard to get a work profile set up.

The benefit of consistency
--------------------------

There’s little doubt Google could have implemented WPoFMD for devices running 8.0-10 in AMAPI, and for undoubtedly many customers the additional functionality and granular control would have been welcomed, but it’s understandable why they went this way.

Not taking into account the enormous privacy push that’s been ongoing within Android and AE for a long time, which undeniably drives decisions like these in a big way, choosing to implement COPE as one unified deployment method for all 8.0+ devices, in a way other EMMs on the market simply cannot, means for AMAPI customers – be that via Microsoft or any number of smaller EMMs – the way to deploy and manage COPE is consistent across the whole estate, and the approach is far less complicated for those who don’t spend a lot of time deep-diving into Android management to the degree people like myself do.

Given there’s no future for WPoFMD from Android 11, consistency now will guarantee fewer headaches in future, and those just coming into the world of AE, or looking to deploy COPE for the first time, ultimately benefit.

Vendor work under way
---------------------

Unsurprisingly, the first vendor to announce development is Microsoft, who announced a few days ago [that it’s under way](https://docs.microsoft.com/en-us/mem/intune/fundamentals/in-development#device-enrollment) for a preview in the near future. Though it’s not expected to be a complete implementation, it’ll offer an opportunity for Microsoft customers to get a taste of what’s to come.

For the rest of the AMAPI market, support will undoubtedly trickle in over the next several months.

I look forward to testing it!