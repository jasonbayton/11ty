---
title: "Why don't managed configurations work with app tracks?"
published: '2026-03-22'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - FAQ
categories:
    - App management
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 69000
sources:
  - https://bayton.org/blog/2025/04/managed-configs-app-tracks/
notes: >
  Known AMAPI limitation. Managed configurations (managed properties) can only
  be retrieved from production-published apps, not from closed/internal test
  tracks. Verify this limitation still exists before publishing.
---
This is a known limitation of the Android Management API.

When deploying apps via closed testing tracks (also known as app tracks) through managed Google Play, the managed configuration schema (managed properties) is only pulled from the production version of the app. If the app has never been published to production, or if the production version has a different configuration schema than the track version, the EMM will either show no managed config options or show outdated ones.

This affects organisations that:

- Distribute internal apps exclusively through closed tracks without ever publishing to production
- Test new managed config options in a track version before promoting to production
- Use app tracks for staged rollouts where the track version has configuration changes not yet in production

**Workaround:**
Publish the app to production with the correct managed configuration schema, even if the production version is not the one actively deployed to devices. The production listing controls what managed config options are available in the EMM console, regardless of which track version is installed on devices.

For more detail on this limitation, see [Managed configurations and app tracks](/blog/2025/04/managed-configs-app-tracks/).
