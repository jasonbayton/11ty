---
title: Android Enterprise zero-touch DPC extras generator 
date: 2025-01-07
tags:
layout: generator-zt.njk
alert: 
type: page
---

It's a common occurrence to see a full QR/NFC payload pasted into the DPC extras field of a zero-touch configuration, and while it may function, it's not best practice. 

To assist in building better configurations, the below form has been created to allow organisations to create a custom payload, similar to that of the QR generators, but provide only the relevant details for zero-touch. Once generated, this can be pasted directly into the zero-touch configuration DPC extras field.

*Do you have a JSON payload from your EMM already? Use the form [at the bottom of this page](#convert-an-existing-json-payload) to convert it!*

**No information is stored**. If you refresh the page, everything will be reset. This is intentional as I have no interest in holding on to your JSON information, Wi-Fi details, or enrolment tokens. That said, as with all third-party applications you use this at your own risk. Check with your boss before you use this tool if you feel you need to.

When you click **Generate JSON**, all submitted information is processed locally, and the returned data is embedded ephemerally in this page. Edit the submitted text and click extract again to regenerate it, or refresh the page to clear it.