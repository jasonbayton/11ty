---
title: "Set up Hypergate's Kerberos Authentication on MobileIron Core for Android Enterprise"
published: '2019-03-18T13:00:47+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
id: 7870
layout: base.njk
doccats:
    - MobileIron
tags: 
    - Vendor specific
publish_post_category:
    - '8'
discourse_permalink:
    - 'https://discuss.bayton.org/t/setup-kerberos-authentication-on-mobileiron-core-for-android-enterprise/279'
---
Kerberos authentication is a common method of providing Single Sign On with on-premise Microsoft Active Directory. This kind of authentication is also referred to as Integrated Windows Authentication (IWA) or SPNEGO.

Android Enterprise lacks native Kerberos support, but with a 3rd party solution, in this case [Hypergate](https://hypergate.com), it’s possible to fill the native gap. This guide will describe how you can configure MobileIron Core to enable Android Enterprise to simulate Smart Card logons and leverage Kerberos Authentication to extend Single Sign On for corporate services to Android Enterprise devices.

Hypergate is not a free solution, however is priced competitively and sold through a network of partners. More information can be found [here](https://hypergate.com/pricing).

## Prerequisites

- An existing Kerberos environment in place and functional
- Android Enterprise bound and fully configured
- MobileIron Core configured to leverage Kerberos (SCEP configs in place), and pushing client certificates to devices.
- MobileIron Tunnel
- Hypergate licensed

For context, the environment utilised for this guide is as follows:

- Our Active Directory Domain Controller has the FQDN ‘DC01.MIACME.NL’
- The Realm (aka Domain for MS folks) is ‘MIACME.NL’.
- MobileIron Core is configured to work with a SCEP server and client certificates are already pushed onto the devices.
- MobileIron Tunnel is used to allow the managed device to connect to the KDC (aka Domain Controller for MS folks).
- Hypergate is the Kerberos client other apps will use to request Kerberos tokens.
- The devices are fully managed. though all AE deployment scenarios are supported

## Import Google Chrome

In MobileIron Core head to **Apps &gt; App Catalog &gt; Add+ &gt; Google Play** and search for **Google Chrome**.

![](https://r2_worker.bayton.workers.dev/uploads/2019/03/1.png)

Select the correct App, add it to the Category you want then make sure you tick the box **Install this app for Android Enterprise**.

![](https://r2_worker.bayton.workers.dev/uploads/2019/03/2.png)

## Configure Google Chrome

After ticking the box to enable AE, scroll down to the managed configuration section. The Kerberos relevant configurations are:

- **Supported authentication schemes**: this needs to be “negotiate” telling Chrome to act accordingly if the Server responds with a Negotiate challenge.
- **Authentication server whitelist**: this can be a list of all servers permitted to request tokens. Wildcards are also valid. In this guide a wildcard “\*” is utilised.
- **Kerberos delegation server whitelist**: this can be a list of all servers permitted to request tokens. Wildcards are also valid. In this guide a wildcard “\*” is utilised.
- **Account type for HTTP Negotiate authentication**: this tells Chrome where to look for an App that can deal with the negotiate challenge. In this guide “ch.papers.hypergate” is used because that’s how Hypergate advertises itself.

![](https://r2_worker.bayton.workers.dev/uploads/2019/03/5.png)

Following this, set the **Find Accounts On The Device** runtime permission to **Always Accept**:

![](https://r2_worker.bayton.workers.dev/uploads/2019/03/6.png)

Click **Finish/Save**.

## Import Hypergate

Head to **Apps &gt; App Catalog &gt; Add+ &gt; Google Play** and tick **Skip this step and manually provide Bundle ID and all app details** &gt; **Next**. You will be prompted with a form in which you need to enter the package name provided by the Hypergate team. This is because Hypergate is not visible publicly on Google Play currently.

![](https://r2_worker.bayton.workers.dev/uploads/2019/03/3.png)

Optional: For easier application list management (distinguish apps easier) you can also set the Hypergate logo in the next form by hitting “Replace Icon” and using this logo:

![](https://r2_worker.bayton.workers.dev/uploads/2019/03/4.png)

Click **Install this app for Android Enterprise**.

## Configure Hypergate

Scroll down to the managed configuration section. The relevant configurations are:

- **Username**: this should typically be **$USERID$**, but may need to follow naming conventions used in other SCEP configurations
- **Default realm**: this is the domain
- **Key Distribution Center**: this is the Domain Controller’s FQDN
- **PKinit KDC Hostname for PreAuth**: this is the Domain Controller’s FQDN
- **PKinit Certificate Alias**: \[intentionally blank\]
- **Certificate Authority**: Paste the CA cert, including intermediaries in this field.
- **Package name whitelist (comma separated)**: which apps should be allowed to requests tokens
- **Discoverability package names List (comma separated)**: which apps should discover Hypergate without first prompting the user with a selection screen.

![](https://r2_worker.bayton.workers.dev/uploads/2019/03/7.png)

The tick boxes control the menu displayed in the app, for production usage they should be all unticked (user only sees the ticket status), for troubleshooting/setup they can all be ticked (all menus/logging is shown).

When finished, click **Save/Finish**.

## Configure MobileIron Tunnel

As a reminder, MobileIron Tunnel should be configured correctly and able to reach internal hosts (Chrome needs to reach intranet sites and Hypergate needs to communicate with the KDC). If using the configurations **AllowedAppList** and **DisallowedAppList** please ensure they’re configured correctly to allow Chrome and Hypergate to reach their targets.

<div class="callout callout-danger">

### These apps need assigning

If not already assigned to a label, please do so now for Tunnel, Chrome and Hypergate. A test label is highly recommended prior to production rollout! </div>
 
## Test Hypergate

Hypergate is now ready to be tested.

Assigned devices should now have Chrome, Tunnel and Hypergate installed and configured. To validate if Hypergate works correctly, simply open the app and tap “Login”, this should directly show the UPN/Username of the assigned user and current status.

![](https://r2_worker.bayton.workers.dev/uploads/2019/03/8.png)

![](https://r2_worker.bayton.workers.dev/uploads/2019/03/9.png)

If the login does not work immediately, please check the logging section of Hypergate so troubleshoot (there are also network troubleshooting tools integrated in the “Ping KDC” menu).

<div class="callout callout-success">

### Chrome will do this automatically

Hypergate is only being opened manually to test the functionality. In future, Chrome will launch Hypergate and attempt to authenticate automatically

</div>

## Test Chrome

Within Chrome simply navigate to a website that requires authentication. Login should initiate automatically, immediately.

The first time Hypergate needs to fetch a Ticket Granting Ticket (TGT) there will be a non-intrusive short Hypergate prompt, every subsequent request will pass through without showing anything to the user.

## Complete!

At this point Hypergate should be set up correctly and Kerberos authentication will in future work correctly with Android Enterprise.

With this setup it’s equally possible to enable Kerberos SSO for all apps that use Custom Chrome Tabs for authentication (e.g. Slack, Evernote,…).

Other Apps like Microsoft Edge Browser or Brave Browser will require configuration similar to that of Chrome.

https://www.youtube.com/embed/tnP0P3GxW-c

## Support

For any additional information about Hypergate or its capabilities, please contact <hi@hypergate.com> directly.