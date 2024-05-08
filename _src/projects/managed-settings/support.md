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

<div class="grid grid-column-2 grid-column-mobile-1">
<div class="grid-left">

## Setup

<div class="support-list">
  <ul>

  {% for post in collections['Managed Settings'] %}
  {% for tag in post.data.categories %}
  {% if tag.includes("Managed Settings Setup") %}

  <li>{% include "../../_includes/_assets/img/bayton_logos/managed_settings_icon_xs.svg" %} <a href="{{ post.url | url }}">{{ post.data.title }}</a></li>

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

  <li>{% include "../../_includes/_assets/img/bayton_logos/managed_settings_icon_xs.svg" %} <a href="{{ post.url | url }}">{{ post.data.title }}</a></li>

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

  <li>{% include "../../_includes/_assets/img/bayton_logos/managed_settings_icon_xs.svg" %} <a href="{{ post.url | url }}">{{ post.data.title }}</a></li>

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

  <li>{% include "../../_includes/_assets/img/bayton_logos/managed_settings_icon_xs.svg" %} <a href="{{ post.url | url }}">{{ post.data.title }}</a> - {{ post.data.published | dateFull }}</li>

  {% endif %}
  {% endfor %}
  {% endfor %}

  </ul>
</div>

</div>
</div>

## Further support

Need something else answered? Submit [feedback](https://docs.google.com/forms/d/e/1FAIpQLSdYQrOPM0dKwCmcSjfxgoK2rQvhQXXyw2pk9nMqYBn0F2IhRw/viewform?usp=sf_link), post to the [support group](https://groups.google.com/a/bayton.org/g/project-support) or tag me on [LinkedIn](https://linkedin.com/in/jasonbayton). 