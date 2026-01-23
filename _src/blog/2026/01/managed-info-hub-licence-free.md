---
title: "MANAGED INFO is going licence-free"
date: '2026-01-23'
status: publish
author: 'Jason Bayton'
excerpt: "Prepare your configurations to avoid abrupt change."
type: post
tags:
  - Enterprise
---

MANAGED INFO is moving to a predominantly licence-free model for almost all core capabilities.

Over the last 18 months the project has grown substantially in scope, from a simple information/support surface to a flexible and capable tool for building device experiences. On a deeper level, it has integrated new functionality that isn't even visible to end users, but the capabilities it provides now offers organisations an EMM-agnostic tool offering features an EMM might not.

I'm proud of many of the capabilities that have been integrated to date, it's been a fantastic learning experience getting hands-on with the AMAPI SDK and rolling out functionality that makes a difference. 

- Did you know MANAGED INFO was the first independent tool to roll out APK deployment, for example? The research, implementation, and subsequent [write-up](/blog/2025/08/amapi-apk-deployment) has been used across the ecosystem to help vendors build their own solutions.
- It was also one of the first solutions to get approval and support for Device Trust, which I wrote about [here](/blog/2025/10/device-trust-android-enterprise).

As the functionality matured, licensing has been something of an afterthought. Now, I feel, the licensing model has been making less sense. I've even been making many of the newer features (wallpaper support, certificate deployment, APK deployment) licence-free already. 

To address this, I'm restructuring licensing around the following boundaries:

- **Presentation and experience features** remain licence-free  
- **Integration and data-leverage features** become licensable

The practical effect is to make Managed Info easier to adopt and experiment with, while still aligning licences to features that provide partners and organisations with data they can in-turn use for other commercial purposes.

## What remains licence-free

The following experiences are now available without a licence:

### Customisation and layout

- Custom cards (text, video, app launchers, grids, stacks)
- Theme control and visual layout options
- Wallpapers and UI customisation

### Device experience

- Built-in contact and organisational messaging
- APK deployment in companion mode
- Certificate deployment
- Launcher and kiosk workflows
- Optional app drawer and admin escape panels
- Managed Settings integration

These are the capabilities that support *displaying information and building bespoke device experiences*, without extracting or exporting data externally. This aligns with how organisations commonly use Managed Info to present help, support content, or tailored launch surfaces.

## Which capabilities are now licenced

A licence is required when Managed Info is used in ways that materialise external value outside of presentation:

- **Device data integration** (trust signals, network state, hardware metadata)
- **Export of device signals** into external systems or dashboards
- **Companion usage in EMM workflows**
- **Operational data sync to external endpoints**

These features go beyond presenting information on device and into *data leverage territory*, where organisations can benefit operationally or commercially from the signals MANAGED INFO exposes, and going forward will be both licensed & allowlisted by external domain.

## Impact on existing deployments

This change will roll out with **1.1.8.0** over the coming days.

Please check your managed configurations. 

- Organisations that have changed any previously-licensed configurations without a licence will find they're applied automatically with the update to 1.1.8.0.
- Organisations with a licence will see no impact. 
- Organisations that may have already integrated with their EMM through the SetupActions or companion capabilities, please reach out.

Additionally: 

- For organisations with a licence, the device limits will no longer be enforced for use cases that don't require it. If the use case no longer falls under the licensed requirement, reach out to me to discuss options.
- Where the licence fee has been removed, anything more than light support (bug fixes, implementation advice) will become a chargeable service (see [support](/support)). Those organisations with licences are not affected by this.

## A new name & what's coming

You may notice further references to **MANAGED INFO HUB** or **MANAGED HUB** across the site and documentation.

That name better reflects the current shape of the project with the aim that it reflects more than just the fixed info/support panel the project started with; it’s becoming something of a handy EMM companion app (not just for APKs, but Location tracking, Device Trust data, and metadata sync are all available to interested partners. Reach out for details!)

In terms of other changes in 1.1.8.0, this was predominently about stability and performance, however the main new user-facing feature is an app drawer when MANAGED INFO is in launcher mode. The app drawer can be fully open, or limited only to the defined packages listed in managed config. It's pretty neat.

[![app drawer](https://cdn.bayton.org/uploads/2026/managed-info-licence/app_drawer.png)](https://cdn.bayton.org/uploads/2026/managed-info-licence/app_drawer.png)

## Wrapping up

Thanks to everyone to date who has used, supported, suggested improvements, or purchased licences for MANAGED INFO. For those who haven't, I hope you now take the opportunity to kick the tyres and see what MANAGED INFO can do for you!