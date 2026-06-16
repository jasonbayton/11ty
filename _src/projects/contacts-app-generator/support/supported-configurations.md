---
title: CONTACTS APP GENERATOR configurations
parent: CONTACTS APP GENERATOR support
published: '2026-06-15'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: ['Contacts App Generator', 'bayton-projects']
categories: ['Contacts App Generator Configuration']
layout: base.njk
eleventyNavigation:
    order: 2
    title: Supported configurations
---

<div class="callout callout-orange">
<div class="callout-heading">Default behaviour heads-up</div>

The generated app writes contacts under an app-owned Android account using Android's Contacts Provider. It does not host contacts. Built-in files are embedded into the APK; URL source definitions are bundled into the app config and fetched by the generated app at runtime.

</div>

## Identity and appearance

| Field | Description | Values / default |
|-------|-------------|------------------|
| App name | Android app label | Required |
| App icon | Launcher icon | Optional |
| Theme colour | Splash/system-bar colour | `#ffffff` |
| Accent colour | In-app list tint | `#E8552B` |
| List layout | Contact list density | `cards` or `dense`; default `cards` |
| Grouping | Contact grouping | `source` or `A-Z`; default `source` |
| Avatar style | Contact avatar rendering | `monogram`, `photo`, or `icon`; default `monogram` |
| Theme mode | Initial app theme | `light`, `dark`, or `auto`; default `auto` |

Photo avatars render from inline photo data in VCF sources. Photo URLs are not fetched.

List layout, grouping, avatar style, and theme mode follow a three-layer display preference model: an EMM-pushed `branding_*` value locks the option, otherwise the user's in-app choice wins, otherwise the baked build default is used. Accent colour is EMM-configurable with the flat `branding_accent` key, and can also be changed through full `config_json`.

## Sources

Each source is one contact file. CAG supports:

- Built-in VCF, CSV, or JSON files embedded into the APK.
- URL-backed VCF, CSV, or JSON sources fetched at runtime.

| Field | Description | Notes |
|-------|-------------|-------|
| Source name | Admin-visible source label | Required, unique |
| Type | Built-in file or URL source | Built-in sources need an uploaded file; URL sources need a URL |
| Format | Contact file format | `vcf`, `csv`, or `json` |
| URL | Runtime source URL | HTTPS unless HTTP was enabled at build time |
| Source enabled | Whether the source participates in sync | Default true |
| Source accent | Optional per-source tint | Inherits global accent when empty |
| CSV mapping | JSON object mapping CAG fields to CSV headers | Optional |

Common CSV field names are detected automatically. Use CSV mapping only when headers are non-obvious, for example:

```json
{"given_name":"First Name","family_name":"Surname"}
```

Built-in files are validated before build and are embedded under `assets/contacts/`. The exported `contacts_config.json` stores their asset path and metadata, not the binary file, so built-in files must be re-attached when rebuilding from an imported config.

## Behaviour and network

| Field | Description | Values / default |
|-------|-------------|------------------|
| Contacts account name | Android account holding managed contacts | Required |
| Sync interval | Background refresh cadence | Minimum 15 minutes; default 60 |
| Sync on config change | Best-effort sync after EMM config changes | Default true |
| Sync on network available | Best-effort catch-up sync when connectivity returns | Default true |
| Wi-Fi only | Require unmetered network for sync | Default false |
| Remove missing contacts | Remove contacts no longer present in source | Default true |
| Fetch timeout | URL fetch timeout | Default 30 seconds |
| Allow plain HTTP | Permit `http://` sources | Default false; build-time network-security setting |
| Verbose logging | Extra sync logging | Default false |

The generated app syncs with Android WorkManager and also re-checks config on resume. If a managed-config override is malformed, the app falls back to the baked generated config rather than clearing the managed directory.

## Managed configuration

Generated apps read baked defaults first, then Android managed configuration. If `config_json` is non-empty, it is parsed as the full override. Otherwise, structured keys are applied over the baked config. The main keys are:

| Key | Description |
|-----|-------------|
| `config_json` | Full `contacts_config.json` override |
| `account_name` | Contacts account name |
| `sources` | Bundle array replacing source list |
| `sync_interval_minutes`, `sync_on_config_change`, `sync_on_network_available`, `sync_wifi_only` | Sync policy |
| `contacts_delete_missing` | Contact reconciliation policy |
| `network_allow_http`, `network_timeout_seconds` | Network policy |
| `logging_verbose` | Diagnostic logging |
| `branding_accent` | In-app accent colour |
| `branding_theme_mode`, `branding_list_layout`, `branding_grouping`, `branding_avatar` | Lockable display options |

Plain HTTP still requires a build that allowed cleartext traffic. Pushing `network_allow_http=true` later cannot enable HTTP on a build generated with cleartext disabled.

The `sources` bundle array replaces the generated source list when non-empty. Source entries support `name`, `type`, `url`, `enabled`, `asset`, `format`, `builtin`, `accent_hex`, and `csv_mapping`.

`config_json` uses the exported `contacts_config.json` shape, including `branding.accent_hex`, per-source `accent_hex`, and the nested `sync`, `contacts`, `network`, and `branding` objects.

## Generated app behaviour

The generated app:

- Creates an app-owned Android account for managed contacts.
- Writes contacts into Android system contacts so native apps can use them where profile policy allows.
- Provides an in-app Contacts, Status, Settings, Troubleshooting, and About experience.
- Reports sync and configuration status through keyed app states where the EMM supports Android app feedback.
- Targets API 37 and requires Android 9/API 28 or later to install.

Changing `account_name` is a destructive account move. The app removes old app-owned contacts for the previous account and recreates the managed set under the new account on sync.

## Signing and output

| Field | Description |
|-------|-------------|
| Output format | APK or AAB |
| Sign mode | Debug, Bayton-signed, or release-signed |
| Keystore inputs | Required only for release-signed builds |
| Update code | Reuses the original Android package name on rebuild |
