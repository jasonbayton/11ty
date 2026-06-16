---
title: CONTACTS APP GENERATOR
parent: Projects
titleimage: '/img/bayton_logos/app_generator_hero.svg'
date: '2026-06-15'
status: publish
author: 'Jason Bayton'
excerpt: 'Browser-generated managed contacts apps for Android Enterprise.'
type: page
layout: project.njk
---

**CONTACTS APP GENERATOR is a browser-based tool that produces signed Android managed-contacts apps for managed estates, syncing VCF, CSV, or JSON contact sources into an app-owned Android contacts account.**

## What does CONTACTS APP GENERATOR do?

CONTACTS APP GENERATOR answers the question: how do we put an internal contact directory on managed Android devices without Exchange, LDAP, CardDAV, a vendor cloud service, or a custom Android project?

The output is a signed APK or AAB containing a Managed Contacts app. It can embed contact files into the APK for offline use, fetch contact files from HTTPS URLs at runtime, sync on a schedule, and reconcile contacts into the Android system contacts provider under an app-owned account.

That matters because the contacts are not trapped inside a directory viewer. Where Android profile policy permits it, they become available to system contacts, dialler, mail, messaging, search, and caller-ID surfaces. The generated app also provides its own viewer for the full managed record, including fields OEM contact apps may hide or map poorly.

<a class="button" href="support/supported-configurations/">View configurations</a>

## How does CONTACTS APP GENERATOR do this?

You build through [gen.bayton.org/contacts](https://gen.bayton.org/contacts/) using either the guided Studio flow or the classic single-page form. Both submit to the same generator pipeline: the server validates your contact configuration, substitutes it into an Android template, compiles, signs and returns the artefact.

Each build includes the signed app, a source archive of the generated Android project, a re-importable `contacts_config.json`, and an update code. The app reads baked defaults from the generated config first, then honours EMM managed configuration at runtime. That includes the global accent colour through `branding_accent`, so a deployed app can be re-tinted without a rebuild. A malformed managed-config push falls back to the baked known-good config rather than blanking the directory.

## Who is CONTACTS APP GENERATOR for?

- Do you need a managed internal contact directory on Android devices without exposing personal contacts?
- Do you already have contact data as VCF, CSV, JSON, or an intranet-hosted export?
- Do you want the EMM to be able to update sources, sync policy, and appearance after install?

The primary use case is **managed Android estates** that need operational contacts available in the device contacts provider and in a purpose-built app. The generated app owns its contacts through a dedicated Android account, so managed contacts stay separate from personal contacts and are removed cleanly when the app is uninstalled.

Fully managed devices get the most direct integration. Work profile and COPE deployments sync into the work profile, with cross-profile contact search and caller ID controlled by Android version, EMM policy, and OEM behaviour.

## What CONTACTS APP GENERATOR doesn't do

CAG does not host your contacts, provide a directory service, or authenticate to Exchange, LDAP, CardDAV, or Google Contacts. It consumes files you provide and syncs them to the device.

It also does not make local edits authoritative. Source data remains the source of truth; the generated app reconciles the device against the configured sources.

CAG does not force personal-profile apps to see work-profile contacts. Cross-profile visibility is controlled by Android Enterprise policy, not by the generated app.

## What does CONTACTS APP GENERATOR cost?

CONTACTS APP GENERATOR is a **free** service. There is no usage cap, no per-build fee and no licence model. Bayton-signed builds are signed with Bayton's certificate at no cost; release-signed builds use whichever keystore you upload.

## Get started

You can use CAG publicly at [gen.bayton.org/contacts](https://gen.bayton.org/contacts/).

<a class="button" href="https://gen.bayton.org/contacts/">Open CONTACTS APP GENERATOR</a>
<a class="button" href="support/">Documentation</a>
