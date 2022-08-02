---
title: 'On the state of mobile administration'
date: '2015-04-18T08:44:18+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 2157
tag:
    - administration
    - Enterprise
    - Mobile
    - 'mobile first'
    - 'remote admin'
    - 'touch friendly'
post_format: []
post_views_count:
    - '9'
tags:
    - Enterprise
    - Opinion
---
More and more businesses are taking the plunge into the world of enterprise mobility. Admittedly some businesses are only interested in giving iPhones to senior management, but for many it is so much more than that; they want a mobile-first, anywhere, anytime fleet employees who’ll enjoy working out of the office as much as they do in the office.

They have goals and strategies. They’ve run trials and discovered best practices. Their policies and procedures are finalised and signed off.

They’re *ready* to reap the benefits of a mobilised workforce.

For those businesses and more importantly, their mobilised workforce, providing access to corporate services and applications from anywhere is critical to the smooth workflow and enhanced productivity they’re trying to achieve.

That’s only one part of the equation though. The other? Administering these solutions from mobile devices.

A workforce can have access to all the services and solutions under the sun, but if those solutions aren’t optimised for the touch-enabled screens used by their administrators there’s going to be a struggle.

If it isn’t clear already, I’m not talking about front-end solutions geared towards end-users. They’ve existed and worked very well for a number of years; the OneDrives for Business, the Google Docs for Work, the Asanas, the AtTasks.. they all have applications geared towards usability on mobile devices and end-users use them without fuss. It’s specifically the administrators I’m referring to; the Office 365 support teams, the EMM/MDM managers, the EPO, Sharepoint and Exchange specialists. Whilst end-users are fully enjoying their mobile-friendly applications, the people having to look after those solutions behind the scenes are left out, give or take the odd exception.

Throughout my career I’ve managed my fair share of solutions, predominantly in Disaster Recovery before I later moved towards Enterprise Mobility and cloud services. The thought of a NetBackup mobile administration client for example has been on my mind for many years, yet whilst a few 3rd parties have offered up their own mobile administration applications and interfaces for some of the more popular solutions on the market, vendors have been incredibly slow to catch up.

It seems as though it’s only more recently that mobile admin clients have become something of a focus for vendors and they leave an awful lot to be desired. Here are a couple of examples:

**AirWatch**

AirWatch released what they call a “mobile console” as part of the 8.0 release a short while back. Reading about it before launch I was incredibly excited. *Finally*, I thought, *a way to administer my mobile estate from a mobile device*. If anyone would understand my struggle it would be AirWatch, *the* EMM people. I was very interested in seeing how they would take a complex administration console like this:

[![dash](https://r2_worker.bayton.workers.dev/uploads/2015/04/dash.png)](https://r2_worker.bayton.workers.dev/uploads/2015/04/dash.png)

[![settings](https://r2_worker.bayton.workers.dev/uploads/2015/04/settings.png)](https://r2_worker.bayton.workers.dev/uploads/2015/04/settings.png)

And condense it down into a simple easy to use interface for mobile devices.

Well, they didn’t.

 <style type="text/css">
			#gallery-17 {
				margin: auto;
			}
			#gallery-17 .gallery-item {
				float: left;
				margin-top: 10px;
				text-align: center;
				width: 33%;
			}
			#gallery-17 img {
				border: 2px solid #cfcfcf;
			}
			#gallery-17 .gallery-caption {
				margin-left: 0;
			}
			/* see gallery_shortcode() in wp-includes/media.php */
		</style>

