---
title: "How do I configure Google Workspace domains for provisioning?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - Provisioning
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "What’s the best provisioning method?"
  order: 11000
--- 
Restricting Android Device Policy to a single Google Workspace tenant is very straightforward. In your DPC extras, add the line:

```
{
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
"com.google.android.apps.work.clouddpc.EXTRA_FORCED_DOMAINS": "[\"domain.name\"]"
}
}
```

If your organisation leans on multiple domains across organisational groups, here's an example of allowlisting 3 domains within the ZT DPC extras for Google Workspace:

```
{
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE": {
"com.google.android.apps.work.clouddpc.EXTRA_FORCED_DOMAINS": "[\"bayton.org\",\"jason.com\",\"impressivedomain.com\"]"
}
}
```

When a Google account entered during provisioning doesn't match one of these domains, a small red error will show beneath the text input as follows:

> Please enter an email address for one of the following: bayton.org, jason.com, impressivedomain.com.
