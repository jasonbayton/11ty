---
 title: "Introducing DeltaWatch: web change detection, reimagined"
 date: '2026-04-10'
 status: publish
 author: 'Jason Bayton'
 excerpt: "After years of watching documentation pages silently change under me, I built the monitoring tool I actually wanted. DeltaWatch is live, and the free tier has no time limit."
 type: post
 tags:
     - Projects
     - Enterprise
---

If you've ever written documentation for a living, you know the particular flavour of horror that comes from a vendor updating a page without saying a word. A deprecated flag. A changed default. A renamed permission. A URL slug that now 301s to something vaguely related but not actually the same. The kind of change that would be a one-line entry in a sensible changelog, if the changelog existed at all.

I've been quietly maintaining a collection of pages I need to watch for the better part of a decade - Google's Android Enterprise documentation, AMAPI references, OEM product pages, vendor announcement blogs, the occasional Wikipedia article that gets quietly edited when something interesting happens. For most of that time I've used various tricks and tools, and a fair amount of daily checks as part of my morning routines.

The trouble with this is me. Just a simple human reminding myself to read the docs on a regular basis.. and I miss things - either directly insomuch as forgetting to check in on a page I should frequent often, or indirectly by missing a change to wording within a paragraph. The latter being a subtle but critical function change when Google updates the default of a policy, for example.

So, in the spirit of [Flash](/blog/2026/03/mdm-is-dead-long-live-ace/) and [MIKA](/blog/2026/04/how-mika-was-built/), I built the thing I actually wanted.

## Introducing DeltaWatch

**DeltaWatch** is a multi-tenant web change detection platform. You point it at a URL, it fetches the page, extracts the bits you care about, and tells you when something changes. That's the core of it. Everything else is about doing that well at scale, without noise, without fuss, and without having to babysit an installation in a NUC in your cupboard.

It's live right now at [deltawatch.ing](https://deltawatch.ing), the free tier has no time limit, and you can sign up in about fifteen seconds.

## Why I built it

I wanted a hosted service priced sensibly, had no time limit on the free tier, gave me the surgical content-extraction controls I need for the long-tail pages I care about, and ran on the stack I'm familiar with for debugging and expansion.

Existing tools on the market do page monitoring really well, but they're either too costly for the capabilities I'm after, or don't offer what I want.

So I built one.

## What it does

The feature list is too long for an announcement post, so I'll stick to what I use personally every day.

### Deep content extraction capabilities

Most monitoring tools let you pick a CSS selector and call it a job done. DeltaWatch lets you target the exact content you care about via **CSS selectors, XPath, JSONPath, or regex** - and combine them. Want to watch a specific `<div>` on a page, but only the changes inside the third `<p>`? Done. Want to watch a JSON API response but only specific keys? Done. Want to strip navigation, headers, footers, sidebars, and anything with `display: none` before the diff runs? One checkbox.

JSON responses are auto-detected and formatted with sorted keys, so changes in key ordering never trigger false alerts. PDFs up to 20 MB are text-extracted and diffed like any other content. There's a workspace-level "strip blank lines" toggle for the sites that love to insert random whitespace. All of this is there because I hit every single one of these edge cases within the first week of using the platform on my own pages.

### Conditions engine

Content extraction handles targeting. The **conditions engine** filters out the noise that slips through after. Eight operators (contains, does not contain, equals, greater than, regex match, and friends), AND/OR logic, and change-percentage thresholds so you only get alerted when the page changes by more than, say, 5%. Every condition composes with every other condition. It's the difference between getting one useful alert a week and getting twelve useless alerts a day.

### Notifications where you work

Email is built in. Everything else is a URL away: **Slack, Discord, Telegram, and generic webhooks**. Add channels per watch, per tag, or at the workspace level. Every channel is available on every plan, including the free tier, because pay-walling notifications on a monitoring product is absurd.

### Sites (beta)

This solves a real and annoying issue for me - missing new content because instead of a page changing, a new page is added to the website.

**Sites** lets you model an entire domain as a connected graph or table. You point DeltaWatch at a root URL, it crawls the hostname, builds a graph of pages and the links between them, and gives you an interactive network or table view of the whole site. You can see what links to what, which pages have drifted recently, and which pages are orphaned or rarely updated.

From the graph (or a table view, if you prefer rows), you can **convert any discovered page into a watch** with one click - or bulk-promote a dozen at a time. Conversion routes through the standard watch creation flow, so plan limits, duplicate detection, and interval enforcement all still apply. There's also an optional auto-watch toggle that turns every newly discovered page into a watch as the crawler finds it, which is excellent for small focused sites and *absolutely terrifying* for anything the size of a Google developers domain.

Sites also does **recrawl scheduling**. When a watch detects a change, the parent site queues an automatic re-crawl (debounced at 12 hours site-wide to avoid storms), so the data stays current with the pages you care about. As a fallback, every site gets a scheduled full recrawl roughly every 7 days with ±40% per-site jitter, so sites stay fresh while the platform doesn't all crawl at once.

Sites is currently a Sentinel-tier feature - more on pricing below.

### Imports from everywhere

I had eight years-worth of links to bring across when I started using this in earnest, so **import had to work from day one**. DeltaWatch imports from six formats:

