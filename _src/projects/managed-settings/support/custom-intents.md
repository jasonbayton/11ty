---
title: Configure custom intents in MANAGED SETTINGS
parent: MANAGED SETTINGS support
published: '2026-10-08'
status: publish
author: 'Jason Bayton'
excerpt: 'Add organisation actions for apps, broadcasts, services, and Android settings through managed configuration.'
type: project-docs
tags:
    - 'Managed Settings'
    - 'bayton-projects'
categories:
    - Managed Settings Setup
layout: base.njk
eleventyNavigation:
    order: 2.5
    title: Custom intents
---

<div class="callout callout-orange">
<div class="callout-heading">Available from version 1.0.3.0</div>

Custom intents are included in MANAGED SETTINGS [1.0.3.0](/projects/managed-settings/release-notes/1030/) and later. Check the installed app version before deploying a configuration that uses them.

</div>

Custom intents let you add your own actions above the standard [settings shortcuts](/projects/managed-settings/support/supported-configurations/). A button can open an app or deep link, send a broadcast, start an ordinary service, or open one of the predefined Android settings screens.

You configure these actions through your Enterprise Mobility Management (EMM) platform's managed app configuration, or through a custom Device Policy Controller (DPC). Device users see the buttons; the target and parameters come from the administrator's configuration. Custom intents do not require a licensed organisation ID.

## Add an action

1. Open the managed configuration for MANAGED SETTINGS in your EMM.
2. Find **Custom intents** and add a **Custom intent** entry.
3. Give it a **Name** and **Description**, then choose the **Intent type**.
4. Enter the target details for that type. Use the app developer's documented package, component, action, and parameters.
5. Add any required **Extras**. Custom entries start disabled, so turn **Enabled** on when the action is ready.
6. Save the configuration and send it to a test device.
7. Tap the action and check that the target app performs the expected operation.

An omitted `enabled` value is treated as `false`. Valid, enabled entries appear under **Organisation settings**, above **Network & connectivity**, in the order provided by the configuration. Each uses an organisation icon. If the description is empty, MANAGED SETTINGS shows **No description provided**.

<div class="responsive-table-wrapper">

| Field | Configuration key | What to enter |
| --- | --- | --- |
| Name | `name` | Required button label. |
| Description | `description` | Supporting text beneath the label. |
| Enabled | `enabled` | Off by default (`false`). Turn on to show and allow the action. |
| Intent type | `intentType` | `launch`, `broadcast`, `service`, or `system`. |
| Action | `action` | The action string expected by the target activity, receiver, or service. |
| Package name | `packageName` | Target application ID. Required for services; recommended for broadcasts to a particular app. |
| Class name | `className` | Optional fully qualified activity, receiver, or service class. An explicit component requires both package and class. From 1.0.3.1, a custom activity or broadcast with a class but no package is rejected, even if an action is supplied. |
| Data URI | `dataUri` | Optional intent data, such as a web URL, deep link, or `package:` URI. |
| System action | `systemAction` | A predefined settings action, used with the `system` type. |
| Extras | `extras` | Optional repeatable Key, Type, and Value entries. |

</div>

For direct policy JSON, `customIntents` is an array of these entries inside the application's `managedConfiguration`. The examples on this page show the managed-configuration portion only. They are also useful when preparing a [custom DPC payload](/projects/managed-settings/support/managed-configuration-payload/).

## Choose the intent type

### Launch an activity

Use `launch` when the user should go to an app screen. Supply a package and full class name for a particular activity, or an action and optional data URI for an app that handles that request.

This example opens bayton.org in Chrome. Change the package name if you deploy a different browser.

```json
{
  "customIntents": [
    {
      "name": "Open support website",
      "description": "Open bayton.org in Chrome",
      "enabled": true,
      "intentType": "launch",
      "action": "android.intent.action.VIEW",
      "packageName": "com.android.chrome",
      "dataUri": "https://bayton.org/"
    }
  ]
}
```

An action without a target package can show Android's app chooser when several apps support it. If you need a particular app, specify its package or explicit component. The target activity must be available to MANAGED SETTINGS and permitted to open under the device's policies.

### Send a broadcast

Use `broadcast` when an app exposes a receiver for a documented operation. The receiver decides what happens after delivery, and may carry out the request in the background.

