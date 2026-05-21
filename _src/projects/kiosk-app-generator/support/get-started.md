---
title: KIOSK APP GENERATOR quick start
parent: KIOSK APP GENERATOR support
published: '2026-05-21'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags:
    - 'Kiosk App Generator'
    - 'bayton-projects'
categories:
    - Kiosk App Generator Setup
layout: base.njk
eleventyNavigation:
    order: 0
    title: Quick start
---

This page walks through generating a deployable kiosk launcher in under five minutes.

## Before you start

You need:

- A short list of the apps you want to expose, with their package names (e.g. `com.android.chrome`, `com.example.myapp`). Apps are not bundled into the launcher; the launcher links to them by package name, so they must be installed separately on the target devices (typically by your EMM).
- An EMM that can push APK / AAB artefacts to managed devices. Android Management API, a Custom DPC, or any third-party MDM that supports managed Google Play uploads will all work.

You do **not** need an Android development environment. KAG produces the signed artefact in the browser.

## Build a launcher

1. Open [gen.bayton.org/kiosk](https://gen.bayton.org/kiosk/).
2. Set the application name, theme colour and (optionally) an icon.
3. Configure the grid (columns, rows, tile size) and add your apps by package name.
4. Pick a signing mode:
   - **Bayton signed** for the fastest path. Suitable for any EMM, including Managed Google Play.
   - **Release signed** if you want to ship under your own certificate. Upload a JKS or PKCS12 keystore; credentials are purged after the build.
   - **Debug** for sideload testing only.
5. Pick an output format - APK for direct EMM push, AAB for Managed Google Play upload.
6. Submit. Builds typically complete in 30 to 90 seconds.

## After the build

The response page contains:

- A download link for the signed APK or AAB. Links expire 5 minutes after first click and build files are purged at that point.
- A download link for the source archive (post-substitution Kotlin / XML / Gradle) so you can audit or rebuild locally.
- A download link for the exported `kiosk_config.json` containing the full configuration you submitted, useful for re-importing into a future build.
- A one-time **update code**. **Save this.** It is the only way to rebuild this launcher under the same Android package name later. The server stores only a SHA-256 hash; the raw code cannot be recovered.

## Deploy

Push the APK or AAB through your EMM as you would any other app. KAG's launcher needs to be set as the home activity on the target devices; consult your EMM's policy documentation for the exact field name (typically `kioskApps` or `preferentialNetworkService` style policy entries).