<div class="gallery galleryid-0 gallery-columns-3 gallery-size-medium" id="gallery-17"><dl class="gallery-item"> <dt class="gallery-icon portrait"> [![](https://r2_worker.bayton.workers.dev/uploads/2015/04/Screenshot_2015-02-28-09-33-35.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/04/Screenshot_2015-02-28-09-33-35.png) </dt></dl><dl class="gallery-item"> <dt class="gallery-icon portrait"> [![](https://r2_worker.bayton.workers.dev/uploads/2015/04/Screenshot_2015-02-28-09-33-27.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/04/Screenshot_2015-02-28-09-33-27.png) </dt></dl><dl class="gallery-item"> <dt class="gallery-icon portrait"> [![](https://r2_worker.bayton.workers.dev/uploads/2015/04/Screenshot_2015-02-28-09-33-12.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/04/Screenshot_2015-02-28-09-33-12.png) </dt></dl>  
 </div>What they’ve provided is a console for looking at devices and wiping them. The entire workflow is shown in the pictures above: Log in, select a device, perform an action. There’s no App management, no content management, no user management, no policy management, no back-end management.. I could go on. Their “mobile console” offers admins on mobile devices nothing more than the ability to look at a device and wipe it if necessary (and not even a full wipe), something that in 100% of the time I spend in AirWatch I’ve had to do less than 8%. I’d much rather be able to push out an app or reassign a policy.

Thankfully their standard web console isn’t unusable, even if zooming in and out constantly is a little tedious.

**Office 365**

Another [mobile first, cloud first](http://news.microsoft.com/2014/03/27/satya-nadella-mobile-first-cloud-first-press-briefing/) company offering their cloud-based collaboration and editing suite went one step further than AirWatch by releasing native administration apps for the major mobile operating systems on the market. Again I found myself getting a little more excited than a normal person would at the thought of a mobile admin application prior to launch and again I was wondering how they would take this complex and wonderfully granular admin console:

[![365](https://r2_worker.bayton.workers.dev/uploads/2015/04/365.png)](https://r2_worker.bayton.workers.dev/uploads/2015/04/365.png)

And consolidate it down into a useful mobile-optimised application.

Again, they haven’t. Although it has improved over time and is infinitely better than what AirWatch offers.

 <style type="text/css">
			#gallery-18 {
				margin: auto;
			}
			#gallery-18 .gallery-item {
				float: left;
				margin-top: 10px;
				text-align: center;
				width: 33%;
			}
			#gallery-18 img {
				border: 2px solid #cfcfcf;
			}
			#gallery-18 .gallery-caption {
				margin-left: 0;
			}
			/* see gallery_shortcode() in wp-includes/media.php */
		</style>

<div class="gallery galleryid-0 gallery-columns-3 gallery-size-thumbnail" id="gallery-18"><dl class="gallery-item"> <dt class="gallery-icon portrait"> [![](https://r2_worker.bayton.workers.dev/uploads/2015/04/Screenshot_2015-04-17-19-00-48.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/04/Screenshot_2015-04-17-19-00-48.png) </dt></dl><dl class="gallery-item"> <dt class="gallery-icon portrait"> [![](https://r2_worker.bayton.workers.dev/uploads/2015/04/Screenshot_2015-04-17-19-00-54.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/04/Screenshot_2015-04-17-19-00-54.png) </dt></dl><dl class="gallery-item"> <dt class="gallery-icon portrait"> [![](https://r2_worker.bayton.workers.dev/uploads/2015/04/Screenshot-17-Apr-2015-7_43_53-pm.png)](/https://r2_worker.bayton.workers.dev/uploads/2015/04/Screenshot-17-Apr-2015-7_43_53-pm.png) </dt></dl>  
 </div>Using the Office 365 administration app I can manage users (assign licences, edit names and addresses, etc) but I can’t manage OneDrive, Exchange, configure permissions in Sharepoint libraries, administer Yammer, etc. Again I could go on.

There are so many more examples I could list, but I think the picture is clear.

Vendors are shipping incomplete, stripped down versions of administration consoles based on what they think people want to do whilst out and about. They’re treating mobile as the second-class citizen of the administration world, fully expecting administrators to have *proper* devices available to do *real* work.

These are vendors actually offering mobile administration clients of course and I’ve focused entirely on cloud solutions in the examples above as they should be at the forefront of mobile administration. As I mentioned above it is an area that’s lagging way behind compared to the consumer, front-end applications we all know and use. A lot of vendors don’t even provide consoles optimised for mobile administration yet, such as another MDM vendor [I reviewed](/2015/03/miradore-online-mdm-review-a-second-look/) just recently.

Why is it we can fire up an almost desktop-equivalent document editor on our mobile devices, but don’t have an interface to check a few boxes and tap submit? (An over-simplification for some administration consoles, granted, but the point remains valid).

Mobile isn’t going away, quite the contrary and the market clearly sees that. The market however is not only end-users who want to use any device at any time to get the job done, the people who manage the systems that let those users work that way equally want to benefit from tools that make this possible.

As we shift into an era of the New IT I’d like to ask vendors of solutions the world over to consider making their solutions mobile friendly not just from a usability standpoint, but from an administration standpoint also.

Invest the time into making full-featured, granular mobile administration consoles and you’ll stand out from the crowd when people like myself come along looking for tools to help the business work more efficiently, because mobile administration will always be a top consideration in any decision I would make and, to my readers, maybe for the sake of the people who look after your systems you might consider it too.