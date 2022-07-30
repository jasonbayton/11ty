---
title: 'Set up a network bridge &#8211; Ubuntu 12.04 LTS +'
date: '2016-10-01T17:07:09+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 3302
tag:
    - bridge
    - LXD
    - networking
    - ubuntu
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/set-up-a-network-bridge-ubuntu-12-04-lts/101'
tags:
    - Guides
---
<div class="bs-callout bs-callout-info">#### Article extract

The following is a modified extract from [LXD, ZFS and bridged networking on Ubuntu 16.04 LTS](/2016/05/lxd-zfs-and-bridged-networking-on-ubuntu-16-04-lts/). As bridged networking is quite a popular topic I felt it’s worth its own post to reduce the need to go looking for it in the longer guides I’ve written. I’ll also link to it from new guides going forward.

**NB:** Ubuntu 12.04 LTS is the earliest release I’ve used this with. It should work on earlier versions as well, but your mileage may vary.

</div>Installation
------------

In order to set up a network bridge, the package `bridge-utils` needs to be installed. Install it with:

`sudo apt-get install bridge-utils`

The output should look similar to below:

```
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following NEW packages will be installed:
  bridge-utils
0 upgraded, 1 newly installed, 0 to remove and 16 not upgraded.
Need to get 28.6 kB of archives.
[...]
Preparing to unpack .../bridge-utils_1.5-9ubuntu1_amd64.deb ...
Unpacking bridge-utils (1.5-9ubuntu1) ...
Processing triggers for man-db (2.7.5-1) ...
Setting up bridge-utils (1.5-9ubuntu1) ...
```

<div class="bs-callout bs-callout-danger">#### This is mandatory

If `bridge-utils` isn’t installed before moving on, it won’t be possible to bring up the new bridge and will likely result in loss of network access entirely.

</div>Configuration
-------------

With the `bridge-utils` package installed, begin by opening `/etc/network/interfaces` in a text editor. I like vim:

`sudo vim /etc/network/interfaces`

```
# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
auto eth0
iface eth0 inet dhcp
```

This is the default `interfaces` file. Within this file add a new bridge named `br0`. The simplest edit to make is as follows (note the emphasis):

```
# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
auto <strong>br0</strong>
iface <strong>br0</strong> inet dhcp
    <strong>bridge_ports eth0</strong>

iface eth0 inet <strong>manual</strong>
```

This will set the `eth0` interface to *manual* and create a new bridge that piggybacks directly off it.  
If you wish to create a static interface while you’re editing this file, the following may help you:

```
# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
auto br0 
iface br0 inet static
        address 192.168.0.44
        netmask 255.255.255.0
        network 192.168.0.0
        broadcast 192.168.0.255
        gateway 192.168.0.1
        # dns-* options are implemented by the resolvconf package, if installed
        dns-nameservers 8.8.8.8 8.8.4.4 #google-dns
        dns-search localdomain.local #optional-line
        # bridge options
        bridge_ports eth0
iface eth0 inet manual
```

Following any edits, it’s a good idea to restart the interfaces to force the changes to take place. Obviously if you’re connected via SSH this will disconnect your session. You’ll need to have physical access to the machine/VM.

`sudo ifdown eth0 && sudo ifup eth0 && sudo ifup br0`

Running `ifconfig` on the CLI will now confirm the changes have been applied:

```
jason@ubuntu-lxdzfs:~$ ifconfig
<b>br0</b>       Link encap:Ethernet  HWaddr 00:0c:29:2f:cd:30  
          inet addr:192.168.0.44  Bcast:192.168.0.255  Mask:255.255.255.0
          inet6 addr: fe80::20c:29ff:fe2f:cd30/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:2235187 errors:0 dropped:37359 overruns:0 frame:0
          TX packets:111487 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000 
          RX bytes:2108302272 (2.1 GB)  TX bytes:8296995 (8.2 MB)

eth0      Link encap:Ethernet  HWaddr 00:0c:29:2f:cd:30  
          inet6 addr: fe80::20c:29ff:fe2f:cd30/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:161568870 errors:0 dropped:0 overruns:0 frame:0
          TX packets:132702 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000 
          RX bytes:185204051222 (185.2 GB)  TX bytes:23974566 (23.9 MB)

[...]
```

If for any reason no changes have applied, or `ifconfig` returns no IPv4 addresses at all, please double check the configuration and optionally give the host a reboot.

Congratulations, you now have a bridged network with which to provide direct LAN access to your virtualised guests!

I hope this has been helpful, as always I’m [@jasonbayton](https://twitter.com/jasonbayton) on Twitter, [@bayton.org](https://facebook.com/bayton.org) on Facebook and will also respond to comments below if you have any questions.

*If you spot any errors in the above, or have suggestions on how to improve this guide, feel free to reach out.*