---
title: Android
published: '2017-04-07T19:31:54+01:00'
date: "git Last Modified"
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
layout: base.njk
tags: "General"
eleventyNavigation:
  key: Introduction
  order: 0000
templateEngineOverride: njk,md
discourse_permalink:
    - 'https://discuss.bayton.org/t/about-the-android-category/13'
---

If you manage Android devices in the enterprise, you’ve come to the right place! Below you’ll find a selection of documents covering all aspects of Android and Android Enterprise.

Whether you’re just discovering Android Enterprise or are looking to boost existing knowledge, the below should be helpful across the board. Looking for something specific that hasn’t been documented? Submit your question [on GitHub](https://github.com/jasonbayton/11ty/issues/new?assignees=jasonbayton&labels=documentation&template=content-request.md&title=%5BContent+request%5D) (account required)!

## Advisories

<div class="android-advisories">

{% for post in collections['Advisories'] | reverse %}
{% if loop.index0 < 3 %}

{% set advisoryLabel = "ADVISORY" %}
{% if post.data.advisory_type %}
  {% set advisoryLabel = post.data.advisory_type | upper %}
{% else %}
  {% for t in post.data.tags %}
    {% if t and (t | lower) == "issue" %}
      {% set advisoryLabel = "ISSUE" %}
    {% elif t and (t | lower) == "notice" %}
      {% set advisoryLabel = "NOTICE" %}
    {% endif %}
  {% endfor %}
{% endif %}

<a class="android-advisory-card" href="{{ post.url | url }}">
  <div class="android-advisory-card__meta">
    <span class="android-advisory-card__date">{{ post.date | dateFull }}</span>
    <!--span class="android-advisory-card__badge">{{ advisoryLabel }}</span-->
  </div>
  <div class="android-advisory-card__title">{{ post.data.title }}</div>
  {% if post.data.excerpt and post.data.excerpt | length %}
  <div class="android-advisory-card__excerpt">{{ post.data.excerpt }}</div>
  {% endif %}
</a>

{% endif %}
{% endfor %}

<div class="android-advisories__actions">
  <a class="button button-small" href="/android/advisories">more »</a>
</div>

</div>

## Docs

<div class="android-docs-grid">

{% set docCategoryMeta = {
  "Fundamentals": { "desc": "Core concepts and getting started guides", "flag": "Popular" },
  "Device Management": { "desc": "Provisioning, enrolment, and device lifecycle" },
  "Work Profiles": { "desc": "BYOD and work profile management" },
  "App Management": { "desc": "Deploy and manage enterprise applications" },
  "Security & Compliance": { "desc": "Policies, encryption, and security features" },
  "Enterprise Solutions": { "desc": "Large-scale deployment strategies", "flag": "New" }
} %}

{% for tag in android_tags %}
{% set taglist = collections[ tag.name ] | eleventyNavigation %}
{% set tagCount = taglist | length %}
{% set meta = docCategoryMeta[tag.name] %}

<article class="android-doc-card">
<div class="android-doc-card__header">

{% if meta and meta.flag %}
  <span class="android-doc-card__flag">{{ meta.flag }}</span>
{% endif %}
</div>

<h3 class="android-doc-card__title">{{ tag.name }}</h3>

{% if meta and meta.desc %}
<p class="android-doc-card__desc">{{ meta.desc }}</p>
{% endif %}

<ul class="android-doc-card__links">
{% for post in taglist %}
{% if loop.index0 < 4 %}
  <li><a href="{{ post.url }}">{{ post.title }}</a></li>
{% endif %}
{% endfor %}
</ul>

<div class="android-doc-card__footer">
<span class="android-doc-card__count">{{ tagCount }} article{% if tagCount != 1 %}s{% endif %}</span>
<a class="android-doc-card__viewall" href="/tags/{{ tag.name | slugify }}">View all</a>
</div>
</article>

{% endfor %}

</div>

## Something missing?

![](/img/site_media/baydroid_unsure.png) 
Are you looking for information not published here? Feel free to [get in touch](mailto:jason@bayton.org) to ask a question or [request a new document!](https://github.com/jasonbayton/11ty/issues/new?assignees=jasonbayton&labels=documentation&template=content-request.md&title=%5BContent+request%5D) (GitHub account required)
