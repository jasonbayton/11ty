---
title: CONTACTS APP GENERATOR quick start
parent: CONTACTS APP GENERATOR support
published: '2026-06-15'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: ['Contacts App Generator', 'bayton-projects']
categories: ['Contacts App Generator Setup']
layout: base.njk
eleventyNavigation:
    order: 0
    title: Quick start
---

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">Head's up</div>

CONTACTS APP GENERATOR runs in the browser. There is nothing to install locally and no Android development environment to set up. You'll need at least one contact source, and an EMM or `adb` to deploy the generated app.

</div>

## Prepare

Before you build, have the following to hand:

- A **contact source** in VCF, CSV, or JSON format. It can be embedded into the APK or fetched from an HTTPS URL at runtime. Built-in files are validated before build and can be up to 32 MiB.
- A **contacts account name**, such as `Company Contacts`. Managed contacts are written under this app-owned Android account and kept separate from personal contacts.
- A short **app name**, optional **app icon**, **theme colour**, and **accent colour**.
- A deployment policy that grants the generated app contacts permission where your EMM supports runtime permission grants.
- If you intend to release-sign, your **JKS or PKCS12 keystore** plus the alias and passwords.
- If you're rebuilding an existing app, the **update code** from the original build.

## Build the application

1. Open [gen.bayton.org/contacts](https://gen.bayton.org/contacts/). Use Studio for the guided flow or the classic form for a single-page build.
2. If you have a previous `contacts_config.json`, import it first. Built-in source files and icons are not stored in the JSON, so attach those again before building.
3. Set the app name, icon, theme colour, and in-app appearance defaults.
4. Set the contacts account name.
5. Add at least one source: a built-in VCF/CSV/JSON file, or a URL source. For CSV files, add a mapping only when CAG cannot infer your headers.
6. Configure sync behaviour, removal policy, network timeout, and whether HTTP sources are allowed.
7. Pick the signing mode: Bayton-signed, release-signed with your own key, or debug for local testing.
8. Pick APK or AAB, then submit the build.

## After the build

The result page contains:

- A download link for the signed APK or AAB.
- A source archive containing the generated Android project.
- A re-importable `contacts_config.json`.
- A one-time update code for rebuilding under the same Android package name.
- The builder version used to generate the app.

<div class="callout callout-orange">
<div class="callout-heading">Save the update code</div>

The update code is required to keep the same Android package name across rebuilds. Without it, the next build is a new app and will not update devices already running the earlier package.

</div>

## Deploy

Deploy the generated APK or AAB through your EMM as you would any other private managed app. Grant the contacts permission through policy where your EMM supports it so first sync can run without a user prompt.

Managed configuration can update sources, account name, sync policy, contacts policy, network timeout, logging, and the lockable display options after install. Plain HTTP is the exception: cleartext support is controlled by Android's network-security configuration and must be enabled at build time.

Work profile deployments sync contacts into the work profile. Whether those contacts appear to personal-profile diallers, caller ID, mail apps, or search is controlled by Android Enterprise cross-profile policy and the device/OEM build.

## Validate

After install, open the generated app and check the Status screen. It reports overall health, source results, last attempted sync, last successful sync, and the managed contact count.

For deeper diagnosis, enable verbose logging and capture:

```sh
adb logcat -s ManagedContactsSync
```
