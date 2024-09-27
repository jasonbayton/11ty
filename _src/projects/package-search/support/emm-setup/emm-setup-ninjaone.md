---
title: Configure PACKAGE SEARCH for NinjaOne MDM
parent: EMM setup guides for PACKAGE SEARCH
published: '2024-09-27'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'PACKAGE SEARCH'
    - 'bayton-projects'
categories: 
    - EMM setup guides
layout: base.njk
eleventyNavigation: 
    order: 3
    title: Configure NinjaOne MDM
---

NinjaOne MDM supports the assignment of delegated scopes through the application edit modal. Here are the steps:

1. Edit your policy
2. Head to Applications in the left-nav
3. Scroll down and
   1. Either import PACKAGE SEARCH first as a new application (Add app) or
   2. Hover over the PACKAGE SEARCH to expose the menu icon, click edit
4. Scroll down to **Delegated scope overrides**
5. Add the _Grants access to managed configurations management_ scope
6. Click Save

PACKAGE SEARCH will now be granted the managed configurations delegated scope, and will be able to view and display managed config assigned to any application.

Here's a screenshot to assist:

![ninjaone add scope](https://cdn.bayton.org/assets/package_search/package_search_emm_setup/ninjaone_mdm/Screenshot_2024-09-27_17.25.22.png)