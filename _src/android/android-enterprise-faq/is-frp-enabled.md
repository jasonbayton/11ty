---
title: "Is Factory Reset Protection enabled on fully managed devices?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - AE FAQ
    - AE Fully Managed
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "Is Factory Reset Protection enabled on fully managed devices?"
  order: 25000
--- 
Not normally by default, though do validate with your EMM vendor. If confirmed disabled however FRP kicks in after a reset, log a ticket with EMM support.

If so desired, whitelisted Factory Reset Protection is available and offers a simple, albeit caveated means of ensuring devices can’t simply be wiped and re-setup without Android Enterprise provisioning taking place. For zero-touch devices there’s no need to leverage it.

More: [Feature spotlight: Factory Reset Protection](/android/feature-spotlight-factory-reset-protection/).

## Submit a question

Need something else answered? Submit an [issue](https://github.com/jasonbayton/11ty/issues/new?assignees=jasonbayton&labels=documentation&template=content-request.md&title=%5BContent+request%5D), tweet [@jasonbayton](https://twitter.com/jasonbayton) or tag me in a [LinkedIn](https://linkedin.com/in/jasonbayton) post. Questions may be republished on this document, or form the basis of a new document under [/android](/android).