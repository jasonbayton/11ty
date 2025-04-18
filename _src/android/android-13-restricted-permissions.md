---
title: 'Android 13 & up restricts permissions when apps are sideloaded'
published: '2025-04-18'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - App management
eleventyNavigation:
  order: 8000
layout: base.njk
---

From Android 13 the permissions granted to sideloaded applications are restricted to boost device security and reduce a common attack vector through the installation of potentially harmful applications.

When installing an APK outside of the Play Store and attempting to grant certain permissions, the device will throw up an alert:

> **Restricted setting**
>
> For your security, this setting is currently unavailable.

![](https://static1.anpoimages.com/wordpress/wp-content/uploads/2024/04/android_restricted_settings_dialog-1000w-875h-png.jpg)

In newer Android versions, this has been improved to show:

> **App was denied access**
>
> Access to this permission can put your personal and financial info at risk.
>
> It's possible that the app won't work properly without this restricted permission.

Permissions that may be restricted from 13 to the current Android release include:

- Accessibility
- Notifications access
- Display over apps

## Allow restricted permissions 

If the application installed is known to be trustworthy, restricted permissions can be permitted via the following steps:

- Open Settings
- Tap Apps (may differ by OEM)
- Tap the affected app
- Tap the menu icon (top right), then Allow restricted settings

Alternatively from the open app:

- Tap the recents nav button, or swipe & hold the gesture bar to bring up recent apps
- Tap the app icon (top centre of the app) and App info
- Tap the menu icon (top right), then Allow restricted settings

![](https://static1.anpoimages.com/wordpress/wp-content/uploads/2024/04/android_allow_restricted_setting-1000w-875h-png.jpg)

## Should you do this?

Obviously, if you can't trust the app is legitimate, _don't permit access to special permissions_.

It's all too common to use APK download services (APK Pure, APK Mirror, etc) to grab apps unavailable by region or perceived device support, but this carries a high risk the application may not be official, or may have been tampered with. 

If you are sideloading APKs, be sure the source is trustworthy, signatures match where possible to validate, and/or they are only pulled down from the vendor website. 

Read more: [Why you shouldn't install apps from unknown sources](/android/why-you-shouldnt-install-apps-from-unknown-sources/)