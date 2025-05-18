---
title: Message sent
date: '2010-04-19T21:09:21+01:00'
status: publish
author: 'Jason Bayton'
type: page
layout: base.njk
permalink: /contact/success/
---

<script>
  document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");

    if(name) {
      document.querySelector(".contact-info h1").innerHTML = `Thanks for reaching out, ${decodeURIComponent(name)}!`;
    }
  });
</script>

<div class="contact-grid">
  <div class="contact-info">
    <h1>Thanks for reaching out!</h1>
    <p>Your message has been received. I’ll get back to you as soon as possible.</p>
  </div>
  <div class="logo-spin">
    {% include "./_includes/_assets/img/bayton_logos/swirl_check.svg" %}
  </div>
</div>