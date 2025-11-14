---
title: MANAGED INFO requirements for use
parent: MANAGED INFO support
published: '2024-05-02'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Managed Info'
    - 'bayton-projects'
categories: 
    - Managed Info Setup
layout: base.njk
eleventyNavigation: 
    order: 1
    title: Requirements for use
---
In order to leverage MANAGED INFO, the following requirements and recommendations are provided below.

## Mandatory requirements

1. Android 7.0 or newer

## Network requirements

The following endpoints will be occasionally called for analytics and functionality (e.g. fetching managed config):

1. https://ping.bayton.org:443
2. gcm-http.googleapis.com:443/5228-5230
3. gcm-xmpp.googleapis.com:443/5228-5230
4. android.googleapis.com:443
5. fcm.googleapis.com:443/5228-5230
6. fcm-xmpp.googleapis.com:443/5228-5230
7. firebaseinstallations.googleapis.com:443
8. android-safebrowsing.google.com:443

_PING is the activation/licensing service. 2 through 8 are general Android Enterprise and Google infrastructure endpoints, including notification support, which isn't implemented, but may be in future_.

These endpoints are optional: 

- https://docs.google.com:443

For wider Android Enterprise support, which includes access to Google Play, account services, and more, read up on the [Android Enterprise Network Requirements](https://support.google.com/work/android/answer/10513641?hl=en). 

## Suggestions for optional functionality 

1. Availability of a browser within the managed environment (webview is intentionally not implemented)
   - Allows access to quick action website, feedback form, and app support links
2. A document reader and/or supported share targets
   - Allows viewing and sharing CSV file exports 
3. Availability of a mail application 
   - Allows sending mails to the configured email address
4. Availability of a mapping application
   - Allows opening in a map view the provided address

This is not mandatory, however actions will fail with a warning.

## Fully-offline support

MANAGED INFO can work in a fully-offline environment, though managed configuration will need to be delivered via alternative methods. Future functionality may be limited, however will have no impact on the core use case of the application.

Customisations currently cannot work in a fully offline environment. Licensing has a 30-day network unavailability grace period from the last successful PING before licensed features are disabled. Get in touch if this is a concern.