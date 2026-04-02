---
title: "What is a managed Google domain, and should I upgrade?"
published: '2026-03-23'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags:
    - FAQ
categories:
    - General
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 3500
---
A managed Google domain is an organisation-owned domain (e.g. company.com) registered with Google and managed through the Google Admin console. It replaces the older managed Google Play Accounts enterprise model, where a personal Gmail address was used to create and administer the Android Enterprise bind.

### Why does this matter?

When Android Enterprise originally launched, organisations could bind using any Gmail account. This was simple but introduced risks:

- **Account security** - a personal Gmail account used for the bind could be compromised, disabled, or lost if the individual left the organisation
- **No centralised administration** - there was no role-based access, no MFA enforcement, and no SSO integration
- **Single-EMM limitation** - managed Google Play Accounts enterprises could only bind to one EMM at a time

A managed Google domain addresses all of these. Administration moves to corporate-owned credentials with proper identity governance, and the enterprise can bind multiple EMMs simultaneously - useful for organisations operating across regions or divisions.

### Should I upgrade?

Google now directs all new Android Enterprise customers to use a managed Google domain. Existing organisations on the older model are encouraged to upgrade, and Google's 2026 planning guidance lists this as a foundational step.

The upgrade is:
- **Free** - there is no cost to create a managed Google domain
- **Non-disruptive** - enrolled devices, approved apps, and EMM configurations remain intact
- **One-way** - you cannot revert to a Gmail-based bind after upgrading

Google provides a guided migration path. Your EMM vendor may also offer specific guidance for the process.

### How do I upgrade?

Follow Google's official upgrade guide: [Upgrade to managed Google domain](https://support.google.com/work/android/answer/16147675)

After upgrading, manage your enterprise through the [Google Admin console](https://admin.google.com) rather than play.google.com/work.

### Can I rename the organisation after upgrading?

There is no self-service option to rename the managed Google Play organisation name. For managed Google domain enterprises, the organisation name is inherited from the Google Workspace or Cloud Identity domain configuration and must be changed through the Admin console under Account settings. Choose the name carefully before initiating the bind or upgrade.
