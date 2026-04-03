---
title: "How do I prevent users from escaping kiosk (lock task) mode?"
published: '2026-03-28'
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
  order: 69000
sources:
  - https://developer.android.com/work/dpc/dedicated-devices/lock-task-mode
target_file: _src/android/android-enterprise-faq/kiosk-escape-prevention.md
---
Lock task mode (kiosk mode) restricts the device to a set of allowlisted applications. Only apps on the lock task allowlist can be launched — if an allowed app attempts to open another app that is not on the allowlist, it will be blocked. However, allowed apps may still be able to trigger system activities or intents (such as Settings sub-pages) that don't behave as standalone apps, and this is where escape risks arise. Proper hardening requires careful configuration.

**Audit allowed applications**

Review each application on the lock task allowlist for potential escape vectors. For example, a browser may navigate to `intent://` URIs that trigger system activities, and some apps may deep-link into Settings sub-pages. Remove any application from the allowlist that is not strictly necessary.

**Restrict system UI features**

Use policy to disable system UI features that could allow escape:

- Disable the status bar and notification shade
- Disable the navigation bar where appropriate (or limit to home/back only)
- Disable the power button menu if possible (some devices allow long-press to access options)
- Disable the recent apps overview

Most EMMs expose these as dedicated kiosk policy settings, so do check the vendor documentation.

**Block system applications**

Unless specifically needed, do not include system applications (Settings, File Manager, Downloads) in the kiosk allowlist. If an application requires access to a specific system setting (such as Wi-Fi), use AMAPI's managed Settings activities — these expose only the specific setting required (e.g. Wi-Fi or Bluetooth) without granting access to the full Settings app. For a more flexible, enterprise-customisable alternative, [MANAGED SETTINGS](/projects/managed-settings/) provides granular control over which settings intents are accessible to end users via managed configuration.

**Use a dedicated enterprise kiosk launcher**

Consider deploying a purpose-built kiosk launcher that only surfaces the intended applications and does not allow access to app drawers, widgets, or search bars. [MANAGED INFO](/projects/managed-info/) offers a launcher mode that can replace the default Android launcher with a fully customisable, enterprise-managed home screen, for example.

**Test thoroughly**

Before deploying at scale, test the kiosk configuration by attempting to escape it. Try long-pressing buttons, using voice assistants, triggering crash dialogs, and testing all allowed applications for links or intents that could open unintended activities. OEM-specific behaviours (Samsung, Zebra, Honeywell) may introduce additional escape vectors not present on stock Android.

For captive portal access in kiosk mode, see [How can I access a Wi-Fi captive portal when devices are in kiosk?](/android/android-enterprise-faq/kiosk-captive-portal/).
