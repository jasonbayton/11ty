---
title: WEB APP GENERATOR configurations
parent: WEB APP GENERATOR support
published: '2026-05-21'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags:
    - 'Web App Generator'
    - 'bayton-projects'
categories:
    - Web App Generator Configuration
layout: base.njk
eleventyNavigation:
    order: 2
    title: Supported configurations (form fields)
---

<div class="callout callout-orange">
<div class="callout-heading">
Default behaviour heads-up
</div>

Out of the box, opt-in permissions (camera, microphone, geolocation, external links) are off. JavaScript and cookies are on. Trust user CAs is on. Display mode defaults to Standalone. The wrapped app will load HTTPS URLs as-is and HTTP URLs via an auto-generated per-host cleartext exception.

</div>

The following configurations are available for WEB APP GENERATOR:

## Identity

<div class="responsive-table-wrapper">

| Field | Description | Type | Form key | Default |
|-------|-------------|------|----------|---------|
| Target URL | The URL the wrapper opens to. HTTPS preferred; HTTP auto-enables cleartext for the target host only | String | `url` | (required) |
| Application name | User-visible name in the Android app list and splash screen | String | `app_name` | (required) |
| Application icon | PNG, auto-rescaled to launcher icon densities. Generic Bayton mark if omitted | File | `icon` | (none) |
| Theme colour | Splash background, status bar, navigation bar, and (in Minimal UI) toolbar. Foreground contrast computed via WCAG luminance | Hex string | `theme_color` | `#ffffff` |

</div>

## Display

<div class="responsive-table-wrapper">

| Field | Description | Type | Form key | Default |
|-------|-------------|------|----------|---------|
| Display mode | System chrome visibility | Enum | `display_mode` | `standalone` |
| Respect insets | When in Full screen, reserve padding around camera notches. Off uses the full screen edge-to-edge | Boolean | `respect_insets` | True |
| Orientation | Locks the activity orientation | Enum | `orientation` | `auto` |

</div>

`display_mode` accepts `standalone` (system bars visible, no URL chrome), `minimal_ui` (slim toolbar with URL and refresh), or `fullscreen` (system bars hidden; pair with Keep screen on for kiosk and signage).

`orientation` accepts `auto`, `portrait`, or `landscape`.

## Permissions

<div class="responsive-table-wrapper">

| Field | Description | Type | Form key | Default |
|-------|-------------|------|----------|---------|
| Allow camera | Required for `getUserMedia({ video: true })` | Boolean | `allow_camera` | False |
| Allow microphone | Required for `getUserMedia({ audio: true })` | Boolean | `allow_microphone` | False |
| Allow geolocation | Required for the HTML5 Geolocation API | Boolean | `allow_geolocation` | False |
| Allow external links | When off, navigation is locked to the registered URL and its subdomains. When on, the WebView follows any link inside itself | Boolean | `allow_external_links` | False |
| Allow JavaScript | Required by virtually all modern web apps. Off only for static or content-only sites | Boolean | `allow_javascript` | True |
| Allow cookies | Required for any session-based authentication. Off only for kiosk-style locked-down apps | Boolean | `allow_cookies` | True |
| Trust user CAs | Honour user-installed CA certificates (the enterprise trust store). Off forces the WebView to use only system CAs | Boolean | `trust_user_cas` | True |

</div>

When an opt-in permission is off, the underlying Android permission is not declared at all and the corresponding API call fails silently. When on, the runtime permission is requested the first time the page asks; users can revoke later via Android Settings without breaking the app.

## Behaviour

<div class="responsive-table-wrapper">

| Field | Description | Type | Form key | Default |
|-------|-------------|------|----------|---------|
| Pull to refresh | Swipe-down-to-reload gesture. Only fires when the page is scrolled to the top, so doesn't fight normal scrolling | Boolean | `allow_pull_to_refresh` | False |
| Keep screen on | Applies `FLAG_KEEP_SCREEN_ON`. Prevents dimming or sleep while the app is foregrounded. Natural pairing with Full screen | Boolean | `keep_screen_on` | False |
| Block screenshots | Applies `FLAG_SECURE`. System refuses screenshots and screen recording, app switcher shows a blank preview. For wrappers over sensitive content | Boolean | `screenshot_block` | False |
| User-Agent override | Replaces the WebView's default UA string. Most cases should leave this blank | String | `user_agent` | (none) |

</div>

## Signing

<div class="responsive-table-wrapper">

| Field | Description | Type | Form key | Default |
|-------|-------------|------|----------|---------|
| Sign mode | Which signing path the build uses | Enum | `sign_mode` | `bayton` |
| Keystore | JKS or PKCS12 keystore. Required for `release` mode | File | `keystore` | (none) |
| Key alias | Alias inside the keystore. Required for `release` mode | String | `key_alias` | (none) |
| Store password | Keystore password. Required for `release` mode | String | `store_password` | (none) |
| Key password | Key password. Required for `release` mode | String | `key_password` | (none) |
| Update code | One-time code from a previous build. Supply to keep the same Android package name | String | `update_code` | (none) |

</div>

`sign_mode` accepts `bayton` (signed with Bayton's certificate, unique package name per build unless an update code is supplied), `release` (signed with the uploaded keystore), or `debug` (auto-signed with an Android debug key; sideload testing only).

<div class="callout callout-blue">
<div class="callout-heading">Update codes</div>

Every build returns a one-time update code, shown exactly once. Quote it on a future build to keep the same Android package name (required for EMM silent updates and for republishing to the same Managed Google Play listing). Only a SHA-256 hash is kept server-side, so the raw code cannot be recovered.

</div>

## Output

<div class="responsive-table-wrapper">

| Field | Description | Type | Form key | Default |
|-------|-------------|------|----------|---------|
| Output format | Build artefact format | Enum | `output_format` | `apk` |

</div>

`output_format` accepts `apk` (direct install via EMM push or sideload) or `aab` (required for upload to Managed Google Play; smaller per-device download after Play handles density and ABI splits).
