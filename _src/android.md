---
title: Android
published: '2017-04-07T19:31:54+01:00'
date: "git Last Modified"
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
layout: base.njk
tags: "Getting started"
eleventyNavigation:
  key: Android Home
  order: 0000
templateEngineOverride: njk,md
discourse_permalink:
    - 'https://discuss.bayton.org/t/about-the-android-category/13'
---

If you manage Android devices in the enterprise, you’ve come to the right place! Below you’ll find a selection of documents covering all aspects of Android and Android Enterprise.

Whether you’re just discovering Android Enterprise or are looking to boost existing knowledge, the below should be helpful across the board. Looking for something specific that hasn’t been documented? Submit your question [in my new form](https://forms.gle/2VVDeYHiTFhPT2oVA)!

<div class="callout callout-danger">

### Android 13's notification runtime permission

Android 13 introduces the first new runtime permission change in a while. Read up on the newest enterprise-impacting addition to Android [here](/android/android-13-notification-permission). 

</div>

<div id="android_doc_grid">
{% for tag in android_tags %}
<div class="android-doc-grid-group">

## {{ tag.name }}

{% set taglist = collections[ tag.name ] %}
<div class="android-topic">
<ul>
{% for post in taglist %}
{% if loop.index0 < 4 %}
<li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{% endif %}
{% endfor %}
</ul>
<div id="android_viewmore">
<a class="button button-small" href="/tags/{{ tag.name | slugify }}">more »</a>
</div>
</div>
</div>
{% endfor %}
</div>

![](https://r2_worker.bayton.workers.dev/uploads/2019/01/ask.png) 

## Something missing?

Are you looking for information not published here? Feel free to [get in touch](mailto:jason@bayton.org) to ask a question or [request a new document!](https://github.com/jasonbayton/11ty/issues/new?assignees=jasonbayton&labels=documentation&template=content-request.md&title=%5BContent+request%5D) (GitHub account required)
