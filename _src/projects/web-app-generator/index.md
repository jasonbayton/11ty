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

**WAG (Web App Generator) is a browser-based tool that wraps any website in a signed Android APK using a native WebView.**

## What does WAG do?

WAG turns a hosted web app into an installable Android app. Configure display mode, orientation, theme colour and per-app permissions in a browser form, and download a signed APK or AAB ready for distribution through your EMM.

The wrapped app behaves like a native installation: no address bar, no bookmarks, no other tabs - just your URL in a Chromium WebView with the display chrome you chose.

<a class="button" href="https://gen.bayton.org/webapp/">Open WAG</a>
<a class="button" href="support">Documentation</a>

## Who is WAG for?

- **Operators distributing internal web tooling** to managed Android devices outside the Play Store.
- **Anyone anchoring a kiosk to a single web destination** without the rest of a browser tagging along.
- **Teams shipping PWAs** that need installable distribution on managed fleets where browser-driven install prompts aren't reliable.

## What WAG produces

- A signed Android APK or AAB containing a single WebView activity pointed at the URL you supplied.
- A network security config that auto-enables cleartext for HTTP target URLs (HTTPS is otherwise default).
- A unique package name per build (or reused via an update code for EMM silent updates).
- An exported source archive alongside the build for auditability and local reproduction.

## Display modes

- **Standalone.** System bars visible; no in-app URL chrome. Closest to a typical native app feel.
- **Minimal UI.** Shows a small in-app toolbar with the URL and a refresh button. Useful when you want users to be able to verify what site they're on.
- **Full screen.** Hides system bars entirely. Pairs with **Keep screen on** for kiosk and digital-signage use cases.

## Signing options

- **Bayton-signed.** Built with Bayton's certificate. Fastest path; each build receives a unique package name unless you supply an update code.
- **Release-signed.** Upload your own JKS or PKCS12. Credentials are purged after the build.
- **Debug-signed.** Auto-signed with a debug key. Test-only; not for production distribution.

## What WAG cannot do

- **Web push notifications** do not work; there is no FCM bridge from the WebView.
- **Cookies do not span apps.** The wrapper has its own cookie jar; users logged into the site in Chrome will need to log in again inside the wrapped app.
- **Native-only platform features** beyond what the WebView exposes (Bluetooth Classic, USB host, etc.) are not available; the wrapper is a WebView, not a Cordova / Capacitor bridge.
