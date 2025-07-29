---
title: Troubleshooting MANAGED ARCHIVER
parent: MANAGED ARCHIVER support
published: '2025-07-29'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Managed Archiver'
    - 'bayton-projects'
categories: 
    - Managed Archiver Setup
layout: base.njk
eleventyNavigation: 
    order: 4
    title: Troubleshooting issues
---

## MAMAGED ARCHIVER is not on the Play Store

Currently, the only requirements are:

- Google Messages as the default SMS application. Other SMS applications may be possible to integrate with, but they must [offer integration](https://developer.android.com/work/dpc/rcs-messages-archival#notification-to-archival-app) in a similar fashion to Google Messages.
- Firewall access to `*.bayton.org` from devices.
- Android devices managed as company-owned, fully managed or dedicated. Work profile is not supported.

## Install the application

MANAGED ARCHIVER is available as a private app via managed Google Play. After [reaching out](/contact) with your organisation ID, the application will be shared from the Google Play Console, and can be found by searching for it via the managed Google Play iFrame within the EMM you're using.

Simply log in to your EMM platform, navigate to the area where applications are configured and search the managed Google Play iFrame for the app name **MANAGED ARCHIVER**. Alternatively search on the package name: `org.bayton.managedarchiver`. 

## Configure the application

Archiver currently does not have managed configuration support. It is designed to immediately initiate a sync on installation to the PING API. An API key will be provided to securely fetch message and attachment archives into your own systems. Alternatively it can be possible to directly integrate with your own API, please reach out to discuss requirements.

## Support

[Get in touch](/contact) for further questions.