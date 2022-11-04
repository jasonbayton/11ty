---
title: 'Introducing night mode on bayton.org'
date: '2017-02-25T14:20:43+00:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 3759
tag:
    - bayton
    - code
    - jquery
    - php
    - theme
    - Wordpress
post_format: []
publish_post_category:
    - '14'
discourse_permalink:
    - 'https://discuss.bayton.org/t/introducing-night-mode-on-bayton-org/89'
tags:
    - Meta
---
<div class="callout callout-warning">

### Deprecated

Night mode has been deprecated, at least in its current form, as it was negatively impacting both page loading speed, and because not all browsers support the “disabled” flag on CSS resources, it was defaulting dark for new visitors. This will be re-addressed in future, likely in line with a rebuild of the theme. </div>

I spend a lot of time on here, particularly at night when I’m finished with my duties for the day and fancy putting some words down on virtual paper. I’ve noticed, however, the glare of the bright, minimal theme can be quite bothersome on the eyes after a while.

Always eager to improve the site, I set about looking for a solution.

I didn’t want to make any permanent changes to the current theme that would detract from what it is; the current white-on-grey design is really nice and it’d be a shame to tone it down for the sake of a few hours a night.

With that in mind, I decided to implement a more elegant solution; changing the theme colours based on time of day while allowing a manual override stored in browser local storage (meaning the option chosen remains saved until site data is cleared from the browser).

The end result looks like this:

[![](https://cdn.bayton.org/uploads/2017/02/2017-1.gif)](/https://cdn.bayton.org/uploads/2017/02/2017-1.gif)

It’s been live for about a month, but I’ve been tweaking it too frequently to officially announce it. There’s still a few areas of improvement (buttons, etc) but it’s good enough for now.

The implementation is a mix of CSS, CSS transitions and jquery. Ideally, I’d have preferred to implement this in PHP to be served prior to the page loading, but since PHP only knows the server’s local time and not that of the guest browsing the site it isn’t as easy to implement (though I’ll take advice in the comments!). This means the page will always load the default white theme, then darken when jquery is ready.

There wasn’t anything particularly complex about the implementation, I created my dark CSS file and added it to the header in a disabled state. I then used jquery to control when the CSS is enabled based on time of day as reported by the guest’s browser.

The dark/light indicators to the left of the menu use a similar jquery function when clicked to manually override the time-based theme, but obviously uses `onClick` rather than being time-based.

In the main CSS I added CSS transitions to introduce a fade effect rather than instantly changing back and forth. I prefer it this way, though it’s obviously subjective.

Now whenever you log onto bayton.org between the hours of 9pm and 8am, you’ll be greeted with a darker theme. Don’t like the colours displayed? Just click the icon to the left of the menu to select your preferred theme and it’ll be remembered for as long as you don’t clear browser storage.

At some point I’ll look at implementing sunrise/sunset detection to replace the hard-coded times, but that’s a little far off yet. In the meantime I’ll fix up the last few niggles and see if I can’t get the implementation a little more seamless.

*Like the new theme option? Hate it? Think you can improve it? Let me know in the comments! I welcome feedback on this or any other aspect of the site – my goal is to make it as easy to read and enjoy my content as possible, if anything is preventing that please let me know.*

*As always I’m [@jasonbayton](https://twitter.com/jasonbayton) on Twitter, [+JasonBayton](https://twitter.com/jasonbayton) on Google+, [/in/jasonbayton](https://linkedin.com/in/jasonbayton) on Linkedin or [@bayton.org](https://facebook.com/bayton.org) on Facebook. You’re also welcome to leave a comment below or send me an [email](mailto:jason@bayton.org).* *Free free to get in touch to discuss this or any other topics you have in mind!*