---
title: "Why is my kiosk app UI broken after updating to Android 15?"
published: '2025-06-15'
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
  order: 68000
sources:
  - https://developer.android.com/about/versions/15/behavior-changes-15
  - https://www.esper.io/blog/android-15-android-16-and-the-new-rules-of-dedicated-device-management
---

## Why is my kiosk app UI broken after updating to Android 15?

Android 15 enforces edge-to-edge rendering for all apps targeting API 35 (Android 15). This means the app's content extends behind the system status bar and navigation bar by default, rather than being constrained within the safe area.

For consumer apps, this creates a more immersive experience. For enterprise kiosk and dedicated device deployments, it can cause problems:
- Navigation buttons or action bars may be hidden behind the system navigation bar
- Interactive elements near the top or bottom of the screen may become unreachable
- Full-screen kiosk apps may display unexpected system UI overlays

**What should I do?**

- **Update the app's layout**: Add appropriate padding or insets handling to account for system bars. Android provides the `WindowInsets` API for this purpose
- **Use immersive mode correctly**: If your kiosk app uses immersive/sticky immersive mode to hide system bars, verify it still works as expected after the update
- **Delay the update**: If the app cannot be modified immediately, use your EMM's system update policy to postpone Android 15 updates on affected devices until the app is updated
- **Test before rolling out**: Always test kiosk applications on the target OS version before pushing system updates to your fleet

This is not specific to lock task mode - any app targeting API 35 will be affected. However, the impact is most noticeable on dedicated devices where the app is the sole user-facing interface.
