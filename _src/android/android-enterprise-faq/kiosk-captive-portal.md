---
title: "How can I access a Wi-Fi captive portal when devices are in Kiosk?"
published: '2025-10-22'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - Fully managed
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 40000
--- 
If you find networks with captive portals configured simply never launch the portal for authentication when a device is in a Kiosk environment, this is because it must be configured to do so.

Captive portals are typically handled through a dedicated application preloaded on all Android devices, and access can be granted by adding the respective package name to the EMM policy as an allowed application.

The common package name for this is:

`com.google.android.captiveportallogin`

<span class="label label-green"><span class="material-symbols-outlined">android</span> Tip</span> _For specific OEM implementations, search `captive portal` in the [Android system apps database](/android/android-system-app-database/)._

What this does is add the package name to the LockTask allowlist, enabling the app to open without triggering a security exception.