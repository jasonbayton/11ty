---
title: 'Installing Nextcloud on Ubuntu 16.04 LTS with Redis, APCu, SSL & Apache'
date: '2016-07-26T18:24:14+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 3099
tag:
    - '16.04 LTS'
    - apache
    - APCu
    - caching
    - container
    - nextcloud
    - owncloud
    - redis
    - Server
    - ubuntu
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/installing-nextcloud-on-ubuntu-16-04-lts-with-redis-apcu-ssl-apache/103'
tags:
    - Guides
---
A few weeks ago the self-hosted community witnessed the public launch of Nextcloud, an (as of writing) already vastly-improved fork of ownCloud. Having almost finished migrating data on my home server to Nextcloud and experimenting with some of the more optional features such as caching, pretty links, theming and more, I felt it would be a good time to document some of this in one simple-to-follow guide.

What is Nextcloud?
------------------

As mentioned above Nextcloud is a recent fork of ownCloud that’s already quickly becoming the newer, better and faster-developed alternative to the self-hosted cloud storage software of old. If you’re an ownCloud user and have ever been frustrated by the dual licenses, the paid vs free model and – as part of it – lack of some of the better features, Nextcloud have gone completely FOSS (Free and Open-Source Software) following the Red Hat model of charging for enterprise support rather than enterprise features.

Some of the previously enterprise-only features released as part of the standard FOSS Nextcloud installation include FileDrop, an alternative to Dropbox’s “File Requests” and LibreOffice online, an alternative to Google Docs or Office Online. Upcoming release v.10 will bring two-factor authentication, improved federation and more.

In this guide
-------------

After completing this guide we’ll have the following:

- A newly installed Nextcloud server
- PHP caching provided by ACPu and Redis for a notable speed increase when navigating even the largest thumbnail-heavy folders
- Pretty links that remove /index.php from the URL
- SSL-enabled with default self-signed certificates and all non-HTTPS traffic redirected

Environment
-----------

For this guide Nextcloud will be installed on a remote server provided by [ElasticHosts](/2016/05/elastichosts-review/); their systems are super flexible, scale up and down as required and remain very affordable. Here’s the server spec:

### Hardware

Nextcloud don’t (as of writing) provide a lot of detail for minimum recommended spec, only advising 512MB of RAM. As the server is a full VPS and not simply a container, we’ll provide a bit of a buffer to avoid any possible contention.

- 1GHz CPU
- 1GB RAM
- 20GB HDD

20GB of disk will be enough for this guide, but naturally the amount chosen should reflect the amount of data to be stored. Furthermore, if redundancy isn’t offered as standard it’s always a good idea to mirror/RAID the storage area to avoid downtime as best as possible. Typically this is only a consideration required with dedicated servers, but there’s no harm in checking.

<div class="callout callout-warning"> 

#### Plan backups

No matter what level of redundancy is set up, it’s not a replacement for a good backup strategy. Never assume data is safe in a remote datacentre as usually providers offer no liability or responsibility for lost data should a server fail.

</div>

### Software

- Ubuntu server 16.04 LTS with root access
- Apache2 2.4.18
- PHP 7.0
- mySQL 5.7.13
- Nextcloud 9.0.53 ( current at time of writing, though the install process can be followed for 10.\*, 11.\* and future versions also)

Besides the above-mentioned packages and their respective dependencies, we should aim to keep the amount of additional software installed to a minimum; the Ubuntu-minimal image is a good place to start here as it requires adding packages after installation rather than sifting through and removing those that aren’t required. From a security perspective this is advised in order to lower to attack surface should an exploit allow a 3rd party to gain shell access to the server – the fewer additional services an attacker can latch onto, the lower the chance of gaining root and doing any real damage. In this case, ElasticHosts offer a relatively minimal install, meaning there’s no requirement to upload an Ubuntu-minimal ISO to install from.

Due to the advanced requirements in this guide, root access to the 16.04 instance is mandatory.

Setting up the environment
--------------------------

