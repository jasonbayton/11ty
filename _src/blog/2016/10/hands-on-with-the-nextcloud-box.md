---
title: 'Hands on with the Nextcloud Box'
date: '2016-10-10T13:25:43+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 3333
tag:
    - box
    - nc
    - nextcloud
    - owncloud
    - pi
    - pidrive
    - raspberry
    - snappy
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/hands-on-with-the-nextcloud-box/99'
tags:
    - Reviews
---
If you’ve been here before you’ll have no doubt seen any one of several mentions I’ve made of Nextcloud; it’s a fantastic self-hosted platform and my go-to when recommending a do-it-yourself alternative to the mainstream DropBox type platforms. Here’s a refresher if you need it:

<div class="callout callout-default">

#### What is Nextcloud?

Nextcloud is a fork of ownCloud that’s quickly becoming the newer, better and faster-developed alternative to the self-hosted cloud storage software of old. It has every feature OwnCloud has to offer and more; if you’re an ownCloud user and have ever been frustrated by the dual licenses, the paid vs free model and – as part of it – lack of some of the better features, Nextcloud have gone completely FOSS (Free and Open-Source Software) following the Red Hat model of charging for enterprise support rather than enterprise features.

Some of the previously enterprise-only features released as part of the standard FOSS Nextcloud installation include FileDrop, an alternative to Dropbox’s “File Requests”, two-factor authentication and LibreOffice online, an alternative to Google Docs or Office Online.

</div>

