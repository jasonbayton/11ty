---
title: "What's new for enterprise in Android 14"
date: '2023-04-20'
status: publish
author: 'Jason Bayton'
excerpt: "With the first beta live, it's time to see what's coming to Android 14"
type: post
tags:
    - Enterprise
---
Not too long ago Google [announced](https://android-developers.googleblog.com/2023/04/android-14-beta-1.html) the first beta of Android 14. 

As these things tend to go, the likelihood now of major additions is slim, and so beta 1 marks a good opportunity to review what we're likely to see when Android 14 officially launches later this year.

Related: [Bayton's Android Enterprise wishlist](/android/android-enterprise-feature-requests/)

Ready?

## Persistent screen-on during provisioning

If your Android experience is primarily centred around Samsung then this may not seem new, but for those of us who've spent time with most other OEMs in the ecosystem the screen turning off during provisioning is at minimum an inconvenience, at most the reason why provisioning or enrolment may fail. 

Often, and I see this more with AMAPI (Intune, Mambo, Wizy, etc) than Play EMM API (custom DPC - ~~MobileIron~~ Ivanti, SOTI, VMware, etc), allowing the screen to time out and coming back to it a little later results in a failure to setup and a request to reset. In my use cases this isn't the end of the world. For large staging projects this would be beyond frustrating. 

Well in any case, for non-Samsung (and other OEMs that don't already support it) devices, once Android 14 lands this will be a thing of the past. 

Google had actually introduced in Android 13 a DPC extra to keep the screen on that customers could leverage: `EXTRA_PROVISIONING_KEEP_SCREEN_ON`. Clearly this was given some additional thought bundled in instead, which is good, since most customers wouldn't have known about this.

## A revamp to cross-profile behaviour & implementation

I normally wouldn't reference deprecations and replacement APIs in these updates because typically they're a little _dry_, but the apparent revamp on cross-profile functionality is interesting. 

`CrossProfileContactsSearchDisabled` and `CrossProfileCallerIdDisabled` are being deprecated in favour of what appears to be a more specific `ManagedProfileCallerIdAccessPolicy()` and `ManagedProfileContactsAccessPolicy()`. Reading into the soon-deprecated APIs specifically, Google states:

> Starting with Build.VERSION_CODES.UPSIDE_DOWN_CAKE, calling this function is similar to calling setManagedProfileCallerIdAccessPolicy(android.app.admin.PackagePolicy) with a PackagePolicy#PACKAGE_POLICY_BLOCKLIST policy type when disabled is false or a PackagePolicy#PACKAGE_POLICY_ALLOWLIST policy type when disabled is true.

The original APIs were a simple allow/disallow, while the new APIs lean on ALLOWLIST/BLOCKLIST (and another new ALLOWLIST_AND_SYSTEM, which as you might guess includes system apps by default as well as those explicitly defined by the DPC) to either generate explicitly permitted, or explicitly blocked applications being called on the device for the cross-profile functionality of caller ID and contact search.

`DevicePolicyManager#setCrossProfileCalendarPackages` and `DevicePolicyManager#getCrossProfileCalendarPackages` are deprecated. But this is because these _types_ of API are going away all together. 

In their place, applications will need to lean on the new [Connected apps](https://developers.google.com/android/work/connected-apps) implementation, which expands scope beyond just calendar as the old API defines. Connected apps is early access at the moment, and looks like it has some - very justifiable - tight controls on what's approved vs not, since there's scope with these APIs to syphon data en masse from out of the work profile. The backup example they provide (which wouldn't be approved) highlights the very high-risk associated:

> An app providing backup services that will sync work data to a personal profile account, or vice versa, would not be approved as it would send and log data from one profile to the other profile.

## SIM management for COPE devices

This has been on my list of feature requests [_for years_](https://bayton.org/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/#work-profile-sim-management)! The ability to manage SIM functionality, and direct it into the work profile has been an ecosystem-wide gripe with COPE (and lesser but still valid, BYO) for as long as I can remember. 

But! It's not what I'd consider fully formed just yet.



