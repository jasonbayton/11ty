---
title: 'Connecting two Synologies via SSH using public and private key authentication'
date: '2018-07-16T11:48:38+01:00'
status: publish
author: 'Joel Scholten'
excerpt: 'A Synology is basically a linux system, in a small case and with a nice web interface to do most basic tasks. For the tasks which do not run by default from the web interface, SSH can be used. This tutorial demonstrates how to set up passwordless SSH between two (or more) Synology boxes. This is very useful for automated tasks, such as automated backups. In this tutorial we will have a local Synology and a remote Synology. The local Synology will be able to connect over SSH without a password, to the remote Synology.'
type: post
id: 6342
tag:
    - ssh
    - synology
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/connecting-two-synologies-via-ssh-using-public-and-private-key-authentication/164'
tags:
    - Guides
---
<div class="bs-callout bs-callout-info"> ![](https://r2_worker.bayton.workers.dev/uploads/2018/07/Joel400.jpg)### Contributing author

 This is one of a series of posts contributed to bayton.org by guest authors. [Click here](https://www.linkedin.com/in/jo%C3%ABl-scholten-9b822b35/) to learn more about Joel. </div>A Synology is basically a linux system in a small case and with a nice web interface that does most basic tasks. For the tasks which do not run by default from the web interface, SSH can be used. This tutorial demonstrates how to set up passwordless SSH between two (or more) Synology boxes. This is very useful for automated tasks, such as backups.

In this tutorial we will have a local Synology and a remote Synology. The local Synology will be able to connect over SSH without a password, to the remote Synology.

Prerequisites
-------------

- Two Synology devices
- SSH client installed on computer 
  - SSH is pre-installed on Mac and Linux
  - Install [Putty](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) when running windows.

### 1. Enable SSH

On a Synology SSH is disabled by default, both because most users don’t require the service and because it offers one additional attack vector if otherwise unused. *SSH must be enabled on both Synologies*.

Sign in to the interface, open the configuration panel, scroll all the way to the bottom and click on **Terminal &amp; SNMP**. Here you can click to enable SSH.

Warning: If you plan on accessing your Synology over the internet, instead of just over the network, I suggest you also enable autoblock once you are finished with this tutorial. I experience more than 1000 sign in attempts from unknown sources, per day.

![](https://r2_worker.bayton.workers.dev/uploads/2018/07/Screen-Shot-2018-07-08-at-16.36.34.png)You can verify if you did this successfully by connecting via SSH. Open the terminal and enter the command below. The username should be replaced with the username you use to sign in to the Synology. The IP address should be replaced by the IP address of the Synology.

```
<pre class="wp-block-code">```
ssh admin@192.168.0.2
```
```

If it asks for a password, you know you’ve succeeded with the first step.

### 2. Enable homes

User homes need to be enabled, because the private and public keys, which we are about to generate, will be stored in the homes of the users. *User homes must be enabled on both Synologies*﻿.

Open the control panel, navigate to *User*﻿, click *Advanced*﻿, scroll all the way down and select *Enable user home service*﻿.

![](https://r2_worker.bayton.workers.dev/uploads/2018/07/Screen-Shot-2018-07-08-at-17.01.24.png)### 3. Generate a public and private key pair on local Synology

You will now generate a *private* and a *public key* on the *local* Synology. Later on we will copy the *public key* to the remote device. The *private key* should never leave the local device. If someone gets hold of your private key, they can access the remote device.

Sign in to the local Synology

```
<pre class="wp-block-code">```
ssh admin@local-synology
```
```

Generate the ssh key pair. Do not add a password on the key. Just hit *Enter*﻿ for every question that the program asks. Do not enter a password. Now a public and private key pair are created!

```
<pre class="wp-block-code">```
ssh-keygen -t rsa
```
```

### 4. Adjust file permissions on local Synology

Because a person with SSH access can do a lot of damage on a linux based system, SSH is very careful with the rights on SSH keys by default. As a security mechanism, SSH will not work without the correct rights assigned.

```
<pre class="wp-block-code">```
sudo chmod 755 /var/services/homes/admin
chmod 700 /var/services/homes/admin/.ssh
chmod 600 /var/services/homes/admin/.ssh/id_rsa
```
```

### 5. Copy public key to remote Synology

Stay signed in to the local device. Copy the public key to the remote device with the following command.

```
<pre class="wp-block-code">```
ssh admin@remote-synology "/bin/cat >> /var/services/homes/admin/.ssh/authorized_keys" < /var/services/homes/admin/.ssh/id_rsa.pub
```
```

### 6. Adjust file permissions on remote Synology

Again, the file permissions need to be set, but this time on the remote device. You can stay signed in to the local device, but this is not necessary.

```
<pre class="wp-block-code">```
ssh admin@remote-synology
sudo chmod 711 /var/services/homes/admin
chmod 700 /var/services/homes/admin/.ssh
chmod 600 /var/services/homes/admin/.ssh/authorized_keys

```
```

### 7. Adjust config file on remote Synology

Now the sshd file must be edited to accept public keys. By default this can only be done with vi. This is a complex editor, but you can also [install](https://www.jimmybonney.com/articles/configure_nano_syntax_highlighting_synology/) the nano editor which is a lot easier to use, if desired.

```
<pre class="wp-block-code">```
ssh admin@remote-synology
sudo vi /etc/ssh/sshd_config
```
```

Three lines are important, which are shown below

```
<pre class="wp-block-code">```
RSAAuthentication yes
PubkeyAuthentication yes

# The default is to check both .ssh/authorized_keys and .ssh/authorized_keys2
# but this is overridden so installations will only check .ssh/authorized_keys
AuthorizedKeysFile  .ssh/authorized_keys
```
```

### 8. Restart ssh on remote Synology

Sign in to the web interface of the remote Synology. Navigate to Terminal &amp; SNMP, uncheck SSH, apply. Check SSH and apply.

You should now be able to SSH from the local device to the remote device without a password!

Uses for passwordless SSH
-------------------------

There are a few great uses for passwordless SSH. First of all, it makes signing in easier, if you do this often. Also it is very useful for automated tasks, such as automated backups and system status dashboards.

Are you using passwordless SSH? What do you use it for? Let me know in the comments!