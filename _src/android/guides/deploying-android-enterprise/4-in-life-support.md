---
title: 'In-life support'
date: '2023-09-21'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
tags: 
    - Guide
layout: base.njk
---

Once a solution is implemented, devices are rolled out, the next area of focus is in-life management of the solution, the devices and the end-users registered on the platform.

### Roles & permissions 

Out of the box EMMs come with a number of predefined roles with various capabilities for administrators assigned to them. However the organisation is tiered, it’s a good idea to structure EMM admin roles in the same way, such as restricting device wipes to a Tier 2, or the creation of profiles & configurations to a Tier 3. Judge this based on the perceived impact of an action, intentional or otherwise, to the device estate. One wrong click could see a number of devices removed from management.

Furthermore, roles also provide the visibility of various components of the EMM, both system and back-end configuration areas, but equally things like app inventory, device details and more covered in [privacy](#privacy); if location data is collected, perhaps only super-admins should be able to see this in line with company policies.

### Reporting

With devices under management and the vast amount of information that can be collected about users, devices, device usage and more, that makes an EMM platform a treasure-trove of valuable information.

Automated reports can collect telecoms usage, app information, device details, compliance information and much, much more. The organisation can use this information to make informed decisions about employees and the device estate to continuously improve the mobility strategy whilst identifying common issues and working to rectify them proactively.

Most platforms will equally support SIEM (security information and event management) solutions for monitoring and reporting with reporting solutions already in place, as well as APIs for collecting information live, and in turn performing actions with it.

### System maintenance

Like any other corporate solution, if the EMM server or EMM components reside on the corporate network, they will likely need to be backed up. The specifics of how this is undertaken will be documented for each EMM, however from a policy perspective, the EMM service as a whole should be considered a critical/high risk component and treated as such, including adding it to annual disaster recovery tests and so on.

Furthermore, updates are made available on a reasonably regular basis for the EMM and its components which reflects the speed at which the mobility industry moves. Keeping the solution up to date offers the obvious benefits of leveraging new functionality often.

### License management

Throughout the life of the EMM solution devices will enrol, unenrol, get lost or stolen and more. Unless maintained, it’s easy to find yourself in a position where licenses are being paid for, but not used as they’re applied to devices no longer under management.

Run regular audits to ensure this isn’t the case, and use this as an opportunity generally to keep tabs on devices in the wild, high breakage rates can be identified and resolved if monitored.

Furthermore, when devices are removed from management and the license revoked, a record may live on in the EMM console for auditing purposes. After many years the number of old records may start to impact database performance. Automated maintenance of device records can be scheduled for once retention policies have been satisfied, ensuring records stay at a reasonable number.

### * Troubleshooting & training

There will come a time when things don’t go quite right. Having a team of support professionals trained in Android, or Android enterprise troubleshooting will go a long way towards a quick resolution.

As part of
