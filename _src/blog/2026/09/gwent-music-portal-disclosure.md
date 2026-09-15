---
 title: "I built an app for my son's music lessons, then reported its API out of existence"
 date: '2026-09-15'
 status: publish
 author: 'Jason Bayton'
 excerpt: "A weekend project to check my son's music lessons from my phone turned into a responsible-disclosure exercise that closed the very API the app depended on. Here's what happened, and the app I open-sourced at the end of it."
 type: post
 tags:
     - Projects
     - General
---

My son has brass lessons through Gwent Music, the Newport City Council music service. Like a lot of these services, the admin all lives in a parent portal, in this case one run by Paritor on their Xperios platform. Timetables, secure messages from the tutor, invoices, the usual.

The portal is fine. But I wanted the information on my phone the way I want everything on my phone: a native app, a glance at the next lesson, a notification when the tutor moves a session, quick access to messages, etc. So I decided to build one. What I did not expect was that the project would end with me reporting the platform's API to the council, the API getting locked down as a result, and my own app losing the only door it had to make it viable. 

I reported my project to death.

## The original goal

The objective I set was small: read my own Gwent Music data on my own phone, without logging into the portal every time. Next lesson on the home screen, the schedule, my messages, my account. Read-mostly, native, no WebView wrapper around the website. If it worked, I would tidy it up and share it around the community.

## Initial exploration

The first thing I did was work out how the portal talked to its backend. My early conclusion was pessimistic: there was no obvious public API key, the portal's login token did not look like it was scoped for direct API use, and I assumed I would have to drive the website with a headless browser and scrape it. Sloggish, but doable.

Then I dug properly into the Azure AD B2C tenant behind the sign-in. The portal's own login only ever handed back an identity token, no use for calling the API directly, which was the dead end above. But the same tenant also exposed a public OAuth client, no secret, that would mint an access token genuinely scoped for the API, and it accepted a loopback redirect back to `localhost`. Public clients like that are meant to be driven by an app the user controls, so there was nothing stopping me completing the very same flow from my own: a standard system-browser authorisation-code exchange with PKCE, ending in a real, API-scoped token. No scraping. A real token, from the real identity provider, for the real API.

That API was reachable from the public internet, and so was its OpenAPI document, all 2,600-odd operations of it. Whether that direct reachability was ever meant to be public, I genuinely do not know. It was, though.

## What I found

The API is supposed to check two things on every request: a system key identifying the music service, and your personal login token proving who you are. I found two problems that, together, were serious:

- **The system key was not a secret.** It is written into the parent portal's own page. Any logged-in parent could read the customer's key straight out of their own session.
- **The API did not actually enforce the login token.** Requests carrying only that shared key, with no personal token at all, were accepted and returned data.

Put those together and the single value protecting the whole service was a key that every parent could already see. And because access was keyed off identifiers in the request rather than off who you were, changing an identifier changed whose data came back. That is textbook broken object-level authorisation, sitting on top of a shared secret handed to every end user.

I proved it against my own account only. With just the key and no token, I could retrieve my own messages and my own contact record. That's where I stopped, because good grief.

I wasn't about to start actively proving I could manipulate the service as that'd land me in trouble, so everything I say below about the wider blast radius came from my reading of the platform's own published interface, not something I ran directly. It was later confirmed to be accurate.

That reading was not comforting. The same key could - according to my understanding - reach other families' messages, contacts, pupil records and billing; it could reach endpoints that list every pupil and every staff member; and it could reach an account-management surface that included password resets and removing multi-factor authentication. On paper, one key any parent could copy was enough to walk from "a parent" to "any account, including staff". 

This is children's data. I couldn't rightly let it sit like this.

## Shooting myself in the foot

The sensible, and frankly obvious, thing to do at this point was to stop admiring my clever little app and report the hole. Which I then did. The property that made the app possible up to this point, an API a client could reach directly with a parent's own credentials, was the property that had to be fixed.

My assumption was once Paritor picked up on the issue, they'd simply address the gap - requiring both the API key and the beaerer of the account, limiting retrival of data to the user scope, and just lock down those endpoints a parent is not supposed to access at all.

## Disclosure

Gwent Music is run by Newport City Council, and the council is the data controller for my son's information, so the council's Data Protection Officer was the correct place to start. On **4 September** I reported it privately to the council's information-management team and copied Gwent Music, setting out what I had found.

I was clear that this looked like Paritor's platform rather than anything Gwent Music had built. The portal, the API and the login all belong to Paritor, hosted on their infrastructure, with Gwent Music as one customer among many. That meant the same weakness would affect every organisation on the platform, and only Paritor could actually fix it, but the council needed to know and was best placed to push.

The council acknowledged it on **7 September** and said they were investigating.

## What they did first

On **8 September** the council came back to say it was resolved. I checked, and the specific thing I had reported was genuinely fixed - requests carrying only the shared key, with no login token, were now refused - good, and fast.

But while confirming that, I found the fix did not appear to cover everything.

## My follow-up

Using nothing more than my own ordinary parent login, I could still reach the administrative and identity functions, the ones that look up and list user accounts and read system configuration, that a parent account should have no business touching. The key-only data leak was closed, but the underlying problem behind it, the system not properly checking whether the logged-in user was allowed to do a thing, still applied to the admin surface. It looked like the specific hole had been patched rather than the root cause.

