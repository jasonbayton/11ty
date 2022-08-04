---
title: 'The Huawei ban and Enterprise: what now?'
date: '2019-05-30T00:37:00+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 8461
tag:
    - android
    - Enterprise
    - Huawei
    - trump
post_format: []
discourse_permalink:
    - 'https://discuss.bayton.org/t/the-huawei-ban-and-enterprise-what-now/301'
publish_post_category:
    - '14'
tags:
    - Enterprise
---
Update 01 July
--------------

Over the weekend Trump announced a back-pedal of sorts which allows Huawei to regain the ability to license Android GMS and purchase from hardware vendors they rely on.

> 🙄<https://t.co/b9a3XiporA>
> 
> — Jason Bayton (@JasonBayton) [June 29, 2019](https://twitter.com/JasonBayton/status/1145026103389696000?ref_src=twsrc%5Etfw)

How this will impact Huawei’s plan to offer an alternative OS in the market is yet to be seen, but given the damage Trump caused by adding Huawei to the entity list to begin with, I’d be surprised if Huawei went back to acting as though nothing has happened.

- - - - - -

At this point most people should be aware of the situation surrounding Huawei; the subject of global news for a few weeks now, with partnerships all over the world critical to Huawei’s mobile business either temporarily or permanently cutting ties with the world’s #2 OEM in something of a domino effect.

For all intents and purposes of the following, it appears the situation is still very much fluid. While ties are indeed cut right now, Trump has alluded to the possibility of the situation being repaired should a trade deal with China work in favour of the US:

> If it wasn't clear as day before, Huawei is just a tool.  
>   
> Trump's like: Huawei are a grave and terrible threat to humanity but hey China, give me favourable trade terms and maybe Huawei are fine after all.<https://t.co/Zz4ZQO02MM>
> 
> — Jason Bayton (@JasonBayton) [May 24, 2019](https://twitter.com/JasonBayton/status/1131894528057778179?ref_src=twsrc%5Etfw)

Given the fluidity, the following is part what I know and part what can be expected. It is based on information available online, knowledge of how some of these moving parts go together and some informal chats with relevant people a little closer to the action than myself.

If indeed Huawei remains on the entity list, here’s how it’ll impact enterprise.

<div class="callout callout-warning">

### Before continuing..

Very clearly to start with, if organisations are evaluating, piloting or otherwise preparing for a deployment consisting of Huawei devices right now, stop.

Talk to your account managers or resellers about switching to another OEM. The [Android Enterprise Recommended list](https://androidenterprisepartners.withgoogle.com/devices/?_ga=2.172942883.1888602941.1559130525-1444010256.1552580193#!?AER) offers several other options which will ensure consistency and reliability of management going forward.

</div>

Nothing will happen until August
--------------------------------

First and foremost, the ban initially placed on Huawei [was eased until August](https://www.cnbc.com/2019/05/21/google-will-work-with-huawei-for-next-90-days-after-restrictions-eased.html) while everyone works out what to do next. That means until then, updates will continue to push without issue and Google will continue to work with Huawei directly.

After August
------------

If no solution is in place by August, things take a somewhat more uncertain turn. As it stands:

### Devices should continue to work

Huawei and [Google](https://twitter.com/Android/status/1130313848332988421) have together stressed multiple times Huawei devices available today will maintain access to Google Play and GMS services. Nothing stops working. Warranties and support will be unaffected also.

Essentially what works today will continue, what doesn’t may not be fixed (including the [work profile issue](https://www.linkedin.com/feed/update/urn:li:activity:6524396165482504192), unless fixed before August on all affected devices) if it requires more than a security update.

Despite the very public break-up of Huawei with various organisations, they’re pretty confident in their ability to continue:

> Recently, a handful of standards and industry organizations have put some aspects of collaboration with Huawei on hold in response to political pressure. We are disappointed by these decisions, but they will not have an effect on our daily operations. We will continue to provide our customers with top-quality products and services.
> 
> <cite>Huawei</cite>

In other words, if organisations aren’t facing issues with devices right now, they should remain pretty much in this state for their shelf-life.

### Certified letter upgrades will cease

Before a letter upgrade (Oreo, Pie, Q.. ) is ready to roll out, it must first be GMS recertified. This is typically a painless process as the device will already have undergone GMS certification to go to market.

With the GMS license revoked, any upgrades would not be permitted with GMS applications (Gmail, Play, Chrome, etc). While Huawei could push an uncertified upgrade and remove the GMS applications in the process, that’s unlikely.

As Huawei are seemingly almost [ready to launch their new OS](https://www.slashgear.com/hongmeng-os-huaweis-android-replacement-what-we-know-so-far-29578318/) based on Android, it may be possible in future to manually flash (if no opt-in OTA is provided) over to the non-GMS alternative and benefit potentially from more active development, though understandably enterprise management will suffer as a result.

### Security updates should continue

Unlike letter upgrades, Huawei should be able to push security updates via AOSP to existing devices to keep them patched. While typically SMRs would also be recertified, Huawei seem to suggest they’ll be able to get around this, though details are sparse.

In a statement to various online sources, Huawei said:

> Huawei will continue to provide security updates and after sales services to all existing Huawei and Honor smartphone and tablet products covering those have been sold or still in stock globally. We will continue to build a safe and sustainable software ecosystem, in order to provide the best experience for all users globally.
> 
> <cite>Huawei</cite>

### Android Enterprise

Though removed from Android Enterprise Recommended, this doesn’t automatically mean Huawei devices can no longer be used in the enterprise; AER validation is based on more than simple hardware requirements and standardised validation tests to be considered for AER, and Google made the appropriate choice to delist Huawei on these other factors.

Android Enterprise does and will continue to work for as long as the devices currently GMS certified remain so. Should an update in future remove GMS applications, Android Enterprise will suffer as a result (all Play API features will be removed with it). This however is not planned, nor would it make sense to do so for Huawei.

No reason to panic
------------------

Organisations with existing, mature deployments will not necessarily be in a position to swap their estate for another OEM. Technically however as mentioned above the devices should continue to work until a hardware refresh can be budgeted and undertaken. Nothing should simply cease to function.

My chief concern would be the implementation of security updates, which I’m yet to see any real clarity on. Without security updates (or partial security updates, because we don’t yet know what these look like) devices may be left open to vulnerabilities, so I hope to see a solution on this sooner rather than later.

Unless Huawei, the US and China come to some agreement by August, the best course of action would be to plan a thoughtful migration as devices reach scheduled end-of-life, but equally have a new OEM lined up to take the place of Huawei should devices fail ad-hoc.

In any case, organisations who ultimately deployed Huawei did so following pilots or proof-of-concepts which demonstrated suitability for use, and this suitability should not change any time soon.

Keeping tabs
------------

I’ve got a few recent Huawei devices to hand, including the Mate 20 Pro which is new (and flagship) enough to receive focus from Huawei on whatever is coming next. I will be following any developments closely.

As more information becomes available, I’ll also update this post as and when relevant.