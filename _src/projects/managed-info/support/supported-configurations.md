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

| Setting | Key | Type | Default | Description |
|---------|-----|------|---------|-------------|
| Intro Card | `enable_intro_card` | `bool` | `false` | Shows an intro card when no config is applied. Hides automatically once managed config is received. |
| Quick Actions | `enable_quick_actions` | `bool` | `true` | Enables call, email, map, and web buttons using values from `contact_info`. |
| Organisation Message | `enable_org_message` | `bool` | `true` | Displays the organisation message. |
| Organisation Message Text | `org_message` | `string` | This is a default message set via managed config. Edit the configuration to adjust this text. HTML supported. | Rich HTML content with basic markdown-like formatting. Supports links and inline images. |
| Contact Details | `enable_contact_details` | `bool` | `true` | Displays static contact card using values from `contact_info`. |
| Device Details Button | `enable_device_details_button` | `bool` | `false` | Adds a quick access button to open device details. |
| Device Details | `enable_device_details` | `bool` | `true` | Enables the device details card. |

</div>

## Contact Info

<div class="responsive-table-wrapper">

| Setting | Key | Type | Default | Description |
|---------|-----|------|---------|-------------|
| Contact Info | `contact_info` | `bundle` |  | Contact details used in quick actions and contact card. |
| Contact Phone | `contact_phone` | `string` | `+445566778899` | Phone number used by the call quick action. |
| Contact Email | `contact_email` | `string` | `project-support@bayton.org` | Email used by the email quick action. |
| Contact Website | `contact_website` | `string` | `https://bayton.org/projects` | Website URL used by the web quick action. |
| Contact Address | `contact_address` | `string` | `Newport, Wales` | Address used by the map quick action. |

</div>

## Quick Action Settings

<div class="responsive-table-wrapper">

| Setting | Key | Type | Default | Description |
|---------|-----|------|---------|-------------|
| Quick Action Settings | `quick_action_settings` | `bundle` |  | Controls visibility of individual quick actions. |
| Call Action | `enable_call` | `bool` | `true` | Toggle visibility of the call action. |
| Email Action | `enable_email` | `bool` | `true` | Toggle visibility of the email action. |
| Web Action | `enable_web` | `bool` | `true` | Toggle visibility of the web action. |
| Map Action | `enable_map` | `bool` | `true` | Toggle visibility of the map action. |

</div>

## Device Details Settings

<div class="responsive-table-wrapper">

| Setting | Key | Type | Default | Description |
|---------|-----|------|---------|-------------|
| Device Details Settings | `device_details_settings` | `bundle` |  | Granular controls for device info sections. |
| Basic Info | `device_details_enable_basic` | `bool` | `true` | Basic info: model, OS, uptime. |
| Software Details | `device_details_enable_software` | `bool` | `true` | Shows software details (build info). |
| Hardware Features | `device_details_enable_hardware` | `bool` | `true` | Shows hardware features. |
| Connectivity Radios | `device_details_enable_radio` | `bool` | `true` | Shows connectivity radios. |
| Network Details | `device_details_enable_network` | `bool` | `true` | Shows active network details. |

</div>

## Customisation Settings

<div class="responsive-table-wrapper">

| Setting | Key | Type | Default | Description |
|---------|-----|------|---------|-------------|
| Customisation Settings | `customisation_settings` | `bundle` |  | General app behaviour and theme overrides. |
| Organisation ID | `organisation_id` | `string` | - | Used for licensing and organisation-specific data. |
| Custom App Title | `custom_app_title` | `string` | `"Info"` | Title shown in app. |
| Device Identifiers | `enable_device_identifiers` | `bool` | `false` | Enables display of device identifiers. |
| Settings Page | `enable_settings` | `bool` | `true` | Enables the settings page. |
| Allow Fun | `allow_fun` | `bool` | `true` | Enables optional fun elements (e.g., Baydroid). |
| Show Missing Packages | `show_missing_packages` | `bool` | `true` | If `false`, hides invalid apps instead of showing error cards. |

</div>

### Set Order

<div class="responsive-table-wrapper">

| Setting | Key | Type | Default | Description |
|---------|-----|------|---------|-------------|
| Set Order | `set_order` | `bundle` |  | Controls ordering of built-in cards. |
| Quick Actions Order | `set_order_quick_actions` | `int` | `1` | Order index of the Quick Actions card. |
| Organisation Message Order | `set_order_org_message` | `int` | `2` | Order index of the Org Message card. |
| Contact Details Order | `set_order_contact_details` | `int` | `3` | Order index of the Contact Details card. |
| Device Info Order | `set_order_device_information` | `int` | `5` | Order index of the Device Info card. |

</div>

## Kiosk Settings

<div class="responsive-table-wrapper">

