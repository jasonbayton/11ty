---
title: 'Hands on: fitlet-RM, a fanless industrial mini PC by Compulab'
date: '2016-07-11T19:24:14+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 2996
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
    - 'https://discuss.bayton.org/t/hands-on-fitlet-rm-a-fanless-industrial-mini-pc-by-compulab/106'
tags:
    - Reviews
---
A few weeks ago I got in touch with Compulab in order to get my hands on one of their renowned passively cooled mini PCs. After a brief discussion around their available products, we agreed I’d review one of their to-be-released models when it became available. Earlier this week I received their [just-announced](http://www.fit-pc.com/web/about/news/fitlet-rm-announcement/) fitlet-RM-XA10-LAN, the followup to the fitlet-XA10-LAN [AnandTech reviewed](http://www.anandtech.com/show/10244/compulab-fitletxa10lan-review-a-fanless-amd-ucff-pc-for-networking-applications) some time back, along with a fit-Uptime mini UPS. All product links will be provided at the end.

Who are Compulab?
-----------------

Compulab have been around since 1992, starting out as a consultancy company before branching out to CoM/SoM (1997) and later micro PCs (2007) such as the model being reviewed in this article. They’re a market leader in their field specialising in ARM and have repeatedly pushed the boundaries of what can be offered in respect to hardware and size. Their systems can be found today in robotics, industrial applications, surveillance systems and much more.

What is the fitlet-RM?
----------------------

![20160710_211406](https://r2_worker.bayton.workers.dev/uploads/2016/07/20160710_211406-e1468183002842.jpg)

 <style type="text/css">
			#gallery-13 {
				margin: auto;
			}
			#gallery-13 .gallery-item {
				float: left;
				margin-top: 10px;
				text-align: center;
				width: 33%;
			}
			#gallery-13 img {
				border: 2px solid #cfcfcf;
			}
			#gallery-13 .gallery-caption {
				margin-left: 0;
			}
			/* see gallery_shortcode() in wp-includes/media.php */
		</style>

