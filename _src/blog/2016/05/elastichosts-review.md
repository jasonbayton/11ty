---
title: 'ElasticHosts review'
date: '2016-05-09T16:17:43+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 2745
tag:
    - cloud
    - containers
    - elastichosts
    - hosting
    - springs
    - vps
post_format: []
post_views_count:
    - '1157'
tags:
    - Reviews
---
ElasticHosts are one of the earliest cloud computing providers to launch in Europe, doing so all the way back in 2008, and since then have become a cornerstone of today’s providers of VPS and container solutions.

They were the first to provide SSD storage, first to provide containers through their arachsys container platform and one of the first to utilise KVM as their underlying VPS technology. It wasn’t until last year, however, that they really caught my attention.

You may have seen a [review I wrote](/2016/02/springs-io-review-16/) on [Springs.io](//Springs.io) back in February after testing out the platform for a good many months. Springs is an ElasticHosts subsidiary which runs the same technology stack that powers ElasticHosts datacentres all over the world.

Following that review, ElasticHosts invited me to put them to the test again, this time going as far as to move my more-important services away from AWS and on to their infrastructure – something I wasn’t willing to do entirely with Springs due to a lack of redundancy on what is a relatively new service.

So I did! Here are my thoughts on the experience so far..

<div class="callout callout-success">

#### In a rush?

[Skip to the conclusion](#competition) for a chance to take part in a little surprise I’ve lined up!

</div>

Choosing a location
-------------------

![Screenshot from 2016-05-06 23-20-46](https://cdn.bayton.org/uploads/2016/05/Screenshot-from-2016-05-06-23-20-46.png)

Unlike the likes of AWS, OVH and others, when you sign up for an account with ElasticHosts you do so to one particular region. Should you create an account in the London Maidenhead region and later decide you want to put a few servers in Miami, you’ll need to create a new account on the Miami region.

Speaking to ElasticHosts I discovered this is by design. While having one account with access to all regions would be convenient, it also introduces a point of failure in requiring a centralised SSO (single sign on) service. Keeping the account management decentralised is intended to improve redundancy in the event of a failure.

Typically all regions offer the same services, though some regions cost a little more or less than others depending on demand and location. London, for example, is a little more on the expensive side which I assume correlates directly with the cost of running a datacentre in the region. The exception to the services offered is the newly launched [Cloud Storage](/2016/04/elastichosts-cloud-storage-vs-folders/), which is only available in Maidenhead and Dallas for the time being, though I understand this will change in the future also.

Once a region is selected, signing up for a free, 5-day trial account takes only a couple of minutes before you’re ready to get started. I was surprised to see ElasticHosts generates a password and sends it in two halves; one as an email and the other as a text. I’ve not seen this practice used by other providers and appreciate the security-concious approach.

 <style type="text/css">
			#gallery-15 {
				margin: auto;
			}
			#gallery-15 .gallery-item {
				float: left;
				margin-top: 10px;
				text-align: center;
				width: 33%;
			}
			#gallery-15 img {
				border: 2px solid #cfcfcf;
			}
			#gallery-15 .gallery-caption {
				margin-left: 0;
			}
			/* see gallery_shortcode() in wp-includes/media.php */
		</style>

<div class="gallery galleryid-0 gallery-columns-3 gallery-size-medium" id="gallery-15"><dl class="gallery-item"> <dt class="gallery-icon landscape"> 

