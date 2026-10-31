---
title: Trigger MANAGED INFO app actions
parent: MANAGED INFO support
published: '2026-10-08'
status: publish
author: 'Jason Bayton'
excerpt: 'Configure MANAGED INFO app actions, including sounds, layout taps and managed webhooks.'
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

Use **Play sound** (`play_sound`) to play a configured sound. You could use it for a support button in [MANAGED SETTINGS](/projects/managed-settings/support/custom-intents/), or an automation that plays a short sound on a managed device. Playback can happen without opening a MANAGED INFO screen.

App actions are disabled by default. Sound playback is available in MANAGED INFO 1.2.0.1 and later. If **App actions** is missing from your EMM's configuration form, check the installed version and refresh the app's configuration schema in the EMM.

**Development build**: Layout tap actions and `send_webhook` are available in `1.3.3.2.1` (version code `13321`). The webhook and layout-tap sections below describe that build. Tap actions also work in configured fullscreen and modal display overrides.

## Configure sound playback

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

For sound and modal actions, a blank token allows any app on the device to request an enabled, configured action. If you set a token, the caller must send the exact same string. The token does not give the caller control over which assets are configured. Webhook broadcasts require a nonblank token and explicit permission on the webhook definition, as described below.

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
| String extra `action` | The action name, for example `play_sound`. |
| String extra `id` | The configured ID for the selected action, for example the sound ID `support-tone`. |
| String extra `token` | Required when MI has a nonblank action token. Otherwise omit it. |

</div>

The intent's action identifies the receiver contract. The extra named `action` identifies the operation MI should perform. Both are needed.

All three extras are **strings**, including IDs or tokens that happen to contain only numbers. Target MI's package and receiver explicitly. For a development build, change the package to `org.bayton.managedinfo.dev`; the receiver class and intent action stay the same.

The sound examples use `play_sound`. The development webhook action uses `send_webhook`; existing display-override actions use `show_modal` and `dismiss_modal`. Callers select configured IDs. They cannot supply an arbitrary asset URL, webhook endpoint, body or headers through the broadcast.

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

## Configure a webhook

1. Open MANAGED INFO's managed configuration in your EMM and enable **App actions**.
2. Add a **Webhook** entry under **Webhook actions**, with a unique ID and the HTTPS endpoint to call.
3. Set the JSON body, headers and cooldown as needed.
4. Leave external calling disabled for layout taps. To accept broadcasts from other apps, enable it for this webhook and set a nonblank **Action token**.
5. Apply the configuration and open MANAGED INFO so it can load the policy.

This example configures a webhook with the ID `front_door`. Use that same ID in the layout or broadcast request:

```json
{
  "app_actions": {
    "app_actions_enabled": true,
    "app_action_webhooks": [{
      "webhook_id": "front_door",
      "webhook_url": "https://example.invalid/api/webhook/REPLACE_WITH_SECRET_ID",
      "webhook_body_json": "{\"event\":\"card_tap\"}",
      "webhook_cooldown_ms": 1000,
      "webhook_allow_external": false,
      "webhook_headers": [{
        "webhook_header_name": "X-Event",
        "webhook_header_value": "tablet-tap"
      }]
    }]
  }
}
```

MI sends an HTTPS POST with `Content-Type: application/json`. The body is a static JSON object; an omitted or blank body sends `{}`. MI does not add device information or the action token to the request automatically. Put request URLs, headers and bodies in managed configuration, and keep credentials out of Layout JSON. Webhook URLs, headers and bodies are omitted from activation-report configuration snapshots and action diagnostics.

<div class="responsive-table-wrapper">

| Field | Configuration key | Value |
| --- | --- | --- |
| Webhook actions | `app_action_webhooks` | Up to 20 entries. A larger list is rejected. All entries sharing an ID are rejected. |
| Webhook ID | `webhook_id` | 1 to 64 letters, numbers, hyphens or underscores. |
| Webhook URL | `webhook_url` | HTTPS, up to 2,048 characters. No embedded username/password, fragment, whitespace or control characters. |
| JSON body | `webhook_body_json` | Static JSON object, up to 8 KiB UTF-8. Blank defaults to `{}`. No templates or substitutions. |
| Headers | `webhook_headers` | Up to 16 entries and 4 KiB total. Each entry has `webhook_header_name` and `webhook_header_value`. Names must be unique ignoring case; values must use printable ASCII. |
| Cooldown | `webhook_cooldown_ms` | 1,000 to 60,000 milliseconds; default 1,000. The first accepted request starts immediately. |
| Allow external callers | `webhook_allow_external` | `false` by default. Broadcast calls require `true` and a nonblank matching action token. |

</div>

