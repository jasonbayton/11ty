---
title: "How can I provision a fully managed device?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - AE FAQ
    - AE Fully Managed
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "How can I provision a fully managed device?"
  order: 22000
--- 
There are several options for provisioning into any fully managed deployment scenario (COBO, COPE, COSU):

- **NFC** (5.0+): With the use of a provisioning app provided by your EMM of choice on a spare device, simply input basic environment details and bump NFC radios with a freshly factory reset (or brand new out of box) device to begin provisioning.
- **Managed Google account** (6.0+): Begin setting up a device as normal (including connecting to a network) and at the Google account prompt, enter the managed Google account (G Suite, Google Cloud Identity) address and authenticate as normal.
- **DPC identifier** (6.0+): Begin setting up a device as normal (including connecting to a network), but at the prompt to enter a Google account opt instead to input the DPC identifier of your EMM, plenty of examples are available [here](/android/android-enterprise-dpc-identifier-collection/).
- **QR code** (8.0+): With a QR code provided by either the EMM solution or a counterpart provisioning app (the same potentially used to provision via NFC), simply tap 6 times on the welcome screen to be download the QR reader (8.0) or switch to it automatically (9.0). WiFi details are required unless provided within the QR for 9.0 devices.
- **Zero-touch** (8.0+): Devices purchased through an authorised reseller may be assigned to a zero-touch customer account, and with a configuration created and assigned the device with automatically begin zero-touch provisioning as soon as network connectivity is established.
- **KME** (Knox 2.8+): Samsung devices running Knox 2.8 or above are compatible with Android Enterprise provisioning via KME. Devices added to the KME portal with a profile assigned will begin KME provisioning from a factory reset state.
- **Other**: Your device OEM may support other methods of provisioning. Reach out to them to request details.

More details:

- [Did you know? Android Enterprise fully managed provisioning methods](/android/infobyte-did-you-know-android-enterprise-work-managed-provisioning-methods/)
- [Android Enterprise provisioning guides](/android/android-enterprise-provisioning-guides/)

