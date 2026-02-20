---
title: "Introducing AMAPI Commander: converse with your Android estate"
date: '2026-02-19'
status: publish
author: 'Jason Bayton'
excerpt: "A platform that lets you query your entire Android device fleet by simply asking questions in plain English."
type: post
tags:
  - Enterprise
---

If you manage or support a fleet of Android devices, you already know the pain. Getting a straightforward answer about your estate typically means logging into a console, clicking through several screens, exporting a report, and wrangling it into something useful. Need to know how many devices are running an outdated security patch? That's a ticket to IT, a scheduled report, or half an afternoon with spreadsheets. The data is there, locked behind tools that only a handful of people know how to operate.

I've spent years building resources around Android Enterprise, from [MANAGED INFO](https://bayton.org/projects/managed-info/) and [MANAGED SETTINGS](https://bayton.org/projects/managed-settings/) to the system apps database, QR code generator, and my [documentation](https://bayton.org/android/) - all have become popular utilities for the community. AMAPI Commander is the next step in that journey of learning more about the succulent underbelly of the Android world: a platform that lets you query your entire Android device fleet by simply asking questions in plain English.

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">This isn't a tool for organisations</div>

As a disclaimer, if you're an organisation managing Android devices with a commercial EMM vendor, this platform is not for you. EMM vendors own and control their Google Cloud Projects, and wouldn't grant the access needed for organisations to leverage AMAPI Commander.

Think of this more as a technical preview of what your EMM vendor could eventually integrate into their own stack.

</div>

## A quick refresher on AMAPI

Google's [Android Management API](https://developers.google.com/android/management) (AMAPI) is the cloud-based API that underpins modern Android Enterprise device management. It is the engine behind many EMM solutions today, handling everything from device enrolment and policy enforcement to application distribution and compliance reporting. If your organisation uses Workspace ONE, Intune, NinjaOne, Applivery, or any other AMAPI-enabled EMM, your device fleet data may already flow through this platform.

AMAPI Commander doesn't replace your EMM. It doesn't even sit alongside it.. but where feasible, it can offer you a new way to access and query the data AMAPI already holds about your devices, policies, and enterprise configuration, when integrated into the appropriate Google Cloud Project.

## The Model Context Protocol: why it matters

The bit that makes this technically interesting, and I'd argue forward-looking, is the [Model Context Protocol](https://modelcontextprotocol.io/) (MCP).

