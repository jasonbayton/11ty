---
title: DOCUMENT APP GENERATOR support
parent: DOCUMENT APP GENERATOR
published: '2026-06-15'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags:
    - Document App Generator
    - 'bayton-projects'
layout: base.njk
eleventyNavigation:
  title: Support
  order: 1
---

<div class="grid grid-column-2 grid-column-mobile-1 grid-gap-h-20 grid-gap-mobile-h-0">
<div class="grid-left">

## Getting started

<div class="support-list">
  <ul>
  {% for post in collections['Document App Generator'] %}
  {% for tag in post.data.categories %}
  {% if tag.includes("Document App Generator Setup") %}
  <li><a href="{{ post.url | url }}">{{ post.data.eleventyNavigation.title }}</a></li>
  {% endif %}
  {% endfor %}
  {% endfor %}
  </ul>
</div>

## Configuration

<div class="support-list">
  <ul>
  {% for post in collections['Document App Generator'] %}
  {% for tag in post.data.categories %}
  {% if tag.includes("Document App Generator Configuration") %}
  <li><a href="{{ post.url | url }}">{{ post.data.eleventyNavigation.title }}</a></li>
  {% endif %}
  {% endfor %}
  {% endfor %}
  </ul>
</div>

</div>
<div class="grid-right">

## Troubleshooting

<div class="support-list">
  <ul>
  {% for post in collections['Document App Generator'] %}
  {% for tag in post.data.categories %}
  {% if tag.includes("Document App Generator Troubleshooting") %}
  <li><a href="{{ post.url | url }}">{{ post.data.eleventyNavigation.title }}</a></li>
  {% endif %}
  {% endfor %}
  {% endfor %}
  </ul>
</div>

## Release notes

<div class="support-list">
  <ul>
  {% set releaseNotes = collections['Document App Generator'] | sort(attribute='fileSlug') | reverse %}
  {% set releaseCount = 0 %}

  {% for post in releaseNotes %}
  {% if releaseCount < 10 %}
  {% for tag in post.data.categories %}
  {% if tag.includes("Document App Generator Release Notes") %}
  <li><a href="{{ post.url | url }}">{{ post.data.eleventyNavigation.title }}</a> - {{ post.data.published | dateFull }}</li>
  {% set releaseCount = releaseCount + 1 %}
  {% endif %}
  {% endfor %}
  {% endif %}
  {% endfor %}
  </ul>

  <p>
    <a href="/projects/document-app-generator/release-notes/">View all DOCUMENT APP GENERATOR release notes</a>
  </p>
</div>

</div>
</div>

---

DAG is a browser-based tool hosted at [gen.bayton.org/documents](https://gen.bayton.org/documents/). All builds are produced on the server; nothing is installed locally.
