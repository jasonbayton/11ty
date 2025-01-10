---
title: Android Enterprise AMAPI QR code generator 
date: 2023-12-18
tags:
layout: generator-eap.njk
alert: This page is <b>aggressively cached</b>. If the QR isn't generating, try a hard refresh (CRTL/CMD + SHIFT + R).
type: page
---

If your EMM doesn't offer customisation for your generated QR codes, you can use the below form to generate your own. This configurator is intended for use with AMAPI based EMMs; those that use the Android Device Policy application for device management. For custom DPC solutions, use the [custom DPC generator](/qr-generator-dpc).

**No information is stored**. If you refresh the page, everything will be reset. This is intentional as I have no interest in holding on to your JSON information, Wi-Fi details, or enrolment tokens. That said, as with all third-party applications you use this at your own risk. Check with your boss before you generate tokens if you feel you need to.

**What you need**:

- Your enrolment token*
- Your Wi-Fi configuration details (if desired)

When you click Generate QR, all submitted information is processed locally, and the returned image is embedded ephemerally in this page. Right click & save to keep it, edit the submitted text and click generate again to renew it, or refresh the page to clear it.

If the image doesn't load, [raise an issue](https://github.com/jasonbayton/11ty/issues/new/choose) and I'll take a look.