For a request to one enterprise app, set its package name or package and receiver class. A broadcast without a target can reach other matching receivers, so keep credentials scoped to the intended app.

The [MANAGED INFO example below](#play-a-sound-through-managed-info) uses an explicit receiver with string extras.

### Start a service

Use `service` for a target that accepts an ordinary Android service start. Configure either:

- A package name and full service class name.
- A package name and an action that the target service handles.

The service must be exported for use by other apps, and any required caller permission still applies. Android can also restrict service starts while the target is in the background. MANAGED SETTINGS uses `startService()`; a target that specifically requires a foreground-service start needs a compatible integration.

This is an illustrative contract for an enterprise app you control. Replace the package, service class, action, and extra key with the values implemented by that app.

```json
{
  "customIntents": [
    {
      "name": "Refresh enterprise agent",
      "description": "Ask the agent to refresh in the background",
      "enabled": true,
      "intentType": "service",
      "packageName": "com.example.enterpriseagent",
      "className": "com.example.enterpriseagent.RefreshService",
      "action": "com.example.enterpriseagent.action.REFRESH",
      "extras": [
        { "key": "force", "type": "boolean", "value": "true" }
      ]
    }
  ]
}
```

A successful request can leave the user on the same page. The service's own implementation determines whether it updates data, starts another operation, or shows anything.

### Open system settings

Use `system` to select one of the predefined settings actions:

<div class="responsive-table-wrapper">

| Selection | `systemAction` |
| --- | --- |
| Settings | `android.settings.SETTINGS` |
| Wi-Fi settings | `android.settings.WIFI_SETTINGS` |
| Bluetooth settings | `android.settings.BLUETOOTH_SETTINGS` |
| Display settings | `android.settings.DISPLAY_SETTINGS` |
| Sound settings | `android.settings.SOUND_SETTINGS` |
| Security settings | `android.settings.SECURITY_SETTINGS` |
| Application details settings | `android.settings.APPLICATION_DETAILS_SETTINGS` |

</div>

For Application details settings, also provide a `dataUri` such as `package:org.bayton.managedinfo`. The system type uses **System action** and **Data URI**; its target is supplied by Android.

```json
{
  "customIntents": [
    {
      "name": "Managed Info app settings",
      "description": "Open Android's settings for MANAGED INFO",
      "enabled": true,
      "intentType": "system",
      "systemAction": "android.settings.APPLICATION_DETAILS_SETTINGS",
      "dataUri": "package:org.bayton.managedinfo"
    }
  ]
}
```

## Add extras

Extras are parameters that the receiving app reads from the intent. The exact key and value type come from that app's contract. For example, a receiver expecting a Boolean will not normally read the text `"true"` as a Boolean.

Each extra has three fields:

- **Key** (`key`): the exact, case-sensitive parameter name.
- **Type** (`type`): String, Boolean, Integer, or Long. Replace **Choose a type** with the type the target expects.
- **Value** (`value`): a normal text field. MANAGED SETTINGS converts it according to the selected type.

<div class="responsive-table-wrapper">

| Type | JSON type name | Accepted text value |
| --- | --- | --- |
| String | `string` | Exact text, including an empty string. Whitespace and Unicode are preserved. |
| Boolean | `boolean` | `true` or `false`. |
| Integer | `int` | Signed decimal from `-2147483648` to `2147483647`. |
| Long | `long` | Signed decimal from `-9223372036854775808` to `9223372036854775807`. |

</div>

For Boolean, Integer, and Long, enter the value without surrounding whitespace. Integers accept a leading `+` or `-` and leading zeros. In policy JSON, every `value` remains a quoted string, including numeric and Boolean values.

```json
"extras": [
  { "key": "message", "type": "string", "value": "Refresh requested" },
  { "key": "force", "type": "boolean", "value": "true" },
  { "key": "attempts", "type": "int", "value": "3" },
  { "key": "delay_ms", "type": "long", "value": "5000" }
]
```

These keys illustrate the format; the target app must support the keys you send. Arrays, floating-point values, nested objects, and URI objects are outside this version's extras support. A Data URI is configured separately.

Omit `extras`, or send an empty array, when the action has no parameters. An empty string value is valid. A missing value, unknown type, duplicate or blank key, malformed entry, or out-of-range number makes the whole action unavailable. MANAGED SETTINGS will not send a request with only the remaining valid extras. Other valid custom actions remain available.

An action can have up to 32 extras. Each key can contain up to 256 characters, each value up to 4 KiB of UTF-8 text, and keys, types, and values together up to 16 KiB per action.

### Play a sound through MANAGED INFO

First configure [MANAGED INFO](/projects/managed-info/support/) with app actions enabled and a sound whose ID matches the request. The sound must be cached before it can play. If you have configured an app-action token in MI, include the same token in the request.

For reference, the corresponding MI managed configuration is:

```json
{
  "app_actions": {
    "app_actions_enabled": true,
    "app_actions_token": "REPLACE_WITH_YOUR_MI_TOKEN",
    "app_action_sounds": [
      {
        "sound_id": "support-tone",
        "sound_url": "https://example.com/audio/support-tone.ogg",
        "sound_sha256": ""
      }
    ]
  }
}
```

Replace the example URL with a reachable HTTPS URL for your sound. These settings belong to MI. The MS configuration that invokes it is:

```json
{
  "customIntents": [
    {
      "name": "Play support sound",
      "description": "Play the sound configured in MANAGED INFO",
      "enabled": true,
      "intentType": "broadcast",
      "packageName": "org.bayton.managedinfo",
      "className": "org.bayton.managedinfo.receivers.AppActionReceiver",
      "action": "org.bayton.managedinfo.action.APP_ACTION",
      "extras": [
        { "key": "action", "type": "string", "value": "play_sound" },
        { "key": "id", "type": "string", "value": "support-tone" },
        { "key": "token", "type": "string", "value": "REPLACE_WITH_YOUR_MI_TOKEN" }
      ]
    }
  ]
}
```

Replace `support-tone` with your configured sound ID and the token placeholder with your configured token. Remove the token entry if MI does not require one. The example targets production MI; development builds use their own application ID.

The top-level `action` identifies MI's broadcast contract. The extra named `action` asks MI to perform `play_sound`. These are separate fields, despite sharing a name.

MI can reject a request when app actions are disabled, the token is wrong, the sound ID is unknown, or the sound is not cached. Check MI's diagnostics as well as MANAGED SETTINGS' acknowledgement.

## What the user sees

Activity and system actions normally open a screen. Broadcasts and services often perform background work, so MANAGED SETTINGS acknowledges them with:

- **Broadcast sent. A screen may not open.**
- **Service requested. A screen may not open.**

These messages confirm that MANAGED SETTINGS submitted the request. They cannot confirm that the receiving app completed it.

If the target is unavailable, the user sees **This action is not available**. For a broadcast or service blocked by Android, the message is **This action isn't permitted on this device**. Other dispatch errors can show **Couldn't send the request. Please try again**. A broadcast with no matching receiver can still produce the sent acknowledgement, because Android does not return a receiver result to this dispatch path.

## Replace or remove actions

Disable an entry to hide it, remove it from `customIntents`, or send `"customIntents": []` to remove all organisation actions. Withdrawing the entire managed configuration also removes cached custom actions after MANAGED SETTINGS receives and applies the change. Existing intents without extras continue to work.

Check that your EMM actually clears the application's restrictions when you withdraw policy. Omitting an app from a custom DPC's desired policy does not, by itself, prove that its previous application restrictions have been cleared.

## Test on your estate

Install the target app in the same Android user or profile as MANAGED SETTINGS, then test the configured action there. MS does not provide cross-profile dispatch or grant the target additional permissions. Its service/broadcast requests also leave Android's background restrictions in place.

For a sideloaded app that exposes an exported bootstrap receiver, an explicit package/class broadcast can initialize the app without first opening an activity. That was verified on the test Pixel. The receiving app still needs to implement the operation, and a broadcast does not grant AMAPI application roles or ongoing background exemptions.

Start with a test device, the intended EMM editor, and the actual apps you deploy. A schema that reaches Android correctly through a custom DPC also needs to render and save correctly in your EMM. For broader settings compatibility, see the [OEM validation list](/projects/managed-settings/support/oem-support/).

Extra values remain stored locally so MANAGED SETTINGS can invoke the action. Its reporting copy retains keys and types while excluding values, and activation HTTP request/response bodies are not logged. The receiving app controls how it handles and logs delivered parameters. Keep tokens scoped to a package or explicit component.
