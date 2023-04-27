---
title: "What’s the difference between device based accounts and user based accounts?"
published: '2019-04-26'
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
  key: "What’s the difference between device based accounts and user based accounts?"
  order: 15000
--- 
The account type chosen can have a significant impact on enrolment if not done so correctly.

**User based accounts** are tied to an EMM user and will be used across all devices enrolled by said user.

**Device based accounts** are created per-device irrespective of the user the device enrols under.

In either scenario, that standard limitation of 10 devices per Google account applies, therefore if using one EMM user account to enrol many devices – a common staging exercise – it is imperative device based accounts are selected.

How these account types are changed is EMM specific, so do reach out to your EMM vendor for instructions.

