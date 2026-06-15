---
title: CONTACTS APP GENERATOR troubleshooting
parent: CONTACTS APP GENERATOR support
published: '2026-06-15'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: ['Contacts App Generator', 'bayton-projects']
categories: ['Contacts App Generator Troubleshooting']
layout: base.njk
eleventyNavigation:
    order: 3
    title: Troubleshooting
---

## Contacts do not appear

Check the generated app has contacts permission. On managed devices, grant this through policy where your EMM supports runtime-permission control.

Then confirm at least one source is enabled and valid. Built-in sources are available immediately; URL sources need the device to reach the URL from its managed network.

In a work profile deployment, contacts are written into the work profile. Personal-profile dialler, caller ID, search, and mail visibility depend on Android Enterprise cross-profile contact policy and OEM behaviour. If contacts appear inside the generated app but not in personal apps, treat that as a profile-policy question before treating it as a sync failure.

## URL sources fail to sync

Confirm the URL is reachable from the device, not just from an admin workstation. VPN, private DNS, captive portals, and certificate trust often differ between the two.

CAG uses HTTPS by default. If the source URL is `http://`, the app must have been built with **Allow plain HTTP** enabled. Android cleartext policy is baked into the app at build time; managed configuration cannot enable HTTP later for an HTTPS-only build.

URLs with embedded credentials are rejected. Use a managed network boundary or tokenised URL path instead.

If a server returns `304 Not Modified`, CAG treats the source as unchanged and keeps existing contacts for that source. That should not delete contacts.

## CSV imports do not map correctly

CAG auto-detects common CSV headers. If your source uses custom column names, add a CSV mapping JSON object using CAG's canonical field names, for example:

```json
{"given_name":"First Name","family_name":"Surname","phone_mobile":"Mobile"}
```

At minimum, contacts need a display name or enough structured name data to produce one.

If every row shares the same id, the reconciler must disambiguate them. Prefer stable unique ids in the source when possible.

## Built-in files disappear after import

`contacts_config.json` stores configuration, not uploaded file binaries. When rebuilding from an imported config, re-attach built-in VCF, CSV, or JSON files before submitting.

The same applies to a custom app icon.

## Managed config does not change HTTP behaviour

`network_allow_http` is visible in managed configuration, but it can only work if the original build enabled cleartext support. If a build was created with HTTP disabled, rebuild with **Allow plain HTTP** enabled.

The global accent colour is a flat managed-config key: use `branding_accent` with a valid `#rgb` or `#rrggbb` value. This path was validated through Android's managed-configuration APIs in CAG 1.0.19. If an invalid colour is pushed, the generated app falls back to its baked accent rather than failing to render. The display options `branding_theme_mode`, `branding_list_layout`, `branding_grouping`, and `branding_avatar` are also flat keys and lock the corresponding user setting when pushed.

## Managed contacts remain after changing account name

Changing the contacts account name is a destructive rebuild of the managed account set. The current generated app is designed to remove the old app-owned account and recreate contacts under the new account on sync. If old contacts remain, check the app has contacts permission and run a manual sync.

## Sync diagnostics

The app exposes status and troubleshooting screens. For detailed logs, enable verbose logging and use:

```sh
adb logcat -s ManagedContactsSync
```

Verbose logging is noisy; disable it after diagnosis.

The Status screen is the first place to check. It shows overall health, source state, last attempt, last success, and managed contact count. Compatible EMMs can also receive keyed app-state status without contact payloads.
