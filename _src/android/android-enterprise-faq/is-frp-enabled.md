---
title: "Is Factory Reset Protection enabled on fully managed devices?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - AE FAQ
    - Fully managed
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "Is Factory Reset Protection enabled on fully managed devices?"
  order: 25000
--- 
Not normally by default, though do validate with your EMM vendor. If confirmed disabled however FRP kicks in after a reset, log a ticket with EMM support.

If so desired, whitelisted Factory Reset Protection is available and offers a simple, albeit caveated means of ensuring devices can’t simply be wiped and re-setup without Android Enterprise provisioning taking place. For zero-touch devices there’s no need to leverage it.

More: [Feature spotlight: Factory Reset Protection](/android/feature-spotlight-factory-reset-protection/).

