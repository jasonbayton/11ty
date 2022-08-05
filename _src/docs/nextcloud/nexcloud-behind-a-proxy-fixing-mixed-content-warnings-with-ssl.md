---
title: 'Nexcloud behind a proxy: fixing mixed-content warnings with SSL'
published: '2017-06-03T22:17:10+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
id: 4294
doccats:
    - Nextcloud
Version:
    - '1.1'
publish_post_category:
    - '11'
discourse_permalink:
    - 'https://discuss.bayton.org/t/nexcloud-behind-a-proxy-fixing-mixed-content-warnings-with-ssl/63'
---
1. Why this happens
-------------------

If you’ve setup Nextcloud to sit behind a proxy, you may encounter the following errors and find not all content loads correctly:

```
<span class="hljs-attribute">Content</span> Security Policy: The page’s settings <span class="hljs-literal">blocked</span> the loading of a resource at http://cloud.myserver.com/core/img/background.jpg?v=20 (“img-src https://cloud.myserver.com data: blob:”).
Content Security Policy: The page’s settings <span class="hljs-literal">blocked</span> the loading of a resource at http://cloud.myserver.com/core/img/logo.svg?v=20 (“img-src https://cloud.myserver.com data: blob:”).
```

Normally this means the proxy is configured for SSL but proxies to Nextcloud over HTTP rather than HTTPS, like this:

```
ProxyPass / http:<span class="hljs-comment">//192.10.110.24/</span>
ProxyPassReverse / http:<span class="hljs-comment">//192.10.110.24/</span>
```

Or, in NGINX, like this:

```
<span class="hljs-attribute">proxy_pass</span> http://192.10.110.24;
```

This configuration will terminate SSL on the proxy and have the proxy communicate with Nextcloud over HTTP. Since Nextcloud won’t be configured to respond over HTTPS by default, all internal requests for content (like stylesheets, images, etc) will also be made over HTTP, resulting in mixed content warnings.

2. How to fix it
----------------

In order to resolve this, make the following changes to your Nextcloud `config.php`:

```
<span class="hljs-string">'overwrite.cli.url'</span> => <span class="hljs-string">'https://cloud.myserver.com'</span>,
<span class="hljs-string">'overwriteprotocol'</span> => <span class="hljs-string">'https'</span>,
```

Nextcloud will then ensure all requests are made and returned over `https://` rather than `http://`, mitigating the mixed-content errors.

**Note**: Be aware, if you access Nextcloud internally via IP over HTTP, this will either a) give you SSL errors or b) not work at all – 443 is not configured by default, so it may refuse to connect when it forces, due to that setting, the connection from http:// to https://