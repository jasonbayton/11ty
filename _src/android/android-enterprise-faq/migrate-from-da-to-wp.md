---
title: "Is it possible to migrate from DA to AE work profile without a re-enrol?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - Work profile
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "Is it possible to migrate from DA to AE work profile without a re-enrol?"
  order: 19000
--- 
Yes, however this process needs to be supported by the EMM. Few EMMs support this today, so it’s important to ask your vendor (or prospective vendor) if this is something you’d like to do.

The process itself will vary, but it may range from a checkbox in a profile to assigning a specific configuration, or simply a change at the folder/org/group level settings the devices sit within.

Once the process begins, affected devices will be prompted by the DPC to begin work profile setup. In this process the DPC will migrate from the parent profile (device) to a work profile. Understandably many legacy profiles/configs/policies will cease to function and so equivalent Android Enterprise policies should be in place.

