---
title: 'Android 14 changes how the work profile is turned off'
published: '2023-07-25'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Work profile
eleventyNavigation:
  order: 8000
layout: base.njk
---
From Android 14, the way the work profile "turns off" changes.

## What’s changing
In Android 14, turning the work profile off no longer fully disables the profile. Instead, it is now "paused". Applications and notifications continue to be disabled and hidden respectfully, however the underlying profile user now relies on a solution that aligns with Focus Mode in Digital Wellbeing, suspending applications and notifications themselves, while permitting the work profile user to remain active and available in the background for what Google considers to be a better user experience.

## What does that mean?
With the work profile user still running in the background when the work profile is "paused" it allows for a few new features:
1. Caller ID remains available for work profile contacts, allowing users to see a work profile contact is calling while the profile is paused, rather than only seeing a number. 
2. Apps can continue receiving version updates while the profile is paused, allowing devices to remain compliant with application version policies an organisation may have. 
3. Notifications can continue polling while the profile is paused, allowing notifications to gather gradually periodically in the background to be immeediately available when the profile is unpaused. This is to prevent a notification flood as experienced in Android 13 and older when a profile is turned back on after some time.

## Will this have any impact on EMM-deployed devices?

Yes. Expect higher battery and data usage on work profile devices during periods where the profile is paused. The exact amount is likely OEM-dependent, but in my testing of data usage on a Pixel 7a, a paused work profile can use anything from 10mb to 200mb of data in the background over a 12 hour period. The latter, larger number associated with several work applications updating, the former a typical overnight period of syncing from an active Microsoft 365 environment. Figures are a guide only and organisation-based testing should be carried out.

The data use is of particular concern for employees with data-capped internet plans at home, as they may see work-based internet use increase.

## Is it still possible to fully turn off a work profile in Android 14? 

No.

## Is it possible to test the changes?

Yes, on an Android 14 device you may test the new behaviour directly. This has been available in several betas.

## Read more

View [What's new in Android 14 for enterprise](/blog/2023/04/android-enterprise-in-android-14/) for details of this and other changes in Android 14.
