---
title: MANAGED SETTINGS
parent: Projects
titleimage: '/img/bayton_logos/managed_settings_hero.svg'
date: '2024-04-30'
status: publish
funding_goal: 4000
funding: 400
funding_version: 1.0.1
author: 'Jason Bayton'
excerpt: ''
type: page
layout: project.njk
---

**MANAGED SETTINGS is an enterprise-customisable Android settings application designed to provide access to only specific, use case-defined system settings where use of the native Android Settings application is not suitable for end user access.**

## What does MANAGED SETTINGS do?

MANAGED SETTINGS answers the question: How do we block access to settings, but still allow <span id="dynamic_word"> adding a Wi-Fi network</span>?

MANAGED SETTINGS gives organisations a means of providing a limited device Settings experience, e.g. _just_ Wi-Fi or Bluetooth, preventing exposing settings that should not be visible or interactive for managed devices.

It achieves this by acting as a gatekeeper for Settings intents - the individual Settings screens available when browsing the preloaded Android Settings app - allowing organisations to define what can and cannot be accessed and changed on-device.

<a class="button" href="support/supported-configurations">View configurations</a>

## How does MANAGED SETTINGS do this?

Any installed application has the option of launching specific Android Settings intents, you may be familiar with this when an application asks you to adjust notification settings, allow the app to draw over others, or grant it the accessibility permission to facilitate additional functionality. 

MANAGED SETTINGS leans on this approach to act as a **utility application** for customisable settings-access, it does this through managed configuration, allowing organisations to define the intents made available to managed device end users, while hiding the Android Settings application entirely.

## Who is MANAGED SETTINGS for?

- Do you have kiosked, or locked-down dedicated devices?  
- Do you struggle to offer consistent documentation on _exactly_ where users must go to alter a setting on managed devices?

The primary use case is in Kiosk or Managed Launcher applications, where the Android Settings application is typically not exposed to device end users intentionally to avoid access to device settings that cannot be locked down entirely through EMM policy.

If your organisation struggles with the need to provide access to: 

- Wi-Fi (connection management)
- Bluetooth (peripheral management)
- Developer options (debugging and troubleshooting)
- Display settings (user-specific accommodations)

.. or any number of other device settings **_without_ granting access to the full Android Settings application**, MANAGED SETTINGS is for you.

If you *don't* leverage a dedicated/kiosk use case in your organisation, but struggle with the inconsistencies of OEM-customised Settings apps causing confusion with your documented processes and resources, MANAGED SETTINGS offers one consistent, supportable interface that can be deployed across your entire estate. With MANAGED SETTINGS there's no need to document where various Settings intents are stored across OEMs, simply deploy the app, provide universal guidance, and know end users will see all settings as you intend them to be seen.

## What MANAGED SETTINGS doesn't do

MANAGED SETTINGS does not _change device settings_. It holds no permissions to do so, and this is intentional.

If you feel strongly that MANAGED SETTINGS _should_ be able to change some device settings, submit feedback or raise a feature request (links below)

## What does MANAGED SETTINGS cost?

MANAGED SETTINGS is a **free** application. 

Out of the box there are **no restrictions** on the number or type of settings you can provide access to. 

If you find the application useful and wish to support further development, you can purchase a _one-time_ licence for MANAGED SETTINGS for your Android Enterprise Organisation ID and in return receive additional options to debrand and customise it for your organisation. 

Customisations include:

- Hide most BAYTON branding
- Custom in-app title & logo (logo coming #soon)
- Leverage a generic application icon

In future versions it'll be possible to theme the app, and **[configure custom intents](https://github.com/baytonorg/managed_settings_tracker/issues/2)**, useful for highly-modified OEM Android builds that may leverage non-standard Android Settings activities without waiting on me to support it (though happy to do so for popular requests). If you'd be interested in these features, they will be prioritised once licence revenue starts coming in.

The optional licence fee starts at £500, and goes up to £3,000 for a fully customised, private version of the app.

<a class="button" href="pricing">View pricing</a>

## Get started

You can find the app publicly here:

[![get it on play](https://cdn.bayton.org/assets/resources/get_it_on_google.svg)](https://play.google.com/store/apps/details?id=org.bayton.managedsettings)

And view the handy quick-start [right here](/projects/managed-settings/support/get-started/).

## Help & support

Head into the MANAGED SETTINGS documentation for support and guidance:

<a class="button" href="support/">View the docs</a>

Alternatively, you can submit [feedback](https://docs.google.com/forms/d/e/1FAIpQLSdYQrOPM0dKwCmcSjfxgoK2rQvhQXXyw2pk9nMqYBn0F2IhRw/viewform?usp=sf_link), post to the [Discord community](https://discord.gg/YUY7jAjayr), vote on or raise a [new feature request](https://github.com/baytonorg/managed_settings_tracker), or tag me on [LinkedIn](https://linkedin.com/in/jasonbayton). 

I can also offer additional priority support for an annual recurring fee, offering faster and more in-depth support, with additional discounts on my [consultancy rate](/support). Details can be found [here](pricing).

<script src="/js/managed-settings-dynamic-word.js"></script>