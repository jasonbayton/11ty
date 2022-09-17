---
title: 'Manual Android Enterprise work-managed QR code generation for MobileIron'
published: '2017-08-05T22:49:14+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
id: 4514
layout: base.njk
tags: 
    - Vendor specific
    - Provisioning
doccats:
    - MobileIron
Version:
    - '1.3'
publish_post_category:
    - '8'
discourse_permalink:
    - 'https://discuss.bayton.org/t/manual-android-enterprise-work-managed-qr-code-generation-for-mobileiron/48'
---
<div class="callout callout-warning">

### This isn’t officially supported

MobileIron only officially support QR codes generated through the [MobileIron Provisioner app](https://play.google.com/store/apps/details?id=com.mobileiron.client.android.nfcprovisioner). While the below works and has been extensively tested, do not expect MobileIron to assist with the manual creation of QR codes outside of the official application!

</div>

How it works
------------

When taking a factory-reset device out of the box, the Android setup wizard presents a “Welcome” screen. While this can and does vary on exact wording and placement, normally tapping on the “Welcome” text or a similarly placed logo 6 times in the same place will invoke the QR setup process.

Once invoked, the device will request a WiFi connection, perform a few initial checks, automatically download a QR reader and start it, ready to be presented with a QR code.

From there on the process is similar to that of the NFC and wireless token enrolment methods, with the setup wizard being largely skipped and the MobileIron agent instead presented for enrolment of the now work-managed device.

Prerequisites
-------------

In order for QR code enrolment to work with Android Enterprise, the following is required:

- Android 7.0+ with QR code support. Notable exclusions are Huawei, in which QR support is only available in EMUI versions **higher than** EMUI 5.1
- MobileIron Core 9.2 or above, where Android Enterprise (then Android for Work) was introduced.

Validate the checksum
---------------------

<div class="callout callout-warning">

### This is no longer necessary

In 2018 MobileIron switched from package checksum to admin signature checksum, meaning it’s no longer necessary to generate a package checksum unless you wish to do so for the sake of experimentation. The admin signature checksum will not need to be updated, and thus the MobileIron Core and Cloud code examples in the next section **may be used as-is**.

</div>

The below code requires an APK URL and checksum. While the URL is likely to remain the same, the checksum will change when the package is updated.

If the checksum fails, the device will prompt to perform a factory reset which adds a delay to provisioning. It may be possible to avoid this with a device reboot, however it’s always best to validate the checksum matches that of the APK before attempting to generate a QR code and provision devices.

To generate a checksum for a downloaded APK, with OpenSSL perform the following:

`cat name-of-APK-latest.apk | openssl dgst -binary -sha256 | openssl base64 | tr '+/' '-_' | tr -d '='`

To generate a checksum for the hosted APK (that is, via remote URL) CURL can be used instead:

```
curl -s https://support.mobileiron.com/android-client-nfc/mi/mi-android-nfc-latest.apk | openssl dgst -binary -sha256 | openssl base64 | tr '+/' '-_' | tr -d '='
```

This will now return a valid, SHA-256 checksum converted to URL-safe base64. An example checksum is as follows:

`tlYEdUEZ3sUGJM-ySibMl0YjJXKDoUJOM1GxSSoVsrE`

Replace ADMIN\_SIGNATURE\_CHECKSUM in the below code with the following to make package checksum work (making sure to add the actually generated checksum in place of the example):

```
"android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_CHECKSUM": 
"tlYEdUEZ3sUGJM-ySibMl0YjJXKDoUJOM1GxSSoVsrE",
```

MobileIron Core
---------------

Use the following code for provisioning a device against MobileIron Core:

```
{
"android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME":
"com.mobileiron/com.mobileiron.receiver.MIDeviceAdmin",

"android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM":
"xFg1LVfpb97Vq958bulXHYWpd4hmVOl2RU2ThGyktc0",

"android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION":
"https://support.mobileiron.com/android-client-nfc/mi/mi-android-nfc-latest.apk",
"android.app.extra.PROVISIONING_SKIP_ENCRYPTION": false,

"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":false,

"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
}
}
```

For more information about this raw code, read [MobileIron unofficially supports QR provisioning for Android Enterprise work-managed devices, this is how I found it](/2017/08/mobileiron-supports-qr-provisioning-for-android-enterprise-work-managed-devices-this-is-how-i-found-it/).

MobileIron Cloud
----------------

Use the following code for provisioning a device against MobileIron Cloud:

```
{
"android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME":
"com.mobileiron.anyware.android/com.mobileiron.polaris.manager.device.AndroidDeviceAdminReceiver",

"android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM":
"H2IxQHNSEQDujQ7aEQUzvl43Ngik_w9AGHExJhhWELE",

"android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION":
"https://support.mobileiron.com/cloud-android/current/MobileIron-Go-latest.apk",
"android.app.extra.PROVISIONING_SKIP_ENCRYPTION": false,

"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":false,

"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {

}
}
```

For more information about this raw code, read [MobileIron unofficially supports QR provisioning for Android Enterprise work-managed devices, this is how I found it](/2017/08/mobileiron-supports-qr-provisioning-for-android-enterprise-work-managed-devices-this-is-how-i-found-it/).

DPC extras
----------

In the QR codes above, the following extras can also be used as follows:

```
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
"server":"your.server.com",
"user":"jason",
"quickStart":true
}
```

Generating the QR code
----------------------

No special tools are required for generating MobileIron-compatible QR codes. As long as the chosen QR generator **supports free text**, any can be used. For the codes generated in the linked post above I used [qr-code-generator.com](https://www.qr-code-generator.com/).

![](https://r2_worker.bayton.workers.dev/uploads/2017/08/qr.png)