---
title: PACKAGE SEARCH
parent: Projects
titleimage: '/img/bayton_logos/package_search_hero_animated.svg'
date: '2024-08-09'
status: publish
funding_goal: 4000
funding: 400
funding_version: 1.0.1
author: 'Jason Bayton'
excerpt: ''
type: page
layout: project.njk
---
**PACKAGE SEARCH is an enterprise-biased Android application inspection utility designed to provide detailed information about the apps installed on managed Android devices.**

## What does PACKAGE SEARCH do?

PACKAGE SEARCH offers organisations and private individuals alike a simple, efficient way of viewing <span id="dynamic_word">installed applications</span>.

A core USP (unique selling point) of PACKAGE SEARCH is the ability to view applications _not available for the current user_. In other words, applications disabled predominantly by the Android Enterprise managed provisioning flow. This applies both for company-owned fully managed devices, as well as offering visibility into system applications not enabled within a personally owned work profile deployment, allowing organisations to deploy PACKAGE SEARCH under any deployment scenario knowing all applications - enabled, disabled, and unavailable, will be present within the app.

## Who is PACKAGE SEARCH for?

- Do you struggle with missing core applications after EMM enrolment on managed Android devices?
- Does the need to set up an unmanaged device to gain access to typical system applications through most package viewers on the market frustrate you?

The primary use case for PACKAGE SEARCH is to locate the names and package names of unavailable applications on managed devices. That said, based on known friction points, the following additional features are incorporated:

- View the version name and version code of all installed, available applications.
- Track applications with too-low target API versions
- See when applications were last updated
- Full text search, as well as filters (see below)
- View assigned managed configurations to an application

.. and more! PACKAGE SEARCH is a quickly-evolving application.

Due to the nature of the application, PACKAGE SEARCH can be useful for consumers and private individuals alike also. Feedback is critically important to me, so I do encourage use and honest feedback.

## What does PACKAGE SEARCH cost?

PACKAGE SEARCH is a **free** application. If you'd like to contribute to continued development of new and existing projects, either as an individual or corporate sponsor, please do [get in touch](/contact)!

## Get started

You can find the app publicly here:

<a href='https://play.google.com/store/apps/details?id=org.bayton.packagesearch'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' width="200px"/></a>

## Help & support

Head into the PACKAGE SEARCH documentation for support and guidance:

<a class="button" href="support/">View the docs</a>

Alternatively, you can submit [feedback](https://docs.google.com/forms/d/e/1FAIpQLSclD6_rkmgIZB_82qmuDoh_yavdA-yO71AuHfURr9oXqyw5AA/viewform?usp=sf_link), post to the [Discord community](https://discord.gg/5yMfb9UWm9), or tag me on [LinkedIn](https://linkedin.com/in/jasonbayton). 

### Quick tips:

- Tap the app icon of any application that should be hosted in Google Play to go directly to the Play Store listing
- Tap the state (enabled/disabled) to open on-device app information (if present)
- Press and hold on an app card to copy the package name of the app to the clipboard
- Get help and see available actions for PACKAGE SEARCH by tapping on the PACKAGE SEARCH icon in the top left
- Tap the filter icon (top-right) to view filter and sorting options
- Use filters for more precise search queries, the following are supported:
  - name:
  - package:
  - min:
  - code:
  - version:
  - target:
  - state:
  - type:
  - profile:
  - source:

Examples include:

- `package:org.bayton.managedsettings`
- `min:24`
- `state:unavailable`
- `profile:other`
- `source:shell`

I can also offer additional priority support for an annual recurring fee, offering faster and more in-depth support, with additional discounts on my [consultancy rate](/support). Details can be found [here](/projects/managed-settings/pricing/#support-priority-support) (via MANAGED SETTINGS pricing).

<script src="/js/package-search-dynamic-word.js"></script>
