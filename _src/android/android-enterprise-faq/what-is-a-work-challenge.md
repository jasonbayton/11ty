---
title: "What is a work challenge?"
published: '2019-04-26'
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
  key: "What is a work challenge?"
  order: 20000
--- 
When a device is deployed as a company owned work profile (COPE) or personally owned work profile (BYOD) device, a secondary profile is created on the device known as a work profile. This is where all corporate apps and data reside on the device, and is fully isolated and separately encrypted on the device. 

Unless explicitly set, the work profile doesn't have any additional authentication required, allowing an end-user to open work applications on the device as desired.

A work challenge is what Google call the password applied to the work profile that shares most of the same policies associated with a device password policy. It can be applied in the following ways:
- For devices with no device password set, as the only password required on the device, and only prompted when work apps are opened.
- For devices with a password set, to share the device password between the device and the work profile (when unlocking the device, the work profile also unlocks).
- For devices with a password set, to require a unique password for the work profile, requiring additional authentication when work apps are opened.

Here's an example of a work challenge policy requiring a unique password on a device:

![Example work challenge policy](https://cdn.bayton.org/uploads/docs/android-enterprise-faq/what-is-a-work-challenge/Screenshot_2023-05-14_09.12.32.png)

Note the scope above is set to _Profile_ (as in, the work profile). This sets a work profile-specific password policy that has no impact on the parent policy directly. 

I say directly, because unless a policy is set mandating a separate work and personal password as pictured above, the end user is able to _adopt_ the work profile password as the device password also, through the device setting **Use one lock**. 

By mandating separate profile passwords, this avoids that.