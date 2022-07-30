---
title: 'Restricting access to Exchange ActiveSync'
date: '2016-02-03T19:53:56+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 2447
tag:
    - activesync
    - EMM
    - exchange
    - MDM
    - 'mobile device management'
    - policy
    - restrictions
    - security
post_format: []
post_views_count:
    - '638'
tags:
    - Enterprise
    - Guides
---
By default, Exchange allows connections to ActiveSync from anywhere in the world. While this is great for new Exchange admins, small businesses who don’t want to do much configuration and those who want things to *just work*, it poses a security risk on par with any other service openly accessible over the internet.

As Enterprise Mobility continues to grow and management platforms become more prevalent within the industry, leaving ActiveSync completely open is making less and less sense both from a security and management perspective.

Once devices are fully managed and ActiveSync profiles have been configured and deployed, limiting access to ActiveSync externally will prevent devices circumventing MDM in order to access email on their mobile devices. With circumvention impossible, end-users are required to enroll their devices onto the corporate MDM platform in order to get their email, enabling greater control over the devices in general; a benefit in its own right.

The aim of this guide is to provide directions for restricting access to ActiveSync to only specified, whitelisted IP addresses; these may be for a MobileIron Sentry, an AirWatch SEG or any other ActiveSync proxy that may be in use in the business. When finished, it will only be possible to connect to ActiveSync through the specified, whitelisted service, whether on-site or remote.

**Note:**  
– This guide uses Microsoft IIS configurations to restrict access. For firewall configuration this guide is not suitable.  
– The directions outlined below will only restrict access to ActiveSync, leaving OWA (Outlook Web Access) traffic untouched.  
– Although aimed at the EMM industry, this guide is suitable for any ActiveSync proxy, or just to keep ActiveSync locked down.  
– Despite being shown on a Windows 2012 R2 server, the same steps apply on earlier versions of Windows Server.

Click start and open IIS Manager from the start menu. On Server 2012 just type IIS within the Start Window and it will appear, for older Windows Server versions it’ll be under **All Programs &gt; Administrative tools**.

![Step1](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/02/Step1.png)

In the new window, expand the Servername, followed by Sites, Default Web Site and scroll until you find **Microsoft-Server-Activesync**.

Select this.

![Step2](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/02/Step2.png)

Once selected, in the main console will be a number of settings to choose from. Find and select **IP Address and Domain Restrictions**. Double click to open.

![Step3](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/02/Step3.png)

Is **IP Address and Domain Restrictions** missing? It may need to to be added using **Add features** in Server Manager.

Once open, the Actions pane on the right-hand toolbar will show **Add Allow Entry**. For this guide we will add the allow entry before denying access.

![Step4](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/02/Step4.png)

Click **Add Allow Entry** and a new window in which to put the IP address of the whitelisted service will pop up. Enter the address(es) here and click OK to close.

![Step5](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/02/Step5.png)

For those with an on premise application, input the internal IP.  
For those with a hosted/cloud service, ping the public URL to obtain the public IP address.

With the whitelisted application in place, we’ll now prevent all other traffic from connecting to ActiveSync.

As mentioned above, Exchange permits traffic from anywhere. This means anyone with an ActiveSync device can try to connect to the server irrespective of whether or not they are permitted to do so. In this step that option will be revoked, meaning only devices connecting through the whitelisted application can make an ActiveSync connection (and only MDM-enrolled devices are able to utilise this service, increasing security dramatically).

Going back to the Actions pane on the right-hand side, select **Edit Feature Settings**.

![Step6](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/02/Step6.png)

This will bring up a new window. In here, select the dropdown for **Access for unspecified clients** and change it to **Deny**. Click OK to close.

![Step7](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/02/Step7.png)

Finally in order for the changes to take effect, IIS will need to be restarted. The exchange server can remain online for this if we opt for an `iisreset`, otherwise schedule downtime accordingly and test access to ActiveSync both through the whitelisted service and externally to confirm changes have been successfully applied.

![Step8](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2016/02/Step8.png)

IIS will be unavailable for a number of seconds while an `iisreset` is being performed. The business may need to be aware of any disruptions so plan accordingly.

—

*Noticed an error above? Let me know in the comments, tweet me [@jasonbayton](https://twitter.com/jasonbayton) or [email me](mailto:jason@bayton.org).*