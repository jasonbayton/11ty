---
title: 'QPR1 Beta 6 - CP31.260618.005'
parent: 'Android Enterprise Beta Tracker'
published: '2026-07-08'
date: '2026-07-08T00:00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: ['Android Enterprise Beta Tracker', 'Android', 'aebt-release-notes']
categories: ['Android Enterprise Beta Tracker']
layout: base.njk
eleventyNavigation:
    title: 'QPR1 Beta 6'
---

**Track:** QPR1 Beta | **Milestone:** September 2026 stable

Introduces real-time policy change callbacks and scoped key generation.

## DPC capabilities

- **Real-time policy change callbacks** - DPC apps can now register to be notified whenever a device-wide policy value changes, enabling reactive monitoring rather than polling. When multiple admins set conflicting policies, the callback reports the resolved (winning) value
- **Scoped key generation** (provisional) - building on the scoped certificate framework from Beta 5, DPC apps can now generate key pairs scoped to either the user or device level

## Other enterprise changes

- **Subscription policy streamlining** (provisional) - a new flag and permission for managing eSIM subscriptions through the typed policy engine
- **Network logging policy** (provisional) - network logging is being migrated to the typed policy engine, with metadata registered
- **Network reset policy** (provisional) - network reset restrictions are being migrated to the typed policy engine
- **Supervision sync rolled back** - the supervision service sync feature was rolled back to disabled in this build after being enabled in earlier betas
- **Provisioning backup blocked** - the provisioning app now explicitly disables backup, preventing provisioning state from being restored from a backup onto a different device
- **Headless system user permission string** - a new localised string across 60+ languages explains to non-admin users on headless system user devices that their permissions are managed by an admin
- **App interaction rename** - the app functions framework began its rename to app interaction, with activities and strings updated in this build. Intent actions and the permission rename were finalised in Beta 7
