---
title: WEB APP GENERATOR support
parent: WEB APP GENERATOR
published: '2026-05-21'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags:
    - Web App Generator
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
  {% for post in collections['Web App Generator'] %}
  {% for tag in post.data.categories %}
  {% if tag.includes("Web App Generator Setup") %}
  <li><a href="{{ post.url | url }}">{{ post.data.eleventyNavigation.title }}</a></li>
  {% endif %}
  {% endfor %}
  {% endfor %}
  </ul>
</div>

## Configuration

<div class="support-list">
  <ul>
  {% for post in collections['Web App Generator'] %}
  {% for tag in post.data.categories %}
  {% if tag.includes("Web App Generator Configuration") %}
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
  {% for post in collections['Web App Generator'] %}
  {% for tag in post.data.categories %}
  {% if tag.includes("Web App Generator Troubleshooting") %}
  <li><a href="{{ post.url | url }}">{{ post.data.eleventyNavigation.title }}</a></li>
  {% endif %}
  {% endfor %}
  {% endfor %}
  </ul>
</div>

</div>
</div>

---

WAG is a browser-based tool hosted at [gen.bayton.org/webapp](https://gen.bayton.org/webapp/). All builds are produced on the server; nothing is installed locally.
