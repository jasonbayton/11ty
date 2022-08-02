---
title: 'Springs.io - Container hosting at container prices'
date: '2016-02-29T12:54:12+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 2540
tag:
    - arachsys
    - containers
    - docker
    - elastichosts
    - LXC
    - LXD
    - springs
post_format: []
post_views_count:
    - '494'
tags:
    - Reviews
---
Elastichosts are a long-established player in the hosting arena offering a vast range of dedicated and VPS servers to individuals and businesses alike.

Last year, in line with the huge growth of container technology in recent years (Docker, LXC, LXD, OpenVZ, etc), Elastichosts launched Springs – a flexible, easy to manage and cost-effective hosting platform based entirely on Linux containers. Unlike other providers, Springs doesn’t use a pre-built container solution, instead opting for their own software built from the ground up by co-founder Chris Webb: [Arachsys Containers](https://github.com/arachsys/containers).

Back in Springs’ infancy, I was contacted over Google+ to see if I’d fancy taking a look at their brand new platform. I was offered a bit of starter-credit after creating an account and got started on the transition from my previous VPS provider OVH.

I opted to do this gradually starting with just the one server running bayton.org. I later added a few more services as my confidence in the platform increased. The containers are all run on SSD storage and have access to a 20 core Xeon processor with ~260GB RAM, at least from what I’ve seen so far. How many servers they have at this point I can’t say, but when I started using the platform they only had the one.

![Springs.io (1)](https://r2_worker.bayton.workers.dev/uploads/2016/02/Springs.io-1.png)

Days turned to weeks without any issues. As my starter credit diminished my first request was the ability to add credit via PayPal, which was implemented pretty quickly (to my surprise!).

Following that, I’ve simply been enjoying the simplicity and flexibility of the service. Even today the server my containers run on is still very much underutilised and as such I haven’t experienced any performance problems.

So, how does it work?
---------------------

On [creating a new account](https://control.springs.io/accounts/trial/) and logging in, add a bit of credit (assuming you aren’t gifted any as part of a trial). Adding credit, at least via Paypal, is quite a quick, painless process and once complete is immediately available for use.

When you’re ready, clicking “Add Spring” will open a popup requesting a server name (one will be auto-generated for you), operating system and optionally an SSH key. At the moment the only options are Debian, Ubuntu, cPanel and centOS. That may be expanded in the future, but for those of you wishing to run openSuse, fedora or any other distribution you’ll be out of luck at present.

![createnew](https://r2_worker.bayton.workers.dev/uploads/2016/02/createnew.png)

Once you’re happy with your selection (and do make sure you are as the distribution can’t be changed later) click Add Spring. It may take a moment or two to initialise and install, but once ready will show in your server list as follows:

![turnon](https://r2_worker.bayton.workers.dev/uploads/2016/02/turnon.png)

At this point, you’ll notice the container is switched off and the IP is blank. Clicking “Login” will let you know you need to turn the container on before anything else can happen.

![stilloff](https://r2_worker.bayton.workers.dev/uploads/2016/02/stilloff.png)

Cancel out of that and click on the power toggle. Once the IP populates, login details will also shortly become available. If you used an SSH key this information will be of little concern, if you do need the password however clicking “Click here to reveal it” in the Login popup will do just that.

And that’s basically all there is to it. You can now SSH into your Linux container and begin running the services you’d run on any other normal virtual or physical server.

If you wish to limit the resources the container can use, simply change the values listed next to CPU and RAM. I found 2000/1024 to be quite a bit more than I’d need on a modest little webserver and so have lowered them as can be seen in the screenshot above.

![newserver](https://r2_worker.bayton.workers.dev/uploads/2016/02/newserver.png)

In the beginning I wasn’t sure what I should set it to for my web server, so I left it. After a while the *Average usage* area begins showing how much resource the container is demanding and from that more adequate limits can be set.

In the below image I can see over the last month the CPU hasn’t spiked past 25MHz, so the limit of 500MHz both provides a *huge* buffer in case of dramatic increase of activity (one can hope, right?) and a limit to how much money I’d be prepared to spend should demand increase.

![](https://r2_worker.bayton.workers.dev/uploads/2016/02/Screenshot-from-2016-02-26-23-25-22.png)

Finally, when you’re finished with a container, clicking Delete will irreversibly destroy the container and all data within it.

Costs
-----

The pricing for Springs is based on usage, so setting the CPU to 2000, 3000, or 10,000 doesn’t mean you’ll be paying 10,000\*$0.008/hour. If the server is only using 0.32GHz and 128MB of RAM on average, that’s what you’ll pay for. This also makes it a little more difficult to estimate exactly how much you’re going to spend, but it can be figured out once the server is up and running and averages are being reported.

Springs has a [usage calculator](http://springs.io/pricing/), but for those like me who want to see figures in black and white, the pricing breaks down as follows:

CPU (core-GHz per hour): $0.008  
RAM (GB per hour): $0.011  
SSD (GB per month): $0.250  
Data transfer over 1TB (per GB): $0.050  
Static public IP address (per month): $2.000

I’ve watched the costs slowly creep up as I’ve added more servers. At the moment running 4 servers – a mix of web and DNS servers – I’m giving Springs about $20 a month, roughly £14. For comparison my OVH server cost me around £10 a month and was only used for web hosting. Similarly my t1 nano AWS instance costs me about £4 a month.

Springs is drastically cheaper than running 4 OVH servers, and a little cheaper than running nano instances on AWS. Unlike either of those platforms though, I don’t think adjusting resource caps could be any easier. Managing multiple containers from that one simple panel is a breeze and the support Springs includes is equally top-notch – quick, personal and they’re always happy to help.

On that basis I couldn’t be happier with the costs incurred so far.

What could be improved?
-----------------------

As is stands currently I’m really happy with Springs and have recommended it to friends and colleagues on many occasions. I would like to see a few things though..

**More options**

I mentioned above that Springs containers are limited to those 4 options. It would be nice to see that expanded out to more distributions. What would be potentially even better though is templates. Some hosts can deploy ready-to-run WordPress/Drupal sites, LAMP instances, ownCloud instances, etc. at the drop of a hat. If Springs could replicate this with their container hosting they’d immediately appeal to a much, much wider audience; an audience that doesn’t care about operating systems or command line interfaces and just wants a button to click and a link to navigate to. The cPanel offering addresses this to some extent, but it could be easier.

**Reliability**

I mentioned at the beginning that as far I was aware Springs was only hosting containers on the one server. This was totally fine, until it wasn’t.

![usage](https://r2_worker.bayton.workers.dev/uploads/2016/02/usage-e1456504022333.png)

> *Dear <span class="il">Springs</span> Customer,*
> 
> *Please be advised of a container host <span class="il">reboot</span> in <span class="il">Springs</span> on 09/Sep/2015 UTC 17:16 .*
> 
> *The host is now back up and all containers should now be running.*
> 
> *\[…\]*
> 
> *Best regards,*  
> *<span class="il">Springs</span>.io*

A few months back I received the above email to say the Springs server had gone down. Everything came back up promptly with minimal downtime but it did get me wondering how I could spread my servers across multiple hosts to reduce the likelihood of a total blackout in the event of a prolonged period of downtime.

At the moment it’s not possible. Downtime matters to me, which is why I’m keeping some of my services on AWS for the time being. Springs expanding to more hosts with the appropriate options within the console to manage them would negate my need to have services on other platforms.

It’s worth mentioning that so far since the middle of last year the server has only bounced once. I’ve suffered no further downtime since.

**Reboots**

At present, rebooting a container with via command line will shut it down. This caught me off guard a few times in the beginning where I waited, and waited, and waited a bit more for the container to become available over SSH again before eventually logging into the control panel to see what’s happened.

Thankfully they’ve more recently added a warning when the reboot command is given:

> *Reboot doesn’t yet work as expected inside containers.*  
> *This container will now be shut down, please start it from the Control Panel.*
> 
> *Broadcast message from jason@ubuntu*  
>  *(/dev/pts/1) at 23:10 …*
> 
> *The system is going down for reboot NOW!*

This is a limitation of the Springs containers at present and is being worked on. Hopefully it won’t be too much longer before a solution is found.

Is it worth it?
---------------

Absolutely.

This is still a relatively new service which is gaining momentum. While it’s unlikely that problems occur, it’s a possibility and regular backups should be taken (which is the case with any host).

Springs offer a really nice, easy to use interface. Their support team are friendly, prompt and knowledgeable and as well as benefiting from reasonable pricing, you get to use the same infrastructure that powers Springs’ parent company, Elastichosts.

I only wish they’d open source that control panel so I could use it for my containers at home!

Do you use Springs? Are you considering it? Let me know in the comments or tweet me [@jasonbayton](https://twitter.com/jasonbayton) with the tag #SpringsIO