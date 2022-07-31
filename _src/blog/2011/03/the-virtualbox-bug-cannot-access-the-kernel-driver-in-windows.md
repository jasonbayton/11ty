---
title: 'The Virtualbox bug: "Cannot access the kernel driver" in Windows'
date: '2011-03-06T23:00:51+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 828
tag:
    - kernel
    - 'kernel error'
    - update
    - upgrade
    - virtualbox
    - 'virtualbox error'
    - 'virtualbox windows'
post_format: []
tmac_last_id:
    - '205557663193513984'
geo_public:
    - '1'
geo_enabled:
    - '1'
geo_address:
    - 'Oxford, England, United Kingdom'
geo_latitude:
    - '51.7525309'
geo_longitude:
    - '-1.255938799999967'
post_views_count:
    - '21416'
tags:
    - Guides
---
**Update:** An alternate solution was provided in the comments:

> Go to: *C:\\Program Files\\Oracle\\VirtualBox\\drivers\\USB\\filter*  
> Select **VBoxUSBMon.inf** and click the right mouse button. Then pick Install.  
> Go to: *C:\\Program Files\\Oracle\\VirtualBox\\drivers\\vboxdrv*  
> Select **VBoxDrv.inf** and click the right mouse button. Then pick install.  
> VirtualBox should now work again as expected.
> 
> *Source: [https://forums.virtualbox.org/viewtopic.php?f=6&amp;t=46845](https://forums.virtualbox.org/viewtopic.php?f=6&t=46845)*

**It doesn’t appear to work for everyone,** so if that didn’t work for you please read on for the original post:

It’s annoying, isn’t it? You finally succumb to Virtualbox’s daily notification telling you to update Virtualbox, but as soon as you’re done that darned error pops up when you attempt to launch your VM:

**“Cannot access the kernel driver! Make sure the kernel module has been loaded successfully.”**

Wait, what?! Kernel?! Isn’t that a Linux thing!? Putting the initial confusion aside, this is by no means a new bug with Virtualbox in Windows. Unfortunately, this has been happening for a long time and still hasn’t been rectified. Fortunately however, it’s easily fixed and should only take you a few more minutes than the upgrade itself.

1\) Backup your Virtualbox VDI’s  
2\) Uninstall Virtualbox  
3\) Remove any remnants of the install, depending on your version you should check both of these locations:

- “C:\\Program Files\\Sun\\Virtualbox” – or a directory similar to that under “Sun”.
- “C:\\Documents and Settings\\{account username}\\.VirtualBox\\Machines

4\) Reinstall Virtualbox and create a new VirtualMachine.  
5\) When prompted, choose your existing VDI and voila, you should be up and running again!

One of these days, Oracle may fix the bug! Until then if you have the choice, removing and installing a newer version of Virtualbox is undoubtedly much faster than attempting to let Virtualbox update itself.

Happy virtualising one and all!