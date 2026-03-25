---
title: "What are AMAPI application roles?"
published: '2026-03-25'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - FAQ
categories:
    - App management
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 62000
sources:
  - https://developers.google.com/android/management/app-roles
  - https://developers.google.com/android/management/reference/rest/v1/enterprises.policies#ApplicationPolicy
---
> The application roles feature allows an IT admin to grant special privileges to a managed application on an Android-powered device. By assigning a specific role, an app can be exempted from power and background restrictions, suspension, hibernation (on Android 14+) and have user controls (i.e. includes user actions like force-stopping and clearing app data) disabled (on Android 11+), allowing it to perform its critical function without interruption. Additionally, the app can be notified of its assigned roles, which allows it to bootstrap itself without user intervention.

The available roles are:

- **KIOSK** - designates the app for dedicated device (kiosk) experiences
- **COMPANION_APP** - designates the app as a companion to Android Device Policy, enabling offline command execution and interaction
- **DEVICE_POLICY_CONTROLLER** - designates the app as a device policy controller (DPC)
- **IDENTITY_PROVIDER** - designates the app as an identity provider (IDP)
- **SECURITY_TOOL** - designates the app as a security tool
- **MOBILE_THREAT_DEFENSE_ENDPOINT_DETECTION_RESPONSE** - designates the app as a mobile threat defence (MTD) / endpoint detection and response (EDR) agent
- **SYSTEM_HEALTH_MONITORING** - designates the app for system health monitoring

One application can have many roles, but a role can only be assigned to one app.

Application roles are configured within the `applications` section of an AMAPI policy and are supported on fully managed, dedicated, and work profile deployment scenarios, depending on the role.

For custom DPC implementations, roles are not applicable - they are an AMAPI-only feature.

[Learn more](https://developers.google.com/android/management/app-roles).