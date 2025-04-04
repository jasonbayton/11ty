---
title: "How do I turn off Google Play app collections?"
published: '2025-03-04'
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
  order: 61000
--- 

By default, the managed Google Play iFrame will automatically organise and display assigned applications in the Google Play app on mobile devices. 

While this is simple, it lacks control.

For organisations interested in customising the Google Play experience for managed devices, Google offers app collections. App collections allow defining an explicit layout, such as below, with the applications curated by the organisation. 

While it's great, it can also become a burden. Applications assigned won't automatically pop up in Google Play after app collections are created, for example, and keeping this up to date is a reason organisations try it out, and subsequently abandon the idea.

Unfortunately the managed Google Play iFrame doesn't support just _turning it off_. Instead, a support request will likely need to be raised with the EMM vendor.

- If the EMM vendor uses the older Play EMM API with a custom DPC, they can leverage a simple API command: `setStoreLayout`. This can either be supported in-console, or as an action the support team can perform.

- If, however, the EMM vendor uses AMAPI, they will have to reach out to Google to turn the feature off as AMAPI hasn't yet adopted the API to attain feature parity.

Once disabled, the Play Store on devices will return to standard behaviour.

<div class="callout">
<div class="callout-heading callout-heading-small">
Need help?
</div>

If you're struggling with your EMM provider, feel free to [reach out](/contact/), and I may be able to escalate it through the appropriate channels.

Be prepared to provide: 
- Organisation (enterprise) ID
- Technical contact details
- Whether you use Play EMM API (with a custom DPC) or AMAPI.

</div>