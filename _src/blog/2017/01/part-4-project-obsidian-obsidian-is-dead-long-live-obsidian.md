---
title: 'Part 4 - Project Obsidian: Obsidian is dead, long live Obsidian'
date: '2017-01-15T15:25:53+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 3611
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
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/part-4-project-obsidian-obsidian-is-dead-long-live-obsidian/93'
tags:
    - Projects
---
<div class="callout callout-default">

#### Just tuning in?

This is a multi-part build log for Project Obsidian: a <del>low power</del> Ubuntu 16.04 LTS NAS &amp; container server.  
You’re currently viewing part 4. Head over to the [introduction ](/2016/06/part-0-project-obsidian-nas-app-server-build/)for context and contents.

</div>

A new direction
---------------

It’s worth mentioning before I go any further that Obsidian has been up and running since around August last year in one way or another – decommissioning other builds (more below) left me no choice as maintaining two systems ultimately doing the same thing was only going to lead to problems. It hasn’t been perfect however, leading me to re-evaluate my wants and needs for the build as 2017 approached.

At the end of [part 3 ](/2016/07/part-3-project-obsidian-a-change-data-migration-day-1-and-build-day-2/)I mentioned being unhappy about splitting disks over a PCIe card and the motherboard. I was also concerned that, having decided on ZFS for my RAID filesystem, the motherboard I’d selected in [part 1](/2016/06/part-1-project-obsidian-objectives-and-parts-list/) wasn’t capable of supporting Error-correcting code (ECC) memory – a very much recommended type of computer memory for ZFS due to its ability to detect and correct corruption in RAM before it’s written to disk. What’s more, the motherboard supported only 16GB maxed out; ZFS being the memory-monster that it is ate this up very, very quickly (improved with optimisations, but not ideal) and left me feeling like I needed *more* from the system than I was getting.

I resolved the disk situation; not long after the previous post in the series I managed to secure a Dell H200 SAS card boasting two 4-channel controllers and running in IT mode (no hardware RAID, simply JBOD or “Just a Bunch Of Disks”). With support for all 8 4TB disks (the number has increased..) without the need for splitting them across multiple controllers this card is ideal.

The lack of ECC support and the limitation on the amount of RAM supported by the motherboard however was a bit of a dead-end for the project, so something needed to change.

In searching for a motherboard that *did* support ECC I kept finding myself being directed towards ASUS. Their boards all generally support ECC by default despite not being heavily advertised. With ECC being more of an enterprise feature it didn’t leave a lot of choice on the consumer market without paying extortionate amounts for high-end motherboards, so it was ultimately ASUS I focused on.

