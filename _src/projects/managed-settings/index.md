---
title: Managed Settings
parent: Projects
titleimage: '/img/bayton_logos/managed_settings_hero.svg'
date: '2024-04-30'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: page
layout: project.njk
---

MANAGED SETTINGS is a project from BAYTON (BMS for short), offering a customised settings application where access to the native Android Settings application is not suitable for the use case or management scenario.

## What does MANAGED SETTINGS do?

MANAGED SETTINGS offers organisations a means of providing a limited device Settings experience, preventing over-exposing device settings that should not be visible or interactive for managed device end users.

It achieves this by acting as a gate-keeper for Settings intents - the individual Settings screens available when browsing the preloaded Android Settings app - allowing organisations to define what can and cannot be accessed and changed on device.

<a class="button" href="support/supported-configurations">View configurations</a>

## How does MANAGED SETTINGS do this?

Any application on-device has the option of launching specific Settings intents, you may be familiar with this when an application asks you to adjust notification settings, allow the app to draw over others, or grant it the accessibility permission to facilitate additional functionality. 

MANAGED SETTINGS takes this approach to act as a utility application for customisable settings-access, it does this through managed configuration, allowing organisations to define the intents made available to managed device end users, while hiding the Android Settings application entirely.

## Who is MANAGED SETTINGS for?

The primary use case is in Kiosk or managed launcher applications, where the Android Settings application is typically not exposed to device end users intentionally to avoid access to device settings that cannot be locked down entirely through device policy.

If your organisation struggles with the need to provide access to: 

- Wi-Fi (connection management)
- Bluetooth (peripheral management)
- Developer options (debugging and troubleshooting)
- Display settings (user-specific accommodations)

.. or any number of other device settings _without_ granting access to the full Android Settings application, MANAGED SETTINGS is for you.

## What does MANAGED SETTINGS cost?

MANAGED SETTINGS is a "freemium" application. 

Out of the box there are **no restrictions** on the number or type of settings you can provide access to. If you find the application useful and wish to customise it for your organisation, you can licence MANAGED SETTINGS for your Android Enterprise Organisation ID. 

Customisations include:

- Custom theme (text, background, accent colours)
- Hide most BAYTON branding
- Custom in-app heading & logo
- Leverage a generic application icon

In future versions it'll be possible to configure a custom intent also, useful for highly-modified OEM Android builds that may leverage non-standard Settings intents.

Customisation is available per organisation ID, and costs £500 up-front for up to 2,000 devices. Beyond 2,000 a nominal fee per installed device will be requested and go towards continued development of BAYTON projects.  

## Help & support

Head into the MANAGED SETTINGS knowledge base for support and guidance:

<a class="button" href="support/">View the docs</a>

Alternatively, you can submit [feedback](https://docs.google.com/forms/d/e/1FAIpQLSdYQrOPM0dKwCmcSjfxgoK2rQvhQXXyw2pk9nMqYBn0F2IhRw/viewform?usp=sf_link), post to the [discord community](https://discord.gg/YUY7jAjayr) or tag me on [LinkedIn](https://linkedin.com/in/jasonbayton). 
