---
title: "How to configure Chrome managed bookmarks"
published: '2023-05-22'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - App management
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 63100
--- 
If you're looking to configure the bookmarks available in managed Chrome, you can use the below format. More examples can be found via [Google's documentation](https://chromeenterprise.google/policies/#ManagedBookmarks).

```json
[
  {
    "toplevel_name": "Company bookmarks"
  },
  {
    "name": "Homepage",
    "url": "mydomain.com"
  },
  {
    "children": [
      {
        "name": "HR",
        "url": "mydomain.com/hr"
      },
      {
        "name": "Submit a ticket",
        "url": "mydomain.com/it-support"
      }
    ],
    "name": "Internal URLs"
  },
  {
    "name": "Android resources",
    "url": "bayton.org/android"
  }
]

```

Be aware on managed Android devices, bookmarks [can't be placed on the home screen](/android/android-enterprise-faq/manage-app-shortcuts/). For that use case, you should consider [web apps](/android/create-and-manage-web-apps-for-android-enterprise/) instead.

Other things to consider - 
- The order you input the subfolders and URLs reflects directly in Chrome
- If you input a child folder (eg: `"children"`), ensure you list the name (eg: `"name":"Internal URLs"`)
- All normal json rules apply. You can use a json validator to be sure it's valid before committing it
- If Chrome doesn't show the bookmarks, though other configs (eg homepage) change, the syntax is invalid
