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

MANAGED SETTINGS is a project from BAYTON, offering a customised settings application where access to the native Android Settings application is not suitable for the use case or management scenario.

## What does MANAGED SETTINGS do?

MANAGED SETTINGS gives organisations a means of providing a limited device Settings experience, preventing over-exposing settings that should not be visible or interactive for managed devices.

It achieves this by acting as a gate-keeper for Settings intents - the individual Settings screens available when browsing the preloaded Android Settings app - allowing organisations to define what can and cannot be accessed and changed on device.

<a class="button" href="support/supported-configurations">View configurations</a>

## How does MANAGED SETTINGS do this?

Any installed application has the option of launching specific Android Settings intents, you may be familiar with this when an application asks you to adjust notification settings, allow the app to draw over others, or grant it the accessibility permission to facilitate additional functionality. 

MANAGED SETTINGS takes this approach to act as a utility application for customisable settings-access, it does this through managed configuration, allowing organisations to define the intents made available to managed device end users, while hiding the Android Settings application entirely.

## Who is MANAGED SETTINGS for?

The primary use case is in Kiosk or Managed Launcher applications, where the Android Settings application is typically not exposed to device end users intentionally to avoid access to device settings that cannot be locked down entirely through EMM policy.

If your organisation struggles with the need to provide access to: 

- Wi-Fi (connection management)
- Bluetooth (peripheral management)
- Developer options (debugging and troubleshooting)
- Display settings (user-specific accommodations)

.. or any number of other device settings _without_ granting access to the full Android Settings application, MANAGED SETTINGS is for you.

If you *don't* leverage a dedicated/kiosk use case in your organisation, but struggle with the inconsistencies of OEM-customised Settings apps causing confusion with your documented processes and resources, MANAGED SETTINGS offers one consistent, supportable interface that can be deployed across your entire estate. With MANAGED SETTINGS there's no need to document where various Settings intents are stored across OEMs, simply deploy the app, provide universal guidance, and know end users will see all settings as you intend them to be seen.

## What does MANAGED SETTINGS cost?

MANAGED SETTINGS is a *freemium* application. 

Out of the box there are **no restrictions** on the number or type of settings you can provide access to. If you find the application useful and wish to customise it for your organisation, you can licence MANAGED SETTINGS to your Android Enterprise Organisation ID. 

Customisations include:

- Custom theme (text, background, accent colours) (coming #soon)
- Hide most BAYTON branding
- Custom in-app heading & logo (logo coming #soon)
- Leverage a generic application icon

In future versions it'll be possible to configure custom intents also, useful for highly-modified OEM Android builds that may leverage non-standard Android Settings activities.

Customisation is available per organisation ID, and costs £500 one-time for up to 2,000 devices. £700 for up to 5,000 devices, and £1,000 up to and beyond 10,000 devices.

*For organisations, EDU, or charities with budget constraints, please get in touch.*

## Help & support

Head into the MANAGED SETTINGS documentation for support and guidance:

<a class="button" href="support/">View the docs</a>

Alternatively, you can submit [feedback](https://docs.google.com/forms/d/e/1FAIpQLSdYQrOPM0dKwCmcSjfxgoK2rQvhQXXyw2pk9nMqYBn0F2IhRw/viewform?usp=sf_link), post to the [discord community](https://discord.gg/YUY7jAjayr) or tag me on [LinkedIn](https://linkedin.com/in/jasonbayton). 
