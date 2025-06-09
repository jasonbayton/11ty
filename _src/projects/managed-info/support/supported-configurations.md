---
title: Supported configurations
parent: MANAGED INFO support
published: '2024-07-09'
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
    title: Supported configurations
---

## Overview

Managed Configurations enable you to:
- Enable or disable app features
- Prepopulate information such as contact details or support messages
- Define structured layouts using cards, grids, and kiosk elements
- Configure device details visibility and theming

---

## Core Controls

<div class="responsive-table-wrapper">

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `enable_intro_card` | `bool` | `false` | Shows an intro card when no config is applied. Hides automatically once managed config is received. |
| `enable_quick_actions` | `bool` | `true` | Enables call, email, map, and web buttons using values from `contact_info`. |
| `enable_org_message` | `bool` | `true` | Displays the organisation message. |
| `org_message` | `string` | - | Rich HTML content with basic markdown-like formatting. Supports links and inline images. |
| `enable_contact_details` | `bool` | `true` | Displays static contact card using values from `contact_info`. |
| `enable_device_details_button` | `bool` | `false` | Adds a quick access button to open device details. |
| `enable_device_details` | `bool` | `true` | Enables the device details card. |

</div>

## Contact Info

<div class="responsive-table-wrapper">

| Key | Type | Description |
|-----|------|-------------|
| `contact_info` | `bundle` | Contact details used in quick actions and contact card. |
| `contact_phone` | `string` | Phone number used by the call quick action. |
| `contact_email` | `string` | Email used by the email quick action. |
| `contact_website` | `string` | Website URL used by the web quick action. |
| `contact_address` | `string` | Address used by the map quick action. |

</div>

## Quick Action Settings

<div class="responsive-table-wrapper">

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `quick_action_settings` | `bundle` |  | Controls visibility of individual quick actions. |
| `enable_call` | `bool` | `true` | Toggle visibility of the call action. |
| `enable_email` | `bool` | `true` | Toggle visibility of the email action. |
| `enable_web` | `bool` | `true` | Toggle visibility of the web action. |
| `enable_map` | `bool` | `true` | Toggle visibility of the map action. |

</div>

## Device Details Settings

<div class="responsive-table-wrapper">

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `device_details_settings` | `bundle` |  | Granular controls for device info sections. |
| `device_details_enable_basic` | `bool` | `true` | Basic info: model, OS, uptime. |
| `device_details_enable_software` | `bool` | `true` | Shows software details (build info). |
| `device_details_enable_hardware` | `bool` | `true` | Shows hardware features. |
| `device_details_enable_radio` | `bool` | `true` | Shows connectivity radios. |
| `device_details_enable_network` | `bool` | `true` | Shows active network details. |

</div>

## Customisation Settings

<div class="responsive-table-wrapper">

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `customisation_settings` | `bundle` |  | General app behaviour and theme overrides. |
| `organisation_id` | `string` | - | Used for licensing and organisation-specific data. |
| `custom_app_title` | `string` | `"Info"` | Title shown in app. |
| `enable_device_identifiers` | `bool` | `false` | Enables display of device identifiers. |
| `enable_settings` | `bool` | `true` | Enables the settings page. |
| `allow_fun` | `bool` | `true` | Enables optional fun elements (e.g., Baydroid). |
| `show_missing_packages` | `bool` | `true` | If `false`, hides invalid apps instead of showing error cards. |

</div>

### Set Order

<div class="responsive-table-wrapper">

| Key | Type | Description |
|-----|------|-------------|
| `set_order` | `bundle` | Controls ordering of built-in cards. |
| `set_order_quick_actions` | `int` | Order index of the Quick Actions card. |
| `set_order_org_message` | `int` | Order index of the Org Message card. |
| `set_order_contact_details` | `int` | Order index of the Contact Details card. |
| `set_order_device_information` | `int` | Order index of the Device Info card. |

</div>

## Kiosk Settings

