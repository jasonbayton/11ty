---
title: "Is it possible to backup & restore device data on a fully managed device?"
published: '2024-11-11'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - Fully managed
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 62000
--- 
Not by default. The standard Android backup service is disabled on fully managed devices, and historically there has been no way to change this.

However, Android now offers a `backupSettings` policy that allows administrators to control whether backup is permitted on fully managed devices, and can then be used with the Android Switch application. This is supported by custom DPC implementations and is expected to arrive in AMAPI in a future release. If your EMM supports this policy, it can be enabled to allow device backup to the Google account associated with the device. Check your EMM documentation for availability, as not all platforms expose this setting. 

Regardless of backup policy, as a best practice the organisation should offer end-users a cloud service - OneDrive, Google Drive, Dropbox, etc - to which company data is automatically synced, rather than relying solely on device-level backup.