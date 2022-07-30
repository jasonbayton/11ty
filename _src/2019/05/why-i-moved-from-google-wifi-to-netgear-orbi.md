---
title: 'Why I moved from Google WiFi to Netgear Orbi'
date: '2019-05-08T16:13:08+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 8096
tag:
    - google
    - 'google wifi'
    - mesh
    - netgear
    - networking
    - orbi
    - router
    - support
    - wifi
post_format: []
discourse_permalink:
    - 'https://discuss.bayton.org/t/why-i-moved-from-google-wifi-to-netgear-orbi/293'
publish_post_category:
    - '14'
tags:
    - Reviews
---
Mesh networking has been an interesting topic to me for a while; having always essentially run one router with a mix of wired and wireless access points, I mostly had the coverage even out into my odd bolt-on extension, but with none of the benefits of a mesh network, mainly:

**Reliability**: Without wiring up every access point (that is to say, running cable through the house, which is a pain in old brick buildings) all the wireless access points would do is repeat whatever signal they were able to get, meaning the connection was often unreliable in the kitchen despite a strong WiFi signal.

Mesh aids this by maintaining a more consistent connection across multiple satellites, aided further with a dedicated backhaul that doesn’t interfere with network traffic for mesh communications.

**Management**: From the point of leaving the router, I effectively lost most monitoring and management capabilities with access points. I’d occasionally reuse the odd DD-WRT based router as an AP and naturally got a little more flexibility with that, however even then it was multiple disjointed management portals, so left room for improvement.

With the mesh network in place I’m able to monitor each satellite from the main management portal, as well as easily seeing what devices are connected where, this comes in handy on occasion when a device doesn’t want to disconnect from the office satellite while I’m in the living room for example, and allows me to take action. I’m equally able to run diagnostics, push updates and more.

There are other benefits of mesh networking, but the above were the drivers for my network.

Google WiFi seemed like an obvious choice
-----------------------------------------

Having a house literally full of Google gadgets – a Home in almost every room, [Android devices up to my ears](/android/android-enterprise-device-support/), Chromecasts, Chromecast audios (RIP), Android TV and more it made sense to look first at Google WiFi.

And it worked! For the most-part. I snagged a 3 node kit on sale and went to work decommissioning my PFSense linux router (powered by the [fitlet-RM](/2017/03/long-term-update-the-fitlet-rm-a-fanless-industrial-mini-pc-by-compulab/) I’ve had kicking around now for many years with absolutely no problems still to this day!). Once up and running I then had to configure it via the Google WiFi app as there’s no local web portal (that I’m aware of at least).

Generally things went well, until it came to forwarding ports for external access to my hosted services. Google WiFi mandated that, in order for port forwards to be applied, a DHCP reservation must be in place.

For servers already using static IPs.

Despite that being utterly unnecessary I did so because I had to, then went about creating the forwards and everything went pretty smoothly for a while.

Though entirely app-based, I quite enjoyed using Google WiFi, and appreciated the several tools in place for managing the network, devices and more:

<div class="wp-block-columns has-3-columns"><div class="wp-block-column">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/04/Screenshot_20190302-131933.png)</div><div class="wp-block-column">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/04/Screenshot_20190302-131952.png)</div><div class="wp-block-column">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/04/Screenshot_20190302-132138.png)</div></div>I also liked parental controls, the various tools for troubleshooting (testing mesh, network speed, individual wifi speed of devices connected), and integrated home control, if a little unnecessary having the home app already on my devices already.

The WiFi app is a great example of mobile-first administration that I wish more companies embraced (the Orbi app lacks a considerable amount of options, instead requiring I fall back to the web interface instead, which I’ll cover shortly).

On the hardware itself the puck design is small and compact. While I chose to hide them out of the way they’re by no means offensive. I also appreciate that any node can be primary.

If everything had remained like this it would have been perfect and I’d not be comparing products in this post.

Completely let down by the software
-----------------------------------

Unfortunately things started going downhill before Christmas, when I noticed I’d regularly lose access to my servers from outside the house.