*For those with a functioning Ubuntu server and required components, please skip to step 4.*

First we need to spin up a VM. As the server is provided by ElasticHosts the first few steps will run through the configuration and imaging of the new server.

### 1. Spin up the virtual server

After logging into the ElasticHosts console, select **Add** followed by **Server** under *Virtual Machines.*

![img.1](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.1.png)

In the new modal, define the server spec to that listed under Hardware above.

![img.2](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.2.png)

For **Type** select **Pre-installed system**, for **Image** select **Ubuntu 16.04 LTS (Xenial Xerus)**. Click **Add** when done.

### 2. Assign a static IP

Like AWS, new servers are created with a dynamic IP. As we want to permanently assign a hostname to this server for web access to Nextcloud, we’ll assign a static IP. If one isn’t already assigned to the account, create a new static IP from the **Add** menu.

![img.3](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.3.png)

Once a static IP is available, enter the newly-created (and still powered off) server settings by clicking the “cog” icon under the power button. This will open a new page.

![img.4](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.4-e1469525129465.png)

Under **Network** select the static IP from the dropdown menu and click the relevant IP under **Allowed IPs**.

<div class="callout callout-info">

#### Manage open ports

Now would also be a good time to edit the **Firewall** settings in order to block unwanted traffic on a network level before reaching the VM. For the Nextcloud instance we only need ports 22 (SSH), 80 (HTTP) and 443 (HTTPS) which can be input in **Open ports**. As this is a paid add-on, an alternative would be to configure `iptables` / `ufw` / `firewalld` on the Ubuntu server at a later time.

</div>

Click **Save** and **Start** to boot up the server for the first time.

At this point it would be a good idea to create a DNS entry for the server. For this guide we’ll use nc.bayton.org (NB, this link is just an example used for the guide and doesn’t resolve. Clicking it won’t go anywhere)

### 3. Connect to the server

After clicking **Start** the button will change to **Connect**. On clicking this, a new window will open with server connection details:

![img.5](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.5.png)

