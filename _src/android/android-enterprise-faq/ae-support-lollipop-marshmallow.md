---
title: 'If Android Enterprise is supported from Lollipop, why is Marshmallow often mentioned instead?'
published: '2019-04-26T16:39:55+01:00'
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
  key: 'If Android Enterprise is supported from Lollipop, why is Marshmallow often mentioned instead?'
  order: 5000
--- 
While it’s indeed true Android Enterprise was introduced as *Android for Work* with Lollipop (and supported even earlier with ***the app*** (but we don’t talk about that), Android Enterprise was an opt-in feature with little uptake and a lot of teething issues. From Android Marshmallow (6.0) it became a mandatory requirement.

In other words, Marshmallow is chosen as a reasonably reliable reference point for when Android Enterprise was guaranteed to be widely supported. There will be OEMs that can confidently state they supported it from Day Zero, however few did.

<div class="callout callout-blue">
<div class="callout-heading callout-heading-small">Modern deployments</div>

Both Lollipop and Marshmallow are well past end of life. For current deployments, Android 14 should be considered the practical minimum - it is the oldest version still receiving security patches from Google, though some older versions are still actively patched by OEMs directly on certain devices. If you're planning a new deployment, target Android 15 or newer where possible to take advantage of the latest management APIs and security features, while ensuring prolonged security updates and support.

</div>

