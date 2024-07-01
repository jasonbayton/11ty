---
title: Requirements for use
parent: Managed Settings support
published: '2024-05-02'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Managed Settings'
    - 'bayton-projects'
categories: 
    - Managed Settings Setup
layout: base.njk
eleventyNavigation: 
    order: 1
---
In order to leverage MANAGED SETTINGS, the following requirements and recommendations are provided below.

## Mandatory requirements

1. An Enterprise Mobility Management (EMM/MDM) platform or CustomDPC solution
2. EMM platform or DPC solution support for managed configurations
3. Android 6.0 or newer

## Network requirements (licensed organisations)

Network connectivity is **mandatory** to allow the licensing server to validate permission to apply customisations. If you do not need or wish to customise the app, offline support is possible. Get in touch for assistance.

The following endpoints are required for application functionality:

1. https://ping.projects.bayton.org:443
2. https://bayton.org:443
3. gcm-http.googleapis.com:443/5228-5230
4. gcm-xmpp.googleapis.com:443/5228-5230
5. android.googleapis.com:443
6. fcm.googleapis.com:443/5228-5230
7. fcm-xmpp.googleapis.com:443/5228-5230
8. firebaseinstallations.googleapis.com:443
9. android-safebrowsing.google.com:443

_Number 1-2 are the activation/licensing services. 3 through 9 are endpoints for push notification support on which configuration may be sent (note: no actual push notifications will show on devices, there's no current use case for it)._

These endpoints are optional: 

- https://docs.google.com:443

For wider Android Enterprise support, which includes the managed configuration function of MANAGED SETTINGS, access to Google Play, account services, and more, read up on the [Android Enterprise Network Requirements](https://support.google.com/work/android/answer/10513641?hl=en). 

## Suggestions for optional functionality 

1. Availability of a browser or webview within the managed environment
   - Allows access to feedback form and app support links
2. Availability of a mail client 
   - Allows emailing configured support address from the app

Neither of these are mandatory, however links will fail with a warning.
