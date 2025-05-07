---
title: Android system apps database
published: '2025-05-03'
status: publish
author: 'Jason Bayton'
tags: 
    - App management
excerpt: ''
alert: 'This is a brand new service, and will evolve in response to feedback and iterative improvements. Feel free to let me know your thoughts.'
type: documentation
layout: base.njk
eleventyNavigation:
  order: 10000
---

Below you'll find a table of system apps across various devices. These devices have opted in to cloud sync in [PACKAGE SEARCH](/projects/package-search/support/system-apps-database) to build this database, and it is through the volunteering of PACKAGE SEARCH users that this database grows.

Packages are updated here daily. The primary app name is English, however additional app names are provided in _Also known by_ for ease of search. Search is full-text, all-column.

_Tip: Hold **Shift** while scrolling with a mouse to move horizontally across the table, if it overflows._

<div class="filters-grid" style=" padding-top:40px; display: flex; gap: 1rem; align-items: center; justify-content: space-between; flex-wrap: wrap; margin-bottom: 1rem;">
<input type="text" id="searchInput" placeholder="Search package, app name, OS, device, or model..." style="flex: 2 1 60%; min-width: 200px;" />
<div style="display: flex; gap: 0.5rem; flex: 1 1 35%; justify-content: flex-end; flex-wrap: wrap;">
<select id="filterMake"><option value="">All OEMs</option></select>
<select id="filterModel"><option value="">All Models</option></select>
<select id="filterOS"><option value="">All OS</option></select>
</div>
</div>

<div class="responsive-table-wrapper">
<table id="appTable" style="table-layout: fixed; width: 100%; min-width: 1000px; border-collapse: border">
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
<tbody>
{% for pkg, entry in packages %}
<tr>
  <td>{{ entry.appName or pkg }}</td>
  <td><code>{{ pkg }}</code></td>
  <td>
    {%- set makes = "" -%}
    {%- for device in entry.devices -%}
      {%- if loop.first -%}
        {{ device.make }}
      {%- elif not device.make in makes -%}
        , {{ device.make }}
      {%- endif -%}
      {%- set makes = makes + device.make + "," -%}
    {%- endfor -%}
  </td>
  <td>
    {%- set models = "" -%}
    {%- for device in entry.devices -%}
      {%- if loop.first -%}
        {{ device.model }}
      {%- elif not device.model in models -%}
        , {{ device.model }}
      {%- endif -%}
      {%- set models = models + device.model + "," -%}
    {%- endfor -%}
  </td>
  <td>
    {%- set osVersions = "" -%}
    {%- for device in entry.devices -%}
      {%- if loop.first -%}
        {{ device.os }}
      {%- elif not device.os in osVersions -%}
        , {{ device.os }}
      {%- endif -%}
      {%- set osVersions = osVersions + device.os + "," -%}
    {%- endfor -%}
  </td>
  <td>
    {%- if entry.additionalLocales and entry.additionalLocales.length > 0 -%}
      {%- for alt in entry.additionalLocales -%}
        {%- if not loop.first -%}, {% endif -%}{{ alt.name }}
      {%- endfor -%}
    {%- endif -%}
  </td>
  <td>{{ entry.userFacing }}</td>
</tr>
{% endfor %}
</tbody>
</table>
</div>

<script src="/js/system-app-search.js"></script>