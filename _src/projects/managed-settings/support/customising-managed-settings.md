---
title: Quick start
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
: The option to customise the in-app header icon, defaulted to the MANAGED SETTINGS icon. This supports any PNG, JPG, or SVG file in the recommended dimensions of 128x128px. The file must be reachable from the application, as it will fetch and cache it.  

**Hide BAYTON branding**
: The option to hide the majority of BAYTON branding. A small co-branded icon will remain in the footer area of the application settings page.

## Enter your organisation ID

In order to unlock customisations, input the licensed organisation ID of Android Enterprise bind. You can find this in two ways:

- Head to [play.google.com/work/adminsettings](https://play.google.com/work/adminsettings) and log in with the account you used for your bind
- Open the managed Google Play iFrame within your EMM, and click the settings icon in the top right of the iFrame

If you've set up your organisation with the new BTE flow, you may also locate your Android Enterprise bind organisation ID through [Third-party Integrations](https://admin.google.com/ac/devices/settings/thirdparty).

## Customise available settings

With a valid organisation ID set, you may continue to configure all customisation options in addition to the 


1. Log in to your EMM platform, navigate to the area where applications are configured and search the app name **MANAGED SETTINGS**. Alternatively search on the package name - `org.bayton.managedsettings`. 
2. Once selected, open the application configuration for MANAGED SETTINGS, and switch to managed configuration setup.
3. You may now de-select any Settings intents you don't wish to provide access to, define a support email address, and optionally a support message.

<div class="callout">
<div class="callout-heading">Formatting support messages</div>

FYI, the support message field supports HTML! You may use the following HTML tags: 

- `<P>` - HTML paragraph 
- `<A>` - HTML link
- `<B>` - HTML bold
- `<I>` - HTML italic

Feel free to customise this message as desired, or simply input a string.

</div>

4. Once configured and ready to deploy, push the application to desired devices.

For licensed organisations, read up on [Customising the MANAGED SETTINGS experience](/projects/managed-settings/support/customising-managed-settings).