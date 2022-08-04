---
title: 'How to manually update the Nokia 7 Plus to Android Pie'
date: '2018-10-01T23:21:44+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 6805
tag:
    - android
    - 'hmd global'
    - nokia
    - oreo
    - pie
    - update
    - upgrade
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/how-to-manually-update-the-nokia-7-plus-to-pie/191'
tags:
    - Mobile
---
<div class="callout callout-warning">

### Backup before proceeding

Upgrades aren’t guaranteed to succeed, to ensure you can restore your device in the event of a failed update, please backup your device before proceeding. </div>

Just before the end of September, HMD Global made good on their promise to release Android Pie for the Nokia 7 Plus.

The only thing is currently, it’s only rolling out to select markets and at a cautiously slow rate; the UK as well as many other countries around the world are as such not able to get their hands on it just yet.

To avoid the wait and get Pie immediately, it’ll need to be sideloaded. Here’s how:

\1. Grab the OTA download
-------------------------

The nice folks over on [XDA](https://forum.xda-developers.com/nokia-7-plus/development/ota-nokia-7-plus-ota-links-t3818774) have managed to capture the OTA link from devices currently getting the update. Download it directly by clicking below:

[WW 3.22C September 2018](https://android.googleapis.com/packages/ota-api/nokia_b2nsprout_onyx00ww/105d70f18f853101a4e4d47f66b60a97318bc589.zip) \[TA-1046, TA-1055, TA-1062\]

(NB, this will not install if you’re running the October security update. To get around this, I’d recommend identifying your currently active partition via the bootloader, swapping to the inactive, rebooting into recovery and attempting the below steps again).

\2. Connect the device to a PC with ADB
--------------------------------------

Depending on the operating system you may need to install drivers for the Nokia 7 Plus, and validate [ADB](https://www.xda-developers.com/install-adb-windows-macos-linux/) is functional. Once confirmed, reboot into recovery:

```
adb reboot recovery
```

Once confronted with the Android laying on its back, hold the power button and press volume up. It may take a few attempts to get this right.

![](https://r2_worker.bayton.workers.dev/uploads/2018/10/image-1.png)

\3. Start the install
--------------------

Select **Apply update from ADB** in the recovery menu by using the volume keys to go up and down through the menu, and power to confirm the selection. Once confirmed, the device will await the update package via [ADB](https://www.xda-developers.com/install-adb-windows-macos-linux/).

On the computer, run the following command:

```
adb sideload yourdownloadedOTAfile.zip
```

*Where yourdownloadedOTAfile.zip is the name of your downloaded zip. Make sure you either add the full path, like C:\\Users\\Example… or /home/user/example…*

The process will now start, transferring the OTA from your computer to the device. The device will show the installation in progress and let you know when it’s complete, after which selecting reboot from the menu will power the device back up into Android Pie.

Since you’re now running Pie, perhaps you’ll be interested in [How to install the beta of Digital Wellbeing](/2018/10/how-to-sideload-the-digital-wellbeing-beta-on-pie/) also.

*Are you upgrading your device to Pie early? Are you going to wait until it rolls out to your device? Let me know in the comments!*