---
title: "Can I purchase paid apps through managed Google Play?"
published: '2026-04-04'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - FAQ
categories:
    - App management
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 67500
sources:
  - https://www.androidenterprise.community/android-enterprise-general-discussions-3/paid-apps-in-managed-google-play-store-1412
  - https://developers.google.com/android/work/deprecations
  - https://support.google.com/googleplay/work/answer/6150398
---

No. There is no supported way to purchase paid apps through managed Google Play today.

### What about the Bulk Purchase Program (BPP)?

Google previously offered the Bulk Purchase Program - Android's equivalent to Apple's VPP - which allowed organisations to buy paid app licences in bulk and distribute them through managed Google Play. BPP was only available in the United States and Canada, and has since been deprecated. Organisations that already hold purchased licences can continue to manage and assign them, but no new purchases can be made.

### Why can't work accounts just buy apps directly?

For managed Google Play Accounts enterprises - where user accounts are created and managed entirely by the EMM - there is no associated payment method, so purchases aren't possible at all.

For managed Google domain setups with user authentication (Google Workspace, Cloud Identity), users have full Google accounts and *can* add a personal or company payment method. In this scenario, individual users can purchase paid apps directly and expense them through normal organisational channels, bypassing the need for bulk licensing entirely.

Licenses are non-transferrable across Google accounts though, so this is a one-and-done license purchase if permitted.

### What are the alternatives?

1. **Volume licensing through the app developer** - contact the developer directly to arrange enterprise licensing. A common pattern is for the developer to publish a free version of the app that activates with a licence key pushed via managed configurations
2. **Private app distribution** - if the app is developed in-house or by a contracted vendor, distribute it as a private app through managed Google Play or via [direct APK installation through AMAPI](/android/android-enterprise-faq/amapi-direct-apk-installation/)
3. **Free alternatives** - evaluate whether a free or freemium alternative exists that meets the same business requirement

This limitation applies specifically to managed Google Play. On unmanaged personal devices, users can still purchase apps through the standard Google Play Store using their personal Google account.
