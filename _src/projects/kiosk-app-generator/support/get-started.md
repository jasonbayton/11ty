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

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">Head's up</div>

KIOSK APP GENERATOR runs entirely in the browser. There is nothing to install locally and no Android development environment to set up. You'll need a list of the apps you want to expose (by package name), and an EMM (or `adb`) to push the resulting launcher artefact to a device.

</div>

## Prepare

Before you build, have the following to hand:

- The **list of apps** you want to expose, identified by their Android package name (e.g. `com.android.chrome`, `com.example.myapp`). Apps are not bundled into the launcher; they're linked by package name, so they must be installed separately on the target devices, typically by your EMM. `adb shell pm list packages` on a connected device shows you what's installed.
- A short, user-visible **application name** for the launcher itself (this appears in the Android app list, not on the launcher surface).
- An optional **app icon** and **wallpaper**. Both are optional; defaults ship in the artefact.
- If you intend to release-sign, your **JKS or PKCS12 keystore** plus the alias and passwords. Credentials are held in memory for the build and discarded immediately after; nothing is persisted server-side.

## Build the application

1. Open [gen.bayton.org/kiosk](https://gen.bayton.org/kiosk/).
2. Set the application name, theme colour and (optionally) icon.
3. Configure the **layout**: orientation, rows and columns, icon size. The grid is capped at 20x20.
4. Add **apps**: paste the package name of each app you want to tile. Drag tiles to position them on the grid. Optionally group apps into folders.
5. Pick the **wallpaper** source: upload an image, supply a URL for runtime fetch, or leave blank to ship the default.
6. Configure **settings access**: choose which Android Settings intents end users can reach from inside the launcher, or delegate to [MANAGED SETTINGS](/projects/managed-settings/) if installed. See [supported configurations](supported-configurations) for the full list.
7. Pick the **signing mode**: Bayton-signed for the fastest path, Release-signed to use your own certificate, or Debug for sideload testing.
8. Pick the **output format**: APK for direct EMM push, AAB for upload to Managed Google Play.
9. Submit. Typical build time is 30 to 90 seconds.

## After the build

The result page contains:

- A **download link** for the signed APK or AAB. Links expire 5 minutes after first click; build artefacts are purged 24 hours after creation regardless.
- A **download link for the source archive**: the post-substitution Kotlin, XML and Gradle files for audit or local rebuild.
- A **download link for the exported `kiosk_config.json`**. This is the full configuration that produced the build; paste it back into the form's Import config field to pre-populate every setting for a future rebuild.
- A **one-time update code**. Save this. It's the only way to rebuild this launcher under the same Android package name later. The server stores only a SHA-256 hash; the raw code cannot be recovered.

<div class="callout callout-orange">
<div class="callout-heading">Save the update code</div>

The update code is required to keep the same Android package name across rebuilds. Without it, the next build is treated as a new app and won't satisfy EMM silent-update flows or re-publish to the same Managed Google Play listing. Store it alongside the keystore credentials for whichever app it belongs to.

</div>

## Deploy

Push the APK or AAB through your EMM as you would any other app. To take over as the home screen, your EMM's kiosk or lock-task policy needs to designate the KAG package as the home activity:

- **AMAPI:** set `kioskCustomLauncherEnabled` to `true` in the policy and ensure the KAG package is in `applications` with `installType` set to a force-install variant.
- **Custom DPC:** call `DevicePolicyManager.addPersistentPreferredActivity` for `CATEGORY_HOME` against the KAG package, and add the package to `setLockTaskPackages` if you want full lock-task mode.
- Other EMMs typically expose this as a "home app override" or "default launcher" field on the kiosk policy.

Without that policy step, KAG installs as a regular app and the system launcher continues to be shown.
