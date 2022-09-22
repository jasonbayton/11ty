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
<div class="android-doc-grid">

<div class="android-doc-grid-group">

## Getting started

Just getting familiar with Android or Android Enterprise? Start here. The following documents offer an introduction to Android Enterprise and the various moving parts in order to offer a broad overview of the ecosystem.
<div class="android-topic">
<ul>
    {%- for entry in collections['Getting started'] -%}
    <li><a href="{{ entry.url }}">{{ entry.data.title }}</a></li>
    {%- endfor -%}
</ul>
</div>
</div>
<div class="android-doc-grid-group">

## Diving deeper

Ready to learn more? Read on.
<div class="android-topic">
 <ul>
    {%- for entry in collections['Diving deeper'] -%}
    <li><a href="{{ entry.url }}">{{ entry.data.title }}</a></li>
    {%- endfor -%}
</ul>
</div>
</div>
<div class="android-doc-grid-group">

## Resources

Free guides, infographics and other information.

<div class="android-topic">
 <ul>
    {%- for entry in collections['Resources'] -%}
    <li><a href="{{ entry.url }}">{{ entry.data.title }}</a></li>
    {%- endfor -%}
</ul>
</div>
</div>
<div class="android-doc-grid-group">

## External resources

Useful documentation from other sources.
<div class="android-topic">
<ul>
{% for link in android_extrec %}
<li> 
<a href="{{ link.url }}">{{ link.text }}</a>
</li>    
{% endfor %}
</ul>
</div>
</div>
<div class="android-doc-grid-group">

## External blog articles

Articles contributed to other sources.
<div class="android-topic">
<ul>
{% for link in android_extblog %}
<li> 
<a href="{{ link.url }}">{{ link.text }}</a>
</li>    
{% endfor %}
</ul>
</div>
</div>
<div class="android-doc-grid-group">

## Vendor docs

Vendor-specific docs 

<div class="android-topic">
 <ul>
    {%- for entry in collections['Vendor specific'] -%}
    <li><a href="{{ entry.url }}">{{ entry.data.title }}</a></li>
    {%- endfor -%}
</ul>
</div>
</div>
</div>
<div class="android-doc-grid">
<div class="android-doc-grid-group">

## Live events
Live-blogging enterprise mobility events. Want your event covered live? [Get in touch](/contact)!

<div class="android-topic">

- [Live: MobileIron LIVE! 2018](/2018/05/live-mobileiron-live-2018/)
- [Live: Android Enterprise Partner Summit 2018](/2018/05/live-android-enterprise-partner-summit-2018/)
- [Live: Huawei Mate series launch](/2018/10/live-huawei-mate-series-launch/)

</div>
</div>
<div class="android-doc-grid-group">

## Blog articles

For topical content around news and events.
<div class="android-topic">
<ul>
{% for entry in collections.Enterprise | reverse %}
<li><a href="{{ entry.url }}">{{ entry.data.title }}</a></li>
{% endfor %}
</ul>
</div>
</div>
</div>
</div>

![](https://r2_worker.bayton.workers.dev/uploads/2019/01/ask.png) 

## Something missing?

Are you looking for information not published here? Feel free to [get in touch](mailto:jason@bayton.org) to ask a question or [request a new document!](https://github.com/jasonbayton/11ty/issues/new?assignees=jasonbayton&labels=documentation&template=content-request.md&title=%5BContent+request%5D) (GitHub account required)
