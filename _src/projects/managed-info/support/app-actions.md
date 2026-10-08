---
title: Trigger MANAGED INFO app actions
parent: MANAGED INFO support
published: '2026-10-08'
status: publish
author: 'Jason Bayton'
excerpt: 'Configure sounds in MANAGED INFO and request playback from another app.'
type: project-docs
tags:
    - 'Managed Info'
    - 'bayton-projects'
categories:
    - Managed Info Features
layout: base.njk
eleventyNavigation:
    order: 10
    title: App actions
---

App actions let another app on the device request an operation from MANAGED INFO. The administrator enables the feature and configures the available assets through managed configuration. The caller sends a broadcast identifying the action and asset to use.

The currently supported action is **Play sound** (`play_sound`). You could use it for a support button in [MANAGED SETTINGS](/projects/managed-settings/support/custom-intents/), or an automation that plays a short sound on a managed device. Playback can happen without opening a MANAGED INFO screen.

App actions are disabled by default. They are available in MANAGED INFO 1.2.0.1 and later. If **App actions** is missing from your EMM's configuration form, check the installed version and refresh the app's configuration schema in the EMM.

## Configure app actions

1. Open MANAGED INFO's managed configuration in your EMM.
2. Find **App actions** and turn on **Enable app actions**.
3. Set an **Action token** if you want callers to provide a shared token. Use a long, randomly generated value.
4. Add a **Sound** entry with a unique ID and the HTTPS download URL for your audio file. Optionally provide its SHA-256 hash.
5. Apply the configuration and open MANAGED INFO so it can load the policy and cache the sound.
6. Wait for the sound to be cached before sending the playback request.

<div class="responsive-table-wrapper">

| Field | Configuration key | Value |
| --- | --- | --- |
| App actions | `app_actions` | Bundle containing the settings below. |
| Enable app actions | `app_actions_enabled` | Boolean, `false` by default. |
| Action token | `app_actions_token` | Optional shared token. Empty by default. |
| Sound actions | `app_action_sounds` | Repeatable sound entries. |
| Sound ID | `sound_id` | 1 to 64 characters: letters, numbers, hyphens or underscores. Use a unique ID for each sound. |
| Download URL | `sound_url` | Direct HTTPS URL accessible to the device. URLs containing an embedded username or password are rejected. |
| Sound file SHA256 | `sound_sha256` | Optional SHA-256 of the audio file, as 64 hexadecimal characters or a base64 digest. Empty disables the hash check. |

</div>

If the token is blank, any app on the device can request an enabled, configured action. If you set a token, the caller must send the exact same string. The token does not give the caller control over which sounds are configured.

This example is the managed-configuration portion of the MI policy. Replace the URL and token before deploying it:

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

## Sound files and caching

Each sound must be no larger than **25 MiB** (26,214,400 bytes) and no longer than **30 seconds**. The device must be able to read and play the file. MANAGED INFO checks the duration during caching and verifies the hash when one is configured.

The caller supplies the configured sound ID. The download URL comes from the administrator's policy. Once cached, the sound can play without downloading it again for each request.

Changing a sound's URL or SHA-256 makes the existing cache stale and queues a replacement. If you replace the file at the same URL, update the configured hash or use a new URL. With an unchanged URL and no hash, MI can continue using the cached file.

A request made before the current sound is cached is ignored with **Sound not cached**, and MI queues a cache attempt. That request is not replayed automatically. Send it again after caching succeeds.

Disabling app actions rejects further requests. Removed sound entries are no longer callable, and MI's cache worker removes their cached assets when it processes the updated configuration.

## Broadcast contract

Send a broadcast to the production MI receiver using these values:

<div class="responsive-table-wrapper">

| Intent field | Value |
| --- | --- |
| Package | `org.bayton.managedinfo` |
| Receiver class | `org.bayton.managedinfo.receivers.AppActionReceiver` |
| Intent action | `org.bayton.managedinfo.action.APP_ACTION` |
| String extra `action` | `play_sound` |
| String extra `id` | The configured `sound_id`, for example `support-tone`. |
| String extra `token` | Required when MI has a nonblank action token. Otherwise omit it. |

