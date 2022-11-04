---
title: "ElasticHosts: Cloud Storage vs Folders, what's the difference?"
date: '2016-04-15T13:48:38+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 2697
tag:
    - cloud
    - containers
    - elastichosts
    - folders
    - linux
post_format: []
post_views_count:
    - '499'
tags:
    - Reviews
---
ElasticHosts recently debuted [Cloud Storage](https://www.elastichosts.com/blog/elastichosts-launches-linux-friendly-cloud-storage/), their new remote backup solution geared towards Linux users. Working with tools such as Rsync, SCP, SSH &amp; Cron, Linux admins can set up automated backups to their own offsite storage area(s) on ElasticHosts infrastructure.

Having recently moved some of my [Springs.io](/2016/02/springs-io-review-16/) containers into ElasticHosts, the announcement piqued my interest and I decided to check it out. According to their announcement, here are some uses for Cloud Storage:

> **Offsite backups**: Full Rsync integration allows system administrators to import files and maintain incremental backups using standard Linux tools
> 
> **Shared network drives**: Share files, connecting securely from multiple locations over SSHFS or WebDAV
> 
> **Hosting static web pages and downloads**: Serve simple pages or large downloads without a webserver, or offload these from your webserver
> 
> **Integration with ElasticHosts cloud servers**: Run auto-scaling Linux Containers directly from SSD storage, and mount your storage on VMs, enabling tight integration with your software and direct remote access into the filesystem of your running server

With pricing starting as low as $0.06 per GB, it’s a tempting proposition. What’s interesting though is ElasticHosts have been already providing this functionality with folders (the storage half of their containers) for quite a long time.

So how is Cloud Storage different?

It isn’t (yet) available in all regions
---------------------------------------

![](https://cdn.bayton.org/uploads/2016/04/exprel-1.png)

ElasticHosts has several regions available from London to Amsterdam, the US to Australia. The first thing I noticed when I logged into my region (Amsterdam) was the option to create a shiny new Cloud Storage instance wasn’t there.

I’ve no doubt it will expand in the future, but in the meantime some form of visual cue to suggest you’re not in the correct region wouldn’t go amiss here. I spent a good amount of time searching around before concluding it wasn’t available to me, *personally*, just yet. This isn’t the case of course.

For those eager to try it, it’s available in the London region at the moment (amongst others).

*Expectation taken from [here](https://www.elastichosts.com/blog/getting-started-with-the-elastichosts-cloud-storage/).*

It’s slower
-----------

![ssd-vs-hdd-banner](https://cdn.bayton.org/uploads/2016/04/ssd-vs-hdd-banner.png)

Cloud Storage uses traditional spindles for data storage whilst Folders use SSDs. My immediate mental comparison was Amazon’s S3 vs Glacier (that is, fast and readily available storage vs slow, infrequently accessed storage), though definitely no where near as extreme (or annoying to use).

Is this a bad thing? Of course not. Remote storage is hardly benchmarked for speed, and in real-world usage it wouldn’t be apparent at all. If anything it’s a win-win; ElasticHosts provide storage on what are likely underused disk arrays, and customers don’t pay as much as they would otherwise have to using Folders.

And yes, it’s cheaper
---------------------

Based on [current pricing](https://www.elastichosts.co.uk/blog/pricing-information/), SSD storage is $0.25 per GB per month. Cloud Storage on the other hand – as mentioned above – can be as little as [$0.06 per GB](https://plus.google.com/u/0/+WillBerard/posts/8zQ9tXhHjGu) depending on the chosen region, allowing for 4x the amount of data to be stored for the same price as Folder storage with all the same functionality.

So with that in mind, if you’re currently utilising folders for remote storage and feel like cutting your costs, switching to Cloud Storage may save you a pretty penny to invest in other areas of ElasticHosts’ infrastructure.

—

Are you using Cloud Storage? Let me know in the comments or tweet me [@jasonbayton](//twitter.com/jasonbayton).

Interested in ElasticHosts? I’ll be writing about them again soon. Stay tuned!