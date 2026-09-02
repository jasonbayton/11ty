---
title: Android Enterprise build tracker
published: '2026-09-02'
status: publish
author: 'Jason Bayton'
excerpt: 'A build-by-build breakdown of enterprise-relevant changes across Android 17 betas, QPR releases, and canary builds - translated into plain language.'
type: documentation
tags:
    - 'General'
layout: base.njk
eleventyNavigation:
  title: Android Enterprise build tracker
---

Every Android beta and quarterly platform release (QPR) ships changes that affect how organisations manage their devices. Most of the official documentation is aimed at app developers, and the underlying framework changes go entirely undocumented until they surface in a stable release months later.

This tracker fills the gap. Each entry below covers a single build and summarises what changed for enterprise management - focusing on what device policy controller (DPC) apps will be able to do, followed by broader platform changes that IT teams and EMM vendors should be aware of. Where a feature is still gated behind a flag or marked provisional, the entry says so.

The source data comes from automated firmware teardowns comparing successive builds of the `DevicePolicyManager` framework, enterprise apps, permissions, and related platform components. For full technical detail on a given release, see the corresponding "new in Android for enterprise" reports, such as [New in Android 17 for enterprise](/android/android-17-enterprise-features/) and [New in Android 16 for enterprise](/android/android-16-enterprise-features/).

**How to read the status labels:**

- **Shipped** - the feature is live in a stable release
- **Enabled** - the backing flag has graduated to `true` in the beta track; expected to ship
- **Provisional** - the API is present but gated behind a flag still set to `false`; may change before stable
- **Platform stability** - the API surface is frozen; what ships in this build ships in the stable release

<div class="callout callout-green">
<div class="callout-heading callout-heading-small">AI-assisted content</div>

These reports are generated with the assistance of AI, AI tears the respective build(s) down and extracts relevant data, with evidence. This is then reviewed and reported. Due to the nature of pulling factory OTAs and images apart, I won't ever claim 100% accuracy of the reports. Nor do I guarantee reported items will reach production builds; in fact following Google's move to trunk stable development, it will be very normal to catch previews of things that may not ship for several releases.

</div>

<div class="release-list">
{% set first_item = true %}
{% set releaseNotes = collections['Android Enterprise build tracker'] | sort(attribute='data.published') | reverse %}
{% for post in releaseNotes %}
{% for tag in post.data.categories %}
{% if tag.includes("Android Enterprise build tracker") %}

<details {% if first_item %}open{% set first_item = false %}{% endif %}>
<summary><h3 id="{{ post.data.eleventyNavigation.title | slug }}"><a href="{{ post.url }}">{{ post.data.eleventyNavigation.title }}</a></h3> - {{ post.data.published | dateFull }}</summary>

<div class="release-content">
{{ post.templateContent | safe }}
</div>
</details>

{% endif %}
{% endfor %}
{% endfor %}
</div>
