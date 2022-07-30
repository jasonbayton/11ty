---
title: 'MobileIron officially supports Android Enterprise QR code provisioning'
date: '2017-10-20T11:52:09+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 4786
tag:
    - android
    - 'android enterprise'
    - EMM
    - 'Enterprise Mobility'
    - MDM
    - mobileiron
    - qr
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/mobileiron-officially-supports-android-enterprise-qr-code-provisioning/77'
tags:
    - Enterprise
---
Overnight, MobileIron’s [Provisioner](https://play.google.com/store/apps/details?id=com.mobileiron.client.android.nfcprovisioner) app updated to version 1.2.0 and with it came the long-awaited support for QR code generation. The [Mobile@Work](https://play.google.com/store/apps/details?id=com.mobileiron) DPC received official support for QR enrolment on the 16th of this month with version 9.5.1.0 following [MobileIron Go](https://play.google.com/store/apps/details?id=com.mobileiron.anyware.android) last month, so it was only a matter of time!

I’ve covered unofficial QR code support with MobileIron previously:

- [MobileIron unofficially supports QR provisioning for Android Enterprise work-managed devices, this is how I found it](/2017/08/mobileiron-supports-qr-provisioning-for-android-enterprise-work-managed-devices-this-is-how-i-found-it/)
- [Manual Android Enterprise work-managed QR code generation for MobileIron](/docs/enterprise-mobility/mobileiron/manual-android-enterprise-work-managed-qr-code-generation-for-mobileiron/)

These articles garnered attention both within and outside of the MobileIron community, leading to the accelerated official support we see with today’s update. With that in mind, I’m obviously very interested in how it’s been implemented! As a reminder, here’s the (now supported) raw QR snippet I got working with MobileIron:

```
{
"android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME":
"com.mobileiron/com.mobileiron.receiver.MIDeviceAdmin",
 
"android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_CHECKSUM":
"tlYEdUEZ3sUGJM-ySibMl0YjJXKDoUJOM1GxSSoVsrE",
 
"android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION":
"https://home.bayton.org/mi-android-nfc-latest.apk",
"android.app.extra.PROVISIONING_SKIP_ENCRYPTION": false,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
}
}
```

And below, the MobileIron Provisioner-generated QR code I decoded:

```
{
"android.app.extra.PROVISIONING_LOCALE":"en_GB",
"android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME":"com.mobileiron/.receiver.MIDeviceAdmin",
"android.app.extra.PROVISIONING_TIME_ZONE":"Europe/London",
"android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION":"https://support.mobileiron.com/android-client-nfc/mi/mi-android-nfc-latest.apk",
"android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_CHECKSUM":"F-Ui0YRmoacQYly_lzW8eOCHxjc9TVy6R5eQ9FtSdRk",
"android.app.extra.PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED":true,
"android.app.extra.PROVISIONING_LOCAL_TIME":"1508485289505",
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE":
{
"server":"core.bayton.org",
"user":"jason",
"quickStart":false,
"qrCode":true
}
}
```

There are indeed a couple of differences here, the most significant being the addition of `PROVISIONING_ADMIN_EXTRAS_BUNDLE` which wasn’t previously supported by the Mobile@Work DPC prior to the 9.5.1.0 release; this addition makes it even easier to get enrolled as it pre-applies the server URL and username within the DPC, leaving just a password (or PIN) required in order to get started. Nice.

Less significant, but very nice to support nonetheless is `PROVISIONING_LEAVE_ALL_SYSTEM_APPS_ENABLED`, providing the ability to leave system applications enabled. Now when enrolling, the EMM won’t have to try to download/enable system applications as they’ll already be available – another nice touch, however it does enable *everything,* bloatware too. You may find it easier to leave this off and manage via EMM to avoid having to manually hide all unwanted packages.

Otherwise, `PROVISIONING_LOCALE`, `PROVISIONING_TIME_ZONE` and `PROVISIONING_LOCAL_TIME` are the same as those found in the NFC payload.

One other interesting thing to note is the use of `PROVISIONING_DEVICE_ADMIN_PACKAGE_CHECKSUM` rather than `PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM`; as I’ve mentioned in my previous article(s), the package checksum changes when the DPC is updated, which is why running:

```
$ curl -s https://support.mobileiron.com/android-client-nfc/mi/mi-android-nfc-latest.apk | openssl dgst -binary -sha256 | openssl base64 | tr '+/' '-_' | tr -d '='
$ F-Ui0YRmoacQYly_lzW8eOCHxjc9TVy6R5eQ9FtSdRk
```

Generates a different checksum to:

```
$ curl -s /download/mi-android-nfc-latest.apk | openssl dgst -binary -sha256 | openssl base64 | tr '+/' '-_' | tr -d '='
$ tlYEdUEZ3sUGJM-ySibMl0YjJXKDoUJOM1GxSSoVsrE
```

Mine hosted is 9.4.x, MobileIron’s is 9.5.1.0.

This means the checksum is going to need to be updated more frequently, and I’m not sure how MobileIron are managing that but as they’ve been using this to date with the NFC payload, it’s probably no big deal.

<div class="bs-callout bs-callout-success">### Admin signature is now used

From Provisioner 1.3, MobileIron have switched over to Admin Signature Checksum. This means the QR code generated in-app will be valid for far longer!

</div>Implementation
--------------

The use of the Provisioner app for QR generation is an interesting one; I’d hoped EMM admins would be able to generate them directly from the Core/Cloud admin console either generically or as part of adding in a new device (wherein the admin extras for username could also be generated ad-hoc). Instead, admins will need to install the app on a device and generate them as required. Thankfully these can be shared over email or any other supported intent which doesn’t require the second device to be anywhere near those being provisioned which is a definite improvement over NFC.

![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2017/10/Screenshot_20171020-113503.png) ![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2017/10/Screenshot_20171020-113509.png)

For those wanting to generate QR codes without the use of the Provisioner however, my Manual Android Enterprise work-managed QR code generation for MobileIron document is still 100% valid and can used also (as long as you don’t ask MobileIron for support). If you’re looking for QR code provisioning enrolment guides also, check out [Android Enterprise provisioning guides](/android/android-enterprise-provisioning-guides/).

So there we are! Only two months after discovering it myself, MobileIron now officially support QR code provisioning for Android Enterprise.

*Are you a MobileIron admin or end-user? Will you be looking to make use of QR code provisioning for devices in your organisation? Let me know your thoughts in the comments, [@jasonbayton](https://twitter.com/jasonbayton) on twitter or [@bayton.org](https://facebook.com/bayton.org) on Facebook. If you’re on LinkedIn, you can also find me there – [/in/jasonbayton](https://linkedin.com/in/jasonbayton).*