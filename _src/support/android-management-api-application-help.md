---
title: "Android Management API application assistance"
date: '2026-09-28'
status: publish
author: 'Jason Bayton'
excerpt: 'Practical preparation advice for commercial Android Enterprise and Android Management API applications, including the limits of support after Google has made a decision.'
type: page
layout: base.njk
sources:
  - https://developers.google.com/android/management/permissible-usage
  - https://support.google.com/work/android/community/about
---

<div class="callout callout-orange">
<div class="callout-heading">What this page covers</div>

I get many requests seeking assistance on the process for approving access to AMAPI. More happen after a rejection than before - I understand why people ask, but once an application has gone in, there is very little I can do. Google does not publish the internal assessment that sits behind these decisions, and I do not have a back channel into it.

I can absolutely help before an application is submitted. If you are already at the rejection stage, I have put the routes I know about below, but I would not want anybody paying for consultancy on the basis that I can get a decision reversed. I cannot.

Use the relevant section:

- [I have not yet applied](#i-have-not-yet-applied)
- [I applied and was rejected](#i-applied-and-was-rejected)

</div>

## An application has not yet been submitted

For assistance before submittin an application, bring me the product, the website, the customer terms, the intended use cases and a draft of the form, and I can give them a proper once-over before they land with Google.

There is no approval service here. Nobody outside Google can promise one. What I can do is help you avoid walking into the same obvious problems I keep seeing after the fact. Here's where to begin:

### 1. Have a D-U-N-S number

Have a D-U-N-S number, and make sure its business details match the company information used everywhere else. The application, company records and website should all describe the same organisation. It sounds painfully obvious. It is still worth checking as frequently this isn't the case.

### 2. Ensure the product is commercially available and accessible

You need a public website for a product that people can buy and use. It should tell a prospective customer:

- what the product does
- who it is for
- how an organisation becomes a customer
- how customers receive support
- the business identity behind the product
- terms and conditions of use

A placeholder site, a personal project page, or a product that cannot be understood as an actual commercial offering is unlikely to make a strong application.

### 3. Have customer terms that reflect permissible usage

Have clear, public terms and conditions for the product. They need to incorporate the relevant permissible-usage obligations, and every customer needs to accept them before using the service.

The terms should be clear about the enterprise-only nature of the product, customer and end-user responsibilities, and the use cases you will and will not support. They also need to agree with the website, privacy information, support model and application answers. A set of terms quietly saying one thing while the marketing site says another is likely to cause friction.

### 4. Be clearly B2B and enterprise focused

The Android Management API is for commercial EMM developers and certain enterprise security providers selling solutions to external end customers. Your product, sales model and public messaging should all point at organisations managing devices for work.

The consumer distinction needs to be airtight. An employee-owned device in a proper BYOD deployment, normally using a work profile, is standard Android Enterprise. Selling device management to private individuals for personal or household use (or usecases like parental control, device financing) is a very different proposition. If that forms any part of the product, Google is likely to reject.

### 5. Check permissible usage before you build around it

Read Google's [Permissible Usage policy](https://developers.google.com/android/management/permissible-usage). All of it. It rules out device-financing controls, standalone monitoring or surveillance, first-party-only in-house management, and using EMM policies and commands on unmanaged devices, amongst other things.

It also requires a direct agreement with end customers and appropriate information about data access and use. An MSP or reseller model may still work, but it does not make those direct customer obligations disappear.

### 6. Make the whole business coherent

Before applying, put the product, website, company information, privacy and support materials, customer terms, and submission answers side by side. Do they all describe the same business model, product scope and customer? They should.

I can give you an external view of that. I cannot validate the internal checks Google makes about a company's maturity, legal or business details, or general public posture. Google keeps that process to itself.. which is hardly helpful, but it is what it is.

### What I can help with

Before you apply, I can help with:

- reviewing the product and its stated use cases
- reviewing the public website and how the commercial offer is explained
- identifying likely questions or inconsistencies in the application form
- helping complete the form accurately
- checking the proposed use and customer terms against the published permissible-usage policy

I will tell you where I think something does not line up. I will not tell you that I can guarantee acceptance or influence Google's decision.

## I applied and was rejected

Once an application has been submitted and Google has rejected it, my ability to help drops off a cliff. I cannot see the decision-making process, I cannot validate what Google saw in the business, and I cannot overturn it. 

You still have a few things to try:

1. Read the decision closely. There may be a verbose rejection reason. Often there is not.
2. Contact `ae-community@google.com`, or the Android Enterprise compliance team - `ae-audit-compliance@google.com` to appeal.
3. Post a concise, non-sensitive question to the [Android Enterprise Customer Community](https://support.google.com/work/android/community/about). Do not publish account details, application IDs, credentials or customer data. Be aware the customer community is known to delete posts, so that may happen to you too.
4. If there is no response after a reasonable follow-up, assume the appeal is not being progressed. Applicants sometimes report that their email domain then stops receiving programme communications. Google does not publish a diagnostic or appeal path for that state, but you can assume your email domain has been blocklisted.

Trying another company email domain may get you a response. It will not guarantee a follow-up.

## Get in touch before you submit

If the application is still in draft, [get in touch](/contact/). Send over the product, website, customer terms, intended customer and use cases, plus the form content when you have drafted it. Please don't wait until the application has been submitted.