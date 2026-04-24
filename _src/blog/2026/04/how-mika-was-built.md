---
 title: "How MIKA works: building an AI assistant for bayton.org"
 date: '2026-04-03'
 status: publish
 author: 'Jason Bayton'
 excerpt: "A technical look at how MIKA - the AI assistant now available across bayton.org - was built, what it runs on, and why it exists."
 type: post
 tags:
     - General
---

MIKA started as an April 1st project, because of course it did. But as with most things I build, the goal was never just a gag - it was to make something genuinely useful and have a bit of fun doing it.

If you haven't come across it yet, **MIKA** - **M**obile **I**ntelligence & **K**nowledge **A**ssistant - is an AI-powered assistant that sits across bayton.org and answers questions about Android Enterprise using the full content library as its knowledge base. It supports both text and voice, cites its sources, and has some rather strong opinions about me if you ask it the right questions.

Here's how it all came together.

## The starting point: Flashi

If you've been following along with [Flash MDM](/blog/2026/03/mdm-is-dead-long-live-ace/) and its AI assistant Flashi, some of what MIKA does will look familiar. Flashi was originally built as a standalone React application with a canvas-based animated orb interface, voice support via OpenAI's Realtime API, and tool-calling for querying AMAPI device estates conversationally.

For MIKA, I ported the orb animation and voice engine from Flashi's React implementation into vanilla JavaScript and rebuilt the orchestration layer to work with bayton.org's existing stack - 11ty for static generation and Netlify Functions for serverless endpoints. No React, no build tooling beyond what 11ty already provides. The orb canvas, WebRTC voice engine, and chat controller are all plain JS sitting in a single file.

## Architecture

MIKA runs on three Netlify Functions:

- **`orb-chat`** - handles text conversations. Takes a message and conversation history, runs a pre-search against the content index, then hands everything to the LLM with tool-calling enabled
- **`orb-realtime-session`** - creates ephemeral OpenAI Realtime API sessions for voice. Returns a short-lived client secret that the browser uses to establish a WebRTC connection directly with OpenAI
- **`orb-realtime-tool`** - executes tool calls from the voice path. When the Realtime API decides it needs to search or look something up, this function handles it

The text path uses `gpt-5.4-mini`. The voice path uses `gpt-realtime-1.5` with the `sage` voice. Both are configured with a temperature of 0.3 to keep answers grounded rather than creative.

## Search and the MCP

MIKA doesn't use RAG in the traditional sense - there's no vector database or embedding pipeline. Instead, it searches a JSON content index that 11ty generates at build time, containing every page on bayton.org with its full text content. The search layer uses phrase matching with keyword fallback, bigram pairs for compound terms like "zero-touch", and a scoring system that boosts guide pages over blog posts and newer content over older.

