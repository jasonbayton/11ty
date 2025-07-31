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

Presently Archiver is not hosted publicly in Google Play, this is because it's designed to start backing up to the PING API on installation. Through feedback the application's default behaviour may be adjusted and hosted publicly, but until further notice it will only be shared privately as a managed Google Play iFrame application made available to individual organisation IDs. 

Once shared, the application can be found by searching either on Managed Archiver, or - more reliably - `org.bayton.managedarchiver`.

## MANAGED ARCHIVER does not capture messages as they arrive/send

First, ensure Google Messages is the default messaging application. Archiver currently only functions with Google Messages. Support for other Messaging applications can be reviewed, however is not included presently.

Second, ensure Google Messages has been imported into your EMM, and managed configurations have been set. The allowlisted package name for broadcasting message related activities is `org.bayton.managedarchiver`.

Third, ensure Archiver has been opened at least once. You can refer to your EMM or OEM documentation on how to launch a newly-installed application via EMM.

Fourth, Archiver only supports reactive message capture on Fully Managed devices presently. This is a limitation imposed by Google.

## MANAGED ARCHIVER uses a lot of data

Archiver is designed to back up both messages and attachments. If users are sending attachment-heavy messages, this will directly impact the data use of the application. Message backup without attachments can be requested, if needed. Please also be aware the first backup will be heavy on data and time, and all subsequent backups will be significantly less. This is due to the initial launch behaviour of capturing all messages stored on a device.

## There is a delay between message receipt, and the message appearing in the PING API

Per Google's recommendation, Archiver will locally capture all messages as the arrive or depart from a device, but will sync to the PING service only once per hour. This is to avoid battery drain, excessive network traffic, and better-aligns with Android best practices. 

This behaviour may be noticed during testing, but once rolled out to production, the likelihood of requiring messages as they come is quite unlikely.

## MANAGED ARCHIVER uses a lot of space on-device

Archiver is designed to capture message attachments automatically. When it does so, it creates a copy to store in cache until messages are uploaded to the PING service. 24h following upload, the attachments are validated between local and remote through checksum, and then removed from the local cache automatically.

## Users are altering MANAGED ARCHIVER behaviour

Archiver should be configured in EMM policy to prohibit user control. This setting will then prevent users from force stopping, deleting data, or otherwise interfering with the behaviour of the application. Refer to EMM documents for how to manage this.

## Support

[Get in touch](/contact) for further questions.