Using an SSH client, SSH to **toor@ip** and use the **VNC/****toor** password provided.

<div class="callout callout-warning"> 

#### Disable the root account

As soon as it’s convenient to do so, disable the root/toor account from logging in over SSH. A quick, simple way to do this in Ubuntu is to disable the account as follows from a different sudo-enabled account (which would need to be created first):

`sudo passwd root -l`

Furthermore, consider switching from password to key authentication as soon as possible.

</div>

### 4. Update the server &amp; install LAMP, APCu, Redis

As this is a brand new installation based on images that don’t update very often, it’s a good idea to upgrade the server before we begin:

`apt update && apt upgrade`

![img.6](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.6.png)

When the update has completed, it’ll provide a list of packages to be upgraded. Providing we’re happy with what we see, tap **Enter.**

![img.7](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.7.png)

With the server updated, a non-root user created with sudo privileges and the root account disabled, we’ll now install the required components for Nextcloud:

`sudo apt install lamp-server^`

<div class="callout callout-info">

#### Meta packages

The use of ^ (caret) in the package name is important. It suggests that the installed package is a ‘meta-package’, meaning a number of programs that are usually installed together.

</div>

This command will install apache2, mysql 5.7 and php7.0 along with several php/apache modules to ensure seamless collaboration between the packages. Once happy with the package selection to be installed, tap **Enter**.

![img.9](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.9.png)

MySQL will request a `root` user password. Ensure this is strong and keep the password safe; losing it can cause all manner of issues.

![img.10](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.10.png)

Once installed, we’ll now install APCu and Redis:

`sudo apt install php-apcu redis-server php-redis`

Confirm the packages to be installed match expectations and hit **Enter**.

![img.12](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.12.png)

Finally, we’ll install the minimal Nextcloud PHP modules required not to error during installation (more can be enabled later):

`sudo apt install php-zip php-dompdf php-xml php-mbstring php-gd php-curl`

![img.16](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.16-1.png)

And enable a few apache modules to support our configuration:

`sudo a2enmod rewrite headers env dir mime`

Now we’ll restart Apache:

`sudo service apache2 restart`

![img.19](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.19.png)

Before moving on check via a browser that Apache is up and running

![img.13](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.13.png)

### 5. Enable SSL

With the server currently running over HTTP port 80, we can now additionally configure SSL to ensure the Nextcloud installation is secure.

#### 5.1. Let’s Encrypt

Let’s Encrypt offers completely free SSL certificates for securing websites. The client is entirely command line based offering simple setup and automated renewal via cron.

First, choose a location (such as `/home/user/`), download the Let’s Encrypt client and set it as executable:

`sudo wget https://dl.eff.org/certbot-auto && sudo chmod a+x certbot-auto`

Next, run the client:

`sudo ./certbot-auto --apache --agree-tos --email <strong>user</strong><strong>@domain.org</strong> --redirect -d <strong>nc.bayton.org</strong>`

Where:  
`--apache` uses the Apache plugin to fully setup and integrate with the existing Apache configuration  
`--agree-tos` simply pre-agrees to the TOS, preventing it popping up during installation  
`--email` is the email address to register against the certificate (used for reminders by Let’s Encrypt)  
`--redirect` will create both the SSL virtualhost configuration file and add a redirect for HTTP traffic to HTTPs (80 to 443)  
`-d` is the domain to secure

On first run the Let’s Encrypt certbot will install all required dependencies (following approval), however with the added flags above, will not require any further input to set everything up.

[![lesetup](https://r2_worker.bayton.workers.dev/uploads/2016/07/lesetup.png)](/https://r2_worker.bayton.workers.dev/uploads/2016/07/lesetup.png)

Navigating now to https://nc.bayton.org will show a SSL-enabled website! If the browser complains the site is not fully protected at this point, it’s due to the default Apache landing page requesting content over HTTP and not an issue with the certificate.

That’s all there is to it. Let’s Encrypt handles everything from certificate generation to Apache configuration, meaning nothing needs to be done beyond what’s documented above. The manual process (below) is far more involved.

One step from the manual process which is recommended is to add the following snippet to the Let’s Encrypt-created vhost.conf file in the same way as is documented in 5.2:

```
     <Directory <strong>/var/www/html/</strong>>
       Options +FollowSymlinks
       AllowOverride All

      <IfModule mod_dav.c>
        Dav off
      </IfModule>

       SetEnv HOME <strong>/var/www/html</strong>
       SetEnv HTTP_HOME <strong>/var/www/html</strong>
     </Directory>

     <IfModule mod_headers.c>
          Header always set Strict-Transport-Security "max-age=15768000; preload"
     </IfModule>
```

The text above may be pasted under the `ServerName` line in the file located at:

`/etc/apache2/sites-available/000-default-le-ssl.conf`

As the certificate currently expires after 90 days by default, to automatically renew the certificate let’s create a cronjob:

`sudo crontab -e`

This will open the crontab file for the root user (as `sudo` was used) meaning `sudo` (and as such, password authentication) won’t need to be used when running the renew command. Add the following line to the crontab file:

`0 0 * * 0 <strong>/home/jason/</strong>certbot-auto renew`

Edit the area in bold, then `Ctrl` + `X` to quit followed by `Y` to save the file.

*Skip 5.2 and continue to Installing Nextcloud.*

#### 5.2. Manual

We’ll begin by enabling the SSL module for Apache:

`sudo a2enmod ssl`

Apache sets up self-signed certificates as part of the installation, so for this guide we’ll use those. They can be replaced at any time with functioning 3rd party certificates by editing the vhost file we’ll create next.

`sudo vim /etc/apache2/sites-available/nextcloud.conf`

Insert the following (all items in bold can be changed to suit the environment):

```
<IfModule mod_ssl.c>
   <VirtualHost _default_:443>

     ServerAdmin <strong>jason@bayton.org</strong>
     ServerName <strong>nc.bayton.org</strong>
     DocumentRoot <strong>/var/www/html

     </strong><Directory <strong>/var/www/html/</strong>>
       Options +FollowSymlinks
       AllowOverride All

      <IfModule mod_dav.c>
        Dav off
      </IfModule>

       SetEnv HOME <strong>/var/www/html</strong>
       SetEnv HTTP_HOME <strong>/var/www/html</strong>
     </Directory>

     <IfModule mod_headers.c>
          Header always set Strict-Transport-Security "max-age=15768000; preload"
     </IfModule>

     SSLEngine on
     SSLCertificateFile <strong>/etc/ssl/certs/ssl-cert-snakeoil.pem</strong>
     SSLCertificateKeyFile <strong>/etc/ssl/private/ssl-cert-snakeoil.key</strong>

   </VirtualHost>
</IfModule>
```

Save and quit, then enable the new configuration:

`sudo a2ensite nextcloud.conf`

Now restart Apache:

`sudo service apache2 restart`

SSL should now be enabled, allowing us to navigate to https://nc.bayton.org when we install Nextcloud later. Of course the page will show an error as the certificates are not trusted. [Let’s Encrypt](https://letsencrypt.org/) offer free SSL certificates and Mozilla offer a [tool](https://wiki.mozilla.org/Security/Server_Side_TLS) to help correctly set up SSL on the server. Check them out for more information.

Optionally, we can also force a redirect from non-SSL to SSL with the following:

`sudo vim /etc/apache2/sites-available/nc-redir.conf`

Insert the following (all items in bold can be changed to suit the environment):

```
<VirtualHost *:80>
   ServerName <strong>nc.bayton.org</strong>
   ServerAdmin <strong>jason@bayton.org</strong>

   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}$1 [R=301,L]
</VirtualHost>
```

Save and quit, then enable the new configuration:

`sudo a2ensite nc-redir.conf`

Then disable the default configuration:

`sudo a2dissite 000-default.conf`

Then restart Apache:

`sudo service apache2 restart`

With that, all traffic will be forced to HTTPS.

![img.29](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.29.png)

Install Nextcloud
-----------------

With the server environment ready (excluding some final NC-related configurations) we’ll move on to installing Nextcloud itself.

### 1. Download Nextcloud

Change to the webroot directory at `/var/www/html` with `cd /var/www/html`

Download Nextcloud via command line with `sudo wget https://download.nextcloud.com/server/releases/latest.zip`  
NB: future versions can be obtained from [Nextcloud](https://nextcloud.com/install/)

Unpack the compressed zip with `sudo unzip latest.zip<br></br>`

![img.14](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.14.png)

As shown above with `ls` there’s now a `nextcloud` folder situated under `/var/www/html/` but currently root owns it. We can change that:

`sudo chown -R www-data:www-data /var/www/html/nextcloud`

Now the Apache account, **www-data**, will have write-access to the Nextcloud installation directory.

### 2. Create the Nextcloud database

<div class="callout callout-info">

#### This is optional

By default, Nextcloud can create a database and database user when supplying the root user and password in the Nextcloud web-based installer. The following steps are intended for either someone who wants to create their own database or does not want to supply Nextcloud with the root account credentials.

</div>

Before switching to Chrome to run the web-based installer, we’ll first create a database.

We can open a session with mysql by running the command `mysql -u root -p` and providing the root password we entered earlier.

![img.17](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.17.png)

Now we’ll create a dedicated database and user for Nextcloud with the following commands:

```
CREATE DATABASE nextcloud;
CREATE USER 'ncuser'@'localhost' IDENTIFIED BY 'ncpassword';
GRANT ALL PRIVILEGES ON nextcloud . * TO 'ncuser'@'localhost';
```

Then exit the mysql session with `quit`

![img.18](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.18.png)

### 3. Install Nextcloud

Open up a browser and navigate to ***ip-or-hostname**/nextcloud*. Hopefully by this point a DNS entry has propagated; we’ll navigate to nc.bayton.org/nextcloud to continue installation.

