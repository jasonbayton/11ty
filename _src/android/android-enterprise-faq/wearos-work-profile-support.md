---
title: "Does Android Enterprise support Wear OS?"
published: '2026-03-30'
status: publish
author: 'Jason Bayton'
excerpt: 'Work profile account transfer to Wear OS landed in July 2026 via Google Play Services v26.26.'
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
  - https://support.google.com/product-documentation/answer/14343500
  - https://www.androidenterprise.community/discussions/conversations/android-enterprise-work-profile-does-not-support-wearos-yet/4848
---
Wear OS gained initial work profile support in July 2026. Google Play Services v26.26 introduced the ability to transfer a work profile account from an Android phone to a paired Wear OS watch.

### What now works

**Work profile account transfer** - you can transfer your work profile account to a paired Wear OS watch. This enables work apps on the watch to authenticate with the managed account, giving access to work email, calendar, and contacts on the wrist without needing to sign in with credentials directly on the watch.

**Notifications** - work profile notifications bridge to the watch by default. The Wear OS companion app (Pixel Watch, Galaxy Wearable, etc.) uses `NotificationListenerService` to mirror phone notifications to the watch, and as a system app it can read cross-profile notifications. This works the same way as Android Auto's work profile notification support.

However, an organisation's MDM policy can restrict this using `setPermittedCrossProfileNotificationListeners`, and some EMMs block cross-profile notification listeners by default. If work notifications are not appearing on the watch, check with your IT team whether the watch companion app has been allowlisted.

### What to be aware of

The work profile account transfer is a Google Play Services feature, not a platform-level management framework. This means:

- **No managed profile on the watch** - the watch does not have its own work profile partition. Work data protection on the watch relies on the account-level controls rather than profile-level isolation
- **No EMM policy enforcement on the watch** - your EMM cannot push policies, restrictions, or app configurations directly to the Wear OS device. The watch is not an independently managed endpoint
- **App availability varies** - not all work apps have Wear OS counterparts. Transfer of the account does not guarantee all work apps will appear or function on the watch
- **EMM rollout timing** - this is a Google Play Services change. Whether and how your EMM surfaces this capability in its console will depend on the vendor

### What doesn't work

- **Direct device management** - there is no Wear OS equivalent of Android Device Policy or a DPC. The watch cannot be enrolled as a managed device
- **App deployment** - you cannot push apps to the watch through managed Google Play in the same way as a phone
- **Compliance enforcement** - EMM compliance policies do not extend to the watch

### Should I allow it?

Organisations with strict data protection requirements should evaluate whether work account access on a wearable meets their security posture. The account transfer gives the watch access to work data through account-authenticated apps, and the watch cannot be independently wiped or locked by the EMM if it is lost.

For organisations comfortable with the trade-off, the feature removes a long-standing gap that previously forced users into workarounds such as adding their work account to the personal profile to get any watch integration at all.
