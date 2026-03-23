---
title: "Does AMAPI support direct APK installation?"
published: '2026-03-21'
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
  order: 66000
sources:
  - https://bayton.org/blog/2025/08/amapi-apk-deployment/
  - https://developers.google.com/android/management/sdk-release-notes
---
Yes. As of 2025, the Android Management API supports direct APK installation to managed devices.

Historically, all application deployment through AMAPI required apps to be distributed via managed Google Play. This meant every app - including internal line-of-business apps - needed to be uploaded to managed Google Play as a private app before it could be deployed.

With direct APK support, EMMs built on AMAPI can now push APK files directly to devices. This is particularly useful for:

- Internal apps that don't need to go through managed Google Play
- Apps that can't be published to Play for compliance or technical reasons
- Testing and development workflows where the overhead of Play publishing is unnecessary
- Situations where managed Google Play is unavailable or restricted

This does not replace managed Google Play as the primary distribution mechanism. Managed Google Play remains the recommended approach for most app deployment, as it handles versioning, updates, and licensing automatically. Direct APK installation is an additional option for scenarios where Play distribution is impractical.

For details on how this works, see [AMAPI finally supports direct APK installation](/blog/2025/08/amapi-apk-deployment/).
