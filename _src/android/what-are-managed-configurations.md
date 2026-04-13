---
title: 'What are managed configurations?'
published: '2025-01-15'
status: publish
author: 'Jason Bayton'
excerpt: 'An overview of managed configurations (app config) in Android Enterprise - what they are, how they work, and how administrators use them.'
type: documentation
tags:
    - General
eleventyNavigation:
  order: 5000
layout: base.njk
sources:
  - https://developer.android.com/work/managed-configurations
  - https://developers.google.com/android/work/play/emm-api/managed-configurations
---

Managed configurations - historically referred to as app configuration, managed app config, or application restrictions - allow administrators to remotely push settings to applications on managed Android devices through their EMM.

Rather than manually configuring each app on each device, an administrator defines key-value pairs provided by an application in their EMM console that are delivered to the app silently. The app reads these values and adjusts its behaviour accordingly.

Common examples include:

- Pushing Exchange server details to an email app
- Setting a homepage or proxy in Chrome
- Configuring VPN connection details
- Enabling or disabling specific app features for different user groups

Managed configurations work on both [fully managed](/android/what-is-android-enterprise-and-why-is-it-used/#diving-deeper-with-work-managed-devices) and [work profile](/android/what-is-android-work-profile/) deployments.

## How it works

The flow involves three parties:

1. **The app developer** declares a configuration schema in an XML file (`app_restrictions.xml`) bundled with the app. This schema defines the available settings, their types, default values, and descriptions
2. **The EMM** reads the schema from Google Play and presents it as a form in the admin console, allowing administrators to set values per-app
3. **The device** receives the configuration and delivers it to the app as a key-value `Bundle`. The app reads these values at launch or when notified of a change

The administrator never interacts with the app directly - everything flows through the EMM and Managed Google Play, or in some cases omits Play entirely.

## What can be configured

The configuration schema supports the following data types:

| Type | Description |
|------|-------------|
| `bool` | True/false toggle |
| `string` | Free-text string |
| `integer` | Whole number |
| `choice` | Single selection from a predefined list |
| `multi-select` | Multiple selections from a predefined list |
| `hidden` | A value transferred to the app but not shown in the EMM UI |
| `bundle` | A group of nested settings |
| `bundle_array` | An array of grouped settings (Android 6.0+) |

Bundles and bundle arrays allow complex, nested configurations. For example, a VPN app might define a `bundle_array` of VPN profiles, each containing a server address, username, and authentication type.

Android Enterprise validation requires EMMs to support up to **four levels of nesting** in managed configurations, but in some cases, for example OEM config, this can go up to 9 levels deep in nested configuration.

## What administrators see

When an administrator selects an app in their EMM console and opens its configuration, the EMM renders a form based on the schema declared by the app developer. Each setting appears with its title, description, type, and default value.

Not all apps support managed configurations. If an app does not include an `app_restrictions.xml` schema, there is nothing for the EMM to display or configure. Whether an app supports managed configurations is visible on its Managed Google Play listing. Note that AMAPI can only retrieve managed configuration schemas from production-published apps - apps distributed via closed or internal test tracks may not surface their configurations. See [Why don't managed configurations work with app tracks?](/android/android-enterprise-faq/managed-configs-app-tracks/) for details.

## Keyed app states (feedback)

Apps can send feedback to the EMM about the result of applying a configuration. For example, an email app might report whether the Exchange connection was successful or failed after receiving server details via managed config.

This feedback mechanism is called **keyed app states**. It allows administrators to see, directly in their EMM console, whether a configuration was applied successfully - without needing to check the device manually.

## Limitations

- **App must support it** - managed configurations only work if the app developer has implemented the schema. There is no way to force-configure an app that doesn't declare support
- **Not real-time** - configuration delivery depends on the device checking in with the EMM/receiving the new config via DPC. Changes are typically applied within minutes, but there is no guaranteed delivery time
- **Schema is public** - any EMM can read the schema from Google Play. There is no mechanism for an app to restrict its configuration to specific EMMs

## Managed configurations vs managed Google Play iFrame

Administrators interact with managed configurations in two ways depending on the EMM:

- **Native EMM UI** - the EMM reads the schema and builds its own configuration form. This is the most common approach and the most flexible
- **Managed Google Play iFrame** - the EMM embeds Google's iFrame, which renders the configuration form directly. This ensures consistency but gives the EMM less control over the UI

Both approaches deliver the same configuration to the device. The difference is purely in the admin experience.
