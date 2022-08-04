---
title: 'Experimenting with clustering and data replication in Nextcloud with MariaDB Galera and SyncThing'
date: '2017-06-10T12:32:34+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 4311
tag:
    - cluster
    - galera
    - mariadb
    - 'master master'
    - multimaster
    - nextcloud
    - syncthing
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/experimenting-with-clustering-and-data-replication-in-nextcloud-with-mariadb-galera-and-syncthing/81'
tags:
    - Projects
---
<div class="callout callout-success">

### Update

After discussions with the Nextcloud team and guys at TU Berlin, the below could be officially supported with some small changes. See the updates noted against the challenges. A rewrite or additional post will be coming soon to address and test the changes.

</div>

Nextcloud works really well as a standalone, single-server deployment. They additionally have some [great recommendations](https://docs.nextcloud.com/server/12/admin_manual/installation/deployment_recommendations.html) for larger deployments supporting thousands of users and terabytes of data:

[![](https://r2_worker.bayton.workers.dev/uploads/2017/06/deprecs-3.png)](/https://r2_worker.bayton.workers.dev/uploads/2017/06/deprecs-3.png)
*Up to 100,000 users and 1PB of data*

What wasn’t so apparent [until last week](https://nextcloud.com/globalscale/), however, is how someone might deploy Nextcloud across multiple datacentres (or locations) in a distributed manner wherein each Node can act as the “master” at any point in time; federation is obviously a big feature in Nextcloud and works very well for connecting systems and building a trusted network of nodes, but that doesn’t do an awful lot for those wanting the type of enterprise deployment pictured above, without having all of the infrastructure on one network.

Now that Global Scale has been announced this will likely be the way forward when it’s ready, however given I’d already started a proof of concept (PoC) before NC12 was officially made available, I kept working away at it regardless – more for my own amusement than anything else for reasons explained further down.

The concept
-----------

[![](https://r2_worker.bayton.workers.dev/uploads/2017/06/SyncThing-Nextcloud.png)](/https://r2_worker.bayton.workers.dev/uploads/2017/06/SyncThing-Nextcloud.png)

The theory was as follows:

If I’m at home, the server in the office is the best place to connect to since it’s on the LAN and performance will be excellent. In this case, a DNS override will point the FQDN for the Global Load Balancer (GLB) to a local HAProxy server that in turn points to the LAN Nextcloud instance unless it’s down, where the local HAProxy will divert to the GLB as normal.

If I leave the house and want to access my files, I’ll browse to the FQDN of the Nextcloud cluster (which points to the GLB) and the GLB will then forward my request seamlessly to the Nextcloud instance that responds the fastest.

In the graphic above, I opted for a future-proof infrastructure design that would:

1. Only expose HAProxy to the internet directly, leaving the individual servers on the VLAN hidden out of the way
2. Allow for expansion at any remote location by adding another server and populating it in the local HAProxy configuration
3. Separate the webroot from the Apache server by mounting it via NFS from the SyncThing server, allowing for super quick provisioning of new Apache servers as required, writing back to the same dataset in one location.
4. Sync session data to all nodes, so if I jumped from one node to the other due to latency, downtime or anything else, the other node(s) would allow me to continue without any noticeable delay.

No matter which Nextcloud instance I eventually land on, I wanted to be able to add/remove/edit files as normal and have all other instances sync the changes immediately. Further still, I wanted all nodes to be identical, that is if any file changes in the Nextcloud web directory on the server, it should be synced.

### Why SyncThing?

The answer to that is pretty much “why not?”. This isn’t a serious implementation and I had no intention of scaling the solution beyond this PoC. GlusterFS or any one of the alternative distributed filesystems are designed for what I’m doing here, but I wanted to get some hands-on time with SyncThing and didn’t see a reason I couldn’t implement it in this fashion. I talk about it more [here](https://help.nextcloud.com/t/master-master-replicated-setup/9788) with Resilio Sync, but swapped Resilio with SyncThing as Resilio is proprietary.

Challenges
----------

**All recommended deployments suggest using Galera (MySQL or MariaDB) in a Master-Slave (-Slave-Slave, etc) configuration with a single centralised Master for writes and distributed slaves for quick reads. In my case, that could mean having a Master in Wales for which the nodes in France, Holland, Finland, Canada or anywhere else would have to connect to in order to write, introducing latency.**

To get around this, I opted for Galera Master-Master. This setup isn’t supported by Nextcloud I later found out (by reading the docs, no less, oops) but at the time it appeared to work fine – I uploaded 10,000 files in reasonably quick succession with no database or Nextcloud errors reported, however that may well have simply been luck.

**Update:** Galera Master-Master **is** supported, however a load-balancer supporting split read/write must be used in front of it. The master should be persistent and only failover to another Galera server in case of failure. ProxySQL (http://www.proxysql.com/) offers this functionality and is FOSS.

**At a minimum I’d have to replicate `apps`, `themes` and `data` for the individual nodes to sync data and retain a consistent user experience; enabling an app on one node wouldn’t be automatically enabled on the other node otherwise, as it’d first need to be downloaded from the Nextcloud store. I didn’t want to think of the issues this would cause for the database.**

At this point I also considered the impact of upgrades, as when one Nextcloud instance successfully upgrades and makes changes to the database, the other nodes will want to do the same as part of the upgrade process. So rather than just syncing the `data`, `apps` and `themes` folders individually, I opted to replicate the entire `/nextcloud` webroot folder between nodes on a 5-second sync schedule (that is, there will be a maximum of 5 sec before data uploaded to one node is replicated to the others).

In testing this setup in several containers on the [home server](/2016/06/part-0-project-obsidian-nas-app-server-build/), the additional load this put on the machine was enormous during an upgrade of Nextcloud; a hex-core with 32GB RAM and SSD-backed storage ended up with a load average nearing 30, far more than the normal 0.4 it typically runs at; not so much a problem with a distributed service but where traffic is monitored with some providers, the constant sync could have an impact on transfer caps.

Load and data transfer aside, the tests were successful; I updated Nextcloud from 11.0.3 to 12.0.0 and watched it almost immediately start replicating the changing data as the upgrade took place – it was beautiful.

[![](https://r2_worker.bayton.workers.dev/uploads/2017/06/WhatsApp-Image-2017-05-31-at-00.09.12.jpeg)](/https://r2_worker.bayton.workers.dev/uploads/2017/06/WhatsApp-Image-2017-05-31-at-00.09.12.jpeg)

This was naturally the 2nd attempt, as first I’d forgotten to leave the Nextcloud service in maintenance mode until all sync had ceased, and on accessing one of the nodes before it had completed, things started going wrong and the nodes fell out of sync. Keeping maintenance mode enabled until it was 100% synced across all nodes then worked every attempt (where an attempt involved restoring the database and falling back to snapshots from 11.0.3).

**Update:** SyncThing is a nice PoC, but if you’re seriously planning to run a distributed setup I’d strongly recommend Gluster or another distributed storage solution.

**HAProxy wasn’t failing over fast enough. If a node went down (Apache stopped, MySQL stopped or server shut down) and the page refreshed anywhere up to 2-3 seconds later HAProxy may not have downed the node quite yet and throws an error.**

Getting past that didn’t take long fortunately, and I ended up making the following changes to the HAProxy config:

`server web1 10.10.20.1:80 <strong>check fall 1 rise 2</strong>`

This tells HAProxy to check the servers in its configuration, but more importantly drop them out of circulation after only one failure to connect when doing a check, and require two successful checks to bring a server back in. After this it was much faster and knowing I had enough nodes to handle this type of configuration I wasn’t concerned about HAProxy potentially dropping a few of them out in quick succession if required.

**Redis doesn’t really *do* clustering, and authentication options are limited.**

This was pretty much a stopper for distributed session storage. Redis docs and a lot of Googling led me to the conclusion I can’t cluster Redis. Therefore each node would have to report session information on all Redis nodes. That’s not a dealbreaker, but worse, either Redis remains completely open on the internet for the nodes to connect to, or if authentication is used, it’s sent in plaintext. Not good. Redis suggests connecting in via VPN or tunneling, but that feels like it defeats the purpose of this exercise and requires a lot more configuration. Perhaps Memcached could solve the problem, or figuring out a way of replicating the session files with plain-old PHP session handling. I didn’t look much further into it.

**Update:** Speaking to TUBerlin, they got around this with IP-whitelisting between Redis nodes. Ultimately Redis can be left “open” and without authentication, however on the server/network level, only whitelisted IPs may successfully communicate with the Redis nodes. Within the Nextcloud configuration, stipulating **all** Redis nodes is the only way of achieving replication (as Nextcloud will write to them all).

**SyncThing comes with user-based Systemd service files, and after a while of trying to make them succumb to my will for a custom user and home directory (because the web user doesn’t always have a “`home`“, despite pointing to `/var/www/` SyncThing kept dying on me when I’d made the changes)**

Being all data is presented, manipulated and used by `www-data` for Nextcloud, I needed to ensure SyncThing ran as `www-data` in order to retain permissions and not run into issues trying to manage data in a non-user directory (`/var/www/html/nextcloud/data`). Because of this, I edited the default SyncThing service files to create some that aren’t user-based with a custom home directory, as follows:

[Syncthing Service](https://github.com/jasonbayton/misc/blob/master/syncthing.service)  
[Syncthing-inotify Service](https://github.com/jasonbayton/misc/blob/master/syncthing-inotify.service)

Testing
-------

So in order to confirm it was all working as it should be I did the following:

- Increased the web nodes from 3 to 6 to test data replication. Piece of cake in the home environment as it was just a case of cloning an existing LXD apache node and assigning a new IP address. However I additionally spun up some blank Ubuntu containers and configured from scratch, this included: 
  - PHP settings for max upload, max post size, etc
  - Apache settings for htaccess overrides and a conf file for default webroot location with Nextcloud (`/var/www/html/nextcloud`)
  - Mounting SyncThing repo via NFS
  - Static IP, updates, general server maintenance
- Initiated a load test via [Load Impact](https://loadimpact.com) against the FQDN and monitored the HAProxy logs, brief video below
- Manually downed both Galera nodes and web nodes, then brought them back up to test HAProxy failover

[![](https://r2_worker.bayton.workers.dev/uploads/2017/06/WhatsApp-Image-2017-05-26-at-10.39.53.jpeg)](/https://r2_worker.bayton.workers.dev/uploads/2017/06/WhatsApp-Image-2017-05-26-at-10.39.53.jpeg)
*Here I dropped a Galera node, checked the state of Galera, brought it back in and checked again. Exciting.*

And here’s a snippet of the load test at work on HAProxy (web nodes only):

<iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" frameborder="0" height="281" loading="lazy" src="https://www.youtube.com/embed/ruCX31n6fDg?feature=oembed" title="HAProxy loadtest" width="500"></iframe>

I don’t know why I recorded that rather than screen capture, but c’est la vie.

During the load test Nextcloud remained responsive, load on the server went off the charts but that was fine as it too remained responsive. I could continue to upload, edit, download and *use* Nextcloud, so I was happy with it.

The next step would have been to start replicating the home server setup on remote servers, I’d considered a couple of containers with ElasticHosts, one or two LightSail servers from Amazon and perhaps a VPS with OVH. However this didn’t happen due to at this point finding out Galera isn’t supported, and Redis was going to cause me problems.

What I learned
--------------

In conclusion, this type of deployment for Nextcloud seems to work, but isn’t feasible. Redis is a bit of a stopper and an alternative would need to be found, and Galera master-master is a major issue and a bit of an inconvenience in master-slave. Here’re the details I published over on the [Nextcloud forums](https://help.nextcloud.com/t/help-me-test-this-3-node-cluster/12863/23?u=jasonbayton):

- SyncThing is super reliable, handles thousands upon thousands of files and has the flexibility to be used in a usecase such as this; full webapp replication between several servers without any fuss however: 
  - Feasibility in a distributed deployment model where latency and potentially flaky connections wasn’t tested thoroughly, and while the version management was spot on at picking up on out of sync files, it would need far more testing before being even remotely considered for a larger deployment
  - Load on the server can be excessive if left setup in a default state, however intentionally reducing the cap for the processes will obviously impact sync speed and reliability
- Data/app replication between sites is not enough if you have multiple nodes sharing a single database 
  - The first few attempts at a NC upgrade for example led to issues with every other node once the first had a) updated itself and b) made changes to the database. 
      - This may be rectified by undertaking upgrades on each node individually but stopping at the DB step, opting to only run that on the one, I didn’t test this though.
  - I think a common assumption is you only need to replicate `/data`, however what happens if an admin adds an app on one node? It doesn’t show up on the others. Same for themes.
- Galera is incredible 
  - The way it instantly replicates, fails over and recovers, particularly combined with HAProxy which can instantly see when a DB is down and divert, is so silky smooth I couldn’t believe it.
  - Although a powercut entirely wiped Galera out and I had to build it again, this wouldn’t happen in a distributed scenario.. despite the cluster failure I was still able to extract the database and start again with little fuss anyway.
  - The master-master configuration is not compatible with NC, so at best you’ll have a master-slave(n) configuration, where all nodes *have* to write to the one master no matter where in the world it might be located. Another solution for multimaster is needed in order for nodes to be able to work seamlessly as if they’re the primary at all times.
- Remote session storage is a thing, and NC needs it if using multiple nodes behind a floating FQDN 
  - Otherwise refreshing the page *could* take you to another node and your session would be nonexistent. Redis was a piece of cake to setup on a dedicated node (though it could also live on an existing node) and handled the sessions fine in the home environment.
  - It doesn’t seem to scale well though, with documentation suggesting VPN or tunneling to gain access to each Redis node in a Redis “cluster” (not a real cluster) as authentication is plaintext or nothing, and that’s bad if you’re considering publishing it to the internet for nodes to connect to.
- When working with multiple nodes, timing is everything. 
  - I undertook upgrades that synced across all nodes without any further input past kicking it off on the first node; however don’t ever expect to be able to take the node out of maintenance mode in a full-sync environment until all nodes have successfully synced, otherwise some nodes will sit in a broken state until complete
  - Upgrading/installing apps/other sync related stuff takes quite a bit longer, but status pages of SyncThing or another distributed storage/sync solution will keep you updated on sync progress
- The failover game must be strong

Conclusion
----------

With the Redis exception I basically built an unsupported, but successful, distributed Nextcloud solution that synced well, maintained high availability at all times and only really suffered the odd discrepancy due to session storage not working properly.

SyncThing proved its worth to me, so I’ll definitely be looking more into that at some point soon. In the meantime, this experiment is over and all servers have been shut down:

[![](https://r2_worker.bayton.workers.dev/uploads/2017/06/c7562171b7aeec9132a005a92f54dd1520659120_1_344x500.png)](/https://r2_worker.bayton.workers.dev/uploads/2017/06/c7562171b7aeec9132a005a92f54dd1520659120_1_344x500.png)

If you have suggestions for another master-master database solution that could work\*, and a session storage option that will either a) cluster or b) support authentication that isn’t completely plaintext, let me know!

\*Keep in mind:

> A multi-master setup with Galera cluster is not supported, because we require `<span class="pre">READ-COMMITTED</span>` as transaction isolation level. [Galera doesn’t support this with a master-master replication](http://galeracluster.com/documentation-webpages/isolationlevels.html#understanding-isolation-levels) which will lead to deadlocks during uploads of multiple files into one directory for example.

*Have you attempted this kind of implementation with Nextcloud? Do you have any tips? Were you more or less successful than my attempt? Let me know in the comments, [@jasonbayton](https://twitter.com/jasonbayton) on twitter or [@bayton.org](https://facebook.com/bayton.org) on Facebook.*