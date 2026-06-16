---
title: DOCUMENT APP GENERATOR quick start
parent: DOCUMENT APP GENERATOR support
published: '2026-06-15'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: ['Document App Generator', 'bayton-projects']
categories: ['Document App Generator Setup']
layout: base.njk
eleventyNavigation:
    order: 0
    title: Quick start
---

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">Head's up</div>

DOCUMENT APP GENERATOR runs in the browser. There is nothing to install locally and no Android development environment to set up. You'll need at least one document source, and an EMM or `adb` to deploy the generated app.

</div>

## Prepare

Before you build, have the following to hand:

- One or more **documents** to embed, or HTTPS URLs the generated app can fetch. PDF and EPUB can be up to 150 MiB; other supported types are capped at 32 MiB.
- Optional **folder** names and ids if the library should be grouped.
- A short **app name**, optional **app icon**, **theme colour**, and **accent colour**.
- If you intend to release-sign, your **JKS or PKCS12 keystore** plus the alias and passwords.
- If you're rebuilding an existing app, the **update code** from the original build.

## Build the application

1. Open [gen.bayton.org/documents](https://gen.bayton.org/documents/). Use Studio for the guided flow or the classic form for a single-page build.
2. If you have a previous `docs_config.json`, import it first. Built-in document files and icons are not stored in the JSON, so attach those again before building.
3. Set the app name, icon, theme colour, accent colour, default view, and theme mode.
4. Add at least one document. You can embed files into the APK, drop several files or a whole folder, or configure URL sources.
5. Add folders if needed, then assign documents to folders from each document row.
6. Configure sync behaviour, network timeout, and whether HTTP sources are allowed.
7. Pick the signing mode: Bayton-signed, release-signed with your own key, or debug for local testing.
8. Pick APK or AAB, then submit the build.

## After the build

The result page contains:

- A download link for the signed APK or AAB.
- A source archive containing the generated Android project.
- A re-importable `docs_config.json`.
- A one-time update code for rebuilding under the same Android package name.
- The builder version used to generate the app.

<div class="callout callout-orange">
<div class="callout-heading">Save the update code</div>

The update code is required to keep the same Android package name across rebuilds. Without it, the next build is a new app and will not update devices already running the earlier package.

</div>

## Deploy

Deploy the generated APK or AAB through your EMM as you would any other private managed app. Attach managed configuration if the EMM should update sources, folders, sync policy, network policy, theme mode, accent, or default view after install.

Built-in documents are copied from APK assets into private app storage. URL documents are fetched by the generated app, validated, stored privately, and refreshed by background sync.

Generated apps request `INTERNET` and `ACCESS_NETWORK_STATE`. They do not need runtime storage permission because documents live in private app storage.

## Validate

After install, open the generated app and run a manual sync. Check the library status line, then open representative files from each type you plan to deploy.

For deeper sync diagnosis, capture:

```sh
adb logcat -s ManagedDocsSync
```
