---
title: Android
published: '2017-04-07T19:31:54+01:00'
date: "git Last Modified"
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
layout: base.njk
id: 4094
tags: 
doccats:
    - _EXC
    - Android
Version:
    - '1.2'
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/about-the-android-category/13'
---

If you manage Android devices in the enterprise, you’ve come to the right place! Below you’ll find a selection of documents covering all aspects of Android and Android Enterprise.

Whether you’re just discovering Android Enterprise or are looking to boost existing knowledge, the below should be helpful across the board. Looking for something specific that hasn’t been documented? Submit your question [in my new form](https://forms.gle/2VVDeYHiTFhPT2oVA)!

<div class="callout callout-danger">

### Device administrator deprecation
Device admin deprecation is now official with Android 10! Unsure what this means? Take a look at this [infographic](/android/infobyte-did-you-know-device-admin-deprecation/), this [article](/2017/12/google-is-deprecating-device-admin-in-favour-of-android-enterprise/) and this [article](/2019/03/android-enterprise-in-q-features-and-clarity-on-da-deprecation/#clarity-on-da-deprecation-in-q). All EMMs must now be targeting newer than API 29, which means all deprecated DA APIs for Android 10 (and later) devices are enforced. 

</div>

<div id="android_doc_grid">
<div class="android-doc-grid">

<div class="android-doc-grid-group">

![](https://r2_worker.bayton.workers.dev/uploads/2017/04/startertripledroid.png) 
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

![](https://r2_worker.bayton.workers.dev/uploads/2017/04/triodroidlearning.png) 
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

![](https://r2_worker.bayton.workers.dev/uploads/2017/04/triodroidselfies-1.png) 
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

![](https://r2_worker.bayton.workers.dev/uploads/2017/04/droidtrioresources.png) 
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

![](https://r2_worker.bayton.workers.dev/uploads/2019/01/externalblogg.png) 
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

![](https://r2_worker.bayton.workers.dev/uploads/2017/04/triodroidselfies-1.png) 
## Vendor docs

Free guides, infographics and other information.
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

![](https://r2_worker.bayton.workers.dev/uploads/2017/04/droidtrioevents.png) 
## Live events
Live-blogging enterprise mobility events.
<div class="android-topic">

- [Live: MobileIron LIVE! 2018](/2018/05/live-mobileiron-live-2018/)
- [Live: Android Enterprise Partner Summit 2018](/2018/05/live-android-enterprise-partner-summit-2018/)
- [Live: Huawei Mate series launch](/2018/10/live-huawei-mate-series-launch/)

</div>

Want your event covered live? [Get in touch](/contact)!

## Hardware validation

When I occasionally review hardware for AE compatibility
<div class="android-topic">
 <ul>
    {%- for entry in collections['Hardware validation'] -%}
    <li><a href="{{ entry.url }}">{{ entry.data.title }}</a></li>
    {%- endfor -%}
</ul>
</div>
</div>
<div class="android-doc-grid-group">

![](https://r2_worker.bayton.workers.dev/uploads/2017/04/triodroidwriting.png) 
## Blog articles

For topical content around news and events.
<div class="android-topic">
 <ul>
    {%- for entry in collections.Enterprise -%}
    <li><a href="{{ entry.url }}">{{ entry.data.title }}</a></li>
    {%- endfor -%}
</ul>
</div>
</div>
</div>
</div>

![](https://r2_worker.bayton.workers.dev/uploads/2019/01/ask.png) 

## Something missing?

Are you looking for information not published here? Feel free to [get in touch](mailto:jason@bayton.org) to ask a question or request a new document!
