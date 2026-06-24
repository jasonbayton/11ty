---
title: APK inspector
date: 2026-06-24
tags:
layout: apk-inspector.njk
alert: Everything runs <b>locally in your browser</b>. Your APK is never uploaded.
type: page
---

Drop in an `.apk` and this tool will pull out the package name, signing certificate details, and the **device admin signature checksum** used in custom DPC provisioning QR codes, all without sending the file anywhere.

**No information is stored or uploaded.** The APK is read entirely on your device using your browser; nothing is transmitted to me or anyone else. Refresh the page to clear everything. As with any third-party tool, use it at your own discretion.

**What you need**:

- An Android application package (`.apk`). App bundles (`.aab`) and split configs aren't supported.

The signing certificate SHA-256, rendered as a URL-safe base64 checksum, is the exact value you'd drop into `android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM` for a [custom DPC QR code](/qr-generator-dpc).

If a file won't parse, [raise an issue](https://github.com/jasonbayton/11ty/issues/new/choose) and I'll take a look.
