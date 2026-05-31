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

The common package names for this are:

`com.google.android.captiveportallogin`  
`com.android.captiveportallogin`  
`com.google.android.overlay.modules.captiveportallogin.forframework`

On a GMS-certified device, the AOSP version (com.android..) is less likely to be in use. The two Google-branded packages are the captive portal app itself, and an overlay app used by some OEMs to customise the captive portal experience (think Samsung providing their own style/branding). The overlay would only need allowlisting if captive portal fails to work with the primary app allowlisted.

_More details of each package can be found by searching `captive portal` in the [Android system app database](/android/android-system-app-database/)._

By adding the package name(s) to the EMM application policy allowlist, captive portal will be able to open without triggering a security exception.
