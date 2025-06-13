---
title: The MANAGED INFO network connectivity card
parent: MANAGED INFO support
published: '2024-07-09'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Managed Info'
    - 'bayton-projects'
categories: 
    - Managed Info Features
layout: base.njk
eleventyNavigation: 
    order: 0
    title: The network connectivity card
---

## What is the Android Enterprise network connectivity card?

This card helps you verify that your device(s) can connect to all key Google services required for Android Enterprise management. It’s a fast way to diagnose network issues that could prevent device management, policy updates, app installs, or other enterprise features.

![alt text](https://cdn.bayton.org/assets/managed_info/network-connectivity-check/aec-card.png)

## What endpoints are tested?

When enabled, the connectivity card tests your device’s ability to reach a wide range of Google service endpoints, including:

- **Managed Google Play** (`play.google.com`)
- **Android Management API** services
- **Device provisioning servers**
- **Google authentication and API endpoints** (e.g. `accounts.google.com`, `googleapis.com`)
- **Firebase Cloud Messaging** (push notifications)
- **OTA/update servers**
- Other critical Android Enterprise domains

For each endpoint, the app:

- Checks that your device can connect to the required host and port (usually 443 for HTTPS)
- If using HTTPS, verifies that the SSL certificate is valid

**For the full list of required domains and ports checked, see:**  
[Android Enterprise network requirements (Google Help)](https://support.google.com/work/android/answer/10513641)

## How to use the card

First, the card should be enabled via managed configuration. Follow your EMM's guides to configure MANAGED INFO appropriately. The card _is_ enabled by default, but can always be turned off if desired.

Then:

1. Depending on where Device Info is shown, either
   1. Scroll down through the info cards in the main screen, or
   2. Open device info via the top navigation button. The AE network connectivity card is the last in the list.
2. The test starts automatically, showing a progress indicator as it checks each endpoint.
3. Once finished, a report appears:
    - **All green/OK**: All services are reachable and certificates valid.
    - **Failures listed**: One or more endpoints couldn’t be reached or failed certificate validation, with details shown for each.

You can **rerun the test** at any time by tapping the top-right retry icon on the card, or closing and reopening MANAGED INFO.

## Understanding the results

- **All reachable:** Your device is ready for Android Enterprise management and communication with Google’s services is healthy.
- **Some failures:** Your device cannot reach certain services, which may prevent management, app installs, OTA updates, or more.
  - Common causes include firewall rules, network proxy issues, Wi-Fi or VPN restrictions, or local outages.
  - If certificates fail, check device time settings and confirm your network is not intercepting HTTPS traffic.
  - In some cases, the Google endpoint may be down. This has been the case with `ota-cache2.googlezip.net` in the past, for example.
- **Device offline:** If the device is not able to connect to the internet, a message will display to say so.

![alt text](https://cdn.bayton.org/assets/managed_info/network-connectivity-check/device-offline.png)

## When should this card be used?

- **Initial setup:** Before enrolling or handing over a device, to confirm connectivity.
- **Troubleshooting:** When management, app installs, or policy sync are failing.
- **After network changes:** Anytime Wi-Fi, VPN, firewall, or network policies change.

## Feedback

The current implementation is always open to feedback. Some open questions include:

- Should the network test ever trigger automatically, or should it be switched to fully manual?
- If it remains automatic, should it re-trigger on network changes automatically, or wait for a manual trigger?
- Should it provide more visibility of tested hosts? The card will become quite large if each host is listed.

For any further feedback, please [reach out](/contact).