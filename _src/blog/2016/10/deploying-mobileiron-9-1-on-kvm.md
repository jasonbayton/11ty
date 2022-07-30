---
title: 'Deploying MobileIron 9.1+ on KVM'
date: '2016-10-16T20:57:29+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 3360
tag:
    - '9.1'
    - connector
    - core
    - kvm
    - linux
    - mobileiron
    - ubuntu
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/deploying-mobileiron-9-1-on-kvm/98'
tags:
    - Enterprise
    - Guides
---
Recently MobileIron announced the release of Core and Connector version 9.1.0.0 and with it comes the newly-supported option for KVM deployments.

This is good news for enterprises who rely on Linux (well, Ubuntu Linux officially but all the same) as it’s now possible to install both the Core and Enterprise connector without the need for VMWare, Hyper-V or physical hardware.

<div class="bs-callout bs-callout-warning">#### MobileIron Sentry support

To date there has been no update for the MobileIron Sentry. Due to this, the following guide will not be relevant and any installations will not be supported by MobileIron

</div>Prerequisites
-------------

### MobileIron

Core version: 9.1.0.0  
Connector version: 9.1.0.0

### Linux host

Flavour: Ubuntu Server  
Server version: 14.04 or above  
QEMU version: 2.0.0 or above

This guide assumes a fresh copy of Ubuntu server 14.04.4 or newer has been installed, but not yet modified. Copies of Ubuntu server can be obtained on the [Ubuntu website](http://ubuntu.com/server). The server should be accessible either directly or via SSH. It also goes without saying the MobileIron ISO has been downloaded and is readily available for installation. To get a copy of the MobileIron software please speak to your MobileIron account manager.

Recommended installation
------------------------

MobileIron recommend using Virtual Machine Manager (virt-manager) version 0.9.5 or above and installation via GUI. However, this guide will also include steps for installation via commandline and remote Virtual Machine Viewer (virt-viewer) on Windows (referred to as “Remote Viewer”).

Installation
------------

### Ubuntu server QEMU packages

From the command line, install QEMU KVM, virt-install and bridge utilities:

`sudo apt-get install qemu-kvm qemu virtinst bridge-utils`

### Setup the network bridge

A network bridge will allow the VM to look and behave as if it’s sitting directly on the LAN. This avoids issues with port forwarding from host to guest. This step is optional, but recommended.

`sudo vim /etc/network/interfaces`

Edit the file by first typing **i**. This will display **INSERT** in the lower left corner and allows editing of the document.

A typical interfaces file will look as follows:

```
# The primary network interface

auto ens33
iface ens33 inet dhcp
```

In order to create the bridge, the primary interface (referred to above as **ens33**) will need to be set to **manual** and the new bridge interface **br0** setup below:

```
# The primary network interface

auto ens33
iface ens33 inet manual

auto br0
iface br0 inet static
    address 192.168.0.150
    netmask 255.255.255.0
    network 192.168.0.0
    broadcast 192.168.0.255
    gateway 192.168.0.1
    dns-nameservers 192.168.0.1
    dns-search localdomain
    bridge_ports ens33
```

In the above example, the bridged interface **br0** has been assigned a static network IP based on the LAN in which it sits. **Netmask**, **network** and **broadcast** must reflect the properties of the LAN network, while **gateway** and the **DNS server(s)** should echo those that are already present in the network.

DNS search is optional, but provides the server a simple way to search for other servers in the same domain on the LAN.

Most importantly, **bridge\_ports** is set to **ens33** – the physical NIC of the server.

When complete, tap the **Escape** key, **:wq** and exit with **Enter**.

At this point, either reboot the server or restart the networking service to enforce the changes made to the network configuration:

`sudo reboot`

Install MI connector via VMM
----------------------------

From a remote \*nix machine running virt-manager, ensure key-based authentication is set up first to avoid connection errors (that is to say, you can `ssh user@ip` without needing to input the password from a terminal) then connect to the KVM server by clicking **File &gt; Add Connection** and inputting the relevant user and hostname (as well as checking the checkbox for **Connect to remote host**).

[![image-1](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/10/image-1.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/10/image-1.png)

As an example, if the SSH user with key-based authentication is **jason** and the host is **10.10.10.98**, these make up the username and hostname respectively.

Click **Connect** when done.

To create a new virtual machine, right click on the remote host and click **New**

[![image-2](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/10/image-2.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/10/image-2.png)

Follow the prompts through 1 to 5 using the following screenshots as a guide:

[![image-3](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/10/image-3.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/10/image-3.png)

[![image-4](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/10/image-4.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/10/image-4.png)

[![image-5](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/10/image-5.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/10/image-5.png)

[![image-6](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/10/image-6.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/10/image-6.png)

[![image-7](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/10/image-7.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/10/image-7.png)  
*Recall the bridge created earlier – this can be now selected under **Network selection***

Click **Finish** to create the virtual machine.

The MobileIron installation can now continue as normal by typing `vm-install` at the prompt in the newly-opened console window.

[![image-8](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/10/image-8.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/10/image-8.png)

Install MI connector via CLI
----------------------------

Following the reboot of the KVM host, log back in.

<div class="bs-callout bs-callout-danger">#### Time limit!

Before running the following command, ensure you have the **Remote Viewer** application installed on your remote machine. You will have 30 seconds to open the remote viewer and input the **vm-install** command on the MobileIron installer before the system will fail to boot, and the VM configuration file will need to be manually edited to re-add the MobileIron ISO file.

</div>First ensure the MobileIron ISO has been downloaded to the KVM host. If it has been downloaded to a remote \*nix workstation, you can use **SCP** to copy it over using SSH, for example on your workstation:

`scp /home/user/mobileiron-9.1.0.0-64.iso user@10.10.10.98:/home/user/`

If SCP isn’t an option, FileZilla or another SFTP application may also be used.

To create a new VM from the command line, enter the following command; the bold entries need to be customised in order to match the environment:

```
sudo virt-install --name=mobileiron-connector --os-type=linux --network bridge=br0 --vcpus=4 --disk path=/home/user/mobileiron-connector.qcow2,size=20 --cdrom=/home/user/connector-mobileiron-9.1.0.0-64.iso --boot=cdrom,hd --graphics spice,listen=0.0.0.0 --ram=7629 --serial file,path=/home/user/serial
```

Where:

- **name** is the name of the virtual machine
- **os-type** is the type of operating system, like Linux or Windows
- **network** is the network interface to use
- **vcpus** is the number of virtual connectors to provide the virtual machine
- **disk** is the virtual disk path and size which will be created if it doesn’t exist
- **cdrom** is the path to the bootable ISO
- **boot** is the boot order
- **graphics** provides the console for the Remote Viewer application
- **ram** is the amount of RAM to assign to the virtual machine
- **serial** is an optional serial file to pipe the MobileIron serial console

On pressing **Enter** `virt-install` will begin the installation of the virtual machine, and stop on **Domain installation still in progress. Waiting for installation to complete**.

Immediately following this message, a 30 second timer starts on the MobileIron boot screen.

Open **Remote Viewer** and input the connection address:

[![image-9](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/10/image-9.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/10/image-9.png)

By default, this will be `spice://ip-or-host:5900` for the first virtual machine to boot, with the port incrementing by 1 for every virtual machine running. The port can optionally be set manually by editing VM configuration file.

On clicking connect, the Remote Viewer will load the remote console where installation can be continued as normal. If the session disconnects, simply re-open it again.

[![image-10](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/10/image-10.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/10/image-10.png)

—

I hope this guide has been helpful, as always I’m [@jasonbayton](https://twitter.com/jasonbayton) on Twitter, [@bayton.org](https://facebook.com/bayton.org) on Facebook and will also respond to comments below if you have any questions.

*If you spot any errors in the above, or have suggestions on how to improve this guide, feel free to reach out.*