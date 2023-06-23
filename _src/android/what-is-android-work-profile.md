---
title: "What is Android's work profile?"
published: '2017-10-27T00:15:27+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Work profile
eleventyNavigation:
  order: 1500
layout: base.njk
---
Android's work profile was introduced in Android 5.0 Lollipop to address the challenge of managing and securing corporate data on personal devices. In Android 10 this was expanded to the COPE use case, allowing an organisation to inflate a work profile on a fully managed device, while keeping complete control over said device. Finally in Android 11, [Google adjusted the COPE use case to mirror that of BYOD, with a modicum of additional device management](/blog/2020/02/android-enterprise-in-11-google-reduces-visibility-and-control-with-cope-to-bolster-privacy/) to aid balance between control and privacy. 

So.. what is work profile?

## Overview

The Android Work Profile creates an isolated and separately encrypted user profile on devices within which an organisation has complete control over apps and data. This profile is completely separate from the parent, or personal profile, meaning work and personal data are never combined save for select cross-profile functionality that offers improved data visibility and user convenience; an example of this is searching work contacts from the personal dialler, APIs for which are of course organisation-managed. When users interact with their work profile, they are doing so with applications and data an organisation manages.

Applications in a work profile are marked with a (normally) blue badge, and usually separately listed in the Android launcher either in a folder (older Android versions) or a separate launcher tab (newer Android versions). It's very possible to see the same application both in the parent and work profile, so the badge is the only differentiation between a personal and work version of the application. Like having the same application installed on other _users_ on an Android device, even though the same app is present, where the app data is _stored_ and how it is _encrypted_ is distinctly different.

## Benefits

The work profile offers some key benefits as a deployment scenario for both users and organisations. 

For users, it allows them to use their personal devices for work-related activities, or a corporate device for personal activities, without having to worry about their personal data being accessed by their employer. It also allows them to easily switch the work profile on or off with the tap, making it more convenient to separate their personal and work lives.

For organisations, the work profile offers the ability to secure work-related data and applications on personal (or personally enabled) devices without having to manage an entire separate device or require users to use company-provided devices. This can save money and increase productivity for both organisations and users without giving up security or convenience. As an added benefit, organisations are able to enforce basic security over the entire device in both BYOD and COPE, such as mandating a particular password policy or preventing the installation of [unknown applications](/android/why-you-shouldnt-install-apps-from-unknown-sources/) on the parent profile.

## Differences between Personally Owned Devices and Company-Owned Devices

For the user, the work profile whether used on a personally or company owned device is reasonably consistent in UX and design. But there are some differences. 

On company-owned work profile deployments, the organisation has some additional control over the entire device to further define what can and cannot be installed or permitted across both profiles. These can be found [here](https://developers.google.com/android/management/policies/work-profile#company-owned_devices) and include:

- Camera control 
- Screenshot control
- Factory reset and FRP policies
- Blocklisting of certain apps or app-types

