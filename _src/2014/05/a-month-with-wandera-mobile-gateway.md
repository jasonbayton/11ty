---
title: 'A month with Wandera Mobile Gateway'
date: '2014-05-05T22:16:02+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 1810
tag:
    - apn
    - gateway
    - 'mobile gateway'
    - proxy
    - wandera
post_format: []
post_views_count:
    - '4703'
discourse_permalink:
    - 'https://discuss.bayton.org/t/a-month-with-wandera-mobile-gateway/390'
publish_post_category:
    - '14'
tags:
    - Enterprise
    - Reviews
---
<div class="bs-callout bs-callout-info">#### This review has been superseded

This review was published in 2014. For a more recent look at Wandera, check out my [Wandera review 2016: 2 years on](/2016/12/wandera-review-2016-2-years-on/) which includes an overview of their mobile threat defense product. If you’re considering Wandera for your business, it’s worth a read!

</div>A few weeks ago I attended [Whitehall Media](http://www.whitehallmedia.co.uk)‘s EM&amp;MDM conference in London where I got a chance to talk to several EMM-related software vendors throughout the day. Whilst perusing the various solutions on show (and having listened to the various speakers during the morning and afternoon sessions), one of these vendors really stood out – [Wandera](http://wandera.com).

A relatively new software company, Wandera was founded in 2012 and boasts the first product of its kind: [Wandera Mobile Gateway](https://www.wandera.com/data-policy/).

The solution is exactly as it sounds; a gateway(/proxy) that sits between a smartphone and the internet (via a little APN magic) in order to monitor and manage the data connection using policies, caps and black-lists/white-lists. It goes a bit further than that too, providing both data compression and threat avoidance as part of their Extend and Secure offerings respectively. Given the struggles I’ve had reliably pulling this data out of the MDM solution in place at work, I figured I’d get in touch with them to see for myself whether or not it was any good.

(Spoiler: It really is).

Having done the brief introduction/webinar with Mike the sales guy to get me started, I encouraged a couple of colleagues to give up their data usage habits for a month to see just what the solution can do. I say a couple.. the minute amount of data one of my esteemed colleagues managed to consume isn’t really worth mentioning, but every little helps and although the amount was negligible, it did assist in populating several other metrics that helped with the over-all evaluation.

Now, one month into the evaluation and after a stint of both national and international data usage, here are my thoughts, taking into consideration I will not be covering every single feature:

Overview
========

<span style="color: #000000;">The UI is incredibly simple! Everything just makes sense when clicking around and setting things up. My only real moment of pause came when I tried to figure out how to create separate data policies, but it became clear pretty quickly once I’d taken a moment to fully read through the page (and the vast document library).</span>

Enrolling a single device is a piece of cake; it requires literally nothing more than popping in a couple of details and selecting from a few drop-down lists. From there an email is sent and the user is invited to enrol their device. For those with a supported MDM platform ([AirWatch](http://air-watch.com)/[MobileIron](http://mobileiron.com)) it’s even easier, enrolment can be done using an application push in a matter of minutes.

When setting up a device, I found it was important to indicate the group that the device(/user) belongs to. It’s empty by default and requires you to type in the name of your group before enrolling. Once completed, said group will then be available for every subsequently enrolled device. Groups are used to allow for multiple different policies, it’s really important they’re utilised.

[![Devices](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2014/05/Devices-e1399322805740-1024x350.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2014/05/Devices-e1399322805740.png)

<div id="Dashboard"></div>As of now Wandera supports iOS and Samsung Galaxy devices. You’d think that would mean any Android device can be enrolled but that isn’t the case; Wandera takes advantage of Samsung’s baked-in APIs in order to manage the Galaxy devices which, obviously, non-Samsung devices don’t have. Hopefully this will expand in the future as it’s somewhat limited in its current form.

Dashboard
=========

The first page to greet you upon login is the dashboard. It gives a nice, simple overview of data usage, frequented web-domains (note – Wandera doesn’t track web pages, just the domains you visit), top data consumers (apps/websites/users) and even a fairly real-time data consumption monitor.

[![Dashboard](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2014/05/Dashboard1-1024x1007.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2014/05/Dashboard1.png)

With this information immediately at hand it’s incredibly easy to see how the mobile workforce is performing, on what they’re using their data and where they are (the interface is colour-coded green for domestic data and blue for roaming). Each of the individual headings will take you to in-depth reports when clicked.

There’s also a nice little summary at the top for roughly how much is being spent (based on manually configured plans) and how much of the data is being compressed. The image above reflects poorly on the abilities of the compression engine, but that is entirely due to the fact Wandera cannot compress encrypted connections, this effectively means app downloads, streaming media and more (basically the majority of what I used) will not benefit from this, but basic images/websites will.

I’d like to be able to customise the dashboard to suit my particular interests, but the dash does provide almost everything I could possibly want, so it’s not bad.

View
====

View is the first of the three core areas of Wandera and provides in-depth analysis and analytics of how data is used. Where the dashboard provides a limited overview of data usage, View breaks it down granularly into user summaries, personal/business usage comparisons and further reports into the apps/sites visited.

[![View](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2014/05/View.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2014/05/View.png)

The information provided, though pretty basic, provides masses of insight into how data is being used, where it’s being used and who it’s being used by. The image above shows global stats but is simple to change to show data for a single user. It’s equally simple to separate domestic and roaming data if necessary using the menu at the top of the page. (Note I’ve cut the image off, it goes on a lot longer!)

I’m a big fan of the way the data is presented and I really like the graphs on almost every page of the console. Not only is it incredibly simple to absorb the data quickly, it makes sharing with management a snap (we all know management like their pie-charts and such!). It’d be even better if everything on display could be exported – even if only to PDF – as currently it appears only the datasets (the lists of sites visited for example) can be exported whilst the charts cannot. It’s simple enough to take a screenshot, but it would be better not having to do so.

Extend
======

The Extend module provides reporting into how much data has been used, how much has been compressed, when blocked sites are visited and when data caps are being hit.

[![Extend](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2014/05/Extend.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2014/05/Extend.png)

Aside from breaking it down into per-user reports, there’s not a lot to do here. Within settings you can configure the plans and associated costs which are then used by these reports, but otherwise it appears to be more of a back-end tool that simply provides reporting for the administrator. Still, it’s incredibly interesting to see. I particularly like the estimated savings (even if I can’t verify them!).

Again as mentioned above the compression engine doesn’t look that impressive at all in the example I’ve shown, but this is wholly due to the fact that most of the data usage that has taken place has been app downloads and streaming music – both over encrypted connections of which Wandera has no control.

Policies
========

The policies and other configurable areas within settings are extremely basic. In fact, it had me wondering if I’d missed something for a moment. You can essentially set your data limit, caps, black-listed/white-listed sites/applications and alert policies. Once configured and saved, the changes take effect immediately.

[![Policies](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2014/05/Policies-e1399325258423.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2014/05/Policies.png)

Different policies can be put in place for different groups, just be aware that a number of settings configured on the global policy cannot be altered then within the individual group policy. I found I had to tweak a few global settings in order to get the group policy set up as I wanted.

That’s essentially all there is to it, once saved the policy takes effect and will allow a user to get on with their day right up until they reach their limit. Ideally alerts should be configured to provide advance warning of any pending cut-off of data, but that’s ultimately down to the admin to configure.

So, does it work?![iphone.block](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2014/05/iphone.block_.png)
===============================================================================

Flawlessly. The speed at which changes take effect (due, no doubt, to the nature in which the devices communicate with the server and not the other way around) is incredible.

When a limit is reached, I’ve configured it so that emails are sent out and Wandera blocks any further non-permitted data usage (white-listed sites/apps will continue as normal). Similarly if a domain is black-listed, it’ll block access to the website irrespective of data allowances, as displayed on the right, taken from the iPhone I’m using to test the solution. I’d like to be able to customise the message that pops up in the future, but for the time being it does the job it’s intended for.

Naturally with any solution like this, the data reported needs to match up as closely as possible with the carrier and while I wasn’t able to test this against what O2 have reported from the beginning of April (as I fired up the trial a number of days later), I was able to see that Wandera was reporting 100MB less than O2, which, according to my phone, is roughly how much data I’d used before enrolling the device onto Wandera. If I can stretch the trial out a few more weeks I will be sure to get an accurate report from both sides to compare. Until I get that, I can’t be 100% sure they definitely report the same data usage.

What’s missing?
===============

Unfortunately, a few missing features (as of writing this) make Wandera very difficult for me to implement on a large scale:

1. It isn’t possible to enrol using LDAP/AD credentials
2. It only supports Samsung’s line of Android devices
3. MDM integration is limited to the two bigger players on the market
4. Adding additional administrators requires opening a support ticket with Wandera

Until I see wider Android adoption and a much easier way of enrolling devices in bulk, it’s going to be quite difficult to roll out to the business. The last thing I want to be doing is compiling CSV’s of *everyone* who should be enrolled on the solution after first checking they’ve all got Samsungs (they don’t all have Samsungs).

Conclusion
==========

I’m really, really impressed by how the solution works and how theoretically easy Wandera makes it to manage devices. Considering at the moment I’ve got very little insight into how users use their allocated data on a monthly basis, Wandera really appeals to me.

Although there are some show-stoppers for me currently, the solution is still fairly young and I’m sure those and many other features won’t be far away.

Wandera is definitely a solution to keep an eye on. I look forward to seeing how it evolves.

Update:
-------

Having used Wandera for the remainder of May and verifying data usage with O2, I’m pleased to report data consumption is very accurately displayed. Well done Wandera!