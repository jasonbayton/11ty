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
    order: 3
    title: Customise the experience
---
<div class="callout callout-orange">
<div class="callout-heading">
Licence required
</div>

To set customisation options, your organisation must be licensed. If you do not have a valid licence, please contact [project-support@bayton.org](mailto:project-support@bayton.org) to obtain one. Pricing is defined on the [project page](/projects/managed-settings/#what-does-managed-settings-cost). 

</div>

## Available customisations

MANAGED INFO offers the following customisations:

**App title** _- 1.0.0.1_
: The option to replace the default app title of **Info** with another.

**Disable settings** _- 1.0.0.2_
: The option to disable access to MANAGED INFO settings, where BAYTON branding, links, and resources are provided. This will also adjust the left-hand application icon to reduce the SWIRL branding.

**Text cards** _-1.0.0.2_
: Allows for a custom card with a custom title to be configured. 

**Disable fun** _- 1.0.0.3_
: Removes the Baydroid mascot and swaps with a generic icon for warning states.

**Show device identifiers** _- 1.0.0.7_
: Show device identifiers, **IMEI**, **Serial number**, **Android ID**, and **Enrolment-specific ID**. This requires the delegated scope CERT_INSTALL and the permission READ_PHONE_STATE.

**Application & message cards** _- 1.0.0.8_
: Configure application cards. These cards hold one application and a text description. Useful for displaying an app with either a call to action, or a description.

**Application grid cards** _- 1.0.0.8_
: Configure an app grid. Like a traditional launcher, but neatly laid out within a card. These cards support a fixed icons-per-line, or unlimited with automatic wrap.

**Vertical and horizontal text stacks** _-1.0.0.8_
: Create cards in all directions. Supports stack-order as well as global order.

**Vertical and horizontal app & grid stacks** _-1.0.0.8_
: App cards and app grid cards in all directions. Supports stack-order as well as global order.

**Hide the top bar** _-1.0.1.6_
: Remove the top application bar with title, settings, etc.

**Integrate MANAGED SETTINGS** _-1.0.1.6_
: Allow end-users to open MANAGED SETTINGS directly from the topbar (hidden or not) for access to a limited settings experience.

**Card transparency** _-1.0.1.6_
: Configure card transparency, and toggle app grid mode (card or launcher style) 

**Headings** _-1.0.1.6_
: Add standalone headings for visual separation of sections

**Modular device details** _-1.0.1.6_
: Configure visibility of device details cards individually.
 
**Application background image** _-1.0.1.7_
: Configure, via URL, a background image for MANAGED INFO.
 
**Theme colours** _-1.0.1.7_
: Customise the main theme colours of the app - background, card, and text.
  
**Device details button** _-1.0.2.0_
: Show device details in an overlaid bottom sheet (modal) instead of within the main card stack.
   
**Configure heading sizes** _-1.0.3.0_
: When adding a heading, choose from three sizes.
    
**Launcher mode** _-1.0.3.0_
: Enable launcher mode to support persistent preferred intents, a more flexible home/launcher approach to the kiosk experience.

### In future

If you'd like to see more customisation options, or general features, [raise a feature request](https://github.com/baytonorg/managed_info_tracker/issues/) or discuss your requirements on the [MANAGED INFO Discord channel](https://discord.gg/7VzRZWVkht).

## Enter your organisation ID

In order to unlock customisations, input the licensed organisation ID of Android Enterprise bind. You can find this in two ways:

- Head to [Google Play admin settings](https://play.google.com/work/adminsettings) and log in with the account you used for your bind
- Open the managed Google Play iFrame within your EMM, and click the settings icon in the top right of the iFrame

If you've set up your organisation with the new customer signup (BTE) flow, you may also locate your Android Enterprise bind organisation ID through [Third-party Integrations](https://admin.google.com/ac/devices/settings/thirdparty) in the Google Workspace/Cloud identity admin console.

## Customise available settings

With a valid organisation ID set, you may continue to configure all customisation options in addition to the standard, unlicensed & freely available configurations.