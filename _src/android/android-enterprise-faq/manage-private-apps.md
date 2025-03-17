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

**Note**: Google Play will only permit one package name (`com.app.name`) for an application across the whole Google Play estate, meaning if you wish to upload an app privately today, and make it available publicly later, you **must use unique package names for each upload**.
