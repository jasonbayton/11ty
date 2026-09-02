---
title: 'Android 17 Beta 4.1 - CP21.260330.011.A1'
parent: 'Android Enterprise build tracker'
published: '2026-06-02'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: ['Android Enterprise build tracker', 'Android', 'aebt-release-notes']
categories: ['Android Enterprise build tracker']
layout: base.njk
eleventyNavigation:
    title: 'Android 17 Beta 4.1'
---

**Track:** Android 17 Beta (stable track) | **Milestone:** June 2026 stable

A patch release that rolled back several flags to their safer defaults on the stable track.

**What changed**

- **Three flags rolled back** - `increaseWatchStrongAuthTimeout`, `introduceGenericProvisioningError`, and `useHardenedFrpActiveCheck` were all set back to disabled on the stable track. These remained enabled in the canary and QPR1 tracks, meaning the stable Android 17 release shipped without them while they continue development in quarterly releases
- **eSIM carrier privileges restored** - the `enterpriseEsimUsingCarrierPrivileges` flag was re-added as enabled after being removed in earlier builds
- **User wipe scope narrowed** - the broader "user that cannot be removed" wipe behaviour was narrowed back to "last admin user" on the stable track, keeping the more conservative behaviour for the June release

This build illustrates how the stable, QPR, and canary tracks can diverge: features that are enabled in QPR and canary builds get rolled back on the stable track when they need more baking time.
