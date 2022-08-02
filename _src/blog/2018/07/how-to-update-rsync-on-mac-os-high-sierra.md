---
title: 'How to update Rsync on Mac OS Mojave and High Sierra'
date: '2018-07-09T10:53:01+01:00'
status: publish
author: 'Joel Scholten'
excerpt: 'Out of the box, Mac OS High Sierra ships with a 12 year old version of Rsync. The reason for this is that Apple doesn’t include anything released under GPLv3 or similar licenses. Luckily, it''s relatively quick and simple to update Rsync using Homebrew. Homebrew is a package manager not dissimilar to Yum on Redhat or Apt on Debian. You can follow the instructions in the above link, or just copy and paste the commands documented as follows.'
type: post
id: 6351
tag:
    - 'high sierra'
    - homebrew
    - 'mac os'
    - rsync
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/how-to-update-rsync-on-mac-os-high-sierra/162'
tags:
    - Guides
---
<div class="bs-callout bs-callout-info"> ![](https://r2_worker.bayton.workers.dev/uploads/2018/07/Joel400.jpg)### Contributing author

 This is one of a series of posts contributed to bayton.org by guest authors. [Click here](https://www.linkedin.com/in/jo%C3%ABl-scholten-9b822b35/) to learn more about Joel. </div>Out of the box, Mac OS Mojave ships with a 12 year old version of Rsync. The reason for this is that Apple doesn’t include anything released under GPLv3 or similar licenses.

Luckily, it’s relatively quick and simple to update Rsync using [Homebrew](https://brew.sh).

Homebrew is a package manager not dissimilar to Yum on Redhat or Apt on Debian. You can follow the instructions in the above link, or just copy and paste the commands documented as follows.

Open the terminal and paste the command:

```
<pre class="wp-block-code">```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

```
```

Homebrew will link most software to /usr/local/bin. However, the terminal may be looking in other folders first, so lets make sure that /usr/local/bin is the first line in our path list.

```
<pre class="wp-block-code">```
sudo nano /private/etc/paths
```
```

![](https://r2_worker.bayton.workers.dev/uploads/2018/07/Screen-Shot-2018-07-08-at-15.31.49.png)Now you are ready to install the new Rsync version, and can do so as follows:

```
<pre class="wp-block-code">```
brew install rsync
```
```

Once completed, you should sign out and back in to MacOS.

When entering the command below, you will see now that you are using rsync 3.1.3 (at time of writing), instead of rsync 2.6.9. You are no longer running a 12 year old version of Rsync!

```
<pre class="wp-block-code">```
rsync --version
rsync  version 3.1.3  protocol version 31
```
```

As simple as that.