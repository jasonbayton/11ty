---
title: 'Relaunching bayton.org'
date: '2022-08-06T21:41:00+00:00'
status: publish
author: 'Jason Bayton'
excerpt: "After a year of designing and developing, the new site is live. Come and see what's new."
type: post
tags:
    - Meta
---
Welcome back! 

Every few years I like to roll out sweeping changes to this website. Whether that's to keep up with modern design trends, to apply a fresh coat of paint, throw in usability improvements, or just to wipe clean and start again without the accrued bloat of years of tweaking, it's a nice opportunity to look at the platform from the ground up and re-assess what I want this thing to do.

For this release, it's primarily about the back-end maintenance & functionality; my goal here was to get off of WordPress, which is a fine platform by all regards, and switch to something static. I landed on a combination of [Eleventy](https://www.11ty.dev) and [Cloudflare Pages](https://pages.cloudflare.com/) which, in addition to leveraging CF's global network to improve latency and load times to my biggest - but most distant - audiences (up to recently all served from London), took my hosting costs from ~£15/month to £0. 

Let's get into the changes. 

## The new theme

![Bayton V6](https://cdn.bayton.org/uploads/2022/08/Screenshot2022-08-07_1.png)

For version 6 I wanted to focus on white space, easily consumable content with minimal distraction, and a site that loads quickly with little unnecessary media. Articles will of course have the uploads they have (as above) but the structure around the content should load very quickly on non-media-heavy pages. This has been reflected in the removal of most stock imagery, featured images, topic-based-icons, and more, and leaves a mostly text-based result that I think works well (it's of course subjective).

The site has been reduced from several page layouts and is now split across two: single-column and dual-column. Pages and the home page work single-columned, while articles and documentation leverage a two-column layout to support page contents and contextual navigation. If there are any special cases, such as the multi-column layout of [/android](/android) or the like, these are now done in-page with a bit of specific styling, therefore reducing the complexity of the overall design and template-for-edgecase approaches used previously on WordPress.

The main blogroll (articles) now live under [/blog](/blog) as this was much easier to manage from a content-organisation point of view, and follows how documents are stored also.

The footer is still a work in progress, but it's functional for now.

## A new logo

After a good 7+ years with the old logo, it's time I think for a change. I opted for a simple stylised signature, and I'm really happy with it: 

![new logo](https://cdn.bayton.org/uploads/2022/08/JasonBayton_purple.svg)

I've coloured it purple above to suit both dark and light themes when viewing this post. It'll likely remain only black/white unless a mood strikes This logo will start showing up on my downloadable content and everywhere else over the next few weeks. 

## Dark mode reintroduced

Dark mode has come and gone a few times over the years, and has had caveats with every implementation. The last time I [posted about it](/blog/2017/02/introducing-night-mode-on-bayton-org) was in 2017, but since then I've tried a few iterations I hadn't ultimately been happy with. 

That's changed in v6 (v5 in fact, but that didn't make the cut), as modern CSS and browser support has allowed not only for dark mode to be implemented in a much simpler manner (I'm not a javascript fan by any means, and they often rely on this), but allows me to leverage `media queries` to automate dark/light based on user preference automatically as well. The CSS incorporates a simple `@media (prefers-color-scheme: dark/light) {}` query that handles all of the automation there. It's nice. 

## ~~WordPress~~ Eleventy powered

This site has been WordPress powered since inception, and it has served me well. As time has passed however and I've dabbled with plugins, themes, customisations, and more, it has bloated out from a minute site into a behmouth that's simply a pain to manage. Add to that the need to pay for hosting over the years, VM security, system management, and it's all a bit of a farce.

Not wanting to spend more for managed hosting than I do on VMs is one reason I didn't offload the site to a managed WP cloud provider or switch to WP.com, the other being loss of control and the limitations on underlying services that would cause incompatibilities with how the site is deployed. A multitude of reasons have popped up over the years, and I've rebuilt the site from fresh copies of WordPress multiple times (as much as I'd like to say I've upgraded the one WP install from 2.x all the way up to today) to attempt to reduce technical debt, but I've had enough. 

In addition to reducing overhead, I've wanted to push all of my content to GitHub for a few years. As a hub of information all about Android Enterprise and the desire to keep producing content, maintaining the changes Google introduces so frequently can be a bit of a chore. Things like when Google updated branding from Android for Work, to Android enterprise, to eventually Android **E**nterprise, or all twenty-eight names for COPE they've come up with so far and the associated acronyms (😉). Each change required the manual edit of up to 100 articles and docs, or in one case a direct database find & replace, which is not ideal. 

There are obviously the community/contribution benefits to being open source as well, meaning organisations I work with can directly contribute their logo to my logo folder for display on the site, contribute their own DPC identifier or zero-touch DPC extras without filling in a form, raise issues on outdated/incorrect content, and more. Blimey, I may even consider a doc/article or two with attribution if it's decent.

Over the last year I had started building a new PHP CMS from the ground up (I know enough to be dangerous) with another custom theme, v5, still hosted up on [the beta site](https://beta.bayton.org) at time of publishing, but a few weeks ago I was introduced to [Eleventy](https://www.11ty.js) by my UX Engineering colleague and honestly, it made far more sense. 

Remaining on a PHP-backed solution would retain the need for hosting, even if only minute, and even if all content lived up in GitHub, which would continue the systems management overhead I don't really want to do. Eleventy allows me to develop and build locally, and combined with ~~CloudFlare Pages~~ Netlify integration with GitHub for automated deployments, it means I don't need any self-managed infra in place to keep the site up. 

Today I can knock up my markdown-based post in whatever text editor (or [GitHub.dev](https://github.dev) if I'm not using my normal setup), push it to GitHub, and minutes later it appears on bayton.org. Magic. 

## WIP

The new site isn't fully finished, and I'm working through an [issues list](https://github.com/jasonbayton/11ty/issues) that's getting smaller by the day. Over the next few weeks I expect to get everything sorted and 1:1 with the old website. You'll notice for example on mobile at time of publishing there's no menu for the global nav, and if you've used RSS to pull content in the past, you won't have seen this come through yet. It'll get there soon enough.

Some of the content has been shifted around. Things like the Android docs now living under `/android` and not `/docs/enterprise-mobility/android` as I shift away from the wider EMM content strategy and continue to specialise in all things Android. `/docs` over the next few months will likely disappear, but all content has redirects in place so nothing is lost. If you do link to me from your own internal or external resources, give that a courtesy glance when you get a moment, but rest assured I believe I've handled all forwarding (and I'm watching 404's daily).

If you find issues with the website, please feel free to raise it on [GitHub](https://github.com/jasonbayton/11ty/issues/new) and I'll add it to the list. I think most of the bigger issues affecting site usability are resolved as of now though. 

If there's an issue with content, you can either raise an issue, or contribute an edit directly, as so: 

![Edit a page](https://cdn.bayton.org/uploads/2022/08/2022-08-07-14.33.10.gif)

(I'm back to using a Mac as my primary machine, so GIFs are absolutely coming back to my content more often).

If you've been visiting the site for a while, I trust you'll find the new site as usable as ever, and hopefully moreso. If you have feedback or suggestions, you know where to find me 😁