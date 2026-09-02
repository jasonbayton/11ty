---
title: 'Canary 3 - ZP11.260417.009'
parent: 'Android Enterprise build tracker'
published: '2026-05-18'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: ['Android Enterprise build tracker', 'Android', 'aebt-release-notes']
categories: ['Android Enterprise build tracker']
layout: base.njk
eleventyNavigation:
    title: 'Android 17 Canary 3'
---

**Track:** Canary | **Note:** canary builds are forward-looking and may not ship in the next stable release

A lighter build focused on private DNS refactoring and overlay resource improvements.

**DPC capabilities**

- **Private DNS restricted to device owners** - the private DNS policy was tightened so that only device owners can set it, with proper input validation that throws on invalid values. The profile owner path was collapsed (the backing flag removed), confirming private DNS remains a device-wide-only setting

**Other enterprise changes**

- **Recursive resource resolution** - overlay package lists now support `#import:` directives, allowing one list to reference another. This enables cleaner configuration management for OEMs and enterprise deployments with complex overlay hierarchies
- **Generic provisioning error** graduated to enabled in the canary track
- **Assistant settings removed** - the assistant settings activity was removed in this canary build (later restored in QPR1 Beta 6), reflecting ongoing iteration on the app interaction framework
