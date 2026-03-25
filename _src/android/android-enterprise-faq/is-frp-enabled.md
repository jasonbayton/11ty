---
title: "Is Factory Reset Protection enabled on fully managed devices?"
published: '2019-04-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - FAQ
categories:
    - Fully managed
layout: base.njk
eleventyNavigation:
  parent: 'Android Enterprise FAQ'
  key: "Is Factory Reset Protection enabled on fully managed devices?"
  order: 25000
--- 
Not normally by default, though do validate with your EMM vendor. If confirmed disabled however FRP kicks in after a reset, log a ticket with EMM support.

If so desired, allowlisted Enterprise Factory Reset Protection is available and offers a simple, albeit caveated means of ensuring devices can’t simply be wiped and re-setup without Android Enterprise provisioning taking place. For zero-touch devices there’s no need to leverage it.

## Android 15 FRP changes

From Android 15, FRP behaviour has changed. OEM unlocking no longer bypasses FRP after a hard reset, and Enterprise FRP is always enforced on managed devices regardless of OEM unlock status. This makes configuring EFRP more important than before, particularly for fully managed devices without zero-touch, as recovery from an unexpected reset without EFRP configured is considerably harder.

More: [Feature spotlight: Factory Reset Protection](/android/feature-spotlight-factory-reset-protection/).

