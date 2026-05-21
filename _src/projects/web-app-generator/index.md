---
title: WEB APP GENERATOR
parent: Projects
titleimage: '/img/bayton_logos/web_app_generator_hero.svg'
date: '2026-05-21'
status: publish
author: 'Jason Bayton'
excerpt: 'Browser-generated native Android wrappers for any URL.'
type: page
layout: project.njk
---

**WEB APP GENERATOR is a browser-based tool that wraps any website in a signed Android APK or AAB using a native Chromium WebView, ready for distribution through your existing EMM.**

## What does WEB APP GENERATOR do?

WEB APP GENERATOR answers the question: how do we deliver a hosted web app to managed Android devices as something that installs, signs and updates like any other native app, without standing up an Android project to do it?

The output is a signed APK or AAB whose single activity opens a Chromium WebView pinned to the URL you supplied. You pick the display chrome, the runtime permissions, the orientation, the theme colour, and a few finer behaviours. The artefact is a normal Android installation: it appears in the launcher, holds its own cookies, can be policy-controlled, and updates through your EMM like any other app.

<a class="button" href="https://gen.bayton.org/webapp/">Open WAG</a>
<a class="button" href="support/">Documentation</a>

## How does WEB APP GENERATOR do this?

You fill out a form at [gen.bayton.org/webapp](https://gen.bayton.org/webapp/) and the server substitutes your values into an Android template, compiles, signs and returns the artefact in under a minute. Behind the scenes WAG also:

- Writes a per-host network security config so HTTP target URLs work without flipping the whole app to cleartext.
- Stamps the AndroidManifest with a meta-data tag recording the WAG server version that produced the build, so support tickets can be tied to an exact release.
- Emits a source archive alongside the artefact: the post-substitution Kotlin, XML and Gradle files, so you can audit exactly what was compiled or reproduce the build with your own tooling.

## Who is WEB APP GENERATOR for?

- Are you distributing internal web tooling to managed Android devices and want it to install like a real app?
- Do you need to anchor a kiosk to a single web URL without the rest of a browser tagging along?
- Do you ship a PWA but find the browser-driven install prompt unreliable on managed fleets?

If you answered yes to any of these, WEB APP GENERATOR was built for you. It's especially useful where the alternative would be writing and maintaining a native wrapper just to ship a WebView, or where Google Play isn't part of your distribution path.

## What can WEB APP GENERATOR pair with?

- [KIOSK APP GENERATOR](/projects/kiosk-app-generator/) builds the launcher. A WAG-wrapped app slots into the launcher's app grid like any other installed app, which is the natural pattern for single-site kiosks.
- [MANAGED SETTINGS](/projects/managed-settings/) gatekeeps the system Settings surface. If your wrapped app sends users to system intents (Wi-Fi, location, accessibility), MANAGED SETTINGS controls which of those they can actually reach.
- [MANAGED INFO HUB](/projects/splash/mi) is the right answer when you need more than a single URL but less than a full launcher.

## Display modes

The display mode sets how much system chrome stays visible inside the wrapped app.

**Standalone** is the default and closest to a typical native app: system bars visible, no in-app URL chrome. Pick this unless you have a specific reason not to.

**Minimal UI** keeps a slim in-app toolbar showing the URL and a refresh button. Useful when the wrapped site benefits from a manual refresh affordance, or when you want users to be able to verify the origin at a glance.

**Full screen** hides the system bars entirely. Pairs with **Keep screen on** for kiosk and signage. The **Respect insets** sub-toggle controls whether content reserves space around camera notches (on by default) or pushes edge-to-edge (off for notch-less devices where the inset padding would otherwise show as awkward letterboxing).

## Signing modes

**Bayton signed** is the fastest path. Built with Bayton's certificate, unique package name per build unless you supply an update code. Suitable for any EMM including Managed Google Play. After your first AAB upload Play App Signing takes over, so the Bayton certificate stops mattering at that point.

**Release signed** uses your own certificate. Upload a JKS or PKCS12 with the alias and passwords; credentials are held in memory for the build and discarded immediately after. Nothing is persisted server-side.

**Debug signed** is auto-signed with an Android debug key. Sideload testing only; not accepted by Managed Google Play or by EMM silent-install flows that require release signing.

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">Update codes</div>

Every build returns a one-time update code, shown exactly once. Quote it on a future build to keep the same Android package name (required for EMM silent updates and for republishing to the same Managed Google Play listing). Only a SHA-256 hash is kept server-side, so the raw code cannot be recovered. Lose it and the next build receives a new package name.

</div>

## Versioning and provenance

Every build is stamped with the WAG version that produced it. Five ways to read it back:

- The downloaded filename ends `-wag-v<version>.apk` or `.aab`
- `unzip -p <file> assets/wag-build.txt` returns `builder`, `version`, `build_timestamp`
- `strings <file> | grep '^builder:'` surfaces the same three lines without extracting
- `adb shell dumpsys package <pkg> | grep org.bayton.wag` reads the manifest meta-data
- `GET /api/version` on the live server returns the current release; the per-build `/api/status/<id>` response carries `builder_version`

Quote the version in any support ticket so the issue can be tied to the exact build that produced your artefact.

## What WEB APP GENERATOR cannot do

**Web push notifications** do not work. There is no FCM bridge from the WebView, and no plan to add one. If you need push, run a native companion alongside the wrapper.

**Cookies don't span apps.** The wrapper has its own cookie jar isolated from Chrome's. Users logged into the site in their browser will need to log in again inside the wrapped app.

**Custom URL schemes** other than `tel:`, `mailto:`, `sms:` and `geo:` are silently blocked. Even the supported ones only fire on a real user gesture in the main frame; sub-frame and script-initiated openings won't trigger the system handler. This is intentional and prevents wrapped sites from launching external apps without user action.

**Native-only platform APIs** beyond what the WebView exposes (Bluetooth Classic, USB host, full Bluetooth Low Energy, etc.) are not available. The wrapper is a WebView, not a Cordova or Capacitor bridge.
