---
title: Network requirements
date: '2024-05-02'
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
---
The following endpoints are mandatory for application functionality:

- https://ping.projects.bayton.org:443
- gcm-http.googleapis.com:443/5228-5230
- gcm-xmpp.googleapis.com:443/5228-5230
- android.googleapis.com:443
- fcm.googleapis.com:443/5228-5230
- fcm-xmpp.googleapis.com:443/5228-5230
- firebaseinstallations.googleapis.com:443
- android-safebrowsing.google.com:443
- safebrowsing.google.com:443

These endpoints are optional: 

- https://docs.google.com:443

For wider Android Enterprise support, which includes the managed configuration function of MANAGED SETTINGS, access to Google Play, account services, and more, read up on the [Android Enterprise Network Requirements](https://support.google.com/work/android/answer/10513641?hl=en). 