[![](https://cdn.bayton.org/uploads/2016/05/dal-a-ElasticHosts.png)](/2016/05/elastichosts-review/dal-a-elastichosts/) </dt></dl><dl class="gallery-item"> <dt class="gallery-icon landscape"> [![](https://cdn.bayton.org/uploads/2016/05/Screenshot_2016-05-07-12-24-23-e1462623164860.png)](/2016/05/elastichosts-review/screenshot_2016-05-07-12-24-23/) </dt></dl><dl class="gallery-item"> <dt class="gallery-icon landscape"> [![](https://cdn.bayton.org/uploads/2016/05/dal-a-ElasticHosts-1.png)](/2016/05/elastichosts-review/dal-a-elastichosts-1/) </dt></dl>  
 </div>

The interface
-------------

The interface is simple and clutter-free. Until a server is created there’s really nothing on there bar a message reminding you of the remaining time left on your trial. This disappears once the trial finishes or as soon as either a plan is selected or credit is added.

![dal-a ElasticHosts (3)](https://cdn.bayton.org/uploads/2016/05/dal-a-ElasticHosts-3.png)

Beyond that though there’s not a lot to explore until you’ve had a few servers up and running for a while, at which point the Activity and Statistics tabs begin to show some meaningful data. I like the fact there’s a region identifier on the top right of the screen, and hovering over this allows for quick switching back and forth between them.

After adding a few servers, vLANs and static IPs the interface starts to look a little more interesting:

![](https://cdn.bayton.org/uploads/2016/05/ams-e-Elastichosts.png)

As with Springs, it’s an interface that focuses on the servers you’re running rather than everything around them, and that’s a design philosophy I very much like. I also like how servers are grouped within their assigned vLANs if that functionality is enabled (as can be seen in the screenshot above).

Server management
-----------------

In-keeping with the simplicity of the interface, managing servers is a piece of cake.

### Creating a server

Clicking the **Add** button pops up a number of options to choose from. Within this menu you can not only create servers, but additional drives/folders to mount to existing servers, vLANs and static IPs.

![Screenshot from 2016-05-07 18-29-36](https://cdn.bayton.org/uploads/2016/05/Screenshot-from-2016-05-07-18-29-36.png)

Selecting either a Virtual Machine or a Linux Container server will bring up a new window, though the options at this point are pretty much the same; just provide a name, CPU and RAM thresholds, and either an image to provision from, an already-provisioned disk/folder to attach or – in the case of a VM – a live CD to boot from. VMs also benefit from disk thresholds.

![](https://cdn.bayton.org/uploads/2016/05/Screenshot-from-2016-05-07-20-28-58-1.png)

The server will then provision. Once complete, powering on the server and clicking on the  icon will provide login credentials.

![Screenshot from 2016-05-07 20-55-29](https://cdn.bayton.org/uploads/2016/05/Screenshot-from-2016-05-07-20-55-29-e1462650975502.png)

### Managing servers

As easy as it is to spin up a server, managing them is no more difficult. Looking at the control panel the ability to power servers up and down, adjust resource limits and to obtain connection information is available at the click of the mouse. Clicking on the  icon however goes one step further, revealing every possible configuration option for servers as follows (click to enlarge):

[![](https://cdn.bayton.org/uploads/2016/05/ams-e-Elastichosts-3-1.png)](https://cdn.bayton.org/uploads/2016/05/ams-e-Elastichosts-3-1.png)

Both containers and VMs share a majority of options, though where containers provide an SSH password for remote administration, VMs additionally provide a VNC connection – particularly useful for operating systems that don’t run an SSH server such as Windows. Furthermore, containers allow the mounting of additional folders and VMs additional disks (it is possible, however, to mount folders within the OS of either).

From within this management interface you can also assign additional NICs, IP addresses and firewall rules; though the former two need to be set up first:

**Additional IPs** can be created through the Add button. There’s no customisation available, when a static IP is requested, ElasticHosts provides one from their pool.

Assigning the IP to a server means opening the  menu while the server is powered off, changing the Network option from **Assigned at boot** to the static IP that’s now available and clicking **Save**. When the server boots back up it’ll have it’s new static IP and the previous DHCP-provided IP will return to the ElasticHosts pool.

**Private vLANs** are also created through the Add button. Once again the  menu should be opened and an additional NIC assigned. Once this is done the new vLAN will be available in the dropdown associated with the new NIC.

Interestingly I had initially imagined the vLAN would be pre-configured with a private IP range that could be edited, however it is completely unmanaged and relies on the server admin to assign the vLAN to all servers required and manage the IP side of things there. I created a DHCP server within a container to test the functionality of the vLAN and was pleasantly surprised with the relatively little effort it took to set up internal communications between servers.

#### Deleting servers

To complete the lifecycle, deleting servers is simply a case of clicking the delete icon on both the server and it’s allocated storage. In order for the storage to be deleted, the interface requests entering a confirmation to make absolutely sure a deletion was intended. Once that’s done the data is gone.

![Screenshot from 2016-05-07 23-58-56](https://cdn.bayton.org/uploads/2016/05/Screenshot-from-2016-05-07-23-58-56.png)

Similar prompts also appear when trying to delete a vLAN, which makes sense – removing a vLAN that’s in use could have a pretty dramatic effect on inter-server communications on larger deployments.

### Additional tools

In addition to what has been discussed already, ElasticHosts provides a few other tools and solutions that aren’t necessarily all that common amongst the competition.

#### Backups

Backups are absolutely critical to the successful running of servers long-term. It’s impossible to say when downtime, corruption or complete catastrophic failure will take a website irreversibly offline.

While most hosting providers offer backups, I’ve yet to come across any other provider that offers a combination of simplicity and utility; backups can literally be made at the click of a button. Though this is not unique, clicking the  icon immediately creates a carbon-copy of the folder or drive, with drives even providing the option to copy either to HDD or SSD:

![clone](https://cdn.bayton.org/uploads/2016/05/clone.png)

With that disk/folder copied successfully, there are a couple of things that can be done with it.

**Mount it locally** – For containers, each folder can be accessed remotely via webdav, SSH or the API. This means after a backup has been taken, it’s really simple to mount the backup copy on my local machine and take a copy of the server data without impacting the live server at all.

![access](https://cdn.bayton.org/uploads/2016/05/access.png)

**Mount it on another server** – using the same details as above it’s just as simple to mount a folder to another server. Additionally however it’s possible to mount the folder natively within server settings, overcoming any network bottlenecks you may otherwise face.

**Duplicate a server** – As mentioned in the beginning, when adding a new server one of the options presented is to boot from an existing drive/folder. Selecting the copy will essentially create a duplicate of the server that was backed up.

![Screenshot from 2016-05-07 23-28-34](https://cdn.bayton.org/uploads/2016/05/Screenshot-from-2016-05-07-23-28-34.png)

#### Backups in the opposite direction (Cloud Storage)

As well as creating copies of servers to backup websites and such like, it’s also possible to create a standalone, empty folder. When not assigned to a container, folders can be used as remote storage locations, enabling tools like rsync to replicate local data into storage areas on ElasticHosts’ infrastructure.

In fact, as mentioned at the beginning ElasticHosts just recently launched a new service called [Cloud Storage](/2016/04/elastichosts-cloud-storage-vs-folders/).

![Screenshot from 2016-05-07 23-38-36](https://cdn.bayton.org/uploads/2016/05/Screenshot-from-2016-05-07-23-38-36.png)

It’s essentially folders, but based on cheaper spindle-based storage whereas folders utilise SSDs. This makes remote backups even cheaper than previously.

#### Firewalls

Within every server is the ability to configure firewall rules, it works just as expected, only permitting traffic on the ports specified and blocking everything else.

![Screenshot from 2016-05-08 00-42-21](https://cdn.bayton.org/uploads/2016/05/Screenshot-from-2016-05-08-00-42-21.png)

In the example above I opted for a “whitelist” approach which, depending on requirements, may not be suitable for everyone. I know for certain I only want that server accessible over 3 ports and it works like a charm.

For the cost ($7.50/month) it’s not something I’d rely on long-term, instead perhaps looking to achieve the same result with iptables, but as a proof of concept it’s great.

#### Statistics and reports

Two of my favourite things. ElasticHosts provides an audit log of every action within the account for everything from logging in to destroying a server all through the Activity tab.

![ams-e Elastichosts (5)](https://cdn.bayton.org/uploads/2016/05/ams-e-Elastichosts-5-e1462661702886.png)

With a detailed audit trail like that, it’s easy to keep tabs on who’s doing what with the account in larger teams. Naturally filtering is available in the form of Search.

Similarly, the statistics tab does an excellent job of visualising things like plan limits, CPU usage, network usage and much, much more.

![ams-e Elastichosts (4)](https://cdn.bayton.org/uploads/2016/05/ams-e-Elastichosts-4-e1462661663455.png)

This provides granular insight into the activity of your servers and can be used to compare activity to bills should a query arise.

Pricing
-------

Compared to Springs, ElasticHosts pricing model is quite a bit more complex. Just running containers within San Jose, Dallas or Miami\* will work out the same with pricing as follows (correct at time of publishing):

CPU (core-GHz per hour): $0.008  
RAM (GB per hour): $0.011  
SSD (GB per month): $0.250  
Data transfer over 1TB (per GB): $0.050 (\* only the three regions above get 1TB free traffic)  
Static public IP address (per month): $3.000

The exception are IP addresses which are for some reason $1 more expensive per month. Additionally, testing out vLANs and Firewalls will set you back $7.50 for each every month, which is a little too high for my liking!

Opting for other regions causes the pricing to vary. Understandably VM hosting is a little more expensive but still very much in the realm of competitors. Thankfully discounts are available when purchasing plans rather than relying on pre-paid credit which can bring the cost down significantly.

The full price list can be found [here](https://www.elastichosts.co.uk/blog/pricing-information/), and I’d very much advise reading and understanding it thoroughly before getting started.

Issues
------

Considering my biggest gripe with Springs was the lack of redundancy, there’s really nothing major to report with ElasticHosts.

That said, here are a few niggles for the sake of a balanced review!

### Out of date images

Although they provide free data transfer in most regions, I’ve found some of the images provided such as Ubuntu and pfSense are quite a bit out of date. It’s not a huge problem, but given the first thing you do on a new installation is update it to patch security holes and improve reliability, waiting around for everything to download and install isn’t the quickest way to get started.

### Cloud Storage availability

Currently the new Cloud Storage solution is only available in a couple of regions. Reading through some of the how-to documents you get the impression it has been deployed everywhere and immediate come to find the option under the Add button missing. It’s a little confusing.

### Lack of documentation/visibility

I really like ElasticHosts, but finding out information about the various solutions has been a bit of a chore. Furthermore, for a company that’s been around since 2008 the amount of documentation and, as such, visibility on the web leaves a lot to be desired. Although recently there’s been an apparent push to publish more documentation (if their social media accounts are anything to go by), ElasticHosts need to market themselves so, so much more than they do.

Support
-------

For issues where help is required, ElasticHosts support is fantastic.

They’re quick to respond, intimately knowledgeable with their platform and always eager to help. Their support team isn’t huge, so in the myriad of requests I’ve made I’m regularly talking to the same few engineers across both ElasticHosts and Springs.

Not only are they helpful when issues arise, they’re equally always open to suggestions and improvements; most recently I requested an updated beta image of Xenial (just before the official launch) and they were more than happy to get that set up, which is just one of several examples where they’ve gone above and beyond what I’d typically expect based on experiences with competitors.  
<span id="competition"> </span>  
ElasticHosts support is easily in the top three of any company I’ve ever used.

Conclusion
----------

Having already spent time on their technology stack in the form of Springs, I had a good feeling moving over to ElasticHosts. The more time and energy I invested in the platform, the more confident I’ve been feeling about hosting even my more important services with them.

Their interface is easy to use and intuitive even for the less technical of users. For the more advanced features their support is amazing.

Do I think ElasticHosts is for everyone? No. Truthfully like any VPS provider, for the average Joe looking for somewhere to host his first website this is a bit overkill and likely more expensive to maintain than your everyday web hosting companies.

For the power users, larger groups and businesses looking to invest in a plan and/or take advantage of all the features EH has to offer however, it’s a fantastic solution and definitely worth the investment.

If you’re interested in trying them out, every free trial comes with 2000 core-MHz CPU, 1GB RAM, 30GB HDD and 5GB SSD which can be utilised for 5 days. Just [sign up](https://www.elastichosts.co.uk/free-trial/) to get started!

—

Do you use ElasticHosts? Are you considering it? Let me know in the comments or tweet me [@jasonbayton](https://twitter.com/jasonbayton) with the tag [\#EHTrial](https://twitter.com/search?f=tweets&q=%23ehtrial&src=typd)

<div class="callout callout-success"> 

#### Are you interested in winning 3 months of free hosting?

In celebration of this, my 100th article on bayton.org, I’ve arranged a competition with ElasticHosts to provide one lucky winner with 3 months of free VPS and container hosting.

More information will be published shortly, in the meantime feel free to register your interest below to be notified when the competition goes live!

[<button class="btn btn-success" type="button">Register</button>](https://docs.google.com/forms/d/1sLxi5yDUCAkhOOC684j2FqGcf3xy0FslM8Yu1WIPU6I/viewform)

</div>