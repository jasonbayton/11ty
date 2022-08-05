---
title: 'Part 3 – Project Obsidian: A change, data migration day 1 and build day 2'
date: '2016-07-13T15:56:12+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 3036
tag:
    - build
    - linux
    - LXD
    - NAS
    - obsidian
    - pc
    - Server
    - ubuntu
    - zfs
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/part-3-project-obsidian-a-change-data-migration-day-1-and-build-day-2/105'
tags:
    - Projects
---
<div class="callout callout-default"> 

#### Just tuning in?

This is a multi-part build log for Project Obsidian: a low power Ubuntu 16.04 LTS NAS &amp; container server.  
You’re currently viewing part 3. Head over to the [introduction ](/2016/06/part-0-project-obsidian-nas-app-server-build/)for context and contents.

</div>

A change
--------

Despite [some ](https://twitter.com/JasonBayton/status/751057827712630784)[effort ](https://twitter.com/JasonBayton/status/747431921408344064)[on ](https://twitter.com/JasonBayton/status/751763564407455744)[my ](https://www.facebook.com/bayton.org/posts/1665228143800954)[part ](https://twitter.com/JasonBayton/status/753227982152593410)it hasn’t been possible to obtain the 6/8TB disks I’m aiming for just yet. I would have continued (and still will) to work on that, however noticed my 16TB MDADM RAID array was flaking out on me a little over the last few days, going even as far as no longer showing up in the system until it was rebooted. (There’s nothing wrong with the disks, it’s the server).

So in an effort to avoid any potential data loss I’m going to make do with what I have now; moving 7 4TB disks from my current AMD FX-6300 storage server into the Obsidian build and a whole lot of extra data migration as a result.

I’m still aiming for the larger capacity disks, and having now decided on ZFS for my system, swapping out the 4TB’s for larger will be a piece of cake.

Data migration
--------------

Luckily, I caught the tail-end of [this HotUKDeals find](http://www.hotukdeals.com/deals/wd-cloud-4tb-nas-drive-instore-41-tesco-2472274) and was able to fetch two MyCloud 4TB external drives for £82! With the extra disk I was able to set up a temporary MDADM RAID5 with one extra 4TB I had lying around and proceeded to rsync all data from the 16TB RAID6 to the 8TB RAID5. A nice, simple command on linux systems to guarantee both files and metadata (permissions, ownership, etc) is:

`sudo rsync -avP /source/path/ /destination/path/`

-a stands for Archive, which handles the file permissions and ownership  
-v is for Verbose, as I like to see in detail what it does  
-P stands for Progress, giving me a vague indication of what’s happening by streaming a list of files through the console as it copies them across.

This took the better part of a day to complete. At that point I left the new RAID5 in place for a couple of days having mounted it in place of the old RAID6 through `fstab` (seamless change on a reboot) and haven’t noticed any issues.

Build day 2
-----------

So with the temporary RAID5 in place and data migrated, I shut it all down and began stripping down the storage server. There’s no build video for day 2, it was all a little manic.

![20160713_114251_HDR](https://r2_worker.bayton.workers.dev/uploads/2016/07/20160713_114251_HDR-e1468419744237.jpg)

In the above image I’ve mounted 3 4TB WD RED NAS hard drives in the 2 5.25″ bays, later joined by the system 120GB SSD. After first destroying the 16TB RAID6 from within Ubuntu I powered the server down and began disconnecting the drives in the bottom Cooler Master 915R. The beauty of a case like this is being able to mount the drives separately from the main system and easily remove the whole chassis in situations such as this.

Once the disks were disconnected, the 915R uncoupled from the 925 and moved out of the way, all surplus cables were removed leaving the 925 but a husk of the mammoth system it was before:

![20160713_130728](https://r2_worker.bayton.workers.dev/uploads/2016/07/20160713_130728-e1468420061922.jpg)

And no, still not cable managed. Yet.

With the storage server back up and running and everything looking good, I proceeded to transport the 915R and its disks downstairs to a waiting 915F housing the compute module.

![20160713_131233](https://r2_worker.bayton.workers.dev/uploads/2016/07/20160713_131233.jpg)

After a lot of dusting (it’s impossible to get in there when they’re stacked), stacking the storage module on top of the compute module and connecting a whole heap of wires, it was ready to boot:

![20160713_153441](https://r2_worker.bayton.workers.dev/uploads/2016/07/20160713_153441.jpg)

 <style type="text/css">
			#gallery-12 {
				margin: auto;
			}
			#gallery-12 .gallery-item {
				float: left;
				margin-top: 10px;
				text-align: center;
				width: 33%;
			}
			#gallery-12 img {
				border: 2px solid #cfcfcf;
			}
			#gallery-12 .gallery-caption {
				margin-left: 0;
			}
			/* see gallery_shortcode() in wp-includes/media.php */
		</style>

<div class="gallery galleryid-0 gallery-columns-3 gallery-size-full" id="gallery-12"><dl class="gallery-item"> <dt class="gallery-icon landscape"> 

[![](https://r2_worker.bayton.workers.dev/uploads/2016/07/20160713_153448.jpg)](/https://r2_worker.bayton.workers.dev/uploads/2016/07/20160713_153448.jpg) </dt></dl><dl class="gallery-item"> <dt class="gallery-icon landscape"> [![](https://r2_worker.bayton.workers.dev/uploads/2016/07/20160713_153453-e1485293565424.jpg)](/https://r2_worker.bayton.workers.dev/uploads/2016/07/20160713_153453-e1485293565424.jpg) </dt></dl>   
 </div>
 
 At this point it’s worth pointing out *none of this is very black* and that would be right. I haven’t yet wired up the all-black power cables and given the rather quick turnaround on moving the disks, simply reused the far-too-long SATA cables I already had. As and when the parts come in I’ll publish some updated pictures.

The system is up and stable. I’m still not pleased about having 4 disks on a PCIe card and 3 on the motherboard, but until I can find a 4-channel, 8 port SAS/SATA card that won’t cost more than the rest of the system combined (disks excluded) there’s little other choice.

So that’s all for this update. In the next I’ll cover off some Ubuntu configuration and RAID setup.

Sponsors
--------

There are no sponsors just yet.

Interested in helping out? Sponsors get a mention in every post and frequent shout-outs on social media. For this build I’m currently looking for high capacity drives (6-8TB), PCIe SATA/SAS solutions and cooling options aimed towards near silence.

Get in touch
------------

As always I’m [@jasonbayton](https://twitter.com/jasonbayton) on Twitter, [+JasonBayton](https://twitter.com/jasonbayton) on Google+, [/in/jasonbayton](https://linkedin.com/in/jasonbayton) on Linkedin and I’m available via [email](mailto:jason@bayton.org).

Free free to get in touch to discuss this or any other topics you have in mind!