---
title: PACKAGE SEARCH package sync & version tracking
parent: PACKAGE SEARCH support
published: '2054-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Package Search'
    - 'bayton-projects'
categories: 
    - Package Search Setup
layout: base.njk
eleventyNavigation: 
    order: 0
    title: Enable app version tracking
---

<span class="label label-orange">BETA</span> **Head's up, this feature is in beta**

As of version [1.0.6.0](/projects/package-search/release-notes/1060) it is possible to sync all currently-installed (including disabled) packages to the PING service (the project activation server) for Google Play version monitoring.

When the version on-device is older than that of Google Play, a banner will be shown within the application details screen, informing the user an update is available.

Like so:

![](https://cdn.bayton.org/uploads/2025/package-search-sync/Screenshot_2.png)

This is another troubleshooting tool administrators and end-users alike can use to validate installed application versions when Google Play isn't available due to policy.

## How to enable

Simply head to settings (the menu icon, top-right from the PACKAGE SEARCH app list), then toggle the option on:

![](https://cdn.bayton.org/uploads/2025/package-search-sync/Screenshot_1.png)

This will: 

1. Trigger an immediate sync.
2. Turn on the scheduled worker. Packages will be synced daily and, as it's a JSON blob, even with 500+ applications it takes under a second to send.
3. Turn on an API call when an app is opened to application details to validate the version installed vs available on Play.

All of the heavy lifting is done by the PING service, this consumes little to no additional battery and a fraction of data. 

PING checks for application updates roughly every 8 hours, but only queries packages that haven't been checked within the last 24 hours; so typically within a day of updating on Google Play, the warning will become visible if the application hasn't updated already.

## Limitations

1. Limited support for beta version codes. PACKAGE SEARCH compares all version codes to that provided by PING, however PING does not (yet) resolve version codes in the beta/open testing channel. Apps in Beta may report an update is available on Google Play and can be ignored.