The client owns `Host`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Content-Type` and `Cookie`; these cannot be configured as custom headers. Authentication headers can be configured explicitly. Private-network endpoints work when their HTTPS certificate and hostname pass normal Android verification.

Requests are transient. MI does not queue offline webhook calls, follow redirects or retry failed requests. It requests cancellation after five seconds and finishes caller handling within eight seconds. MI allows one outstanding request per webhook and two across the app. Extra activations are dropped while those requests are pending. A slow DNS lookup can keep a request busy beyond its cancellation deadline. Failed attempts consume the cooldown too.

An HTTP 2xx response confirms acceptance by the endpoint. Check the resulting device action separately. A network failure after sending can leave the remote outcome unknown; MI does not replay the request.

## Trigger an action from a layout tap

Layout taps use the same JSON as the [layout card generator](/projects/managed-info/support/layout-card-generator/). Add `onTap` to a node, with an action name and configured ID:

```json
{
  "type": "box",
  "fillMaxWidth": true,
  "paddingDp": 24,
  "onTap": {
    "action": "send_webhook",
    "id": "front_door",
    "label": "Ring doorbell"
  },
  "children": [{"type": "text", "text": "Tap to ring"}]
}
```

Supported action names are `play_sound`, `show_modal`, `dismiss_modal` and `send_webhook`. Existing sound caching and modal visibility rules still apply. The optional `label` describes the accessibility action. It must be nonblank and no longer than 120 characters when supplied. If omitted, MI uses **Activate card**. The label is not displayed on the card.

The tap covers the rendered node and its noninteractive children. An interactive child handles its own tap, including a child with an unavailable action. Its parent does not also run. Scrolling and cancelled gestures do not trigger the action. MI does not monitor touches elsewhere on Android.

Small interactive children retain Compose's expanded touch targets. Give adjacent interactive nodes at least 48 dp of width and height and enough spacing to keep their targets distinct. Closely packed text can fall inside a child's expanded target.

Existing `actionUrl` links continue to work. Configure either `actionUrl` or `onTap` on a node; configuring both with a nonblank URL makes the layout invalid. Removed or disabled actions are rejected when tapped, and an active press is cancelled if its layout or policy is replaced. Layout taps do not need the shared action token embedded in their JSON.

## Invoke a webhook from another app

Enable `webhook_allow_external` for the definition and configure a nonblank `app_actions_token`. Use the existing explicit App Action broadcast, with string extras `action=send_webhook`, the configured ID and token. This example targets the development build:

```sh
adb shell am broadcast \
  -n org.bayton.managedinfo.dev/org.bayton.managedinfo.receivers.AppActionReceiver \
  -a org.bayton.managedinfo.action.APP_ACTION \
  --es action send_webhook \
  --es id front_door \
  --es token REPLACE_WITH_ACTION_TOKEN
```

External callers select a configured ID. They cannot supply the request URL, headers or body. Existing token rules for sound and modal actions are unchanged.

### Call a Home Assistant webhook

Create a dedicated [webhook-triggered automation](https://www.home-assistant.io/docs/automation/trigger/#webhook-trigger) that accepts POST, then put its HTTPS endpoint in `webhook_url`. The automation can ring a chime or perform another configured action. Home Assistant owns any time-of-day condition and automation cooldown. MI's webhook action can also call other services.

The webhook identifier acts as a secret. Start with a test counter, check that one tap produces one request, then connect the intended action. Keep Home Assistant's local-only setting when the tablet can reach it on the same network. The tablet must also trust the endpoint's HTTPS certificate.

## Feedback and troubleshooting

Sound-cache results are reported to EMMs that display keyed app feedback under `app_action.asset.<sound_id>`. A successful download reports **Sound cached**. Failure messages include **Sound download failed**, **Sound exceeds 25 MB**, **Sound is longer than 30 seconds**, and hash-validation errors.

Ignored requests and playback failures are logged. MI also shows an **App action ignored:** or **App action failed:** toast while its UI is in the foreground. A successful request may leave the caller on the same screen.

<div class="responsive-table-wrapper">

| Message or symptom | What to check |
| --- | --- |
| App actions disabled or `disabled` | Enable `app_actions_enabled` in MI's managed configuration. |
| App action token missing or invalid, or `unauthorized` | Send the exact token from MI's policy as a string extra. |
| Unknown app action or `invalid_reference` | Check the action name and configured ID. Webhook and layout-tap actions need the development build described above. |
| Missing or invalid id | Use a valid configured sound ID, with matching case. |
| Sound ID not configured | Check the ID, the applied policy and whether the sound entry has a valid ID and HTTPS URL. |
| Sound not cached | Wait for the cache worker, check download feedback, then send a new request. |
| Playback throttled | Wait at least one second between playback requests. |
| Playback failure | Check that the device can play the cached file. |
| `external_not_allowed` | Enable external calling for the webhook and set a nonblank matching action token. |
| `network_failed`, `http_rejected` or `timed_out` | Check device connectivity, HTTPS trust, endpoint availability and server-side logs. Endpoint values and response bodies are not logged by MI. |
| Webhook does not run again immediately | Check its cooldown and whether an earlier request is still pending. Excess calls are dropped. |
| Request sent but no sound heard | Check MI's logs, device audio settings and whether output is routed to another device. |

</div>

Playback uses the device's audio settings. There is no volume parameter in the app-action contract. Starting another accepted sound replaces the sound currently playing.
