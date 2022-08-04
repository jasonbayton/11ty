---
title: 'The "Wn-R48" (Windows on the Cr-48)'
date: '2011-07-20T01:43:00+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 971
tag:
    - chrome
    - chromebook
    - chromeOS
    - Cr-48
    - googlebook
    - windows
    - 'windows cr-48'
post_format: []
geo_latitude:
    - '51.7522792'
geo_longitude:
    - '-1.255883799999992'
geo_address:
    - 'Oxford, England, United Kingdom'
geo_enabled:
    - '1'
geo_public:
    - '1'
tmac_last_id:
    - '205557641165012992'
post_views_count:
    - '6954'
discourse_permalink:
    - 'https://discuss.bayton.org/t/the-wn-r48-windows-on-the-cr-48/338'
publish_post_category:
    - '14'
tags:
    - Guides
    - Projects
---
If you can get past the awful pun in the title, you may actually find this useful!

Out of the 4 operating systems I’ve now tested, Windows is by far the best and most stable on the Cr-48. It works almost fully after a bit of tweaking (the WWAN mobile broadband card requires some hacking before it’ll work) and took no longer than 30 mins to set up.

![](https://lh4.googleusercontent.com/-aZBdBscGaFo/TiX9YQIVfdI/AAAAAAAADqI/Mf6owOOtazY/s288/11%252520-%2525201.jpg "Win-R48")

What you’ll need:

A small Philips head screwdriver  
An external DVD drive  
An SD card/USB stick  
The [Insyde BIOS firmware](https://r2_worker.bayton.workers.dev/download/cr48.bin.tar.gz "Insyde BIOS firmware")  
[Synaptics driver  ](https://r2_worker.bayton.workers.dev/download/sp47815_touchpad.exe "Synaptics Driver")Tape

If you haven’t already, you’ll need to hack the Cr48 to allow you to install the Insyde BIOS firmware before you can install anything other than Chrome OS. Here are the instructions for that:

The first thing I did was install Ubuntu as it’s a really easy method to get you started with the entire process. This was done using a script created by Jay Lee that basically takes the full set of instructions from the chromium site and no doubt adds a few extras. You can follow the instructions provided by Jay Lee here: <http://goo.gl/X9YG8>. Make sure you’ve set Ubuntu to boot by default.

Once you’ve installed Ubuntu, we can now move on to flashing the BIOS.

Flashing the BIOS is a little involved but is required in order to rid the Cr of Google’s propriety BIOS and install the bog-standard Intel Insyde BIOS that’ll allow you to install any OS from USB/CD. The first thing to do is crack open your Cr and disable the BIOS check. Instructions for opening the Cr can be seen here: [Open your Cr-48](http://cr-48.wikispaces.com/Open+the+Cr-48 "Open your Cr-48")

Once you’ve fixed the BIOS check (I used tape) and re-assembled your Cr, we can now look at Backing up and flashing the Insyde BIOS.

Boot back into Ubuntu.

Download the new BIOS from here: [www.bayton.orghttps://r2_worker.bayton.workers.dev/download/cr48.bin.tar.gz](https://r2_worker.bayton.workers.dev/download/cr48.bin.tar.gz)

Open Terminal and Install flashrom by typing ***sudo apt-get install flashrom***

Once it’s finished and installed, you can now type ***flashrom -r backup.bin***. This will save the backup file to your home directory, so please now move it onto a USB stick or SD card.

Extract cr48.bin.tar.gz to a directory, then head over to the Terminal and type ***flashrom -w /directory/to/cr48.bin***  
Don’t forget the space between -w and / !!

The BIOS will now start flashing. If you get 2 errors, ignore them. If you get more, you may have a problem. (Note, I **cannot** help you with this!).

As soon as you have a success message you have flashed the BIOS. You can now reboot, plug in an external DVD drive and tap F10 (Right arrow key) to get into the BIOS settings. Set CD to boot and go for it!

Install Windows as you would on any computer and let it do what it needs to. After a while you’ll find yourself on that ever-familiar Windows desktop undoubtedly wondering why it’s 800×600. Whoops! Not to worry though! There are two ways about this:

A) Connect to Wifi and start updating, in one of the optional updates, the most up-to-date VGA driver will be there waiting to be installed.

B) If you’re not interested in waiting, you can click Start &gt; Control Panel &gt; Appearance and Personalization &gt; Display &gt; Adjust Screen Resolution (left-hand link). Click “Advanced settings” then “Properties”, select the “Driver” tab and finally, click “Update Driver”.

[![](https://r2_worker.bayton.workers.dev/uploads/2011/07/VGA-driver.png "VGA driver")](https://r2_worker.bayton.workers.dev/uploads/2011/07/VGA-driver.png)

If you’re connected to the net, it will find it. After this you’ll need to reboot.

The tech-savvy amongst you may ask “Why go through that when one can click Start &gt; Right Click on Computer and click “Manage” to get the device manager?” – Well, you see, you don’t yet have right click. You could also bring device manager up through the run prompt, but I like the way I’ve explained, anyway.. No right click – which brings us on to the next hurdle..

If you haven’t already from the link above, please download the modified Synaptics driver [here](https://r2_worker.bayton.workers.dev/download/sp47815_touchpad.exe "here"). Install this and reboot if required. Once completed (including a reboot, if necessary) head over to Control Panel &gt; Hardware and Sound and click the Mouse link in the submenu. You’ll see a Synaptics tab – here you can enable right click, scrolling and 3 finger application launch.

**A word to the wise**, two finger tap for right click doesn’t appear to be an option. You can do it one (or both) of two ways..  
1\) Enable touch zones on the trackpad and assign a zone to right click  
2\) Use tap for left click and physical click of the trackpad for right click – This is what I went with, and I like it.

Also, the search key is now the windows key, how awesome is that?

During this process, you should get quite a few updates.. do let them install if you can, it will immediately help bring your system (and all drivers) as up to date as possible. Reboot when required.

Another thing you may notice is the lack of Aero when you first install.

[![](https://r2_worker.bayton.workers.dev/uploads/2011/07/Capture-300x187.png "Capture")](https://r2_worker.bayton.workers.dev/uploads/2011/07/Capture.png)

(Click to enlarge)

Once you’re run your Windows Experience Index, you’ll get a score of around 2.3 – enough to get you on Aero as below:

[![](https://r2_worker.bayton.workers.dev/uploads/2011/07/Capture3-300x187.png "Capture3")](https://r2_worker.bayton.workers.dev/uploads/2011/07/Capture3.png)

(Click to enlarge)

And that, everyone, is a successful Windows 7 installation onto a Cr-48, also now known as “Wn-R48” because it’s so completely awesome. There are some aspects I’m working on, such as enabling the mobile internet card. As I use my streak for Wifi tethering, I’ve not yet looked into the card in all honesty. There are threads about this on [ChromeOS lounge](http://www.chromeoslounge.com/cr-48-chrome-notebook/807-cr48-gobi2000-use-other-oses.html "ChromeOS lounge") so I will be getting to it at some point.

Additionally, if you currently open “Computer” you’ll notice you have under 4GB of storage remaining. I strongly recommend using a large(ish) SD card for storage where possible. I’ve even moved my User Data folder for Chrome to the SD \[broken\] as it takes up so much space.

At the moment, I have Skype, Chrome, FileZilla and Avast! installed with 3.6GB still available. Updates are now “notify, but do not download” so I can choose which to install as required in order to maintain as little C:\\ storage as possible.

And finally, the battery has lasted around 6 hours on one charge, topping the 4 hours I got from Fedora but naturally not as good as the 8 hours from ChromeOS.

[![](https://r2_worker.bayton.workers.dev/uploads/2011/07/googleplus-icon-150x150.png "googleplus-icon")](https://plus.google.com/105616249858609350212)

Have you already done this or are looking to do this to your Cr-48 or ChromeBook?

Let me know in the comments or on [Google+](https://plus.google.com/105616249858609350212)