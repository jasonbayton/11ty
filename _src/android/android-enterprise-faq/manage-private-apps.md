---
title: "What’s the recommended way of managing private (in-house) applications?"
published: '2019-04-26'
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
  order: 61000
--- 
For all EMMs that support it, the Google Play iFrame supports the simple, few-step process of uploading an APK for distribution to your Enterprise.

Unlike adding an APK directly into the UEM console, uploading to Google Play is safer, easier to manage and less likely to lead to issues compared with pushing APKs directly. Benefits include:

- Google's extensive Play infrastructure allows faster, lower-bandwidth installations
- Basic validation for feature support avoids repetitive installation failures for unsupported devices
- Smaller installation files (AAB)
- Delta updates, where supported (AAB)
- Native installation vs that of the DPC or a companion app

More information: [Create and manage private apps for Android Enterprise](/android/create-and-manage-private-apps-for-android-enterprise/)

Where the Play iFrame isn’t supported, it’s possible to upload and distribute through the [Google Play Console](https://play.google.com/apps/publish/) but keep in mind there’s a $25 fee to set up a developer account.

As of 2025, managed Google Play supports Android App Bundles (AAB) for private apps, offering smaller downloads and optimised delivery compared to APKs.

For organisations using AMAPI, direct APK installation is also now supported natively through the AMAPI SDK, providing an alternative for scenarios where Play distribution is not suitable - such as air-gapped environments or rapid iteration during development.

<div class="callout callout-orange">
<div class="callout-heading">Developer verification</div>

From September 2026, Google requires apps on certified Android devices in select regions to come from verified developers. This applies to privately distributed apps as well. Organisations should ensure their Google Play developer accounts are verified ahead of this deadline. See [Google Play developer verification](/blog/2025/08/google-play-developer-verification/) for details.

</div>

**Note**: Google Play will only permit one package name (`com.app.name`) for an application across the whole Google Play estate, meaning if you wish to upload an app privately today, and make it available publicly later, you **must use unique package names for each upload**.
