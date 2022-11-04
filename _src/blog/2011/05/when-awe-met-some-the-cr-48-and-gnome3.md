---
title: 'When Awe met Some. The Cr-48 and Gnome3.'
date: '2011-05-28T18:00:04+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 880
tag:
    - chrome
    - chromeOS
    - Cr
    - Cr-48
    - Fedora
    - Hack
post_format: []
tmac_last_id:
    - '205557655752810496'
geo_enabled:
    - '1'
geo_public:
    - '1'
geo_address:
    - 'Newport, Wales, United Kingdom'
geo_latitude:
    - '51.5877406'
geo_longitude:
    - '-2.998343100000056'
post_views_count:
    - '4443'
tags:
    - Guides
    - Projects
---
![](https://cdn.bayton.org/uploads/2011/05/IMG_20110513_200355.jpg "IMG_20110513_200355")

I mentioned previously how although I really like the hardware in the Cr-48, I had been having problems living completely “in the cloud”. Even though I spend 90% of my day *in* the cloud, for that last 10% I require a full desktop experience to do with whatever I need to.

The last thing I mentioned was how hackable the Cr is, here I can show you how I installed Fedora 15 and Gnome3 without a single hiccup in under an hour.

I went about this in a bit of a round-about way. As I was experimenting with a few different solutions, I flashed the Cr BIOS and installed Fedora from within Ubuntu running on the Cr. Although this *is* round-about, I do suggest you try Ubuntu before going to Fedora as you may like one more than the other – Fedora 15 is a little bit buggy at this moment given that it’s still brand new.

So the first thing I did, as I said, was install Ubuntu. This was done using a script created by Jay Lee that basically takes the full set of instructions from the chromium site and no doubt adds a few extras. You can follow the instructions provided by Jay Lee here: <https://goo.gl/X9YG8>. Make sure you’ve set Ubuntu to boot by default.

Are you happy with Ubuntu? If so. You can stop here and enjoy your new install. If not, continue reading:

Once you’ve installed Ubuntu, we can now move on to flashing the BIOS.

Flashing the BIOS is a little involved but is required in order to rid the Cr of Google’s propriety BIOS and install the bog-standard Intel Insyde BIOS that’ll allow you to install any OS from USB. The first thing to do is crack open your Cr and disable the BIOS check. Instructions for opening the Cr can be seen here: [Open the Cr-48](https://cr-48.wikispaces.com/Open+the+Cr-48 "Open the Cr-48")

Once you’ve fixed the BIOS check (I used tape) and re-assembled your Cr, we can now look at Backing up and flashing the Insyde BIOS.

Boot back into Ubuntu.

Download the new BIOS from here: [https://cdn.bayton.org/download/cr48.bin.tar.gz](https://cdn.bayton.org/download/cr48.bin.tar.gz)

Open Terminal and Install flashrom by typing ***sudo apt-get install flashrom***

Once it’s finished and installed, you can now type ***flashrom -r backup.bin***. This will save the backup file to your home directory, so please now move it onto a USB stick or SD card.

Extract cr48.bin.tar.gz to a directory, then head over to the Terminal and type ***flashrom -w /directory/to/cr48.bin***  
Don’t forget the space between -w and / !!

The BIOS will now start flashing. If you get 2 errors, ignore them. If you get more, you may have a problem. (Note, I **cannot** help you with this!).

As soon as you have a success message you have flashed the BIOS. You can now reboot, and tap F2 (Right arrow key) to get into the BIOS settings. Set USB to boot and insert the Fedora USB installer you’ve created.

Fedora will now boot, and from the live environment you can install it to disk.

All you have to do now is decide whether you want to keep the Chrome OS partitions, or use the whole, wonderful 16GB of SSD space. As you might have guessed, I flattened the entire disk and used it all for my Fedora install.

![](https://cdn.bayton.org/uploads/2011/05/Screenshot-1.png "Screenshot-1")

Once you are up and running, make sure you update as soon as possible in order to get the most up to date system and Gnome versions. Mine was 2.9 when I installed, and went up to 3.1 when I updated.

So you see, just because it’s a laptop made for the cloud, doesn’t mean it has to be used for the cloud. It now gives me everything I need in a device, and I shall be very happy with it for the rest of it’s life.

Good luck!