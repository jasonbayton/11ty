---
title: DOCUMENT APP GENERATOR release notes
parent: DOCUMENT APP GENERATOR
published: '2026-06-15'
date: '2026-06-15T00:00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags:
    - 'Document App Generator'
    - 'bayton-projects'
layout: base.njk
eleventyNavigation:
  order: 2
  title: Release notes
---

## Release notes

<div class="release-list">
{% set first_item = true %}
{% set releaseNotes = collections['Document App Generator'] | sort(attribute='fileSlug') | reverse %}
{% for post in releaseNotes %}
{% for tag in post.data.categories %}
{% if tag.includes("Document App Generator Release Notes") %}

<details {% if first_item %}open{% set first_item = false %}{% endif %}>
<summary><h3><a href="{{ post.url }}">{{ post.data.eleventyNavigation.title }}</h3></a> - {{ post.data.published | dateFull }}</summary>

<div class="release-content">
{{ post.templateContent | safe }}
</div>
</details>

{% endif %}
{% endfor %}
{% endfor %}
</div>
