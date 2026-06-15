---
title: DOCUMENT APP GENERATOR configurations
parent: DOCUMENT APP GENERATOR support
published: '2026-06-15'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: ['Document App Generator', 'bayton-projects']
categories: ['Document App Generator Configuration']
layout: base.njk
eleventyNavigation:
    order: 2
    title: Supported configurations
---

<div class="callout callout-orange">
<div class="callout-heading">Default behaviour heads-up</div>

The generated app stores documents in persistent private app storage. Built-in documents are embedded into the APK; URL sources are fetched by the generated app at runtime. DAG does not host your documents.

</div>

## Identity and appearance

| Field | Description | Values / default |
|-------|-------------|------------------|
| App name | Android app label | Required |
| App icon | Launcher icon | Optional |
| Theme colour | Splash/system-bar colour | `#ffffff` |
| Accent colour | Library tint | `#E8552B` |
| Default view | Initial library layout | `list` or `gallery`; default `list` |
| Theme mode | Initial app theme | `light`, `dark`, or `auto`; default `auto` |

The user can change view/theme in-app. Managed configuration sets the managed default; it does not act as a hard lock for DAG theme/view controls.

## Documents

Each source is one managed document. DAG supports built-in documents and URL documents.

Supported content includes PDF, EPUB, PNG, JPEG, WebP, GIF, BMP, HEIC, HEIF, plain text, markdown, HTML, JSON, XML, CSV, and common source-code files.

| Field | Description | Notes |
|-------|-------------|-------|
| Document id | Stable source identifier | Optional but useful for managed config |
| Name | Library display name | Required |
| Type | Built-in file or URL | Required |
| URL | Runtime document URL | URL sources only; HTTPS unless HTTP was enabled at build time |
| File | Embedded document | Built-in sources only |
| Enabled | Whether the source participates in sync/display | Boolean |
| Folder | Folder id this document belongs to | Optional |

PDFs open through Android `PdfRenderer`. EPUB opens in a scroll-based in-app reader with JavaScript disabled, table of contents, reading progress, and font/theme controls. CSV opens as a table, and JSON/XML/source-code documents use in-app syntax highlighting. Animated GIF and animated WebP play where platform support is available; HEIC/HEIF depends on the device codec.

URL documents without a recognised extension can resolve their type at fetch time from the server `Content-Type`. Built-in documents and uploaded files are validated before build.

## Folders

| Field | Description |
|-------|-------------|
| Folder id | Stable folder identifier |
| Folder name | User-visible folder name |
| Colour | Optional folder accent colour |

Folder membership is set on each document with its `folder` value. Empty folders are not shown in the generated app.

There is no folder-side document list in the runtime model. A folder appears only when one or more document sources reference that folder id.

## Behaviour and network

| Field | Description | Values / default |
|-------|-------------|------------------|
| Sync interval | Background refresh cadence | Minimum 15 minutes; default 60 |
| Sync on config change | Best-effort sync after EMM config changes | Default true |
| Sync on network available | Best-effort catch-up sync when connectivity returns | Default true |
| Wi-Fi only | Require unmetered network for sync | Default false |
| Fetch timeout | URL fetch timeout | Default 30 seconds |
| Allow plain HTTP | Permit `http://` sources | Default false; build-time network-security setting |

PDF and EPUB URL sources can be up to 150 MiB. Other supported types are capped at 32 MiB.

URL downloads stream to disk and can resume when the server validator confirms the resource is unchanged. Updates are written atomically so a failed or interrupted update does not destroy the previously cached offline copy.

## Managed configuration

Generated apps read baked defaults first, then Android managed configuration. If `config_json` is non-empty, it is parsed as the full override. Otherwise, structured keys are applied over the baked config. The main keys are:

| Key | Description |
|-----|-------------|
| `config_json` | Full `docs_config.json` override |
| `documents_sources` | Bundle array replacing source list |
| `documents_folders` | Bundle array replacing folder list |
| `sync_interval_minutes`, `sync_on_config_change`, `sync_on_network_available`, `sync_wifi_only` | Sync policy |
| `network_allow_http`, `network_timeout_seconds` | Network policy |
| `ui_default_view` | `list` or `gallery` |
| `branding_theme_mode` | `light`, `dark`, or `auto` |
| `branding_accent` | Library accent colour |

Plain HTTP still requires a build that allowed cleartext traffic. Pushing `network_allow_http=true` later cannot enable HTTP on a build generated with cleartext disabled.

The `documents_sources` bundle array replaces the source list when non-empty. Source entries support `id`, `name`, `type`, `url`, `asset`, `enabled`, and `folder`. The JSON shape also accepts `mime_type`; it is optional and derived when omitted.

The `documents_folders` bundle array replaces folders when non-empty. Folder entries support `folder_id`, `folder_name`, and `colour`.

## Generated app behaviour

The generated app:

- Opens PDFs, EPUBs, images, text, markdown, HTML, JSON, XML, CSV, and source-code files in-app.
- Registers as a viewer for supported Android `ACTION_VIEW` document intents.
- Stores synced URL documents in private app storage, not shared external storage.
- Requests `INTERNET` and `ACCESS_NETWORK_STATE`; it does not need runtime file/storage permission.
- Reports sync and configuration status through keyed app states where the EMM supports Android app feedback.
- Targets API 37 and requires Android 9/API 28 or later to install.

## Developer verification

Managed-device deployments are exempt from Android developer verification enforcement. Bayton-signed builds suit Managed Google Play and direct EMM push. Self-signed builds are the route for organisations that need to own the signing and verification path outside managed-device distribution.

## Signing and output

| Field | Description |
|-------|-------------|
| Output format | APK or AAB |
| Sign mode | Debug, Bayton-signed, or release-signed |
| Keystore inputs | Required only for release-signed builds |
| Update code | Reuses the original Android package name on rebuild |