![img.20](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.20.png)

Success! The Nextcloud installation screen is there and showing no errors. Installation from here is simple:

1. Provide a username and secure password for the admin account.
2. Select a location for the data directory.
3. Provide the database user we configured earlier: **ncuser**
4. Provide the database user password: **ncpassword**
5. Provide the database name: **nextcloud**
6. Confirm the database is on localhost (it is).

When selecting a location for the data directory, keeping it in the webroot is really only OK providing `.htaccess` rules work. If they do not, as is the case at this point due to the way Apache is setup by default, or fail at any point in the future, the data directory will be **publicly visible**. We don’t want that.

Ideally it’s best practice to situate the data directory outside of `/var/www/` in a location inaccessible for guests browsing the website. Where it’s ultimately placed is at the discretion of the administrator, though wherever it ultimately sits ensure the user `www-data` can write to it in its final location with:

`sudo chown -R www-data:www-data /path/to/data`

Scroll down and click **Finish Setup**.

![img.21](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.21.png)

Configuration
-------------

As it stands currently, Nextcloud isn’t very happy.

![img.22](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.22.png)  
*Ignore the HTTP error, this will disappear when we access the site over HTTPS.*

### 1. Enable .htaccess

The `.htaccess` file doesn’t work because we’ve put Nextcloud in the main `/var/www/html` webroot controlled by the `apache.conf` file. By default it is set to disallow `.htaccess` overrides and we’ll need to change that:

