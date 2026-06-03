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

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">Head's up</div>

WEB APP GENERATOR runs entirely in the browser. There is nothing to install locally, no SDK to download, no Android development environment to set up. You'll need a URL to wrap and an EMM (or `adb`) to push the resulting artefact to a device.

</div>

## Prepare

Before you build, have the following to hand:

- The **URL** you want to wrap. HTTP and HTTPS are both accepted; HTTPS is strongly preferred and is the default behaviour. HTTP target URLs auto-enable cleartext traffic in the network security config for the target hostname only. IP-literal hosts and URLs with embedded credentials are rejected.
- A short, user-visible **application name**. This is what appears in the Android app list, in the splash screen and in your EMM dashboard.
- An optional **app icon** (PNG, any reasonable size; WAG rescales to standard launcher densities). The default app-gen Bayton mark is used if omitted.
- If you intend to release-sign, your **JKS or PKCS12 keystore** plus the alias and passwords. Credentials are held in memory for the build and discarded immediately after; nothing is persisted server-side.
- If you're rebuilding an existing wrapper, the **update code** from the original build. Without it, WAG will mint a new Android package name.

## Build the application

1. Open [gen.bayton.org/webapp](https://gen.bayton.org/webapp/).
2. If you have a previous `web_app_config.json`, import it first. The form will pre-populate with the original URL, display mode, permissions, signing choice, output format and update code. Icons and keystores are not embedded in the JSON, so upload those again if required.
3. Enter the URL, application name and (optionally) the icon and theme colour.
4. Pick the **display mode**: Standalone, Minimal UI or Full screen. See [supported configurations](/projects/web-app-generator/support/supported-configurations) for the trade-offs.
5. Toggle the runtime permissions and behaviours your site needs: camera, microphone, geolocation, external links, pull to refresh, keep screen on, screenshot blocking, JavaScript, cookies and user CA trust.
6. Pick the **signing mode**: Bayton-signed for the fastest path, Release-signed to use your own certificate, or Debug for sideload testing.
7. Pick the **output format**: APK for direct EMM push, AAB for upload to Managed Google Play.
8. Submit. The result panel will show whether the build is queued, building, complete or failed. If other builds are ahead of yours, it will show the queue position and an estimated wait.

## After the build

The result page contains:

- A **download link** for the signed APK or AAB. Links expire 5 minutes after first click; build artefacts are purged 24 hours after creation regardless.
- A **download link for the source archive**: the post-substitution Kotlin, XML and Gradle files for audit or local rebuild.
- A **download link for the exported `web_app_config.json`**. This captures the build settings and update code so a future rebuild can import the same wrapper configuration.
- A **one-time update code** for new builds. Save this. It's the only way to rebuild this wrapper under the same Android package name later. The server stores only a SHA-256 hash; the raw code cannot be recovered.
- The **builder version** that produced the artefact. Quote this with the job ID if raising a support request.

<div class="callout callout-orange">
<div class="callout-heading">Save the update code</div>

The update code is required to keep the same Android package name across rebuilds. Without it, the next build is treated as a new app and won't satisfy EMM silent-update flows or re-publish to the same Managed Google Play listing. Store it alongside the keystore credentials for whichever app it belongs to.

</div>

## Deploy

Push the APK or AAB through your EMM as you would any other app. There are no special policy entries to set: WEB APP GENERATOR produces a normal Android app that opens to your URL.

For kiosk-style deployment (single-app lock-task pinned to the wrapper), point your EMM's lock-task or kiosk policy at the WAG-generated package name. Use the Full screen display mode for the most immersive result, and pair with Keep screen on to prevent the device dimming.

## Rebuild or update

To update an existing wrapper, import the previous `web_app_config.json`, make the required change, and keep the update code in place. WAG will reuse the original package name so an EMM can replace the installed APK silently.

If you build without the update code, the new artefact is a separate Android app with a new package name. That's useful for variants, test environments or parallel pilots, but it won't update devices already running the earlier build.

## Audit or self-build

The source archive is a complete Android project after template substitution. It contains the WebView host code, generated resources, Gradle files and build metadata used by WAG, but not your keystore or signing passwords.

For a debug rebuild, unzip the source and run `./gradlew assembleDebug`. For a release rebuild, copy `signing.properties.template` to `signing.properties`, fill in your keystore details, then run `./gradlew assembleRelease` or `./gradlew bundleRelease`.
