---
title: 'Google Play System Updates (mainline) are no longer managed by Android Enterprise system update policies'
published: '2024-04-17'
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
As of early April 2024, system update policies no longer apply to Google Play System (mainline) updates. This has been confirmed through an updated [help article](https://support.google.com/work/android/answer/13791272?hl=en#zippy=%2Cmanaging-system-updates-using-system-update-policies:~:text=Google%20Play%20System%20updates):

> Google Play System updates (also called Mainline updates) are automatically downloaded but require a device reboot to be installed. These updates will not trigger an automatic reboot and instead they are installed on the next user, admin, or policy initiated reboot. Reboots triggered by system update policy will install the associated Google/OEM system update and any previously downloaded Google Play System updates.

It was earlier shown in developer documentation, but shortly pulled after: 

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

From an enterprise perspective, mainline has been used to patch critical issues and [deploy substantial runtime improvements](https://android-developers.googleblog.com/2023/08/latest-artwork-on-hundreds-of-millions-of-devices.html), update networking components and more. It's a powerful system that grows year-on-year with more updatable modules. 

## Why is this changing?

Mainline updates have for a long time been something of an ugly-duckling to the wider and earlier-established system and app update systems in place for Android, and haven't integrated seamlessly into the existing system update policies and constraints admins are able to set. Such examples of friction have included - 

- When set to Automatic as the system update policy, mainline updates would trigger additional unscheduled reboots without adequate notice.
- When set to Windowed, mainline updates would download within the window, but could still trigger a reboot outside of the window if the time taken to download exceeds what the window allows.

Because mainline updates _require_ a reboot to apply, having them triggering based on the cues of system update policies has been known to cause frustration.

Google, balancing feedback from admins finding frequent unscheduled reboots hamper productivity and cause data loss, vs those who want to manage this third category of updates with utmost granularity, have opted to quell the larger reboot concern for the time being by excluding them from update policy processes.

## How will this now change?

Without being tied into system update policies, mainline updates will now behave akin to an unmanaged device. Updates will automatically download in the background, and will apply on the next scheduled reboot. This reboot may be user initiated, or by policy - including existing system update policies.

Naturally organisations want _some_ control over postponing updates on devices, and this may sound concerning. It is not however expected to be permanent; it is rather a temporary measure until such time Google implement either a fix in how mainline updates integrate with system update policies, or introduce mainline-specific APIs to handle these separately. 

## What risks now exist?

The obvious and considerable risk is the complete lack of control over mainline updates, which as of Android 14 comprise of _[37 updateable modules](https://www.androidpolice.com/project-mainline-android-14/)_. Without the ability to postpone these updates, they can come down as and when desired, introducing new functionality or changes without the opportunity for appropriate vetting.

Additionally, since these updates don't conform to any particular schedule organisations cannot accurately predict when mainline updates will land on devices. 

While the risks are generally low, updates can introduce problems. This is compounded in enterprise settings where devices and the applications that run atop aren't guaranteed to be modern or up to date. Some line of business apps still target SDK versions under 23, as we found out with the introduction of Android 14's [restrictions](/android/android-14-minimum-sdk/).

Obviously GPSU's haven't fully aligned with system updates in the past, so these problems aren't new to this change. Organisations simply have less control.

## What actions can be taken?

Organisations can monitor the GPSU/mainline version installed on devices, and keep tabs on Google Play system update release notes via [Google System release notes](https://support.google.com/product-documentation/answer/14343500). 

The March [release note](https://support.google.com/product-documentation/answer/14343500#zippy=%2Cmarch) buried amongst all related Google app updates is as follows:

> **Google Play system update (2024-04-01)**
> - [Phone] Updates to system management services that improve Device Connectivity, Network Usage, Security, Stability, and Updatability.
> - [Phone] Bug fixes for System Management & Diagnostics related services.

If so inclined, reboots out-of-hours could be scheduled with compatible EMMs through the respective device command, however with Automatic or Windowed updates applied for system updates, these reboots will happen on a semi-regular cadence either way.

## In summary 

For the foreseeable future, mainline updates will be excluded from system update policies.

- EMM vendors should make this known within their product documentation / support interactions.
- Admins attempting to create update policies for mainline updates should refrain for the time being.

🛟 For help or advice on this topic or anything else Android Enterprise, feel free to [get in touch](/support/).