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

Out of the box, the launcher renders an empty 4x5 grid in auto orientation with no apps and the system Settings surface hidden. If no wallpaper is uploaded and no theme colour is explicitly chosen, KAG renders a default procedural gradient wallpaper. Apps are not bundled into the launcher; they're referenced by package name and must be installed separately on the target devices, typically by your EMM.

</div>

The following configurations are available for KIOSK APP GENERATOR:

## Identity

<div class="responsive-table-wrapper">

| Field | Description | Type | Form key | Default |
|-------|-------------|------|----------|---------|
| Application name | User-visible name in the Android app list and EMM dashboard. Does not appear on the launcher surface itself | String | `app_name` | (required) |
| Application icon | PNG, auto-rescaled to launcher icon densities. Default app-gen Bayton mark if omitted | File | `icon` | (none) |
| Theme colour | Splash background, status and navigation bar, and the tile accent on the launcher surface. Foreground contrast computed via WCAG luminance | Hex string | `theme_color` | `#ffffff` |
| Banner text | Optional banner rendered above the tile grid. Useful for site name, deployment ID, or operator instructions | String | `banner_text` | (none) |

</div>

`theme_color` accepts `#rrggbb` or `#rgb`. If a wallpaper is visible, the wallpaper is the visual background; if no wallpaper is present, the theme colour becomes the launcher background and KAG adapts text and system-bar icon contrast automatically.

`banner_text` is capped at 80 characters. It is intentionally short: it is for a site label, device role, deployment note, or simple instruction, not a full help document.

## Layout

<div class="responsive-table-wrapper">

| Field | Description | Type | Form key | Default |
|-------|-------------|------|----------|---------|
| Orientation | Locks the launcher activity orientation | Enum | `orientation` | `auto` |
| Columns | Tile-grid column count. Combined with Rows, sets the fixed grid shape | Integer | `cols` | `4` |
| Rows | Tile-grid row count. Combined with Columns, sets the fixed grid shape | Integer | `rows` | `5` |
| Icon size | Tile-icon density preset. Larger sizes suit standoff kiosk and signage scenarios | Enum | `icon_size` | `medium` |
| Grow icons to fill cell | XL-only toggle that lets icons expand into sparse cells | Boolean | `icon_grow_to_cell` | `false` |

</div>

`orientation` accepts `auto`, `portrait` or `landscape`. `icon_size` accepts `small`, `medium`, `large` or `xl`. The XL preset is 128dp and is most useful for sparse layouts where the standard sizes look undersized; dense grids still shrink icons to fit.

`icon_grow_to_cell` only applies when `icon_size` is `xl`. When enabled, XL becomes a floor rather than a ceiling and icons can expand into available cell space up to 512dp. This is useful for very sparse grids on large landscape displays, but should be used deliberately: Android app icons are commonly authored around 192-432dp, so growing much beyond that can visibly soften bitmap-backed icons. The folder overlay deliberately does not apply this toggle.

The browser form and scripted API submissions that omit `rows` and `cols` both start at 4x5. The grid is capped at 20x20 (400 cells total) by the validator. Apps and folders share the same grid, and two tiles cannot occupy the same row and column. The launcher does not create an overflow page or scrollable area; cells are sized to fit the available viewport, and dense grids reduce tile/icon size accordingly.

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

Apps must already be installed on the target device for the launcher to launch them. KAG does not bundle the referenced apps, and Android's kiosk policy must allow the target packages to launch in lock task.

The package name validator expects a normal Android package identifier: at least one dot, no leading or trailing dot, ASCII letters, numbers, underscores and dots only, and no more than 255 characters.

## Auto-launch

KAG can optionally launch a target package automatically each time the launcher returns to the foreground. The browser form suggests apps already present in the grid or folders, but the package field also accepts a valid package name typed manually.

<div class="responsive-table-wrapper">

| Field | Description | Type | Form key | Default |
|-------|-------------|------|----------|---------|
| Auto-launch app | Android package to launch after the launcher foregrounds | String | `autostart_package` | (none) |
| Auto-launch grace period | Seconds to wait before showing the countdown dialog | Integer | `autostart_grace_seconds` | `10` |

</div>

`autostart_grace_seconds` accepts values from 1 to 60. Empty, zero or invalid managed-configuration values fall back to the generated default of 10 seconds. The target app must be installed on the device and allowed by the active kiosk or lock-task policy; if Android blocks the launch, KAG returns to the grid and shows an operator-facing warning.