| Setting | Key | Type | Default | Description |
|---------|-----|------|---------|-------------|
| Kiosk Settings | `kiosk_settings` | `bundle` |  | Controls kiosk mode layout and behaviour. |
| Top Bar | `kiosk_enable_top_bar` | `bool` | `true` | Shows/hides the top bar in kiosk mode. |
| Managed Settings Shortcut | `kiosk_enable_managed_settings` | `bool` | `false` | Enables a shortcut to Managed Settings. |
| Theme Override | `kiosk_override_theme` | `choice` | `"automatic"` | Forces light or dark mode override. |
| Background Image | `kiosk_custom_background_image` | `string` | - | URI to a background image. |
| Background Colour | `kiosk_custom_background_colour` | `string` | - | Background fallback colour. |
| Card Colour | `kiosk_custom_card_colour` | `string` | - | Background colour for cards. |
| Text Colour | `kiosk_custom_text_colour` | `string` | - | Text colour override. |
| Background Text Colour | `kiosk_custom_background_text_colour` | `string` | - | Text colour over background images. |
| Background Grid Card Transparency | `kiosk_custom_background_grid_card_transparency` | `bool` | `false` | Applies transparency as a boolean (on/off) to multi-app cards. |
| Background Card Text Transparency | `kiosk_custom_background_card_with_text_transparency` | `int` | `10` | Transparency (0–10) for text cards. |
| Launcher Enabled | `kiosk_enable_launcher` | `bool` | `false` | Enables full launcher functionality. |
| Admin Override | `kiosk_enable_admin_override` | `bool` | `false` | Enables escape mechanism for admins. |
| Admin Password | `kiosk_admin_password` | `string` | - | Password required for admin override. |

</div>

## Combined Card Stacks

`card_stacks` is a `bundle_array` defining the UI layout.


Each stack (`stack_bundle`) may contain:

- `stack_cards`: markdown or HTML message cards
- `stack_multi_app_card`: grids of apps (or blocklisted apps)
- `stack_single_app_card`: single app with a label and message
- `stack_heading`: section headings

### Stack Configuration

<div class="responsive-table-wrapper">

| Setting | Key | Type | Default | Description |
|---------|-----|------|---------|-------------|
| Stack ID | `stack_id` | `string` | - | Optional identifier for the stack. Can be used to reference a specific stack in configs or diagnostics. |
| Stack Orientation | `stack_orientation` | `choice` | `vertical` | Controls the layout direction for cards within the stack. Valid values: `vertical`, `horizontal`. |
| Stack Order | `stack_order` | `int` | `4` | Position of the stack in the rendered layout. Lower = higher. |
| Enable Stack | `enable_stack` | `bool` | `true` | Whether the stack should be shown. |

</div>

### Multi-App Card

<div class="responsive-table-wrapper">

| Setting | Key | Type | Default | Description |
|---------|-----|------|---------|-------------|
| Multi-App Card Title | `stack_multi_app_card_title` | `string` |  | Title for the card |
| Package Names | `stack_multi_app_card_package_names` | `string` | `com.android.chrome, org.bayton.packagesearch` | Comma-separated list of package names or URLs |
| Card Order | `stack_multi_app_card_order` | `int` | `0` | Order of the card in the stack |
| Grid Columns | `stack_multi_app_card_grid_columns` | `int` | `0` | Grid column count, `0` = auto |
| Space Evenly | `stack_multi_app_card_space_evenly` | `bool` |  | Whether apps are spaced evenly |
| Blocklist Mode | `stack_multi_app_card_blocklist` | `bool` |  | If `true`, this card will display **all apps EXCEPT** those listed |
| Enable Multi-App Card | `enable_multi_app_stack_card` | `bool` | `false` | Enables this multi-app grid card in the stack. |

</div>

### Single App Card

<div class="responsive-table-wrapper">

| Setting | Key | Type | Default | Description |
|---------|-----|------|---------|-------------|
| Single App Card Title | `stack_single_app_card_title` | `string` | `App card title` | Title for the card |
| Package Name | `stack_single_app_card_package_name` | `string` | `com.android.chrome` | Package name of the app |
| Message | `stack_single_app_card_message` | `string` | `Add a description to accompany this standalone application.` | Optional supporting text |
| Card Order | `stack_single_app_card_order` | `int` | `0` | Order of the card in the stack |
| Enable App Card | `enable_single_app_stack_card` | `bool` | `false` | Enables this single app card within the stack. |

</div>

### Text Card

<div class="responsive-table-wrapper">

| Setting | Key | Type | Description |
|---------|-----|------|-------------|
| Text Card Title | `stack_card_title` | `string` | Title for the card |
| Message Text | `stack_card_message` | `string` | Message text (HTML supported) |
| Card Order | `stack_card_order` | `int` | Card ordering in the stack |
| Enable Text Card | `enable_stack_card` | `bool` | `false` | Enables or disables display of this text card. |

</div>

### YouTube Card <span class="label label-green">#soon</span>

<div class="responsive-table-wrapper">

| Setting | Key | Type | Default | Description |
|---------|-----|------|---------|-------------|
| Video Embed Title | `stack_video_embed_card_title` | `string` | `Video card title` | Optional title |
| Video URL | `stack_video_embed_card_url` | `string` | `https://www.youtube.com/watch?v=ezb8wJitEmI` | YouTube video URL |
| Card Order | `stack_video_embed_card_order` | `int` | `0` | Order of card |

</div>

### Heading Card

<div class="responsive-table-wrapper">

| Setting | Key | Type | Description |
|---------|-----|------|-------------|
| Heading Title | `stack_heading_title` | `string` | Section heading |
| Title Size | `stack_heading_title_size` | `string` | Size (e.g. `Default`, `XL`, `XXL`) |
| Enable Heading Card | `enable_stack_heading` | `bool` | `false` | Enables this heading card section. |

</div>

## Limitations

- Apps must be installed for icons/names to appear.
- HTML and Markdown rendering is basic (e.g., no tables/lists).
- Blocklist mode works only in multi-app cards. <span class="label label-green">#soon</span>
- Embedded videos and web URLs require network access.
