---
title: MANAGED INFO sonfiguration scenarios
parent: MANAGED INFO support
published: '2024-06-08'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Managed Info'
    - 'bayton-projects'
categories: 
    - Managed Info Customisation
layout: base.njk
eleventyNavigation: 
    order: 4
    title: Configuration scenarios
---

Explore practical examples of how to deploy MANAGED INFO for different use cases. These serve as inspiration when defining your own managed configuration.

## 1. Support hub for knowledge workers

**Goal**: Provide IT support, contact details, and a helpful message.

**Recommended config**:
- **Show quick actions** = true
- **Manage individual quick actions**: email, phone, and web
- **Contact information**: set helpdesk email, phone, support site, address
- **Show organisation message card** = true + message in **Organisation message**  
    > “If you need assistance, please contact IT Support via the details below. We're here to help with any device or access issues.”
- **Show contact details card** = true
- **Show device details card** = true (optional)

**Ideal for**: Front-line staff, field engineers, hybrid employees.

## 2. Simple info screen for kiosk devices

**Goal**: Show device ID, organisation details, and support info only.

**Recommended config**:
- **Show quick actions** = false
- **Show contact details card** = true
- **Show organisation message card** = true + **Organisation message**  
    > “Asset # '\$variable$'”

**Ideal for**: Shared tablets, unmanned kiosks, digital signage requiring declaration of ownership.

## 3. Multi-App launcher layout (licensed)

**Goal**: Present a grid of approved applications with friendly labels.

**Recommended config**:
- **Application grid card stack**: one or more stacks with:
  - **Grid columns** = 4 (or desired layout)
  - Comma-separated **Package names**
  - Optional gaps via added commas `,,`
  - **Card title** for context
- **Custom background image** or **Custom background colour**
- Optional: **Custom card colour** and **Custom card text colour**

**Ideal for**: Company devices, training tablets, role-based deployments, logistics, warehousing

## 4. Single-app cards with context (licensed)

**Goal**: Highlight an app with an explainer or warning.

**Recommended config**:
- **App and message card stack**:
  - Provide **Package name**, message, and (optional) title

**Example**:  
> “Use Google Drive to access shared documents. You’ll need your work email address.”

**Ideal for**: New user onboarding, app-based workflows, policy comms.

## 5. Custom theme for brand consistency (licensed)

**Goal**: Fully themed visual experience with brand colours and logo.

**Recommended config**:
- **Custom app title** = "MyCo Info Hub"
- **Allow fun** = false
- **Custom background image** = `<url or base64>`
- **Custom card colour** = "#F4F4F4"
- **Custom card text colour** = "#000000"
- **Custom background text colour** = "#004080"
- Optional: enable **Enable launcher**

**Ideal for**: Internal rollouts across managed corporate fleets.

## 6. Admin testing mode / local debugging

**Goal**: Grant full device access temporarily, with PIN-protected override.

**Recommended config**:
- **Enable launcher** = true
- **Enable admin override** = true
- **Admin override code** = "12345" (or managed secret)

**Ideal for**: IT teams deploying in kiosk mode with minimal friction.

## 7. Minimal mode

**Goal**: Provide only a single message or action.

**Recommended config**:
- Disable all toggles except **Show organisation message card** = true
- Set **Organisation message** = "<i>This device is provisioned by XYZ Ltd.</i>"
- Optional: **Custom app title** = ""

**Ideal for**: Provisioning context, lost device info, device setup testing.

## More ideas?

Have your own configuration or use case you'd like featured? [Contribute to the tracker](https://github.com/baytonorg/managed_info_tracker/issues/) or join the [BAYTON Discord](https://discord.gg/7VzRZWVkht) to share and explore others.