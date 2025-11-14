---
title: PACKAGE SEARCH support
parent: PACKAGE SEARCH
published: '2024-04-30'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - Package Search
    - 'bayton-projects'
layout: base.njk
eleventyNavigation:
  title: Support
  order: 1

---

<div class="grid grid-column-2 grid-column-mobile-1 grid-gap-h-20 grid-gap-mobile-h-0">
<div class="grid-left">

## Setup

<div class="support-list">
  <ul>

  {% for post in collections['Package Search'] %}
  {% for tag in post.data.categories %}
  {% if tag.includes("Package Search Setup") %}

  <li>{% include "_src/_includes/_assets/img/bayton_logos/package_search_icon_xs.svg" %} <a href="{{ post.url | url }}">{{ post.data.eleventyNavigation.title }}</a></li>

  {% endif %}
  {% endfor %}
  {% endfor %}

  </ul>
</div>

## Customisation

<div class="support-list">
  <ul>

  {% for post in collections['Package Search'] %}
  {% for tag in post.data.categories %}
  {% if tag.includes("Package Search Customisation") %}

  <li>{% include "_src/_includes/_assets/img/bayton_logos/package_search_icon_xs.svg" %} <a href="{{ post.url | url }}">{{ post.data.eleventyNavigation.title }}</a></li>

  {% endif %}
  {% endfor %}
  {% endfor %}

  </ul>
</div>

## Troubleshooting

<div class="support-list">
  <ul>

  {% for post in collections['Package Search'] %}
  {% for tag in post.data.categories %}
  {% if tag.includes("Package Search Troubleshooting") %}

  <li>{% include "_src/_includes/_assets/img/bayton_logos/package_search_icon_xs.svg" %} <a href="{{ post.url | url }}">{{ post.data.eleventyNavigation.title }}</a></li>

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

  {% set releaseNotes = collections['Package Search'] | sort(attribute='data.published') | reverse %}
  {% set releaseCount = 0 %}

  {% for post in releaseNotes %}
  {% if releaseCount < 10 %}
  {% for tag in post.data.categories %}
  {% if tag.includes("Package Search Release Notes") %}

  <li>
  {% include "_src/_includes/_assets/img/bayton_logos/package_search_icon_xs.svg" %} <a href="{{ post.url | url }}">{{ post.data.eleventyNavigation.title }}</a> - {{ post.data.published | dateFull }}
  </li>

  {% set releaseCount = releaseCount + 1 %}
  {% endif %}
  {% endfor %}
  {% endif %}
  {% endfor %}

  </ul>

  <p>
    <a href="/projects/package-search/release-notes/">View all PACKAGE SEARCH release notes</a>
  </p>
</div>

</div>
</div>