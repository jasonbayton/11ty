---
title: "Zero-touch initiation comes to the app generators"
date: '2026-09-26'
status: publish
author: 'Jason Bayton'
excerpt: "The wallpaper and contacts generators can now be woken by your AMAPI EMM to run on install, without users needing to open the app first."
type: post
tags:
  - Enterprise
---

A new opt-in feature has landed across my [wallpaper](https://gen.bayton.org/wallpaper/) and [contacts](https://gen.bayton.org/contacts/) generators, allowing the generated app to be woken by any AMAPI-powered EMM with application role support. This will enable immediate background functionality, such as setting the wallpaper or syncing a contact list, without users needing to first manually open the app.

## The problem

These apps are built to run in the background and never really be opened. The wallpaper app sets the wallpaper and maintains this while it is installed. The contacts app syncs a directory into an app-owned account within the system contacts service. In both cases you deploy the app so nobody has to touch it.

The problem with this approach is in Android's platform behaviour, and how it protects its users from malicious apps - they just can't run directly after installation without being first opened. Until then, the app sits in a **stopped state** essentially forever, but usually until a user taps the app icon. While it's stopped it receives no broadcasts and runs no background work, and a reboot won't help because it doesn't get the boot broadcast either. So in the EMM context you force-install the app, and it does nothing at all until someone opens it. On a kiosk or a shared device, that first tap might never come.

_This hasn't been a problem for my [insert MDM]_ - That's because for many EMM vendors still using the older custom DPC approach for mobile management, this was solved a long time ago. AMAPI on the other hand makes the ecosystem wait years for basic functionality - App roles support landed just last year. The new functionality in the generators with this release isn't needed for MDMs using custom DPCs.

## How it works

With **application roles**, a feature of the [Android Management API](https://developers.google.com/android/management) (AMAPI). Assigning an app a role in policy triggers the on-device Android Device Policy DPC to wake the app directly, and that is enough to bring the package out of the stopped state. The app wakes, runs its sync or applies its wallpaper, and from then on schedules itself and handles reboots normally. One wake is all it needs.

I've watched this work end to end on my managed devices with the wallpaper app. After deploying the app and applying the role in the EMM console, the wallpaper applied as if by magic, and without touching the app itself. The contacts app uses the identical mechanism for its background sync also.

## Turning it on

There's a new toggle in each generator which is off by default. Once **Enable application-role background activation** is toggled on, the generated app builds, on-demand, the AMAPI SDK into it. It's entirely dynamic, so leaving it off leaves the SDK excluded entirely. 

The app then initiates a the small listener to receive a role assignment pings.. and the rest is as above.

It was important to me to make this as modular as possible. The SDK is chatty to Google in my testing, completely unnecessarily in my opinion, and so if background initiation isn't a requirement, privacy is a little stronger.

To use it on a device you'll need:

- an AMAPI-based EMM managing the device,
- the app installed through AMAPI's custom-app path, with its signing certificate authorised in policy (handled automatically if distributed through the Play iFrame), and
- a free application-role slot to assign.

A note on the role, my preference is `SYSTEM_HEALTH_MONITORING` as it's a bit of a catch-all. Be aware one app can have many roles, but a specific role can only be assigned to one app.

## Wrapping up

It's a small change, but it removes a genuine headache for many EMM admins.

If you manage devices with an AMAPI EMM, generate one with the toggle enabled, assign it a role, and watch the device sort itself out on its own.

As always, [let me know](/contact/) if you run into anything, or if this unlocks a use case I haven't thought of. Likewise, if you feel there's a usecase for enabling role support on Documents, Kiosk, or Webapp.. I'm open to hearing why.