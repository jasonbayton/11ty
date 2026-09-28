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

A new opt-in feature has landed across my [wallpaper](https://gen.bayton.org/wallpaper/) and [contacts](https://gen.bayton.org/contacts/) generators, allowing the generated app to be woken by any AMAPI-powered EMM with [application role support](/android/android-enterprise-faq/amapi-application-roles/). 

This now allows applications to initiate immediate background functionality upon installation, such as setting the wallpaper or syncing a contact list, without users needing to first manually open the app - as has been the case since the generators were brought online for AMAPI-based EMMs.

## What's been happening

Both the wallpaper and contacts apps are particularly designed to mostly sit in the background and never really be opened; they have a UI, naturally, but it's for debugging and status, not for interaction. This is in contrast to kiosk and webapp, which, _obviously_ get actively used on install, but also documents, which is used when it's needed as it holds content a user will interact with. 

Since the wallpaper app sets the wallpaper and the contacts app syncs a directory into an app-owned account within the system contacts service, in both cases you'd deploy the app so nobody has to touch it with the intention it _just works_.

The problem with this approach is in Android's platform behaviour, and how it protects its users from malicious apps - _they just can't run directly after installation without being first opened_. Until then, an app sits in a **stopped state** essentially forever, or until a user taps the app icon.. whichever comes first. 

While it's stopped it receives no broadcasts and runs no background work. It is dead. A reboot won't help because it doesn't get the boot broadcast either. So in the AMAPI EMM context you force-install the app, and it does nothing at all until someone opens it. On a kiosk or a shared device, that first tap might never come if the app isn't exposed (and again, why would it be?).

_This hasn't been a problem for my [insert MDM]_ - That's because for many EMM vendors still using the older - and in some ways superior - [custom DPC](/android/android-enterprise-faq/amapi-vs-custom-dpc/) approach for mobile management, this was solved a long time ago. AMAPI on the other hand has made the ecosystem wait years for basic functionality time and time again, and background start of apps is one such affected function.

App roles support [landed just last year](/blog/2025/12/12-deliveries-of-aemas/) and isn't necessarily even designed for this use case, it's one feature in a bundle of restriction exclusions Google have released that overall make applications function within slightly _less hostile_ environment. More detail about roles in general are linked above.

The new functionality in the generators with this release isn't needed for MDMs using custom DPCs.

## How it works

With **application roles**, assigning an app a role in-policy triggers the on-device [Android Device Policy](/android/android-glossary/#android-device-policy-adp) DPC to wake the app directly, and that is enough to bring the package out of the stopped state. 

The app wakes, runs its sync or applies its wallpaper, and from then on schedules itself and handles reboots normally. One wake is all it needs. 

That's literally it. 

Naturally because roles also handle restrictions on battery optimisation, apps assigned get the added benefit, as I mentioned above, of being less likely to be subdued by Android, improving efficacy of the app overall.

I've watched this work end to end on my managed devices with the wallpaper app. After deploying the app and applying the role in the EMM console, the wallpaper applied as if by magic, and without touching the app itself. The [contacts app](/projects/contacts-app-generator/) uses the identical mechanism for its background sync also.

## Turning it on

There's a new toggle in each generator under **behaviour**. Once **Enable application-role background activation** is toggled on, the generated app builds, on-demand, the AMAPI SDK into it. It's entirely dynamic, so leaving it off leaves the SDK excluded entirely. 

The app then initiates a small listener to receive role assignment pings.. and the rest is as above.

It was important to me to make this as modular as possible. The SDK is chatty to Google in my testing, completely unnecessarily in my opinion, and so if background initiation isn't a requirement, privacy is a little stronger.

To use it on a device you'll need:

- an AMAPI-based EMM managing the device,
- the app installed through AMAPI's managed Google Play iFrame or [custom-app path](/android/android-enterprise-faq/amapi-direct-apk-installation/), with its signing certificate authorised in policy (handled automatically if distributed through the [Play iFrame](/android/android-enterprise-faq/manage-private-apps/)), and
- a free application role slot to assign.

If you're torn deciding between [the roles](/android/android-enterprise-faq/amapi-application-roles/), my preference is `SYSTEM_HEALTH_MONITORING` as it's a bit of a catch-all. Be aware one app can have many roles, but a specific role can only be assigned to one app.

## Wrapping up

This is a small change, but it removes a genuine headache for AMAPI EMM admins. 

As always, [let me know](/contact/) if you run into anything, or if this unlocks a use case I haven't thought of. Likewise, if you feel there's a usecase for enabling role support on [Documents](/projects/document-app-generator/), [Kiosk](/projects/kiosk-app-generator/), or [Webapp](/projects/web-app-generator/).. I'm open to hearing why.