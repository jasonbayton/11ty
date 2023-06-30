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
  key: Android Home
  order: 0000
templateEngineOverride: njk,md
discourse_permalink:
    - 'https://discuss.bayton.org/t/about-the-android-category/13'
---

If you manage Android devices in the enterprise, you’ve come to the right place! Below you’ll find a selection of documents covering all aspects of Android and Android Enterprise.

Whether you’re just discovering Android Enterprise or are looking to boost existing knowledge, the below should be helpful across the board. Looking for something specific that hasn’t been documented? Submit your question [on GitHub](https://github.com/jasonbayton/11ty/issues/new?assignees=jasonbayton&labels=documentation&template=content-request.md&title=%5BContent+request%5D) (account required)!

<div class="callout callout-danger">

### What's new for enterprise in Android 14?

The official release of Android 14 will be upon us in the next few months. Is your organisation prepared for what's to come? Check out [what's new in Android 14](/blog/2023/04/android-enterprise-in-android-14/)!

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

![](https://cdn.bayton.org/uploads/2019/01/ask.png) 

## Something missing?

Are you looking for information not published here? Feel free to [get in touch](mailto:jason@bayton.org) to ask a question or [request a new document!](https://github.com/jasonbayton/11ty/issues/new?assignees=jasonbayton&labels=documentation&template=content-request.md&title=%5BContent+request%5D) (GitHub account required)
