---
title: "MDM is dead. Long live ACE?"
date: '2026-03-05'
status: publish
author: 'Jason Bayton'
excerpt: "Agentic development is on the rise, agenctic control could come next - the enterprise mobility space is not immune."
type: post
tags:
  - Enterprise
---

If you manage devices for a living, you've probably felt it; that creeping sense that the platforms you rely on - the ones built by teams of dozens, iterated over decades, sold on multi-year contracts - are ripe to have the ground shift beneath them. I can't predict the future, but I can share what happened when I decided to test the thesis myself.

After shipping [AMAPI Commander](/blog/2026/02/introducing-amapi-commander/), a conversational interface for querying Android device estates via the AMAPI MCP, I found myself asking a dangerous question:

*How much further could I take agentic development?*

Commander was a great start, an AI-powered layer on top of Google's Android Management API MCP that let you ask questions about your fleet in plain English. It works, but it is read-only, and the real challenge of device management has never been reading data - it's acting on it.

I haven't done much with agentic development up to this point and talking recently with some peers, felt like I might be falling behind on a reality here to stay.

So, I opted to take on something ambitious; build a full, production-grade MDM platform to replace the tools I use on a daily basis.

More than a proof of concept. (but still a POC).  
Not a weekend hack. (Also.. debateable).

What I ended up with was a multi-tenant, role-enforced, enterprise-ready management platform with policy authoring, device lifecycle management, enrolment workflows, location, and an integrated AI assistant. I planned meticulously from the outset to try to avoid the common pitfalls of AI-assisted development - security holes, spaghetti code, architectural dead ends - by defining the foundations before anything wrote a single line.

I called it Flash, because it was made in.. well, you get it. You can see more in-depth details about Flash as a project towards the end of this article.

After a bit of work and a lot of reflection, here's where I think we stand.

## The current situation

Enterprise mobility management vendors have been building and iterating their products for a long time. Some for decades. They employ teams of tens or hundreds of engineers. They've accumulated years of customer feedback, compliance requirements, and institutional knowledge. The platforms they've built are genuinely impressive in scope.. and in a lot of cases go far beyond _just an MDM_.

Yet the core of Flash MDM - the device management engine, policy system, enrolment flows, dashboard, and API - was built in about three evenings. I'd be lying if I said I found my bed much before 2am on those days, but all the same.. By the end of the third evening I was inviting peers in to take a look at a working platform managing real devices. 

Not content to stop there, I then went on to add an AI assistant (Flashi (_flah-shee_)) from Commander, licensing, and what I considered to be a reasonable first-pass for RBAC. These were added over a further two evenings (not consecutively). I bought a few extra credits beyond the Claude Pro and ChatGPT Pro subscriptions to finish things off, but in total that was less than a week and cost less than you'd spend on a family dinner.

So while the example I put together is _just an MDM_, with the pace it was spun up the next logical task would be to start moving into additional features and functionality. How far could a project progress in a month, quarter, year?

## The broader picture

I tend to frame everything through Android, but this is obviously much broader in scope. What I've done with Flash could be achieved across every OS today.

The thesis - that traditional MDM development is dead - is really about the ecosystem at large. The ability for a single developer, or a small team, to build a purpose-built management platform in days rather than years applies everywhere modern device management APIs exist. Apple's MDM protocol is well-documented. Microsoft's device management stack has public APIs. ChromeOS management runs through the same Google admin infrastructure as AMAPI.

If anything, Android might actually be the *slowest* platform to see this play out, and the reason is AMAPI's permissible usage requirements. Google restricts who can build MDM solutions on AMAPI, requiring a DUNS number and explicit approval, and preventing the most powerful use case of LLMs today - building something yourself _for_ yourself. There are understandable reasons for this - support burden, quality control, protecting the ecosystem - but the practical effect is that Android, in this context, is the Europe of global device management: strongly regulated while other platforms accelerate with fewer restrictions.

That's a touch ironic. The platform with arguably the most capable and well-documented management API - as well as being the world's most open mobile OS - is also the one with the highest barriers to building on it. Meanwhile, an organisation that wanted to build a bespoke Apple MDM server tuned to their exact requirements faces no such gatekeeping.

I understand why permissible usage exists. The perceived support burden, the potential for abuse, the protection of existing commercial players - these were real considerations when the policy was introduced. But the world has changed. When it would have taken a team of twelve engineers with MDM expertise a year to build an MVP, gatekeeping made sense - because companies that don't have a team of 12 MDM expert engineers would undoubtedly consume that much more resource from Google. When one developer and a Mac Mini can produce a working platform in under a week, however, the situation is different.

