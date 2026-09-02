---
title: 'QPR1 Beta 7 - CP31.260623.005'
parent: 'Android Enterprise build tracker'
published: '2026-07-19'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: ['Android Enterprise build tracker', 'Android', 'aebt-release-notes']
categories: ['Android Enterprise build tracker']
layout: base.njk
eleventyNavigation:
    title: 'Android 17 QPR1 Beta 7'
---

**Track:** QPR1 Beta | **Milestone:** September 2026 stable

The final QPR1 beta before stable, focusing on physical media, tethering policies, and certificate management improvements.

**DPC capabilities**

- **Physical media access control** (provisional) - DPC apps will be able to restrict access to USB drives and SD cards through the typed policy engine, mapping to the existing `no_physical_media` restriction with proper multi-admin resolution
- **Tethering settings policy** (provisional) - DPC apps will be able to control tethering (hotspot) settings through the policy engine, with a dedicated permission
- **Wi-Fi hotspot security level** (provisional) - administrators will be able to set a minimum security level for Wi-Fi hotspots, with an ordering from any security through WPA2, WPA2/WPA3, to WPA3-only

**Other enterprise changes**

- **Branding policy namespace** - the lock screen message policy moved into a dedicated `Branding` namespace, improving organisation for branding-related policies
- **Safe boot policy namespace move** - safe boot control moved into `AdvancedSecurityOverrides` with proper typed allowed/disallowed constants
- **Certificate management simplified** - the separate permission checks for certificate installation were consolidated into a single gate that handles both permission-based and credential-management-app access, reducing complexity for certificate operations
- **Policy engine resilience** - if a single policy fails during reapplication (for example after a reboot), it no longer cascades and breaks other policies. Each policy is now handled independently
