---
title: MANAGED SETTINGS configurations
parent: Managed Settings support
published: '2024-05-02'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Managed Settings'
    - 'bayton-projects'
categories: 
    - Managed Settings Setup
layout: base.njk
eleventyNavigation: 
    order: 2
---
<div class="callout">
<div class="callout-heading">
<span class="material-symbols-outlined">work_alert</span> Default behaviour heads-up
</div>

Out of the box, MANAGED SETTINGS comes with no restrictions set on available settings offered. Without any configuration, the application will allow access to all supported Settings activity intents.

</div>

The following configurations are available for MANAGED SETTINGS:

## Network and connectivity

<div class="responsive-table-wrapper">

| Settings intent | Description | Type | Payload | Default | 
|-----------------|-------------|------|---------|---------|
| Network & Internet | Mobile, Wi-Fi, hotspot settings combined | Boolean | WIRELESS_SETTINGS | True |
| Wi-Fi | Add & connect to known networks | Boolean | WIFI_SETTINGS | True |
| Mobile network | Configure roaming and data settings | Boolean | NETWORK_OPERATOR_SETTINGS | True |
| APN | Configure SIM APN settings | Boolean | APN_SETTINGS | True |
| VPN | Create and connect to VPN connections | Boolean | VPN_SETTINGS | True |
| Bluetooth | Connect to & manage peripherals | Boolean | BLUETOOTH_SETTINGS | True |

</div>

Note: APN is often OEM-customised. The intent provided has been developed to attempt multiple approaches, but it may not work correctly on your managed estate. Please test before deployment, and feed back with findings.

## Device configuration

<div class="responsive-table-wrapper">


| Settings intent | Description | Type | Payload | Default | 
|-----------------|-------------|------|---------|---------|
| Display | Configure timeout, brightness, & display | Boolean | DISPLAY_SETTINGS | True |
| Sound | Configure sound settings | Boolean | SOUND_SETTINGS | True |
| Language | Configure device languages | Boolean | LOCALE_SETTINGS | True |
| Date & time | Configure date & time | Boolean | DATE_SETTINGS | True |
| Print | Configure print services & settings | Boolean | ACTION_PRINT_SETTINGS | True |
| Battery saver | Enable battery saving in emergency situations | Boolean | BATTERY_SAVER_SETTINGS | True |
| Battery optimisation | Configure apps excluded from optimisation | Boolean | IGNORE_BATTERY_OPTIMIZATION_SETTINGS | True |

</div>

## Security

<div class="responsive-table-wrapper">

| Settings intent | Description | Type | Payload | Default | 
|-----------------|-------------|------|---------|---------|
| Security & Privacy | Review & configure security & privacy settings | Boolean | SECURITY_SETTINGS | True |
| Unknown sources | Configure sources permitted to sideload apps | Boolean | MANAGE_UNKNOWN_APP_SOURCES | True |
| Developer settings | Configure developer settings, including debugging | Boolean | APPLICATION_DEVELOPMENT_SETTINGS | True |
| Accessibility | Configure apps with accessibility permissions | Boolean | ACCESSIBILITY_SETTINGS | True |

</div>

## Info

<div class="responsive-table-wrapper">

| Settings intent | Description | Type | Payload | Default | 
|-----------------|-------------|------|---------|---------|
| About device | View details about this device | Boolean | DEVICE_INFO_SETTINGS | True |
| Work policy information <span class="label label-sup label-green"><span class="material-symbols-outlined">android</span> 10</span> | View policies enforced on this device | Boolean | SHOW_WORK_POLICY_INFO | True |

</div>

## Support

Options configured for the applications settings screen, accessible through the menu icon ( <span class="material-symbols-outlined">
menu</span> )

<div class="responsive-table-wrapper">

| Config name | Description | Type | Payload | Default | 
|--------------------|-------------|------|---------|---------|
| Support message | Provide a support message in app settings. Support single string or HTML input | String | SUPPORT_MESSAGE | `This message can be customised through the Support message managed configuration within EMM application policy settings. For help configuring this application, please read the documentation.` |
| Support email address | Support email address to be shown under available actions | String | SUPPORT_EMAIL | project-support@bayton.org |
| Show feedback & Discord | Show the feedback and Discord buttons under available actions. Hiding these will prevent users providing feedback to bayton.org for improvements or new features | Boolean | SHOW_FEEDBACK | True |

<!--| Show reload config | Allow device users to reload config should an issue arise. | Boolean | SHOW_RELOAD_CONFIG | True |-->

</div>

<div class="callout">
<div class="callout-heading"><span class="material-symbols-outlined">work_alert</span> Formatting support messages</div>

FYI, the support message field supports HTML! You may use the following HTML tags: 

- `<P>` - HTML paragraph 
- `<A>` - HTML link
- `<B>` - HTML bold
- `<I>` - HTML italic

Feel free to customise this message as desired, or simply input a string.

</div>

## Customisation

For licensed organisations, read up on [Customising the MANAGED SETTINGS experience](/projects/managed-settings/support/customising-managed-settings).

<div class="responsive-table-wrapper">

| Config name | Description | Type | Payload | Default | 
|-----------------|-------------|------|---------|---------|
| Licensed organisation ID | Input an Android Enterprise organisation ID with an active licence to enable customisation | String | LICENCE | `null` |
| Use BAYTON App Icon | Disable this option to show a generic settings icon for your managed estate | Boolean | APPLICATION_ICON | True |
| Custom app title | Provide a name shown in the app header (default: Settings) | String | CUSTOM_APP_TITLE | Settings |
| *Custom title icon | Provide a URL to a public PNG/SVG/JPG image of the size 128x128px | String | CUSTOM_APP_TITLE_ICON | `null` |
| *Custom theme | Input the name of your provided theme | String | CUSTOM_APP_THEME | BAYTON |
| Show BAYTON settings branding | Removal of managed settings text advertising bayton.org and the discord available action; a BAYTON logo will still sit in the footer of the app, below available actions | Boolean | CUSTOM_REMOVE_BRAND | True |

</div>

*Arriving in a future update.

**Note: Theme and icon customisations require an app re-launch to apply**.

<!-- | Custom background colour | Provide a hex value colour for the app background colour | String | CUSTOM_BACKGROUND_COLOUR | #000000 |
| Custom card colour | Provide a hex value colour for the intent and action cards | String | CUSTOM_CARD_COLOUR | #D1D1D1 |
| Custom accent colour | Provide a hex value colour for the app accent colour (links, etc) | String | CUSTOM_ACCENT_COLOUR | #FF4500 |
| Custom text colour | Provide a hex value colour for the app text colour | String | CUSTOM_TEXT_COLOUR | #FFFFFF | -->