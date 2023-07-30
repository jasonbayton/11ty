---
title: 'Android 14 changes how the work profile is turned off'
published: '2023-07-30'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Work profile
eleventyNavigation:
  order: 2000
layout: base.njk
---
From Android 14, the way the work profile "turns off" changes.

## What’s changing

In Android 14, turning the work profile off no longer fully disables the profile. Instead, it is now "paused". Applications and notifications continue to be disabled and hidden respectfully, however the underlying profile user now relies on a solution that aligns with Focus Mode in Digital Wellbeing, suspending applications and notifications themselves, while permitting the work profile user to remain active and available in the background for what Google considers to be a better user experience.

What does it mean when apps are suspended?

> While in this state, the application's notifications will be hidden, any of its started activities will be stopped and it will not be able to show toasts or dialogs or play audio. When the user tries to launch a suspended app, the system will, instead, show a dialog to the user informing them that they cannot use this app while it is suspended.
>
> [_via_](https://developer.android.com/reference/android/content/pm/PackageManager#isPackageSuspended())

## What are the implications of the change?

With the work profile user still running in the background when the work profile is "paused" it allows for a few new features:

1. Caller ID remains available for work profile contacts, allowing users to see a work profile contact is calling while the profile is paused, rather than only seeing a number.
2. Apps can continue receiving version updates while the profile is paused, allowing devices to remain compliant with application version policies an organisation may have.
3. Notifications can continue polling while the profile is paused, allowing notifications to gather gradually periodically in the background to be immediately available when the profile is unpaused. This is to prevent a notification flood as experienced in Android 13 and older when a profile is turned back on after some time.

## Hasn't the work profile always paused?

It hasn't, but Google has predominantly referred to turning off the work profile in both documentation and areas of the Android OS as _pausing_ it. 

What needs to be understood now is:

- 13 and below: the work profile user was fully disabled, and not running.
- 14+: the work profile user continues to run, with the behaviour outlined above.

## Will this have any impact on EMM-deployed devices?

Yes.

Expect increased battery and data usage on work profile devices during periods where the profile is paused; the exact amount is likely OEM-dependent.

In testing data usage on a Pixel 7a, a paused work profile was recorded using between 10mb and 200mb of Wi-Fi data in the background over a 12 hour period, recorded over a few days. The latter, larger number associated with several work applications updating, the former a typical overnight period of syncing from an active, global Microsoft 365 environment. Figures are to be considered a guide only and were taken during the Android 14 beta. Organisation-based testing should be carried out.

This data use may be of concern for employees with data-limited internet plans at home who would normally turn off the work profile when leaving the office, as they may see work-based internet use increase. While this is somewhat less of a common concern in Western Europe, I can't speak for ISPs and data plans across the world, so feel it pertinent that it's highlighted.

Because apps are suspended, there are no privacy concerns to consider; for example location will not be polled by work profile applications while the profile is paused, although OS messaging in 14 (or lack thereof in the beta) may suggest otherwise. This may be pertinent to reiterate to users who notice background usage of paused work profiles.

## Is it still possible to fully turn off a work profile in Android 14? 

No.

## Is it possible to test the changes?

Yes, on an Android 14 device you may test the new behaviour directly. This has been available in several betas.

## Read more

View [What's new in Android 14 for enterprise](/blog/2023/04/android-enterprise-in-android-14/) for details of this and other changes in Android 14.
