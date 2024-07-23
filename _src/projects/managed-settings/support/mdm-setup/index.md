---
title: EMM setup guides for MANAGED SETTINGS
parent: MANAGED SETTINGS support
published: '2024-07-22'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Managed Settings'
    - 'bayton-projects'
layout: base.njk
eleventyNavigation: 
    order: 4
---

<div class="support-list">
  <ul>

  {% for post in collections['Managed Settings'] %}
  {% for tag in post.data.categories %}
  {% if tag.includes("EMM setup guides") %}

  <li>{% include "_src/_includes/_assets/img/bayton_logos/managed_settings_icon_xs.svg" %} <a href="{{ post.url | url }}">{{ post.data.title }}</a></li>

  {% endif %}
  {% endfor %}
  {% endfor %}

  </ul>
</div>