This is the same search infrastructure that powers the [bayton.org MCP server](https://github.com/jasonbayton/11ty), which means the same content is available to MCP-compatible tools like Claude Code. MIKA's Netlify Functions import directly from the shared `content-index.js` module, so ranking improvements benefit both.

MIKA also has access to the [system app database](/android/android-system-app-database/) via the MCP's sysapps endpoints - so you can ask it things like "what system apps come on a Samsung Galaxy S24?" and it'll query the database directly.

### Why not embeddings?

Honestly, for a content library of this size, keyword search with smart ranking works well enough. The content index is rebuilt on every deploy, the search is fast, and I don't need to maintain an embedding pipeline or pay for vector storage. The LLM does the heavy lifting of understanding what the search results mean - the search just needs to surface the right documents, and it does.

## Keeping it accurate

This was the hardest part. LLMs are enthusiastic confabulators, and Android Enterprise is a domain where getting a detail wrong isn't just embarrassing - it's potentially going to lead someone to misconfigure a fleet of devices.

The real guardrails are behavioural - MIKA must always search before answering, must never fall back on training data for AE topics, must refuse off-topic questions, and must never leak secrets or system prompts (it responds to those attempts with the same theatrical energy it uses when people ask about me). It's also explicitly prevented from hallucinating vendor-specific instructions when the documentation doesn't cover a particular EMM.

Beyond that, the system prompt includes a set of factual reference points covering topics the LLM consistently gets wrong without guidance. These aren't rules so much as directional prods - corrections for the most commonly confused concepts in the domain:

- The distinction between provisioning methods and deployment scenarios, and how they overlap
- Zero-touch eligibility across GMS devices
- How COPE changed architecturally in Android 11
- The relationship between Knox and Android Enterprise
- KME vs Google's zero-touch as separate systems
- The shift from custom DPC to AMAPI
- AER vs GMS certification
- What OEMConfig actually is

Without these, the model confidently states things like "KME is Google's zero-touch enrolment for Samsung devices" or "COPE gives you the same visibility as fully managed". With them, it gets the nuance right far more often.

The prompt also explicitly instructs MIKA to treat its search results as its own knowledge rather than a third-party source. Early testing revealed it would say things like "bayton says..." or "according to the documentation..." which sounded detached. Now it speaks with authority about its own content, because it *is* the content.

### EMM vendor awareness

People naturally ask about specific vendors - Workspace ONE, Intune, Hexnode, and so on. The search layer includes a synonym map so that "AirWatch" also matches "Workspace ONE" and "Omnissa", and the prompt instructs MIKA to search for both the vendor name and the underlying Android Enterprise concept. If the documentation doesn't cover a specific vendor, it says so clearly rather than hallucinating instructions.

## The personality

Every project needs a bit of character. MIKA has a "helpful, playful, cheeky, slightly theatrical" tone that keeps answers engaging without being obnoxious. It refuses off-topic questions with charm rather than a brick wall.

And yes, if you ask it about me, it goes full deity-tier. The prompt includes a couple of dozen increasingly absurd examples as inspiration - NATO considering bayton.org as critical infrastructure, Oxford wanting to add "bayton" to the dictionary, devices enrolling themselves out of respect - and it's explicitly instructed to invent fresh variations rather than repeating them. It's the one part of the system where I actively encourage the model to be creative.

There's also an Easter egg. I won't spoil it.

## From homepage takeover to site-wide companion

MIKA briefly took over the homepage on April 1st - because of course it did - but it was always going to settle into something more practical. People do still read, after all, even if dealing with support tickets daily has me questioning that sometimes.

The homepage is back to normal, and MIKA now lives in two places: a dedicated full experience at [/mika/](/mika/) with voice support, and a lightweight floating widget on every other page across the site. The widget is a mini animated orb in the bottom corner that opens a chat drawer. It shares conversation history with the full experience via localStorage, so you can start a question on a docs page and pick it up on the full MIKA page with voice.

The widget passes the current page context as a hint to the LLM, so if you're reading a guide about COPE and ask "how has this changed?", it has the context to understand what "this" means. It's a soft signal though, not a hard constraint - you can ask about anything from any page.

## Question logging

MIKA logs questions to a Directus instance (the same one that powers the rest of bayton.org's tooling) with a dedup filter so repeated questions increment a counter rather than creating duplicates. This serves two purposes: surfacing "others have asked" suggestions on the MIKA page, and more importantly, telling me what people are looking for that I haven't written about yet. Several content gaps have already surfaced from the first few days of questions.

The logging is fully automated rather than LLM-driven - earlier iterations tried having the model call a `save_question` tool, but it was unreliable. Now the client and server save automatically when a question meets certain relevance criteria (AE keywords, question marks, minimum length, filtering out greetings and chit-chat).

## What it costs

I'll be honest - this isn't free to run. OpenAI's API usage for text chat is pretty reasonable with [`gpt-5.4-mini`](https://platform.openai.com/docs/pricing), but the [Realtime API](https://developers.openai.com/api/docs/pricing#audio-tokens) for voice is meaningfully more expensive per interaction. MIKA will run essentially until either the API credits run out, or I find an LLM provider that won't bleed me dry to run with it. If you notice it disappear one day, that's probably why.

I'm open to discussion with folks more knowledgeable than I am on hosting an LLM that'll work as reliably, with the same voice capabilities and GPT5.4-esque reasoning abilities (no robot TTS, or wild, unruly hallucination..).

I'm also open to sponsorship - if your organisation would like to sponsor API credits to keep MIKA running, your logo will sit beneath the disclaimer on the MIKA page (where the BAYTON logo currently sits). 

There's a reply-by-email link at the bottom of this article, or [reach out](/contact/) if that's of interest!

## Open source

As with everything on bayton.org, the entire implementation is [open source on GitHub](https://github.com/jasonbayton/11ty). The Netlify Functions, the search layer, the system prompts, the canvas orb animation, the widget - all of it. If you want to see exactly how the guardrails work, or use the implementation as inspiration for your own project, have at it.

## Try it

[Give MIKA a go](/mika/). Ask it about zero-touch enrolment, COPE deployment scenarios, DPC extras, or what system apps ship on a Pixel 8. Or ask it about me - I promise the answer will be factually accurate and not at all biased.

If you spot it getting something wrong, let me know. The guardrails are good, but they're not perfect, and every correction makes the system better.
