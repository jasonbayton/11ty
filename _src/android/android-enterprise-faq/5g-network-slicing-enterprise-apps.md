---
title: "Can I route specific apps through 5G network slicing?"
published: '2026-04-05'
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
  order: 1130
sources:
  - https://developers.google.com/android/management/5g-network-slicing
  - https://source.android.com/docs/core/connect/5g-slicing
  - https://developer.android.com/work/versions
---

Yes. On devices and networks that support 5G network slicing, AMAPI can route traffic for specific applications through dedicated enterprise slices rather than the default carrier data path.

### How it works

A 5G network slice is a logically separate path through the carrier network with its own quality of service, latency, and bandwidth characteristics. An enterprise can subscribe to one or more slices from a participating carrier and configure managed devices to use them.

In AMAPI, this is controlled through two policy fields:

- `preferentialNetworkService` at the policy level enables preferential network service on the device
- `preferentialNetworkServiceSettings` defines up to five preferential network configurations, each identified as `PREFERENTIAL_NETWORK_ID_ONE` through `PREFERENTIAL_NETWORK_ID_FIVE`
- `preferentialNetworkId` on each application policy assigns that application to one of the configured slices. A `defaultPreferentialNetworkId` can also be set at the policy level for any application that does not specify one

### Requirements

- Device must be running Android 13 or later for per-app routing on fully managed devices. Work profile-wide routing (all work apps through one slice) has been possible since Android 12
- The device must support 5G slicing and be connected to a 5G network from a carrier that has provisioned slices for the enterprise
- The enterprise must have a commercial arrangement with the carrier to obtain slices and the mapping between `PREFERENTIAL_NETWORK_ID_n` values and actual carrier slices
- The EMM must expose the relevant AMAPI fields in its console. Not all EMMs have exposed these yet

### Typical use cases

- Guaranteeing bandwidth for a video conferencing or field-service app during periods of congestion
- Separating payment or point-of-sale traffic onto a slice with defined latency and routing guarantees
- Routing CCTV, telemetry, or industrial IoT app traffic through a dedicated slice distinct from general browsing and messaging

### Limitations

- Slicing is a carrier capability, not a device capability alone. Without an enterprise slice provisioned by the mobile network operator, the policy has no effect
- Slicing does not substitute for an enterprise VPN. Slicing controls the path through the carrier network; it does not by itself terminate the traffic inside the corporate network
- Coverage for 5G slicing remains limited geographically and by carrier in 2026, so organisations should confirm coverage in the regions where devices operate before relying on it
