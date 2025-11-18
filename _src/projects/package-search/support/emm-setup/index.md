---
title: EMM setup guides for PACKAGE SEARCH
parent: PACKAGE SEARCH support
published: '2024-07-22'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Package Search'
    - 'bayton-projects'
layout: base.njk
eleventyNavigation: 
    order: 4
    title: EMM setup guides
---

## EMM guides 

<div class="support-list">
  <ul>

  {% for post in collections['Package Search'] %}
  {% for tag in post.data.categories %}
  {% if tag.includes("EMM setup guides") %}

  <li>{% include "_src/_includes/_assets/img/bayton_logos/package_search_icon_xs.svg" %} <a href="{{ post.url | url }}">{{ post.data.eleventyNavigation.title }}</a></li>

  {% endif %}
  {% endfor %}
  {% endfor %}

  </ul>
</div>

### Add your EMM guide

If you're an EMM vendor reading this and would like to contribute guidance, please feel free to [raise a request](https://github.com/jasonbayton/11ty/issues/new?assignees=jasonbayton&labels=documentation&projects=&template=content-request.md&title=%5BContent+request%5D) or [fork & pull request](https://github.com/jasonbayton/11ty/tree/main/_src/projects/package-search/support/emm-setup) with:

- Chronological steps
- Optional screenshots
- Guidance beginning from importing PACKAGE SEARCH, configuring it appropriately, and saving for deployment.

A template file is highlighted below for a direct PR to [EMM setup guides](../emm-setup). Name the file `deletegated-scope-setup-VENDOR.md`, adjust VENDOR_NAME and publishing details as required.

```markdown
---
title: Configure PACKAGE SEARCH for VENDOR_NAME
parent: EMM setup guides for PACKAGE SEARCH
published: '2024-07-22'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: project-docs
tags: 
    - 'Package Search'
    - 'bayton-projects'
categories: 
    - EMM setup guides
layout: base.njk
eleventyNavigation: 
    order: 3
    title: Configure VENDOR_NAME
---

Add your steps here. Ensure you update title, published date, and eleventyNavigation title above.
If you add images, these will be mirrored to the bayton.org CDN, so don't worry too much about where they're currently hosted.
```


