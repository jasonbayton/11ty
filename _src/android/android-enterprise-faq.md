---
title: 'Android Enterprise FAQ'
published: '2019-04-26T16:39:55+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - General
layout: base.njk
eleventyNavigation:
  order: 2000
---
Below you’ll find a number of frequently asked questions I receive related to Android Enterprise.

## General

{% for post in collections['FAQ'] %}
{% for tag in post.data.categories %}
{% if tag.includes("General") %}
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

## Work Profile

{% for post in collections['FAQ'] %}
{% for tag in post.data.categories %}
{% if tag.includes("Work profile") %}
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

## Fully managed

{% for post in collections['FAQ'] %}
{% for tag in post.data.categories %}
{% if tag.includes("Fully managed") %}
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

## Zero-touch

{% for post in collections['FAQ'] %}
{% for tag in post.data.categories %}
{% if tag.includes("Zero-touch") %}
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


## App management

{% for post in collections['FAQ'] %}
{% for tag in post.data.categories %}
{% if tag.includes("App management") %}
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

Need something else answered? Submit an [issue](https://github.com/jasonbayton/11ty/issues/new?assignees=jasonbayton&labels=documentation&template=content-request.md&title=%5BContent+request%5D), tweet [@jasonbayton](https://twitter.com/jasonbayton) or tag me in a [LinkedIn](https://linkedin.com/in/jasonbayton) post. Questions may be republished on this document, or form the basis of a new document under [/android](/android).