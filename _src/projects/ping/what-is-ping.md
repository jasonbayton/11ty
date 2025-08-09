---
title: What is PING?
parent: Projects
published: '2025-08-09'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: page
tags: 
    - 'bayton-projects'
layout: base.njk
eleventyNavigation: 
    order: 3
---

All BAYTON projects sync to and reference PING in documentation, but what is it and why is it used?

## Overview 

PING is the name for the BAYTON projects API service. Devices typically make contact with the service once a day, though more frequently in cases of licence validation or when initiated through in-app feature use.

PING holds data related to project use, including features enabled, anonymised hardware/OS information, and country-level location reported via a geo-IP service. 

<div class="callout callout-blue">

Even within projects utilising the location permission, geo-IP does not use this, and goes no more specific than the country a device reports from.

</div>

## Why is it used?

PING was conceived primarily to solve the problem introduced with Google Play statistics for managed devices; _there aren't any_. Google Play only reports on consumer use of applications, and so enterprise managed devices do not show under the install base.

As of August 2025, with 2000 active devices reporting to PING, Google Play shows _45_.

Through continuous development, PING has evolved to additionally collect feature usage data (which configs get used most to prioritise development), user feedback, and additionally handles all licence logic, including authorised organisation IDs for which licensed functionality is unlocked. 

## What happens if it's blocked?

In closed networks or those with firewalls preventing access to PING (hostnames below), the following features will be unavailable, depending on the project:

- All licensed functionality
- Any PING-delivered functionality, e.g. app version tracking, alerts, archiving data

This is in addition to all analytics data. 

**PING hosts**

- `ping.projects.bayton.org:443`
- `ping-dir.projects.bayton.org:443`
- `ping.bayton.org:443`

## Is PING secure? 

All data sent to/from PING is encrypted. PING host storage is encrypted, and all system access is via key-based authentication.

Opinions are welcome if this should be hardened further to grant organisational project use. 