## Folders

Tiles can be grouped into folders, each occupying a single grid position. Same JSON shape:

<div class="responsive-table-wrapper">

| Field | Description | Type | JSON key | Default |
|-------|-------------|------|----------|---------|
| Folder name | User-visible folder label | String | `name` | (required) |
| Row | Grid row position (0-indexed) | Integer | `row` | (required) |
| Column | Grid column position (0-indexed) | Integer | `col` | (required) |
| Background colour | Optional colour for the open folder overlay | Hex string | `background_color` | (none) |
| Apps | Apps inside the folder. Each entry has `package` and optional `label` | Array | `apps` | (required) |

</div>

Folders have a 2-app minimum and a 9-app maximum. The closed folder tile shows a small preview of contained apps; tapping opens the folder as an overlay. `background_color` applies to that open overlay, not the closed preview tile, so the main launcher grid stays visually consistent.

Folder apps do not have their own row and column; they render in submission order. Duplicate packages are blocked inside a single folder, but the same package can appear elsewhere if you deliberately want it exposed in more than one place.

## Wallpaper

A wallpaper source can be a bundled image (uploaded with the build, served from the APK's assets) or a remote URL (fetched at runtime).

<div class="responsive-table-wrapper">

| Field | Description | Type | Form key | Default |
|-------|-------------|------|----------|---------|
| Bundled wallpaper file | Image uploaded with the build. JPEG, PNG or WebP, up to 8 MiB | File | `wallpaper_file` | (none) |
| Remote wallpaper URL | HTTPS URL fetched by the launcher at runtime. Cached for offline use thereafter | String | `wallpaper_url` | (none) |

</div>

If an uploaded wallpaper is supplied, it is bundled into the APK. If a remote URL is supplied, the launcher fetches it on-device and caches it. If neither is supplied and no theme colour was explicitly selected, KAG draws the default procedural gradient wallpaper from a vector drawable. If neither is supplied and a theme colour was selected, KAG uses the colour-only background.

## Settings access

Controls what level of Android Settings exposure end users have from the launcher. Two routes: KAG's own granular per-intent toggles, or delegate to [MANAGED SETTINGS](/projects/managed-settings/) for the same job done by a dedicated utility.

<div class="responsive-table-wrapper">

| Field | Description | Type | Form key | Default |
|-------|-------------|------|----------|---------|
| Use MANAGED SETTINGS | Show the MANAGED SETTINGS gear and delegate taps to the MANAGED SETTINGS app | Boolean | `use_managed_settings` | False |
| Enable settings | Master switch for KAG's own settings gear | Boolean | `settings.enabled` (JSON) | False |
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

KAG's per-intent toggles are sufficient for most fleets. For finer-grained control (e.g. exposing _just_ Wi-Fi without any of the related screens an OEM might bundle alongside it), pair KAG with [MANAGED SETTINGS](/projects/managed-settings/) and flip the **Use MANAGED SETTINGS** toggle on. KAG shows the MANAGED SETTINGS gear and end users tap through to MANAGED SETTINGS for the configured intents. If MANAGED SETTINGS is not installed or cannot be launched, the gear remains visible and the tap surfaces an unavailable message.

</div>

Settings panels are still Android Settings activities. If an OEM allows sideways navigation from the target screen to other areas of Settings, KAG cannot prevent that alone. Keep Settings access blocked in policy, and test the exact OEM build before deploying to production.

## Managed configuration

The generated launcher includes a managed configuration schema. This means an EMM can override many runtime values after installation, without rebuilding the APK.

For day-to-day administration, the most useful managed configuration keys are the ones that change the launcher without rebuilding the APK:

<div class="responsive-table-wrapper">

| Key | Description | Notes |
|-----|-------------|-------|
| `banner_text` | Changes the top-strip banner | Good for site name, device role, short operating instruction or deployment ID. Max 80 characters |
| `wallpaper_url` | Changes the wallpaper at runtime | HTTPS only. Cached on-device, so change the URL when replacing the image |
| `theme_color` | Changes the solid-colour background fallback | Affects the post-splash background and system-bar tint. If a wallpaper is visible, the wallpaper wins visually. If the only wallpaper is KAG's default gradient, an EMM-pushed theme colour suppresses it and switches to a flat theme-colour background |
| `rows`, `cols`, `orientation`, `icon_size`, `icon_grow_to_cell` | Changes the fixed launcher layout | Invalid values fall back to the generated default per key. Dense grids shrink tiles/icons to fit rather than scrolling. `icon_grow_to_cell` only has an effect with XL icons |
| `autostart_enabled`, `autostart_package`, `autostart_grace_seconds` | Changes auto-launch behaviour | `autostart_enabled` can disable fleet auto-launch without clearing the baked package. Grace accepts 1-60 seconds; 0 or unset uses the runtime default of 10 seconds. The target package still needs to be installed and lock-task allowed |
| `settings` | Changes the Settings gear behaviour | Can expose KAG's built-in Settings shortcuts or point the gear at MANAGED SETTINGS |

</div>

The advanced managed configuration keys are for replacing whole parts of the launcher:

<div class="responsive-table-wrapper">

| Key | Description | Notes |
|-----|-------------|-------|
| `kiosk_config_json` | Full exported configuration blob | Becomes the baseline config. Useful for importing a known-good generator export, or for EMM consoles that do not render nested folder arrays cleanly |
| `applications` | Replaces the app tile list | Non-empty pushes replace the generated app grid wholesale. Partial app-list overrides are not supported |
| `folders` | Replaces the folder list | Non-empty pushes replace the generated folder set wholesale. Some EMM consoles may struggle with the nested `folder_apps` array; use `kiosk_config_json` if so |

</div>

Typed managed-configuration overrides sit on top of `kiosk_config_json`. A common pattern is to build a clean baseline in the generator, export `kiosk_config.json`, paste it into the EMM as `kiosk_config_json`, then use typed fields for site-specific changes such as wallpaper, banner text or rows and columns.

The `settings` bundle is treated as an override only when it contains at least one enabled value, including `use_managed_settings`. This avoids EMM consoles that auto-save every default value accidentally wiping the generated settings. If the goal is to turn every settings option off, use `kiosk_config_json` and set `"settings": { "enabled": false }` there.

When authoring folder data manually, use the delivered bundle-array shape rather than the manifest wrapper shape. Each folder object carries its fields at the top level:

```json
{
  "folders": [
    {
      "folder_name": "Tools",
      "folder_row": 1,
      "folder_col": 0,
      "folder_apps": [
        { "folder_app_package": "com.android.settings" },
        { "folder_app_package": "com.google.android.deskclock" }
      ]
    }
  ]
}
```

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

Every build ships an exported `kiosk_config.json` file alongside the APK. This is the complete payload that produced the build, including the update code, useful for auditing the deployment or re-importing into a future build (paste it into the form's **Import config** field to pre-populate every setting).

The schema is documented inline above (each form-field table is the same schema you'll see in the exported file). The file is also available via `/api/kiosk-config/{id}` while the build artefacts are still live.

Because the export contains the update code, treat it as sensitive. Anyone with that file can rebuild against the same package name while the package registry entry exists.

## Source archive

Every successful build also exposes a source archive containing the post-substitution Android project. This is useful when you need to audit what was compiled, keep evidence for change control, or rebuild independently.

The archive includes the generated Kotlin, XML, Gradle files and a small build metadata file. It does not include uploaded keystores or signing passwords. Debug builds work out of the box; release builds require `signing.properties` to be filled in from the included template.

## API endpoints

KAG is primarily designed as a browser tool. API access is available, but not public; it can be enabled commercially for customers who need to integrate launcher builds into CI/CD or other internal automation flows.

These are the service surfaces integration work would build around:

<div class="responsive-table-wrapper">

| Endpoint | Purpose |
|----------|---------|
| `POST /api/build` | Submit a multipart build request using form fields or a full `config_json` import |
| `GET /api/status/{id}` | Poll build status, including queue position and builder version |
| `GET /api/download/{id}` | Download the generated APK or AAB once the build is complete |
| `GET /api/source/{id}` | Download the generated Android source archive |
| `GET /api/kiosk-config/{id}` | Download the exported `kiosk_config.json` |
| `GET /api/config` | Read service feature flags, such as Bayton signing availability |
| `GET /api/stats` | Read the public `total_apps` counter, scoped to the active KAG package prefix and cacheable for 60 seconds |
| `GET /api/version` | Read the current KAG release version |
| `GET /healthz` | Liveness probe for service monitoring |

</div>

Download links are intentionally short-lived. Build artefacts expire after first access and are purged after the retention window, so keep the exported config and update code with your deployment records.
