---
title: "Googlebooks meet enterprise, eventually"
date: '2026-09-28'
status: publish
author: 'Jason Bayton'
excerpt: "Google has finally said something official about Googlebooks and enterprise. It ends real uncertainty for ChromeOS estates, and starts a countdown on enterprise support."
type: post
tags:
  - Enterprise
---

Google has published its [first proper guidance](https://support.google.com/chrome/a/answer/16634428) (that I'm aware of, at least) on what Googlebooks mean for the likes of us who manage these things at scale, and the organisations whose ChromeOS estates have spent months in limbo.

Googlebooks will get enterprise management, but it is a good way off. Existing ChromeOS fleets are not imminently becoming unsupported, either.

With Google addressing enterprise for [Aluminium](/notes/102), there is at least something concrete to work from. Google has said ChromeOS devices will receive updates and security patches through mid-2034. That does not replace Auto Update Expiration (AUE) dates, which remain per model and already run beyond 2034 for some newer hardware. Google says qualifying devices whose 10-year lifecycle would extend beyond that point will receive transition support, although it has not said what that looks like yet.

So, if you have spent the last few months wondering whether you were managing a dead platform, you can rest easy for the moment. Chromebooks can continue to run ChromeOS after their applicable AUE date, just without the regular updates and support you actually want from a managed estate.

There are some models that may be offered an upgrade path to Googlebook OS. It is too soon to understand the implications of that - management headaches, the need for a Powerwash, and so on - but it creates a route to keep newer hardware in use in some cases. I'd quite like to know whether an Aluminium "Flex" is on the cards too for the rest of the obsolete hardware.

Existing Chrome Enterprise and Education licences remain valid for Chromebooks running ChromeOS. Googlebooks, and eligible Chromebooks that move to Googlebook OS, will use a new licensing structure. We do not have the detail on that yet, which is quite an important thing to be left hanging in my opinion.

## A slow burn for enterprise

I saw signs of [Aluminium gaining enterprise support](/notes/102) months ago and have been watching the enterprise plumbing take shape in the Android Canary builds ever since - multi-user policy being ported into Android Device Policy, the shared-session capability ChromeOS has always had seeping into the Android side. Convergence work has been running at least all the way through Android 17, with signs very [early on](/notes/95) prior. That does not tell us the whole enterprise offering was ready then, of course, but it does make the wait harder to swallow.

The consumer Googlebooks are now available. You can sign in with a managed Workspace account today, and optionally apply Chrome browser cloud management, but domain enrolment and central fleet management are not there yet. Google's first enterprise-management wave begins in the second half of 2027 and rolls out over multiple years. I've watched this same ordering with [XR](/blog/2026/04/android-enterprise-lands-on-android-xr/), and it wears thinner every time.

## Whose management wins?

Google says it will provide Admin console controls for devices, users and browsers, plus APIs for third-party enterprise mobility management (EMM) providers. That is helpful, but it does not answer which management model a Googlebook inherits, and whether the Android Management API (AMAPI) becomes part of the stack.

ChromeOS management and AMAPI are both Google management surfaces, so I can see the appeal of pulling them together. I've long found ChromeOS management unappealing next to Android's - the licensing questions around consolidated management, how it is gatekept in Google infrastructure (Workspace) and so on. "A Googlebook is managed like a Chromebook" and "a Googlebook is managed like an Android device" are very different promises to an administrator. If Googlebook adopted the former in totality, my enthusiasm for the product would plummet.

The announcement gets us part of the way there. API detail, the remaining policy coverage, licensing and the eventual relationship with AMAPI are still open. I'm keeping that flagged as a risk.

## Where this leaves you

For now this is an overdue acknowledgement that Googlebooks have an enterprise future. The management to facilitate it starts to arrive in 2027, and the licensing in some ways makes-or-breaks adoption. Your ChromeOS fleet is still supported according to its AUE date, and Google has given us a mid-2034 ChromeOS update horizon to plan around.

I'll come back to this once I get a Googlebook in front of me in October. If you're weighing your ChromeOS estate against what's coming, or you've read the same announcement and landed somewhere else, [tell me](/contact).
