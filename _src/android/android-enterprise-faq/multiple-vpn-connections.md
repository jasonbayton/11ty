---
title: "Is it possible to utilise multiple VPN connections within a profile?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - AE FAQ
    - AE General
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "Is it possible to utilise multiple VPN connections within a profile?"
  order: 13000
--- 
Yes this is possible, however not concurrently. Android supports only profile-wide VPN (or always-on VPN) natively, and the per-app VPN functionality often alluded to when multiple VPNs are brought up would have to be supported in-app.

When one VPN is running profile-wide and another is initiated, it will disconnect the first. Should these VPNs have failure protection and automatic reconnect (or leverage always-on VPN for this) the two VPN solutions will repeatedly disconnect one another.

## Submit a question

Need something else answered? Submit an [issue](https://github.com/jasonbayton/11ty/issues/new?assignees=jasonbayton&labels=documentation&template=content-request.md&title=%5BContent+request%5D), tweet [@jasonbayton](https://twitter.com/jasonbayton) or tag me in a [LinkedIn](https://linkedin.com/in/jasonbayton) post. Questions may be republished on this document, or form the basis of a new document under [/android](/android).