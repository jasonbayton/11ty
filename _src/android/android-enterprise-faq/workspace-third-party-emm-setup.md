---
title: "Avoiding configuration issues in Google Workspace with GEM & 3rd party EMM"
published: '2026-04-07'
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
  order: 43100
sources:
  - https://support.google.com/work/android/answer/6174039
  - https://support.google.com/work/android/answer/14319210
  - https://knowledge.workspace.google.com/admin/devices/stop-managing-mobile-devices-for-your-organization
---
If your organisation uses Google Workspace (or Cloud Identity) and wants to manage Android devices through a third-party EMM, the Workspace side of the setup is straightforward. There are three things to do, and an optional fourth.

### 1. Turn off Google Endpoint Management for affected OUs

Google Workspace includes its own device management - Google Endpoint Management (GEM). This must be **turned off** for any organisational units that will be managed by the third-party EMM. Not set to Basic - turned off. Basic still applies GEM policies and collects device inventory, which can cause unexpected issues.

**Admin Console > Devices > Mobile & endpoints > Settings > Universal > General > Mobile management**

Select the target OU, choose **Turn off mobile management**, and save.

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">What happens if GEM is left on?</div>

If advanced management remains enabled for the OU, adding a Google Workspace account to a device already managed by a third-party EMM will trigger Google's own work profile setup flow - the user is prompted to install Android Device Policy and set up a work profile. On a device that already has a work profile from the third-party EMM, this cannot complete and leads to errors. If users are seeing unexpected prompts to set up a work profile when signing in with their Workspace account, GEM is almost certainly still enabled for their OU.

</div>

### 2. Bind the EMM

The EMM handles this through the standard Android Enterprise signup flow. During setup within the EMM console, the admin is redirected to Google to authenticate with a super administrator account. This creates the enterprise binding - an enterprise ID tied to the managed Google domain. There's no token to copy or code to enter; the EMM orchestrates the process.

Since mid-2024, a single managed Google domain can support multiple EMM bindings, each with its own enterprise ID. This is useful during migrations or where different parts of the organisation use different EMMs.

### 3. Select the EMM for the OU

Once the binding exists, it appears in the Admin Console under:

**Admin Console > Devices > Mobile & endpoints > Settings > Third-party integrations > Android EMM**

Select the OU and assign the EMM provider. Different OUs can use different EMMs.

### 4. Optionally enable Authenticate with Google

In the same section, there is an **Authenticate Using Google** toggle per EMM provider. When enabled, end users enrolling devices through that EMM are required to sign in with their Google Workspace account during enrolment. This is optional and depends on EMM support.

That's it. The third-party EMM takes over Android Enterprise management for the assigned OUs, and GEM stays out of the way.

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">Changing EMM provider</div>

If you're migrating from one third-party EMM to another, see the [EMM migration guide](/android/android-enterprise-emm-migration-guide/). Be aware that removing an EMM binding affects the entire domain, not just individual OUs, and may result in managed devices being wiped. Coordinate with your current EMM provider before making changes.

</div>
