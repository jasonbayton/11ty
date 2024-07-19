---
title: MANAGED SETTINGS quick start
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
    - Managed Settings Setup
layout: base.njk
eleventyNavigation: 
    order: 0
---
<div class="callout">

Out of the box, MANAGED SETTINGS comes with no restrictions set on available settings offered. Without any configuration, the application will allow access to all supported Settings activity intents.

</div>

## Prepare your policies

MANAGED SETTINGS will work as a standalone application in a mostly-unrestricted environment, but its true benefit comes with use within a kiosk environment, multi-app kiosk specifically. 

If you are using a kiosk-enabled policy today, and have had the settings application available - temporarily or permanently - this must be removed when MANAGED SETTINGS is deployed, otherwise end users will continue to simply leverage the Device Settings application.

<div class="callout callout-red">
<div class="callout-heading"><span class="material-symbols-outlined">work_alert</span> Settings access must be blocked</div>

If you're using an AMAPI-based EMM, ensure your kiosk settings stipulate access to Settings is **blocked**:

```json
"kioskCustomization": {
    "deviceSettings": "SETTINGS_ACCESS_BLOCKED",
}
```

Failure to do this will lead to unpredictable behaviour within the Device Settings application when it is invoked from MANAGED SETTINGS, in some cases allowing broad access to settings that are expected to be blocked.

For CustomDPC EMMs, please refer to your vendor documentation.

</div>

## Install the application

MANAGED SETTINGS is available as a public app on Google Play, which means locating the application for installation within your EMM platform of choice is quick and simple. 

You can view it on the Play Store, here: 

<a href='https://play.google.com/store/apps/details?id=org.bayton.managedsettings'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' width="200px"/></a>

To install it for enterprise management, log in to your EMM platform, navigate to the area where applications are configured and search the managed Google Play iFrame for the app name **BAYTON MANAGED SETTINGS**. Alternatively search on the package name: `org.bayton.managedsettings`. 

## Configure the application

1. Once selected, open the application configuration for MANAGED SETTINGS, and switch to managed configuration setup.
2. You may now select any Settings intents you wish to provide access to, define a support email address, and optionally a support message.

**Note: If you simply import managed config and save, the MANAGED SETTINGS application will remove access to all intents, showing a blank screen**.

<div class="callout">
<div class="callout-heading">Formatting support messages</div>

FYI, the support message field supports HTML! You may use the following HTML tags: 

- `<P>` - HTML paragraph 
- `<A>` - HTML link
- `<B>` - HTML bold
- `<I>` - HTML italic

Feel free to customise this message as desired, or simply input a string.

</div>

Once configured and ready to deploy, push the application to desired devices.

For licensed organisations, read up on [Customising the MANAGED SETTINGS experience](/projects/managed-settings/support/customising-managed-settings).