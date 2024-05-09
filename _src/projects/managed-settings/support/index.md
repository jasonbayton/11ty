---
title: Managed Settings support
parent: Managed Settings
published: '2024-04-30'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - Managed Settings
    - 'bayton-projects'
layout: base.njk
---

<div class="grid grid-column-2 grid-column-mobile-1 grid-gap-h-20 grid-gap-mobile-h-0">
<div class="grid-left">

## Setup

<div class="support-list">
  <ul>

  {% for post in collections['Managed Settings'] %}
  {% for tag in post.data.categories %}
  {% if tag.includes("Managed Settings Setup") %}

  <li>{% include "_src/_includes/_assets/img/bayton_logos/managed_settings_icon_xs.svg" %} <a href="{{ post.url | url }}">{{ post.data.title }}</a></li>

  {% endif %}
  {% endfor %}
  {% endfor %}

  </ul>
</div>

## Customisation

<div class="support-list">
  <ul>

  {% for post in collections['Managed Settings'] %}
  {% for tag in post.data.categories %}
  {% if tag.includes("Managed Settings Customisation") %}

  <li>{% include "_src/_includes/_assets/img/bayton_logos/managed_settings_icon_xs.svg" %} <a href="{{ post.url | url }}">{{ post.data.title }}</a></li>

  {% endif %}
  {% endfor %}
  {% endfor %}

  </ul>
</div>

## Troubleshooting

<div class="support-list">
  <ul>

  {% for post in collections['Managed Settings'] %}
  {% for tag in post.data.categories %}
  {% if tag.includes("Managed Settings Troubleshooting") %}

  <li>{% include "_src/_includes/_assets/img/bayton_logos/managed_settings_icon_xs.svg" %} <a href="{{ post.url | url }}">{{ post.data.title }}</a></li>

  {% endif %}
  {% endfor %}
  {% endfor %}

  </ul>
</div>

</div>
<div class="grid-right">

## Release notes

<div class="support-list">
  <ul>

  {% for post in collections['Managed Settings'] %}
  {% for tag in post.data.categories %}
  {% if tag.includes("Managed Settings Release Notes") %}

  <li>{% include "_src/_includes/_assets/img/bayton_logos/managed_settings_icon_xs.svg" %} <a href="{{ post.url | url }}">{{ post.data.title }}</a> - {{ post.data.published | dateFull }}</li>

  {% endif %}
  {% endfor %}
  {% endfor %}

  </ul>
</div>

</div>
</div>