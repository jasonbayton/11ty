---
title: SCHOOLPORTH
parent: Projects
titleimage: '/img/bayton_logos/schoolporth_hero.png'
date: '2026-09-11'
status: publish
author: 'Jason Bayton'
excerpt: 'An independent, unofficial companion app for ClassCharts - a cleaner, faster way for parents and pupils to keep up with school life.'
type: page
layout: project.njk
---
**SCHOOLPORTH is an independent, unofficial companion app for ClassCharts, giving parents and pupils a cleaner, faster, native Android way to keep up with school life.**

## What is SCHOOLPORTH?

SCHOOLPORTH is a native Android app that presents your existing ClassCharts information in a modern, distraction-free interface. Sign in with the ClassCharts account you already use and everything is laid out the way a phone app should be - quick to open, easy to read, and built for glancing at on the go.

Depending on what your school has enabled, SCHOOLPORTH surfaces:

- **Behaviour** - positive and negative points, reasons, and a running summary
- **Attendance** - the statutory AM/PM figure plus a per-subject breakdown
- **Timetable** - today and the days around it, with rooms and teachers
- **Homework** - what's set, what's due, and marking it done
- **Announcements** - school notices, with comments and reactions where allowed
- **Wellbeing** - check-ins and history
- **Rewards** - the points shop and badges
- **Messages** - two-way communication with staff
- **Report an absence** - submit an absence, attach evidence, and edit it afterwards
- **Academic reports, detentions, pupil details** - and more

It works for both **parent** and **pupil** accounts, and if you're a parent with more than one child you can switch between them in a tap.

## How does it work?

SCHOOLPORTH doesn't hold your data or run a server of its own. When you sign in, it talks to the **same ClassCharts backend the official apps use**, on your behalf, and shows you what comes back. Actions you take - marking homework, reporting an absence, sending a message - go straight to ClassCharts exactly as they would in the official app.

Your credentials and your child's information stay between your device and ClassCharts. Notifications are generated on-device so you hear about new behaviour points, announcements, homework and the like without having to go looking.

## Things to be aware of

SCHOOLPORTH is a personal, best-effort project rather than an official product. Two things are worth understanding before you come to rely on it.

<div class="callout callout-blue">
<div class="callout-heading">Independent and unofficial</div>

SCHOOLPORTH is an independent project by [Bayton](/). It is **not affiliated with, endorsed by, or connected to ClassCharts or Tes** (its owner). "ClassCharts" and "Tes" are trademarks of their respective owners, used here only to describe what SCHOOLPORTH is compatible with. SCHOOLPORTH doesn't create, sell, or manage ClassCharts accounts - you sign in with your own, provided by your school.

</div>

<div class="callout callout-orange">
<div class="callout-heading">It follows a moving target</div>

ClassCharts has no public or documented API. SCHOOLPORTH works by using the same private endpoints the official ClassCharts apps use, and **those can change at any time, without notice**. When they do, parts of SCHOOLPORTH may stop working until it's updated to match. I fix breakages as quickly as I reasonably can, but there are no guarantees of uptime, feature parity, or continued compatibility. If something looks off, it's worth checking the official ClassCharts app to confirm whether it's SCHOOLPORTH or ClassCharts itself.

</div>

## Thanks & credits

SCHOOLPORTH stands on the shoulders of the community that has reverse-engineered and documented the ClassCharts API. In particular, thanks to the unofficial [**ClassCharts API** project on GitHub](https://github.com/classchartsapi) - its documentation and libraries made understanding the endpoints far quicker than starting from scratch. This is a community effort, not an official ClassCharts release.

## What does SCHOOLPORTH cost?

SCHOOLPORTH is **free**. It's a personal project built to make ClassCharts nicer to live with day to day. If you'd like to support continued development of this and other projects, please do [get in touch](/contact).

## Get started

You can find SCHOOLPORTH on Google Play:

<a href="https://play.google.com/store/apps/details?id=org.bayton.schoolporth">{% include "_src/_includes/_assets/img/site_media/get_it_on_google.svg" %}</a>

## Help & support

Feedback matters and shapes what gets built next. You can post to the [Discord community](https://discord.gg/5yMfb9UWm9), tag me on [LinkedIn](https://linkedin.com/in/jasonbayton), or [get in touch](/contact) directly.

For how your information is handled, see the [privacy policy](/projects/privacy-policy/).