</div>

The intent's action identifies the receiver contract. The extra named `action` identifies the operation MI should perform. Both are needed.

All three extras are **strings**, including IDs or tokens that happen to contain only numbers. Target MI's package and receiver explicitly. For a development build, change the package to `org.bayton.managedinfo.dev`; the receiver class and intent action stay the same.

The receiver supports `play_sound` only. It does not provide commands for opening Device details, changing volume, or passing an arbitrary sound URL.

## Trigger from MANAGED SETTINGS

Add a broadcast entry to MS's **Custom intents** configuration:

```json
{
  "customIntents": [
    {
      "name": "Play support tone",
      "description": "Play the sound configured by IT",
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

Use the same ID and token as the MI configuration. Remove the token entry if MI's action token is blank. MS custom entries start disabled, so explicitly enable the entry as shown above. See [Configure custom intents](/projects/managed-settings/support/custom-intents/) for the other fields and limits.

MS acknowledges **Broadcast sent. A screen may not open.** This confirms that MS sent the request; check MI's feedback when playback does not happen.

## Trigger from Home Assistant

The Android Companion app supports a [broadcast intent notification command](https://companion.home-assistant.io/docs/notifications/notification-commands/#broadcast-intent). Use this action in your script or automation, replacing the device notification action and token:

```yaml
- action: notify.mobile_app_your_device
  data:
    message: command_broadcast_intent
    data:
      intent_package_name: org.bayton.managedinfo
      intent_class_name: org.bayton.managedinfo.receivers.AppActionReceiver
      intent_action: org.bayton.managedinfo.action.APP_ACTION
      intent_extras: "action:play_sound:String,id:support-tone:String,token:REPLACE_WITH_YOUR_MI_TOKEN:String"
```

The explicit `String` types prevent a numeric ID or token being converted to another type. If no token is configured, remove the `token` portion. For values containing delimiters such as commas or colons, follow the Companion app's documented URL-encoded string format.

## Test with ADB

After configuring and caching the sound, you can send the same request from a connected computer:

```sh
adb shell am broadcast \
  -n org.bayton.managedinfo/org.bayton.managedinfo.receivers.AppActionReceiver \
  -a org.bayton.managedinfo.action.APP_ACTION \
  --es action play_sound \
  --es id support-tone \
  --es token REPLACE_WITH_YOUR_MI_TOKEN
```

Remove the final token argument if none is configured. ADB's broadcast completion message does not confirm that MI played the sound.

To inspect action and cache diagnostics:

```sh
adb logcat -s AppAction AppActionReceiver AppActionAssetWorker PlaySoundAction
```

## Feedback and troubleshooting

Sound-cache results are reported to EMMs that display keyed app feedback under `app_action.asset.<sound_id>`. A successful download reports **Sound cached**. Failure messages include **Sound download failed**, **Sound exceeds 25 MB**, **Sound is longer than 30 seconds**, and hash-validation errors.

Ignored requests and playback failures are logged. MI also shows an **App action ignored:** or **App action failed:** toast while its UI is in the foreground. A successful request may leave the caller on the same screen.

<div class="responsive-table-wrapper">

| Message or symptom | What to check |
| --- | --- |
| App actions disabled | Enable `app_actions_enabled` in MI's managed configuration. |
| App action token missing or invalid | Send the exact token from MI's policy as a string extra. |
| Unknown app action | The string extra `action` must be `play_sound`. |
| Missing or invalid id | Use a valid configured sound ID, with matching case. |
| Sound ID not configured | Check the ID, the applied policy and whether the sound entry has a valid ID and HTTPS URL. |
| Sound not cached | Wait for the cache worker, check download feedback, then send a new request. |
| Playback throttled | Wait at least one second between playback requests. |
| Playback failure | Check that the device can play the cached file. |
| Request sent but no sound heard | Check MI's logs, device audio settings and whether output is routed to another device. |

</div>

Playback uses the device's audio settings. There is no volume parameter in the app-action contract. Starting another accepted sound replaces the sound currently playing.
