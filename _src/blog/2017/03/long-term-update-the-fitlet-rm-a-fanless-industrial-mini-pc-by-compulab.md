---
title: 'Long-term update: the fitlet-RM, a fanless industrial mini PC by Compulab'
date: '2017-03-19T21:26:28+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 3913
tag:
    - compulab
    - industrial
    - linux
    - mini-pc
    - passive
    - Server
    - windows
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/long-term-update-the-fitlet-rm-a-fanless-industrial-mini-pc-by-compulab/85'
tags:
    - Reviews
---
It’s been just over 250 days (or about 8 months) since I published [my review](/2016/07/hands-on-fitlet-rm-a-fanless-industrial-mini-pc-by-compulab/) of the fitlet-RM. At the time I was very impressed by the system, its versatility and being able to run a reasonably powerful PC completely passively cooled. It didn’t take long before I found the perfect use for it and given how critical it is to my home network today, I thought I’d revisit the fitlet-RM to shed some light on how I’ve gotten on with it.

Around the time of publishing I was also looking to build myself a new router based on OPNsense (a pfsense fork). I’d tried a few options but ultimately wasn’t happy with anything due to noise, size or reliability. I figured the fitlet would be a viable option, so once I’d finished benchmarking it and hit publish on the review, I set to work on installing OPNsense.

In terms of IO, the fitlet I received is the perfect machine for networking, with the single NIC on the back and 3 additional NICs through the facet card on the side, it offers more than enough ports for what I need – in fact today only two are in use; a NIC for internet and another for LAN going out to an access point (from which it connects via switch to the rest of my network). I’m saving the other two for when I begin experimenting with segmented LANs, a DMZ or other such experiments.

[![](https://cdn.bayton.org/uploads/2017/03/IMG_20170319_155314233-e1489958703965.jpg)](/https://cdn.bayton.org/uploads/2017/03/IMG_20170319_155314233-e1489939544156.jpg)

In combination with the fit-Uptime, the fitlet has achieved over 99.999% uptime excluding the occasional planned shutdowns (holidays, etc) despite a couple of power cuts over the last 8 months (thanks, Wales). At no point have I needed to manually bounce it for any reason and I haven’t noticed any network issues associated with long uptimes. It’s currently sat at over 40 days, though was up for over 100 previously with no issues.

Here are a couple of stats courtesy of OPNsense:

Average temp: 50.2\*C  
Disk usage: 2.9GB  
Average memory (free): 66%  
Average load: 0.18

I’d have liked to show traffic as well, however traffic totals aren’t reliable (and rarely sampled) it seems.

Despite the system sat in a small cabinet with the door closed most of the year, the temperature has remained fairly stable (it certainly got far warmer running Windows previously). Unsurprisingly it’s rather over-powered for what I’m using it for; realistically the [fitlet-X-LAN](https://www.fit-pc.com/web/products/specifications/?model%5B%5D=FITLET-GX-C64-FLAN-W) with the A4 and 4GB RAM would suite this usecase far better, and at some point I may pick one up when I find a new use-case for the one I have, but for now it’s doing an excellent job.

In the picture above you may notice the VESA mounting plate and the (still) silver heatsink. It took a little longer than expected for the black heatsink to go on sale, by which time the fitlet was already out of sight under the TV and I found I wasn’t particularly bothered enough by the colour mismatch to do anything about it. Similarly the VESA mount was for me to mount the fitlet under my desk in the office and again hasn’t been necessary, instead I’m using it as an additional plate to help further dissipate heat (whether or not it works like that I don’t know, but there’s no harm in having it attached either way).

That’s really all there is to this followup. Being absolutely rock-solid in terms of performance, reliability and causing me no issues whatsoever as the gateway to my network, I felt the fitlet (and the Uptime) deserved another mention; it’s required the least amount of attention of all the devices I own and that, in its own right, earns it top marks in my book. To echo what I said in my first review:

> In combination with the fit-Uptime I envision the fitlet will ultimately – just as advertised – be one of the most resilient and reliable systems I’ll ever run. For the price I wouldn’t have expected a system as decent as this.

And for anyone interested, to save going back to my first review, here are the product links:

- fitlet heatsync: [Amazon UK](https://www.amazon.co.uk/CompuLab-ACCENC-HEATFLT-Compulab-Heatsink-fitlet/dp/B0144ST37Y//ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=bayton-21&linkId=7ae875738f2d1406b5b1576f102f1788)
- fitlet remote power button: [Amazon UK](https://www.amazon.co.uk/Compulab-Remote-power-button-fitlet/dp/B0144PKH2M//ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=bayton-21&linkId=7a64ab4d3cf3868d4a6e94b6150f8795)
- fitlet VESA/wall mount: [Amazon UK](https://www.amazon.co.uk/Compulab-VESA-mounting-bracket-fitlet/dp/B0144OL58S//ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=bayton-21&linkId=48213495d9ad6241c1800ad9468c3167)
- fit-Headless: [Amazon UK](https://www.amazon.co.uk/CompuLab-fit-Headless-x/dp/B00FLZXGJ6/ref=as_li_ss_tl?s=electronics&ie=UTF8&qid=1484578811&sr=1-1&keywords=fit-headless+4k&linkCode=ll1&tag=bayton-21&linkId=d27d9c99a48667268fdb6a9e447a2e67)
- fit-Uptime: [fit-PC (official)](https://www.fit-pc.com/web/purchasing/order-fit-uptime/)
- fitlet-RM-XA10-LAN barebones: [fit-PC (official) ](https://www.fit-pc.com/web/purchasing/order-fitlet/)– links to all fitlet models

*Have you purchased your own mini PC since my initial review? Or a fitlet-RM? Let me know in the comments, [@jasonbayton](https://twitter.com/jasonbayton) on twitter or [@bayton.org](https://facebook.com/bayton.org) on Facebook.*