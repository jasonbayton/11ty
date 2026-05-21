---
title: WEB APP GENERATOR quick start
parent: WEB APP GENERATOR support
published: '2026-05-21'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags:
    - 'Web App Generator'
    - 'bayton-projects'
categories:
    - Web App Generator Setup
layout: base.njk
eleventyNavigation:
    order: 0
    title: Quick start
---

This page walks through wrapping a URL in a deployable Android APK in under five minutes.

## Before you start

You need:

- The URL you want to wrap. HTTP and HTTPS are both accepted; HTTPS is strongly preferred and is the default behaviour.
- An EMM that can push APK / AAB artefacts to managed devices. Android Management API, a Custom DPC, or any third-party MDM that supports managed Google Play uploads will all work. (For personal sideload testing on your own device, no EMM is needed - install with `adb install` or by tapping the downloaded APK.)

You do **not** need an Android development environment. WAG produces the signed artefact in the browser.

## Build a wrapper

1. Open [gen.bayton.org/webapp](https://gen.bayton.org/webapp/).
2. Enter the **target URL** and a friendly **application name**. The application name is what users see in the Android app list.
3. Pick a **display mode**:
   - **Standalone** for the typical native-app feel (system bars visible, no URL chrome).
   - **Minimal UI** to keep a small toolbar with the URL and a refresh button.
   - **Full screen** for kiosks and digital signage. Pair with **Keep screen on** to prevent dimming.
4. Toggle the permissions your site needs. Defaults: **JavaScript** and **cookies** on (almost every web app needs them); **camera**, **microphone**, **geolocation** off (declared only when you opt in, so the manifest is minimal). File downloads work out of the box and are not a toggle: any download triggered by the wrapped site surfaces the standard Android download notification via `DownloadManager`.
5. Pick a **signing mode**:
   - **Bayton signed** for the fastest path. Suitable for any EMM.
   - **Release signed** to ship under your own certificate. Upload a JKS or PKCS12 keystore; credentials are purged after the build.
   - **Debug** for sideload testing only.
6. Pick an **output format** - APK for direct EMM push, AAB for Managed Google Play upload.
7. Submit. Builds typically complete in 30 to 60 seconds.

## After the build

The response page contains:

- A download link for the signed APK or AAB. Links expire 5 minutes after first click and build files are purged at that point.
- A download link for the source archive (post-substitution Kotlin / XML / Gradle) for audit and local rebuild.
- A one-time **update code**. **Save this.** It is the only way to rebuild this wrapper under the same Android package name later. The server stores only a SHA-256 hash; the raw code cannot be recovered.

## Deploy

Push the APK or AAB through your EMM as you would any other app. No special policy entries are required - WAG produces a normal Android app that opens to your URL.

For kiosk-style deployment (single-app pinning to the WAG wrapper), point your EMM's lock-task / kiosk policy at the WAG-generated package name.