1. **changedetection.io** ZIP backups, watches, tags, snapshots, and notification settings
2. **DeltaWatch native backup** - full-fidelity round-trip of any export
3. **CSV** for spreadsheet-driven bulk imports
4. **JSON** for API-driven bulk imports
5. **Distill.io** exports
6. **Plain URL lists** for the "I just have a text file of URLs" case

Every import shows a preview before committing, enforces plan limits, and runs as a background job so large imports don't time out.

### Multi-workspace and backups

Workspaces are per-team, per-project, or per-client containers. Each workspace has its own plan, its own billing, its own users, and its own notification defaults. I run a personal workspace for my own monitoring, and a handful of dedicated workspaces that are monitored separately. You only pay for the workspaces that need paid features.

Every workspace can generate a full ZIP **backup** in the background - watches, tags, settings, and snapshot history - and download it via a time-limited link. No lock-in: if you ever want to leave, the door is right there.

## Under the hood

For those of you who like a peek behind the curtain, here's the architecture.

**Frontend** is React with Vite and Tailwind CSS. The Watchlist, site graph, diff viewer, and admin panels are all SPA components. The site graph uses a force-directed canvas simulation with viewport culling, zoom-based label visibility, and adaptive force parameters so it stays responsive at 1,000+ nodes. No D3 in the main bundle; it's a lightweight hand-rolled force simulation that weighs less than most charting libraries.

**Backend** is Express with a comprehensive REST API. It runs in two deployment modes: as a Netlify full-stack application (SPA + serverless functions) lighter instance, and as a standalone Node.js process with a strongly-consistent PostgreSQL backend for heavier use. The standalone build supports a split deployment topology where HTTP serving and background work run as separate processes, isolating API latency from crawl and watch-check load.

**Storage** is a pluggable backend abstraction. There are four backends - Netlify Blobs, Directus, a generic KVP-over-JSONB database store, and a native-columns Postgres store that uses typed columns and expression indexes instead of JSONB blobs for the hot tables. The native backend is what runs on the VPS in production, and it's materially faster than the KVP equivalent for listing, filtering, and bulk operations (I started out with Directus support, given I use that for my [app projects](/projects) but it quickly groaned under the strain, so local PG took over).

**Watch check pipeline** is durable. Every check runs as a persisted job with claim tokens, stale-job recovery, and a 10-minute timeout watchdog. One watch per job means a slow target can't strand a batch of twenty; the scheduler just moves on and comes back to it on the next tick. Imports, exports, and workspace deletes follow the same job-queue model, which means they survive process restarts and serverless context freezes.

**The site crawler** uses BFS with robots.txt support, rate limiting, checkpointing, a configurable edge cap, and - crucially - the same SSRF and redirect validation path as regular watch checks. A crawl can't reach anywhere a watch couldn't.

**Platform health monitoring** runs every 5 minutes on the worker process and captures disk usage, Node memory, database pool pressure, watch-check failure rate, crawl job health, scheduler miss detection, and API latency. Alerts only fire on state transitions (`ok → warn → critical`) with a configurable cooldown, and there's a recovery notification when everything returns to `ok`.

## Pricing

I wanted the pricing to be clear, cheap, and sustainable. Three tiers:

- **Ping** - **free, forever, no time limit.** 5 watches, 3-hour minimum interval, 10 visible snapshots, all notification channels. Enough to monitor the pages you care about without paying a penny. No credit card required to sign up.
- **Pulse** - **£3/month.** 50 watches, 1-hour minimum interval, 100 visible snapshots for historical page comparisons, API access.
- **Sentinel** - **£6/month.** Unlimited watches, 5-minute minimum interval, unlimited snapshots, API access, and the Sites feature. This is the "monitoring is my passion" tier.

That's it. No seat pricing. No watches-per-month metering. No "contact us for Enterprise". Per-workspace billing, so you can keep personal monitoring free while running a paid workspace for client work side-by-side.

For context, the commercial competitors want £10–15/month for a similar watch count with 5-minute checks. DeltaWatch does it for £6, and the free tier is actually usable rather than a trial.

## What it's not

A few things it deliberately isn't:

- **Not self-hosted.** DeltaWatch is a hosted SaaS. I built it as a product, not a self-host kit. If you want self-hosted, changedetection.io is an excellent choice.
- **Not a scraper.** It's a change detector. It respects robots.txt on crawls, it doesn't bypass paywalls, and it doesn't attempt to defeat bot detection systems. If a site doesn't want to be monitored, DeltaWatch won't fight them about it.
- **Not a replacement for your APM.** It monitors *content*, not performance. It doesn't care if a page is fast, it cares if a page is *different*.
- **Not very good at SPAs.** I can look at supporting that in future though. Today it only watches pages that output their source to visitors, and SPAs tend to hide it in javascript apps.

## Try it

[deltawatch.ing](https://deltawatch.ing) is live. Sign up, add your first watch in about thirty seconds, and the diff viewer will show you your first change the moment the content shifts.

The docs are at [deltawatch.ing/docs](https://deltawatch.ing/docs), the release notes live at [deltawatch.ing/releases](https://deltawatch.ing/releases), and there's a live status page at [deltawatch.ing/status](https://deltawatch.ing/status) that reads straight from the production health endpoint so you can see what the platform's doing right now.

If you spot a bug, a content extraction edge case, a site that breaks the crawler, or a feature you miss from another tool, I want to hear about it. There's a reply-by-email link below, or [reach out](/contact/) directly.

Happy monitoring!