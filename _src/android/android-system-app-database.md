---
title: System app database
published: '2025-05-03'
status: publish
author: 'Jason Bayton'
tags: 
    - App management
excerpt: ''
type: documentation
layout: base.njk
eleventyNavigation:
  order: 20000
---

<div class="filters-grid" style="display: flex; gap: 1rem; align-items: center; justify-content: space-between; flex-wrap: wrap; margin-bottom: 1rem;">
<input type="text" id="searchInput" placeholder="Search package or app name..." style="flex: 2 1 60%; min-width: 200px;" />
<div style="display: flex; gap: 0.5rem; flex: 1 1 35%; justify-content: flex-end; flex-wrap: wrap;">
<select id="filterMake"><option value="">All OEMs</option></select>
<select id="filterModel"><option value="">All Models</option></select>
<select id="filterOS"><option value="">All OS</option></select>
</div>
</div>

<div class="responsive-table-wrapper">
<table id="appTable" style="table-layout: fixed;" width: 100%;>
<thead>
<tr>
<th>App Name</th>
<th>Package Name</th>
<th>OEM</th>
<th>Model</th>
<th>OS</th>
</tr>
</thead>
<tbody>
{% for pkg, entry in packages %}
<tr>
  <td>{{ entry.appNames[0] or pkg }}</td>
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
</tr>
{% endfor %}
</tbody>
</table>
</div>

<script src="/js/system-app-search.js"></script>