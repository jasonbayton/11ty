---
title: 'Switching to HTTPS on WordPress'
date: '2016-01-31T00:56:24+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 2411
tag:
    - http
    - https
    - security
    - ssl
    - Wordpress
post_format: []
post_views_count:
    - '314'
tags:
    - Guides
---
Security and privacy have been on the minds of many over the last few years and we’re watching as the internet gradually migrates to HTTPS as standard. I’ve been considering this switch myself for quite some time – despite not *really* having a website that requires a secure connection – but fearing it would be a nightmare to execute I ultimately put it off, repeatedly.

Following Google’s choice to favour HTTPS traffic (even if only marginally), and to get 2016 off to a good start I figured I’d take the plunge. It was nowhere near as frightening as I thought it was going to be, ultimately taking about 2 hours of combined research and execution before eventually clicking the final switch to convert everything over.

Here’s how I did it, and how you can do it too.

Note: I have full access to my server over SSH, with root access to the directories in which I’ll be making changes and full control over my database. This guide relies on these prerequisites and as such is not necessarily useful for a hosted environment using cPanel or similar.

Be sure to make backups before attempting any changes outlined below. Failure to do so may lead to data loss and/or a website that cannot be reached. I will not be held responsible for any changes you make which result in problems.

Obtain an SSL certificate
-------------------------

I don’t intend on going into depth about obtaining an SSL certificate, it’s so widely covered online there’s no point in repeating it; a quick Google search will reveal technical guides that go into far more detail than I would, I will however say:

- I use Ubuntu server and Apache
- I used OpenSSL to generate the CSR
- I opted for a wildcard certificate to cover this and any subdomains I feel like using (I use many for work and play)
- As I’m not an e-commerce or other financially driven/inherently secure website, I opted for a basic validation certificate

