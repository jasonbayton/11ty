---
title: 'AER expands: Android Enterprise Recommended for EMMs'
date: '2019-01-18T20:22:59+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 7524
tag:
    - aer
    - android
    - 'android enterprise'
    - 'android enterprise recommended'
    - business
    - EMM
    - Enterprise
    - google
    - uem
post_format: []
discourse_permalink:
    - 'https://discuss.bayton.org/t/aer-expands-android-enterprise-recommended-for-emms/264'
publish_post_category:
    - '14'
tags:
    - Enterprise
---
The Android Enterprise Recommended programme, originally launched with [Android handsets back in 2018](/2018/02/enterprise-ready-google-launch-android-enterprise-recommended/) before later expanding to rugged devices and tablets, [has recently](https://www.blog.google/products/android-enterprise/aer-emm/) once more expanded beyond devices and into EMM solutions as previously promised:

> Throughout 2018, we will also be applying the Android Enterprise Recommended framework to additional partner types, including OEMs of “dedicated” and rugged devices, mobile carriers, enterprise mobility management (EMM) providers and systems integrators.
> 
> <cite>– The original [AER announcement](https://blog.google/products/android-enterprise/android-enterprise-recommended-raising-the-bar-of-excellence-for-enterprise-mobility/)</cite>

Although a little later than the above timeline suggests, due undoubtedly to just how much effort was required to bring EMMs up to the level required for validation, Google have worked incredibly hard to bring AER to other areas of the Android Ecosystem since 2018, and I’m very pleased it’s now come to fruition!

What is it?
-----------

As we transition away from [device admin management](/android/infobyte-did-you-know-device-admin-deprecation/) and toward Android Enterprise [this year](/android/#device-administrator-deprecation), looking across the EMM landscape there are still examples of EMMs who don’t fully support the solution sets, don’t actively advocate *Android Enterprise first* with their customer base or simply don’t know very much about [modern Android management](/android) in general.

We’ve definitely come a long way compared to how it was some years ago, with EMMs picking and choosing which OEM APIs to support based on customer demand or, often also likely, taking a gamble on what *might* be useful to customers, but there has definitely been a fair amount of fragmentation – even between top-tier vendors – in the industry which Google has aimed to address with AER.

Just as AER for OEMs set out to create a benchmark against which devices should meet or exceed in order to guarantee a consistent, reliable experience for management, AER for EMMs aims to do something similar.

To summarise the requirements for EMMs:

- Support **advanced** management of two of the three widely utilised deployment scenarios (COPE isn’t included, yet)
- Clearly demonstrate knowledge and capability of supporting the solution
- Proven ability to deliver advanced security and management features
- Offer a consistent deployment experience, with admin consoles that simplify set-up of Android Enterprise

The requirements are described in-depth in the glossary [here](https://androidenterprisepartners.withgoogle.com/glossary/emm/), and an overview is available [here](https://www.android.com/enterprise/recommended/requirements/).

In a nutshell, Google are going to validate EMMs who demonstrably put Android Enterprise front-and-centre over legacy management, have a healthy install base and can lean on excellent product knowledge, useful collateral and confidently sell the solution to the market. The obvious difference when compared to AER for devices is that it isn’t purely about feature support as such, even though that certainly forms part of the wider validation, but the whole experience of working with an EMM.

I’d seen first-hand some of the background work going into AER prep in the second half of last year, where EMMs were – as if by random – adding features available as far back as Lollipop, knowing AER was on the horizon, it wasn’t too difficult to connect the dots!

How are AER EMMs identified?
----------------------------

EMMs validated can be found [here](https://androidenterprisepartners.withgoogle.com/emm/). Each validated AER EMM can be identified by the AER badge, those yet to pass validation are equally listed, but go without the little green shield.

There is a comparison function which is quick and easy to make use of, though I hope to see improved to display more information about the individual APIs/features the EMMs support, as currently it’s rather vague without clicking into each vendor:

![](https://r2_worker.bayton.workers.dev/uploads/2019/01/Screenshot-2019-01-16-at-00.50.26.png)In any case clicking any of the EMMs will offer an in-depth breakdown of features supported. While the breakdown is quite informative, I would very much like to see it more aligned to the [solution sets](https://developers.google.com/android/work/requirements/work-profile), referencing each in the numbered list, and potentially linking off to more details. It may look less visually appealing, though would be far more useful. As an example for [SOTI’s](https://androidenterprisepartners.withgoogle.com/provider/#!/18) work profile implementation:

[![](https://r2_worker.bayton.workers.dev/uploads/2019/01/Screenshot-2019-01-16-at-12.03.27.png)](https://androidenterprisepartners.withgoogle.com/provider/#!/18)

Could instead be:

**DEVICE SECURITY**

[](https://developers.google.com/android/work/requirements?api=clouddpx#21-device-security-challenge)Set lock screen restrictions ([2.1)](https://developers.google.com/android/work/requirements?api=clouddpx#21-device-security-challenge)  
Set lock screen restrictions for work profiles ([2.2](https://developers.google.com/android/work/requirements?api=clouddpx#22-work-security-challenge))  
Set advanced passcode restrictions ([2.3](https://developers.google.com/android/work/requirements?api=clouddpx#23-advanced-passcode-management))  
Configure Smart Lock settings ([2.4](https://developers.google.com/android/work/requirements?api=playemm#24-smart-lock-management))  
Wipe and lock work data ([2.5](https://developers.google.com/android/work/requirements?api=playemm#25-wipe-and-lock))  
Compliance enforcement ([2.6](https://developers.google.com/android/work/requirements?api=playemm#26-compliance-enforcement))  
Disable app installs from locations other than Google Play ([2.7\[.1\]](https://developers.google.com/android/work/requirements?api=playemm#27-default-security-policies))  
[](https://developers.google.com/android/work/requirements?api=playemm#27-default-security-policies)Disable debugging ([2.7\[.2\]](https://developers.google.com/android/work/requirements?api=playemm#27-default-security-policies))  
Check device integrity ([2.9](https://developers.google.com/android/work/requirements?api=playemm#29-safetynet-support))  
Enforce Verify Apps by default ([2.10](https://developers.google.com/android/work/requirements?api=playemm#210-verify-apps-enforcement))

([2.8](https://developers.google.com/android/work/requirements?api=playemm#28-security-policies-for-dedicated-devices) doesn’t apply to work profile, in case you wondered)

All I’ve done there is reorganise the items as they’re displayed on the relevant solution set, and linked to each item for further information. It’s these sorts of small touches that encourage readers to seek out more information, and in turn form their own conclusions towards how an EMM aligns with the solution sets Android Enterprise offers (and perhaps if Google decides not to, I’ll do something similar based on data available on the vendor pages!)

Launch partners
---------------

Google are launching with a number of initial partners, namely Blackberry, Google Cloud, I3 Systems, IBM, Microsoft, MobileIron, Softbank, SOTI, and VMware (in alphabetical order).

There are a few expected names in that list, MobileIron and VMware for sure given there’s little doubt they’re leading the way for Android Enterprise in the market today – not only due to COPE support, but things like VMware’s [video series](https://blogs.vmware.com/euc/2018/05/android-device-administrator-deprecation.html), MobileIron’s blogs and [whitepapers](https://www.mobileiron.com/en/blog/android-ready-enterprise) and the general AE-first approach the vendors are taking. No one would disagree with the likes of IBM and SOTI (who’s dedication to Android management over the years has been incredible) either!

There *are* a couple of AER partners on there that you may not expect though; if seeing Microsoft surprises you, you’re not alone! I ran a poll on Twitter to garner the views of the wider community on *technical capability alone* and the results speak for themselves:

> Should Microsoft qualify as an [\#AndroidEnterpriseRecommended](https://twitter.com/hashtag/AndroidEnterpriseRecommended?src=hash&ref_src=twsrc%5Etfw) [\#EMM](https://twitter.com/hashtag/EMM?src=hash&ref_src=twsrc%5Etfw) today?  
>   
> – Yes, they support enough of the solution sets for customers  
> – No, they're missing too much functionality to be considered recommended  
>   
> Please RT![\#androidenterprise](https://twitter.com/hashtag/androidenterprise?src=hash&ref_src=twsrc%5Etfw) [\#enterprisemobility](https://twitter.com/hashtag/enterprisemobility?src=hash&ref_src=twsrc%5Etfw) [\#androidsecurity](https://twitter.com/hashtag/androidsecurity?src=hash&ref_src=twsrc%5Etfw)
> 
> — Jason Bayton (@JasonBayton) [January 16, 2019](https://twitter.com/JasonBayton/status/1085514726405296128?ref_src=twsrc%5Etfw)

Unlike AER for devices however, technical capability on its own, as mentioned above, isn’t what Google are relying on to validate EMMs. On that, Microsoft are joined by Google Cloud Identity in being the only two solutions with an asterisk (**\***) beside them, and this is for a very simple reason:

They’re not quite up to scratch just yet.

> These partners have validated solutions or will be launching their offerings throughout 2019
> 
> <cite>– Will Ro, [AER EMM announcement](https://www.blog.google/products/android-enterprise/aer-emm/)</cite>

Google are keen to highlight that although these two vendors are potentially passing with flying colours other aspects of validation, their feature set support is not yet at the level Google deem acceptable for AER, hence attaining only *standard* and not *advanced* across the board:

[![](https://r2_worker.bayton.workers.dev/uploads/2019/01/Screenshot-2019-01-17-at-21.29.51_anno.jpg)](/https://r2_worker.bayton.workers.dev/uploads/2019/01/Screenshot-2019-01-17-at-13.19.33_anno1.jpg)

The asterisk is intended to suggest they’ve committed (ie. roadmap) to meeting Google’s requirements and recommendations in the **near** future, and will continue to develop their product through 2019.

Speaking for Microsoft (as I can’t for Google Cloud), they are the first big vendor to adopt the Android Management API (AMAPI) as I’ve [pointed out before](/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/#android-management-api-adoption), they’re also incredibly active in the ecosystem and despite a late start, are working around the clock with Google to bring missing features to fruition. In fact, COBO support [just launched in preview](https://techcommunity.microsoft.com/t5/Intune-Customer-Success/Microsoft-Intune-announces-preview-of-support-for-Android/ba-p/314747#.XED6xFGTIhY.twitter).

It would appear as such Google are giving both of these vendors the benefit of the doubt and have brought them into the programme with the very clear caveat there’s work still to be done.

Until fully validated and the asterisk removed, These vendors **should not actively use the badge**, so any concern of this causing confusion from an EMM marketing standpoint is suitably subdued.

That said, the wider industry will take from seeing these vendors in the list what they want, and I’ve more than enough examples already from customers to partners, carriers and other vendors to suggest this could have potentially been far more clearly explained. Hopefully this article will go some way to helping with that!

Final words
-----------

The programme is definitely an eye-opener into the capabilities of EMMs broadly; particularly for me having neither the access nor the capacity to be constantly jumping in and out of various platforms for testing, being able to pop on over to the partners site and pull up what vendors do and don’t support without needing to find a tenant is very useful. Hopefully it’s frequently updated to maintain this information.

As Google continue to expand the programme, it really can’t be overstated how important Android Enterprise Recommended is for the ecosystem.

From the profound difference AER for devices has made over the last year for device selection – whether how OEMs support and market their devices, customers select them or MSPs recommend them – AER has improved this process across the board by adding clarity, setting expectations and instilling confidence in what was once a process laced with uncertainty.

I believe AER for EMMs will do the very same, offering more consistency across the management ecosystem, providing more control to Google in ensuring the management experience continues to improve (they set the bar for AER, after all), and ultimately resulting in the best management experience for organisations and providers alike.

With that said, I’m looking forward to seeing far more EMM players in the market begin to show up, and perhaps even AER subcategories might be considered in the future – some EMMs will focus entirely on dedicated devices for example, such as [Wizy](https://www.wizyemm.com/) or [Shoonya](https://shoonya.io), others MAM or BYOD, like [Appaloosa](https://appaloosa-store.com); these vendors may never opt to apply for AER because they don’t fulfil the broader requirements, irrespective of how well they support the devices of their chosen solution set or meet other requirements for validation.

So, with AER both for devices and EMMs now publicly available, it’s only a matter of time before MSP validation turns up. I’m very much looking forward to that one!

*How do you feel about AER for EMMs? Is it what you were expecting? If you’re a customer, does AER have any impact on EMM choice? For vendors, how do you feel about the validation? Let me know in the comments,* [*@jasonbayton*](https://twitter.com/jasonbayton) *on Twitter or /*[*in/jasonbayton*](https://linkedin.com/in/jasonbayton) *on LinkedIn!*