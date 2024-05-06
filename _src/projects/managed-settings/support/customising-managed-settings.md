---
title: Customise the MANAGED SETTINGS experience
date: '2024-05-02'
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
---
<div class="callout">
<div class="callout-heading">
Licence required
</div>

To set customisation options, your organisation must be licenced. If you do not have a valid licence, please contact [support@bayton.org](mailto:support@bayton.org) to do so. 

</div>

MANAGED SETTINGS offers the following customisations:

**Background colour**
: The background colour of the app. This is defaulted to black, or hex: #000000. 

**Text colour**
: The colour of non-interactive text in the app. This is defaulted to white, or hex: #FFFFFF

**Accent colour**
: The colour of links and interactive text. This is defaulted to orange, or hex #FF4500

**Generic icon**
: The option to swap from the default MANAGED SETTINGS icon to that of a generic settings icon

**In-app header icon**
: The option to customise the in-app header icon, defaulted to the MANAGED SETTINGS icon.

**Hide BAYTON branding**
: The option to hide the majority of BAYTON branding. A small co-branded icon will remain in the footer area of the application settings page.

## Enter your organisation ID

In order to unlock customisations, input the licensed organisation ID of Android Enterprise bind. You can find this in two ways:

- Head to [play.google.com/work/adminsettings](https://play.google.com/work/adminsettings) and log in with the account you used for your bind
- Open the managed Google Play iFrame within your EMM, and click the settings icon in the top right of the iFrame

If you've set up your organisation with the new BTE flow, you may also locate your Android Enterprise bind organisation ID through [Third-party Integrations](https://admin.google.com/ac/devices/settings/thirdparty).

## Customise available settings

With a valid organisation ID set, you may continue to configure all customisation options in addition to the standard, unlicensed & freely available Settings intents.

### Customising colours

For all colour-based customisations, you must specify a colour in HEX code format. [Color Kit](https://colorkit.co/color-picker/) offer a decent tool for colour selection if you require guidance. 

HEX code examples -

- #000000 - black
- #FFFFFF - white
- #FF4500 - orange-red

### Customising the header-icon

The in-app header icon supports any PNG, JPG, or SVG file in the recommended dimensions of 128x128px. 

The file must be reachable from the application, as it will fetch and cache it. A valid URL must be used, file uploads are not supported.

MANAGED SETTINGS will attempt to accommodate any file it is offered, however if using dimensions different to the recommended 128x128px in any aspect ratio other than 1:1 (square) the resulting image may not look particularly good. 

MANAGED SETTINGS will attempt to load and cache the requested image from a remote URL. If the file is unreachable the app will fall back to a generic settings icon.

Likewise if the image file is considerable in size, it may delay loading or time out entirely, leading to fallback to the generic icon.

## Customised example

The following is an example of a customised interface. I call this one _lemon & lime_.

![](https://cdn.bayton.org/assets%2Fmanaged_settings%2Fmanaged_settings_branding_mockup.png)