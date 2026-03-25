---
title: "What is the content protection policy in AMAPI?"
published: '2026-03-25'
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
  order: 36000
sources:
  - https://developers.google.com/android/management/reference/rest/v1/enterprises.policies#ContentProtectionPolicy
  - https://developer.android.com/work/versions/android-15
---
The content protection policy is an AMAPI feature available on Android 15+ that enables enhanced scanning of apps for deceptive or potentially harmful behaviour on the device.

When enabled, the device leverages Google Play Protect's on-device scanning capabilities to detect apps that may attempt social engineering tactics, such as impersonating system dialogs or overlaying content to trick users into providing credentials or granting permissions.

This is particularly relevant for organisations deploying devices to frontline or less technically experienced workers, where the risk of social engineering through deceptive apps is higher.

The content protection policy complements but does not replace standard Play Protect scanning. It is focused on real-time behavioural analysis of app UI patterns rather than static malware detection.

This policy applies to fully managed and dedicated devices. For work profile deployments, the work profile already benefits from Play Protect scanning within its scope.
