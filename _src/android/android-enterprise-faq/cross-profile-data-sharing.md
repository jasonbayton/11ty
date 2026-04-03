---
title: "How does cross-profile data sharing work in a work profile?"
published: '2026-03-29'
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
  order: 71000
sources:
  - https://developer.android.com/work/managed-profiles
  - https://developer.android.com/work/contacts
  - https://developers.google.com/android/management/reference/rest/v1/enterprises.policies#CrossProfilePolicies
---
By default, the work profile is isolated from the personal profile. Applications, data, and accounts in one profile cannot access those in the other. This is the foundational privacy and security guarantee of the work profile model.

However, administrators can selectively relax this boundary using cross-profile policies. The level of control depends on whether the device is personally-owned (BYOD) or company-owned (COPE).

**What can be configured**

- **Copy and paste** - administrators can allow or block clipboard sharing between profiles. By default on personally-owned devices, copy from work to personal is blocked, but personal to work is permitted
- **Intent sharing** - controls whether personal apps can resolve intents (share targets, links) from work apps, and vice versa. For example, opening a link from a work email in a personal browser
- **Connected apps** - specific apps can be enabled for cross-profile data sharing with themselves. For example, allowing the personal and work instances of Google Calendar to display events from both profiles in a single view. This requires administrator approval and the app must support it
- **Contact searching** - work contacts can be made visible to the personal profile for caller ID and search, so incoming calls from work contacts display correctly on the personal side
- **Work profile widgets** - apps from the work profile can be allowed to place widgets on the personal home screen. Disabled by default

**BYOD vs COPE differences**

On personally-owned work profiles, the default cross-profile restrictions are more permissive toward the user - for example, sharing from personal to work is allowed by default. On company-owned (COPE) devices, administrators have broader control and can lock down both directions.

**Best practices**

- Enable contact searching for usability - users expect caller ID to work regardless of profile
- Be cautious with connected apps, as they bridge the data boundary. Ensure any connected app is approved for handling corporate data
- Document the configured cross-profile policies for end users so they understand what is and is not shared

For more on work profile architecture, see [What is an Android work profile?](/android/what-is-android-work-profile/).
