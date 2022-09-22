---
title: "Devices factory reset as soon as they’re enrolled, why?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
    - Fully managed
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "Devices factory reset as soon as they’re enrolled, why?"
  order: 24000
--- 
Normally this would suggest either the respective Android Enterprise configurations aren’t assigned to the device, or there’s an issue with the binding between the EMM and Google.

Ensure the user of the device is in the correct Active Directory group (if relevant) or EMM group to receive the correct profiles, otherwise check the binding.

Occasionally and with some EMMs this may also happen if more than one device is enrolled with the same Device Identifier, eg: Serial Number or IMEI. Validate all Device Identifiers are unique (at least within an OEM/model) as it's not uncommon to see duplicates in the wild.

