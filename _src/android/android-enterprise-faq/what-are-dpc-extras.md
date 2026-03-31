---
title: "What are DPC extras?"
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
  key: "What are DPC extras?"
  order: 55000
sources:
  - https://developer.android.com/work/dpc/build-dpc
  - https://developers.google.com/android/work/play/emm-api/prov-devices
  - https://developers.google.com/zero-touch/guides/customer/emm
---
DPC extras are a set of vendor-specific key-value pairs passed to the Device Policy Controller (DPC) during provisioning. They tell the DPC how to configure itself - things like which EMM server to connect to, what enrolment token to use, or which organisational unit the device belongs to.

These all fall under `android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE`. It is a nested JSON object within the broader provisioning payload, and Android passes it through to the DPC application untouched. The operating system does not read or interpret the contents - they are entirely defined by the EMM vendor.

### Where are they used?

DPC extras are supported across all major fully managed provisioning methods:

- **Zero-touch enrolment** - configured in the zero-touch portal or via the [customer API](https://developers.google.com/zero-touch/reference/customer/rest) as the `dpcExtras` field
- **QR code provisioning** - embedded directly in the QR code JSON payload
- **NFC provisioning** - included in the NFC provisioning bundle

### DPC extras vs provisioning extras

It is worth understanding the difference, as both appear in the same JSON payload but serve completely different purposes.

**Provisioning extras** are standard Android properties consumed by the OS provisioning framework. These have the prefix `android.app.extra.PROVISIONING_*` and control device setup behaviour - things like Wi-Fi credentials, locale, timezone, whether to skip encryption, or whether to leave all system apps enabled. Android reads and acts on these during the provisioning flow.

**DPC extras** are the contents of `PROVISIONING_ADMIN_EXTRAS_BUNDLE` specifically. Android does not interpret them at all. It simply delivers the bundle to the DPC once provisioning completes. Their keys and values are defined entirely by the DPC vendor.

Both coexist at the top level of the provisioning JSON, with `PROVISIONING_ADMIN_EXTRAS_BUNDLE` as a nested object:

<pre>
{
  "android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED": true,
  "android.app.extra.PROVISIONING_LOCALE": "en_GB",
  "android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
    "server": "<strong>your.emm.server.com</strong>",
    "enrollment_token": "<strong>token_value</strong>"
  }
}
</pre>

In this example, `PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED` and `PROVISIONING_LOCALE` are provisioning extras (handled by Android), while `server` and `enrollment_token` are DPC extras (passed to the EMM's DPC).

### AMAPI vs custom DPC

For **AMAPI** (Android Device Policy), the DPC extras bundle typically contains a single key: `com.google.android.apps.work.clouddpc.EXTRA_ENROLLMENT_TOKEN`. This is generated automatically when you create an enrolment token via [AMAPI](https://developers.google.com/android/management/provision-device), so administrators rarely need to construct or edit DPC extras manually.

For **custom DPC** implementations (Workspace ONE Intelligent Hub, Ivanti Mobile@Work, SOTI MobiControl, and others), the bundle contains vendor-specific keys. These might include the EMM server URL, staging credentials, organisational unit, or feature flags. The keys and expected values are defined by each vendor, and getting them wrong will typically cause enrolment to fail.

A collection of DPC extras for various EMM vendors can be found in the [DPC extras collection](/android/android-enterprise-zero-touch-dpc-extras-collection/).

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">Security: avoid embedding credentials</div>

Avoid including usernames and passwords in DPC extras where possible. If a device is mistakenly registered (wrong IMEI, typo, second-hand purchase), the credentials in the zero-touch or QR configuration could allow an unintended device to enrol and access corporate resources. Use enrolment tokens and server-side authentication where supported instead.
</div>

### Common provisioning extras

While not DPC extras themselves, these standard provisioning extras frequently appear alongside DPC extras and are worth knowing:

- `PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED` - keeps all pre-installed system apps enabled rather than disabling non-critical ones (the default behaviour)
- `PROVISIONING_LOCALE` - sets the device locale (e.g. `en_GB`)
- `PROVISIONING_TIME_ZONE` - sets the timezone (e.g. `Europe/London`)
- `PROVISIONING_SKIP_ENCRYPTION` - skips device encryption during setup (not recommended)
- `PROVISIONING_WIFI_SSID`, `PROVISIONING_WIFI_PASSWORD`, `PROVISIONING_WIFI_SECURITY_TYPE` - pre-configures Wi-Fi for provisioning

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">Formatting matters</div>

DPC extras use strict JSON. The last key-value pair within `ADMIN_EXTRAS_BUNDLE` must not have a trailing comma, or provisioning will fail with a parsing error. This is one of the most common mistakes when manually editing DPC extras.
</div>

For guidance on what to include for your specific EMM, see [What should I put in DPC extras?](/android/android-enterprise-faq/what-to-put-in-dpc-extras/)

