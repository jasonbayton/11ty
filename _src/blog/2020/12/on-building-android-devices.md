---
title: 'On building Android devices'
date: '2020-12-26T18:21:12+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 9290
tag:
    - aer
    - android
    - 'android enterprise'
    - manufacturing
post_format: []
discourse_permalink:
    - 'https://discuss.bayton.org/t/on-building-android-devices/400'
publish_post_category:
    - '14'
tags:
    - Enterprise
---
As 2020 comes to a long-overdue close and we head into what anyone can hope will be a slightly less chaotic new year, it also edges closer to what will soon be two years leading product with [Social Mobile](https://socialmobile.com). With the results of all the hard work now materialising, I think it’s interesting to reflect on the last &gt;18 months, what it’s lead to, and what’s next.

*Note: The following is a personal take on a work-related topic. For normal Android Enterprise content, please head [here](/android).*

The leadup
----------

I’ve spent many years on the consumer end of Android, from devices purchased for my own use over the last decade, to those I’ve reviewed in an enterprise context through my efforts on Android Enterprise. I have, and still continue to engage with OEMs in the ecosystem for devices I test on a reasonably regular basis, pointing out issues with implementations, random bugs, offering advice where asked and so forth, but that’s typically where it stops; once I’ve said my bit the feedback is taken internally and tends to fall into the ether of internal triaging. If I’m lucky, a few weeks to a couple of months later I’ll get a ping to say a software update addresses previous concerns, but more often than not that doesn’t happen.

With the lack of transparency also comes a few other common experiences – OEMs move slowly. Their engineering teams are inaccessible or don’t speak to outside parties. Enterprise concepts and/or best practices are either not known or not prioritised, and so on. Today in fairness it’s substantially better than it used to be through the education and motivation provided by programmes such as [Android Enterprise Recommended](/2019/02/google-launch-android-enterprise-recommended-for-managed-service-providers/), but I could still earn a decent living consulting for OEMs if desired.

In any case, after years of telling OEMs how things should be done with zero experience of the processes on the other side, I’d often wondered what could *really* be involved in building Android devices, and if I could easily translate my knowledge of Android – both Enterprise, including best practices, custom APIs, device management, etc, as well as exposure to several years of communities such as XDA flashing ROMs and learning what tweaks to various rooted devices do what – to give me a solid rolling start on the parts I knew less about – GMS, certifications, hardware requirements, testing, building from AOSP, etc.

An opportunity for change
-------------------------

Back in 2019 I’d reached something of a plateau working at an MSP. I knew where I wanted to be in my career and how I wanted to spend my time, but there wasn’t enough ongoing business to justify the wage of me being selective on the work I undertook. Android deployments were scattered amongst other, less interesting but oh-so-repetitive installs, customer support was poking around networks and analysing server logs, MSPs generally began shifting towards Microsoft *hard* and I wasn’t feeling it.

When the opportunity arose to pivot, I left the last MSP I’ve worked for as an Enterprise Mobility &amp; Android Enterprise SME after several years of the same kind of role and headed into a completely different, though more than tenuously linked, industry – device manufacturing.

I say more than tenuously as it’s a different approach to the same end-goal, contributing to the evolving Android ecosystem. Rather than spend my days supporting Android device deployments (as well as iOS, and more), going forward I got the opportunity to be mostly making the devices, the services and shaping user experiences for others to support.

Not as easy as it looks
-----------------------

It turns out I wasn’t entirely lost coming into this, as my general understanding of the platform and how many things should work helped significantly. That said, a decent amount of what I’d known applies to the *last mile* of making Android devices. Everything before that, from SoC support to component availability, camera tuning to performance optimization, aligning to GMS, a whole slew of NDA aspects of being a MADA partner, and more, were brand new, if certainly not insurmountable challenges.

I’d been very much blissfully ignorant to a lot of this when previously raising an issue with an OEM, assuming patches should be available with relative ease and with a quick turn-around given they all have teams of engineers at hand, or questioning why support ended early for hardware, or focusing purely on the OEM for opting not to support a new OS release because they didn’t *want* to dedicate the engineering effort. In some cases sure, OEMs are lazy, but in others there are legitimate limitations not controlled entirely by the OEM (and not strictly the SoC vendor killing support). Who knew? This is potentially a topic I might explore in future.

Diving in
---------

When I joined Social Mobile, it was intentionally timed for me to take on a brand new project, building the company’s first own-brand portfolio of commonly-requested devices. With it came the opportunity not only to give the hardware its own brand ([Rhino](http://rhinomobility.com)) but also to define for the first time the software experience against a set of requirements not laid out by a customer.

SM is not a typical, consumer-driven, annual-refresh type of OEM, but an enterprise-first, B2B OEM specialising in the dedicated and bespoke solutions not typically available off a shelf, with extended periods of support and availability. Very commonly devices only come to be when an engagement from a customer kicks off, and following 6-9 months of design, testing, software bring-up, optimisation, manufacturing, and more, and with that come things like minimum order quantities and upfront non-recurring engineering (NRE) costs.

Devices built have historically been private-label – under the brand of the companies that engage to bring up Android solutions, so it’s understandably scarcely a name one would see when browsing devices, despite a significant number of carrier customers in the US at one point having a device made by the company.

The portfolio marked a shift in strategy and an ability to target market segments that normally go for the lower-volume, easily available hardware over something bespoke, the SMBs and mid-tiers. For me it offered an opportunity to push a roadmap, dig deep into the Android CDD and GMS requirements with which to align, and more than anything to get hands-on with every aspect of creating new devices; a perfect opportunity to learn on the job with the support of a production team well-versed in device manufacturing ensuring nothing could slip through the cracks.

<div class="callout callout-info">

### Why Rhino?

A lot of potential names were thrown around with the team. It came down really to what just sounded decent. Fruits are well done, Space themed led to a few decent options if a little corny, but it was ultimately Animals that came back most frequently and ended up between Rhino and another; since Rhino has connotations of strength and durability, we settled on that. </div>
  
The result
----------

The result of 18 months of ground-up research and development has led to the introduction of four new devices, the Rhino T8, Rhino C10, Rhino M10p and Rhino T5se. Two tablets, a hand-held, and a POS.

![](https://r2_worker.bayton.workers.dev/uploads/2020/12/20201113_101629.jpg)

### Rhino T8

A simple, 8″ tablet powered by MediaTek in a 32/2 configuration. Launched on Android 9.0 with Android 10 expected early ’21. The T8 offers an affordable solution for lighter workloads.

![](https://r2_worker.bayton.workers.dev/uploads/2020/12/20201113_103412.jpg)

### Rhino C10

A higher spec 10″ FHD tablet running 8 cores in a 32/2 configuration. Also on 9 with 10 planned for Q1 ’21. The C10 is noteably more performant and capable for mid to heavier workloads.

![](https://r2_worker.bayton.workers.dev/uploads/2020/12/20201113_104203.jpg)

### Rhino T5se

A 5″ handheld featuring a slim yet powerful integrated Honeywell barcode scanner, powered by an 8 core MediaTek SoC in a 4/64 configuration. Launching on 11 in early ’21.

![](https://r2_worker.bayton.workers.dev/uploads/2020/12/two-1-e1608940548828.jpg)

### Rhino M10p

A first-of-kind certified EPOS with cash register compatibility, an integrated Seiko thermal printer and a nice, long LED light bar on the front for clear visual alerts in loud environments. 8 cores in a 32/2 configuration and a boatload of IO on the back. Launched on 10 with 11 in ’21.

All of the above, as well a few more in-progress devices, including a 27″ kiosk and a couple of larger Android powered displays, are available now or coming soon, and I’m super excited to get them out into the wild.

One might think “tablets aren’t dedicated devices”, yes and no. Though tablets are portable with integrated batteries, these are built specifically for fixed use, particularly concerning power management where they live connected 24/7 to a power source. Customers can leverage included docking options or opt for any universal tablet mount solution. There’s flexibility to be had in adopting existing form factors for alternative usecases.

As the devices are both enterprise-grade, and products influenced by my own experience and biases, they’re aligning with what I’d consider an expected lifecycle currently, in supporting least one major OS version upgrade and from 3 to 5+ years of security updates depending on the device. Furthermore, because they’re built with component availability prioritised from the get-go, they should be available to purchase for around three years also from launch, far longer than most consumer kit.

That isn’t intended as a sales pitch so much as a goal and a standard I’m driving Social Mobile towards as one cog in the wider ecosystem-driven machine working towards progressing the normalisation of longer device lifecycles across the industry. One of those initiatives has included the partnering with MediaTek’s [AIoT division](https://www.mediatek.com/products/iot/aiot) for long term SoC support (LTS), and I’ve looked on with excitement at what [Qualcomm are doing](https://www.qualcomm.com/news/releases/2020/12/16/qualcomm-and-google-announce-collaboration-extend-android-os-support-and#:~:text=As%20part%20of%20this%20collaboration,new%20Snapdragon%20888%20Mobile%20Platform.) as of late also.

Those who’ve read what I write here, on [Twitter](https://twitter.com/jasonbayton), or on [LinkedIn](https://linkedin.com/in/jasonbayton) will have undoubtedly seen the occasional frustration at OEMs who kill devices off too soon given the perpetual perception of Android security and fragmentation already, and with SM I get to contribute to the changing of this.

What’s next
-----------

I’ve focused a fair bit on hardware here, which is a given considering that has been the primary goal over the last 18 months, to build the portfolio, but hardware isn’t the focus, or certainly won’t be for much longer.

With the hardware out of the way, by which to say properly road-mapped, hardware revisions strategised and so forth (more form factors are on the way), the focus instead turns to the *experience;* the next steps that transform individual devices into a suite of products and services. Some of this includes:

### OEMConfig

Technically already under way, and picked up by a few outlets in the process once it was whitelisted by Google (sorry folks, it’s going to change), OEMConfig so far has been a mix of APIs across a few of the available devices. Going into ’21 a lot of engineering effort will be devoted to unifying APIs across all devices running the Global SKUs, and building out many more than are currently available today.

OEMConfig, as I’ve [written](/2019/03/february-was-an-interesting-month-for-oemconfig/) about [many](/2019/06/android-enterprise-partner-summit-2019-highlights/) times [before](/android/what-is-oemconfig/), is a revolutionary solution to enable the extension of Android Enterprise APIs for bespoke features and advanced usecases.

APIs are created based on demand, valid industry use cases, and occasionally good ones adopted from bespoke projects, since custom APIs are a very normal request and part of the software solution offered as a custom device is brought to life.

### Android Enterprise Recommended

Due to the cut-off on OS versions for AER device submission and the long bring-up time for the portfolio to date, AER has been a top of mind but not feasible in spite of aligning with the recommendations and requirements of AER by default across all devices.

That said, as products either upgrade or receive their final production software ahead of launch, everything currently eligible for AER will be submitted over the first few weeks of ’21. With any luck that alignment will pay off and the devices will sail through without a problem.

### Long(er) term support and upgrades

Maintaining the one OS version upgrade and 3-5 years of 90 day security updates as implemented today would be more than acceptable within the current ecosystem, but doesn’t align with the longer strategy of device lifecycle support I’d like to achieve, especially when thinking of the life of a dedicated device: one job, fixed in place, often connected to a corporate network, and often also a point of interaction between an organisation and a user.

The 90 day cadence for one can be improved, and though a 30 day cadence is currently a significant undertaking, it won’t be in future as Social Mobile continues to grow. This extends to major OS version support; 1-2 today is more than possible, but as our partnerships with SoC vendors and component manufacturers continue to flourish, and we’re less impacted by SoC EOL, the aim will be to support three to four major OS version upgrades in future through the entire device lifecycle (this won’t be soon).

### On updates

There’s something to be said for frequent updates and the pushback occasionally associated with larger organisations for managing them. As a short term compromise for these organisations, additional update control over and above Android Enterprise is planned before cadences change. Longer term though my view is more frequent, smaller, incremental upgrades are often safer than maintainance releases with more drastic changes. Not only due to the limited scope of change and lower effort in testing ahead of rollout, but also the update sizes and the impact on corporate networks supporting hundreds to thousands of devices; even when deploying OTA files internally via EMM (when supported, please and thank you VMware, others).

In achieving a more rapid security update cadence, having a means of reducing the perceived work effort for organisations is top of mind. Having the benefit of working directly with some very large organisations as opposed to through resellers will be instrumental in progressing this, of course I’ll be talking to the wider community also.

### Advanced management

Once OEMConfig is matured and well-rounded, attention will begin to shift to extending management of Rhino APIs, both existing and out of box, via an in-house configuration platform. With existing customer engagements I’ve already had feedback requesting means to prevent device setup without a network connection (a limitation of zero-touch), closed-network style provisioning options, preloaded network options and the ability to receive devices in a particular state of limited/locked down functionality ahead of device enrolment, these use cases and more will be targeted with a new service.

This type of solution isn’t new or revolutionary, OEMs already offer this in the market today. I’ve long been a fan of non-EMM configuration tools and am excited to see where one built in-house can be taken.

### And more…

…but I can’t give everything away today.

In summary
----------

I’m extremely happy with what’s been achieved so far, and the experiences had getting to grips with developing solutions from the ground up powered by the most versatile OS on the planet.

It’s been eye-opening, extremely educational, and incredibly rewarding; I can’t think of any other role with any other company where I’d get so close to the end product, never mind being able to define every aspect of it!

It’s offered opportunities to deploy devices to some very interesting customers and engage on some fascinating use cases. With a considerable amount of devices pushed out just leading up to Christmas, and with hundreds of thousands more in the pipeline for next year, a whole new set of challenges and opportunities for collecting feedback, growing the offering, undoubtedly fixing issues here and there as things scale, and more will come to light as increasing numbers of deployed devices introduce further scrutiny of the product from both customers as well as Google.

I can’t wait.