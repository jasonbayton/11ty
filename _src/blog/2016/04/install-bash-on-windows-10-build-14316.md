---
title: 'Install Bash on Windows 10 (build 14316+)'
date: '2016-04-12T23:44:28+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 2667
tag:
    - bash
    - linux
    - ubuntu
    - ubuntuonwindows
    - windows10
post_format: []
post_views_count:
    - '1030'
tags:
    - Guides
---
After many, many years of wishing there were more Linux utilities within Windows (native SSH anyone?), Microsoft have finally developed what they call their “Windows subsystem for Linux” – what many are referring to as the equivalent of Wine for Linux.

Utilising this subsystem, Microsoft have worked with Canonical to provide a bare-bones Ubuntu environment accessible through Bash. They call it “Bash on Ubuntu on Windows” and it absolutely rolls off the tongue.

Although tools like Cygwin have been around far longer than I’ve worked in IT, they don’t offer the integration Bash on Ubuntu on Windows (henceforth referred to as Bash) aims to provide; one of those primary integrations being the capability for direct access to and manipulation of files and folders on the Windows partition.

Similarly, as this basic Ubuntu image is installed into a directory as any other program would be, it’s just as easy to manipulate files and folders within the directories there, too.

I re-enrolled onto the Insider Preview fast ring to check it out and after enabling developer mode, took a rough-and-ready video of my desktop as I enabled Bash. Unfortunately that didn’t turn out too well, so today I decided to do the installation again on a fresh VMware image, then edited it up nicely and popped a voice-over on top:

https://www.youtube.com/embed/dCdnW6nM5zg

NB: The error which showed up towards the end meant there was no Start entry for Bash (it’s a preview, so I guess these things happen) but running Bash from the command line will launch it in the same way regardless.

Should you not be able (or wish) to view the video, the steps to enable Bash are documented below.

Enable the new Bash on Ubuntu on Windows
----------------------------------------

1 – Right click on the Start icon and select **Programs and Features**.

**![Screenshot (1)](https://r2_worker.bayton.workers.dev/uploads/2016/04/Screenshot-1.png)**

2 – Click **Turn Windows features on or off**.

![Screenshot (2)](https://r2_worker.bayton.workers.dev/uploads/2016/04/Screenshot-2.png)

3 – Scroll down to the new **Windows subsystem for Linux** and tick it, click OK.

![Screenshot (3)](https://r2_worker.bayton.workers.dev/uploads/2016/04/Screenshot-3.png)

4 – Wait for it to apply and reboot when prompted.

![Screenshot (5)](https://r2_worker.bayton.workers.dev/uploads/2016/04/Screenshot-5.png)

5 – Once the reboot is complete, login and open the command prompt. Type **bash** and hit Enter.

![Screenshot (7)](https://r2_worker.bayton.workers.dev/uploads/2016/04/Screenshot-7.png)

6 – Type **y** to confirm you’re happy to proceed.

![bash-y](https://r2_worker.bayton.workers.dev/uploads/2016/04/bash-y.png)

*.. wait ages ..*

7 – When complete it’ll pop you straight into bash.

![Screenshot (6)](https://r2_worker.bayton.workers.dev/uploads/2016/04/Screenshot-6.png)

That’s all there is to it!

Following this, you can access bash either by typing “bash” in the command prompt, or opening the new “Bash on Ubuntu on Windows” app in your apps list (providing the installation doesn’t error like mine did!).

—

Are you excited for Bash on Windows 10? Have you already enabled it?  
Did you enjoy the video? Would you like to see more in the future?

Leave me a comment or tweet me [@jasonbayton](//twitter.com/jasonbayton) with your thoughts.

*Noticed an error above? Let me know in the comments, tweet or [email me](mailto:jason@bayton.org).*