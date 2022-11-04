---
title: 'AER dropped the 3/5 year update mandate with Android 11, where are we now?'
date: '2022-01-11T17:58:00+00:00'
status: publish
author: 'Jason Bayton'
excerpt: 'Continuing on from losing my bet with Google, I’ve been spending some time with the Android security transparency report and ended up taking a long, hard look at the impact of dropping the Android 10 & below requirement for devices to receive 3/5 years of updates in order to be recommended by Google.'
type: post
id: 9479
tag:
    - android
    - 'android enterprise'
    - 'Enterprise Mobility'
post_format: []
discourse_permalink:
    - 'https://discuss.bayton.org/t/aer-dropped-the-3-year-update-mandate-with-android-11-where-are-we-now/414'
publish_post_category:
    - '14'
tags:
    - Enterprise
---
Continuing on from [losing my bet with Google](/2022/01/i-made-a-bet-with-google-and-lost/), I’ve been spending some time with the [Android security transparency report](https://transparencyreport.google.com/android-security/device-platform-safety?device_security_update=filter%20key:1&lu=device_security_update) and ended up taking a long, hard look at the impact of dropping the Android 10 &amp; below requirement for devices to receive 3/5 years of updates in order to be recommended by Google.

For those who missed it, the AER requirements for Android 11 changed from a minimum update term, to the following:

![](https://cdn.bayton.org/uploads/2022/01/image-2.png)

Google never publicly published the 3 year mandate for knowledge worker devices – for reasons unknown – but it was there nevertheless. The new requirement would make a great addition to mandated update support in requiring more transparency, but alone it’s pretty weak.

As mentioned in my previous post the [transparency report](https://transparencyreport.google.com/android-security/device-platform-safety?device_security_update=filter%20key:1&lu=device_security_update) data ceases in September of 2021, so until the next update it’ll be difficult to understand what impact dropping the 3 year support requirement on AER models from Android 11 will have on ecosystem stats overall (considering the number of AER devices is getting pretty sizeable!) though it’s clear Google’s work in improving 90 day update support across MADA-compliant devices within the ecosystem is working, and Android hardware is in a much stronger position than even 3 years prior, where less than 60% of devices were declaring security patches within the prior 90 days.

It’s unlikely Google will track further out than 24 months so the transparency report will only offer value to a limited extent in monitoring overall longevity of update support; instead properly understanding how long devices will be supported will require a lot more work in tracking the OEMs themselves, either through [Google’s AER directory](https://androidenterprisepartners.withgoogle.com/devices/#) or on the OEM website directly, once such example is [HMD Global’s Nokia Smartphone Security Maintenance Release Summary](https://www.nokia.com/phones/en_int/security-updates) (*No guaranteed Security Patch updates after*):

![](https://cdn.bayton.org/uploads/2022/01/image-1.png)

When filtering the solutions directory to show devices guaranteed to support security updates through to January 2025 (three years from buying a device today that would fall within the 90% of 90 day declared security patches) returns only [10 units](https://androidenterprisepartners.withgoogle.com/devices/#!?device_type=phone&device_categories=knowledge_worker&smrDate=2025-01-28T00:00:00.000Z) for Knowledge Worker (ie, non-rugged, phone only), and they’re all Samsung.

Rugged phones add an additional 12 units to the mix but these include devices that fell into the 5 year security update support requirement Google mandated up to Android 10, also dropped with 11. Rugged devices also benefit from much better lifecycles generally, with the likes of Zebra working really hard to keep devices up to date, but they’re hardly suitable for all types of deployments wherein knowledge worker devices are a better choice.

Falling back to September 2024 as a minimum declared end of support date adds 8 non-Samsung units, all of which launched in 2021, for a total of 20 models guaranteed to see updates for 3 years from launch. 11 additional devices were added to the AER list in 2021 that offer far less software support, such as the Moto G Power (2022) that’s only recently been released, and loses support already in November 2023, or the TCL 20 R 5G, with only 23 months of support committed.

Of the &gt;900 models declaring 90 day update support in September 2021 then, Google can recommend 20 of them in the knowledge worker category – the SKUs of which requiring additional validation by the customer purchasing them as not every version of the same model (geo, carrier model, etc) is supported to the same degree – to handle a minimal 3 year lifecycle, dropping immediately to 10 through 1 OEM if wishing to buy a device and expecting at least 3 years of support from today.

How Google could conceivably grant enterprise recommended status to devices losing support so soon after launch is beyond me, but this is a direct, obvious result of them dropping the support mandate in favour of inclusivity, and puts far more onus on customers to go back to the days of needing to verify the devices they purchase themselves for suitability – something AER was supposed to render mostly unnecessary, and could have continued to incrementally improve over time; pushing OEMs to meet lifecycle longevity across the ecosystem more akin with Apple from the perspective of “*Android*” as opposed to “*Samsung*“, “*Point Mobile*” and other individual OEMs that push to extend product lifecycle support alone.

Closing thoughts
----------------

I am and continue to be impressed by Google’s commitment to the shorter-term prevalence of security updates across the industry and imagine we’ll get to a point where almost everything (never *everything*) is meeting the 90 day or better security update schedule. Combined with the continued push of Mainline to modularise and update system components through Google Play, it goes without saying Android security has really never been in a better place than today.

That said, the barely-viable two-year support mandate from Google for GMS today is less than ideal from a consumer perspective, and basically a non-starter for enterprise and the typical hardware lifecycle expectations there. The AER program had an opportunity to boost this standard for devices intended to be enterprise-targeted, with positive consumer trickle-down, and then gave up. Shifting the responsibility back onto OEMs to declare transparently what they’ll support in order to recommend them, vs making them meet a minimum viable standard to be considered massively devalues AER from my point of view.

Hopefully that’ll be reconsidered when the AER requirements are re-assessed in one of the next major releases, and we can get to a place as an ecosystem where organisations like Fairphone, or devices like the Nvidia Shield (I know it’s Android TV) aren’t seen as outliers for continuing to support their hardware for so long.

Here's a quick survey
---------------------

<iframe frameborder="0" height="538" loading="lazy" marginheight="0" marginwidth="0" src="https://docs.google.com/forms/d/e/1FAIpQLSdHZpLZ1FOHcry610YhbffpTD7tjV3sX_gia1LpQnVwRC2hnw/viewform?embedded=true" width="640">Loading…</iframe>