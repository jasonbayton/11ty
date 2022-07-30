---
title: 'Connecting to Nextcloud via webDAV: &#8220;Windows cannot access..&#8221;'
date: '2017-07-13T09:20:37+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
id: 4351
doccats:
    - Nextcloud
Version:
    - '1.0'
publish_post_category:
    - '11'
discourse_permalink:
    - 'https://discuss.bayton.org/t/connecting-to-nextcloud-via-webdav-windows-cannot-access/61'
---
Recent updates to Windows 10 have been interfering with my mapped Nextcloud webDAV network folder.

The errors
----------

For existing connections:

[![](../../../../uploads/2017/07/Restoring-Network-Connections.png)](/wp-content/uploads/2017/07/Restoring-Network-Connections.png)

For new connections:

[![](../../../../uploads/2017/07/Network-Error.png)](/wp-content/uploads/2017/07/Network-Error.png)

The cause
---------

Doing some digging, it would appear a Windows service is to blame:

[![](../../../../uploads/2017/07/Region.png)](/wp-content/uploads/2017/07/Region.png)

The fix
-------

The WebClient service needs to be running and, preferably, set to Automatic. However I’ve noticed with Windows updates this service is infrequently being set to manual and therefore preventing access to new or existing webDAV connections.

By settings Startup type to **Automatic**, the issue will no longer present itself.  
To avoid a reboot, in the above screenshot simply click **Start** to restore the connection immediately.