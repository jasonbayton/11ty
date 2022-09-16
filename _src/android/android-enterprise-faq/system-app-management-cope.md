---
title: "How should system applications be handled on a COPE device?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - AE FAQ
    - COPE
    - Work profiles on company-owned devices
    - App management
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "How should system applications be handled on a COPE device?"
  order: 32000
--- 
**Android 8-10** – My normal advice, where supported through DPC extras (so NFC, QR, zero-touch, but not DPC identifier), is to enable system applications on COPE devices.

Organisations are providing a device provisioned for personal use, and as such the closer to stock it feels, the more familiar users will be with using it.

Most EMMs support the ad-hoc management of system applications, so there’s no reason bloatware can’t still be disabled, but things like system gallery, calculator, health apps and other OEM app suites being enabled should be harmless outside of the secure work profile.

**Android 11+** – While there is still [application management to a degree](/android/android-11-cope-changes/), the act of enabling or disabling system applications during provisioning is no longer supported.

