---
title: KIOSK APP GENERATOR
parent: Projects
titleimage: '/img/bayton_logos/app_generator_hero.svg'
date: '2026-05-21'
status: publish
author: 'Jason Bayton'
excerpt: 'Browser-generated multi-app launchers for managed Android.'
type: page
layout: project.njk
---

**KIOSK APP GENERATOR is a browser-based tool that produces signed multi-app launcher APKs and AABs for managed Android devices, replacing the system home screen with a tiled layout you define.**

## What does KIOSK APP GENERATOR do?

KIOSK APP GENERATOR answers the question: how do we put a controlled set of apps in front of dedicated-device users without writing and maintaining a launcher application to do it?

The output is a signed APK or AAB carrying the launcher activity, the list of apps to expose, the grid layout, the theme and the wallpaper. The artefact installs through any EMM, takes over as the device home screen via your existing kiosk policy, and presents only the apps you specified.

<a class="button" href="support/supported-configurations/">View configurations</a>

## How does KIOSK APP GENERATOR do this?

You fill out a form at [gen.bayton.org/kiosk](https://gen.bayton.org/kiosk/) and the server substitutes your values into an Android template, compiles, signs and returns the artefact in under a minute.

Apps are referenced by package name rather than bundled, so the launcher's job is the surface layer (which tiles, where, with what label) while the apps themselves are deployed separately through your EMM. The build is accompanied by a source archive of the post-substitution Kotlin, XML and Gradle, plus an exported `kiosk_config.json` describing the full configuration and update code so a future build can import the same setup verbatim.

## Who is KIOSK APP GENERATOR for?

- Do you operate an estate of Android Enterprise dedicated devices that need more than a single pinned app?
- Are you running a kiosk, signage, retail, hospitality or field-service deployment where the launcher is the only thing the end user should ever see?
- Have you considered writing your own launcher and decided it wasn't worth the maintenance load?

The primary use case is **Android Enterprise dedicated devices** that need a multi-app surface. App pinning solves the single-app case; KIOSK APP GENERATOR solves the case where users need two or three or twelve apps, but not the rest of the home screen. The launcher slots into your existing kiosk policy as the home activity, and your users see only what you specified.

The secondary use case is **non-dedicated devices that benefit from a controlled surface**: training rooms, demo handsets, shared tablets in healthcare or hospitality. The same launcher, deployed without lock-task policy, gives staff a cleaner working environment without locking the device down entirely. Pair with [MANAGED SETTINGS](/projects/managed-settings/) if you want fine-grained control over which system Settings intents are reachable from inside the launcher.

## What KIOSK APP GENERATOR doesn't do

KIOSK APP GENERATOR does not deploy the apps it launches. It produces the surface; the apps it tiles must be installed independently, typically through the same EMM that deploys the launcher.

It also does not lock the device. Designating the launcher as the home activity, blocking other launchers, and configuring lock-task mode are all your EMM's job. The output is a normal Android app; the locked-down behaviour comes from how you deploy it.

KAG also does not bypass Android's own lock-task allowlist. Every app surfaced as a tile or inside a folder still needs to be installed and allowed by policy before Android will launch it in a dedicated-device session.

## What does KIOSK APP GENERATOR cost?

KIOSK APP GENERATOR is a **free** service. There is no usage cap, no per-build fee and no licence model. Bayton-signed builds are signed with Bayton's certificate at no cost; release-signed builds use whichever keystore you upload.

## Get started

You can use KAG publicly at [gen.bayton.org/kiosk](https://gen.bayton.org/kiosk/).

<a class="button" href="https://gen.bayton.org/kiosk/">Open KIOSK APP GENERATOR</a>
<a class="button" href="support/">Documentation</a>
