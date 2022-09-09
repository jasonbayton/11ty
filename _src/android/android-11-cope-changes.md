---
title: 'Android 11 COPE changes'
published: '2020-03-07T22:58:36+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Diving deeper
layout: base.njk
eleventyNavigation:
  key: 'Android 11 COPE changes'
  order: 7000
discourse_permalink:
    - 'https://discuss.bayton.org/t/android-11-cope-changes/355'
---
In Android 11, the way COPE, the means of providing personal use on a corporate phone, has changed.

## What’s changed

Prior to Android 11, COPE is implemented by leveraging work profiles on fully managed devices (WPoFMD). This is to say the device is provisioned as a fully managed device, in which all fully managed policies and the associated device-wide visibility applies, and then a work profile is inflated on top. Work apps and data are pushed to the work profile, leaving the parent profile for personal use.

Following successful enrolment the device remains fully under control of the organisation, with limitations to policies and visibility only depending on how the EMM has integrated the WPoFMD solution set.

This means the organisation can typically fully control the device, including account types, app installation, network settings and more. Furthermore, the organisation may have visibility of installed applications, network logs and other device statistics that identify personal usage.

From Android 11, COPE is instead leveraged by enhancing the current work profile deployment scenario.

Often associated with BYOD deployments due to it’s lack of parent profile (device) policies and visibility, the enhanced work profile experience, officially named work profiles on company owned devices, or WPoCOD, will offer additional policies which can be leveraged in the parent profile to offer more control, but at the cost of corporate visibility.

## How is COPE differentiated from BYOD when provisioning?

In Android 10, Google introduced a new provisioning process for deploying work profiles on corporate owned devices. Through a supported DPC (EMM agent) it is possible to provision either fully managed, or work profile only when doing so via zero-touch or QR code. NFC and DPC identifier have not yet had support introduced.

If work profile provisioning is enabled, provisioning completes with a work profile on a device which is not fully managed, with prompts for the end user to complete aspects of the wizard that were not completed during provisioning to personalise the device.

In Android 11 this process is further expanded to not only provision a device with a work profile, but as it’s done so through corporate provisioning methods (ZT, QR) the device is flagged as corporate owned. In setting this flag, which again is automated with a supported EMM vendor and the relevant configuration in place, the work profile is enhanced with a number of additional device-wide policies which can be leveraged.

If a device is not provisioned through zero-touch or QR, this process is not undertaken and the device will be provisioned fully managed. Likewise if the EMM vendor does not support this provisioning flow introduced with Android 10, organisations will only have the option to provision fully managed from within the EMM.

## Has the UX change for end users?

No.

While it’s expected typical wording changes during the provisioning process are implemented in 11, the actual flow of setting up a COPE device, be that WPoFMD of WPoCOD, is practically the same for end users.

The device will undergo zero-touch or QR provisioning like a typical WPoFMD deployment, and will be provided messaging consistent with what’s seen in Android 10 and below, *setting up your device, setting up the work profile*. It is primarily a back-end change.

## Has the UX change for admins?

Yes.

Expect far less visibility from COPE devices, as they’re no longer fully managed, but essentially expanded work profile devices. App installation reports, app lists, some device details, usage statistics and more will no longer be possible to collect as Google deem this type of data to be personal and not to be reported to the organisation.

Expect fewer device controls also. Anything that could potentially be deemed as an invasion of privacy will no longer be supported, details of which will become more readily available as Google edges closer to the Android 11 release.

Furthermore, while WPoFMD deployments supported the installation of apps onto the parent profile through the EMM (APK deployment), this will no longer be possible in 11, as it adopts the same limitation as a typical work profile deployment.

A number of policies are no longer possible to apply to the parent profile, including:

- APN
- Persistent preferred activities (default apps for different things)
- Parent profile app management (install, uninstall, managed configs, report, etc)
- Device wide VPN
- Certificate management
- Password reset
- Network logging
- Factory reset control

Your EMM provider will have a full overview of what policies can be applied in 11 to what deployment type.

## What will happen to existing WPoFMD deployments?

Following an upgrade to Android 11, the device can either migrate to the new enhanced work profile to retain a COPE use case, at which point any policies applied that are no longer supported will cease to apply to the device, or optionally the device can become fully managed only, migrating effectively from COPE to COBO.

Organisations can choose which path to take.

Any existing parent profile applications may become unmanaged, migrate to the work profile or be removed, depending on the EMM implementation should the device migrate to COPE in 11, obviously this will not happen if the device migrates to fully managed (COBO)

## Is it be possible at all to inflate a work profile on a fully managed device in Android 11?

No.

In Android 11 this will throw and exception and fail. It is imperative therefore that EMM vendors update their solutions to prevent the inflation of a work profile on a fully managed device for Android 11 and above, while allowing it still to be utilised with Android 10 and lower. If an EMM has failed to undertake this prep it’s likely organisations will see partially or fully failed COPE deployments.

There may be instances where OEMs opt to maintain support for inflating a work profile on a fully managed device through their own platform modifications, and it appears Samsung is one of the first OEMs to attempt to support this, which can be read in more detail [on Samsung's website](https://docs.samsungknox.com/admin/knox-platform-for-enterprise/separated-apps.htm).

## We use WPoFMD as a dual corporate container solution, not COPE, what are our options?

If your organisation leverages Samsung, it would be worth taking a look at Knox Configure. For OEMs leveraging closer to vanilla Android implementations, this usecase will be very difficult to replicate from Android 11.

## Is it possible to delay/skip Android 11 upgrades?

Yes.

Utilising Android Enterprise system update management, the deployment of a system update can be delayed by up to 90 days. If your OEM offers additional release management tools, these could be leveraged also to maintain a specific version of the Android OS (such as E-FOTA).

At an absolute push, network restricions can be put in place to block connectivity to the OEM download server, be that OEM-specific, like E-FOTA, or more generic, like Google's GOTA service leveraged by many Android OEMs today.

Note however this is not a permanent solution, and it will be necessary to broach this change at some point.

## Can we just use a fully managed device for COPE?

As a fully managed device without the work profile is a single-profile deployment, allowing personal applications to sit alongside corporate applications poses security and DLP concerns.

It is difficult, though not impossible, to adequately monitor devices to ensure an end user hasn’t installed a personal dropbox-type application alongside corporate Google Drive or OneDrive, and is not possible, unless prevented via app policies, to prevent the movement of corporate data from work to personal applications as it would be between profiles in a WPoFMD deployment.

If an organisation has little to no concern with regards to the above, then absolutely; simply enable Google accounts via policy and your end-users will be able to add their own accounts to gain full access to the Play Store; app black/whitelists, as well as compliance policies, can still apply to prevent the usage of prohibited applications.

## Is it possible to test the changes?

- Flash a device with 11 and try WPoFMD enrolments to discern the changes from enrolling with Android 10.
- Perform a fastboot update without wiping user data (no -w flag) on an enrolled Android 10 device to understand the migration process.