In addition to recently announcing version 10, Nextcloud have worked with Canonical and WDLabs to bring to market the [Nextcloud Box](https://nextcloud.com/box), a small (not quite [fitlet-RM](/2016/07/hands-on-fitlet-rm-a-fanless-industrial-mini-pc-by-compulab/) small but still), Raspberry Pi-powered, Snappy Ubuntu Core server with a 1TB WD PiDrive retailing currently for £60. I asked Nextcloud if I could get a review unit and a fortnight later it arrived at my door complete with a Raspberry Pi (not included on retail units).

[![img_20161004_110556](https://cdn.bayton.org/uploads/2016/10/IMG_20161004_110556.jpg)](/https://cdn.bayton.org/uploads/2016/10/IMG_20161004_110556.jpg)

Unpacked it looks a little something like this:

[![wp_20161006_14_51_50_pro](https://cdn.bayton.org/uploads/2016/10/WP_20161006_14_51_50_Pro.jpg)](/https://cdn.bayton.org/uploads/2016/10/WP_20161006_14_51_50_Pro.jpg)

As pictured, the package comes with:

- Nextcloud Box enclosure
- MicroSD card
- 1TB PiDrive (pre-installed)
- A HDD/microUSB/USB3 splitter cable to connect and power both the HDD and the Pi
- A microUSB cable and 3A plug
- Screws &amp; screwdriver

Again, the Pi is not included in retail units so will have to be supplied. Currently the Nextcloud Box supports the Raspberry Pi 2 Model B, but this will be expanded with software updates in the future to work with additional boards.

Build
-----

![build](https://cdn.bayton.org/uploads/2016/10/build.gif)

As the Nextcloud Box comes disassembled it will naturally need to be put together.

This is as simple as screwing the Pi into the enclosure with the 4 supplied screws and cabling it up as shown above. Nextcloud provide a handy image to demonstrate how the cables should be routed (click for PDF):

[![guide](https://cdn.bayton.org/uploads/2016/10/guide.png)](/https://cdn.bayton.org/uploads/2016/10/Box-Assembly-Guide.pdf)

To me the cable routing felt a little tight, I wasn’t too excited by how sharply-angled the USB cable coming out of the Pi had to be for this setup, but it works regardless. The ethernet cable (not pictured in the instructions) can easily follow the route of the power cable as the cutout is certainly large enough for both:

[![](https://cdn.bayton.org/uploads/2016/10/WP_20161006_15_16_34_Pro.jpg)](/https://cdn.bayton.org/uploads/2016/10/WP_20161006_15_16_34_Pro.jpg)

Once assembled, the lid secures with a few powerful magnets making it wonderfully easy to gain access if required without the need for tools.

Setup
-----

After powering it up there’s a bit of a wait while a built-in script takes care of pre-setup of the Nextcloud environment (8-10 minutes is stated, though mine didn’t take that long) and eventually navigating to <https://ubuntu-standard.local> – or <https://ubuntu-standard.yourdomain> if you don’t use `local` internally like me – should present the Nextcloud interface requesting the creation of a new administrator:

[![1-add-admin](https://cdn.bayton.org/uploads/2016/10/1-add-admin.jpg)](/https://cdn.bayton.org/uploads/2016/10/1-add-admin.jpg)

Once credentials are created, we’re in:

[![1-in](https://cdn.bayton.org/uploads/2016/10/1-in.jpg)](/https://cdn.bayton.org/uploads/2016/10/1-in.jpg)

Yes, that’s really all it takes. It’s worth noting this is still Nextcloud 9. An update to 10 is currently in the works as of publishing.

<div class="callout callout-info"> 

#### HTTPS support

You may notice the links above are plain old HTTP. HTTPS is not enabled by default due to firewall requirements.

Let’s Encrypt is included with the Nextcloud Box as standard and once port forwarding is in place it’s really easy to enable HTTPS. Once set up, Let’s Encrypt will automatically renew its certificates, requiring no further input to remain secure.

The steps for enabling HTTPS can be found [here](https://github.com/nextcloud/nextcloud-snap/wiki/Enabling-HTTPS-(SSLS,-TLS)).

</div>

### Snappy Snaps

Being a Snappy Ubuntu Core, there are a slew of other apps that can be installed, including some recommended by Nextcloud such as Snapweb.

Snapweb is a graphical interface for searching and installing various snaps through the Snap store. It’s much easier for those unfamiliar or uncomfortable with the command line:

[![snapweb](https://cdn.bayton.org/uploads/2016/10/Snapweb.png)](/https://cdn.bayton.org/uploads/2016/10/Snapweb.png)

Unfortunately at the moment Snapweb itself requires manual installation via the command line as follows:

`sudo snap install snapweb --beta`

However following this the interface will be available either via the internal IP or hostname on port 4200, eg: <https://ubuntu-standard.local:4200>. The Nexcloud Box wiki explains how this can be setup as an external site from within Nextcloud itself [here](https://github.com/nextcloud/nextcloud-snap/wiki/How-to-manage-your-snaps). Snapweb will be installed by default in this way in the future.

<div class="callout callout-danger"> 

#### Note

As of publishing there’s currently a bug with the newly released version of `snap-confine` which prevents newly installed snaps from running. To get around this for now, run:

```
wget https://launchpadlibrarian.net/287156245/snap-confine_1.0.42-0ubuntu3_armhf.deb
sudo dpkg -i snap-confine_1.0.42-0ubuntu3_armhf.deb
```

This installs the latest `snap-confine` version from Yakkety and only needs to be done if Snapweb (or other snaps) don’t appear to be running after installation. When installed, run:

`sudo snap run snapweb`

</div>

Other recommended Snaps include Rocket.Chat and SpreedRTC, but there are so many available it’s definitely worth exploring the Snap store to check out the various services which can be run in addition to Nextcloud on the Box.

Performance and issues
----------------------

Up to now my main Nextcloud instance has run within an LXD container atop a Ubuntu 16.04 host with 4 cores and 16GB RAM, by no means a slouch. By comparison, the Pi-powered instance is somewhat less responsive, but by no means does it perform poorly.

I uploaded around 17GB of data overnight averaging out at roughly 9MB/s – not unexpected on the Pi’s 10/100 NIC. Inside the network the 10/100 NIC is something of a bottleneck, but from outside – where you can access your files on the go – this will not be noticeable.

It didn’t crawl to a halt as I was somewhat expecting it to uploading so much data in one go, and I feel the performance is fine for a couple of users. Cracks will show with multiple users simultaneously using the Nextcloud Box for large up/download tasks though, so keep that in mind.

My only real gripes with the box as it stands today are thumbnail generation (which can be quite slow on big folders) and a lack of PrettyLink support. For the former I’ve raised it as a concern in the official [Nextcloud Box topic](https://help.nextcloud.com/t/the-great-nextcloud-box-topic/3510/63) and have been told NextCloud 11 will help alleviate this. For the latter I’ve raised a [feature request](https://github.com/nextcloud/nextcloud-snap/issues/86).

Conclusion
----------

The Nextcloud Box is a big step forward for the IoT (Internet of Things) arena and I’m really impressed with the first iteration of what I anticipate to be a very popular product. It won’t be for everyone given the minimal specs of the Pi, but for enthusiasts and hobbyists, it’s a great introduction to Nextcloud and other self-hosted solutions.

Nextcloud are all about empowering people to take back their data. With the Nextcloud Box being simple to build, simple to setup and most importantly, simple to use, they’re taking this vision to the next level.

Interested in getting one? You can purchase a Nextcloud Box by selecting your country from the dropdown on <https://nextcloud.com/box/>

*Are you a Nextcloud fan? Are you considering picking up the Nextcloud Box? Let me know in the comments, [@jasonbayton](https://twitter.com/jasonbayton) on twitter or [@bayton.org](https://facebook.com/bayton.org) on Facebook.*