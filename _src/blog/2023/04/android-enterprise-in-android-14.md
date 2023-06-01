---
title: "What's new for enterprise in Android 14"
date: '2023-04-20'
status: publish
author: 'Jason Bayton'
excerpt: "With the first beta live, it's time to see what's coming to Android 14."
type: post
tags:
    - Enterprise
---
Not too long ago Google [announced](https://android-developers.googleblog.com/2023/04/android-14-beta-1.html) the first beta of Android 14. 

As these things tend to go, the likelihood now of major additions is slim, and so beta 1 marks a good opportunity to review what we're likely to see when Android 14 officially launches later this year.

Given the amount of lower-level developer content, I'm not going to cover everything in the API docs targeted to Android 14, so this will be limited to only the notable items. That said, let's go!

## Persistent screen-on during provisioning

If your Android experience is primarily centred around Samsung then this may not seem new, but for those of us who've spent time with most other OEMs in the ecosystem the screen turning off during provisioning is at minimum an inconvenience, at most the reason why provisioning or enrolment may fail. 

Often, and I see this more with AMAPI (Intune, Mambo, Wizy, etc) than Play EMM API (custom DPC - ~~MobileIron~~ Ivanti, SOTI, VMware, etc), allowing the screen to time out and coming back to it a little later results in a failure to setup and a request to reset. In my use cases this isn't the end of the world. For large staging projects this would be beyond frustrating. 

Well in any case, for non-Samsung (and other OEMs that don't already support it) devices, once Android 14 lands this will be a thing of the past. 

Google had actually introduced in Android 13 a DPC extra to keep the screen on that customers could leverage: `EXTRA_PROVISIONING_KEEP_SCREEN_ON`. Clearly this was given some additional thought and bundled in instead, which is good, since most customers wouldn't have known about this feature otherwise.

## Prevention of installation of older applications

Android 14 introduces a new restriction on app installation that **cannot be overridden** through management APIs. 

If corporate applications target SDK 23 or earlier (Android Marshmallow), installation will automatically be blocked with an error that resembles the following:

`INSTALL_FAILED_DEPRECATED_SDK_VERSION: App package must target at least SDK version 23, but found 7`

This only affects new installations of applications. Those already on the device when it updates to Android 14 will not be affected.

See [this Google doc](https://developer.android.com/about/versions/14/behavior-changes-all#minimum-target-api-level) for more information.

## A revamp to cross-profile behaviour & implementation

I normally wouldn't reference deprecations and replacement APIs in these updates because typically they're a little _dry_, but the apparent revamp on cross-profile functionality is interesting. 

`CrossProfileContactsSearchDisabled` and `CrossProfileCallerIdDisabled` are being deprecated in favour of what appears to be a more specific `ManagedProfileCallerIdAccessPolicy()` and `ManagedProfileContactsAccessPolicy()`. Reading into the soon-deprecated APIs specifically, Google states:

> Starting with `Build.VERSION_CODES.UPSIDE_DOWN_CAKE`, calling this function is similar to calling `setManagedProfileCallerIdAccessPolicy(android.app.admin.PackagePolicy)` with a `PackagePolicy#PACKAGE_POLICY_BLOCKLIST` policy type when disabled is false or a `PackagePolicy#PACKAGE_POLICY_ALLOWLIST` policy type when disabled is true.

The original APIs were a simple allow/disallow, while the new APIs lean on ALLOWLIST/BLOCKLIST (and another new ALLOWLIST_AND_SYSTEM, which as you might guess includes system apps by default as well as those explicitly defined by the DPC) to either generate explicitly permitted, or explicitly blocked applications being called on the device for the cross-profile functionality of caller ID and contact search.

`DevicePolicyManager#setCrossProfileCalendarPackages` and `DevicePolicyManager#getCrossProfileCalendarPackages` are deprecated. But this is because these _types_ of API are going away all together. 

In their place, applications will need to lean on the new [Connected apps](https://developers.google.com/android/work/connected-apps) implementation, which expands scope beyond just calendar as the old API defines. Connected apps is early access at the moment, and looks like it has some - very justifiable - tight controls on what's approved vs not, since there's scope with these APIs to syphon data en masse from out of the work profile. The backup example they provide (which wouldn't be approved) highlights the very high-risk associated:

> An app providing backup services that will sync work data to a personal profile account, or vice versa, would not be approved as it would send and log data from one profile to the other profile.

At the time of writing, the [AMAPI API docs](https://developers.google.com/android/management/reference/rest/v1/enterprises.policies#crossprofilepolicies) don't show anything relating to these changes, so it'll be interesting to see if we benefit from zero-day support later this year.

## SIM management for COPE devices

This has been on my list of feature requests [_for years_](https://bayton.org/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/#work-profile-sim-management)! The ability to manage SIM functionality, and direct it into the work profile has been an ecosystem-wide gripe with COPE (and lesser but still valid, BYO) for as long as I can remember. 

But! It's not what I'd consider fully formed just yet.

In Android 14, organisations will be able to assign the SIM(s) on a corporate owned device to the work profile (so COPE only) as an all-or-nothing policy. This absolutely covers use cases where organisations provide a device and SIM for work while allowing personal use, but clearly doesn't cover the desired behaviour to associate 1 of multiple SIMs to the work profile, while the other is left to the parent profile; the ideal eventuality for BYO and COPE users. 

A new related API is `setDefaultDialerApplication`, which permits the DPC to set an explicit dialer in relation to this SIM management API (`ManagedSubscriptionsPolicy`), which is handy. This also compliments the default SMS API introduced way back in Android 10.

Behaviour-wise, it meets expectations, per Google: 

> When a subscription is associated with the managed profile, incoming/outgoing calls and text message using that subscription would only work via apps on managed profile. Also, Call logs and messages would be accessible only from the managed profile.

So again, brilliant start. Hopefully by Android 15 this'll mature into a full-featured SIM management offering for COPE and BYO equally, and I can officially tick it off my [AE feature requests list](/android/android-enterprise-feature-requests/).

## Correct saving of screenshots for work profile applications

In Android 14, the long-standing loophole for DLP controls, the humble screenshot, has been resolved. When a user takes a screenshot of a work app it will now be saved within the work profile, rather than in the parent profile.

If you're anything like me that'll be bittersweet; great for security in plugging a very obvious flaw with screenshots up to this point, but it's 100% something I've leveraged for years to overcome overly strict DLP policies preventing copy/paste, sharing outside the work profile, and so on. 

## Pausing the work profile 

In Android 14 Google are introducing the ability to pause, rather than turn off, the work profile. 

Think of it like an aggressive do not disturb mode for work apps, everything is still on and running in the background, but you're not alerted to anything. 

Why would you choose to pause a work profile rather than just turn it off? 

- Applications continue to receive notifications and data in the background, so you're not inundated by them when you turn the profile on. Work apps are immediately available when unpausing (no wait time, or sync required).
- Update policies continue to apply, so they can do so in the background rather than when the profile is back on. Obviously apps shared between both profiles will update even if the work profile is turned off, but apps only in the work profile won't unless the profile is on, normally.
- Cross profile contacts are identified, so you'll know you're getting a call from the boss while the profile is paused. When completely off the numbers aren't identified.

The question I don't have an answer for at the moment is how this works with the policies that require a work profile to be turned on after a period of time. If a user can pause a work profile but still be considered having it _turned on_, this seems like a simple way of getting around that compliance requirement. 

## Direct work contact messaging

Undoubtedly leaning on the new cross profile APIs above, personal apps will be able to directly message work profile contacts in supported applications. Undoubtedly this will be subject to IT policy, so watch out for that!

## Gesture navigation between work and personal profiles in-app

Rolling out with Google apps in the short term, Google is showcasing a new, more cohesive user experience when switching between profiles. 

This will be a drastic improvement on today's requirement that normally includes tapping into app settings or a context menu to switch to work, so I'm excited to see this!

## UWB (Ultra-Wideband) support

[UWB](https://developer.android.com/guide/topics/connectivity/uwb) is having a bit of a moment recently, with a lot of attention from the media on the solution in the last few months alone. 

UWB is a communications protocol that permits high-speed, short-distance, & low-energy communication. It sits alongside other radios like Bluetooth, NFC, Wi-Fi, etc.  

Since it is a radio, and means of sharing data, it was a matter of time before a management API popped up to control it. Per Google:

> Starting in Android 14, a device or profile owner can disallow UWB on an organization-owned device by applying the `DISALLOW_ULTRA_WIDEBAND_RADIO` user restriction with `DevicePolicyManager.addUserRestriction()`.

Again this is a device control limited to corporate owned devices, so fully managed or work profile on corporate owned (COPE). 

## Native financing support

Sort-of enterprise related, it appears 14 is introducing APIs to declare a device as being under finance with `isDeviceFinanced`. 

The finance use case has existed for a few years, originally only accessible to select partners holding a direct agreement with Google with the use of a bespoke DPC called Device Lock Policy, it appears this has graduated and become a little more available recently.

Also fun fact, while Device Lock is leveraged with zero-touch and AMAPI on the back end, it's actually against ToS to leverage AMAPI for device financing. I say this for the benefit of the 3 companies a week who reach out to ask me how they can use AMAPI for this use case :)

## Other features

There are several other features that I haven't mentioned, but everything I've found so far is available in the [DevicePolicyManager developer docs](https://developer.android.com/reference/android/app/admin/DevicePolicyManager) for further reading if interested.

This is looking to be a decent release!

