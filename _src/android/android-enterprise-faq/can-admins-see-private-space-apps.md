---
title: "Are Private Space apps visible to enterprise admins?"
published: '2024-11-11'
status: publish
author: 'Jason Bayton'
excerpt: ''
categories:
    - Private Space
type: documentation
tags: 
    - FAQ
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 1000
--- 
No. 

Applications and data stored within the Private Space are **not** visible to enterprise administrators, this follows the existing premise set with the parent profile in a work profile (company/personally-owned) deployment. If this is an organisational concern, application policies [can be set](/android/android-enterprise-faq/manage-apps-in-private-space) for company-owned work profile deployments.

This may sound contradictory to [Are Private Space applications truly hidden?](/android/android-enterprise-faq/are-private-space-applications-really-hidden), however this is because the EMM agent runs within the _work profile_, which is intentionally restricted from visibility of apps outside of it.