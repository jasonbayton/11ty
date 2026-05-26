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

The output is a signed APK or AAB whose single activity opens a Chromium WebView pinned to the URL you supplied. The artefact is a normal Android installation: it appears in the launcher, holds its own cookies, can be policy-controlled, and updates through your EMM like any other app.

<a class="button" href="support/supported-configurations/">View configurations</a>

## How does WEB APP GENERATOR do this?

You fill out a form at [gen.bayton.org/webapp](https://gen.bayton.org/webapp/) and the server substitutes your values into an Android template, compiles, signs and returns the artefact in under a minute.

Display mode, runtime permissions, theme colour, orientation and the finer behaviours are all configurable in the form. Signing is your choice: Bayton's certificate for the fastest path, your own keystore for full ownership, or a debug key for sideload testing. The build is accompanied by a source archive of the post-substitution Kotlin, XML and Gradle, plus an exported `web_app_config.json` so you can audit exactly what was compiled or rebuild it later under the same package name.

## Who is WEB APP GENERATOR for?

- Are you distributing internal web tooling to managed Android devices and want it to install like a real app?
- Do you need to anchor a kiosk to a single web URL without the rest of a browser tagging along?
- Do you ship a PWA but find the browser-driven install prompt unreliable on managed fleets?

The primary use case is **distributing a hosted application** to a managed fleet without Google Play in the loop. Operations and IT teams that maintain an internal web tool _and_ a fleet of managed Android devices get the smallest possible bridge between the two: no native development, no Play Store dance, just a signed artefact pushed through whichever EMM is already in place.

The secondary use case is **kiosk anchoring**. Pair a Full-screen WAG-wrapped APK with a lock-task policy and the device becomes a single-purpose terminal for your URL, with no browser chrome for users to navigate away from. Slot the same artefact into [KIOSK APP GENERATOR](/projects/kiosk-app-generator/) instead and it becomes one tile in a multi-app launcher. Either way, no custom Android work needed to get there.

## What WEB APP GENERATOR doesn't do

WEB APP GENERATOR does not provide a native bridge to platform APIs the WebView can't reach itself. Bluetooth Classic, USB host, FCM-backed push notifications and the full breadth of Android-only platform features stay out of scope. The wrapper is a WebView, not a Cordova or Capacitor runtime.

Cookies set inside the wrapped app live in the wrapper's own cookie jar, isolated from Chrome and from other wrapped apps. Users logged into the site in their browser will need to log in again inside the wrapper.

## What does WEB APP GENERATOR cost?

WEB APP GENERATOR is a **free** service. There is no usage cap, no per-build fee and no licence model. Bayton-signed builds are signed with Bayton's certificate at no cost; release-signed builds use whichever keystore you upload.

## Get started

You can use WAG publicly at [gen.bayton.org/webapp](https://gen.bayton.org/webapp/).

<a class="button" href="https://gen.bayton.org/webapp/">Open WEB APP GENERATOR</a>
<a class="button" href="support/">Documentation</a>