I said so, again through the council, and waited.

## What they did to close it off

On **10 September** the council relayed Paritor's response: the follow-up was correct, and it had been acted on. The identity and admin endpoints are now gated. Separately, an earlier slowdown I had noticed turned out to be a hosting-capacity issue that had since been fixed. The council closed their security involvement and pointed the remaining "so can my app exist" questions at Gwent Music.

## The leftover question

Paritor told the council the object-level check now behaves as it should and matches their own testing, which I am inclined to take at face value. I just could not confirm it from outside: the API answers a parent request with a 401 (outright rejection) rather than the 403 (recognised, but not allowed) I would expect from a real permission check, and a blanket 401 looks the same whether a proper per-record check sits behind it or the whole route is simply bolted shut. I did not feel it worth the continued prodding since the route is closed either way.

So I left that question on the record with the council, along with a request: if the direct-to-API route is ever reopened, intentionally or otherwise, they'd need to immediately check a parent account can't still access those old routes. 

## The app I shot in the foot

Which brings me to the project, because it did work, and I am quite happy with it!

![Home dashboard showing the next lesson, an upcoming lessons list and an unread messages banner, in the light theme, on seeded mock data](https://cdn.bayton.org/uploads/2026/gwent-music-portal-disclosure/home-light.png)

![The same home dashboard in the dark theme](https://cdn.bayton.org/uploads/2026/gwent-music-portal-disclosure/home-dark.png)

It is a native Android app in Kotlin and Jetpack Compose. No WebView, no wrapper around the website, just Compose screens over a repository layer that turns the API into clean screen models. Authentication is a custom loopback flow: a system-browser tab, authorisation code with PKCE, tokens kept in Keystore-backed encrypted storage, silent refresh, and a clean reconnect state when refresh fails. Not AppAuth, not a WebView, no password ever touching the app itself.

A few things I am particularly pleased with:

- **Offline snapshots with transparent freshness.** Each screen keeps its last good data in a per-account DataStore snapshot, so the app opens to content instantly and then shows you whether what you are looking at is live, refreshing, or stale because a refresh failed. We love a good bit of caching.
- **Notifications without a server.** WorkManager does best-effort background polling and raises local reminders and change alerts, so a moved lesson pings the phone, with quiet hours and privacy-safe payloads, and no push infrastructure to run. Why not just hook in firebase? It wouldn't work on some of my AOSP devices, and I didn't need the added infra.
- **Self-update.** Because this was never going near a store, it has an optional in-app updater that checks a CDN manifest, verifies the download by hash and signing certificate before handing off to Android's installer, and is trivial to rip out if you do not want it.
- **Built to be looked at.** Full light and dark theming, a Go mock server so the whole thing builds and runs with seeded fake data and no account at all, and a real test suite with enforced coverage floors wired into CI.

![Lesson schedule grouped by term, with upcoming and past tabs](https://cdn.bayton.org/uploads/2026/gwent-music-portal-disclosure/schedule.png)

![Secure messages list with read and unread threads](https://cdn.bayton.org/uploads/2026/gwent-music-portal-disclosure/messages.png)

It is roughly 170 source files, it builds keyless from a clean checkout against the mock, and it is a decent reference for how I would put a modern Android client together in 2026.

Since it can no longer function against the live service, I have open-sourced it as an archived reference implementation, MIT licensed, with no keys and nothing that reaches real data:

**[github.com/jasonbayton/gwent-music-android](https://github.com/jasonbayton/gwent-music-android)**

## I asked if I could keep it going

Before shelving it, I put the obvious question to Gwent Music: now the leak was closed, was there any supported way for an app like mine, an authenticated parent reading their own data, to carry on? I offered to maintain it properly, and I said plainly that if they would rather not have a community-built app in the mix, that was entirely understood and it simply ended the road.

The answer, relayed from Paritor, was a courteous no. The Xperios API is a private interface between Paritor's own applications and the service, not a published integration surface: undocumented, changed without notice, no compatibility commitments, so anything built against it would break sooner or later. 

At least, it is _now_ prior to this incident it was open to the internet with a full OpenAPI reference to read from!

On top of that, the data belongs to Gwent Music as the controller, so opening a route for independent apps was not Paritor's to grant on the music service's behalf. Gwent could have approved it but in passing the information unedited to me, I took that to suggest Gwent did _not_ wish to grant it.

They did have a genuinely useful answer to what I actually wanted, though: a Paritor parent app is close to release, a supported and maintained alternative to the web portal, built for exactly the on-the-go access I was after. Which is the right home for this, and honestly a better outcome than a lone parent maintaining an app against an interface that was never meant to be public.

So that was that. My app did not die because the API shifted under it. It died because the people who own the data and the platform said no, reasonably, and are shipping their own. Fair enough, really.

## The moral, such as it is

If you find something like this, report it to the data controller, keep strictly to your own account, and write down what you did not do as carefully as you can. You might close a real hole in a system holding children's data. You might also close your own weekend project in the process. 

Do it anyway.