<div class="responsive-table-wrapper">

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `kiosk_settings` | `bundle` |  | Controls kiosk mode layout and behaviour. |
| `kiosk_enable_top_bar` | `bool` | `true` | Shows/hides the top bar in kiosk mode. |
| `kiosk_enable_managed_settings` | `bool` | `false` | Enables a shortcut to Managed Settings. |
| `kiosk_override_theme` | `choice` | `"automatic"` | Forces light or dark mode override. |
| `kiosk_custom_background_image` | `string` | - | URI to a background image. |
| `kiosk_custom_background_colour` | `string` | - | Background fallback colour. |
| `kiosk_custom_card_colour` | `string` | - | Background colour for cards. |
| `kiosk_custom_text_colour` | `string` | - | Text colour override. |
| `kiosk_custom_background_text_colour` | `string` | - | Text colour over background images. |
| `kiosk_custom_background_grid_card_transparency` | `bool` | `false` | Applies transparency as a boolean (on/off) to multi-app cards. |
| `kiosk_custom_background_card_with_text_transparency` | `int` | `10` | Transparency (0–10) for text cards. |
| `kiosk_enable_launcher` | `bool` | `false` | Enables full launcher functionality. |
| `kiosk_enable_admin_override` | `bool` | `false` | Enables escape mechanism for admins. |
| `kiosk_admin_password` | `string` | - | Password required for admin override. |

</div>

## Combined Card Stacks

`card_stacks` is a `bundle_array` defining the UI layout.

Each stack (`stack_bundle`) may contain:

- `stack_cards`: markdown or HTML message cards
- `stack_multi_app_card`: grids of apps (or blocklisted apps)
- `stack_single_app_card`: single app with a label and message
- `stack_heading`: section headings

### Multi-App Card

<div class="responsive-table-wrapper">

| Key | Type | Description |
|-----|------|-------------|
| `stack_multi_app_card_title` | `string` | Title for the card |
| `stack_multi_app_card_package_names` | `string` | Comma-separated list of package names or URLs |
| `stack_multi_app_card_order` | `int` | Order of the card in the stack |
| `stack_multi_app_card_grid_columns` | `int` | Grid column count, `0` = auto |
| `stack_multi_app_card_space_evenly` | `bool` | Whether apps are spaced evenly |
| `stack_multi_app_card_blocklist` | `bool` | If `true`, this card will display **all apps EXCEPT** those listed |

</div>

### Single App Card

<div class="responsive-table-wrapper">

| Key | Type | Description |
|-----|------|-------------|
| `stack_single_app_card_title` | `string` | Title for the card |
| `stack_single_app_card_package_name` | `string` | Package name of the app |
| `stack_single_app_card_message` | `string` | Optional supporting text |
| `stack_single_app_card_order` | `int` | Order of the card in the stack |

</div>

### Text Card

<div class="responsive-table-wrapper">

| Key | Type | Description |
|-----|------|-------------|
| `stack_card_title` | `string` | Title for the card |
| `stack_card_message` | `string` | Message text (HTML supported) |
| `stack_card_order` | `int` | Card ordering in the stack |

</div>

### YouTube Card <span class="label label-green">#soon</span>

<div class="responsive-table-wrapper">

| Key | Type | Description |
|-----|------|-------------|
| `stack_video_embed_card_title` | `string` | Optional title |
| `stack_video_embed_card_url` | `string` | YouTube video URL |
| `stack_video_embed_card_order` | `int` | Order of card |

</div>

### Heading Card

<div class="responsive-table-wrapper">

| Key | Type | Description |
|-----|------|-------------|
| `stack_heading_title` | `string` | Section heading |
| `stack_heading_title_size` | `string` | Size (e.g. `Default`, `XL`, `XXL`) |
| `enable_stack_heading` | `bool` | Enables this card |

</div>

## Limitations

- Apps must be installed for icons/names to appear.
- HTML and Markdown rendering is basic (e.g., no tables/lists).
- Blocklist mode works only in multi-app cards. <span class="label label-green">#soon</span>
- Embedded videos and web URLs require network access.
