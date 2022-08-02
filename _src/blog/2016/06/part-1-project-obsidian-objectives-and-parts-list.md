---
title: 'Part 1 - Project Obsidian: Objectives & parts list'
date: '2016-06-27T11:20:31+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 2908
tag:
    - build
    - linux
    - LXD
    - NAS
    - obsidian
    - pc
    - Server
    - ubuntu
    - zfs
post_format: []
post_views_count:
    - '33'
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/part-1-project-obsidian-objectives-parts-list/108'
tags:
    - Projects
---
<div class="bs-callout bs-callout-default">#### Just tuning in?

This is a multi-part build log for Project Obsidian: a low power Ubuntu 16.04 LTS NAS &amp; container server.  
You’re currently viewing part 1. Head over to the [introduction ](/2016/06/part-0-project-obsidian-nas-app-server-build/)for context and contents.

</div>Objectives
----------

### Data

Today my data sits across multiple services; the vast majority of it sits disorganised on my 2015 build, desperately requiring some TLC as I know I have backups of backups taking up large quantities of disk space unnecessarily. Plenty of it though sits fragmented across Drive, Dropbox, Box and OneDrive, this data isn’t backed up and needs to be relatively quickly. I have more than enough space already to bring everything in and dump it on my RAID, but I’m reluctant to increase disk usage on the 2015 build as it then becomes difficult to shuffle it around when the much-needed RAID rebuild has to take place.

### Power

The 2015 build idles between 90-110w and can ramp up pretty quickly when under load. As it’s primarily used as a VMware Workstation server for both personal and work projects, it doesn’t sit idle very often. The hexcore works great for what I have it doing, but it’s more powerful than it needs to be once I optimise the system; VMware for example powers several 16.04 LXD hosts as the underlying OS is still running Ubuntu 14.04.4 LTS. The new build will incorporate LXD directly and therefore reduce the amount of virtualised hardware the OS needs to run. With virtualisation reduced, so too is the CPU power requirement meaning I can opt for a much lower-power chip.

### Clutter &amp; bloat

The 2015 build is running an install of Ubuntu 14.04.4 LTS from the beginning of 2014 where it began life as a 13.10 install. Ignoring the several upgrades its gone through, the system has been a test-bed for anything and everything remotely interesting on Linux for years. Projects get cancelled, PPAs 404 and dependencies no longer update, so what I’m left with is a cluttered, bloated OS I don’t particularly enjoy maintaining.

VMware fixed that to some degree as I moved a lot of individual services into their own Ubuntu VMs. At one point I was running close to 20 Ubuntu 14/15.x installations and the load on the server was becoming apparent. Later I moved everything over to LXD where it has remained and have switched off almost all VMs.

That hasn’t fixed the underlying install other than allowing me to remove some applications that now live in containers, so the goal with Obsidian is to start with a new, fresh 16.04 LTS build and containerise everything from the beginning; I’m aiming to keep all installations as vanilla as possible so when upgrade day comes, I won’t have anything to worry about.

### Space

The 2015 build is huge. I found myself drawn in to the modular capabilities of the Cooler Master HAF Stacker series without truly considering the requirements of the build. Today the server towers above an already large printer and due to the open nature of the case – despite positive airflow and plenty of filters – dust is an issue, one I didn’t face with the 2014 build using a Fractal Define case far more suited to my needs.

