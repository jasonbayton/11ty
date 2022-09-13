---
title: "The device registered with zero-touch, but doesn’t launch during setup, why?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - AE FAQ
    - AE Zero-touch
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "The device registered with zero-touch, but doesn’t launch during setup, why?"
  order: 58000
--- 
This could be a few things:

- Check the manufacturer name is correct, the example CSV file downloaded from the portal lists Google as the manufacturer, and resellers may not have changed it.
- Confirm the IMEIs are correct.
- Confirm a configuration is present and assigned to the device.
- Is the device being setup on WiFi? Try cellular to rule out restricted networks.
- Is the device connected to a network at all? Check and connect if required.
- Is the device running 8.0+? With the exception of Pixel, no device running less than Oreo will support ZT.
- Does the OEM support ZT on the device? Unless Android Enterprise Recommended, zero-touch is optional and may therefore not be supported even on 8.0+ devices.

