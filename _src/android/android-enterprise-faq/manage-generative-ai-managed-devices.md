---
title: "How do I manage generative AI apps and features on managed devices?"
published: '2026-04-11'
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
  order: 73000
sources:
  - https://support.google.com/work/android/answer/16268713
  - https://www.android.com/enterprise/ai-at-work/
  - https://learn.microsoft.com/en-us/intune/solutions/ai/manage-ai-android
  - https://developers.google.com/android/management/reference/rest/v1/enterprises.policies
---
Generative AI on Android reaches the device through several distinct channels, and "block AI" is rarely a single policy toggle. Administrators typically need to decide what to do about each channel separately: AI apps from Google Play, AI websites in browsers, screen-reading and assistant experiences, on-device AI services, and OEM AI features.

### Where AI shows up on a managed device

- **AI apps** - ChatGPT, Microsoft Copilot, Claude, Perplexity, Gemini and similar are installable from Google Play
- **AI websites** - the same tools can be reached through a browser at gemini.google.com, chatgpt.com, copilot.microsoft.com and so on
- **Screen-driven and assistant experiences** - OS integrations such as Circle to Search and Assistant overlays read on-screen content and hand it to an AI backend
- **On-device AI services** - Gemini Nano runs locally via the AICore system app and powers features like Magic Compose in Messages, audio summarisation in Recorder, and smart replies in Gboard
- **OEM AI features** - vendor capabilities such as Samsung Galaxy AI, which are likely to be managed through the OEM's OEMConfig app rather than through standard AMAPI policy

### Controlling AI apps

Managed Google Play is the primary interface. On company-owned devices with Play Store mode on allowlist (no unmanaged Play installs), only apps you have approved and assigned will appear, so unwanted AI apps never reach the device. If you use blocklist, you can add the specific AI apps to managed Google Play and assign them to be blocked, which removes them from devices they are already on and blocks future installation.

On personally owned work profile devices, the same approach applies within the work profile. The personal profile remains outside EMM control, so a user can still install ChatGPT personally. Work profile isolation prevents work data from reaching those personal-side AI apps as long as cross-profile data sharing and copy/paste are set to the secure defaults. On COPE, the admin has the ability to block by package name in the parent profile, but this is manual and may end up being cat-and-mouse.

### Controlling AI websites

URL filtering is configured through the browser rather than AMAPI directly. In Chrome and Microsoft Edge, the `URLBlocklist` managed configuration accepts a list of URLs to block. A typical enterprise list targets gemini.google.com, chatgpt.com, claude.ai, copilot.microsoft.com and perplexity.ai. Each browser is configured separately.

### Controlling screen-driven and assistant experiences

Two AMAPI policies are relevant:

- **`assistContentPolicy`** (or equivalent EMM setting) blocks assist content sharing with privileged apps, which disables Circle to Search and other features that pass screenshots and app details to an assistant backend without affecting general screenshot functionality
- **`screenCaptureDisabled`** blocks screen capture device-wide. It is more aggressive and also prevents users from taking screenshots or allowing some remote control solutions for legitimate reasons. The March 2026 AMAPI documentation update clarified that `screenCaptureDisabled` now also blocks Circle to Search

On work profile devices, the deployment scenario matters. Blocking screen capture only in the work profile lets the personal profile behave normally.

### Controlling Gemini in the work profile

The Gemini mobile app is not available in the Android work profile. Users who launch Gemini from the work profile are redirected to gemini.google.com in their work browser. This behaviour is set by Google at the Gemini app level and is not something an administrator needs to configure. If you want to block web Gemini as well, add gemini.google.com to your browser URL blocklist as described above.

### Controlling on-device AI (Gemini Nano)

Gemini Nano runs inside the AICore system app. It can be disabled on managed devices by deploying AICore as a system app with an uninstall assignment, which turns the local AI processing off. The package name is `com.google.android.aicore`. Disabling AICore removes AI-powered features from Messages, Recorder, Gboard smart replies and any other app that depends on it, so confirm the user impact before rolling this out broadly.

### Controlling OEM AI features

Samsung Galaxy AI and similar vendor features may be exposed through the OEM's OEMConfig app rather than AMAPI. For Samsung devices that is Knox Service Plugin. Deploy the OEMConfig app, create an OEMConfig profile in your EMM, and look for AI-related settings in the configuration designer. Available settings differ by OEM and by device generation, so confirm with the vendor which controls are exposed.

### A note on work profile data boundaries

Even where AI apps exist on the personal side, the work profile's data boundary does most of the heavy lifting. Keep the defaults: copy and paste between profiles blocked, cross-profile data sharing restricted, and contact sharing off unless there is a business reason. This means a personal-side ChatGPT app cannot read work contacts, calendar, or files, regardless of whether the app itself is blocked.