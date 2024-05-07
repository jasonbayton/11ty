---
title: Release notes
parent: Managed Settings
published: '2024-05-20'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Managed Settings'
    - 'bayton-projects'
layout: base.njk
---

## Release notes

<div class="support-list">
  <ul>

  {% for post in collections['Managed Settings'] %}
  {% for tag in post.data.categories %}
  {% if tag.includes("Managed Settings Release Notes") %}

  <li>{% include "../../../_includes/_assets/img/bayton_logos/managed_settings_icon_xs.svg" %} <a href="{{ post.url | url }}">{{ post.data.title }}</a> - {{ post.data.published | dateFull }}</li>

  {% endif %}
  {% endfor %}
  {% endfor %}

  </ul>
</div>

## Submit a question

Need something else answered? Submit an [issue](https://github.com/jasonbayton/11ty/issues/new?assignees=jasonbayton&labels=documentation&template=content-request.md&title=%5BContent+request%5D), or tag me in a [LinkedIn](https://linkedin.com/in/jasonbayton) post. Questions may be republished on this document, or form the basis of a new document under [/android](/android).