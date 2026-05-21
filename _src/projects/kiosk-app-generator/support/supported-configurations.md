---
title: KIOSK APP GENERATOR configurations
parent: KIOSK APP GENERATOR support
published: '2026-05-21'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags:
    - 'Kiosk App Generator'
    - 'bayton-projects'
categories:
    - Kiosk App Generator Configuration
layout: base.njk
eleventyNavigation:
    order: 2
    title: Supported configurations (form fields)
---

<div class="callout callout-orange">
<div class="callout-heading">
Default behaviour heads-up
</div>

Out of the box, the launcher renders an empty 3x3 grid in auto orientation with no apps, no wallpaper and the system Settings surface hidden. Apps are not bundled into the launcher; they're referenced by package name and must be installed separately on the target devices, typically by your EMM.

</div>

The following configurations are available for KIOSK APP GENERATOR:

## Identity

<div class="responsive-table-wrapper">

| Field | Description | Type | Form key | Default |
|-------|-------------|------|----------|---------|
| Application name | User-visible name in the Android app list and EMM dashboard. Does not appear on the launcher surface itself | String | `app_name` | (required) |
| Application icon | PNG, auto-rescaled to launcher icon densities. Generic Bayton mark if omitted | File | `icon` | (none) |
| Theme colour | Splash background, status and navigation bar, and the tile accent on the launcher surface. Foreground contrast computed via WCAG luminance | Hex string | `theme_color` | `#ffffff` |
| Banner text | Optional banner rendered above the tile grid. Useful for site name, deployment ID, or operator instructions | String | `banner_text` | (none) |

</div>

## Layout

<div class="responsive-table-wrapper">

| Field | Description | Type | Form key | Default |
|-------|-------------|------|----------|---------|
| Orientation | Locks the launcher activity orientation | Enum | `orientation` | `auto` |
| Columns | Tile-grid column count. Combined with Rows, sets the maximum apps per screen | Integer | `cols` | `3` |
| Rows | Tile-grid row count. Apps beyond rows x cols overflow into a scrollable area | Integer | `rows` | `3` |
| Icon size | Tile-icon density preset. Larger sizes suit standoff kiosk and signage scenarios | Enum | `icon_size` | `medium` |

</div>

`orientation` accepts `auto`, `portrait` or `landscape`. `icon_size` accepts `small`, `medium` or `large`.

The grid is capped at 20x20 (400 tiles total) by the form validator.

## Apps

The app list is submitted as part of the `config_json` payload (see [Configuration import / export](#configuration-import--export) below). Each app entry has the following shape:

<div class="responsive-table-wrapper">

| Field | Description | Type | JSON key | Default |
|-------|-------------|------|----------|---------|
| Package name | Android package identifier of the app to launch | String | `package` | (required) |
| Row | Grid row position (0-indexed) | Integer | `row` | (required) |
| Column | Grid column position (0-indexed) | Integer | `col` | (required) |
| Display label | Override the system app label for this tile only. System label is used if omitted | String | `label` | (none) |

</div>

Apps must already be installed on the target device for the launcher to launch them. KAG does not bundle the referenced apps.

## Folders

Tiles can be grouped into folders, each occupying a single grid position. Same JSON shape:

<div class="responsive-table-wrapper">

| Field | Description | Type | JSON key | Default |
|-------|-------------|------|----------|---------|
| Folder name | User-visible folder label | String | `name` | (required) |
| Row | Grid row position (0-indexed) | Integer | `row` | (required) |
| Column | Grid column position (0-indexed) | Integer | `col` | (required) |
| Background colour | Optional tint for the folder tile | Hex string | `background_color` | (none) |
| Apps | Apps inside the folder. Each entry has `package` and optional `label` | Array | `apps` | `[]` |

</div>

## Wallpaper

A wallpaper source can be a bundled image (uploaded with the build, served from the APK's assets) or a remote URL (fetched on first run).

<div class="responsive-table-wrapper">

| Field | Description | Type | Form key | Default |
|-------|-------------|------|----------|---------|
| Bundled wallpaper file | Image uploaded with the build. JPEG or PNG, up to 8 MiB | File | `wallpaper_file` | (none) |
| Remote wallpaper URL | URL fetched by the launcher on first run. Cached for offline use thereafter | String | `wallpaper_url` | (none) |

</div>

Either field can be set, not both. If neither is supplied, the default Bayton wallpaper ships in the APK assets.

## Settings access

Controls what level of Android Settings exposure end users have from the launcher. Two routes: KAG's own granular per-intent toggles, or delegate to [MANAGED SETTINGS](/projects/managed-settings/) for the same job done by a dedicated utility.

<div class="responsive-table-wrapper">

| Field | Description | Type | Form key | Default |
|-------|-------------|------|----------|---------|
| Use MANAGED SETTINGS | Hide KAG's own settings panel and delegate to MANAGED SETTINGS if installed on the device | Boolean | `use_managed_settings` | False |
| Wi-Fi | Expose Wi-Fi settings intent | Boolean | `settings.wifi` (JSON) | False |
| Bluetooth | Expose Bluetooth settings intent | Boolean | `settings.bluetooth` (JSON) | False |
| Display | Expose display settings intent | Boolean | `settings.display` (JSON) | False |
| Sound | Expose sound settings intent | Boolean | `settings.sound` (JSON) | False |
| Language | Expose language settings intent | Boolean | `settings.language` (JSON) | False |
| Battery | Expose battery settings intent | Boolean | `settings.battery` (JSON) | False |
| Date and time | Expose date / time settings intent | Boolean | `settings.datetime` (JSON) | False |
| Installed apps | Expose installed-apps settings intent | Boolean | `settings.apps` (JSON) | False |

</div>

<div class="callout callout-blue">
<div class="callout-heading">When to use MANAGED SETTINGS instead</div>

KAG's per-intent toggles are sufficient for most fleets. For finer-grained control (e.g. exposing _just_ Wi-Fi without any of the related screens an OEM might bundle alongside it), pair KAG with [MANAGED SETTINGS](/projects/managed-settings/) and flip the **Use MANAGED SETTINGS** toggle on. KAG hides its own settings panel and end users tap through to MANAGED SETTINGS for the configured intents.

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

`output_format` accepts `apk` (direct install via EMM push or sideload) or `aab` (required for upload to Managed Google Play).

## Configuration import / export

Every build ships an exported `kiosk_config.json` file alongside the APK. This is the complete payload that produced the build, useful for auditing the deployment or re-importing into a future build (paste it into the form's **Import config** field to pre-populate every setting).

The schema is documented inline above (each form-field table is the same schema you'll see in the exported file). The file is also available via the capability-gated `/api/kiosk-config/{id}` endpoint while the build artefacts are still live.
