---
title: "Why does Samsung Smart Switch not work on fully managed devices?"
published: '2026-04-06'
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
  order: 63500
sources:
  - https://docs.samsungknox.com/admin/knox-manage/kiosk-troubleshooting/
  - https://www.androidenterprise.community/category/general/discussions/conversations
---
Samsung Smart Switch automatically disables itself when a device enters Device Owner (fully managed) mode. This is intentional behaviour by Samsung, designed to prevent unmanaged data transfer on corporate devices.

### Why does this happen?

When a device is enrolled as fully managed, the EMM takes control of data flow and app installation. Smart Switch operates outside of this managed channel, so Samsung blocks it by default to avoid data leakage or uncontrolled restoration of personal data onto a corporate device.

This catches out many organisations that want to use Smart Switch to migrate data from an old corporate device to a new one during device refreshes.

### Is there a workaround?

Yes. Smart Switch supports managed configuration. Administrators can deploy Smart Switch as a managed application through their EMM and set the `allow_run` managed configuration key to `true`. This overrides the default block and allows Smart Switch to function on the fully managed device.

The exact steps vary by EMM:

1. Approve Smart Switch in managed Google Play (if not already approved)
2. Deploy it as a managed application to the target devices
3. Set the managed configuration key `allow_run` to `true`

Once configured, Smart Switch will function as normal during the data migration window. Administrators can remove the configuration or uninstall the app after migration is complete.

### Does this affect work profile devices?

No. Smart Switch functions normally on personally-owned work profile and COPE devices, as the parent profile is not under Device Owner control.
