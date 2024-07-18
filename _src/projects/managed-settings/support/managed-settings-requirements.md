---
title: Requirements for use
parent: MANAGED SETTINGS support
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
3. Android 7.0 or newer

## Network requirements (licensed organisations)

Network connectivity is **mandatory** to allow the licensing server to validate permission to apply customisations. If you do not need or wish to customise the app, working offline is fine. Get in touch for assistance.

The following endpoints are required for application functionality:

1. https://ping.projects.bayton.org:443
2. gcm-http.googleapis.com:443/5228-5230
3. gcm-xmpp.googleapis.com:443/5228-5230
4. android.googleapis.com:443
5. fcm.googleapis.com:443/5228-5230
6. fcm-xmpp.googleapis.com:443/5228-5230
7. firebaseinstallations.googleapis.com:443
8. android-safebrowsing.google.com:443

_PING is the activation/licensing service. 2 through 9 are endpoints for push notification support on which configuration may be sent (note: no actual push notifications will show on devices, there's no current use case for it)._

These endpoints are optional: 

- https://docs.google.com:443

For wider Android Enterprise support, which includes the managed configuration function of MANAGED SETTINGS, access to Google Play, account services, and more, read up on the [Android Enterprise Network Requirements](https://support.google.com/work/android/answer/10513641?hl=en). 

## Suggestions for optional functionality 

1. Availability of a browser within the managed environment (webview is intentionally not implemented)
   - Allows access to feedback form and app support links
2. Availability of a mail client 
   - Allows emailing configured support address from the app

Neither of these are mandatory, however links will fail with a warning.

## Fully offline support

MANAGED SETTINGS, the public version, requires a network connection to validate the application licence for licensed customisations. Given the obvious use case of kiosk and dedicated/single purpose deployments I appreciate this won't work for all organisations. Orgs looking for offline support have two options:

1. Purchase a licence for an unlocked version of MANAGED SETTINGS. Due to loss of visibility, this will be chargeable at the top 5,000+ device rate of £1000 and can be delivered as a private application via the Google Play iFrame or APK
2. Purchase a fully customised & themed version adapted to your organisation's brand, akin to that offered to MSPs/resellers, for £3,000 with no restrictions. Delivered via Google Play iFrame or APK.

Get in touch via [project-support@bayton.org](mailto:project-support@bayton.org) to discuss.