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
| Target URL | The URL the wrapper opens to. HTTPS preferred; HTTP auto-enables cleartext for the target hostname only. Must be HTTP or HTTPS, use a hostname rather than an IP literal, and contain no embedded credentials | String | `url` | (required) |
| Application name | User-visible name in the Android app list and splash screen | String | `app_name` | Hostname, then `Web App` |
| Application icon | PNG, auto-rescaled to launcher icon densities. Default app-gen Bayton mark if omitted | File | `icon` | (none) |
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

`respect_insets` only matters in Full screen mode. Leave it on for devices with display cut-outs, camera holes, rounded corners or unusual system-bar behaviour. Turn it off only when the web experience is deliberately designed to use every pixel edge-to-edge.

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

Camera, microphone and geolocation also depend on normal WebView rules. The page should be served over HTTPS, must request the capability through the appropriate web API, and still needs the user to approve the runtime permission prompt. WAG can declare the Android permission; it cannot grant a website access without the normal browser-style prompt.

External links are locked to the registered host by default. With the toggle off, same-host navigation stays inside the wrapper, main-frame `tel:`, `mailto:`, `sms:` and `geo:` links can hand off to the relevant system app from a user tap, and off-host navigation is blocked. `intent://` URLs and sub-frame escapes are blocked.

Trust user CAs is on by default for enterprise deployments where MDM-distributed root certificates, SSL inspection or internal certificate authorities are common. Turn it off for higher-sensitivity deployments where the wrapper should trust only Android's system CA store.

## Behaviour

<div class="responsive-table-wrapper">

| Field | Description | Type | Form key | Default |
|-------|-------------|------|----------|---------|
| Pull to refresh | Swipe-down-to-reload gesture. Only fires when the page is scrolled to the top, so doesn't fight normal scrolling | Boolean | `allow_pull_to_refresh` | False |
| Keep screen on | Applies `FLAG_KEEP_SCREEN_ON`. Prevents dimming or sleep while the app is foregrounded. Natural pairing with Full screen | Boolean | `keep_screen_on` | False |
| Block screenshots | Applies `FLAG_SECURE`. System refuses screenshots and screen recording, app switcher shows a blank preview. For wrappers over sensitive content | Boolean | `screenshot_block` | False |
| User-Agent override | Replaces the WebView's default UA string. Most cases should leave this blank | String | `user_agent` | (none) |

</div>

`allow_pull_to_refresh` wraps the WebView in a native swipe-to-refresh container. It only fires when the page is already scrolled to the top, so normal page scrolling continues to work.

`screenshot_block` applies Android's `FLAG_SECURE`. It blocks screenshots, screen recording and the live app preview in the system app switcher, but it does not prevent another device taking a photo of the screen.

`user_agent` is capped at 512 characters. Use it for legacy server-side routing only; modern responsive sites should normally detect capabilities rather than a custom string.

## Signing

<div class="responsive-table-wrapper">

| Field | Description | Type | Form key | Default |
|-------|-------------|------|----------|---------|
| Sign mode | Which signing path the build uses | Enum | `sign_mode` | `debug` |
| Keystore | JKS or PKCS12 keystore. Required for `release` mode | File | `keystore` | (none) |
| Key alias | Alias inside the keystore. Required for `release` mode | String | `key_alias` | (none) |
| Store password | Keystore password. Required for `release` mode | String | `store_password` | (none) |
| Key password | Key password. Required for `release` mode | String | `key_password` | (none) |
| Update code | One-time code from a previous build. Supply to keep the same Android package name | String | `update_code` | (none) |

</div>

`sign_mode` accepts `bayton` (signed with Bayton's certificate, unique package name per build unless an update code is supplied), `release` (signed with the uploaded keystore), or `debug` (auto-signed with an Android debug key; sideload testing only).

<div class="callout callout-blue">
<div class="callout-heading">Update codes</div>

Every new build returns a one-time update code, shown exactly once. Quote it on a future build to keep the same Android package name (required for EMM silent updates and for republishing to the same Managed Google Play listing). Only a SHA-256 hash is kept server-side, so the raw code cannot be recovered.

</div>

## Output

<div class="responsive-table-wrapper">

| Field | Description | Type | Form key | Default |
|-------|-------------|------|----------|---------|
| Output format | Build artefact format | Enum | `output_format` | `apk` |

</div>

`output_format` accepts `apk` (direct install via EMM push or sideload) or `aab` (required for upload to Managed Google Play; smaller per-device download after Play handles density and ABI splits).

## Configuration import / export

Every build ships an exported `web_app_config.json` file alongside the APK or AAB. This is a portable copy of the build settings, including the update code, useful for auditing the deployment or re-importing into a future build.

The export captures URL, app name, theme colour, display mode, orientation, output format, signing mode, runtime toggles, user-agent override and update code. It does not include icon bytes, keystore files or signing passwords; those must be supplied again on rebuild.

Because the export contains the update code, treat it as sensitive. Anyone with that file can rebuild against the same package name while the package registry entry exists.

## Runtime capabilities

<div class="responsive-table-wrapper">

| Capability | Behaviour |
|------------|-----------|
| Service workers / offline cache | Supported by Android WebView. PWA-style offline fallbacks can work if the site implements them |
| Built-in offline fallback | Network failures on top-level navigation render a bundled "webpage unavailable" page |
| File downloads | Passed to Android DownloadManager, with the usual system notification and Files app integration |
| File uploads | `<input type="file">` opens the Android document picker |
| Cookies | Persist in the wrapper's own cookie jar, separate from Chrome and other wrappers |
| Web push notifications | Not supported; WAG does not bridge web push to FCM |
| Deep links into the wrapper | Not supported; generated apps expose a launcher entry point, not URL intent filters |
| Cleartext HTTP | Enabled only for the registered host when the target URL itself is HTTP |

</div>

## Source archive

Every successful build also exposes a source archive containing the post-substitution Android project. This is useful when you need to audit what was compiled, keep evidence for change control, or rebuild independently.

The archive includes the generated Kotlin, XML, Gradle files and a small build metadata file. It does not include uploaded keystores or signing passwords. Debug builds work out of the box; release builds require `signing.properties` to be filled in from the included template.

## API endpoints

WAG is primarily designed as a browser tool. API access is available, but not public; it can be enabled commercially for customers who need to integrate wrapper builds into CI/CD or other internal automation flows.

These are the service surfaces integration work would build around:

<div class="responsive-table-wrapper">

| Endpoint | Purpose |
|----------|---------|
| `POST /api/build` | Submit a multipart build request using form fields or a full `config_json` import |
| `GET /api/status/{id}` | Poll build status, including queue position and estimated wait |
| `GET /api/download/{id}` | Download the generated APK or AAB once the build is complete |
| `GET /api/source/{id}` | Download the generated Android source archive |
| `GET /api/web-app-config/{id}` | Download the exported `web_app_config.json` |
| `GET /api/config` | Read service feature flags, such as Bayton signing availability |
| `GET /api/stats` | Read the public `total_apps` counter, scoped to the active WAG package prefix and cacheable for 60 seconds |
| `GET /api/version` | Read the current WAG release version |
| `POST /api/feedback` | Submit product feedback from Studio or the classic form |
| `GET /healthz` | Liveness probe for service monitoring |

</div>

Download links are intentionally short-lived. Build artefacts expire after first access and are purged after the retention window, so keep the exported config and update code with your deployment records.
