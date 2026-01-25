---
title: Customise the MANAGED INFO experience
parent: MANAGED INFO support
published: '2024-05-02'
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
    title: Customise the experience
---

## Available customisations

MANAGED INFO offers the following customisations:

**App title**
: The option to replace the default app title of **Info** with another.

**Disable settings**
: The option to disable access to MANAGED INFO settings, where BAYTON branding, links, and resources are provided. This will also adjust the left-hand application icon to reduce the SWIRL branding.

**Text cards**
: Allows for a custom card with a custom title to be configured. 

**Disable fun**
: Removes the Baydroid mascot and swaps with a generic icon for warning states.

**Show device identifiers**
: Show device identifiers, **IMEI**, **Serial number**, **Android ID**, and **Enrolment-specific ID**. This requires the delegated scope CERT_INSTALL and the permission READ_PHONE_STATE.

**Application & message cards**
: Configure application cards. These cards hold one application and a text description. Useful for displaying an app with either a call to action, or a description.

**Application grid cards**
: Configure an app grid. Like a traditional launcher, but neatly laid out within a card. These cards support a fixed icons-per-line, or unlimited with automatic wrap.

**Vertical and horizontal text stacks**
: Create cards in all directions. Supports stack-order as well as global order.

**Vertical and horizontal app & grid stacks**
: App cards and app grid cards in all directions. Supports stack-order as well as global order.

**Hide the top bar**
: Remove the top application bar with title, settings, etc.

**Integrate MANAGED SETTINGS**
: Allow end-users to open MANAGED SETTINGS directly from the topbar (hidden or not) for access to a limited settings experience.

**Card transparency**
: Configure card transparency, and toggle app grid mode (card or launcher style) 

**Headings**
: Add standalone headings for visual separation of sections

**Modular device details**
: Configure visibility of device details cards individually.
 
**Application background image**
: Configure, via URL, a background image for MANAGED INFO.
 
**Theme colours**
: Customise the main theme colours of the app - background, card, and text.
  
**Device details button**
: Show device details in an overlaid bottom sheet (modal) instead of within the main card stack.
   
**Configure heading sizes**
: When adding a heading, choose from three sizes.
    
**Launcher mode**
: Enable launcher mode to support persistent preferred activities, a more flexible home/launcher approach to the kiosk experience.
    
**Admin override for kiosk**
: When MANAGED INFO is in kiosk or launcher mode, an admin override feature is present to allow access to all device applications, temporarily.

**Admin override password for kiosk**
: When MANAGED INFO is in kiosk or launcher mode, an admin override feature can be enabled or disabled by an admin, with a password, to allow access to all device applications, temporarily.

**Theme override**
: The base theme (dark, light) can be manually configured to assist in default colour alignment based on use case.

**Additional colour options**
: It is possible to set unique text colours based on whether the text is in a card, or on the background of the app (e.g., card titles vs card content).

**Restrict connectivity card**
: Show or hide the Android Enterprise connectivity check card.

**Deploy applications via APK file**
: Deploy any device-accessible APK file to an Android device, as long as MANAGED INFO is configured as a companion app.

**Support EMM data configuration**
: Supports providing endpoints for EMM sync, policy/group/etc data shown within MANAGED INFO, metadata, location policy support.

**Support Device Trust**
: Used for determining state of Device Trust on the device.

**Setup Actions customisation**
: Allows setting the title, subtitle, visibility of the EMM summary card, and preventing factory reset.

**Vertical & horizontal YouTube cards**
: Embed required YouTube videos within the card stack layout. Beta feature.

**Deploy wallpaper as home & lock screen background**
: Take an image from any accessible URL to MANAGED INFO, and set it as the home screen and lock screen wallpaper. Unlike _Application background image (1.0.1.7)_ this applies natively to the device, and is not shown within MANAGED INFO.

**Deploy certificates**
: Support for CA and PKCS certificate deployment. This requires the `CERT_INSTALL` scope offered by AMAPI, or equivalent support from a custom DPC.

**App drawer support**
: When in launcher mode, show a persistent app drawer icon to provide access either to all, or only allowlisted applications

### In future

If you'd like to see more customisation options, or general features, [raise a feature request](https://github.com/baytonorg/managed_info_tracker/issues/) or discuss your requirements on the [MANAGED INFO Discord channel](https://discord.gg/7VzRZWVkht).

## Enter your organisation ID

In order to unlock remote data sync and backend service integration, inputting the licensed organisation ID of Android Enterprise bind is the first of a two-step process. You can find this in two ways:

- Head to [Google Play admin settings](https://play.google.com/work/adminsettings) and log in with the account you used for your bind
- Open the managed Google Play iFrame within your EMM, and click the settings icon in the top right of the iFrame

If you've set up your organisation with the new customer signup (BTE) flow, you may also locate your Android Enterprise bind organisation ID through [Third-party Integrations](https://admin.google.com/ac/devices/settings/thirdparty) in the Google Workspace/Cloud identity admin console.

When combined with the domain allowlist (contact [support](/contact) for assistance in handling this), all API/sync functionality will unlock.