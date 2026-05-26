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
- An optional **app icon**, **wallpaper**, and **banner text**. All are optional; defaults ship in the artefact.
- If you intend to release-sign, your **JKS or PKCS12 keystore** plus the alias and passwords. Credentials are held in memory for the build and discarded immediately after; nothing is persisted server-side.
- If you're rebuilding an existing launcher, the **update code** from the original build. Without it, KAG will mint a new Android package name.

## Build the application

1. Open [gen.bayton.org/kiosk](https://gen.bayton.org/kiosk/).
2. If you have a previous `kiosk_config.json`, import it first. The form will pre-populate with the original app name, grid, folders, signing choice, output format and update code. Icons, wallpapers and keystores are not embedded in the JSON, so upload those again if required.
3. Set the application name, theme colour, optional banner text and optional icon.
4. Configure the **layout**: orientation, rows and columns, icon size. Presets cover common grids, and custom values can go up to 20x20.
5. Add **apps**: paste the package name of each app you want to tile, choose the row and column, and add a label override if the device's normal app label is not suitable.
6. Add **folders** if needed. Each folder sits on one grid cell and can contain 2-9 apps, shown in the order you enter them.
7. Pick the **wallpaper** source: upload an image, supply an HTTPS URL for runtime fetch, or leave blank to ship the default Bayton wallpaper.
8. Configure **settings access**: choose which Android Settings intents end users can reach from inside the launcher, or delegate the gear to [MANAGED SETTINGS](/projects/managed-settings/). See [supported configurations](supported-configurations) for the full list.
9. Pick the **signing mode**: Bayton-signed for the fastest path, Release-signed to use your own certificate, or Debug for sideload testing.
10. Pick the **output format**: APK for direct EMM push, AAB for upload to Managed Google Play.
11. Submit. The result panel will show whether the build is queued, building, complete or failed. If other builds are ahead of yours, it will show the queue position and an estimated wait.

## After the build

The result page contains:

- A **download link** for the signed APK or AAB. Links expire 5 minutes after first click; build artefacts are purged 24 hours after creation regardless.
- A **download link for the source archive**: the post-substitution Kotlin, XML and Gradle files for audit or local rebuild.
- A **download link for the exported `kiosk_config.json`**. This is the full configuration that produced the build; paste it back into the form's Import config field to pre-populate every setting for a future rebuild.
- A **one-time update code**. Save this. It's the only way to rebuild this launcher under the same Android package name later. The server stores only a SHA-256 hash; the raw code cannot be recovered.
- The **builder version** that produced the artefact. This is also stamped into the APK manifest and source archive for later support and audit work.

<div class="callout callout-orange">
<div class="callout-heading">Save the update code</div>

The update code is required to keep the same Android package name across rebuilds. Without it, the next build is treated as a new app and won't satisfy EMM silent-update flows or re-publish to the same Managed Google Play listing. Store it alongside the keystore credentials for whichever app it belongs to.

</div>

## Deploy

Push the APK or AAB through your EMM as you would any other app. To take over as the home screen, your EMM's kiosk or lock-task policy needs to designate the KAG package as the home activity:

- **AMAPI:** install the KAG package as the kiosk app, using `role.roleType: KIOSK` on the launcher application. Ensure every tile-target package is also present in `applications` with a force-install style install type.
- **Custom DPC:** call `DevicePolicyManager.addPersistentPreferredActivity` for `CATEGORY_HOME` against the KAG package, and add the package to `setLockTaskPackages` if you want full lock-task mode.
- Other EMMs typically expose this as a "home app override" or "default launcher" field on the kiosk policy.

Without that policy step, KAG installs as a regular app and the system launcher continues to be shown.

Every app surfaced by KAG also needs to be allowed by the kiosk policy. KAG can show a tile for `com.example.app`, but Android will still block the launch if that target app is not installed, not force-installed, or not included in the lock-task allowlist.

## Rebuild or update

To update an existing launcher, import the previous `kiosk_config.json`, make the required change, and keep the update code in place. KAG will reuse the original package name so an EMM can replace the installed APK silently.

If you build without the update code, the new artefact is a separate Android app with a new package name. That's useful for variants, testing, or parallel pilots, but it won't update devices already running the earlier build.

## Audit or self-build

The source archive is a complete Android project after template substitution. It contains the Kotlin, XML, Gradle files and build metadata used by KAG, but not your keystore or signing passwords.

For a debug rebuild, unzip the source and run `./gradlew :app:assembleDebug`. For a release rebuild, copy `signing.properties.template` to `signing.properties`, fill in your keystore details, then run `./gradlew :app:assembleRelease` or `./gradlew :app:bundleRelease`.