<div class="gallery galleryid-0 gallery-columns-3 gallery-size-full" id="gallery-13"><dl class="gallery-item"> <dt class="gallery-icon landscape"> [![](https://r2_worker.bayton.workers.dev/uploads/2016/07/20160710_205246.jpg)](/https://r2_worker.bayton.workers.dev/uploads/2016/07/20160710_205246.jpg) </dt></dl><dl class="gallery-item"> <dt class="gallery-icon landscape"> [![](https://r2_worker.bayton.workers.dev/uploads/2016/07/20160710_205238.jpg)](/https://r2_worker.bayton.workers.dev/uploads/2016/07/20160710_205238.jpg) </dt></dl>   
 </div>The fitlet-RM series is a follow-up to the previously launched fitlet-XA10-LAN/fitlet-iA10 and is aimed towards applications requiring a reliable, power-efficient, hardy system with a minuscule footprint. At 10.8 cm x 8.3 cm x 2.4 cm (0.22l) it’s barely larger than a standard SSD and can fit comfortably in a pocket, in an obscure corner of a rack, hidden in the depths of a larger appliance or fixed unassumingly behind a display.

Despite its size the fitlet-RM is *packed* with features. The RM-XA10-LAN sent to me comes with the following spec:

**CPU**: [AMD A10 Micro-6700T SoC](http://products.amd.com/en-us/search/APU/AMD-A-Series-Processors/AMD-A10-Series-APU-for-Laptops/A10-Micro-6700T-with-Radeon%E2%84%A2-R6-Graphics/18) – Quadcore 1.2GHz (2.2Ghz with boost) @ 4.5W TDP[  ](http://products.amd.com/en-us/search/APU/AMD-A-Series-Processors/AMD-A10-Series-APU-for-Laptops/A10-Micro-6700T-with-Radeon%E2%84%A2-R6-Graphics/18)**RAM**: 8GB DDR3L-1333 non-EEC  
**Graphics**: AMD Radeon R6 Graphics with dual HDMI outputs  
**Storage**: 64GB mSATA internal, support for micro-SD external  
**Network**: 4x Intel 10/100/1000 LAN ports  
**Other**: 3.5mm audio in/out, 2x USB3, 3x USB2, COM port &amp; SIM slot  
*\*RAM and disk are not included as standard*

Opting for the fitlet-RM-iA10 would see 4x LAN ports reduced to 2x LAN and the addition of a WIFI/Bluetooth module, though the fitlet-RM-XA10-LAN does come bundled with a USB WIFI *n* module. The 3x LAN ports are provided through what Compulab calls a “FACET” card. Although these are the only two available configurations currently, Compulab allows for 3rd parties to create their own FACET cards meaning in the future there may be as many FACET cards as there are [“FACE” modules](http://www.fit-pc.com/wiki/index.php/Fit-PC_Product_Line:FACE_Modules) – slightly larger cards designed for the bigger fitlet-H, fitlet-T and fit-PC models.

The system is encased in an aluminium &amp; zinc housing which acts like one large heatsink, dissipating heat effectively without the need for a fan thus retaining the ultra compact form factor. It is also strong! Compulab showcased this by running over a fitlet:

![sneak-peek-fitlet-rm-1024x344](https://r2_worker.bayton.workers.dev/uploads/2016/07/sneak-peek-fitlet-rm-1024x344.jpg)

As there are no moving parts and the casing is well sealed, it is perfect for applications where the ingress of dirt, humidity or extreme temperatures could be encountered; the fitlet can operate under a wide temperature band ranging from -40°C to 70°C with the parts inside equally capable of handling constant extremes of temperature, shock and vibration. Furthermore with the unique twist-lock power cable, there’s little worry about accidentally removing the fitlet’s power supply:

![20160711_091358](https://r2_worker.bayton.workers.dev/uploads/2016/07/20160711_091358-e1468226087716.jpg)

The fitlet-RM series starts at $311 and is currently available from [fit-PC (official)](http://www.fit-pc.com/web/purchasing/order-fitlet/).

What’s in the box
-----------------

![WP_20160706_11_08_52_Pro](https://r2_worker.bayton.workers.dev/uploads/2016/07/WP_20160706_11_08_52_Pro.jpg)

The fitlet arrived with the following components provided:

- The fitlet-RM-AX10-LAN
- Power supply – European and US blades (plugs) provided, UK available
- HDMI to DVI adapter
- Audio 3.5mm to RCA cable
- 802.11n Wifi module
- Mini-serial to DB9-male adapter cable
- mSATA heatsink

This fitlet was pre-built with 8GB RAM and a 64GB mSATA SSD and the heatsink was therefore already installed. Compulab also provided a fit-Uptime UPS.

Separately in addition to this, I purchased:

- fit-Headless 4K
- fitlet heatsink
- fitlet VESA/wall mount
- remote power button

Performance
-----------

![windows snip](https://r2_worker.bayton.workers.dev/uploads/2016/07/windows-snip.png)

Despite being a low power, 4.5w TDP chip the AMD A10 Micro-6700T is a capable CPU. In benchmarks it outpaces similar and slightly higher-clocked Intel Atoms of the same release period such as the Z3795, a chip commonly used in tablets and laptops, as seen by PassMark’s benchmarks:

[![amda10micro](https://r2_worker.bayton.workers.dev/uploads/2016/07/amda10micro.png)](https://www.passmark.com/)

I did a few benchmarks of my own on Ubuntu using sysbench running 1 and 4 threads and wasn’t disappointed:  
*sysbench can be installed on Ubuntu/Debian by running* `sudo apt install sysbench`

```
jason@fitletr:~$ sysbench --test=cpu --cpu-max-prime=20000 run
sysbench 0.4.12:  multi-threaded system evaluation benchmark

Running the test with following options:
Number of threads: 1

[..]

                                                                                             [
Test execution summary:
    total time:                          24.8739s
    total number of events:              10000
    total time taken by event execution: 24.8717
    per-request statistics:
         min:                                  2.42ms
         avg:                                  2.49ms
         max:                                  5.45ms
         approx.  95 percentile:               2.67ms

Threads fairness:
    events (avg/stddev):           10000.0000/0.00
    execution time (avg/stddev):   24.8717/0.00
```

```
jason@fitletr:~$ sysbench --test=cpu --cpu-max-prime=20000 --num-threads=4 run
sysbench 0.4.12:  multi-threaded system evaluation benchmark

Running the test with following options:
Number of threads: 4

[..]


Test execution summary:
    total time:                          8.3709s
    total number of events:              10000
    total time taken by event execution: 33.4761
    per-request statistics:
         min:                                  3.11ms
         avg:                                  3.35ms
         max:                                 23.82ms
         approx.  95 percentile:               3.34ms

Threads fairness:
    events (avg/stddev):           2500.0000/5.96
    execution time (avg/stddev):   8.3690/0.00
```

For comparison, the AMD FX-6300, a 3.5GHz chip with 6 cores and a 95w TDP, powering my home storage server gets the following from the same 1 and 4 thread test:

```
jason@ElGrande:~$ sysbench --test=cpu --cpu-max-prime=20000 run

[..]

Test execution summary:
    total time:                          15.2784s
    total number of events:              10000
    total time taken by event execution: 15.2770
    per-request statistics:
         min:                                  1.42ms
         avg:                                  1.53ms
         max:                                  3.54ms
         approx.  95 percentile:               1.56ms

Threads fairness:
    events (avg/stddev):           10000.0000/0.00
    execution time (avg/stddev):   15.2770/0.00
```

```
jason@ElGrande:~$ sysbench --test=cpu --cpu-max-prime=20000 --num-threads=4 run

[..]
Test execution summary:
    total time:                          4.1375s
    total number of events:              10000
    total time taken by event execution: 16.5428
    per-request statistics:
         min:                                  1.46ms
         avg:                                  1.65ms
         max:                                 25.91ms
         approx.  95 percentile:               1.74ms

Threads fairness:
    events (avg/stddev):           2500.0000/66.11
    execution time (avg/stddev):   4.1357/0.00
```

Generally the fitlet feels quick and extremely responsive. This is no doubt thanks in part to the mSATA SSD and 8GB RAM, however in testing both using [OPNsense](https://opnsense.org/) and [Ubuntu server](http://www.ubuntu.com/server) the fitlet responded reliably and quickly both acting as a router for the 40 or so network endpoints I have at home and later as a media server for streaming from [emby ](http://emby.media/)to my Nvidia Shield TV without a fault. Load remained minimal almost all of the time.

The only time I saw any notable struggle was when running Windows 10 from a USB3 hard drive, however this was clearly due to the bottleneck associated with running an OS from a 2.5″ HDD over USB3. Windows being the resource hog it is did push the CPU usage up more often than on either Ubuntu or FreeBSD, but nothing that would be considered untoward.

![task manager](https://r2_worker.bayton.workers.dev/uploads/2016/07/task-manager.png)

For networking applications, it goes without saying the 4 LAN ports on the fitlet-RM-XA10-LAN are fantastic. For server applications, being able to bond multiple connections has its own advantages; 4 individual GB ports all responding to one network address makes for a very fast streaming/storage server with no bottleneck on network. Naturally on a 64GB mSATA there’s not a lot of storage to be had, however it’d be just as easy to install 1TB of mSATA storage as well as multiple USB drives and even eSATA on the fitlet-RM-iA10.

Temperature control
-------------------

![20160711_120929](https://r2_worker.bayton.workers.dev/uploads/2016/07/20160711_120929.jpg)

Heat can be a concern for any passively cooled device and the fitlet is no exception. Installing Windows updates saw the fitlet steadily increase in temperature to a whopping 59.6°C before cooling back down to the low 50’s when complete. At those temperatures the fitlet is simply too hot to touch, though they are well within the operating range and therefore should be nothing to worry about.

In an industrial or enterprise environment this shouldn’t be an issue. It did have me wondering where I’d mount the device though due to the heat generated; the original plan to mount it within the case of my storage server (the VESA bracket suits 120mm fan mounting points nicely) may not be suitable, as the server will need to work harder to cool both systems.

Here’s where the fitlet heatsink comes in:

 <style type="text/css">
			#gallery-14 {
				margin: auto;
			}
			#gallery-14 .gallery-item {
				float: left;
				margin-top: 10px;
				text-align: center;
				width: 33%;
			}
			#gallery-14 img {
				border: 2px solid #cfcfcf;
			}
			#gallery-14 .gallery-caption {
				margin-left: 0;
			}
			/* see gallery_shortcode() in wp-includes/media.php */
		</style>

<div class="gallery galleryid-0 gallery-columns-3 gallery-size-full" id="gallery-14"><dl class="gallery-item"> <dt class="gallery-icon landscape"> [![](https://r2_worker.bayton.workers.dev/uploads/2016/07/20160711_132827.jpg)](/https://r2_worker.bayton.workers.dev/uploads/2016/07/20160711_132827.jpg) </dt></dl><dl class="gallery-item"> <dt class="gallery-icon landscape"> [![](https://r2_worker.bayton.workers.dev/uploads/2016/07/20160711_132837.jpg)](/https://r2_worker.bayton.workers.dev/uploads/2016/07/20160711_132837.jpg) </dt></dl>   
 </div>At the moment only the bare aluminium version is available, but regardless of colour the heatsink does the job perfectly. I noted a temperature drop of about 11°C to the low 40’s resulting in a PC that is no longer too hot to touch and therefore more manageable.

Compulab say they’re working on a black version of the heatsink, once it becomes available soon I’ll swap it out.

What is the fit-Uptime?
-----------------------

![](https://r2_worker.bayton.workers.dev/uploads/2016/07/fit-uptime.png)

The fit-Uptime is a micro-UPS designed specifically to be entirely plug and play. It uses an 18Wh lithium-polymer battery and is capable of powering the fitlet for over 3 hours at a draw of 5w.

Unlike some UPS systems, the fit-Uptime can switch back and forth between mains and battery power in an instant. The fitlet will never detect the change and will never suffer instability as a result.

As it’s such a simple device, there’s no capability for the fitlet to know when it has been switched to battery power, nor when that battery power is about to run out. Due to this the fitlet won’t be able to shut itself down safely on loss of mains power, relying either on manual intervention to shut it down, or for mains power to return before the 3 hours is up (which in fairness is a nice, long window to work with).

Compulab are considering a “pro” version in the future that will be able to directly interact with the fitlet in order to add the functionality that is currently missing here.

I have so far used fit-Uptime to move the fitlet to various parts of the house while setting different things up. It switches between battery and mains flawlessly, remains accessible over the network (via WIFI) at all times, meaning I can leave SSH connections open and it hasn’t glitched even once. I haven’t run the UPS to 0% battery yet, but the fitlet has been sat on battery power for over an hour on occasions with no problems at all. Living in a location which suffers the occasional power outage, the fit-Uptime is a highly appreciated little piece of hardware to me!

The fit-Uptime is available from [fit-PC (official)](http://www.fit-pc.com/web/purchasing/order-fit-uptime/) for $68.

Conclusion
----------

The fitlet is by far the smallest, most useful mini-PC I’ve gotten my hands on so far. I’ve used NUCs in the past and while conveniently small they’re often hampered by limitations in hardware or cost.

The dual HDMI make running a dual display setup such as my 2 Asus VS247HR 23.6″ monitors a breeze for desktop environments, while on the server side the 4 Intel LAN ports and low-power (but aptly powerful) system make for a perfect little pfsense/OPNsense (or other) system for advanced routing.

Indeed it can get warm, but such is the plight of fanless systems; particularly those with literally no internal space utilising the casing directly for heat dissipation. When tucked out of the way in an open environment this will never be an issue.

If I were to bring up one minor complaint it would be only that the power button is a little awkward to depress. It requires quite a deep push to turn on/off and would benefit greatly if it were more of a static button with a few mm of travel, similar to that of the fit-Uptime.

In combination with the fit-Uptime I envision the fitlet will ultimately – just as advertised – be one of the most resilient and reliable systems I’ll ever run. For the price I wouldn’t have expected a system as decent as this.

### Product links

fitlet heatsync: [Amazon UK](https://www.amazon.co.uk/CompuLab-ACCENC-HEATFLT-Compulab-Heatsink-fitlet/dp/B0144ST37Y//ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=bayton-21&linkId=7ae875738f2d1406b5b1576f102f1788)  
fitlet remote power button: [Amazon UK](https://www.amazon.co.uk/Compulab-Remote-power-button-fitlet/dp/B0144PKH2M//ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=bayton-21&linkId=7a64ab4d3cf3868d4a6e94b6150f8795)  
fitlet VESA/wall mount: [Amazon UK](https://www.amazon.co.uk/Compulab-VESA-mounting-bracket-fitlet/dp/B0144OL58S//ref=as_li_ss_tl?ie=UTF8&linkCode=ll1&tag=bayton-21&linkId=48213495d9ad6241c1800ad9468c3167)  
fit-Headless: [Amazon UK](https://www.amazon.co.uk/CompuLab-fit-Headless-x/dp/B00FLZXGJ6/ref=as_li_ss_tl?s=electronics&ie=UTF8&qid=1484578811&sr=1-1&keywords=fit-headless+4k&linkCode=ll1&tag=bayton-21&linkId=d27d9c99a48667268fdb6a9e447a2e67)  
fit-Uptime: [fit-PC (official)](http://www.fit-pc.com/web/purchasing/order-fit-uptime/)  
fitlet-RM-XA10-LAN barebones: [fit-PC (official) ](http://www.fit-pc.com/web/purchasing/order-fitlet/)– links to all fitlet models

—

Are you looking for a mini-PC? Are you considering the fitlet-RM? Let me know in the comments, [@jasonbayton](//twitter.com/jasonbayton) on twitter or via my brand new facebook page [@bayton.org](//facebook.com/bayton.org)!