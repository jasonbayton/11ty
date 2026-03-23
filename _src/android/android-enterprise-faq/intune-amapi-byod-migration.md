---
title: "What is the Intune AMAPI migration for personally-owned work profiles?"
published: '2026-03-23'
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
  order: 28500
---
Microsoft is migrating its Intune personally-owned work profile implementation from a custom Device Policy Controller (the Company Portal app) to Google's Android Management API (AMAPI). This change began rolling out in early 2026.

### What is changing?

- **The Company Portal app is being replaced** by the Microsoft Intune app as the primary user-facing application for personally-owned work profile devices
- **Web-based enrolment** is being introduced, allowing users to begin enrolment from a URL rather than manually installing an app first
- **Required apps cannot be uninstalled** by users under the new implementation, aligning with how corporate-owned devices already behave

### Why is Microsoft doing this?

AMAPI is Google's modern management API and receives new features and platform capabilities before custom DPC integrations. By moving to AMAPI, Intune gains:

- Faster access to new Android Enterprise features
- Consistent behaviour across all four management modes (fully managed, dedicated, COPE, and BYOD work profile)
- Reduced maintenance burden of a custom DPC

### What do administrators need to do?

Microsoft will automatically migrate remaining devices from the custom DPC implementation to AMAPI. Administrators should:

- Review their existing personally-owned work profile policies for compatibility
- Communicate the change to end users, as they will see the Microsoft Intune app replace Company Portal in their work profile
- Test the new enrolment flow in a pilot group before broad rollout

### Does this affect corporate-owned devices?

No. Intune's corporate-owned work profile (COPE), fully managed, and dedicated device management modes already use AMAPI. This migration only affects the personally-owned work profile scenario.

**Sources:**
- [Microsoft Community Hub: New policy implementation and web enrollment for Android personally owned work profile](https://techcommunity.microsoft.com/blog/intunecustomersuccess/new-policy-implementation-and-web-enrollment-for-android-personally-owned-work-p/4370417)
- [Microsoft Learn: Android Enterprise work profile overview](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/android-enterprise-overview)
