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

Google has published its [first proper guidance](https://support.google.com/chrome/a/answer/16634428) (that I'm aware of, at least) on what Googlebooks mean for likes of us who manage these things at scale, and the organisations whose ChromeOS estates have spent months feeling like they're in a state of limbo.

With Google addressing enterprise for [Aluminium](/notes/102), it brings some clarity to questions raised around the consumer announcement: 

- what happens with management, 
- when can said management be expected, 
- what happens to the ChromeOS devices already in the field (other than vague promises of attempting to upgrade newer models from ChrOS to BookOS).

While the writing is on the wall for an eventual phase out of ChromeOS, as ever that is not the whole story. 

Media coverage isn't helping the situation presently, with "the end of ChromeOS" death knell being rung far and wide and the bubbling assumption Google will do what Google does best - [abandon a product entirely to replace it with something new, shiny, and very similar](https://killedbygoogle.com/). Rather than following the sensationalist headlines, this is my interpretation of what Google has announced.


First and foremost, existing Chromebooks keep running ChromeOS until their forecasted end date, and likely beyond without regular updates.

For some models that'll be ahead of any planned abandonment of ChrOS given the way support works today, but indeed some of them will meet their end of support sooner than perhaps desired. Auto Update Expiration runs per board generation, ten years from a platform's release, so mid-2034 is a cutoff point that catches the newest boards - the ones whose ten years may otherwise run past it. The good news is some devices will be offered an upgrade path for Aluminium. It's too soon to consider implications, management headaches, the need potentially for a powerwash.. etc.. but the hardware will not be wasted (in all cases). Chrome Enterprise and Education licences still cover their management, so no major incoming headaches to handle there, either.

Google has put an end-of-support date of 2034 on ChromeOS updates entirely. I don't see that being wholly new information, given that end date has already been inferred from available data and circulated in the media.. but either way if you run a ChromeOS fleet and you've spent the last few months wondering whether you were managing a dead platform, you can - for the moment - rest easy. 

It would be interesting to understand if there would be an Aluminium "Flex" to add to the mix also.

## A slow burn for enterprise

I saw signs of [Aluminium gaining enterprise support](/notes/102) months ago and have been watching the enterprise plumbing take shape in the Android Canary builds ever since - multi-user policy being ported into Android Device Policy, the shared-session capability ChromeOS has always had seeping into the Android side. Convergence work has been running at least all the way through Android 17, with signs very [early on](/notes/95) prior. Seeing this, the slow adoption of enterprise capabilities is a frustration.

The consumer Googlebooks are now live. The enterprise management for them isn't due until the second half of 2027, and Google is being very reserved in stating it's a multi-year build. I've watched this same ordering with [XR](/blog/2026/04/android-enterprise-lands-on-android-xr/), and it wears thinner every time, because the enterprise development has demonstrably been running in parallel the whole way. It hasn't been a standing start.

## Whose management wins?

The biggest concern for me today is which management model a Googlebook inherits. ChromeOS management and AMAPI already run on Google infrastructure, so a merged OS is the obvious time to merge the management surface too. Whether Google does that fully is another matter, but it certainly seems like things are moving in that direction. I've long found ChromeOS management unappealing next to Android's - the dual licensing needed for consolidated management, how it's gatekept in Google infrastructure (Workspace) and so on, so "a Googlebook is managed like a Chromebook" and "a Googlebook is managed like an Android device" are very different promises to an administrator, and frankly if Googlebook adopted the former in totality I fear my enthusiasm for the product would plummet.

The announcement doesn't say which one we're getting. Perhaps Google hasn't landed on it yet. It's going to remain flagged as a risk for me.

## Where this leaves you

For now this is an overdue acknowledgement that Googlebooks have an enterprise future. The management to facilitate it won't be available for a year, and the licensing in some ways makes-or-breaks adoption. Your ChromeOS fleet, meanwhile, is fine, and will be for years to come.

I'll come back to this once I get a Googlebook in front of me in October. If you're weighing your ChromeOS estate against what's coming, or you've read the same announcement and landed somewhere else, [tell me](/contact).