Looking at the available options I saw a familiar board; my 2014 build had the ASUS [M5A78L-M/USB3](https://www.asus.com/uk/Motherboards/M5A78LMUSB3/) which comes with ECC support built in, something I’d been completely unaware of up to this point. I figured I could dismantle the 2014 build (currently serving as a desktop PC in the office), move the key components to the 2015 build (already dismantled as shown in previous posts in the series) to take over desktop PC duties, and then utilise the 2014 motherboard for Obsidian.

The downside to this? The 2014 build motherboard is mATX, quite a bit larger than the mITX board in Obsidian and therefore can’t fit in the HAF 915 I opted for with this build. My first thought was to move the contents of Obsidian into the 2014 case, however with support for only 6 3.5″ disks natively and 8 with a 5.25″ adapter in the drive bays, the [Fractal Define Mini](http://www.fractal-design.com/home/product/cases/define-series/define-mini) simply wasn’t big enough for my 10 4TB drives and 2+ SSDs.

So a new case became necessary, and keeping with the Fractal theme I noticed the [Node 804](http://www.fractal-design.com/home/product/cases/node-series/node-804). It’s a case I’d seen advertised for some time and even requested for review a while back but unfortunately wasn’t something that came to fruition. With native support for 12 drives (10×3.5″ + 2×2.5″) in a compartmentalised setup while maintaining a wonderfully small footprint it meant no more behemoth cases would be required, and I could fit all of my components into a case much smaller than the other mATX+ supported cases I have on the 2014 and 2015 builds. Lovely.

I purchased the Node 804, 32GB of ECC RAM, a few additional cables and set about putting it all together. The finished product, minus some cable management, is below the revised parts list.

A new parts list
----------------

### Motherboard

Gone is the ASRock in favour of the already-owned ASUS [M5A78L-M/USB3](https://www.asus.com/uk/Motherboards/M5A78LMUSB3/). It’s currently trending for a little over [£60 on Amazon](https://www.amazon.co.uk/gp/product/B0054U7HIO?ie=UTF8&camp=1634&creativeASIN=B0054U7HIO&linkCode=xm2&tag=bayton-21) though fluctuates often, I recall purchasing it for around £48 a few years ago during a sale.

The ASUS has 6 SATA ports, 2 PCIe slots (16x &amp; 1x) as well as a couple of legacy PCI slots. It also has support for 32GB ECC RAM.

### CPU

Due to opting for the ASUS board, the Hex-Core FX-6300 has moved over with it. This is a chip with a 125w TDP and as such any chance of saving a bit of cash on a low-power CPU is out of the window. The power in this chip does however offer one extra benefit – resource to manage KVM guests. I appreciate KVM isn’t LXD, but needs must and I had some pre-made VMs needing support (primarily for my [EMM](/category/enterprise) projects)

Passive cooling is also a lost cause on a 125w TDP, so the [Arctic Cooling Freezer 13](https://www.amazon.co.uk/gp/product/B0048F64DU?ie=UTF8&camp=1634&creativeASIN=B0048F64DU&linkCode=xm2&tag=bayton-21) CPU cooler moved over with the board. I have plenty of space in the case due to the dual compartment layout so may swap this for an all-in-one water cooling unit in the future.

The FX-6300 is trending at a little over [£80 on Amazon](https://www.amazon.co.uk/gp/product/B009O7YORK/ref=as_li_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=B009O7YORK&linkCode=as2&tag=bayton-21) and the Arctic Cooling Freezer 13 at [£24 on Amazon](https://www.amazon.co.uk/gp/product/B0048F64DU?ie=UTF8&camp=1634&creativeASIN=B0048F64DU&linkCode=xm2&tag=bayton-21)

### RAM

> Ideally I should’ve opted for ECC memory however the board doesn’t support it. At a later date I’ll move the Ballistix into my desktop, swap the board with something a little more up-market and get as much ECC memory in as I can

Remember this from [part 1](/2016/06/part-1-project-obsidian-objectives-and-parts-list/)? In hindsight waiting a couple of months before starting the build after eventually selling off some components to fund the improved specs would have been the best course of action. Alas, I’m impatient.

Obsidian now has 32GB (4x8GB) of ECC unbuffered through two Crucial CT2KIT102472BA186D 16GB kits, currently trending for a little over [£100 (per kit) on Amazon](https://www.amazon.co.uk/gp/product/B00JJIEI2A?ie=UTF8&camp=1634&creativeASIN=B00JJIEI2A&linkCode=xm2&tag=bayton-21).

### SATA expansion

I now have a Dell H200 dual-controller 8-channel SAS card flashed to IT mode and a couple of mini-SAS to SATA breakout cables. In IT mode the card acts as a basic JBOD controller, presenting all disks to the host system with no interference whatsoever, unlike traditional RAID cards which often require configuration on the card independent of the OS. As I’m using ZFS – a softraid solution – I have no need for hardware RAID configuration.

This card cost me around £50 on ebay second hand.

### Case

As the HAF Stacker 915 can no longer be used with the much larger mATX motherboard, I purchased the compact-yet-spacious Fractal Node 804. With support for all of my disks, multiple cooling options and a compartmentalised layout it fit the bill perfectly.

Separating the system from the disks means a case that’s twice the width of conventional mid-tower cases, though much shorter as a result, giving me what I feel is a less obtrusive system sitting on top of the cabinets in the office.

The Fractal Node 804 is available from [Amazon for around £99](https://www.amazon.co.uk/gp/product/B00JBBH93K?ie=UTF8&camp=1634&creativeASIN=B00JBBH93K&linkCode=xm2&tag=bayton-21).

The finished product
--------------------

 <style type="text/css">
			#gallery-7 {
				margin: auto;
			}
			#gallery-7 .gallery-item {
				float: left;
				margin-top: 10px;
				text-align: center;
				width: 25%;
			}
			#gallery-7 img {
				border: 2px solid #cfcfcf;
			}
			#gallery-7 .gallery-caption {
				margin-left: 0;
			}
			/* see gallery_shortcode() in wp-includes/media.php */
		</style>

<div class="gallery galleryid-0 gallery-columns-4 gallery-size-thumbnail" id="gallery-7"><dl class="gallery-item"> <dt class="gallery-icon landscape"> 

[![](https://r2_worker.bayton.workers.dev/uploads/2017/01/WP_20170115_14_59_15_Rich.jpg)](/https://r2_worker.bayton.workers.dev/uploads/2017/01/WP_20170115_14_59_15_Rich.jpg) </dt></dl><dl class="gallery-item"> <dt class="gallery-icon landscape"> [![](https://r2_worker.bayton.workers.dev/uploads/2017/01/WP_20170115_15_02_32_Rich.jpg)](/https://r2_worker.bayton.workers.dev/uploads/2017/01/WP_20170115_15_02_32_Rich.jpg) </dt></dl><dl class="gallery-item"> <dt class="gallery-icon portrait"> [![](https://r2_worker.bayton.workers.dev/uploads/2017/01/WP_20170115_15_00_29_Rich-e1484493465508.jpg)](/https://r2_worker.bayton.workers.dev/uploads/2017/01/WP_20170115_15_00_29_Rich-e1484493465508.jpg) </dt></dl><dl class="gallery-item"> <dt class="gallery-icon landscape"> [![](https://r2_worker.bayton.workers.dev/uploads/2017/01/WP_20170115_15_00_16_Rich-e1484493536396.jpg)](/https://r2_worker.bayton.workers.dev/uploads/2017/01/WP_20170115_15_00_16_Rich-e1484493536396.jpg) </dt></dl>  
<dl class="gallery-item"> <dt class="gallery-icon landscape"> 

[![](https://r2_worker.bayton.workers.dev/uploads/2017/01/WP_20170115_15_00_42_Rich.jpg)](/https://r2_worker.bayton.workers.dev/uploads/2017/01/WP_20170115_15_00_42_Rich-e1485260516602.jpg) </dt></dl><dl class="gallery-item"> <dt class="gallery-icon landscape"> [![](https://r2_worker.bayton.workers.dev/uploads/2017/01/WP_20170115_15_03_07_Rich.jpg)](/https://r2_worker.bayton.workers.dev/uploads/2017/01/WP_20170115_15_03_07_Rich.jpg) </dt></dl><dl class="gallery-item"> <dt class="gallery-icon portrait"> [![](https://r2_worker.bayton.workers.dev/uploads/2017/01/WP_20170115_15_02_38_Rich-e1484493487609.jpg)](/https://r2_worker.bayton.workers.dev/uploads/2017/01/WP_20170115_15_02_38_Rich-e1484493487609.jpg) </dt></dl><dl class="gallery-item"> <dt class="gallery-icon landscape"> [![](https://r2_worker.bayton.workers.dev/uploads/2017/01/WP_20170115_15_05_35_Rich.jpg)](/https://r2_worker.bayton.workers.dev/uploads/2017/01/WP_20170115_15_05_35_Rich.jpg) </dt></dl>  
<dl class="gallery-item"> <dt class="gallery-icon landscape"> 

[![](https://r2_worker.bayton.workers.dev/uploads/2017/01/WP_20170115_15_05_42_Rich.jpg)](/https://r2_worker.bayton.workers.dev/uploads/2017/01/WP_20170115_15_05_42_Rich.jpg) </dt></dl>   
</div>
 
Now with the build finally out of the way, the next posts in the series will concentrate on software and configuration!

Sponsors
--------

There are no sponsors just yet.

Interested in helping out? Sponsors get a mention in every post and frequent shout-outs on social media. For this build I’m currently looking for high capacity drives (6-8TB) and cooling options aimed towards near silence. Feel like you can contribute in another way? Let me know! I’ve also got a donate button below the post if you’ve enjoyed this series so far.

Get in touch
------------

As always I’m [@jasonbayton](https://twitter.com/jasonbayton) on Twitter, [+JasonBayton](https://twitter.com/jasonbayton) on Google+, [/in/jasonbayton](https://linkedin.com/in/jasonbayton) on Linkedin and I’m available via [email](mailto:jason@bayton.org).

Free free to get in touch to discuss this or any other topics you have in mind!