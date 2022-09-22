---
title: 'Android Enterprise FAQ'
published: '2019-04-26T16:39:55+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
tags: 
    - Getting started
    - General
layout: base.njk
eleventyNavigation:
  key: 'Android Enterprise FAQ'
  order: 6000
discourse_permalink:
    - 'https://discuss.bayton.org/t/android-enterprise-faq/291'
---
Below you’ll find a number of frequently asked questions I receive related to Android Enterprise.

## General

{% for post in collections['General'] %}
{% for tag in post.data.tags %}
{% if tag.includes("FAQ") %}
<div class="post-block">
<div class="post-body">

### [{{ post.data.title }}]({{ post.url | url }})

<div class="post-summary">

{{ post.template.frontMatter.content }}

</div>
</div>
</div>
{% endif %}
{% endfor %}
{% endfor %}

## Work Profile

{% for post in collections['Work Profile'] %}
{% for tag in post.data.tags %}
{% if tag.includes("FAQ") %}
<div class="post-block">
<div class="post-body">

### [{{ post.data.title }}]({{ post.url | url }})

<div class="post-summary">

{{ post.template.frontMatter.content }}

</div>
</div>
</div>
{% endif %}
{% endfor %}
{% endfor %}

## Fully managed

{% for post in collections['Fully Managed'] %}
{% for tag in post.data.tags %}
{% if tag.includes("FAQ") %}
<div class="post-block">
<div class="post-body">

### [{{ post.data.title }}]({{ post.url | url }})

<div class="post-summary">

{{ post.template.frontMatter.content }}

</div>
</div>
</div>
{% endif %}
{% endfor %}
{% endfor %}

## Work profiles on fully managed devices, work profiles on company owned devices (COPE) 

{% for post in collections['COPE'] %}
{% for tag in post.data.tags %}
{% if tag.includes("FAQ") %}
<div class="post-block">
<div class="post-body">

### [{{ post.data.title }}]({{ post.url | url }})

<div class="post-summary">

{{ post.template.frontMatter.content }}

</div>
</div>
</div>
{% endif %}
{% endfor %}
{% endfor %}

## Zero-touch

{% for post in collections['Zero-touch'] %}
{% for tag in post.data.tags %}
{% if tag.includes("FAQ") %}
<div class="post-block">
<div class="post-body">

### [{{ post.data.title }}]({{ post.url | url }})

<div class="post-summary">

{{ post.template.frontMatter.content }}

</div>
</div>
</div>
{% endif %}
{% endfor %}
{% endfor %}


## App management

{% for post in collections['App Management'] %}
{% for tag in post.data.tags %}
{% if tag.includes("FAQ") %}
<div class="post-block">
<div class="post-body">

### [{{ post.data.title }}]({{ post.url | url }})

<div class="post-summary">

{{ post.template.frontMatter.content }}

</div>
</div>
</div>
{% endif %}
{% endfor %}
{% endfor %}

## Submit a question

Need something else answered? Submit an [issue](https://github.com/jasonbayton/11ty/issues/new?assignees=jasonbayton&labels=documentation&template=content-request.md&title=%5BContent+request%5D), tweet [@jasonbayton](https://twitter.com/jasonbayton) or tag me in a [LinkedIn](https://linkedin.com/in/jasonbayton) post. Questions may be republished on this document, or form the basis of a new document under [/android](/android).