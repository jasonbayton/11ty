---
title: Customise the MANAGED SETTINGS experience
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
    - Managed Settings Customisation
layout: base.njk
eleventyNavigation: 
    order: 3
---
<div class="callout">
<div class="callout-heading">
<span class="material-symbols-outlined">work_alert</span> Licence required
</div>

To set customisation options, your organisation must be licenced. If you do not have a valid licence, please contact [project-support@bayton.org](mailto:project-support@bayton.org) to obtain one. Pricing is defined on the [project page](/projects/managed-settings). 

</div>

## Available customisations

MANAGED SETTINGS offers the following customisations:

**Theme** _- Upcoming_
: This will allow selection of a colour scheme to match an organisation's brand. It includes **Background colour**, **Card colour**, **Text colour**, and **Accent colour**.

**In-app header icon** _- 1.0.0.0_
: The option to customise the in-app header icon, defaulted to the MANAGED SETTINGS icon.

**App title** _- 1.0.0.0_
: The option to replace the default app title of **Settings** with another.

**Hide BAYTON branding** _- 1.0.0.0_
: The option to hide the majority of BAYTON branding. A small co-branded icon will remain in the footer area of the application settings page.

**Generic icon** _- 1.0.0.0_
: The option to swap from the default MANAGED SETTINGS icon to that of a generic settings icon.

## Enter your organisation ID

In order to unlock customisations, input the licenced organisation ID of Android Enterprise bind. You can find this in two ways:

- Head to [Google Play admin settings](https://play.google.com/work/adminsettings) and log in with the account you used for your bind
- Open the managed Google Play iFrame within your EMM, and click the settings icon in the top right of the iFrame

If you've set up your organisation with the new BTE flow, you may also locate your Android Enterprise bind organisation ID through [Third-party Integrations](https://admin.google.com/ac/devices/settings/thirdparty) in the Google Workspace/Cloud identity admin console.

## Customise available settings

With a valid organisation ID set, you may continue to configure all customisation options in addition to the standard, unlicensed & freely available Settings intents.

### Customising colours

For all theme-based customisations, you must specify a colour in HEX code format. [Color Kit](https://colorkit.co/color-picker/) offers a decent tool for colour selection if you require guidance. 

HEX code examples -

- #000000 - black
- #FFFFFF - white
- #FF4500 - orange-red

Submitting these colours via [project-support@bayton.org](mailto:project-support@bayton.org) will allow for a custom theme to be implemented in an app update, and the provided string can be entered into the theme input to apply.

### Customising the header-icon

The in-app header icon supports any PNG, JPG, or SVG file in the recommended dimensions of 128x128px. 

The file must be reachable from the application, as it will fetch and cache it. A valid URL must be used to where the image is hosted, file uploads are not supported.

MANAGED SETTINGS will attempt to accommodate any file it is offered, however if using dimensions different to the recommended 128x128px in any aspect ratio other than 1:1 (square) the resulting image may not look particularly good. If using a file format other than specified, it won't work at all.

MANAGED SETTINGS will attempt to load and cache the requested image from a remote URL. If the file is unreachable the app will fall back to a generic settings icon.

Likewise, if the image file is considerable in size, it may delay loading or time out entirely, leading to a fall back to the generic icon.

### Customising the app title

The in-app title offers a standard alphanumeric input to allow organisations to use their own company name or custom title. Do consider the length of the title being input, as more than ~20 characters may cause a line break, and look unsightly.

## Customised example

The following is an example of a customised interface. I call this one _lemon & lime_.

**Legend** 
1. Background colour
2. Card colour
3. Text colour
4. Accent colour
5. Header icon
6. Title
7. Branding

![](https://cdn.bayton.org/assets%2Fmanaged_settings%2Fmanaged_settings_branding_mockup.png)