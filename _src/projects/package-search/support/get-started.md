---
title: PACKAGE SEARCH quick start
parent: PACKAGE SEARCH support
published: '2024-05-02'
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
    title: Quick start
---

## Install the application

PACKAGE SEARCH is available as a public app on Google Play, which means locating the application for installation within your EMM platform of choice is quick and simple. 

You can view it on the Play Store, here: 

<a href='https://play.google.com/store/apps/details?id=org.bayton.packagesearch'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' width="200px"/></a>

To install it for enterprise management, log in to your EMM platform, navigate to the area where applications are configured and search the managed Google Play iFrame for the app name **BAYTON PACKAGE SEARCH**. Alternatively search on the package name: `org.bayton.packagesearch`. 

Once configured and ready to deploy, push the application to desired devices.

## Use the application

PACKAGE SEARCH comes as-is, with no additional enterprise managed configuration. If you'd like to see enterprise managed config support, submit feedback.

Once opened, PACKAGE SEARCH supports the following functionality:

### Filter by state

PACKAGE SEARCH's core USP is the ability to immediately and easily bring up package names of applications not available for the current user on a device. This allows organisation admins to deploy PACKAGE SEARCH to managed devices and still locate applications that require enabling via Android Enterprise policy. 

<img src="https://cdn.bayton.org/assets/package_search/ps_filter_state.gif" width="250px" />

You may notice when filtering, it populates the search bar with the filter used. PACKAGE SEARCH support several additional filters for fine-grained package search. The following are supported:

- `name:` - Application name
- `package:` - Package name
- `min:` - Minimum API level
- `code:` - Version CODE (1011)
- `version:` - Version NAME (1.0.1.1)
- `target:` - Target API level
- `state:` - Enabled, disabled, etc.
- `type:` - System, user

Examples include:

- `package:org.bayton.managedsettings`
- `min: 24`
- `state:unavailable`

In all filter searches, PACKAGE SEARCH will return any result that contains the query used. `name:camera` may return multiple applications, while `package:com.nothing.camera` would only return one application, as only the Nothing Camera app contains the full query.

### Sort by name, install date, and update date

Of course to be more generally useful, PACKAGE SEARCH also supports sorting by three common fields where said fields exist (with unavailable apps updated won't be present, for example):

- Sort by name (default)
  : Allows administrators to view an alphabetical list of applications installed

- Sort by installed date
  : Applications will be listed in order of most recently installed on the device

- Sort by updated
  : Applications will be listed in order of most recently updated on the device

<img src="https://cdn.bayton.org/assets/package_search/ps_sort_install.gif" width="250px" />

### View app info (system)

On any enabled or disabled app, tapping the application state will open the app details panel.

<img src="https://cdn.bayton.org/assets/package_search/ps_tap_state.gif" width="250px" />

### View app info (Google Play)

On any user, or Google Play-updated system app, tapping the application icon will open the Google Play listing.

<img src="https://cdn.bayton.org/assets/package_search/ps_tap_play.gif" width="250px" />

### Copy a package name to clipboard

Simply long-press on any application card, and it'll be automatically copied to clipboard.

<img src="https://cdn.bayton.org/assets/package_search/ps_long_press.gif" width="250px" />

### Get help

If you're in need of help or advice, or want to provide feedback, just tap the PACKAGE SEARCH app icon.

<img src="https://cdn.bayton.org/assets/package_search/ps_tap_icon.gif" width="250px" />
