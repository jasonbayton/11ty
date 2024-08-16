---
title: PACKAGE SEARCH requirements for use
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
    order: 1
    title: Requirements for use
---
In order to leverage PACKAGE SEARCH, the following requirements and recommendations are provided below.

## Mandatory requirements

1. Android 7.0 or newer

## Network requirements

The following endpoints will be occasionally called for analytics and functionality (e.g. fetching additional Google Play information for applications):

1. https://ping.projects.bayton.org:443
2. gcm-http.googleapis.com:443/5228-5230
3. gcm-xmpp.googleapis.com:443/5228-5230
4. android.googleapis.com:443
5. fcm.googleapis.com:443/5228-5230
6. fcm-xmpp.googleapis.com:443/5228-5230
7. firebaseinstallations.googleapis.com:443
8. android-safebrowsing.google.com:443

_PING is the activation/licensing service. 2 through 9 are general Android Enterprise and Google infrastructure endpoints, including notification support, which isn't implemented, but may be in future_.

These endpoints are optional: 

- https://docs.google.com:443

For wider Android Enterprise support, which includes access to Google Play, account services, and more, read up on the [Android Enterprise Network Requirements](https://support.google.com/work/android/answer/10513641?hl=en). 

## Suggestions for optional functionality 

1. Availability of a browser within the managed environment (webview is intentionally not implemented)
   - Allows access to feedback form and app support links

This is not mandatory, however links will fail with a warning.

## Fully offline support

PACKAGE SEARCH will work in a fully-offline environment. Future functionality may be limited, however will have no impact on the core use case of the application.