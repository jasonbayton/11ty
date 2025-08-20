---
title: 'Can I make /system writable on Android devices?'
published: '2025-08-20'
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
key: 'Can I make /system writable on Android?'
order: 49000
-----------

Yes, on userdebug and engineering builds.

By design, production Play Protect Certified Android builds ship with `/system` mounted read-only and protected by **dm-verity**. This ensures the partition can’t be tampered with, maintaining the integrity of the OS. On non-production builds, however, you can temporarily disable verity and remount `/system` as read-write in order to make changes.

**Steps**

1. Connect via ADB and disable verity:

```bash
adb root
adb disable-verity
adb reboot
```

2. After reboot, remount `/system`:

```bash
adb root
adb remount
adb shell
mount -o rw,remount /system
```

At this point `/system` is writable and you can make modifications.

1. Once finished, re-enable verity:

```bash
adb root
adb enable-verity
adb reboot
```

**Considerations**

* This only works on **userdebug** or **engineering** builds. Retail/production builds won’t permit it.
* Any changes may be lost after an OTA update, if it remains possible to do so.
* Leaving verity disabled weakens device integrity. Always re-enable once done.
* Mistakes in `/system` can break the OS or prevent booting, so proceed with caution.

This approach is intended for development and testing. For production devices, modifying `/system` is not supported.