---
title: "Is it possible to migrate fully managed devices between EMM solutions?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - Fully managed
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "Is it possible to migrate fully managed devices between EMM solutions?"
  order: 26000
--- 
In most cases, no - not without a factory reset.

Android Enterprise fully managed devices are bound to a single EMM enterprise. Moving a device from one EMM to another typically requires a factory reset and re-provisioning under the new EMM, unless both the inbound and outbound EMM supports DPC migration via their custom DPCs.

More recently, DPC migration via the Android Management API (AMAPI) has become possible. This allows devices managed by a custom DPC (using the Play EMM API) to migrate to AMAPI (Android Device Policy) without a factory reset. However, this is a one-way migration from custom DPC to AMAPI within the same enterprise - it cannot be used to migrate between two different EMM platforms.

For organisations planning an EMM change, the practical approach is to phase the migration by factory resetting devices in batches and re-provisioning them under the new EMM. Zero-touch enrolment simplifies this significantly, as the device configuration can be updated in the zero-touch portal to point to the new EMM before the reset.

