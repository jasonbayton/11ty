---
title: PACKAGE SEARCH delegated scope setup
parent: PACKAGE SEARCH support
published: '2024-09-26'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Package Search'
    - 'bayton-projects'
categories: 
    - Package Search Setup
layout: base.njk
eleventyNavigation: 
    order: 0
    title: Configure delegated scopes
---

PACKAGE SEARCH is able to show currently-assigned managed configurations to applications.

Useful for debugging and troubleshooting purposes, assigned managed configurations allow you to:

- Validate the config deployed has reached the application
- Ensure variables or custom data is applying correctly from the EMM (for example `$email$` is translated by the EMM correctly to `user@email.com`) 
- View in real-time applied configurations without the lengthy and cumbersome process of pulling device logs.

In order to leverage this feature, PACKAGE SEARCH requires the delegation of a Device Policy Manager scope, `MANAGED_CONFIGURATION`, also referred to in Android as `DELEGATION_APP_RESTRICTIONS`. The following documents how you can configure this.

<div class="callout callout-blue">
<div class="callout-heading">Head's up</div>

The API behind the MANAGED_CONFIGURATION delegated scope supports _multiple_ applications being configured. Providing PACKAGE SEARCH with this scope should **not** impact any existing managed config functionality of the EMM or other applications. Your EMM may however only permit one at a time, and this may be already delegated to an EMM's own companion/administration agent. If you have any difficulty setting the scope, please reach out to your vendor.

</div>

<div class="callout callout-red">
<div class="callout-heading">Caution</div>

Be aware PACKAGE SEARCH will show the received managed config as it is provided by the EMM on any device configured. This may include identying information, secrets, keys, and anything else you may not wish end-users to have visibility of.

It is recommended this feature be used in a closed testing environment only, unless you are comfortable with the potential risk.

</div>

## Android Management API

An increasing number of platforms are built upon, or migrating to, the Android Management API (AMAPI). If you are familiar with this API and comfortable with JSON, the policy configuration looks as follows: 

```json
{
  "packageName": "org.bayton.packagesearch",
  "delegatedScopes": [
    "MANAGED_CONFIGURATIONS",
  ],
  "installType": "PREINSTALLED"
},
```
In the above, PACKAGE SEARCH is being pushed to a device silently with the `PREINSTALLED` install type. The delegated scope AMAPI grants is `MANAGED_CONFIGURATIONS`. 

## TestDPC

[TestDPC](https://play.google.com/store/apps/details?id=com.afwsamples.testdpc) is a wonderful application built and maintained by Pietro & peers at Google. It's an ideal utility for testing EMM policies and APIs, and should form part of your technical arsenal if you are in any way involved with development or support of EMM platforms.

**Steps to configure PACKAGE SEARCH**:

- Within TestDPC, search or scroll to **App restrictions manager**
- In this subsection, scroll to PACKAGE SEARCH
- Tap PACKAGE SEARCH
- Tap **SET**

PACKAGE SEARCH is now configured to view and display managed configurations. 

**Note**: TestDPC supports only _one_ App restrictions manager at a time, however this API supports multiple apps. If you're testing another application requiring the same scope you'll have to temporarily switch between that and PACKAGE SEARCH to enable PS functionality.

## Workspace One UEM

[This link](https://kb.omnissa.com/s/article/89115) describes how a delegated scope can be configured with WS1 UEM, further guidance will be provided in the [EMM setup guides](../emm-setup) in due course.

## EMM vendor setup

Typically delegated scopes are found within application configurations. Within your EMM when adding an application, you should see delegated scopes alongside install type, managed config, install priority/constraints, and so on. It should provide a drop-down or checkbox list for scopes able to be delegated to an application. Select MANAGED_CONFIGURATION, or if the EMM provides their own lable for scopes, look out for Managed Configuration, App configuration, or a similar sounding option.

Further guidance may be found in [EMM setup guides](../emm-setup). Documentation isn't provided for every EMM on the market currently. If you'd like guidance for your particular EMM, please [raise a request](https://github.com/jasonbayton/11ty/issues/new?assignees=jasonbayton&labels=documentation&projects=&template=content-request.md&title=%5BContent+request%5D). If you happen to know your EMM vendor leverages AMAPI, you may also raise a support request with them, providing above AMAPI JSON example and requesting guidance on how this is applied to your policies.

## Add your EMM guide

If you're an EMM vendor reading this and would like to contribute guidance, please feel free to [raise a request](https://github.com/jasonbayton/11ty/issues/new?assignees=jasonbayton&labels=documentation&projects=&template=content-request.md&title=%5BContent+request%5D) or [fork & pull request](https://github.com/jasonbayton/11ty/tree/main/_src/projects/package-search/support/emm-setup) with:

- Chronological steps
- Optional screenshots
- Guidance beginning from importing PACKAGE SEARCH, configuring it appropriately, and saving for deployment.

A template file is highlighted below for a direct PR to [EMM setup guides](../emm-setup). Name the file `deletegated-scope-setup-VENDOR.md`, adjust vendor as required.

```markdown
---
title: Configure PACKAGE SEARCH for VENDORNAME
parent: EMM setup guides for PACKAGE SEARCH
published: '2024-07-22'
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
    title: Configure VENDORNAME
---

Add your steps here. Ensure you update title, published date, and eleventyNavigation title above.
If you add images, these will be mirrored to the bayton.org CDN, so don't worry too much about where they're currently hosted.
```


