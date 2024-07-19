---
title: Customise the MANAGED SETTINGS experience
parent: MANAGED SETTINGS support
published: '2024-05-02'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Managed Settings'
    - 'bayton-projects'
categories: 
    - Managed Settings Customisation
layout: base.njk
eleventyNavigation: 
    order: 3
    key: Customise the experience
---
<div class="callout">
<div class="callout-heading">
<span class="material-symbols-outlined">work_alert</span> Licence required
</div>

To set customisation options, your organisation must be licensed. If you do not have a valid licence, please contact [project-support@bayton.org](mailto:project-support@bayton.org) to obtain one. Pricing is defined on the [project page](/projects/managed-settings/#what-does-managed-settings-cost). 

</div>

## Available customisations

MANAGED SETTINGS offers the following customisations:

**In-app title icon** _- Upcoming_
: The option to customise the in-app title icon, defaulted to the MANAGED SETTINGS icon, but will use the generic icon if the respective configuration below is set.

**App title** _- 1.0.0.0_
: The option to replace the default app title of **Settings** with another.

**Hide BAYTON branding** _- 1.0.0.0_
: The option to hide the majority of BAYTON branding. A small co-branded icon will remain in the footer area of the application settings page. Contact me if you require full whitelabelling.  

**Generic icon** _- 1.0.0.0_
: The option to swap from the default MANAGED SETTINGS app icon to that of a generic settings app icon as shown on the home screen or app launcher. **MANAGED SETTINGS will close if open when this configuration applies.**

### In future

**Theme**
: This will allow selection of a colour scheme to match an organisation's brand. It includes **Background colour**, **Card colour**, **Text colour**, and **Accent colour**.

**Custom intents**
: This will allow organisations to define their own intents, including those to other applications.

If you'd like to see more customisation options, or general features, [raise a feature request](https://github.com/baytonorg/managed_settings_tracker/issues/) or discuss your requirements on the [MANAGED SETTINGS Discord channel](https://discord.gg/YUY7jAjayr).

## Enter your organisation ID

In order to unlock customisations, input the licensed organisation ID of Android Enterprise bind. You can find this in two ways:

- Head to [Google Play admin settings](https://play.google.com/work/adminsettings) and log in with the account you used for your bind
- Open the managed Google Play iFrame within your EMM, and click the settings icon in the top right of the iFrame

If you've set up your organisation with the new customer signup (BTE) flow, you may also locate your Android Enterprise bind organisation ID through [Third-party Integrations](https://admin.google.com/ac/devices/settings/thirdparty) in the Google Workspace/Cloud identity admin console.

## Customise available settings

With a valid organisation ID set, you may continue to configure all customisation options in addition to the standard, unlicensed & freely available settings intents.

### Custom theme

<div class="callout callout-small">

Custom theme is planned for an upcoming release. 

</div>

For all theme-based customisations, you must specify a colour in HEX code format. [Color Kit](https://colorkit.co/color-picker/) offers a decent tool for colour selection if you require guidance. 

HEX code examples -

- #000000 - black
- #FFFFFF - white
- #FF4500 - orange-red

Submitting these colours via [project-support@bayton.org](mailto:project-support@bayton.org) along with your chosen theme name (non-identifiable preferred) will allow for a custom theme to be implemented in an app update, and the provided string can be entered into the theme input to apply. Options for dynamic theming are under review, rendering an app update unnecessary in future.

### Customising the in-app title icon

<div class="callout callout-small">

Title icon is expected in release 1.0.1.0.

</div>

The in-app title icon supports any PNG, JPG, or SVG file in the recommended dimensions of 128x128px. 

The file must be reachable from the application, as it will fetch and cache it. A valid URL must be used to where the image is hosted, file uploads are not supported.

MANAGED SETTINGS will attempt to accommodate any file it is offered, however if using dimensions different to the recommended 128x128px in any aspect ratio other than 1:1 (square) the resulting image may not look particularly good. If using a file format other than specified, it won't work at all.

MANAGED SETTINGS will attempt to load and cache the requested image from a remote URL. If the file is unreachable the app will fall back to a generic settings icon.

Likewise, if the image file is considerable in size, it may delay loading or time out entirely, leading to a fall back to the generic icon.

### Customising the app title

The in-app title offers a standard alphanumeric input to allow organisations to use their own company name or custom title. Do consider the length of the title being input, as more than ~20 characters may cause a line break, and look unsightly.

### Adding a custom intent

<div class="callout callout-small">

Custom intent support is planned for an upcoming release. Please vote on it [here](https://github.com/baytonorg/managed_settings_tracker/issues/2).

</div>

To support settings intents not currently provided by MANAGED SETTINGS, custom intents are supported within the managed app configuration. The managed config consists of:

- Title
- Description
- Intent

Intents generated will fall under the category **Your organisation** and sit at the very top of the intents list, above Network & connectivity

Custom intents will show an organisation icon (this will not be customisable).

The intent may be for Settings, or it may be for a custom application, MANAGED SETTINGS will not validate it.

## Customised example

The following are examples of a customised interface. I call these _lemon & lime_ and _sky_ - they're not available in the app, just examples.

**Legend** 
1. Background colour
2. Card colour
3. Accent colour
4. Title icon
5. Title
6. BAYTON branding
7. Text colour

![](https://cdn.bayton.org/assets/managed_settings/ms_customisation.png)