The certificate I have is provided by Comodo from [Namecheap](//www.namecheap.com/security/ssl-certificates/wildcard.aspx) and set me back around £60. Single-domain SSL certificates are *significantly* cheaper if you’re only planning on covering the one or a couple of domains/subdomains. Definitely shop around.

If you’re not in the mood to shell out for a certificate, you may consider [LetsEncrypt.org](//LetsEncrypt.org) or [Cloudflare](//blog.cloudflare.com/introducing-universal-ssl/).

What you’ll end up with, whichever route you take (Cloudflare excluded) is a server certificate file (CRT), a key file (KEY) and optionally a CA certificate file (bundle.crt).

Prepare WordPress for the change
--------------------------------

If, like me, you have more than a few posts on your site, you may well be worrying about the dreaded mixed content warning you’ll undoubtedly see on almost every page once you’ve made the switch. At best a browser like Chrome will refuse to show the green lock. At worst you may encounter difficulties loading the website at all.

When thinking about mixed content warnings there are two main considerations when switching WordPress over to HTTPS:

1. Do I link to my own content within posts (images, posts, pages)?
2. Do I use a custom theme with hard links to resources?

For 1, it’s too easy to just sit back and allow WordPress to manage your links for you. I’d been allowing this since ~2008 when the website first came into existence and as such all links in posts were hard-coded to http://. That essentially means having to edit every link in every post in order to change http:// to a protocol-relative //.

Nightmare.

There’s a much faster solution for anyone with access to their database however, and that’s to run a simple set of commands which rename all http:// URLs to the protocol-relative // – simply put this will allow the links to be *relative* to the *protocol* in which they’re requested; using // instead of http:// or https:// means that if you’re on a website without an SSL certificate a // URL will load as http://, while with SSL enabled it will load as https://.

I performed the following commands within the **SQL** tab in the relevant database using phpMyAdmin, having taken a backup of said database beforehand that I could restore if it all went wrong:

`UPDATE wp_posts SET guid = replace(guid, 'http://','//');`  
`UPDATE wp_posts SET post_content = replace(post_content, 'http://', '//');`  
`UPDATE wp_postmeta SET meta_value = replace(meta_value,'http://','//');`

This will change every URL in every post and page; images, internal links, external links. All of them. If you’re only interested in changing URLs specifically within your domain, try:

`UPDATE wp_posts SET guid = replace(guid, 'http://bayton.org','//bayton.org');`

Do the same for the other two commands, replacing my domain with your own.

For 2, and this is primarily aimed at those who theme their own sites, any hard-coded http:// links will need to be changed accordingly. Failure to do so will result in mixed content warnings.

Install the certificate and configure Apache
--------------------------------------------

With your brand new certificate freshly generated and delivered to you, it’s time to install it. For the purpose of this guide, everything SSL will be stored under ***/etc/apache2/ssl/***. Where you ultimately decide to keep them is your decision, just bare in mind you’ll need to edit the below configs to match.

**Enable SSL in Apache**

First and foremost, Apache needs to know it’ll soon be serving traffic over SSL. To do this, run the command:

`sudo a2enmod ssl`

Apache will tell you to reload your configuration with:

`sudo service apache2 reload` (or `restart`, if you’d rather).

At this point Apache may not come back up, throwing up an error due to being unable to find your SSL certificates. We’ll fix this in the next step.

**Create your Virtual Host**

You’ll already have a Virtual Host defined if you’re currently running a non-SSL website, you may have even written your own. When making the switch I took a copy of my non-SSL Virtual Host and pasted it into a new bayton-ssl.conf file in ***/etc/apache2/sites-available/***, editing it to enable SSL support. Here’s an example:

`<VirtualHost _default_:443>`  
`SSLEngine On`  
`SSLCertificateFile /etc/apache2/ssl/baytonorg.crt`  
`SSLCertificateKeyFile /etc/apache2/ssl/baytonorg.key`  
`SSLCACertificateFile /etc/apache2/ssl/bundle.crt`  
`ServerName domain.com<br></br>ServerAlias www.domain.com`  
`DocumentRoot /var/www/html`  
`</VirtualHost>`

The important bits here are **SSLEngine On**, which turns SSL on for this Virtual Host, and **SSLCertificateFile** &amp; **SSLCertificateKeyFile** which provide the certificate and private key, respectively. The **SSLCACertificateFile** isn’t obligatory. Additionally, unless you’re running a dynamic Virtual Host, be sure to include **ServerName**.

**Enable the new site**

Having got to this point, it’s time to turn it on. To enable the new Virtual Host simply run:

`sudo a2ensite bayton-ssl.conf`

`bayton-ssl` will need to be replaced with the name of your own Virtual Host file before hitting enter, otherwise you’ll be met with an error.

Once the Virtual Host is enabled, a reload of Apache will be necessary with:

`sudo service apache2 reload`

Apache should now be ready to run your site over HTTPS as well as HTTP. Open your browser and point it to http**s**://yourdomain.com and bask in the glory of all of that SSL goodness.

Are we done yet? Almost.

Make the switch
---------------

Before flipping the switch in WordPress to default to HTTPS, you should first undertake a bit of due diligence:

**Look for mixed content warnings**

Open any number of random posts and pages. If there’s a problem your browser will tell you, however if you’re uncertain or wish to delve deeper, open the debugging console in your browser (Right click &gt; inspect element) which should inform you of any errors to be rectified. Note: when clicking links on your site at this point you’ll be taken to the non-SSL page. Bare that in mind when debugging and be sure to edit the URL accordingly.

**Make sure /wp-admin works in HTTPS**

Head to https://yourdomain.com/wp-admin and make sure it loads correctly. Login and poke around until you’re satisfied nothing is broken or behaving unusually. Switching to HTTPs with a faulty wp-admin console will result in issues and difficulty reverting back.

**Providing everything is OK**

Once you’re convinced everything is running correctly, you can flip the final switch to default to HTTPS.

Within the admin console, navigate to **Settings &gt; General** and change http to https in both **WordPress Address** and **Site Address**. Save changes and hold your breath – when you exit the dash and return to your front page you should notice all WordPress links – ie post titles, categories, tags, etc – will use https://

You’ve done it! Your WordPress website now runs over SSL.

One last thing..
----------------

You’ll notice that if you navigate to http://yourdomain.com it’ll still load over HTTP. To fix that you can redirect traffic from HTTP to HTTPS with a 301 redirect in an Apache Virtual Host.

Open your original Virtual Host file (not SSL) and add a new Virtual Host that permanently redirects all HTTP traffic to HTTPS (a 301 redirect) Here’s an example:

`<VirtualHost *:80>`  
`DocumentRoot /var/www/html/domain.com<br></br>ServerName domain.com`  
`ServerAlias www.domain.com`  
`RedirectMatch 301 (.*) https://domain.com$1`  
`</VirtualHost>`

When finished, save the file and restart Apache one last time:

`sudo service apache2 restart` (or `reload`)

All traffic that hits your server on port 80 will now be redirected to your SSL-enabled website!

—

Are you considering a switch to HTTPS? Are you still putting it off?  
If you’ve followed this guide I’d love to know how you got on. Sound off in the comments!

*Noticed an error above? Let me know in the comments, tweet me [@jasonbayton](//twitter.com/jasonbayton) or [email me](mailto:jason@bayton.org).*