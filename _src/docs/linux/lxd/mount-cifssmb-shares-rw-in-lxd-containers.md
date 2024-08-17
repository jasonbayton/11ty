---
title: 'Mount CIFS/SMB shares RW in LXD containers'
published: '2017-04-15T22:03:10+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
id: 4133
doccats:
    - LXD
Version:
    - '1.0'
publish_post_category:
    - '16'
discourse_permalink:
    - 'https://discuss.bayton.org/t/mount-cifs-smb-shares-rw-in-lxd-containers/51'
---
One of the biggest limitations with LXD I’ve found to date is the inability to mount remote shares on unprivileged containers. While it’s still not possible at this point to mount CIFS shares from within a container directly, I’ve figured out a way to get around this by first mounting the shares on the LXD host and then using `lxd config device add` to mount them in my containers from there.

So continuing the recent [LXD theme](/search/?q=lxd), in this article we’ll work through mounting CIFs shares read/write on containers.

<div class="callout"> 

#### Before we begin

This guide assumes you already have a CIFS/SMB (referred to only as CIFS in the guide) share set up and ready to mount on your LXD containers. If you don’t, set this up first.

Additionally, a container should be provisioned and ready to use. If this is not the case, create a new LXD Xenial container with the following command before continuing:

`lxc launch ubuntu:xenial c1`

Both the host and containers are Ubuntu 16.04 LTS.

The container name throughout this guide is `c1`. Please change this in any commands you copy into your own terminal.

</div><div class="callout"> 

#### Warning

By following this guide, any mounted CIFS shares will be visible on the LXD host and can be modified by sudo/root user(s). This method is not recommended with private shares on a shared LXD host server. Only continue if you’re happy accepting any risks associated with this configuration.

</div>

## Find the UID/GID of your LXD user

Before we begin to look at mounting the share(s), the first step is to obtain the UID &amp; GID of the user/group you wish to mount the share under within the target container.

In my testing, mounting shares either anonymously (`nouser:nogroup`) or under a user on the host (`jason:jason`) will, when mounted in the container, result in “permission denied” any time file or folder creation is attempted.

```bash
jason@c1:/media/lxd-share$ touch example
touch: cannot touch 'example': Permission denied
```

To obtain the root user `uid`, run the following command:

`sudo ls -la /var/lib/lxd/containers/c1/rootfs/`

This will display the ownership of the root folder `.` and its contents within the container. Note the `uid/gid` of the folder for later (in bold/red below)

```bash
jason@ubuntu-lxd-tut:~$ sudo ls -la /var/lib/lxd/containers/c1/rootfs/root
total 10
drwx------  3 <span style="color: #ff0000;">100000 100000</span>    6 May  2 12:19 .
drwxr-xr-x 22 100000 100000   22 May  2 12:10 ..
-rw-------  1 100000 100000  610 May 10 00:50 .bash_history
-rw-r--r--  1 100000 100000 3106 Oct 22  2015 .bashrc
-rw-r--r--  1 100000 100000  148 Aug 17  2015 .profile
drwx------  2 100000 100000    3 May  2 12:11 .ssh
```

For individual users, if you have any, we can do a simple `ls -l` on the home directories:

`sudo ls -l /var/lib/lxd/containers/c1/rootfs/home/`

```bash
jason@ubuntu-lxd-tut:~$ sudo ls -l /var/lib/lxd/containers/c1/rootfs/home/
total 1
drwxr-xr-x 2 <span style="color: #ff0000;">101001 101001</span> 6 May 10 00:28 jason
drwxr-xr-x 3 101000 101000 6 May  2 12:11 ubuntu
```

Again, note down the uid/gid of the user for later.

## Prepare the host

Having now noted the uid/gid, we can begin setting up the LXD host. In order to mount the CIFS shares within the container, they first need to be mounted on our host.

### Install cifs-utils

In order for us to mount a CIFS share, the host needs to understand what that is. We can install the package `cifs-utils` to achieve this:

`sudo apt-get install cifs-utils`

It’s a big install, consuming ~50MB on the LXD host, so may take a moment to install depending on connection speed and host resources.

### Create the mount points and authentication file

For this guide we’re mounting a CIFS share requiring authentication on a mount point that doesn’t currently exist. This won’t apply to all scenarios and can be skipped/amended as necessary.

#### Mount points

Unless the mount point already exists, when attempting to mount a CIFS share (or any share) we’ll see an error as follows:

```bash
jason@ubuntu-lxd-tut:~$ sudo mount -a
mount: mount point /media/lxd-share does not exist
```

