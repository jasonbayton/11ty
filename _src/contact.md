---
title: Get in touch
date: '2010-04-19T21:09:21+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: page
tags: 
layout: base.njk
id: 426
---

<script>
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("form.contact-form").forEach(function (form) {
      var status = form.querySelector(".form-status");
      var btn = form.querySelector("button[type=submit]");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (btn) btn.disabled = true;
        if (status) { status.style.color = ""; status.textContent = "Sending..."; }
        var body = new URLSearchParams(new FormData(form));
        body.set("ajax", "1");
        fetch("https://forms.bayton.org/submit", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString()
        }).then(function (r) {
          if (r.ok) {
            var n = form.querySelector("[name=name]");
            window.location.href = "/contact/success/" + (n && n.value ? "?name=" + encodeURIComponent(n.value) : "");
            return;
          }
          if (btn) btn.disabled = false;
          if (status) {
            status.style.color = "#dc3545";
            status.textContent = r.status === 429 ? "Please wait a moment and try again." : "Sorry, something went wrong. Please email jason@bayton.org.";
          }
        }).catch(function () {
          if (btn) btn.disabled = false;
          if (status) {
            status.style.color = "#dc3545";
            status.textContent = "Sorry, something went wrong. Please email jason@bayton.org.";
          }
        });
      });
    });
  });
</script>

<section class="contact-hero">
<div class="impactful-layout">
<div class="impactful-hero">
  <h2 class="page-subtitle">Let’s do <span class="highlight">something great</span> together.</h2>
  <p>Ready to bring your project to life or discuss a collaboration? Reach out and I’ll get back to you as soon as possible.</p>

  <div class="scroll-down">
    <a href="#contact-details">
      Don't like forms? <span class="material-symbols-outlined">arrow_circle_down</span> 
    </a>
  </div>
</div>
<form name="contact" method="POST" action="https://forms.bayton.org/submit" class="contact-form">
  <input type="hidden" name="source" value="contact">
  <input type="hidden" name="_redirect" value="https://bayton.org/contact/success/">
  <input type="text" name="company" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0" />
  <div class="form-group">
    <label for="name">Name<span class="orange">*</span></label>
    <input type="text" id="name" name="name" required>
  </div>
  <div class="form-group">
    <label for="email">Email<span class="orange">*</span></label>
    <input type="email" id="email" name="email" required>
  </div>
  <div class="form-group">
    <label for="message">Message<span class="orange">*</span></label>
    <textarea id="message" name="message" required></textarea>
  </div>
  <div class="submit-group">
    <button type="submit" class="cta-btn">Let's go</button>
  </div>
  <p class="form-status" role="status" aria-live="polite" style="margin-top:10px"></p>
</form>
</div>
</section>

<section class="contact-hero">
  <div class="contact-grid" id="contact-details">
    <div class="contact-info">
      <h2><span class="material-symbols-outlined">
alternate_email
</span> Direct contact</h2>
      <p><strong>Email:</strong> <a href="mailto:jason@bayton.org">jason@bayton.org</a></p>
      <p><strong>Number:</strong> <a href="tel:+447975537754">+44 7975 537754</a><br>
      <small>If you'd like to reach out, WhatsApp & Signal are preferred</small></p>
    </div>
    <div class="contact-info">
      <h2><span class="material-symbols-outlined">
globe_uk
</span> Find me online</h2>
      <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/jasonbayton">/in/jasonbayton</a></p>
      <p><strong>Mastodon:</strong> <a href="https://fosstodon.org/@bayton">@bayton@fosstodon.org</a></p>
      <p><strong>Telegram:</strong> <a href="https://t.me/JasonBayton">JasonBayton</a></p>
      <p><strong>Instagram:</strong> <a href="https://instagram.com/baytonjason">baytonjason</a></p>
      <p><strong>Threads:</strong> <a href="https://threads.net/@baytonjason">baytonjason</a></p>
      <p><strong>Bluesky:</strong> <a href="https://bsky.app/profile/jason.bayton.org">@jason.bayton.org</a></p>
      <p><strong>YouTube:</strong> <a href="https://youtube.com/@jasonbayton">JasonBayton</a></p>
      <p><strong>Android Enterprise Community:</strong> <a href="https://www.androidenterprise.community/t5/user/viewprofilepage/user-id/11">jasonbayton</a></p>
      <p><strong>MobilePros Discord:</strong> <a href="https://discord.gg/KGEpPxnjNu">Join here</a></p>
    </div>
  </div>
</section>