It didn’t take long to figure out what happened; effectively Google WiFi was dropping servers randomly into an “inactive” state, and once that happened, the DHCP reservation switched to “unavailable”. killing the port forward.

Often times the whole Google WiFi network required a reboot to get it to pick up my servers again, and as this progressed it got to a point where I’d have to reboot the network entirely, and SSH into the affected servers to generate traffic in order for Google WiFi to detect them, multiple times a day.

I logged a ticket, but also started tweeting about it:

<figure class="wp-block-embed-twitter wp-block-embed is-type-rich is-provider-twitter"><div class="wp-block-embed__wrapper">> For context, [\#GoogleWifi](https://twitter.com/hashtag/GoogleWifi?src=hash&ref_src=twsrc%5Etfw) requires a DHCP reservation even against servers with static IPs.  
>   
> It isn't possible to create a port forward unless this is done (no port &gt; IP basic functionality here).  
>   
> Once a reservation is made, you then select it to create a port forward.
> 
> — Jason Bayton (@JasonBayton) [January 5, 2019](https://twitter.com/JasonBayton/status/1081501699930497024?ref_src=twsrc%5Etfw)

<script async="" charset="utf-8" src="https://platform.twitter.com/widgets.js"></script></div></figure>Manually logging in became tiresome, so on the main server handling most of my traffic (HAProxy) I set up a cronjob to automatically pull down ISOs in order to keep the connection “alive” between the server and Google Wifi (NB, it’s a wired server):

<figure class="wp-block-image">![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/04/Screenshot_20190130-172959-e1555450467687.png)<figcaption>Is this enough traffic? Google WiFi didn’t think so</figcaption></figure>Meanwhile a ticket with Google support wasn’t getting me very far, with them focusing more on the fact the satellites were on a different IP range (class A network) than the hub, an issue caused because Google WiFi wouldn’t offer the customisation I needed for DHCP, at one point I was even told Google WiFi doesn’t support class A networks, but didn’t receive any documentation or further clarification when I asked for where this is stated in the manual.

Once they’d tired of me reiterating my network was fine, they then turned their attention to issues they detected with Virgin Media (ISP), and asked I raise a ticket with them (for Google WiFi forgetting devices?). VM subsequently confirmed my broadband was fine (I humoured the request), and so back to Google it went.

Eventually during more troubleshooting, a bug was identified with the priority feature, in that on their end it was showing devices given network priority despite the app showing no such thing, and troubleshooting couldn’t continue until this was fixed with a factory reset.

As Google WiFi offers no means for backing up or restoring config, I figured if I’m going to spend an hour setting up my network again, I might as well try another product.

From my few months of use I found myself more frustrated by Google WiFi’s unreliability than any other product in recent history.

Enter Orbi
----------

After reaching out to Netgear on Twitter, they were kind enough to send over a 3 node Orbi kit as a like-for-like replacement of the Google WiFi setup:

- ![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/04/IMG_20190215_134950-e1555520536341.jpg)
- ![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/05/IMG_20190215_135143.jpg)

Orbi right off the bat offered an upgrade, boasting AC2200 over Google WiFi’s AC1200; I looked forward potentially to slightly better WiFi performance.

Unlike Google WiFi, the Orbi app offers fewer features and instead diverts users into an admin web interface most who tinker with routers would be familiar with.

Would it be nice if the Orbi app offered improved functionality? Yes, but things like speed tests, network checks, and visibility of connected clients are all present and accounted for, with a little additional functionality gained through another of Netgear’s apps, Genie (though I rarely use it).

- ![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/05/Screenshot_20190502-211608.png)
- ![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/05/Screenshot_20190502-211618.png)
- ![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/05/Screenshot_20190502-211630.png)
- ![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/05/Screenshot_20190502-211649.png)
- ![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/05/Screenshot_20190502-211735.png)

Netgear also partner with 3rd parties for some of the functionality offered, which is built-in with Google WiFi, in particular Disney for parental controls (yet to test!) and Speedtest.net for monitoring the speed of the ISP.

- ![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/05/Screenshot_20190502-211805.png)
- ![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/05/Screenshot_20190502-211820.png)

I’m also rather appreciative of the traffic monitoring capabilities, but do wish the settings for limits were a little more granular, and traffic monitoring in general was a little more advanced in telling me what sort of data was being used (streaming, etc)

- ![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/05/Screenshot_20190502-212053.png)
- ![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/05/Screenshot_20190502-214326.png)

Legacy or not, the web interface offers everything I need and more; in particular features missed from Google WiFi, such as assigning port forwards based on IP rather than a DHCP reservation (honestly would have never thought I’d be describing this as a feature).

![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/05/image.png)Orbi unboxed with a slightly older firmware version and didn’t appear to want to update to the latest (no updates detected) but as a typical Netgear product, fully supported manual updates.

As recommended, I updated the two satellites first, then the hub last with the two separate firmware packages. The network went down for a few minutes but was up and running once more in no time. Further updates were managed automatically and didn’t require this process.

The only issue I had, much like Google WiFi, was assigning a DHCP range I was happy with. For whatever reason Orbi had three of the four octets greyed out when selecting a range, despite otherwise fully supporting my class A network.

The fix for this, because I was not going to be forced to utilise the same range as the router sat on for DHCP, was to break out Chrome Devtools, re-enable the disabled octets, update the range from X.X.X.10-254 to X.X.100.10-254, and click save.

![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/05/image-1.png)Once saved and the page refreshed, the interface appears to once more show a limited range, however on the backend, which I later confirmed with a quick telnet session, the IP range had updated and everything was working perfectly. I raised this with Netgear and my feedback was sent to engineering for consideration.

In testing I find the connection to be stable moving through the house, and though clients do still like to remain connected to satellites when moving about, as soon as a satellite goes out of range it picks up another rapidly.

I find range to be roughly similar to that of Google WiFi, but generally a little faster.

One other feature I’d have liked to see is cert-based authentication for WiFi, which Orbi (nor Orbi Pro!) features today. With Android Q around the corner I’ve been eager to test cert-based WiFi auth in QR &amp; NFC payloads, however don’t yet have the infrastructure to do so. This was also fed back to development, so hopefully may be supported in future.

One other feature Orbi lacks is support for DNS over TLS. My Android 9 handsets are all configured to use CloudFlare’s 1.1.1.1 secure DNS service, but I’m unable at the moment to leverage this on a network level.

On the hardware side I don’t have any particularly strong feelings aesthetically. The Netgear nodes are a fair bit larger than Google WiFi but still pleasant enough to look at. This opinion comes from someone who at one point ran a network on a beaten up old Dell Optiplex though, so everything today seems pretty inoffensive by comparison!

Netgear assign a master and satellite with their 3 node kit, which means unlike Google’s WiFi it’s not a case of picking any to be a master and the others to run as satellites. I don’t know why Netgear took this approach but in honesty it’s not really a concern.

Both products offer the capability of adding more nodes/satellites for larger homes or increased coverage, though it definitely appears Netgear have a leg up on Google in terms of extensibility:

![](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2019/05/image-2.png)I don’t need a dedicated satellite for WiFi in the garden, but I certainly want one!

Conclusion
----------

Neither product could necessarily be considered perfect for what I want, but the unrelenting software issues I faced with Google WiFi, for such an expensive product, was simply unacceptable.

For most I imagine this wouldn’t be an issue, after all Google have over-simplified everything about WiFi seemingly as far as possible to make it a great out-of-box experience for the majority of internet users wanting to dabble with mesh networking.

For me though, nothing beats a router I have shell access into, and the comparably advanced (in reality pretty standard) networking features I’ve come to rely on mean I need a more traditionally-approached mesh network product. Orbi fits the bill.

While Netgear perhaps falls short on the mobile-first side of things, they certainly make up for in technical capability and extensibility.

If only they had a satellite with Google assistant, I’d be sticking them everywhere!

Orbi can be purchased on Amazon:

- [Orbi whole home](https://amzn.to/2Vh7PHi)
- [Orbi Pro](https://amzn.to/2IVpdum)
- [Orbi Ultimate](https://amzn.to/2VKtEOw)

Many thanks to Netgear for making this post possible.