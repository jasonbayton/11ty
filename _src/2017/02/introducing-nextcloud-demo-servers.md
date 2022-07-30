---
title: 'Introducing Nextcloud demo servers'
date: '2017-02-10T01:21:27+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 3699
tag:
    - containers
    - demo
    - hosting
    - launch
    - lightervisor
    - LXD
    - nextcloud
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/introducing-nextcloud-demo-servers/92'
tags:
    - Projects
---
I’ve previously written the very well-received [Nextcloud guide](/2016/07/installing-nextcloud-on-ubuntu-16-04-lts-with-redis-apcu-apache/) offering one of the most complete start-to-finish installation guides available currently. I also reviewed the [Nextcloud Box](/2016/10/hands-on-with-the-nextcloud-box/) back in October and have since launched my Nextcloud hosting endeavour, but with my knowledge in virtualisation and Linux felt I could do more to give back to the project that serves me so well both personally and professionally.

With that, today I’m launching a collection of demo servers offering completely vanilla installations of the most up-to-date versions of Nextcloud 9, 10 and 11. They’ll naturally be kept updated with point releases and when required I plan to launch new servers for Nextcloud 12, 13, etc.

Obviously an [official demo server](https://demo.nextcloud.com) already exists running the latest version for Nextcloud and also includes collabora integration, however there’s no harm in offering more than one option (on likely vastly different hardware) and the NC project doesn’t host demos of previous supported versions.

The goal is to provide a testing ground for new and existing Nextcloud users, those locked to an older supported release due to corporate policy or politics (who may wish to present the benefits of a newer version without spinning up an instance), and to simply demonstrate the evolution of Nextcloud across major releases – [the speed difference](https://nextcloud.com/blog/nextcloud-11-sets-new-standard-for-security-and-scalability/) between version 11 and the older releases for example is very apparent.

Each server has been set up using [my guide](/2016/07/installing-nextcloud-on-ubuntu-16-04-lts-with-redis-apcu-apache/) and so benefits from caching via Redis &amp; ACPu, SSL connectivity and pretty URLs.

The servers are set to refresh on the hour, every hour so offer up to 60 minutes of testing (this may be changed in the future) before all data and configuration settings are wiped and reset back to a vanilla installation.

Credentials
-----------

Both the user and password are **admin** across all installations.

Links
-----

[Nextcloud 9](http://j.son.bz/nextcloud9)  
[Nextcloud 10](http://j.son.bz/nextcloud10)  
[Nextcloud 11](http://j.son.bz/nextcloud11)  
[Nextcloud 12](http://j.son.bz/nextcloud12)  
[Nextcloud 13](http://j.son.bz/nextcloud13)  
[Nextcloud 14](https://j.son.bz/nextcloud14)

Technical info
--------------

The installations run in LXD containers, each container is a full Ubuntu 16.04 LTS deployment with Apache, PHP 7 and a shared MariaDB container running separately (I’m also looking at potentially using a single Redis server rather than running a unique instance within each container).

Utilising ZFS and snapshots, the containers accessible via the links above are replicas of snapshots created from “master” containers. On the hour, the Nextcloud containers are destroyed, re-cloned and restarted, while the databases are overwritten with vanilla backups. This process takes about 30 seconds and is done in series, meaning only one server is down for about 10-15 seconds at a time. Here’s how the very simple bash script looks:

```
#!/bin/bash
lxc delete --force nclive-9
lxc copy nextcloud-9/snap0 nclive-9
lxc exec mdblive -- mysql nextcloud9 < /media/resources/nextcloud9.sql
lxc start nclive-9
sleep 1
lxc delete --force nclive-10
lxc copy nextcloud-10/snap0 nclive-10
lxc exec mdblive -- mysql nextcloud10 < /media/resources/nextcloud10.sql
lxc start nclive-10
sleep 1
lxc delete --force nclive-11
lxc copy nextcloud-11/snap0 nclive-11
lxc exec mdblive -- mysql nextcloud11_1 < /media/resources/nextcloud11.sql
lxc start nclive-11
sleep 1
lxc delete --force nclive-12
lxc copy nextcloud-12/snap0 nclive-12
lxc exec mdblive -- mysql nextcloud12 < /media/resources/nextcloud12.sql
lxc start nclive-12
```

Doing this process rids the servers of any uploaded files, as well as resets the databases back to a clean, like-new installation. I toyed with the idea of omitting the re-cloning of the NC servers in favour of a bash script to clean out the data directories, but restoring from snapshots feels cleaner if a little more arduous on resources.

As the dedicated server uses a single public IP, the LXD host runs an Apache proxy to direct traffic to the private IPs of each container based on hostname. The benefit of this is enabling SSL for any number of unique containers can be done by excluding the `.well-known` directory from being proxied in the Apache vhost config, ensuring when LetsEncrypt tries to perform verification, it can create all verification entries on the LXD host rather than needing to be run manually or on each container. Verification traffic – being excluded from the proxy – terminates on the host where the verification files sit and is therefore far more convenient. Excluding traffic from the Apache proxy is as simple as the example here:

```
<strong>ProxyPass /.well-known !</strong>
ProxyPass / http://10.11.12.2/
ProxyPassReverse / http://10.11.12.2/
```

Ensure the exclusion is listed **above** the remaining proxypass rules, otherwise it won’t be executed.

The future (to do)
------------------

As the server deployments are brand new and a little raw, there will no doubt be some minimal downtime for maintenance and optimisations here and there. If the server fails to load, give it a few minutes and try again.

<del>I’m also working on a maintenance page for the moments the servers are down while being refreshed, as currently Apache will simply throw a (pretty ugly) error.</del> **Completed 27.03.17**

In addition to the hosted demo installations, I’m aiming to also make LXD images available for all major versions at some point soon to allow simple, direct download of fully configured Nextcloud LXD OS containers, save having to install Nextcloud manually; a little like the official VMs but on a much, much lighter hypervisor.

When ready, LXD users will be able to add the hosted public repository and pull a Nextcloud container down as follows:

```
lxc remote add nextcloud demo.nextcloud.bayton.org --public
lxc launch nextcloud:nextcloud-11 local-nextcloud-server
```

<del>**29.03.17:** A demo for Nextcloud 11 is available as an LXD image, [details here](https://help.nextcloud.com/t/beta-lxd-image-for-nextcloud-11/10782).</del>

Feedback welcome! I’d be interested to know if any issues crop up with the servers, how they’re being used and what can be improved following a period of testing on any of the installed versions.

*As always I’m [@jasonbayton](https://twitter.com/jasonbayton) on Twitter, [+JasonBayton](https://twitter.com/jasonbayton) on Google+, [/in/jasonbayton](https://linkedin.com/in/jasonbayton) on Linkedin or [@bayton.org](https://facebook.com/bayton.org) on Facebook. You’re also welcome to leave a comment below or send me an [email](mailto:jason@bayton.org).* *Free free to get in touch to discuss this or any other topics you have in mind!*