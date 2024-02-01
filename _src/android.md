---
title: Android
published: '2017-04-07T19:31:54+01:00'
date: "git Last Modified"
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
layout: base.njk
tags: "General"
eleventyNavigation:
  key: Introduction
  order: 0000
templateEngineOverride: njk,md
discourse_permalink:
    - 'https://discuss.bayton.org/t/about-the-android-category/13'
---

If you manage Android devices in the enterprise, you’ve come to the right place! Below you’ll find a selection of documents covering all aspects of Android and Android Enterprise.

Whether you’re just discovering Android Enterprise or are looking to boost existing knowledge, the below should be helpful across the board. Looking for something specific that hasn’t been documented? Submit your question [on GitHub](https://github.com/jasonbayton/11ty/issues/new?assignees=jasonbayton&labels=documentation&template=content-request.md&title=%5BContent+request%5D) (account required)!

## Advisories

<div class="callout">

{% for post in collections['Advisories'] %}

<div class="post-block">
<div class="post-body">


### [{{ post.data.title }}]({{ post.url | url }})

{% if post.data.excerpt|length %}
<div class="post-summary">
<i>{{ post.date | dateFull }}</i> | {{ post.data.excerpt }}
</div>
{% endif %}

</div>
</div>

{% endfor %}

</div>

<div id="android_doc_grid">
{% for tag in android_tags %}
<div class="android-doc-grid-group">

## {{ tag.name }}

{% set taglist = collections[ tag.name ] | eleventyNavigation %}
<div class="android-topic">
<ul>
{% for post in taglist %}
{% if loop.index0 < 4 %}
<li><a href="{{ post.url }}">{{ post.title }}</a></li>
{% endif %}
{% endfor %}
</ul>
</div>
<div id="android_viewmore">
<a class="button button-small" href="/tags/{{ tag.name | slugify }}">more »</a>
</div>
</div>
{% endfor %}
</div>

![](/img/site_media/baydroid_unsure.png) 

## Something missing?

Are you looking for information not published here? Feel free to [get in touch](mailto:jason@bayton.org) to ask a question or [request a new document!](https://github.com/jasonbayton/11ty/issues/new?assignees=jasonbayton&labels=documentation&template=content-request.md&title=%5BContent+request%5D) (GitHub account required)
