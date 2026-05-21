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

<a class="button" href="https://gen.bayton.org/webapp/">Open WEB APP GENERATOR</a>
<a class="button" href="support/">Documentation</a>

## How does WEB APP GENERATOR do this?

You fill out a form at [gen.bayton.org/webapp](https://gen.bayton.org/webapp/) and the server substitutes your values into an Android template, compiles, signs and returns the artefact in under a minute.

Display mode, runtime permissions, theme colour, orientation and the finer behaviours are all configurable in the form. Signing is your choice: Bayton's certificate for the fastest path, your own keystore for full ownership, or a debug key for sideload testing. The build is accompanied by a source archive of the post-substitution Kotlin, XML and Gradle so you can audit exactly what was compiled or rebuild it locally.

## Who is WEB APP GENERATOR for?

- Are you distributing internal web tooling to managed Android devices and want it to install like a real app?
- Do you need to anchor a kiosk to a single web URL without the rest of a browser tagging along?
- Do you ship a PWA but find the browser-driven install prompt unreliable on managed fleets?

The natural pairings are with the other Bayton tools: [KIOSK APP GENERATOR](/projects/kiosk-app-generator/) for the launcher a WAG-wrapped app sits inside, and [MANAGED SETTINGS](/projects/managed-settings/) for gatekeeping any system Settings intents the wrapped app sends users to.
