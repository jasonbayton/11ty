---
title: DOCUMENT APP GENERATOR troubleshooting
parent: DOCUMENT APP GENERATOR support
published: '2026-06-15'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: ['Document App Generator', 'bayton-projects']
categories: ['Document App Generator Troubleshooting']
layout: base.njk
eleventyNavigation:
    order: 3
    title: Troubleshooting
---

## Documents do not appear

Confirm at least one source is enabled. Built-in documents are copied from APK assets into private app storage; URL documents need a successful sync before they appear offline.

If folders are configured, remember folder membership is set on each document. Empty folders are hidden.

Removing a source from configuration removes its stored document on the next reconciliation. Disabled sources are ignored.

## URL documents fail to sync

Confirm the URL is reachable from the device. VPN, private DNS, captive portals, and certificate trust often differ from an admin workstation.

DAG uses HTTPS by default. If the source URL is `http://`, the app must have been built with **Allow plain HTTP** enabled. Android cleartext policy is baked into the app at build time; managed configuration cannot enable HTTP later for an HTTPS-only build.

URLs with embedded credentials are rejected. Use a managed network boundary or tokenised URL path instead.

## A document opens with the wrong viewer or fails validation

DAG derives the document type from the uploaded file or URL extension where possible. Extensionless URL sources are resolved at fetch time from the server `Content-Type`, then by file sniffing where supported.

Supported formats include PDF, EPUB, PNG, JPEG, WebP, GIF, BMP, HEIC, HEIF, plain text, markdown, HTML, JSON, XML, CSV, and common source-code files.

## HEIC or HEIF files do not render

HEIC and HEIF support depends on the device's HEVC decoder. DAG accepts and stores the files, but rendering is best-effort on devices that provide the codec.

## Large documents fail

PDF and EPUB sources can be up to 150 MiB. Other supported document types are capped at 32 MiB because their viewers read the content into memory.

For URL documents, confirm the server supports stable delivery and does not return an HTML error page with a document-like URL.

Large URL downloads stream to disk. Interrupted downloads can resume only when the server provides a validator such as ETag or Last-Modified and the validator still matches the partial download.

## Built-in files disappear after import

`docs_config.json` stores configuration, not uploaded file binaries. When rebuilding from an imported config, re-attach built-in document files before submitting.

The same applies to a custom app icon.

## Sync diagnostics

The app shows sync health in the library status line and exposes a manual Sync action. Compatible EMMs can also receive keyed app-state feedback for sync and configuration status.

For detailed logs, use:

```sh
adb logcat -s ManagedDocsSync
```

The app also reports PII-free sync and configuration status through keyed app states where the EMM supports Android app feedback.

## Managed config does not change HTTP behaviour

`network_allow_http` is visible in managed configuration, but it can only work if the original build enabled cleartext support. If a build was created with HTTP disabled, rebuild with **Allow plain HTTP** enabled.

## A folder exists in config but is not visible

Folders are navigation metadata. A folder appears only when at least one enabled document references that folder id. There is no folder-side membership list in the generated app.
