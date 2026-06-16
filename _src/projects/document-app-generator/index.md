---
title: DOCUMENT APP GENERATOR
parent: Projects
titleimage: '/img/bayton_logos/app_generator_hero.svg'
date: '2026-06-15'
status: publish
author: 'Jason Bayton'
excerpt: 'Browser-generated managed document library apps for Android Enterprise.'
type: page
layout: project.njk
---

**DOCUMENT APP GENERATOR is a browser-based tool that produces signed Android document-library apps for managed estates, with embedded and URL-backed documents, folder organisation, offline storage, and managed configuration support.**

## What does DOCUMENT APP GENERATOR do?

DOCUMENT APP GENERATOR answers the question: how do we ship a controlled document library to managed Android devices as a real app, without building and maintaining a native Android viewer?

The output is a signed APK or AAB with a branded in-app library. It supports built-in documents baked into the APK, URL documents fetched and stored privately at runtime, folder organisation, list or gallery layouts, and EMM managed configuration for sources, folders, sync, network, appearance, and default view.

DAG is PDF-first through Android `PdfRenderer`, but it is not PDF-only. EPUB opens in a scroll-based in-app reader with JavaScript disabled. Images, text, markdown, HTML, JSON, XML, CSV, and source-code files open inside the generated app, and the app registers as a viewer for supported document intents.

<a class="button" href="support/supported-configurations/">View configurations</a>

## How does DOCUMENT APP GENERATOR do this?

You build through [gen.bayton.org/documents](https://gen.bayton.org/documents/) using either the guided Studio flow or the classic single-page form. Both submit to the same generator pipeline: the server validates your document library configuration, substitutes it into an Android template, compiles, signs and returns the artefact.

Each build includes the signed app, a source archive of the generated Android project, a re-importable `docs_config.json`, and an update code. The app reads baked defaults from the generated config first, then honours EMM managed configuration at runtime. URL documents are reconciled into persistent private app storage so a previously synced library remains available offline.

## Who is DOCUMENT APP GENERATOR for?

- Do you need managed handbooks, procedures, forms, policies, menus, or reference documents available on Android devices?
- Do you want documents stored inside private app storage rather than shared external storage?
- Do you need an EMM to update the document library after install without rebuilding the app?

The primary use case is **managed Android estates** that need a branded document library with offline access and predictable behaviour. This fits employee handbooks, procedures, safety guides, menus, training material, field forms, policy packs, and technical reference bundles where the organisation wants EMM policy to steer the library after install.

## What DOCUMENT APP GENERATOR doesn't do

DAG does not host your documents or provide a content-management system. It consumes documents you embed at build time or URLs you configure for runtime sync.

It also does not bypass Android's platform limits. HEIC and HEIF rendering depends on device codec support, large text-like files are capped lower than PDF/EPUB because they are read into memory, and plain HTTP sources require cleartext support to be enabled at build time.

## What does DOCUMENT APP GENERATOR cost?

DOCUMENT APP GENERATOR is a **free** service. There is no usage cap, no per-build fee and no licence model. Bayton-signed builds are signed with Bayton's certificate at no cost; release-signed builds use whichever keystore you upload.

## Get started

You can use DAG publicly at [gen.bayton.org/documents](https://gen.bayton.org/documents/).

<a class="button" href="https://gen.bayton.org/documents/">Open DOCUMENT APP GENERATOR</a>
<a class="button" href="support/">Documentation</a>
