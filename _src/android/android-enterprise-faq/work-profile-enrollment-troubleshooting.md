---
title: "Why is work profile enrolment failing?"
published: '2026-03-28'
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
  order: 68000
---
Work profile enrolment can fail for several common reasons. Here are the most frequent causes and how to address them:

**Insufficient storage**

The work profile requires a minimal amount of free storage to create. If the device is low on storage, the work profile creation will fail silently or with a generic error. Free up space before attempting enrolment again.

**Outdated management application**

Most EMMs require a current version of their management application (such as the Microsoft Company Portal, or the relevant EMM agent) to complete enrolment. If the management app is outdated, update it from Google Play before retrying.

**Existing work profile already present**

A device can only have one work profile at a time. If a previous enrolment attempt partially completed, a partially-configured work profile may exist. Navigate to **Settings > Accounts** (or **Settings > General management > Work profile**) and remove the existing work profile before re-enrolling. See [how to remove a work profile](/android/android-enterprise-faq/enrolment-failed-delete-wp/) for more guidance.

**Google Play Services issues**

Ensure Google Play Services is up to date. An outdated or corrupted Play Services installation can prevent the work profile from being provisioned. Clear the cache and data for Google Play Services, then update it.

**Device not supported**

Some older or uncertified devices may not support the work profile. Ensure the device is [GMS certified](/android/android-enterprise-faq/view-all-certified-devices/) and running a supported version of Android.

**Network connectivity**

The device needs a stable internet connection throughout enrolment. The process involves downloading the management app into the work profile, syncing policies, and installing assigned applications. Intermittent connectivity can cause failures at any stage.

**Account restrictions**

If the organisation uses a managed Google domain, ensure the user's Google account is not restricted from enroling. Check for domain-level restrictions in the Google Admin console that may prevent work profile creation.

If none of these resolve the issue, check the EMM admin console for device-specific enrolment logs and error codes.
