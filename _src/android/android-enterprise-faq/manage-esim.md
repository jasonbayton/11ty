---
title: "Is it possible to manage eSIM?"
published: '2024-11-11'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - General
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  order: 1111
--- 
From Android 15 it is possible to configure and deploy eSIM profiles, both full and partial, to Android devices.

Where a partial eSIM profile is deployed, it needs only a pointer to the relevant SM-DP+ server to fetch the full configuration.

For company owned devices - fully managed and work profile - it is possible to deploy configurations and prevent their removal. For personally-owned work profiles, configurations can be pushed, but end-users have the ability to remove the eSIM themselves.