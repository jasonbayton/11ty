---
title: 'Free Skype with 3? There&#8217;s a catch..'
date: '2010-02-04T12:07:42+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 284
tag:
    - '3'
    - blocks
    - Linkedin
    - Skype
    - 'SkypePhone manager'
    - three
    - workaround
post_format: []
tmac_last_id:
    - '205557741715062785'
post_views_count:
    - '1486'
tags:
    - Reviews
---
As with all things too good to be true, recently I was pulled in by the marketing ploys of the [3 network](http://www.three.co.uk). They offer **free** [Skype](http://www.skype.com), **free** WLM and as with most competitors recently, a whole bundle of free addons with every top up, in their case it is anything from 10 pound.

It is the [Skype](http://www.skype.com) that drew my attention, I love Skype and use it constantly. I have my [Skype Server](/2009/08/skype/) running daily (though upgraded now), a [SkypeIn](http://www.skype.com/allfeatures/onlinenumber/) number and [SkypeOut](http://www.skype.com/intl/en/allfeatures/subscriptions/europe/) activated (5euro per month for unlimited calls to Europe!) – you could say I’m their ultimate customer really (as I’m advertising them aswell!).

However back to the 3 network, it turns out there are some limitations that I can’t personally find even in the small print, after a little frustration it was a [Google search](http://www.google.com/search?rlz=1C1GGLS_en-GBNL341NL341&aq=0&oq=you+can+only+make+call&sourceid=chrome&ie=UTF-8&q=you+can+only+make+calls+to+numbers+abroad) that cleared the air which told me SkypeIn and SkypeOut (partially) have been blocked, this being due to the massive losses 3 would face if it allowed these tools to be used. Too bad for them as after another Google search I found a way around it, naturally, by using an app created by [Leon Mayne](http://leon.mvps.org/SkypePhone/).

There are a couple of things required to get this up and running;

- 3 mobile with Skype
- A [Skype Server](/2009/08/skype/)
- 2 Skype accounts
- (SkypeIn/SkypeOut, otherwise this defeats the object)

Leon’s app works by taking your call, and forwarding it to a number of your choice pre-set with a chat message before the call is made. It also forwards incoming calls to the user account of your choice, set in the configuration file after installation. There’s no need for me to explain how it is set up, as Leon’s page explains fairly well. However if I was to offer extra advice it would be where he states;

“In the folder you unzipped to, *edit the SkypePhoneManager.exe.config file* and enter your mobile phone username in the appropriate space (e.g. mobileuser)”

Use a program such as notepad (right click &gt; open with …) to edit the file as specified, and the rest is common sense.

Once set up, if you’re running it on a Skype Server, disable Skype’s automatic start with Windows, and drag the SkypePhone manager shortcut to Start &gt; All Programs &gt; Startup. SkypePhone manager automatically starts Skype when it is launched, so there’s no need to have Skype start itself on boot.

A big thankyou to Leon for his app (the whole reason for this post) and hopefully others will now be able to benefit from this post.