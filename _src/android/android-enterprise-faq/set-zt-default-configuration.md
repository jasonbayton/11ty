---
title: "Is it possible to set a zero-touch default configuration?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - Zero-touch
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "Is it possible to set a zero-touch default configuration?"
  order: 51000
---
Yes. A default configuration auto-assigns to any device newly added to your zero-touch account. Only one configuration can be the default at any time; creating or promoting a new default automatically clears the `isDefault` flag on the previous one.

Defaults do **not** reassign devices already present in the console. Anything already listed keeps whatever configuration (or no configuration) it had at the time the default was changed. To update existing devices, use the CSV import or the [customer API](https://developers.google.com/zero-touch/reference/customer/rest) to reassign them in bulk.

## When to use a default

Defaults are most useful when:

- You purchase devices continuously from the same reseller(s) and want them to enrol against the same EMM without manual intervention
- You operate a single-tenant deployment with one EMM/policy at a given site or business unit
- You want to guarantee new arrivals never slip through unconfigured

They are less useful when:

- Devices from different resellers or batches need different configurations
- You run multiple EMMs or tenants under one zero-touch account (a common MSP scenario)
- You prefer explicit per-device assignment as a control gate before devices ship to users

## Updating existing devices

Two supported bulk paths:

1. **CSV** - Download the template from the zero-touch portal, update the appropriate columns for the target IMEIs/serials, and re-upload. The portal processes the file and reassigns devices.
2. **Customer API** - Use [`devices.applyConfiguration`](https://developers.google.com/zero-touch/reference/customer/rest/v1/customers.devices/applyConfiguration) (or `devices.removeConfiguration`) to target devices programmatically. Suited for automation or integration with an EMM workflow.

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">Changes only apply at next setup wizard</div>

Reassigning a configuration - default or otherwise - has no immediate effect on a device that is already enrolled. The new configuration is only downloaded when the device next completes the setup wizard, i.e. after a factory reset. See [What happens if a new config for a different EMM or server is applied to an enrolled device?](/android/android-enterprise-faq/changing-config-on-enrolled-device/) for detail.

</div>

