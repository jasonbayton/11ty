---
title: "What do Google Play's target API level requirements mean for enterprise?"
published: '2026-06-26'
status: publish
author: 'Jason Bayton'
excerpt: "How Google Play's annual target API level requirements apply to private, EMM-distributed, and public apps in an enterprise context."
type: documentation
tags:
    - FAQ
categories:
    - App management
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 65500
sources:
  - https://developer.android.com/google/play/requirements/target-sdk
  - https://support.google.com/googleplay/android-developer/answer/11926878
  - https://support.google.com/googleplay/android-developer/answer/16561298
---
Every year, Google raises the minimum target API level (targetSdkVersion) required for apps submitted to Google Play. From August 31, 2026, new apps and app updates must target Android 16 (API level 36) or higher. Existing apps that do not target at least Android 15 (API level 35) become invisible to new users on devices running newer Android versions.

This is a recurring annual requirement. Google aligns it with the latest stable Android release to ensure apps adopt current security, privacy, and performance improvements.

### Does this affect private enterprise apps?

**Permanently private apps are exempt.** If an app is uploaded to managed Google Play and restricted to your organisation only (not publicly listed), it does not need to meet the target API level requirement. Google explicitly excludes private distribution apps from this policy.

This means internal line-of-business apps, custom tooling, and other apps distributed exclusively through managed Google Play to your managed devices are unaffected by the annual deadline.

### Does this affect apps pushed via an EMM?

Apps installed directly by an EMM agent (sideloaded via the DPC) are not subject to Google Play's target API level policy, since they bypass Google Play entirely. The requirement only applies to apps distributed through the Play Store.

However, Android itself enforces a separate minimum install requirement: from Android 14, apps targeting API levels below 23 (Android 6.0) cannot be installed at all. This platform-level restriction applies regardless of how the app is distributed.

### What about public apps from third-party vendors?

Public apps used by your organisation - from established vendors or niche suppliers - must comply with the target API requirement to remain available on Google Play. If a vendor does not update their app in time:

- The app remains installed on devices that already have it
- New installations are blocked on devices running newer Android versions
- The app disappears from Play Store search results for new users on affected devices

Administrators should identify business-critical public apps and confirm with vendors that they are tracking the August 2026 deadline. Vendor apps that fall behind on target API compliance are also likely to be behind on security and compatibility updates, which is a broader risk signal.

### What if my app needs more time?

Google offers a one-time extension (typically around three months) that developers can request through the Play Console. This is a developer action, not an administrator action - if a vendor needs the extension, they must request it themselves.

### Summary

| Distribution method | Subject to target API requirement? |
|---|---|
| Public Google Play app | Yes |
| Private managed Google Play app (org-only) | No |
| EMM-sideloaded (DPC push) | No (Play policy). Platform minimum still applies |
