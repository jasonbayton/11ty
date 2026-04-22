---
title: "Consolidation or ecosystem: what did partners sign up for, and what did they get?"
date: '2026-04-18'
status: draft
author: 'Jason Bayton'
excerpt: "Yesterday's post framed Apple's MDM migration as courage. A conversation afterwards pointed out it's also consolidation, which is the more useful angle on the Android side anyway. Eight years into AMAPI, the pitch partners signed up for and the reality on the ground aren't the same thing."
type: post
tags:
  - Enterprise
---

[Yesterday's post](/blog/2026/04/dpc-migration/) described Apple's ecosystem-wide MDM migration as courage; forcing the partners to enable something customers have wanted for years. That framing isn't wrong, but a conversation afterwards pulled me up on what it misses. Apple isn't only forcing migration. Apple is also steadily absorbing core management capability into its own surfaces, and Apple Business Manager has been quietly expanding into territory that used to belong exclusively to the MDM. The MDM, in that world, increasingly becomes an interface layer over first-party capability. Courage and consolidation aren't mutually exclusive, and both reads of the same move are fair.

Let's look towards Android. 

## Two directions

Broadly, the platforms can lean one of two ways.

**Consolidation at the platform vendor.** Google absorbs more management capability into Android Device Policy and AMAPI. Custom DPCs wind down. OEM freedom to expose their own APIs narrows. Vendor-specific surfaces fold back into first-party ones. The platform owns more of the stack, and the EMM becomes a thinner layer over Google's foundations.

**Power at the EMM and ecosystem-partner level.** Package Installer. OEMConfig. Custom DPCs. Vendor-specific extensions that let EMMs compete on capability rather than UX alone. OEMs free to expose features their hardware needs without waiting on a universal first-party surface to catch up. The ecosystem absorbs customer demand the platform can't or won't.

Neither is absolute. Nobody sensible argues for either extreme. But the direction of travel on Android over the last several years has been firmly towards the first.

## Customers still want single pane of glass

My read, from the day job, is that single pane of glass is still what customers ask for. You can see it in how fast smaller organisations flock to all-in-one tools over specialists that would beat them on raw capability. "Do everything in one place" wins when the person at the console is resource-constrained, and they almost always are.

Platform consolidation doesn't quite deliver that, though. It delivers two panes. One at the platform vendor, one at the EMM, and a steadily shifting boundary between them as features migrate from the second to the first. For a single-OS customer that might be workable. For a mixed fleet it's worse; the admin carries the burden of knowing where each setting lives. "Single pane of glass" and "platform consolidation" often get discussed as if they're the same thing. They aren't.

## The pitch partners signed up to

When AMAPI was first introduced to partners, the pitch was compelling.

Native, first-party management. No more custom DPC drift between vendors. A consistent management surface delivered by Google, feature-complete relative to what Play EMM offered, kept in lockstep with the platform itself. Partners freed up to compete on UX, support, integrations, and speed of delivery. The plumbing would be Google's problem.

On paper it was the right direction. Most of the ecosystem believed it. A lot of us actively advocated for it.

## Eight years on

The pitch hasn't landed in full.

AMAPI still doesn't match the capability surface of the custom DPC world it was positioned to replace. Features customers have asked for repeatedly, over years, remain unimplemented. Roadmap commitments slip or quietly disappear. Partners raise the same concerns year after year and get the same answers. The [feature request wishlist](/android/android-enterprise-feature-requests/) I've been maintaining for years, with entries that link back to posts from [2019](/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/) and [2022](/blog/2022/12/android-features-2023/), is still largely open.

Worse, Google continues to ship new capability to the surface they've told partners for years is winding down, while AMAPI still can't access it. The most recent example I've been trying to get an answer on: a [data backup and restore option between fully managed devices](https://support.google.com/work/android/answer/16713206), shipped a few months ago. Usable today by vendors still on Play EMM. Not available to vendors who took Google at their word and moved to AMAPI.

That one feature isn't existential on its own, but the incentive it reveals is the opposite of what was pitched. Vendors who followed Google's stated direction are competitively disadvantaged against vendors who didn't. A customer asking for the capability either waits on AMAPI indefinitely, or picks a vendor on the deprecated stack precisely because it can deliver today. Neither outcome is what anyone signed up for.

## What was traded away in the meantime

The feature gap is the loud part. The quieter part is the autonomy that came with the old model, which has been steadily reeled back in while the first-party replacement hasn't finished arriving.

Custom DPCs let vendors build things Google hadn't thought of. OEMConfig let device makers expose capability the first-party surface didn't cover. Broader on-device API access meant that when a customer asked for something novel, the answer was usually yes, even if it took work. That flexibility was part of the value proposition, and it's what let the ecosystem absorb demand Google alone couldn't keep up with.

Piece by piece, that has narrowed:

- Play EMM is deprecated, which removed the path custom DPCs used for app and account management.
- Custom DPC provisioning is now [gated behind Play Protect allowlisting](/blog/2025/12/the-dpc-allowlist/), with unapproved DPCs treated as malware during enrolment.
- OEM API surfaces outside Android Enterprise have been steadily wound down through stricter, more restrictive GMS requirements for OEMs. [Samsung's Knox SDK restrictions](/blog/2024/06/knox-changes-android-15/) being neutered are a good example.
- Zero-touch enrolment has remained gated to authorised resellers, with [self-service upload requests going unanswered since 2019](/blog/2019/01/what-id-like-to-see-from-android-enterprise-in-2019/#zerotouch-customer-device-uploads). If it were partner-led rather than Google-gated, each EMM could define its own onboarding and verification rules within its own product stack, rather than every organisation waiting on a reseller channel.
- AMAPI's own permissible usage requirements have steadily tightened, with newer vendors now required to clear business case reviews and device quota approvals before they can build at scale.

Each change came with a reasonable-sounding justification, usually around security, consistency, or ecosystem health. Individually, most of those justifications stand up. In aggregate, what the ecosystem has given up is significant, and what it's received in return is a first-party surface that still isn't feature-complete on the promises made when the trade began.

The ecosystem didn't resist consolidation because it objected to the principle. It accepted the principle, and has spent the years since watching the capability side of the bargain fall behind the restrictions.

## Who absorbs the cost

Partner frustration is easy to dismiss as partners being difficult. The downstream cost sits with customers.

When the platform doesn't ship a feature and the EMM isn't allowed to build around it, the customer doesn't get the feature. Most customers don't know or care what's running under their EMM; they know what they asked for, and they know the answer that came back. "Google doesn't support it" has become a weekly conversation for anyone delivering Android at scale, and it isn't the conversation anyone expected to be having this deep into Android Enterprise's evolution. Some customers pick vendors based on what the current one can't deliver. Some switch and find the same gaps in different packaging. Some move their more demanding use cases away from Android entirely.

None of that is what the customer picked. It's what the consolidation direction has produced while the first-party surface works to catch up.

## The question

Do we want the default to be more consolidation at the platform level, with Google continuing to absorb management into ADP and AMAPI and the ecosystem settling into an interface-layer role?

Or do we want more power at the EMM and ecosystem-partner level, with Package Installer, OEMConfig, custom DPCs, and vendors building on top of platform APIs to cover ground the platform can't or won't?

The first path is only as good as the platform vendor's delivery, and eight years in, delivery hasn't kept pace with the pitch. The second path is only as good as the ecosystem's willingness to use the APIs it's given, and yesterday's post is a reminder that that willingness can be selective where commercial incentives don't line up. Both paths have failure modes. Both can end somewhere customer-hostile if taken too far.

If Google were shipping feature-complete AMAPI on schedule, tracking Play EMM capability as it goes, I'd probably accept consolidation and move on. Most customers, offered "your EMM can do anything but nothing is consistent" versus "the platform does it all and it just works," pick the second every time. That bargain is fine when it's honoured.

It hasn't been honoured consistently enough, for long enough, that "keep consolidating and wait" is a harder position to argue than it used to be. A more defensible middle ground, at least until the first-party surface earns the trust it was granted, is to loosen the ecosystem side of the equation again. Not because custom DPCs are a better long-term model, but because partners and customers shouldn't keep absorbing the cost of a transition that hasn't finished arriving.

Whichever direction this goes, the conversation is worth having out loud, rather than drifting into the default through another cycle of deprecations, turndowns, and quiet scope expansions. The platforms are making choices on the customer's behalf right now. The rest of us can at least be clear about what we'd pick, given the choice.