`sudo vim /etc/apache2/apache2.conf`

Then change

```
<Directory /var/www/>        
        Options Indexes FollowSymLinks
        AllowOverride <strong>None</strong>
        Require all granted
</Directory>
```

To

```
<Directory /var/www/>
        Options Indexes FollowSymLinks
        AllowOverride <strong>All</strong>
        Require all granted
</Directory>
```

Save and quit, then restart Apache with:

`sudo service apache2 restart`

### 2. Enable caching

The difference in speed between a Nextcloud server without cache and one with is huge. Particularly as the file and folder counts increase and more multimedia files make their way onto the server, caching becomes increasingly important for maintaining speed and performance. ACPu will handle a lot of the caching initially, leaving Redis to manage file locking. As the server grows and ACPu demands more resources, we could configure Redis to take a more active role in distributed caching. Having installed both APCu and Redis earlier, we’ll now configure them.

First, open the Redis configuration file at `/etc/redis/redis.conf`

`sudo vim /etc/redis/redis.conf`

Now, find and change:

`port 6379` to `port 0`

Then uncomment:

`unixsocket /var/run/redis/redis.sock`  
`unixsocketperm 700` changing permissions to 770 at the same time: `unixsocketperm 770`

Save and quit, then add the Redis user `redis` to the `www-data` group:

`sudo usermod -a -G redis www-data`

Finally, restart Apache with:

`sudo service apache2 restart`

And start Redis server with:

`sudo service redis-server start`

With Redis configured, we can add the caching configuration to the Nextcloud config file:

`sudo vim /var/www/html/nextcloud/config/config.php`

![img.23](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.23.png)

Add the following:

```
'memcache.local' => '\OC\Memcache\APCu',
'memcache.locking' => '\\OC\\Memcache\\Redis',
'filelocking.enabled' => 'true',
'redis' => 
array (
'host' => '/var/run/redis/redis.sock',
'port' => 0,
'timeout' => 0.0,
),
```

A reboot may be required before the configuration change takes effect, but before we do we’ll make sure Redis is enabled to start on boot with:

`sudo systemctl enable redis-server`

Caching is now configured.

With both of these now resolved, the admin interface is looking a lot healthier:

![img.30](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.30-e1469692669146.png)

### 3. Pretty links

Much like theming, pretty links aren’t mandatory, but they add to the overall aesthetics of the server.

Most of the hard work was already done during the setup of the environment with the enabling of `mod_env` and `mod_rewrite`, however to complete the removal of index.php in every URL, re-open the Nexcloud config file:

