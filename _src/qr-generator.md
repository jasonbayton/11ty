---
title: Android Enterprise AMAPI QR code generator 
date: 2023-12-18
tags:
layout: generator.njk
type: page
---

<div class="callout">

**Hi 👋. The generator is currently unavailable due to Google's Charts API returning a 404 not found. I'm working on a solution.**

</div>

If your EMM doesn't offer customisation for your generated QR codes, you can use the below form to generate your own. This configurator is intended for use with AMAPI based EMMs; those that use the Android Device Policy application for device management. For custom DPC solutions (MobileIron, WS1 UEM, MaaS360, SOTI, etc) or for more customisation, more features will be added in future.

**No information is stored**. If you refresh the page, everything will be reset. This is intentional as I have no interest in holding on to your JSON information, Wi-Fi details, or enrolment tokens. That said, as with all third-party applications you use this at your own risk. Check with your boss before you generate tokens if you feel you need to.

**What you need**:

- Your enrolment token*
- Your Wi-Fi configuration details (if desired)

When you click Generate QR, all submitted information is sent to Google's [Charts API](https://developers.google.com/chart/infographics/docs/qr_codes), and the returned image is embedded ephemerally in this page. Right click & save to keep it, edit the submitted text and click generate again to renew it, or refresh the page to clear it.

If the image doesn't load, Google's Charts API may be overloaded or down. You may have to try again later.
