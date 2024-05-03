---
title: Managed Settings support
date: '2024-04-30'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - Projects
layout: base.njk
eleventyNavigation:
  order: 2000
---
Below you’ll find a number of frequently asked questions I receive related to Android Enterprise.

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