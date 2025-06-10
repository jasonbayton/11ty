---
title: MANAGED INFO use cases
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
    title: Use cases
---

Explore practical examples of how to deploy MANAGED INFO for different use cases. These serve as inspiration when defining your own managed configuration.

<div class="grid grid-column-2-1 grid-column-mobile-1 grid-gap-40 grid-gap-mobile-0 padding-tb-30 padding-mobile-tb-10">

<div>

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

</div>
<div class="grid-align-center">
<img src="https://cdn.bayton.org/assets/managed_info/mi-use-cases/use-case-1-support-hub.png" width="300px">
</div>
</div>

<div class="grid grid-column-2-1 grid-column-mobile-1 grid-gap-40 grid-gap-mobile-0 padding-tb-30 padding-mobile-tb-10">

<div>

## 2. Simple info screen for kiosk devices

**Goal**: Show device asset ID, organisation details, and support info only.

**Recommended config**:
- **Show quick actions** = false
- **Show contact details card** = true
- **Show organisation message card** = true + **Organisation message**  
    > “Asset # '\$variable$'”

**Ideal for**: Shared tablets, unmanned kiosks, digital signage requiring declaration of ownership.

</div>
<div class="grid-align-center">
<img src="https://cdn.bayton.org/assets/managed_info/mi-use-cases/use-case-2-basic-support.png" width="300px">
</div>
</div>


<div class="grid grid-column-2-1 grid-column-mobile-1 grid-gap-40 grid-gap-mobile-0 padding-tb-30 padding-mobile-tb-10">

<div>

## 3. Multi-App launcher layout (licensed)

**Goal**: Present a grid of approved applications with friendly labels.

**Recommended config**:
- **Text card** with identifying details (variables supported)
- **Application grid card stack**: one or more stacks with:
  - **Grid columns** = 4 (or desired layout)
  - Comma-separated **Package names**
  - Optional gaps via added commas `,,`
  - Optional **Card title** for context (not shown)
  - Grid card transparency enabled
- **Custom background image** or **Custom background colour**
- Optional: **Custom card colour** and **Custom card text colour**

**Ideal for**: Company devices, training tablets, role-based deployments, logistics, warehousing

</div>
<div class="grid-align-center">
<img src="https://cdn.bayton.org/assets/managed_info/mi-use-cases/use-case-custom-kiosk.png" width="300px">
</div>
</div>

<div class="grid grid-column-2-1 grid-column-mobile-1 grid-gap-40 grid-gap-mobile-0 padding-tb-30 padding-mobile-tb-10">

<div>

## 4. Single-app cards with context (licensed)

**Goal**: Highlight an app with an explainer or warning.

**Recommended config**:
- **App and message card stack**:
  - Provide **Package name**, message, and (optional) title

**Example**:  
> “Use Google Drive to access shared documents. You’ll need your work email address.”

**Ideal for**: New user onboarding, app-based workflows, policy comms.

</div>
<div class="grid-align-center">
<img src="https://cdn.bayton.org/assets/managed_info/mi-use-cases/use-case-4-get-started.png" width="300px">
</div>
</div>

<div class="grid grid-column-2-1 grid-column-mobile-1 grid-gap-40 grid-gap-mobile-0 padding-tb-30 padding-mobile-tb-10">

<div>

## 5. Minimal mode

**Goal**: Provide only a single message or action.

**Recommended config**:
- Disable all toggles except **Show organisation message card** = true
- Set **Organisation message** = "<i>This device is provisioned by XYZ Ltd.</i>"

**Ideal for**: Provisioning context, lost device info, device setup testing.

</div>
<div class="grid-align-center">
<img src="https://cdn.bayton.org/assets/managed_info/mi-use-cases/use-case-5-simplistic.png" width="300px">
</div>
</div>

## More ideas?

Have your own configuration or use case you'd like featured? [Contribute to the tracker](https://github.com/baytonorg/managed_info_tracker/issues/) or join the [BAYTON Discord](https://discord.gg/7VzRZWVkht) to share and explore others.