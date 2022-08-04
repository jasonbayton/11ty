---
title: "Why Intune doesn't support Android Enterprise COPE"
date: '2019-10-24T17:15:25+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 8711
tag:
    - android
    - 'android enterprise'
    - cope
    - 'Enterprise Mobility'
    - 'fully managed'
    - google
    - intune
post_format: []
discourse_permalink:
    - 'https://discuss.bayton.org/t/why-intune-doesnt-support-android-enterprise-cope/321'
publish_post_category:
    - '14'
tags:
    - Enterprise
---
> Does Intune Support COPE?
> 
> <cite>Literally everyone.</cite>

It’s one of the most frequent questions I get. So much so that a year ago I created a resource dedicated to answering the question, [DoesIntuneSupportAECOPE.info](http://doesintunesupportaecope.info), which has seen up to 500 visits in a month this year.

The answer, if it wasn’t clear already of course, is no. Intune doesn’t support COPE today, along with [several other EMMs on the market](/android/android-enterprise-emm-cope-support/) such as MaaS360 and, surprisingly given their Android legacy, SOTI.

This isn’t through lack of desire to do so on the part of Microsoft, as they’re fully aware of the need to support arguably the best, most flexible Android Enterprise deployment scenario available today for offering the closest experience to legacy device admin management of whole-device management plus containerised corporate data.

Unfortunately however, unlike most other EMMs on the market who don’t feel compelled to support COPE through lack of desire or constraints on time/budget, the choice to support COPE isn’t solely Microsoft’s to make.

What is the Android Management API?
-----------------------------------

[Announced at the partner summit in 2018](/2018/05/android-enterprise-summit-2018-highlights/), the Android Management API (AMAPI) is Google’s attempt to bring the management of the many Android Enterprise APIs in-house under one native-feeling management experience.

Unlike most EMMs on the market who’ve built their own custom DPCs (Device Policy Controllers, EMM agents) from the ground up based on Play EMM APIs, AMAPI offers the ecosystem the opportunity to build Android Enterprise support into their EMM with relatively little effort complete with an already-existing DPC, the [Android Device Policy](https://play.google.com/store/apps/details?id=com.google.android.apps.work.clouddpc).

The benefits of AMAPI for new EMMs are unmatched, with advertised zero-day support for Android Enterprise APIs as standard, but it comes at a cost.

If you build your own custom DPC, you define your own priorities. You choose what to support, when, and can roadmap accordingly. With AMAPI you’re held hostage to the pace of Google’s development, which has been unbearably slow for a number of features custom DPC EMMs have had for years, including COPE. If you want something new or currently unsupported you ask for it. Then wait.

As an aside, you also succumb to decisions they make over what APIs to deprecate, such as the recent decision to deprecate the dedicated `statusBarDisabled` API for blocking access to the notification bar to instead roll it into the locktask policy, which is crazy.

![](https://r2_worker.bayton.workers.dev/uploads/2019/10/image.png)

So Intune uses AMAPI?
---------------------

Yes. Well, both AMAPI and Play EMM APIs actually. For work profile deployments, Intune’s custom DPC guides users through the enrolment and setup of a work profile, but if you’d like to support dedicated devices, the newly-supported fully managed deployment scenario, or in future COPE, this is pushed through AMAPI and Google’s Android Device Policy.

Intune is one of Google’s top AMAPI partners today, and with the clout of Microsoft the fact COPE is still missing in AMAPI two years after it’s introduction with Oreo is telling; it offers little hope for other AMAPI ecosystem partners thinking they can compel the AMAPI team into supporting COPE any sooner.

Could Intune support COPE, fully managed and dedicated through their custom DPC? Yes. It’d be no different to MobileIron, VMware or BlackBerry who all support COPE today. At this point though, it’d probably take longer to get it up and running than simply sitting on their hands while Google gets on with it. COPE is in the works according to the AMAPI team, who provided a little insight into what they’re doing with the deployment scenario over 5 months ago.

In any case, the next time Intune’s support for COPE comes up in conversation, rather than the typical berating of Microsoft for their lack of pace to bring a feature to fruition, consider in this case it’s entirely Google holding up both them, and every other AMAPI EMM on the market.

That is of course until Google releases COPE, then it’s all on Microsoft.