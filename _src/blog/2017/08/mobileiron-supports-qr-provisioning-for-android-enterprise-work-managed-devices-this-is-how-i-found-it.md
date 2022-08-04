---
title: 'MobileIron unofficially supports QR provisioning for Android Enterprise work-managed devices, this is how I found it'
date: '2017-08-02T08:45:13+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 4473
tag:
    - android
    - EMM
    - Enterprise
    - MDM
    - mobileiron
    - provisioning
    - qr
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/mobileiron-unofficially-supports-qr-provisioning-for-android-enterprise-work-managed-devices-this-is-how-i-found-it/79'
tags:
    - Enterprise
    - Projects
---
<div class="callout callout-success">

### Update!

MobileIron now officially support QR code provisioning. Check out the updated post: [MobileIron officially supports Android Enterprise QR code provisioning](/2017/10/mobileiron-officially-supports-android-enterprise-qr-code-provisioning/)

</div>
<div class="callout callout-warning">

### This isn’t officially supported

The following discusses a feature that is not officially supported and may stop working at any time. Use it as reference or learning experience to better understand the generation and validation of QR code enrolment with Android Enterprise rather than relying on it within your/another organisation for MobileIron enrolment unless support is officially announced.

The QR codes below point to the respective APK files hosted on **my own server** and not that of MobileIron. This is entirely due to the fact the QR codes will cease to function when the APKs are updated (and the checksum changes). As this is only demonstrating a proof of concept, hosting potentially out of date APK versions is not what I’d consider a problem, however I strongly advise you generate your own QR codes using the more official document I’ve created [here](/docs/enterprise-mobility/mobileiron/manual-android-enterprise-work-managed-qr-code-generation-for-mobileiron/) and, as above, use the below only for testing the process.

</div>

Android Enterprise supports a few options for provisioning devices destined to be work-managed, an NFC bump, a wireless enrolment token and, more recently, QR codes. For GSuite users there’s also the option to simply enrol using your corporate email address at the Google account prompt, but for Android Enterprise managed accounts we need to rely on the three mentioned above.

QR enrolment is particularly interesting to me as it offers some benefits:

- No need for another device to transfer an NFC provisioning payload
- Less “technical” than asking users to input the token (in the case of MobileIron, that would be `afw#mobileiron.core` or `afw#mobileiron.cloud`) in the Google account prompt
- QR codes can be generated on demand, within or external to MobileIron, and shared freely via email or any other means (as long as they don’t contain sensitive data)