Speaking to industry peers, there are some interesting ideas emerging should loosening these restrictions become feasible - not eliminating them entirely, but perhaps opening up customer access with appropriate guardrails. Google could spin up developer communities, recommended architectures and tooling/prompts - even a Gem or two to help repeatedly put the basics in place, and leave a level of access without the expectations of support existing partners have today. It's all technically possible. The question is whether the policies will keep pace with the reality that the tooling has already moved on.

## New interfaces, new paradigms. The future of ACE.

The exciting bit isn't just that you can build an MDM faster. It's that you can build an MDM *differently*.

I use MDM as it's a well-recognised acronym, but we've seen MDM, EMM, UEM iterate _what_ is managed. ACE - Agentic Control of Endpoints - expands _how_ it is managed.

Every major MDM platform today is fundamentally a web console with a REST API underneath. Some have added chatbots or AI assistants on top, but the core interaction model hasn't changed since the early days: log in, navigate menus, configure policies, view reports. 

Conversational MDM - asking your platform questions in natural language - is a welcome step, but it's a baby step. It's still the same data, the same operations, just accessed through a different input method.

What happens when you're not constrained by twenty years of UI patterns and backward compatibility? What happens when the management interface isn't a dashboard at all?

Think about what an agentic management platform could look like. Not a chatbot bolted onto a console, but a system where you describe your desired state - "I want these devices secured to NCSC best practices, with these apps deployed, location tracked within these geofences, and any compliance violation automatically triaged within 30 minutes" - and an autonomous agent makes it happen. Monitors it. Adapts it. Reports back when something _needs_ human attention.

Think Jarvis. Think Cortana - the Halo one, not the travesty Microsoft forced upon the world.

Flash already has the foundations for this. It has an API comprehensive enough to drive operations programmatically. A workflow engine handles event-driven automation. Flashi provides the conversational layer.. but it's still a traditional platform with a chatbot bolted on. The next step - autonomous management agents that go beyond answering questions to taking action - is an engineering problem, not a research problem; interpreting device state, reasoning about policy compliance, proactively monitoring for long-term issues.. we're not far from agents that could spin up a virtual device, enrol it, push a policy, pull logs, and identify whether the issue is a configuration mistake or an API problem. All without human intervention.

## What this means for the industry

To balance this out, because the point isn't that established MDM vendors are about to disappear (necessarily). There will always be space for dedicated SaaS companies with strong histories of innovation, integration, and security. The regional complexity alone - compliance regimes, data sovereignty requirements, carrier integrations, OEM partnerships - represents years of accumulated expertise that you can't vibe-code in a weekend, and for good reason.

