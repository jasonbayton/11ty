---
title: KIOSK APP GENERATOR troubleshooting
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
    - Kiosk App Generator Troubleshooting
layout: base.njk
eleventyNavigation:
    order: 0
    title: Troubleshooting
---

## Build fails immediately

Most fast-failures are caused by an invalid signing keystore. If you uploaded a release keystore:

- Confirm the file is a real JKS or PKCS12 (not a `.pem` or `.p12` renamed).
- Confirm the **key alias** matches an entry inside the keystore. `keytool -list -keystore <file>` will show you the available aliases.
- Confirm both passwords are correct. The **store password** and **key password** are independent; many keystores use the same value for both, but if yours doesn't, both must be supplied separately.

## Build fails with a Gradle error

Gradle build failures are logged server-side and a generic "Build failed; check server logs for details" message is returned to the form. If you raise a support request, quote the **builder version** shown on the result page and the **job ID** (the random ID in the URL).

## Update code rejected when rebuilding

The update code is a one-time-issued, hashed-and-stored secret. Possible causes for rejection:

- The code was typed with whitespace or invisible characters. Paste, don't retype.
- You're trying to use an update code minted by a different generator (a WAG code won't work for a KAG build, and vice versa - this is intentional).
- The original build's package name has been deleted from the registry. This shouldn't happen under normal operation; raise a support request with the job ID of the original build.

## Apps don't appear in the launcher

KAG references apps by package name; it doesn't bundle them. The apps must be installed on the target device, typically by your EMM, before the launcher can show them.

If an app is installed but its tile is missing:

- Confirm the package name in the form exactly matches the installed package name. `adb shell pm list packages` on a connected device shows you the installed list.
- Confirm the app exposes a launcher activity (`<intent-filter><action android:name="android.intent.action.MAIN" /><category android:name="android.intent.category.LAUNCHER" /></intent-filter>`). Service-only apps cannot be launched from a home screen and won't appear in KAG either.

## End users can still see the system home screen

The KAG launcher needs to be designated as the home activity on the device. Push it via your EMM, then set it as the kiosk app (Android Management API: `kioskApps`; Custom DPC: `setLockTaskPackages`). Without that policy step, KAG installs as a regular app rather than replacing the home screen.

## Builds expire before I can download

Download links expire 5 minutes after the **first click**, and build artefacts are purged 24 hours after creation regardless. If you need to re-download after that, rebuild using the original update code.

## Reporting an issue

Include in your support request:

- The job ID from the result page (URL contains `/jobs/<id>`).
- The builder version (shown on the result page or in the downloaded APK's manifest as a meta-data tag).
- The exact form values you submitted, if you can. The exported `kiosk_config.json` is the cleanest format.

Open issues at [github.com/baytonorg/kag/issues](https://github.com/baytonorg/kag/issues).
