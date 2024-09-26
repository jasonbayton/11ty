---
title: EMM setup guides for PACKAGE SEARCH
parent: PACKAGE SEARCH support
published: '2024-07-22'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Package Search'
    - 'bayton-projects'
layout: base.njk
eleventyNavigation: 
    order: 4
    title: EMM setup guides
---

<div class="support-list">
  <ul>

  {% for post in collections['Package Search'] %}
  {% for tag in post.data.categories %}
  {% if tag.includes("EMM setup guides") %}

  <li>{% include "_src/_includes/_assets/img/bayton_logos/package_search_icon_xs.svg" %} <a href="{{ post.url | url }}">{{ post.data.eleventyNavigation.title }}</a></li>

  {% endif %}
  {% endfor %}
  {% endfor %}

  </ul>
</div>