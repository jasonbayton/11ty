---
title: "Is it possible to manage eSIM?"
published: '2024-11-11'
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
  order: 1111
--- 
From Android 15 it is possible to configure and deploy eSIM profiles, both full and partial, to Android devices.

Where a partial eSIM profile is deployed, it needs only a pointer to the relevant SM-DP+ server to fetch the full configuration.

For company owned devices - fully managed and work profile - it is possible to deploy configurations and prevent their removal. For personally-owned work profiles, configurations can be pushed, but end-users have the ability to remove the eSIM themselves.

**Android 16 enhancements:**
- Administrators can retrieve device EID (eSIM Identifier) values for both corporate-owned and personally-owned devices, enabling eSIM provisioning workflows at scale
- User-initiated eSIM addition can be controlled through the `userInitiatedAddEsimSettings` policy on company-owned devices (Android 15+)

Note that on Android 16+, when a work profile is removed from a personally-owned device, managed eSIM profiles are always wiped regardless of other policy settings.