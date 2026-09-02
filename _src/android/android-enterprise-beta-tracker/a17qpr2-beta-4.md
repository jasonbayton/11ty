---
title: 'QPR2 Beta 4 - CP41.260814.003.B1'
parent: 'Android Enterprise Beta Tracker'
published: '2026-08-25'
date: '2026-08-25T00:00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: ['Android Enterprise Beta Tracker', 'Android', 'aebt-release-notes']
categories: ['Android Enterprise Beta Tracker']
layout: base.njk
eleventyNavigation:
    title: 'QPR2 Beta 4 (platform stability)'
---

**Track:** QPR2 Beta | **Milestone:** December 2026 stable

**Platform stability reached.** The enterprise API surface is frozen. What ships in this build ships in the December 2026 stable QPR2 release.

## DPC capabilities

- **Streaming network logs** (provisional) - DPC apps will be able to receive network log events in real time as they happen, rather than fetching them in batches after the fact. Still gated - not yet active
- **Secure ADB role bypass enabled** - ADB access can now bypass traditional device owner and profile owner requirements using the newer role-based permission model. This was previously only available in canary builds and is now confirmed for the stable track
- **Query managed profiles** - DPC apps can ask the system which profiles on a device are under policy management for a given user, useful for multi-profile management interfaces
- **Track policy quota** - DPC apps can check how much of the policy size budget a particular admin has consumed, enabling monitoring in multi-admin environments

## Other enterprise changes

- **DLP storage matchers** (provisional) - the data leak prevention framework gained new matchers for portable storage (USB drives, SD cards) and shared storage, including affiliation-aware filtering. These extend the DLP rules introduced in Beta 3
- **Cross-device task handoff policy** (provisional) - a new policy namespace allows controlling whether task continuity handoff (handing a task from one device to another) is permitted, with proper multi-admin resolution where the most restrictive setting wins
- **Package metadata class** (provisional) - a new structured class for describing installed packages with installation source, version, display name, and signing certificates. Likely feeds into DLP and security logging decisions
- **First-use hints policy** (provisional) - a new permission and flag for controlling first-use hints via the typed policy engine
- **Package failure security logging** (provisional) - a new flag for logging app install, update, and uninstall failures to the security log
- **Network logging delegation** - network log access is now delegatable via the permission-based model, removing the need for traditional admin delegation
