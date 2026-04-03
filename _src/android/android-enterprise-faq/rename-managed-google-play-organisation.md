---
title: "Can I rename my managed Google Play organisation?"
published: '2026-04-03'
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
  order: 72500
sources:
  - https://www.androidenterprise.community/discussions/conversations/renaming-managed-google-play-organization/2473
  - https://developers.google.com/android/management/reference/rest/v1/enterprises#Enterprise
---

There is no self-service option to rename a managed Google Play organisation after it has been created.

### Why is this a problem?

The organisation name set during the Android Enterprise bind is visible in several places:

- The managed Google Play store (shown to end users)
- The Google Admin console (for managed Google domain enterprises)
- On managed devices when `enterpriseDisplayNameVisibility` is enabled (the AMAPI default since January 2026)

If the wrong name was entered during bind setup, or the company has rebranded, there is no edit button in any console to change it.

### What are the options?

**For AMAPI-managed enterprises:**

The enterprise display name shown on devices can be updated through the AMAPI `enterprises.patch` method by setting the `enterpriseDisplayName` field. This typically requires a support ticket to your EMM vendor, as most EMM consoles do not expose this setting directly.

Note that this changes the display name on devices only - it does not change the underlying organisation name in managed Google Play or the Google Admin console.

It also only applies to new enrolments, so this is a limited option.

**For the underlying organisation name:**

- **Managed Google Play Accounts enterprises** - no rename option exists. The only path is to delete the enterprise bind entirely and recreate it, which requires re-enrolment of all devices
- **Managed Google Domain enterprises** - the organisation name is tied to the Google Workspace/Cloud Identity domain configuration. Changes to the organisation name must be made through the Google Admin console under Account settings

### Recommendation

Choose the organisation name carefully during bind setup. If using a managed Google domain, ensure the domain's organisation name is correct before initiating the Android Enterprise bind, as the name is inherited from the domain configuration.
