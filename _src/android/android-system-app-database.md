---
title: Android system apps database
published: '2025-05-03'
status: publish
author: 'Jason Bayton'
tags: 
    - App management
    - sysapp-database
excerpt: ''
alert: 'This is a brand new service, and will evolve in response to feedback and iterative improvements. Feel free to let me know your thoughts.'
type: documentation
layout: base.njk
eleventyNavigation:
  order: 10000
---

<script>document.documentElement.classList.add('has-js');</script>
<script>
window.deviceAppMatrix = {{ deviceAppMatrix | dump | safe }};
window.packages = {{ packages | dump | safe }};
</script>

<div class="grid grid-column-2-1 grid-gap-30 grid-column-mobile-1">
<div>

Below you'll find a table of system apps across various devices. [These devices](#contributing-devices) have opted in to system app sync in [PACKAGE SEARCH](/projects/package-search/) to build this database, and it is through the volunteering of PACKAGE SEARCH users that this database grows.

<a class="" href="/projects/package-search/support/system-apps-database">Learn how to contribute</a>.


Packages are updated here within a few minutes following a first sync, and daily after. The primary app name is English, however additional app names are provided in _Also known by_ for ease of search. Search is full-text, all-column.

**Currently tracked system apps:** <span class="highlight">**{{ packages | length }}</span> across <span class="highlight" id="oemCount"></span> OEMs.**

<small>

_Tip: Hold **Shift** while scrolling with a mouse to move horizontally across the table, if it overflows. Cells with lots of data can be scrolled vertically, also._

</small>
</div>

<div class="callout">
<div class="callout-heading callout-heading-small">Help grow the database</div>

Contribute your own system apps to the database in under five minutes 🚀

Get the app, and follow [the instructions](/projects/package-search/support/system-apps-database).

<div class="padding-top-10"></div> 

<a href="https://play.google.com/store/apps/details?id=org.bayton.packagesearch">{% include "_src/_includes/_assets/img/site_media/get_it_on_google.svg" %}</a>

</div>
</div>

<div class="filters-grid">
<input type="text" id="searchInput" placeholder="Search package, app name, OS, device, or model..."/>
<div class="app-db-filters">
<select id="filterMake"><option value="">All OEMs</option></select>
<select id="filterModel"><option value="">All Models</option></select>
<select id="filterOS"><option value="">All OS</option></select>
</div>
</div>

<div class="responsive-table-wrapper">
<table id="appTable" style="">
<thead>
<tr>
<th>App Name</th>
<th>Package Name</th>
<th>OEM</th>
<th>Model</th>
<th>OS</th>
<th>Also known by</th>
<th>User-facing</th>
</tr>
</thead>
<tbody class="no-js-table">
{% for pkg, entry in packages %}
<tr>
  <td>{{ entry.appName or pkg }}</td>
  <td><code>{{ pkg }}</code></td>
  <td><div class="scrollable">
  {%- set makes = "" -%}
  {%- for device in entry.devices -%}
    {%- if loop.first -%}
      {{ device.make }}
    {%- elif not device.make in makes -%}
      , {{ device.make }}
    {%- endif -%}
    {%- set makes = makes + device.make + "," -%}
  {%- endfor -%}
</div></td>

<td><div class="scrollable">
  {%- set models = "" -%}
  {%- for device in entry.devices -%}
    {%- if loop.first -%}
      {{ device.model }}
    {%- elif not device.model in models -%}
      , {{ device.model }}
    {%- endif -%}
    {%- set models = models + device.model + "," -%}
  {%- endfor -%}
</div></td>

<td><div class="scrollable">
  {%- set osVersions = "" -%}
  {%- for device in entry.devices -%}
    {%- if loop.first -%}
      {{ device.os }}
    {%- elif not device.os in osVersions -%}
      , {{ device.os }}
    {%- endif -%}
    {%- set osVersions = osVersions + device.os + "," -%}
  {%- endfor -%}
</div></td>

<td><div class="scrollable">
  {%- if entry.additionalLocales and entry.additionalLocales.length > 0 -%}
    {%- for alt in entry.additionalLocales -%}
      {%- if not loop.first -%}, {% endif -%}{{ alt.name }}
    {%- endfor -%}
  {%- endif -%}
</div></td>
  <td>{{ entry.userFacing }}</td>
</tr>
{% endfor %}
</tbody>
</table>
</div>

<div class="pagination-controls">
  <label for="itemsPerPage">Show per page:</label>
  <select id="itemsPerPage">
    <option value="50" selected>50</option>
    <option value="100">100</option>
    <option value="200">200</option>
    <option value="500">500</option>
    <option value="1000">1000</option>
    <option value="all">All</option>
  </select>
  <div id="pagination" class="pagination"></div>
</div>
</div>


<span class="padding-tb-20"></span>

## Contributing devices

Unique devices that have contributed system applications to this table: <span class="highlight"> **{{ deviceAppMatrix.length }}** </span>

<div class="responsive-table-wrapper">
<table id="deviceTable">
<thead>
<tr>
  <th>OEM</th>
  <th>Model</th>
  <th>OS</th>
  <th>Application count</th>
</tr>
</thead>
<tbody>
{% for dev in deviceAppMatrix %}
<tr>
  <td>{{ dev.make }}</td>
  <td>{{ dev.model }}</td>
  <td>{{ dev.os }}</td>
  <td>{{ dev.apps.length }}</td>
</tr>
{% endfor %}
</tbody>
</table>
</div>

<div class="pagination-controls">
  <label for="deviceItemsPerPage">Show per page:</label>
  <select id="deviceItemsPerPage">
    <option value="20" selected>20</option>
    <option value="50">50</option>
    <option value="100">100</option>
    <option value="200">200</option>
    <option value="all">All</option>
  </select>
  <div id="devicePagination" class="pagination"></div>
</div>

<script src="/js/system-app-search.js"></script>