But for larger organisations, the equation is changing. The IT team that used to justify a six-figure annual MDM licence because building their own was unthinkable? They now have the tools to build, maintain, and iterate on a management platform faster and cheaper than a renewal cost (as long as it doesn't manage Android..). Business-critical SaaS apps don't need to be gatekept when the APIs are public and the development cost has collapsed.

Larger organisations are already building their core business workflows on internal applications and processes. These are the critical items they need to get right. Is an MDM really that hard in comparison to making trains run on time? Ensuring JIT logistics work for car manufacturing? Complying with regional regulations for banking? These organisations have smart engineers. They now have smart tools. The combination is potent.

We'll see new entrants. We'll see organisations that previously would never have considered building their own management stack doing exactly that, and we'll see established vendors forced to compete not just with each other, but with their own customers' engineering teams.

The vendors who've been sitting on the same basic management paradigm for a decade will have to think about how to adapt. Not just adding an AI chatbot to the existing console, but fundamentally rethinking what device management looks like when the barriers to building it from scratch have effectively vanished. Your favourite SaaS platform, MDM included, is about to support every feature you've ever wanted - because if it doesn't, someone will build one that does. In days.

## What Flash actually is

Flash MDM is a multi-tenant Android device management platform built on AMAPI and deployed as a Netlify full-stack application - a React SPA frontend with serverless, Postgres-backed API functions. It's not a thin wrapper around AMAPI; it's a complete management platform with its own data model, database, caching, its own policy engine, and its own approach to estate orchestration.

The architecture follows a hierarchy that'll feel familiar if you've worked with enterprise management tools: workspaces sit at the top as tenant containers. This is where the AMAPI GCP is set, each workspace then contains one or more environments that map to AMAPI enterprise bindings. Within environments, groups form a hierarchical structure (using a closure table) for organising devices and assigning policies.

[![Flash MDM dashboard with Flashi assistant](https://cdn.bayton.org/uploads/2026/mdm-is-dead/dashboard-flashi.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/dashboard-flashi.png)

### A bit about the approach

The speed at which this materialised wasn't just down to typing prompts into a chat window. I adopted some of the approaches the wider AI development community has been refining for leveraging multiple agents semi-autonomously, so rather than prompt-babysitting a single model, I used one LLM to spin up CLI agents of itself and other LLMs - agentic teams working across Claude, Codex, and Ollama running GPT-OSS locally (all my Mac Mini can handle). This let me set a direction before stepping away, and come back to meaningful progress rather than a blinking cursor. I also gave them full access to the Mac, and a few additional CLI tools for Netlify, Neon & GitHub. Given it's a dedicated machine holding no real data, there was no need to wait around to approve every change the LLMs wanted to make.

Each completed output was QA'd and security-hardened by other agents in the chain, with findings written to files for constant monitoring. Once the OpenAPI specification was in place, I gave the agents their own API keys to QA within the running platform itself - they could verify their changes against the live application, not just the codebase. That doubled their efficiency and halved my review burden.

That's not to say it was unsupervised - I reviewed everything before committing to git, and the architectural decisions were all mine - but the execution loop was dramatically compressed. Where a traditional development cycle would require context-switching between writing code, reviewing code, writing tests, and running security checks, the agentic approach let all of that happen concurrently.

### A caveat on existing knowledge

It's become common to see people with no experience spinning up tools with AI that end up failing in spectacular ways - security holes, architectural dead ends, fundamental misunderstandings of the problem they're trying to solve. The AI can write the code, but it can't tell you whether the code is solving the right problem in the right way.

Flash is an Android MDM because I have a deep understanding of the Android ecosystem, the management API, and a reasonable background in systems architecture. I know many of the things to look out for - where AMAPI behaves unexpectedly, where policy management gets tricky, where tenant isolation can't be an afterthought. That domain knowledge shaped every architectural decision and every prompt I gave the agents. It's also why Flash isn't an iOS or Windows MDM today. I'd want to understand those management stacks at a developer level to a similar degree before I'd trust what I put out. AI dramatically compresses the build cycle, but it doesn't replace knowing what you're building and why.

On the other hand, this cautionary approach is probably why I'm not a millionaire running 17 SaaS startups across every accessible industry already, but I digress..

Just to call it out, I'm not saying Flash is perfectly bug free. Manually testing in-production takes dramatically longer than committing code, but what I've tested so far has been fine. 

### Security as a foundation, not an afterthought

One of the common pitfalls with AI-assisted development is treating security as something you bolt on later. I was deliberate about avoiding this from the very beginning, calling out the architecture I wanted (or what was possible, at least) and running every PR through a security review across multiple LLMs to catch things one alone wouldn't (almost every time).

The result is a security posture I'd want from a platform handling enterprise fleet data.

Password hashing uses scrypt with industry-standard parameters. Optional TOTP multi-factor authentication with backup codes is available for every account. Session tokens are generated with 256-bit entropy, SHA-256 hashed in the database, and served as HttpOnly, Secure, SameSite cookies with a 14-day sliding expiry.

All secrets at rest - GCP service account credentials, API keys, certificates - are encrypted with AES-256-GCM using domain-specific authenticated additional data. The client never sees encrypted values; it only knows whether a secret has been set.

CSRF protection combines Origin header validation with X-Requested-With enforcement on all session-authenticated mutations. SSRF protections use DNS-resolution-aware blocklists on webhook and outbound URL validation. Rate limiting is handled by a dual token-bucket system in Postgres - global limits for the platform and per-resource limits for AMAPI proxy calls. Timing-safe comparisons are used throughout authentication flows, including dummy hashes for non-existent users to prevent enumeration.

Tenant isolation is enforced at every layer: RBAC checks on every API call, database queries scoped by workspace and environment IDs, and a comprehensive audit log with sensitive-field redaction.

With all that said.. Could a dedicated security team find things to improve? I'm certain they would, and if I was taking this into production, that would be my next goal, but the plan was solid, and it was designed in from day one rather than discovered through penetration testing six months after launch.

### A peek at the platform

**The dashboard** gives you an immediate read on your estate: device counts, policy counts, enrolment token status, compliance rates, OS version distribution, manufacturer breakdown, and enrolment trends over time. It's the landing page, and it tells you what you need to know without clicking through to anything else.

[![Device inventory with filtering](https://cdn.bayton.org/uploads/2026/mdm-is-dead/devices-list.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/devices-list.png)

**Device lifecycle** covers the full journey. Enrolment token generation with QR codes, sign-in URL enrolment for BYOD, zero-touch provisioning configuration, real-time state synchronisation via Google Pub/Sub push notifications, background reconciliation jobs for eventual consistency, and device commands including lock, reboot, disable, and wipe. The device detail view breaks down into tabs for hardware identity, installed applications, policy compliance, audit history, operations log, and location tracking*.

*Location and geofencing require a companion app, TBD.

<div class="grid grid-column-2 grid-column-mobile-1 grid-gap-30">

[![Device detail view showing hardware, management status, and installed apps](https://cdn.bayton.org/uploads/2026/mdm-is-dead/device-detail.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/device-detail.png)

[![Device location tracking with map view](https://cdn.bayton.org/uploads/2026/mdm-is-dead/device-location.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/device-location.png)

[![Device operations history](https://cdn.bayton.org/uploads/2026/mdm-is-dead/device-operations.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/device-operations.png)

[![Sending a lost mode command to a device](https://cdn.bayton.org/uploads/2026/mdm-is-dead/device-command.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/device-command.png)

</div>

**Policy management** follows a waterfall inheritance model through the group hierarchy, with per-device overrides available when you need them. Applications and network configurations are componentised - define them once, assign them across the environment - while the core policy settings are managed per-policy with a structured form view covering everything from password requirements and restrictions through to kiosk mode and compliance rules. A Monaco-powered JSON editor is there for when you need full control over the raw policy.

<div class="grid grid-column-2 grid-column-mobile-1 grid-gap-30">

[![Policy editor with structured form view and documentation panel](https://cdn.bayton.org/uploads/2026/mdm-is-dead/policy-editor-form.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/policy-editor-form.png)

[![Policy editor in JSON mode with Monaco](https://cdn.bayton.org/uploads/2026/mdm-is-dead/policy-editor-json.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/policy-editor-json.png)

[![Device-level policy view showing applied policy and inheritance](https://cdn.bayton.org/uploads/2026/mdm-is-dead/device-policy.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/device-policy.png)

[![Per-device policy settings and overrides](https://cdn.bayton.org/uploads/2026/mdm-is-dead/policy-overrides.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/policy-overrides.png)

</div>

**Application management** integrates with managed Google Play for searching, deploying, and configuring applications across the estate. App feedback from devices surfaces directly in the console, and managed configurations let you push settings to supported applications.

<div class="grid grid-column-2 grid-column-mobile-1 grid-gap-30">

[![Application catalogue with managed Google Play integration](https://cdn.bayton.org/uploads/2026/mdm-is-dead/applications.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/applications.png)

[![Device-level application inventory with feedback](https://cdn.bayton.org/uploads/2026/mdm-is-dead/device-applications.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/device-applications.png)

</div>

**Enrolment** supports multiple provisioning methods: QR code, sign-in URL enrolment for BYOD scenarios with domain-restricted access, and zero-touch provisioning integration.. amongst others.

<div class="grid grid-column-2 grid-column-mobile-1 grid-gap-30">

[![Enrolment tokens with QR codes](https://cdn.bayton.org/uploads/2026/mdm-is-dead/enrolment-tokens.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/enrolment-tokens.png)

[![Sign-in enrolment and zero-touch provisioning configuration](https://cdn.bayton.org/uploads/2026/mdm-is-dead/settings-enrolment.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/settings-enrolment.png)

</div>

**Groups** provide hierarchical organisation with a closure table model, so you can nest groups as deep as you need and assign policies at any level.

[![Hierarchical group management](https://cdn.bayton.org/uploads/2026/mdm-is-dead/groups.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/groups.png)

**Workflows** provide event-driven automation. Define triggers based on device enrolment, state changes, compliance violations, app installations, geofence events, or time-based schedules, and the platform evaluates them asynchronously through a background job queue. Think of it as a lightweight IFTTT for your device fleet.

<div class="grid grid-column-2 grid-column-mobile-1 grid-gap-30">

[![Workflow list with execution counts](https://cdn.bayton.org/uploads/2026/mdm-is-dead/workflows.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/workflows.png)

[![Workflow builder showing trigger types and schedule configuration](https://cdn.bayton.org/uploads/2026/mdm-is-dead/workflow-builder.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/workflow-builder.png)

</div>

**Reports and exports** let you pull device inventories, policy configurations, audit logs, and application catalogues in CSV and JSON formats.

[![Reports and export interface](https://cdn.bayton.org/uploads/2026/mdm-is-dead/reports.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/reports.png)

**Licensing** ties into Stripe for workspace-level billing, with plan management, device quotas, overage handling, and grace period enforcement.

[![Licence management with usage and compliance overview](https://cdn.bayton.org/uploads/2026/mdm-is-dead/licences.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/licences.png)

**The API** is comprehensive - over 80 serverless functions spanning auth, workspaces, environments, groups, devices, policies, components, apps, enrolment, certificates, workflows, geofences, licensing, billing, dashboard aggregation, audit logging, and superadmin operations. It ships with an OpenAPI specification and supports both workspace-scoped and environment-scoped API keys. Every endpoint is a potential integration point, whether you're connecting a traditional automation pipeline or letting an autonomous agent manage your fleet.

You can see it live here: [https://flash-mdm.netlify.app/api/docs/](https://flash-mdm.netlify.app/api/docs/)

[![API settings with OpenAPI spec and API key management](https://cdn.bayton.org/uploads/2026/mdm-is-dead/settings-api.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/settings-api.png)

**An integrated AI assistant** - Flashi - lets users query workspace data conversationally, using OpenAI's tool-calling with read-only AMAPI MCP tools alongside Flash's internal Postgres tools. This is the Commander concept, transplanted directly into the management platform. It worked in Commander, it works identically here, and it means every operator has a natural language interface to their entire estate without leaving the console.

Importantly, Flashi runs on Flash's own API - no direct database manipulation, no hard-wired access. It's subject to the same RBAC controls as any other user. Administrators can set Flashi's role per environment from the settings page: it defaults to viewer, leaning on the AMAPI MCP for read-only estate queries, but can be elevated up to admin-level to create policies, wipe devices, generate reports, and more. I've kept it safe by default, but flexible - use it as much as you trust it. It's gated behind a dual toggle - platform-level and per-environment - so administrators retain full control over whether it's active at all.

**Multi-tenancy and RBAC** are first-class. Four roles - owner, admin, member, viewer - enforced on every API call. Access can be workspace-wide or scoped to specific environments, so you can give a partner organisation visibility into their slice of the estate without exposing the rest. The superadmin panel provides platform-level oversight across all workspaces, environments, devices, and users.

<div class="grid grid-column-2 grid-column-mobile-1 grid-gap-30">

[![User profile with TOTP setup](https://cdn.bayton.org/uploads/2026/mdm-is-dead/settings-profile.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/settings-profile.png)

[![Superadmin platform overview with plan management](https://cdn.bayton.org/uploads/2026/mdm-is-dead/superadmin-overview.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/superadmin-overview.png)

[![Platform statistics and function logs](https://cdn.bayton.org/uploads/2026/mdm-is-dead/superadmin-stats.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/superadmin-stats.png)

[![Superadmin log viewer with webhook and job queue details](https://cdn.bayton.org/uploads/2026/mdm-is-dead/superadmin-logs.png)](https://cdn.bayton.org/uploads/2026/mdm-is-dead/superadmin-logs.png)

</div>

## Flash is a case study, not a product

Flash MDM exists primarily as proof that this shift is real and happening now. It's a working, deployable platform with a comprehensive feature set and an architecture designed for extensibility.

In fact, if you have a spare Android device, you can take the platform for a spin by signing up below, just be mindful if you use the assistant, it will run out of OpenAI API credits at some point:  

[https://flash-mdm.netlify.app/join/w/customer](https://flash-mdm.netlify.app/join/w/customer)


Is it going to replace your enterprise MDM tomorrow? Probably not. Not next month, either. But the fact that it exists at all should give folks in this space something to think about.

This is an observation and a demonstration on where the barrier for entry now sits. The same APIs that power commercial MDM solutions are available to anyone with a Google Cloud project. The same frameworks, the same infrastructure, the same deployment platforms. What's changed is the velocity at which a single person - armed with domain expertise, an agentic workflow, and a decent laptop - can turn all of that into a working product.

Traditional MDM development, as we've known it for the last two decades, is dead. What comes next is going to be far more interesting.