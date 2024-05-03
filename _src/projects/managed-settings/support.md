---
title: Managed Settings support
date: '2024-04-30'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - Managed Settings
    - 'bayton-projects'
layout: project.njk
---
## Release notes

<div class="support-list">
  <ul>

  {% for post in collections['Managed Settings'] %}
  {% for tag in post.data.categories %}
  {% if tag.includes("Managed Settings Release Notes") %}

  <li>{% include "../../_includes/_assets/img/bayton_logos/managed_settings_icon_xs.svg" %} <a href="{{ post.url | url }}">{{ post.data.title }}</a> - {{ post.data.date | dateFull }}</li>

  {% endif %}
  {% endfor %}
  {% endfor %}

  </ul>
</div>

## Setup

{% for post in collections['Managed Settings'] %}
{% for tag in post.data.categories %}
{% if tag.includes("Managed Settings Setup") %}
<div class="post-block">
<div class="post-body">

### [{{ post.data.title }}]({{ post.url | url }})

<div class="post-content">

{{ post.content | safe }}

</div>
</div>
</div>
{% endif %}
{% endfor %}
{% endfor %}

## Troubleshooting

{% for post in collections['Managed Settings'] %}
{% for tag in post.data.categories %}
{% if tag.includes("Managed Settings Troubleshooting") %}
<div class="post-block">
<div class="post-body">

### [{{ post.data.title }}]({{ post.url | url }})

<div class="post-content">

{{ post.content | safe }}

</div>
</div>
</div>
{% endif %}
{% endfor %}
{% endfor %}

## Customisation

{% for post in collections['Managed Settings'] %}
{% for tag in post.data.categories %}
{% if tag.includes("Managed Settings Customisation") %}
<div class="post-block">
<div class="post-body">

### [{{ post.data.title }}]({{ post.url | url }})

<div class="post-content">

{{ post.content | safe }}

</div>
</div>
</div>
{% endif %}
{% endfor %}
{% endfor %}

## Submit a question

Need something else answered? Submit an [issue](https://github.com/jasonbayton/11ty/issues/new?assignees=jasonbayton&labels=documentation&template=content-request.md&title=%5BContent+request%5D), or tag me in a [LinkedIn](https://linkedin.com/in/jasonbayton) post. Questions may be republished on this document, or form the basis of a new document under [/android](/android).