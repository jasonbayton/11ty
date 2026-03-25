---
title: "Can I turn off my work profile?"
published: '2026-03-25'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - FAQ
categories:
    - Work profile
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 19000
sources:
  - https://support.google.com/work/android/answer/7029561
  - https://bayton.org/android/android-14-work-profile-behaviour/
  - https://bayton.org/blog/2023/09/work-profile-reverted-in-14/
---
Yes. Users can turn off the work profile through the quick settings tile or device settings. When the work profile is turned off:

- Work apps are greyed out in the launcher and cannot be opened
- Work notifications stop
- Work apps are fully stopped and cannot run in the background
- The work profile user enters a shutdown state

When the profile is turned back on, apps restart and begin syncing. This can result in a flood of notifications arriving at once, particularly if the profile has been off for a while.

From Android 10, users can also schedule the work profile to turn off and on automatically through Digital Wellbeing. This allows setting a recurring schedule - for example, turning the work profile off at 6pm and back on at 8am on weekdays - to support work-life balance without needing to toggle it manually each time.

Administrators can limit how long a user may leave the work profile off through the `workProfileMaxDaysWithNoWork` policy in AMAPI (or the equivalent setting in the EMM console). If the profile remains off beyond this limit, the user is prompted to turn it back on. If they do not, the work profile data may be wiped depending on the compliance policy in place.
