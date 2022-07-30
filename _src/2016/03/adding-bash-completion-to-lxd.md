---
title: 'Adding bash completion to LXD'
date: '2016-03-23T15:11:13+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 2642
tag:
    - containers
    - linux
    - LXC
    - LXD
    - ubuntu
post_format: []
post_views_count:
    - '467'
dsq_needs_sync:
    - '1'
tags:
    - Guides
---
I’ve recently started moving my servers from VMware to LXD running on a Ubuntu 15.10 host due to the rapidly maturing platform combined with incredibly low resource usage.

One of the most frustrating “issues” with LXD so far has been the lack of bash completion when fumbling around on the CLI. I’ve become so accustomed to bash completion being part of everything and anything Linux that having to manually type out all commands in full for LXD is a chore, particularly when the container aliases are quite long!

Example: `lxc exec mylongcontainername-32 bash`  
Better example: `lxc config device add ip48-mycontainer Resources disk source=/media/mount/resources path=/media/mount/resources`

After raising this as a [feature request](https://github.com/lxc/lxd/issues/1797), LXD dev [tych0](https://github.com/tych0) soon replied offering a simple solution; pop the already-present bash completion profile into the relevant directory:

`sudo cp /usr/share/bash-completion/completions/lxd-client /etc/bash_completion.d/<br></br>`

Followed by a quick logout/login to make sure it’s applied.

So LXD ships with a bash completion profile, but for whatever reason it isn’t enabled by default. Hopefully this will be resolved for the launch of LXD v.2.0

Happy containerising!

**Update:**

`bash_completion.d` is deprecated and the reason the included bash completion profile doesn’t work is due to a naming issue. This should be fixed in an update soon, but for the time being and while `bash_completion.d` is still available for use, popping the existing file in there will at least enable the functionality in the short term.