Use `mkdir` to create it:

`sudo mkdir /media/lxd-share`

#### Authentication file

When mounting a CIFS share that requires authentication, it’s possible to put the username and password directly into the fstab entry. However, as everyone can read this file it’s not particularly secure (so I won’t show an example).

An alternative is to create a hidden authentication file in our home directory. Permissions can then be set on this file to prevent anyone else from accessing it:

`vim /home/jason/.cifscreds`

Now we’ll add the CIFS credentials as follows (yes, just the two lines in an otherwise empty file):

```bash
username=jason
password=lxd-password
```

Then save the file and set permissions:

`chmod 600 /home/jason/.cifscreds`

### Edit fstab

With the host now aware of how to interpret CIFS shares in fstab, our mount point set up and our credentials file created, we can now add the share to /etc/fstab as follows:

```bash
#lxd-share
//192.168.0.44/lxd-share /media/lxd-share cifs credentials=/home/jason/.cifscreds,uid=101001,gid=101001,iocharset=utf8,sec=ntlm 0 0
```

Where:

`//192.168.0.44/lxd-share` is the remote CIFS share  
`/media/lxd-share` is the local LXD host mount point  
`cifs` is the mount type  
`credentials=/home/jason/.cifscreds` is our credentials file  
`uid=101001,gid=101001` is the uid/gid of the lxd container user

With that file saved, we should be able to mount the share using `sudo mount -a`

```bash
jason@ubuntu-lxd-tut:/$ sudo mount -a
jason@ubuntu-lxd-tut:/$
```

Finally, feel free to check the CIFS share is mounted with the correct uid/gid using `ls -l /media/`

```bash
jason@ubuntu-lxd-tut:/$ ls -l /media/
total 8
drwxr-xr-x  2 root   root   4096 May  1 22:27 cdrom
drwxr-xr-x+ 2 101001 101001    0 May 10 09:12 lxd-share
```

## Mount the share in an LXD container

Now the CIFS share is mounted on the LXD host, we can use `lxc config device add` to mount the share as a device within our LXD container:

```bash
jason@ubuntu-lxd-tut:/$ lxc config device add c1 lxdshare disk source=/media/lxd-share path=/media/lxd-share
Device lxdshare added to c1
```

Where:

`c1` is our LXD container  
`lxdshare` is the unique name we’re providing for this device  
`disk` is the device type  
`source=/media/lxd-share` is the LXD host source file path  
`path=/media/lxd-share` is the LXD container destination file path

Finally, we’ll log into the the LXD container with `lxc exec c1 bash` and make sure everything is working OK.

First, check the device exists and is assigned to the correct user with `ls -l /media/`

```bash
root@c1:~# ls -l /media/
total 1
drwxr-xr-x+ 2 jason jason 0 May 10 08:12 lxd-share
```

Now we’ll check we can read from and write to the share:

```bash
root@c1:~# ls -l /media/lxd-share/
total 5848
-rwxr--r--+ 1 jason jason 5987895 Feb 18 13:05 getting_started.pdf

root@c1:~# touch /media/lxd-share/example

root@c1:~# ls -l /media/lxd-share/
total 5848
-rw-r--r--+ 1 jason jason       0 May 10 09:35 example
-rwxr--r--+ 1 jason jason 5987895 Feb 18 13:05 getting_started.pdf

root@c1:~# rm /media/MI_SHARE/example
root@c1:~#
```

You can see from the output above I first checked to see what was already on the share. It’s readable.  
I then created the file “example” on the share and promptly deleted it. It’s writeable.

Success!

## Conclusion

As with the process of setting up [LXD, ZFS and bridged networking on Ubuntu 16.04 LTS](/2016/05/lxd-zfs-and-bridged-networking-on-ubuntu-16-04-lts/) this is a little long-winded. Again though, it’s not overly complex.

I’ve been using this method for a number of months on my home lab to share several directories from my storage server to various containers. It’s stable and feels no different to any other native directory within the container.

Are you brand new to LXD? I thoroughly recommend you take a look at LXD developer [Stéphane Graber’s incredible LXD blog series](https://www.stgraber.org/2016/03/11/lxd-2-0-blog-post-series-012/) to get up to speed.  
Ready to try something more challenging? Opt in to enable experimental fuse and ext4 mounts in on 16.04 by following [this excellent guide](https://www.forshee.me/2016/02/22/container-mounts-in-ubuntu-1604.html) by Seth Forshee.
