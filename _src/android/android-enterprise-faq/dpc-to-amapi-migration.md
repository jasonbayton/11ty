---
title: "Can I migrate devices from a custom DPC to AMAPI?"
published: '2026-03-21'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - FAQ
categories:
    - General
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 43000
sources:
  - https://developers.google.com/android/management/dpc-migration
  - https://bayton.org/blog/2024/01/amapi-migrations/
  - https://developers.google.com/android/management/reference/amapi/com/google/android/managementapi/dpcmigration/model/DpcMigrationRequest
---
Yes, but with limitations.

Google supports migrating devices from a custom DPC (using the Play EMM API) to the Android Management API (AMAPI) without requiring a factory reset. This is done through the AMAPI SDK's DPC migration functionality.

**Prerequisites:**
- The device must be managed by a custom DPC integrated with the AMAPI SDK
- The device must be enrolled with the Google Play EMM API
- The device must belong to a Managed Google Play Accounts enterprise
- Android 9+ for fully managed devices; Android 11+ for work profiles on company-owned devices

**Key limitations:**
- Migration is only supported within the same EMM vendor. It cannot be used to move devices between different EMM providers
- The migration is irreversible. Once a device moves to AMAPI, it cannot be migrated back to the custom DPC
- The migration must be initiated by the custom DPC on the device, coordinated with the EMM backend

**How it works:**
1. The EMM sets up a policy in AMAPI for the migrating device
2. A migration token is created and sent to the custom DPC on the device
3. The custom DPC calls the migration method in the AMAPI SDK
4. Android Device Policy takes over management from the custom DPC

For more context on how DPC migration works and what to expect, see [AMAPI publicly adds support for DPC migration](/blog/2024/01/amapi-migrations/).
