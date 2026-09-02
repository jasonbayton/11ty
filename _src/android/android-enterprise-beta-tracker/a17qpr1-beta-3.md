---
title: 'QPR1 Beta 3 - CP31.260508.005.A1'
parent: 'Android Enterprise build tracker'
published: '2026-05-21'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: ['Android Enterprise build tracker', 'Android', 'aebt-release-notes']
categories: ['Android Enterprise build tracker']
layout: base.njk
eleventyNavigation:
    title: 'Android 17 QPR1 Beta 3'
---

**Track:** QPR1 Beta | **Milestone:** September 2026 stable

Adds typed policy engine flags for several common restrictions and restores features that had been removed in the canary track.

**DPC capabilities**

- **VPN configuration policy** (provisional) - a new flag for migrating the VPN configuration restriction to the typed policy engine
- **Safe boot restriction** (provisional) - a new flag for migrating the safe boot restriction to the typed policy engine
- **Cellular data usage policy** (provisional) - a new flag for migrating cellular data usage control to the typed policy engine
- **Wi-Fi network selection policy** (provisional) - a new flag for migrating Wi-Fi network selection restrictions to the typed policy engine

**Other enterprise changes**

- **Visible background users** - a new system API method lets apps check whether the device supports visible background users (multiple users active on screen simultaneously), relevant for shared device deployments
- **Kiosk user type restored** - the dedicated kiosk user type that was removed in the canary track was restored in the QPR1 beta track
- **Admin status broadcast restored** - the broadcast notifying apps of admin status changes was also restored after being removed in canary
- **Private DNS flag restored** (provisional) - the profile-owner-aware private DNS flag was restored (as disabled) after being removed in the canary track. This back-and-forth reflects an ongoing design discussion about whether profile owners should be able to set device-wide DNS
- **Time coexistence** (provisional) - a new flag for migrating manual time-setting policies to the typed coexistence model
