---
title: MANAGED INFO quick start
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
    - Managed Info Setup
layout: base.njk
eleventyNavigation: 
    order: 0
    title: Quick start
---

## Install the application

MANAGED INFO is available as a public app on Google Play, which means locating the application for installation within your EMM platform of choice is quick and simple. 

You can view it on the Play Store, here: 

<a href='https://play.google.com/store/apps/details?id=org.bayton.managedinfo'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' width="200px"/></a>

To install it for enterprise management, log in to your EMM platform, navigate to the area where applications are configured and search the managed Google Play iFrame for the app name **BAYTON MANAGED INFO**. Alternatively search on the package name: `org.bayton.managedinfo`. 

## Configure the application

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small"> Head's up</div>

Without a configuration, a welcome card is displayed. When a managed config payload is deployed, this automatically goes away.

</div>

1. Once selected, open the application configuration for MANAGED INFO, and switch to managed configuration setup.
2. You may now configure how MANAGED INFO displays to end users, including enabling or disabling:
   1. Quick settings
   2. Organisation message
   3. Contact details
   4. Device details

Quick settings and contact details are reliant on filling out the contact information. If the default entries are blanked with no additional data provided:

- Contact details items will vanish (i.e., remove the phone number, the phone information row will vanish)
- The quick setting will remain, but show an unconfigured error if tapped (i.e. the call quick setting will show, but tapping it does nothing)
- If you clear all contact details data, a warning will show on the device.

You choose the information you provide, naturally, but be mindful of the above when doing so.

### Formatting the organisation message 

The organisation message field supports HTML & Markdown! You may use the following HTML tags: 

- `<P>` - HTML paragraph 
- `<A>` - HTML link
- `<B>` - HTML bold
- `<I>` - HTML italic
- `<BR>` - HTML new line

Or respective markdown tags:

- `*Italic*`
- `**Bold**`
- `# Heading`
- ``code``
- `[links](links)`
- `![image](image)`
- `1.` / `*` - Lists

Feel free to customise this message as desired, or simply input a string.

Once configured and ready to deploy, push the application to desired devices.

## Licence setup & advanced configuration

With a licence, available either as a one-time fee for the entire organisation, or £0.50 for each device requiring advanced configuration (see [pricing](/projects/managed-info/pricing)), it then becomes possible to unlock all integration features with remote solutions MANAGED INFO has to offer. 

To configure the licence:

1. Open MANAGED INFO managed configuration settings within the EMM in use.
2. Scroll to **Customisation settings**
3. Input the provided licence key in **Licensed organisation ID**.

Once licensed, the following configurations will become functional:

- Location data sync
- Metadata sync
- Device trust signals/verdicts data

Please note, in order for remote sync to function, a domain name must be provided for allowlisting.