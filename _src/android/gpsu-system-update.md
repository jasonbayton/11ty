---
title: 'Google Play System Updates (mainline) are no longer managed by Android Enterprise system update policies'
published: '2023-06-23'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - Fully managed
eleventyNavigation:
  order: 8000
layout: base.njk
---
As of late March 2024, system update policies no longer apply to Google Play system (mainline) updates. This has been confirmed through two documents:

**[AMAPI Policies](https://developers.google.com/android/management/reference/rest/v1/enterprises.policies#systemupdate) REST resource**

> Configuration for managing system updates
>
> **Note:** This doesn't apply to Google Play system updates (Project Mainline).

**[Manage System Updates](https://developer.android.com/work/dpc/system-updates)**

![system update screenshot](https://cdn.bayton.org/uploads/2024/system-update-screen.png)

## What is Project Mainline?

This is covered in [Considerations for Choosing Android in the Enterprise](https://bayton.org/android/considerations-for-choosing-android-in-the-enterprise/), but to quote the article:

> ### Project mainline (Google Play System Updates)
>
> Since Android 10, Google has been migrating core Android OS components into independently updatable mainline modules. These take aspects of the OS that have previously only been updatable through an OEM-distributed OTA update (as and when that OEM felt like doing one) and allow them to be updated additionally through Google Play, mostly in the background like many other applications.
>
> In Android 10 the number of modules sat at 12, while in Android 13 this has grown to 30 modules, including connectivity, multimedia, and core framework components. 
>
> In addition to monthly security updates (SPLs, security patch levels, delivered as SMRs, security maintenance releases), Google Play System Updates can be distributed as and when required to tackle component-level security issues or bug fixes. This dramatically improves time to resolution for issues in comparison to other OS platforms.

In more recent releases, Google has also used mainline to backport features, like the photo picker introduced with Android 13 that found its way into Android 12 through a Google Play system update in 2022.

From an enterprise perspective, mainline has been used to patch critical issues in WebView (the renderer for managed Google Play iFrame WebApps, or any call for an integrated browser within enterprise apps without opening Chrome or similar), networking components and more. It's a powerful system that grows year-on-year with more updatable modules. 

## Why is this changing?

Mainline updates have for a long time been something of an ugly-duckling to the wider and earlier-established system and app update systems in place for Android, and haven't integrated seamlessly into the existing system update policies and constraints admins are able to set. Such examples of friction have included - 

- When set to Automatic as the system update policy, mainline updates would trigger additional unscheduled reboots without adequate notice.
- When set to Windowed, mainline updates would download within the window, but could still trigger a reboot outside of the window if the time taken to download exceeds what the window allows.

Because mainline updates _require_ a reboot to apply, having them triggering based on the cues of the system update policies has been known to cause frustration.

Google, balancing the feedback from admins finding the frequent unscheduled reboots to hamper productivity and cause data loss, vs those who want to manage this third category of updates with utmost granularity, have opted to quell the larger reboot concern for the time being by excluding them from update policies.

## How will this now change?

Without being tied into system update policies, mainline updates will now behave akin to an unmanaged device. Updates will automatically download in the background, and will apply on the next scheduled reboot. 

Naturally organisations want _some_ control over postponing updates on devices, and this may sound concerning. It is not however permanent; it is a temporary measure until such time Google implement either a fix in how mainline updates integrate with system update policies, or introduce mainline-specific APIs to handle these separately. 

## What actions can be taken?

Organisations can monitor the GPSU/mainline version installed on devices, and keep tabs on Google Play system update release notes via [Google System release notes](https://support.google.com/product-documentation/answer/14343500). 

The February release note buried amongst all related Google app updates is as follows:

> Google Play system update (2024-02-28)  
> [Phone] Updates to system management services that improve device connectivity, network usage, security, stability and updatability.  
> [Phone] Bug fixes for System Management and Diagnostics-related services.

If so inclined, reboots out-of-hours could be scheduled with compatible EMMs through the respective device command, however with Automatic or Windowed updates applied for system updates, these reboots will happen on a semi-regular cadence either way.

## In summary 

For the foreseeable future, mainline updates will be excluded from system update policies.

- EMM vendors should make this known within their product documentation / support interactions
- Admins attempting to create update policies for mainline updates should refrain for the time being

🛟 For help or advice on this topic or anything else Android Enterprise, feel free to [get in touch](/support/).