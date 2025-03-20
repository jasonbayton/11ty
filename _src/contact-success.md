---
title: Message sent
date: '2010-04-19T21:09:21+01:00'
status: publish
author: 'Jason Bayton'
type: page
layout: base.njk
permalink: /contact/success/
---

<div class="contact-grid">
  <div class="contact-info">
    <h1>Thanks for reaching out!</h1>
    <p>Your message has been received. I’ll get back to you as soon as possible.</p>
  </div>
  <div class="logo-spin">
    {% include "./_includes/_assets/img/bayton_logos/swirl_check.svg" %}
  </div>
</div>

<style>
  .logo-spin img {
  width: 150px;
  animation: spinPause 6s infinite ease-in-out;
}

@keyframes spinPause {
  0%   { transform: rotate(0deg); }
  20%  { transform: rotate(180deg); }
  40%  { transform: rotate(360deg); }
  60%  { transform: rotate(360deg); }
  80%  { transform: rotate(360deg); }
  100% { transform: rotate(360deg); }
}
</style>