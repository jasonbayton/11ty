---
title: 'Android Enterprise first: AirWatch 9.4 lands with a new name and focus'
date: '2018-05-14T20:57:49+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 5921
tag:
    - airwatch
    - android
    - 'android enterprise'
    - EMM
    - uem
    - vmware
post_format: []
publish_post_category:
    - '14'
amp_status:
    - disabled
discourse_permalink:
    - 'https://discuss.bayton.org/t/android-enterprise-first-airwatch-9-4-lands-with-a-new-name-and-focus/133'
tags:
    - Enterprise
---
Earlier this month, VMware [announced](https://docs.vmware.com/en/VMware-Workspace-ONE-UEM/9.4/rn/workspace-one-uem-94-release-notes.html) version 9.4 of their popular UEM solution and with it, both a stronger focus on Android Enterprise and a [rebranding exercise](https://support.air-watch.com/articles/360000953347) to bring the platform closer in line with VMware’s range of other products:

![](https://cdn.bayton.org/uploads/2018/05/Screenshot-from-2018-05-14-09-54-21.png)
*VMware Workspace ONE UEM. Rolls off the tongue, doesn’t it?*

This update therefore bids farewell to the AirWatch name, brand and colour scheme of old, other than the odd references here and there, and completes the brand unification that I imagined would be somewhat inevitable following the AirWatch acquisition some years ago:

![](https://cdn.bayton.org/uploads/2018/05/Screenshot-2018-5-18-Getting-Started-Getting-Started.png)

The rebrand has certainly raised a few eyebrows across the industry, however in reality the name change doesn’t mean a significant amount on its own; rather it’s far more important to understand the [recently published licensing changes](https://support.air-watch.com/articles/360003860514). The way VMware explained the change to me at the recent [Android Enterprise Partner Summit](/2018/05/live-android-enterprise-partner-summit-2018/), many customers should end up better off as the numerous colours are dropped in favour of fewer WS1 options, I’d encourage organisations to [take a look](https://www.vmware.com/products/workspace-one.html#pricing) sooner rather than later in any case.

On to Android Enterprise, 9.4 introduces a first-look at VMware’s shift to [Android Enterprise-first](https://blogs.vmware.com/euc/2017/12/android-enterprise-front-center.html) with a few new features and requirements:

- New deployments will be prevented from enrolling legacy Android devices ([device administrator](/android/android-glossary/#device-administrator) enrolment) by default without explicitly opting in to legacy enrolment
- Android Enterprise setup has been added to the first-run Wizard for new deployments
- Terminology has been modified to the following: 
  - Device administrator &gt; “Legacy Android”
  - Android Enterprise &gt; Android
- Creating profiles will now require choosing between Android (Legacy) and Android, the previous two step workflow has been retired.
- COSU (corporate owned, single use) functionality has been added to the launcher in order to reduce the possibility of escaping the kiosked environment.

If you’ve been paying attention to the VMware blog, the [previously-announced deprecation of app search functionality for legacy Android enrolments](https://support.air-watch.com/articles/115015773788) (the Play Store Integration Service) isn’t listed in the changes above, this is because the rather disruptive change is not being implemented until the end of 2018, offering plenty of time for organisations to migrate to Android Enterprise ahead of time.

Console changes
---------------

For existing AirWatch customers you may be wondering how you’ll be affected..

You won’t.

Well, at least in so much as preventing legacy Android enrolments. If your organisation has previously deployed Android devices without taking advantage of t[he newer, more secure, simpler and more flexible way of managing Android devices](/android/what-is-android-enterprise-and-why-is-it-used/), that explicit opt-in will have already been completed during the upgrade process without any manual intervention.

This change is only targeting new deployments in order to ensure Android Enterprise is very much front-and-centre when getting the tenant set up for Android management. Here’s what that new wizard looks like:

![](https://cdn.bayton.org/uploads/2018/05/Screenshot-2018-5-18-Getting-Started-Workspace-ONE.png)

And clicking on configure **Android EMM Registration**:

![](https://cdn.bayton.org/uploads/2018/05/Screenshot-from-2018-05-14-10-06-09.png)

If an organisation wants to permit the enrolment of legacy devices, the admin can find the relevant setting in **Groups &amp; Settings &gt; All Settings &gt; Devices &amp; Users &gt; Android &gt;** **Android EMM Registration**. On checking the box *Deploy Android without registering with Google*, WS1UEM will present a warning as follows:

![](https://cdn.bayton.org/uploads/2018/05/Screenshot-from-2018-05-14-10-08-07.png)

If this option remains disabled, end-users attempting to enrol a non-Android Enterprise device will see the following error after authenticating with the WS1UEM server:

![](https://cdn.bayton.org/uploads/2018/05/Screenshot_20180514-103002.jpg)

Beyond that, there will be more subtle changes, as mentioned above, in the terminology used and the way profiles are created going forward. VMware explain the terminology changes as follows:

> **Android for Work** has been renamed to **Android** and is the default deployment method for new enrollments. The legacy Android platform will now be referred to as **Android (Legacy)**.

In practice, with devices enrolled via both device administrator and Android enterprise methods, I saw no obvious “face value” indication which is which outside of the organisation group they were enrolled into:

![](https://cdn.bayton.org/uploads/2018/05/Screenshot-from-2018-05-14-10-42-22.png)

It does become clearer on the profile side however. This is what admins will be greeted with when creating a profile going forward:

![](https://cdn.bayton.org/uploads/2018/05/Screenshot-from-2018-05-14-10-44-10.png)

Notice the two Android options? Here’s how the profiles will look when configured, note the “(Legacy)” added at the bottom there:

![](https://cdn.bayton.org/uploads/2018/05/Screenshot-from-2018-05-14-10-51-11.png)

One thing I did expect to see was a bit of logic. The screenshot of profile creation above for example is from within an organisation group in which Android enterprise is not configured, yet I can still try to create “Android” profiles. It fails of course:

![](https://cdn.bayton.org/uploads/2018/05/Screenshot-from-2018-05-14-10-46-58.png)

But It’d be much better, I think, to hide those profiles that’d essentially do nothing when configured as I’m sure this will lead to support calls regardless. On the other side, within an Android enterprise-configured organisation group, it’s possible to create legacy Android profiles and no warnings are presented. Again, hiding this would both look cleaner and avoid any confusion whatsoever.

COSU Support
------------

A feature I’m rather excited to see is full COSU support. The new update brings with it more granular control over the Launcher (Kiosk) experience:

![](https://cdn.bayton.org/uploads/2018/05/Screenshot-from-2018-05-14-11-59-49.png)

I’m excited to do some proper work around this, as preventing access to the underlying OS is a frequent request in kiosk deployments. The Single App capability already gives it a leg up over the likes of MobileIron today and an answer to iOS native single app mode, so with more control this should be quite a powerful solution.

![](https://cdn.bayton.org/uploads/2018/05/Screenshot_20180514-121958.jpg)

I’ve done a little experimentation on a Huawei MediaPad M5 and the experience is OK, though on that device at least I still *see* everything even if things like swiping down to get to notifications is possible, but prevented about mid-way through sliding the shade down the screen. More testing required. Launcher is making full use of app pinning to make this work, a solution that’ll become [far more flexible with Android P](/2018/03/android-p-demonstrates-googles-focus-on-the-enterprise/) later this year!

Conclusion
----------

9.4 will begin rolling out to customers over the coming weeks to shared SaaS and dedicated SaaS customers. On-prem customers, feel free to get in touch with your VMware contact or partner in order to discuss how you can upgrade. Looking for a partner to help you through the upgrade or transition from legacy Android to Android enterprise? [Get in touch](/contact).

*Are you an AirWa.. err, VMware Workspace ONE UEM customer? What do you think of the changes? Will you be making use of the new features? Are you going Android enterprise first in your organisation? Let me know in the comments (login via your preferred social network!), via Twitter [@jasonbayton](https://twitter.com/jasonbayton) or on Linkedin via [/in/jasonbayton](https://linkedin.com/in/jasonbayton).*