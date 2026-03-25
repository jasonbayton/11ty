---
title: 'What is the difference between FRP and Enterprise FRP?'
published: '2026-03-24'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - FAQ
categories:
    - Fully managed
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 25500
sources:
  - https://www.androidenterprise.community/discussions/conversations/factory-reset-protection-frp-or-enterprise-factory-reset-protection-efrp-/13241
  - https://www.androidenterprise.community/blog/resources/enhanced-factory-reset-protection-in-android-15/9493
  - https://bayton.org/android/feature-spotlight-factory-reset-protection/
  - https://developers.google.com/android/management/reference/rest/v1/enterprises.policies#FactoryResetProtectionPolicy
---

Factory Reset Protection (FRP) and Enterprise Factory Reset Protection (EFRP) serve similar anti-theft purposes but work differently.

## FRP (consumer)

Standard FRP is tied to the Google account signed into the device. If the device is factory reset (via recovery, not through Settings), the device will require the previously signed-in Google account credentials before it can be set up again. This is a consumer anti-theft feature present on all GMS-certified Android devices.

On fully managed devices, FRP typically activates - if enabled via policy - based on whichever Google account was present on the device - this could be the managed Google Play account provisioned by the EMM. If that account is deleted or no longer accessible (common after EMM unenrolment), recovering the device can be difficult.

## Enterprise FRP (EFRP)

Enterprise FRP is a policy-driven feature that allows administrators to specify one or more Google account email addresses that can unlock the device after a factory reset. This is configured through the EMM as part of the device policy.

Key differences:

- **EFRP is administrator-controlled** - the unlock accounts are set by policy, not tied to whichever account happened to be signed in
- **EFRP is optional** - administrators must actively configure it; it is not enabled by default on most EMM platforms

## Android 15 changes

From Android 15, FRP behaviour has changed significantly:

- OEM unlocking no longer bypasses FRP. Previously, enabling OEM unlock in developer options would skip FRP after a hard reset. This is no longer the case
- Enterprise FRP is always enforced after a hard reset on managed devices running Android 15+, regardless of OEM unlock status

This makes configuring EFRP more important than ever for organisations managing fully managed devices, as recovery from an unexpected reset without EFRP configured becomes considerably harder.

For more detail, see [Feature spotlight: Factory Reset Protection](/android/feature-spotlight-factory-reset-protection/).
