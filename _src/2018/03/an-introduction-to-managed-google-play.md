---
title: 'An introduction to managed Google Play'
date: '2018-03-19T16:20:00+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 9065
tag: []
post_format: []
discourse_permalink:
    - 'https://discuss.bayton.org/t/an-introduction-to-managed-google-play/373'
publish_post_category:
    - '14'
tags:
    - Enterprise
---
If you’re an Android user or manage Android devices in your organisation today I probably don’t need to tell you what the Google Play store is; you are no doubt familiar with Android’s equivalent to the Apple App Store hosting an estimated 3.5 million applications as of 2017 (Statista).

<figure class="wp-block-pullquote">> *users are nine times less likely to contract a PHA downloading from the Play Store*

</figure>Google Play is a cornerstone of the Android ecosystem, and while it’s not the only way to source applications for Android devices it *is* the most secure, as recently revealed in the [Android Security 2017 Year In Review](https://source.android.com/security/reports/Google_Android_Security_2017_Report_Final.pdf), users are nine times less likely to contract a PHA (Potentially Harmful Application) downloading from the Play Store vs alternative methods, at a probability of only 0.02% in 2017 (50% lower than 2016 at 0.04%).

For businesses however, Google Play has been something of a challenge.

Traditional application management
----------------------------------

Traditionally, securely managing applications on Android devices has required a few things:

1. An Enterprise Mobility Management Server
2. A Google account for every device
3. Full, unrestricted access to Google Play

<figure class="wp-block-pullquote">> *just as iTunes accounts on iOS devices are a pain, so too are Google accounts on Android devices*

</figure>The Google account mandate is the biggest challenge for organisations due to the need to manage them; once a Google account is present users can download any applications they wish, back up data to Google’s servers or return them locked due to Android’s Factory Reset Protection (FRP). Obviously there are ways and means of preventing this (wholly or in part) via an EMM, however the fact remains, just as iTunes accounts on iOS devices are a pain, so too are Google accounts on Android devices.

If an organisation doesn’t want to deal with Google accounts, the alternative has been to enable unknown sources on the devices (in and of itself a security risk) and push APK files directly from the EMM server, either silently where supported (Samsung Knox, Zebra) or on-demand via the EMM app catalogue typically pushed down to devices as part of enrolment. Ignoring the breaches in distribution agreements this may invoke, it’s also extremely unreliable due to the various APK versions potentially targeting different form factors, architectures and Android versions. There’s no guarantee the one APK uploaded to the EMM will install on all devices and this can potentially lead to hefty data bills given some EMMs will re-push a failing APK repeatedly, forever.

There are of course 3rd party app stores, however these are absolutely *not* a viable alternative; 3rd party app stores are a haven for malware and PHAs, and are the leading cause of infection globally.

So it’s fair to say it hasn’t been the best possible experience to date.

Introducing managed Google Play
-------------------------------

There is, however, another way. With the introduction of Android enterprise also came managed Google Play, an enterprise-targeted version of Google Play that:

1. Provides access only to applications an organisation explicitly approves
2. Enables the bulk-purchasing of paid applications
3. Removes the requirement for user-managed Google accounts
4. Can push applications and updates silently without requiring user intervention
5. Offers managed configurations for pre-configuring applications as they’re installed.

### Approved applications

As mentioned above this is part of the Android enterprise solution set; managed Google Play isn’t available for legacy-enrolled devices that will have to continue with legacy application management, but given Android enterprise is [becoming the default and only option](/2017/12/google-is-deprecating-device-admin-in-favour-of-android-enterprise/) for managing newly-purchased Android devices from next year, organisations should be evaluating a migration already. In tandem with default options preventing such things as application installation via unknown sources, organisations can rest easy knowing managed Google Play will be the only option for application installation available to end-users either within the work profile for BYOD/COPE deployments, or across the whole device if work-managed (COBO/COSU).

<figure class="wp-block-pullquote">> *If 0.02% accounts for the 3.5 million applications available in Play today, imagine the odds of contracting a PHA with only a handful of applications available for download*

</figure>By default, managed Google Play will offer no applications; administrators – whether G Suite or managed Google Play Accounts with a partner EMM solution – will need to start approving applications either via their EMM solution or [play.google.com/work](https://play.google.com/work?hl=en) directly; this entirely depends on the EMM platform as Intune for example requires applications are approved via managed Google Play and then synced into the Intune tenant, while MobileIron and AirWatch on the other hand offer direct application import and management through the EMM console without the need to interact directly with managed Google Play.

Whether an organisation approves 1 or 100 applications, only these will be available to end-users. If 0.02% accounts for the 3.5 million applications available in Play today, imagine the odds of contracting a PHA with only a handful of applications available for download!

### Bulk Purchase Program

For anyone reading this situated outside of the US, the Bulk Purchase Program (BPP) may jump out at you as something mostly unheard of. Unfortunately that’s because it’s not available globally just yet, but I expect it to expand out of the US this year.

BPP answers a familiar problem – if users need to use apps requiring payment, how does the organisation deal with this?

- Ask the user to purchase and expense the license?
- Purchase the license on the user’s behalf with a corporately managed Google account?
- Work out ad-hoc licensing deals with developers directly?

In practice, much like Apple’s VPP, an organisation may purchase and manage application licenses for distribution and retrieval to reduce the burden on end-users purchasing and expensing app licenses, while allowing organisations to reuse them repeatedly rather than having licenses leave with ex-employees if associated with the ex-employee Google account.

As with most Android enterprise APIs, the Bulk Purchase Program needs to be supported by the organisation’s EMM platform and so is worth enquiring about before attempting to sign up.

### No more Google account management

Because managed Google Play works in tandem with Android enterprise, there are no Google accounts to manage; if the organisation uses G Suite the Google accounts are already corporately managed, while managed Google Play Accounts, the newer solution for Android enterprise enrolment, automatically create generic accounts on the fly during EMM enrolment and offer no personal customisation, they’re there purely to facilitate application management.

Managed Google Play however goes even further than this, offering organisations the ability to silently install public applications from the Play Store with absolutely no interaction from the end-user; corporate applications can install silently and automatically as soon as the device is enrolled!

### Managed application configurations

If the EMM platform is leveraging managed Google Play APIs, whenever an application that supports managed configurations (it is unfortunately opt-in for app developers at this time) is approved/imported into the EMM, it is possible to pre-configure the application so that, for example, email is already pre-installed and ready to go, or the Kerberos environment is fully configured for password-less login across all managed apps, without any user intervention.

Organisations are no doubt familiar with support calls requesting enrolment/setup assistance, or dedicating resource to creating in-depth enrolment guides in an attempt to alleviate the burden on support teams.. with managed app configurations, there’s little need since the app with provision itself!

Conclusion
----------

Managed Google Play is entirely understated in its complementary capabilities within the Android enterprise solution set, but with a 2000% increase in managed Google Play activity in 2017, it will continue to revolutionise how organisations manage their Android applications in the future.