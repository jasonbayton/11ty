---
title: 'February was an interesting month for OEMConfig'
date: '2019-03-03T10:36:17+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 7795
tag:
    - android
    - 'android enterprise'
    - EMM
    - MDM
    - 'Modern management'
    - oemconfig
    - samsung
    - sony
post_format: []
discourse_permalink:
    - 'https://discuss.bayton.org/t/february-was-an-interesting-month-for-oemconfig/274'
publish_post_category:
    - '14'
tags:
    - Enterprise
---
One of the more important [announcements](https://www.samsungknox.com/en/blog/samsung-knox-platform-for-enterprise-evolution-to-5g-enterprise-iot-and-ai) at MWC for the Android Enterprise ecosystem was [the introduction](https://www.blog.google/products/android-enterprise/google-and-samsung-simplify-choosing-android-enterprise/) of Samsung’s official support for OEMConfig, something they’d [talked about with me in the past](/android/what-is-oemconfig/), but offered little in the way of firm dates (it certainly didn’t seem like something I’d see in 2019!).

Before getting stuck into the finer details of Samsung’s implementation, this wasn’t the only OEMConfig news in February, on that note..

Sony discontinues work on OEMConfig
-----------------------------------

One of the earliest adopters, Sony, has quietly pulled the plug on [Configuration Extension](/2018/08/hands-on-with-sonys-oemconfig/), their own OEMConfig implementation in what looks like an ongoing shuffle of priorities at the Japanese behemoth.

This follows the shuttering of Xperia Configurator Cloud already this year, a long-standing service for light device management offered directly by Sony for a number of years.

Sony’s evident step back from enterprise is a disappointment, and as an OEM investing time and budget into bespoke features and UI in a market responding increasingly well to those pushing stock experiences with little to no bloat (such as Android One), considering how untapped the enterprise space is, I’m not sure B2B services are what I’d sacrifice.

That said, the Android Enterprise Recommended programme is continuing to feature Sony devices (going forward) based on what I saw at MWC, and enterprise is therefore still something of a focus even without value-adds such as OEMConfig.

There’s also no doubt Sony still creates attractive, well-built devices across a range of budgets as recently seen at MWC with the launch of the Xperia 1, Xperia 10 and Xperia 10 Plus featuring their newly simplified naming scheme, replacing the previous XZ and XA naming conventions.

We’ll see how this pans out, and I hope they’ll pick up where they left off in future.

Back to Samsung
---------------

It was only a few days before the announcement that I’d become aware of Samsung’s [Knox Service Plugin](https://play.google.com/store/apps/details?id=com.samsung.android.knox.kpu) (Samsung’s OEMConfig implementation), and while I had the intention to post something ahead release, MWC got in the way!

Samsung sums up the need for and benefits of OEMConfig similarly to how I’ve [outlined it previously](/android/what-is-oemconfig/):

> Samsung’s Knox Platform for Enterprise (KPE) APIs that reside on device are currently used by Enterprise Mobility Management (EMM)/Unified Endpoint Management(UEM) partners and others to integrate support for KPE’s unique security and management features. However, **support for specific features is inconsistent** across Samsung’s partner ecosystem, and **few partners are able to provide zero-day support** for all new features upon release due to lengthy development cycles.
> 
> <cite>Samsung’s announcement, emphasis mine</cite>

To echo my feelings on this as posted to [LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:6506442375966048256/) a few days ago:

> OEMConfig is one of those things when you stop to wonder, you ask *what took so long?*. This whole approach of OEMs working with individual EMMs to integrate and/or validate API support is crazy inefficient, fragmented and generally not very good.
> 
> With Samsung developing OEMConfig, they put themselves in control of feature availability and zero-day support in a way I’d imagine excels even what they’ve had with SDS. Expect faster, consistent and reliable management independent of EMM in future. It’s going to rock.

And I’ll reiterate once more, Samsung going all-in on OEMConfig is a huge win for both the programme – due to the credibility they will bring with them, legitimising this new type of simplified cross-EMM feature availability which will surely encourage other OEMs to follow – and Samsung themselves as this will undoubtedly mean faster, simpler updates, zero-day support for new features without the to-and-fro with multiple EMMs for every development cycle in future and more.

With everyone involved saving so much time and effort, who knows what the additional bandwidth could lead to for both OEMs and EMMs in future.

I’ll be getting hands-on with Samsung’s implementation over the coming week or so, and will publish a hands-on as I did earlier with [Sony](/2018/08/hands-on-with-sonys-oemconfig/), for now though here’s a quick glance at what Samsung are offering through their implementation. It’s already pretty impressive:

![](https://r2_worker.bayton.workers.dev/uploads/2019/03/Screenshot-2019-03-02-at-22.02.23.png)
*Just high-level headings here, most of the configs are hidden*

I only wonder how Sony feel about their decision to exit just as Samsung jumps aboard.

*Will you make use of Samsung’s OEMConfig implementation? Is it what you expected? Let me know what you think in the comments, on [Twitter](https://twitter.com/jasonbayton) or on [LinkedIn](https://linkedin.com/in/jasonbayton).*