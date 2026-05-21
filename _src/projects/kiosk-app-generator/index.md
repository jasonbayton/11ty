---
title: KIOSK APP GENERATOR
parent: Projects
titleimage: '/img/bayton_logos/kiosk_app_generator_hero.svg'
date: '2026-05-21'
status: publish
author: 'Jason Bayton'
excerpt: 'Browser-generated multi-app launchers for managed Android.'
type: page
layout: project.njk
---

**KAG (Kiosk App Generator) is a browser-based tool that produces signed, deployable multi-app launcher APKs and AABs for managed Android devices.**

## What does KAG do?

KAG replaces the system home screen on a fleet of dedicated Android devices with a custom launcher you define in a browser form: which apps appear, how they're arranged, the wallpaper, the theme colour, what level of system-settings access end users are allowed.

The output is a signed APK or AAB that drops into any EMM (Android Management API, Custom DPC, or third-party MDMs that support managed Google Play uploads).

<a class="button" href="https://gen.bayton.org/kiosk/">Open KAG</a>
<a class="button" href="support/">Documentation</a>

## Who is KAG for?

- **Fleet operators** running Android Enterprise dedicated devices who want a controlled multi-app surface without writing and maintaining a launcher app.
- **Kiosk and signage deployments** where the launcher is the only thing the end user should ever see.
- **Field-service, retail, logistics, hospitality, healthcare** scenarios that have outgrown single-app pinning but don't need a full home screen.

## What KAG produces

- A signed Android APK or AAB carrying the launcher activity, your app list, theme and wallpaper assets.
- A unique package name per build (or reused via an update code, so EMM silent updates keep working).
- An exported configuration file alongside the build so you can audit or reproduce later.

## How does KAG differ from app pinning?

App pinning locks the device to a single app. KAG produces a launcher: end users see and interact with a controlled set of apps, with the layout and accessibility you configured. Useful when the use case requires more than one app but less than the full home screen.

## Signing options

- **Bayton-signed.** Fastest path. Each build is signed with Bayton's certificate and assigned a unique package name. Use an update code to rebuild under the same package name later.
- **Release-signed.** Upload your own JKS or PKCS12 keystore. Credentials are never stored server-side; they're purged immediately after the build completes.
- **Debug-signed.** Auto-signed with an Android debug key. Suitable for testing only; not accepted for Managed Google Play or for EMM silent-install flows that require release signing.

## Source download

Every build is accompanied by a downloadable source archive containing the post-substitution Kotlin, XML and Gradle files used to produce the APK. Useful for auditing what was compiled or for reproducing the build locally.
