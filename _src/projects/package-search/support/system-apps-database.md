---
title: PACKAGE SEARCH contribute system apps to the system app database
parent: PACKAGE SEARCH support
published: '2054-05-06'
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
    title: Contribute system apps to the system app database
---

As of version [1.0.6.5](/projects/package-search/release-notes/1065) PACKAGE SEARCH offers a feature to enable the synchronisation of system applications with the [system apps database](/android/android-system-app-database).

Unlike [package sync & version tracking](/projects/package-search/support/enable-package-sync), no user application data is collected, ensuring any and all apps synced to the database are only those that reside on the device from factory. In addition, version tracking is not enabled for this feature.

When enabled, PACKAGE SEARCH will send to the PING service all declared system apps, along with the device and operating system from which the system apps were found, at most once a day. These applications will then populate on the [system apps database](/android/android-system-app-database), allowing organisations to search for any system apps associated with a device for the purpose of troubleshooting or system apps management within an EMM.

## Don't EMMs already collect this information?

Sure, many do. Some do not. This database is useful either for when applications are not available in the EMM, or the partner supporting an organisation doesn't have immediate access to the customer's EMM.

This is another troubleshooting tool administrators and partners alike can use to validate preloaded system apps when needed.

## How to enable

Simply head to settings (the menu icon, top-right from the PACKAGE SEARCH app list), then toggle the option on:

**Contribute to the system apps database**

This will:

1. Trigger an immediate sync.
2. Turn on the scheduled worker. Packages will be synced daily and, as it's a JSON blob, even with 500+ applications it takes under a second to send.

All the heavy lifting is done by the PING service, this consumes little to no additional battery and a fraction of data.

PING will attempt to sync to the application database whenever a new device is added to the API, however it can take up to a day for the database to update on this website.