---
title: "Does Android Enterprise support WearOS?"
published: '2026-03-30'
status: draft
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
  order: 29500
sources:
  - https://www.androidenterprise.community/discussions/conversations/android-enterprise-work-profile-does-not-support-wearos-yet/4848
---
WearOS does not currently support Android Enterprise work profiles or managed accounts. There is no work profile equivalent on WearOS, and no mechanism to add managed accounts, install work apps, or sync work profile data to the watch.

### What works

**Notifications** — work profile notifications bridge to the watch by default. The WearOS companion app (Pixel Watch, Galaxy Wearable, etc.) uses `NotificationListenerService` to mirror phone notifications to the watch, and as a system app it can read cross-profile notifications. This works the same way as Android Auto's work profile notification support.

However, an organisation's MDM policy can restrict this using `setPermittedCrossProfileNotificationListeners`, and some EMMs block cross-profile notification listeners by default. If work notifications are not appearing on the watch, check with your IT team whether the watch companion app has been allowlisted.

### What doesn't work

WearOS has no concept of a work profile, managed account, or enterprise management. This means:

- **Work accounts** cannot be added to the watch — there is no managed Google Play or work account provisioning on WearOS
- **Work apps** cannot be installed on the watch — apps like Outlook, Teams, or Gmail on the watch cannot access work profile data
- **Work calendar** does not sync to the watch — calendar sync requires account-level access, not just notification bridging
- **Work contacts** are not available natively on the watch for caller ID or search

### Are there workarounds?

Some users configure their corporate account directly in the personal profile (outside the work profile) to enable watch sync, but this bypasses management policies applied within the work profile and is not recommended for organisations with data protection requirements.

### Will this change?

Google has not announced WearOS support for work profiles. This is a known gap in the ecosystem and has been raised in the [Android Enterprise Customer Community](https://androidenterprise.community). Given the growing adoption of wearables in enterprise environments, it remains a commonly requested feature.