I’ve badgered MobileIron a little bit recently on ETAs for rolling out QR support as [AirWatch already provides this](https://my.air-watch.com/help/9.1/en/Content/Platform_Guides/Android_Work/C/Enrollment_Overview.htm) but haven’t received any firm information (nor would I share roadmap info here either, of course). But when I saw how straightforward the raw code for generating an AirWatch QR code looked, I started to ponder.

Why wouldn’t it work?

Fundamentally the requirements for QR provisioning should already be baked into the Mobile@Work (and MobileIron Go) apps as the same components are used with NFC and token enrolment. The only thing missing as I saw it was the legwork to pull this existing information together in order to generate it as a QR.

I took the code provided by AirWatch above:

```
{
"android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME":
"com.airwatch.androidagent/com.airwatch.agent.DeviceAdministratorReceiver",

"android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM":
"6kyqxDOjgS30jvQuzh4uvHPk-0bmAD-1QU7vtW7i_o8=\n",

"android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION":
"https://awagent.com/mobileenrollment/airwatchagent.apk",
"android.app.extra.PROVISIONING_SKIP_ENCRYPTION": false,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
"serverurl": "Server URL",
"gid": "Group ID",
"un":"Username",
"pw":"Password"
}
}
```

And compared it to the closest thing MobileIron offers, the NFC provisioning payload transferred via NFC bump between two devices (one the provisioner, the other a freshly factory reset device supporting NFC out of the box). Using an NFC reader app on another device I got this:

```
#NFC provisioning
#Wed Jul 19 22:27:55 GMT+01:00 2017
android.app.extra.PROVISIONING_LOCAL_TIME=1500499675305
android.app.extra.PROVISIONING_TIME_ZONE=Europe/London
android.app.extra.PROVISIONING_WIFI_SECURITY_TYPE=wpa
android.app.extra.PROVISIONING_WIFI_PASSWORD=12345678
android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION=https\://support.mobileiron.com/android-client-nfc/mi/mi-android-nfc-latest.apk
android.app.extra.PROVISIONING_WIFI_SSID="myWIFI"
android.app.extra.PROVISIONING_LOCALE=en_GB
android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_CHECKSUM=VTra4byZJGOmUFXZpKzmQ7ST6nU
android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_NAME=com.mobileiron
```

They’re not identical, obviously, but I could see some similarities:

MI: `android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_NAME=com.mobileiron`  
AW: `"android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME":"com.airwatch.androidagent/com.airwatch.agent.DeviceAdministratorReceiver",`

MI: `android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_CHECKSUM=VTra4byZJGOmUFXZpKzmQ7ST6nU`  
AW: `"android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM":"6kyqxDOjgS30jvQuzh4uvHPk-0bmAD-1QU7vtW7i_o8=\n",`

MI: `android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION=https\://support.mobileiron.com/android-client-nfc/mi/mi-android-nfc-latest.apk`  
AW: `"android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION":"https://awagent.com/mobileenrollment/airwatchagent.apk",`

Turning then to the [Android Enterprise documentation](https://developers.google.com/android/work/prov-devices#create_a_qr_code), I noted `android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE` is optional, so removed it. I then used the information from the NFC payload to create a similar QR payload, as follows:

```
{
"android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME":
"com.mobileiron",
 
"android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM":
"VTra4byZJGOmUFXZpKzmQ7ST6nU", 

"android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION": "https://support.mobileiron.com/android-client-nfc/mi/mi-android-nfc-latest.apk", 
"android.app.extra.PROVISIONING_SKIP_ENCRYPTION": false, 
}
```

It didn’t work. I received errors on the device stating the code was invalid; probably not surprising given I was shooting entirely in the dark:

[![](https://r2_worker.bayton.workers.dev/uploads/2017/08/IMG_20170731_180013633_HDR-e1501659360206.jpg)](/https://r2_worker.bayton.workers.dev/uploads/2017/08/IMG_20170731_180013633_HDR-e1501659360206.jpg)

On a whim, I added `android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE` back in but emptied it of configurations:

```
{
"android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME":
"com.mobileiron",

"android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM":
"VTra4byZJGOmUFXZpKzmQ7ST6nU",

"android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION": "https://support.mobileiron.com/android-client-nfc/mi/mi-android-nfc-latest.apk",
"android.app.extra.PROVISIONING_SKIP_ENCRYPTION": false,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
}
}
```

(For reference, ADMIN\_EXTRAS\_BUNDLE allows for additional bespoke, DPC-based configurations like server URL, user/password, etc)

Tried again, this time I got a message to say “Can’t set up device”. This was progress.

[![](https://r2_worker.bayton.workers.dev/uploads/2017/08/IMG_20170731_180155991_HDR-e1501659300412.jpg)](/https://r2_worker.bayton.workers.dev/uploads/2017/08/IMG_20170731_180155991_HDR-e1501659300412.jpg)

Noting the differences between MobileIron and AirWatch on `android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME` I figured this was the next item to focus on. Since AirWatch already provided the string to find in the app, finding the same in MobileIron’s should be simple, or so I thought.

APKs are really just archives, I therefore extracted the contents of both the AirWatch and MobileIron agents and started looking. A couple of days passed here as I jumped in and out of this while doing other things, but eventually gave up; the component name I was looking for wasn’t presented in plain text in either app.

Plain text is the key, because I then wondered if the app sources were obfuscated. After a little Googling and chatting with Android devs I stumbled across [Apktool](https://ibotpeaches.github.io/Apktool/), a free, open source utility for decoding Android apps back to their original (or near enough) source code.

Running it against AirWatch first I was – for the first time so far – able to open and freely read the contents of the Android Manifest file. Searching for DeviceReceiver took me directly to it, and a permission it uses, `android.permission.BIND_DEVICE_ADMIN`.

Searching then for `android.permission.BIND_DEVICE_ADMIN` in the Mobile@Work Android Manifest file gave me exactly what I needed:

`com.mobileiron.receiver.MIDeviceAdmin`

Following the format used by the example code, I combined it with the package name to end up with:

```
"android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME":
"com.mobileiron/com.mobileiron.receiver.MIDeviceAdmin",
```

Generating a new QR code against this got me further again! This time I received a checksum error – indicating there was a mismatch between the APK and the checksum I provided, both listed in the NFC payload and supposedly therefore fine.

[![](https://r2_worker.bayton.workers.dev/uploads/2017/08/IMG_20170728_162015929_HDR-e1501659022415.jpg)](/https://r2_worker.bayton.workers.dev/uploads/2017/08/IMG_20170728_162015929_HDR-e1501659022415.jpg)

Nevertheless, returning to the [Android Enterprise documents](https://developer.android.com/reference/android/app/admin/DevicePolicyManager.html#EXTRA_PROVISIONING_DEVICE_ADMIN_PACKAGE_CHECKSUM) I noticed the option for a SHA-256 checksum in place of the SHA-1 used with the NFC payload. Assuming QR provisioning is much newer than that of NFC I figured perhaps – despite notes on the docs to say SHA-1 will work for now – the documentation was outdated and therefore I had to use SHA-256 instead. So I generated a SHA-256, base64, URL-safe checksum using the following command in bash:

`cat mi/mi-android-nfc-latest.apk | openssl dgst -binary -sha256 | openssl base64 | tr '+/' '-_' | tr -d '='`

Where:

- `mi/mi-android-nfc-latest.apk` is the application
- `openssl dgst -binary -sha256` generates a SHA-256 checksum
- `openssl base64` converts it to base64
- `tr '+/' '-_' | tr -d '='` makes it URL safe (mandatory requirement)

I then had everything I needed, I thought, to make this work:

```
{
"android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME":
"com.mobileiron/com.mobileiron.receiver.MIDeviceAdmin",

"android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM":
"tlYEdUEZ3sUGJM-ySibMl0YjJXKDoUJOM1GxSSoVsrE",

"android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION":
"https://home.bayton.org/mi-android-nfc-latest.apk",
"android.app.extra.PROVISIONING_SKIP_ENCRYPTION": false,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
}
}
```

And yet, I was still getting the checksum error. I went through various troubleshooting steps to regenerate checksums, triple check the component name and much more, only to realise in a last-ditch attempt to get it working that I’d completely overlooked the type of checksum I was using:

`DEVICE_ADMIN_SIGNATURE` is used by AirWatch (which appears to use certificate(s) within the APK for validation), but for MobileIron I’d been generating package checksums. So I changed `SIGNATURE` to `PACKAGE` as follows:

```
{
"android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME":
"com.mobileiron/com.mobileiron.receiver.MIDeviceAdmin",

"android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_CHECKSUM":
"tlYEdUEZ3sUGJM-ySibMl0YjJXKDoUJOM1GxSSoVsrE",

"android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION":
"/download/mi-android-nfc-latest.apk",
"android.app.extra.PROVISIONING_SKIP_ENCRYPTION": false,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
}
}
```

Success!

<iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" frameborder="0" height="281" loading="lazy" src="https://www.youtube.com/embed/PBTI0TQAUyM?feature=oembed" title="MobileIron Android Enterprise QR provisioning" width="500"></iframe>

Here’s the QR for MobileIron Core that I’ve successfully tested, the APK is hosted on my own server to ensure this QR continues to work with the provided checksum:  
![](https://r2_worker.bayton.workers.dev/uploads/2017/08/static_qr_code_without_logo-5.png)

It took well over a week and 150+ factory resets on multiple test devices to get it up and running. Perhaps if I was a developer I’d have cracked it sooner, but nevertheless perseverance prevailed and I can now make use of QR codes before they’re officially supported!

To top it off, I also confirmed provisioning works equally fine with MobileIron Cloud (in about 20 minutes this time), with the code as follows:

```
{
"android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME":
"com.mobileiron.anyware.android/com.mobileiron.polaris.manager.device.AndroidDeviceAdminReceiver",

"android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_CHECKSUM":
"1voVtaGkapb9a-JIOlEItoB47KBmD832JwjBUiRqhNg",

"android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION":
"/download/mobileIron-go-46.0.0.9.p.apk",
"android.app.extra.PROVISIONING_SKIP_ENCRYPTION": false,
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
}
}
```

And here’s the QR for MobileIron Cloud, the APK is hosted on my own server to ensure this QR continues to work with the provided checksum:  
![](https://r2_worker.bayton.workers.dev/uploads/2017/08/static_qr_code_without_logo-4.png)

Update: A proper [document](/docs/enterprise-mobility/) has now been created. Check it out: [Manual Android Enterprise work-managed QR code generation for MobileIron](/docs/enterprise-mobility/mobileiron/manual-android-enterprise-work-managed-qr-code-generation-for-mobileiron/)

*What do you think of QR codes? Do you prefer them to other enrolment methods? Are you an end-user or administrator? Let me know your thoughts in the comments,[@jasonbayton](https://twitter.com/jasonbayton) on twitter or [@bayton.org](https://facebook.com/bayton.org) on Facebook.*