MCP is an open standard, [originally developed by Anthropic](https://www.anthropic.com/news/model-context-protocol) and now maintained under the [Linux Foundation](https://github.com/modelcontextprotocol/modelcontextprotocol), that defines how AI models connect to external tools and data sources. Think of it as a universal plug: rather than building bespoke integrations for every AI assistant on the market, you expose your tools via MCP and any compatible model (ChatGPT, Claude, Gemini, or whatever comes next) can use them.

The obvious opportunity here is for **EMM solutions**. Under almost all circumstances, customers don't have direct access to the Google Cloud project that backs their device management; it's the EMM that owns and operates the AMAPI project on their behalf. That makes EMMs the natural home for an MCP integration: they could expose fleet data from their own AMAPI projects through their platforms, letting customers query their device estate through any MCP-aware AI assistant without needing to know or care about the underlying API.

AMAPI Commander is something of an outlier in this regard. It implements an MCP server that bridges AI models directly to Google's Android Management API, and opens that up to *anyone* with an AMAPI Google Cloud project, whether that's an EMM vendor, a managed service provider, or an organisation that manages its own AMAPI project directly (being mindful of the permissible usage limitations). Those nine tools mentioned above are all exposed via MCP, each with built-in rate limiting, OAuth token management, and workspace-scoped access control.

For EMMs and platform vendors thinking about AI strategy, MCP offers a protocol-level integration point that avoids locking into a single vendor's AI ecosystem. Today in AMAPI Commander it powers the built-in assistant. But the same approach could power a custom GPT, a Claude agent, or an internal tool an engineering team builds, all against the same secure, rate-limited interface.

## How AMAPI offers MCP

Google publishes an official MCP server for the Android Management API. Rather than requiring traditional server-to-server integration - where a developer writes code to authenticate, construct REST requests, parse JSON responses, and handle pagination - the AMAPI MCP server exposes the API as a set of discrete, self-describing tools that an AI model can call directly during a conversation.

This is a fundamentally different interaction model. With a conventional API integration, a developer builds a client that knows exactly which endpoints to call and how to interpret the responses. With MCP, the model reads tool definitions at runtime - names, descriptions, parameter schemas - and reasons about which tools to invoke based on a natural-language prompt. There's no pre-built client logic; the model decides the call sequence on the fly.

The AMAPI MCP server currently exposes nine read-only tools spanning the core AMAPI resources:

**Enterprises** - `list_enterprises` retrieves all enterprises accessible within a Google Cloud project, while `get_enterprise` returns the full configuration for a single enterprise including contact details, display name, and enabled features.

**Devices** - `list_devices` returns a paginated device inventory for an enterprise, covering hardware specs, OS version, compliance state, and last sync time, applied policy, enrolment info, hardware identifiers, and security posture.. and more. `get_device` drills into a single device record with this information.

**Policies** - `list_policies` enumerates all policies defined within an enterprise. `get_policy` returns the complete single policy configuration: password requirements, app install rules, network settings, and compliance rules, so on.

**Applications** - `get_application` pulls application metadata from managed Google Play, including title, permissions, available versions, and managed configurations. It supports a `languageCode` parameter for localised results.

**Web apps** - `list_web_apps` returns all web apps published to the managed Google Play iFrame, and `get_web_app` provides the configuration for a specific web app including display mode, URL, and icon.

Every tool is strictly read-only. There are no create, update, or delete operations. The model cannot modify policies, wipe devices, or push applications. The data returned is the same data you'd get from the equivalent AMAPI REST calls, but the path to it is entirely different: instead of a developer writing integration code, an LLM interprets a question, selects the relevant tools, constructs the parameters, and synthesises the results into a human-readable answer.

Where a traditional integration might require dozens of lines of code to list devices, filter by OS version, and format a report, an MCP-connected model handles that in a single conversational turn - chaining `list_devices`, inspecting the returned fields, and summarising the output without any bespoke client logic.

## What AMAPI Commander does

At its core, AMAPI Commander is a multi-tenant web application that sits between your organisation and AMAPI. Rather than navigating dashboards or writing API calls, you ask the platform a question, and it returns an answer in seconds.

[![enterprise](https://cdn.bayton.org/uploads/2026/amapi-commander/Screenshot_2026-02-19_at_22.29.17.png)](https://cdn.bayton.org/uploads/2026/amapi-commander/Screenshot_2026-02-19_at_22.29.17.png)

Behind the scenes, an AI assistant powered by OpenAI translates your query into structured API calls against your Google Cloud project, retrieves the relevant data, and presents the results in a format that makes sense. It supports both text and voice interaction, background processing for large fleet queries, and intelligent caching so repeated questions don't burn through your Google API quota.

Why OpenAI? I'm most familiar with it, and as such was much easier to set the requirements, anticipate the behaviours, and mould it into what I wanted to achieve much faster.

[![device spec](https://cdn.bayton.org/uploads/2026/amapi-commander/Screenshot_2026-02-19_at_22.38.31.png)](https://cdn.bayton.org/uploads/2026/amapi-commander/Screenshot_2026-02-19_at_22.38.31.png)

### What you can ask

The platform exposes the nine tools that map directly to AMAPI's core resources. Here are some practical examples of what that looks like in conversation:

- **Enterprises:** *"List all enterprises in my project"* or *"Show me the details for enterprise LC012345"* - useful for managed service providers overseeing multiple customer estates.
- **Devices:** *"How many devices are enrolled?"*, *"Show me all devices running Android 13 or older"*, or *"What's the compliance status of device XYZ?"* - the bread and butter for fleet oversight.
- **Policies:** *"What policies are currently active?"* or *"Show me the configuration for the BYOD policy"* - helpful when auditing what's actually applied versus what's documented.
- **Applications:** *"What version of Chrome is deployed across the fleet?"* or *"Show me the details for com.google.android.apps.work.clouddpc"* - quick lookups that would normally require a Play Store console detour.
- **Web apps:** *"List all web apps published to managed Google Play"* or *"Show me the configuration for our intranet web app"* - niche, but genuinely useful when you need it.

[![policy info](https://cdn.bayton.org/uploads/2026/amapi-commander/Screenshot_2026-02-19_at_22.32.17.png)](https://cdn.bayton.org/uploads/2026/amapi-commander/Screenshot_2026-02-19_at_22.32.17.png)

These aren't canned queries. You phrase the question however you like, and the assistant works out which tools to call, in what order, and how to combine the results. Ask it to compare compliance across two policies, or to summarise which devices haven't synced in the last 30 days, and it will chain the relevant API calls together.

I will pause here to say it's not _all_ out-of-the-box-LLM. Without gates and a bit of logic to help the LLM decide which MCP tool to use (and always use the MCP tool) the responses were originally far less succinct. There's definitely some orchestration, but I've tried to keep it light.

## Built for multi-tenant from day one

Each workspace operates as an isolated tenant with its own Google Cloud project credentials, encrypted API keys, user memberships, and role-based access control. Workspace owners manage secrets, admins handle invitations and members, and members get read access to fleet data. Data is isolated at every layer: storage keys, cache entries, and audit logs are all scoped either per workspace, or per user.

[![policy info](https://cdn.bayton.org/uploads/2026/amapi-commander/Screenshot_2026-02-19_at_22.08.35.png)](https://cdn.bayton.org/uploads/2026/amapi-commander/Screenshot_2026-02-19_at_22.08.35.png)

On the security side, credentials are encrypted at rest with AES-256-GCM (the same standard used across banking and government), and the platform never returns encrypted values to the client. Authentication supports both Google OAuth for authorising Google Cloud Project access, while passwordless magic links handle access to AMAPI Commander's UI. There's also a comprehensive audit trail for privileged operations. The architecture has been through multiple rounds of security auditing, and the full technical detail is documented in the [Technical Whitepaper](/projects/amapi-commander/support/technical-whitepaper/) for those who want to kick the tyres.

## Who is this for?

AMAPI Commander is a reference implementation, not an end-customer product. It's built for anyone in the Android Enterprise ecosystem who has direct access to an AMAPI-enabled Google Cloud project:

- **EMM vendors** exploring how conversational AI and MCP can surface fleet data — a working example of the experience they could offer their own customers.
- **Managed service providers** who operate their own AMAPI projects perhaps via on-prem solutions on behalf of an EMM, and want a more accessible way to query the data they already manage.
- **Technical partners and developers** integrating with AMAPI who want to see how MCP tools map to the API in practice.

Organisations managing devices through a commercial EMM won't have access to the underlying Google Cloud project — their vendor owns that. AMAPI Commander is a glimpse of what's possible when that data is made conversational, and an invitation for vendors to bring something similar to their own platforms.

## What AMAPI Commander isn't

To reiterate for absolute clarity: **this is not an EMM solution**. It doesn't push policies or provision devices. What it does is make the data your EMM already manages through AMAPI accessible, queryable, and useful, without requiring everyone on the team to understand API documentation or navigate a management console.

## What's next

AMAPI Commander is in pre-production, and I'm actively working through a heap of hardening items, including RBAC against specific enterprises within a workspace to enable limited project access for members. All of this to come before a wider release, so the platform is presently invite-only. If you're interested in early access, want to see a demo, or simply want to chat about the approach, I'd love to hear from you!

In the meantime, have a look at the [Getting Started](/projects/amapi-commander/support/get-started/) guide, or dive into the [Technical Whitepaper](/projects/amapi-commander/support/technical-whitepaper/) for the full architectural detail.
