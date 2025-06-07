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
    order: 3
    title: Configuration scenarios
---

Explore practical examples of how to deploy MANAGED INFO for different use cases. These serve as inspiration or starting points when defining your own managed configuration.

## 1. Support hub for knowledge workers

**Goal**: Provide IT support, contact details, and a helpful message.

**Recommended config**:
- `enable_quick_actions = true`
- `quick_action_settings`: enable email, phone, and web
- `contact_info`: set email, phone, support site, helpdesk address
- `enable_org_message = true` + rich message in `org_message`  
    **Example**:  
    > “If you need assistance, please contact IT Support via the details below. We're here to help with any device or access issues.”
- `enable_contact_details = true`
- `enable_device_details = true` (optional)

**Ideal for**: Front-line staff, field engineers, hybrid employees.

---

## 2. Simple info screen for kiosk devices

**Goal**: Show device ID, organisation details, and support info only.

**Recommended config**:
- `enable_quick_actions = false`
- `enable_contact_details = true`
- `enable_device_details = true`
- `enable_device_identifiers = true` (requires licence)
- `allow_fun = false`
- `custom_app_title = "Support Info"` (requires licence)
- Reorder top-level cards via `set_order`

**Ideal for**: Shared tablets, unmanned kiosks, digital signage.

---

## 3. Multi-App launcher layout (licensed use case)

**Goal**: Present a grid of approved applications with friendly labels.

**Recommended config**:
- `card_stacks > stack_multi_app_card`: one or more stacks with:
  - `grid_columns = 3` (or desired layout)
  - Comma-separated `package_names`
  - Optional gaps via `,,`
  - `stack_multi_app_card_title` for context
- `kiosk_custom_background_image` or `kiosk_custom_background_colour`
- Optional: `kiosk_custom_card_colour` and `kiosk_custom_text_colour`
- `enable_stack = true`

**Ideal for**: Company devices, training tablets, role-based deployments.

---

## 4. Single-app cards with context (licensed use case)

**Goal**: Highlight an app with an explainer or warning.

**Recommended config**:
- `card_stacks > stack_single_app_card`:
  - Provide `package_name`, message, and title
  - `enable_single_app_stack_card = true`
  - Consider a heading for context

**Example**:  
> “Use Google Drive to access shared documents. You’ll need your work email address.”

**Ideal for**: New user onboarding, app-based workflows, policy comms.

---

## 5. Custom theme for brand consistency (licensed use case)

**Goal**: Fully themed visual experience with brand colours and logo.

**Recommended config**:
- `custom_app_title = "MyCo Info Hub"`
- `allow_fun = false`
- `kiosk_custom_background_image = <url or base64>`
- `kiosk_custom_card_colour = "#F4F4F4"`
- `kiosk_custom_text_colour = "#000000"`
- `kiosk_custom_background_text_colour = "#004080"`
- Optional: enable `kiosk_enable_launcher`

**Ideal for**: Internal rollouts across managed corporate fleets.

---

## 6. Admin testing mode / local debugging

**Goal**: Grant full device access temporarily, with PIN-protected override.

**Recommended config**:
- `kiosk_enable_launcher = true`
- `kiosk_enable_admin_override = true`
- `kiosk_admin_password = "12345"` (or managed secret)

**Ideal for**: IT teams deploying in kiosk mode with minimal friction.

---

## 7. Minimal mode

**Goal**: Provide only a single message or action.

**Recommended config**:
- Disable all toggles except `enable_org_message = true`
- Set `org_message = "<i>This device is provisioned by XYZ Ltd.</i>"`
- Optional: `custom_app_title = ""`

**Ideal for**: Provisioning context, lost device info, device setup testing.

---

## More ideas?

Have your own configuration or use case you'd like featured? [Contribute to the tracker](https://github.com/baytonorg/managed_info_tracker/issues/) or join the [MANAGED INFO Discord](https://discord.gg/7VzRZWVkht) to share and explore others.