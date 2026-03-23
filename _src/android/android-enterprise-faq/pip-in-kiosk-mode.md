---
title: "Does Picture-in-Picture work in kiosk (lock task) mode?"
published: '2026-03-23'
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
  order: 63000
---
No. Picture-in-Picture (PiP) mode does not function when a device is in lock task (kiosk) mode.

When an application calls `enterPictureInPictureMode()` on a device with lock task active, the request is silently ignored. This is by design - lock task mode restricts the device to a controlled set of applications and prevents system UI elements that could allow users to navigate away from the kiosk experience.

### Why is this a problem?

Common enterprise use cases affected include:

- Video conferencing apps (Teams, Meet, Zoom) that rely on PiP to allow multitasking during calls
- Monitoring or streaming apps that need to overlay video while the primary kiosk app runs
- Navigation apps used alongside a primary field-service application

### Are there workarounds?

There is no official workaround within the standard lock task API. Some options organisations have explored:

- **Multi-app kiosk** - rather than a single-app kiosk, configure a multi-app kiosk that includes both the primary app and the video/overlay app, then handle the split-screen or overlay behaviour within the apps themselves
- **OEM-specific APIs** - some OEMs offer proprietary APIs that may support overlay behaviour in restricted modes. Check with your device manufacturer
- **Custom launcher** - a custom kiosk launcher application may be able to manage windowing behaviour outside of standard lock task constraints

This is an active area of community feedback. Google has not indicated whether PiP support in lock task mode is planned.