`sudo vim /var/www/html/nextcloud/config/config.php`

Add `'htaccess.RewriteBase' => '/nextcloud',` (where nextcloud is the location of the installation) below one of the existing configuration options and finally, from `/var/www/html/nextcloud`, run:

`sudo -u www-data php occ maintenance:update:htaccess`

From:

![img.25](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.25.png)

To (don’t simply refresh the page, remove index.php from the URL and load the page again, otherwise it looks like it doesn’t work):

![img.26](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.26.png)

### 4. Max upload

Until we try to upload files this is easy to miss. By default PHP ships with a file-upload limitation reminiscent of file sizes in the early 2000’s – 2MB. As we’re installing a personal cloud that may hold on to files gigabytes in size, we can change the PHP configuration to allow far more flexibility.

Open the `php.ini` file:

`sudo vim /etc/php/7.0/apache2/php.ini`

Locate and amend:

```
upload_max_filesize = <strong>2048M</strong>
post_max_size = <strong>2058M</strong>
```

The max size can be tweaked to suit, however be sure to always give post\_max\_size a bit more than upload\_max\_filesize to prevent errors when uploading files that match the maximum allowed upload size.

Restart Apache:

`sudo service apache2 restart`

Log into the admin area of Nextcloud, navigate to **additional settings** and ensure the max upload setting there reflects the change made to the php.ini file (in this example, 2GB):

[![filehandling](https://r2_worker.bayton.workers.dev/uploads/2016/07/filehandling.png)](/https://r2_worker.bayton.workers.dev/uploads/2016/07/filehandling.png)

### 5. Server-side encryption

As we’re running our Nextcloud installation on a remote host, far outside the confines of our internal network, it’s a really good idea to enable server-side encryption. This guarantees that should anyone gain access to the data hosted on the server, it won’t be readable.

<div class="callout callout-danger"> 

#### Encryption can lead to data loss

While the likelihood is small, should we lose our encryption keys and not set recovery via password, all encrypted data will be impossible to unencrypt.

</div>

First we’ll enable the default encryption app:

1. Click the **Files** link and switch to **Apps**
2. Click **Not enabled** from the side-menu
3. Click **Enable** on the **Default encryption module**

![img.32](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.32.png)

Next we’ll log into the Nexcloud administration area and navigate to **Server-side encryption**. Click **Enable server-side encryption**:

![img.31](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.31.png)

After reading through the warnings, click **Enable encryption**. We now need to log out and back in:

![img.33](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.33.png)

After logging back in and returning to this area, it will be possible to create a global recovery key:

![img.34](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.34.png)

However, if a global recovery key is considered too all-powerful, individual users may also recover encrypted files with their password by setting the following option to **Enabled** in **Personal** located when clicking the username in the top-right of the screen:

![img.35](https://r2_worker.bayton.workers.dev/uploads/2016/07/img.35.png)

All data will now be encrypted at rest, as well as protected in transit when using SSL.

Conclusion
----------

So following this guide we now have a new virtual server running Nextcloud on Ubuntu 16.04 supporting both caching and pretty links.

While this is yet another long-winded guide, as usual there’s nothing here I would consider to be overly complex which, for a platform that empowers self-hosting data, is a big plus over other solutions.

Want to know more about Nextcloud? Visit [nextcloud.com](https://nextcloud.com) or their thriving support community at [help.nextcloud.com](https://help.nextcloud.com). I’m [@JasonBayton](https://help.nextcloud.com/users/JasonBayton) there if you’d like to start a discussion about this guide or Nextcloud in general!

I hope this guide has been helpful, as always I’m [@jasonbayton](https://twitter.com/jasonbayton) on Twitter, [@bayton.org](//facebook.com/bayton.org) on Facebook and will also respond to comments below if you have any questions. I’d also like to know if you successfully installed Nextcloud following this guide, leave a comment below!

*If you spot any errors in the above or have suggestions on how to improve this guide, feel free to reach out./*