For Obsidian I’m partially dismantling the 2015 build, taking the lower [Stacker 915R](http://www.coolermaster.com/case/mini-itx/haf915r/) and combining it with a second to create a server capable of holding as many disks as I need at half the size. Dust ingress is still a concern, however I have a plan to better manage this with the two smaller cases combined. The new build will be mini-ITX to sit comfortably within the 915R.

Parts list
----------

With the above objectives outlined I put in the order:

![20160627_092652](https://r2_worker.bayton.workers.dev/uploads/2016/06/20160627_092652.jpg)

### Motherboard

I chose an [ASRock AM1B-ITX](http://www.asrock.com/mb/AMD/AM1B-itx/) as my motherboard as it was relatively cheap (£28.73 on [Amazon UK](https://www.amazon.co.uk/gp/product/B00J0DJILU?ie=UTF8&camp=1634&creativeASIN=B00J0DJILU&linkCode=xm2&tag=bayton-21)), sits on par with other boards in this arena and covers the bare minimum SATA connections required for a maximum of 7 RAID members + OS drive in combination with a PCIe card. In an ideal world I’d have liked 6-8 SATA ports however I can make do, and will look for a PCIe option in the future to support more than 4 SATA ports, freeing up the motherboard all together.

### CPU

Having done a little research I found myself repeatedly seeing the [AMD Athlon 5350](http://shop.amd.com/en-us/components/processors/AD5350JAHMBOX) being mentioned online as something that strikes a good balance between power and efficiency. Again I found the chip was relatively cheap (£29.76 on [Amazon UK](https://www.amazon.co.uk/gp/product/B00IOMFAQ0?ie=UTF8&camp=1634&creativeASIN=B00IOMFAQ0&linkCode=xm2&tag=bayton-21)) and suited the ASRock board nicely. With a TDP of 25w it ticks the box for low power and a cursory glance at [CPU boss](http://cpuboss.com/cpus/AMD-FX-6300-vs-AMD-Athlon-5350) shows I’m not losing too much over the FX6300 powering my previous builds (I take benchmarking with a pinch of salt).

The AMD comes with a CPU fan as standard, however I’ve ordered a passive heatsink to keep fan noise to a minimum. I’m not normally one to attempt to passively cool my builds, but given the low TDP and the well ventilated case I figure it will be a learning experience.

### RAM (not pictured)

I opted, as I normally do, for Ballistix Sport DDR3 1600 to cover the RAM requirement. As Obsidian will be an LXD &amp; Docker host, I decided on 16GB (8GB x2) in order to guarantee resource for every LXD and Docker guest, plus any resource required for streaming from the host itself. The RAM is a more expensive component at £38.99 on [Amazon UK](https://www.amazon.co.uk/gp/product/B007PNNTY4?ie=UTF8&camp=1634&creativeASIN=B007PNNTY4&linkCode=xm2&tag=bayton-21) but doesn’t break the bank. Ideally I should’ve opted for ECC memory however the board doesn’t support it. At a later date I’ll move the Ballistix into my desktop, swap the board with something a little more up-market and get as much ECC memory in as I can, though that requires I sell some of my existing hardware otherwise I can’t justify the expense.

### PSU

Doing some rough calculations I came up with a requirement for ~200w to run the system and 8 drives. Not knowing what the future holds however I opted to give myself a buffer should I choose to use the PSU in another build in the future, or just run something more power-hungry in Obsidian. I therefore went with a brand I always use for power supplies: Corsair. The semi-modular Corsair CX450M is a 450w supply and allows for better cable management than its non-modular alternatives. The supply has been the most expensive component thus far at £42.08 on [Amazon UK](https://www.amazon.co.uk/gp/product/B01C3FFOHS?ie=UTF8&camp=1634&creativeASIN=B01C3FFOHS&linkCode=xm2&tag=bayton-21) (not including disks or case).

### SATA expansion

I had a spare PCIe 4 port SATA card that I bought at one point when it was on sale. It’s a generic card branded as IOCREST and the same card has been working perfectly well in the 2015 build for many months, so it’ll do for Obsidian in order to expand the 4 SATA ports to 8 until I decide on a more permanent solution or a sponsor sends me something to test!

Update: I got my hands on a Dell H200 dual-controller 8-channel SAS card flashed to IT mode and a couple of mini-SAS to SATA breakout cables. See [part 4](/2016/08/part-4-project-obsidian-setting-up-ubuntu-zfs) for more information.

### Case (not pictured)

Already owning a [HAF Stacker 935](http://www.coolermaster.com/case/full-tower-haf-series/haf935/) consisting of the 925 and 915R, for Obsidian I’ve chosen to take the existing 915R from the 2015 build and combine it with a 915F stacked on top to house the server components. It’ll then look similar to this: (image courtesy of OC3D)

![05105110723l](https://r2_worker.bayton.workers.dev/uploads/2016/06/05105110723l.jpg)

The 915F was sourced as an open-box item through eBay for £38

### Storage

Finally and arguably the most important component of the Obsidian build. For the OS I’ll be using a 120GB Crucial M500 SSD. This is another spare I have; though they can be had for under £30 on [Amazon UK](https://www.amazon.co.uk/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=120GB+SSD&tag=bayton-21) currently, I believe I paid closer to £45 around the time of my 2015 build.

For the RAID I’m currently attempting to engage sponsors. I’m aiming for 7x 8TB or 6TB HDDs for a total of 56TB or 42TB of RAW storage respectively, these figures will drop to 40TB and 30TB respectively once in a dual-parity RAID (RAID6). If that isn’t possible, I have a number of 4TB drives I will use instead.

In any case, the total amount of RAID storage will be over 20TB!

### Accessories

I’ve purchased reels of black wiring, black braiding/sleeving and black heat-shrink. The goal here is to create perfect-length power connectors colour-coded to the build to both look slick and maintain a degree of cable management. Beyond that I have black filters, fans, screws and a selection of other dribs and drabs to ensure a very black build.

Build
-----

With the parts (mostly) sorted and the objectives defined, stay tuned for the part 2 where the build will begin! I’m also looking into setting up a camera for the purpose of recording a time lapse, so I’ll see how successful that is and include it in the next part if it works out.

Sponsors
--------

There are no sponsors just yet.

Interested in helping out? Sponsors get a mention in every post and frequent shout-outs on social media. For this build I’m currently looking for high capacity drives (6-8TB), PCIe SATA/SAS solutions and cooling options aimed towards near silence.

Get in touch
------------

As always I’m [@jasonbayton](//twitter.com/jasonbayton) on Twitter, [+JasonBayton](https://twitter.com/jasonbayton) on Google+, [/in/jasonbayton](//linkedin.com/in/jasonbayton) on Linkedin and I’m available via [email](mailto:jason@bayton.org).

Free free to get in touch to discuss this or any other topics you have in mind!