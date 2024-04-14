---
title: 'Android 13 adds notifications access as a runtime permission'
published: '2022-08-11'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - App management
eleventyNavigation:
  order: 8000
layout: base.njk
---
In Android 13, Google introduces a new runtime permission for app notifications. 

## What’s changing

Prior to Android 13, app notifications are not individually managed. Users can opt to disable notifications per-app as desired, but from a management perspective, the options are limited to globally reducing notification visibility with changes to the notification bar config, or leaving users to handle this themselves.

## Will this have any impact on EMM-deployed app notifications?

No, apps deployed via EMM can instead now leverage the permission system to retrospectively grant the notifications permission on deployed devices rather than requiring user intervention. For newly enrolled devices, the permission can be pre-granted at enrolment to remove any user interaction at all. The end result should be _less_ ambiguity over app notifications than is currently in place with Android 12 and lower.

## Do my enterprise apps have to target API level 33 (13)?

No. It's certainly better to ensure apps are targeting the latest API level where possible, but not targeting Android 13 straight away won't have any meaningful impact on your ability to approve the notification runtime permission for enterprise apps.

## Is it possible to test the changes?

Yes, if you have an Android 13 or later device available you may test the new runtime permission. EMM uptake on granular permission settings may be slower, but the catch-all per-app or global runtime permission policy will also include the notifications permission by default. 

For more details of the new API, please read [Notification runtime permission | Android Developers](https://developer.android.com/about/versions/13/changes/notification-permission).
