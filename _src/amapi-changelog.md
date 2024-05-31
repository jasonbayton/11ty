---
title: AMAPI release notes tracker
permalink: /amapi-tracker.html
eleventyExcludeFromCollections: true
type: page
layout: base.njk
---
<!--script>
    function timeSince(date) {
        let now = new Date();
        let givenDate = new Date(date);

        let months = now.getMonth() - givenDate.getMonth() 
            + (12 * (now.getFullYear() - givenDate.getFullYear()));

        let days = now.getDate() - givenDate.getDate();
        if (days < 0) {
            months--;
            days += new Date(givenDate.getFullYear(), givenDate.getMonth()+1, 0).getDate();
        }

        return {
            months: `${months} month(s)`,
            days: `${days} day(s)`
        };
    }

    window.onload = function() {
        let time = timeSince('2024-04-30');
        document.getElementById('outputMonths').textContent = time.months;
        document.getElementById('outputDays').textContent = time.days;
    };
</script>

<p>Time since Google last provided Android Management API release notes:</p>

<h2><span class="blood-orange" id="outputMonths"></span> and <span class="blood-orange" id="outputDays"></span></h2>

<p>This is based on the <a href="https://developers.google.com/android/management/release-notes">AMAPI Release notes</a> page and the <a href="https://groups.google.com/g/android-management-api">Android Management API mailing list</a>.</p>

<h3>Why does this matter?</h3>

<p>Google has a monthly cadence for features released to the Android Management API, and fortnightly for Android Device Policy. Without timely and detailed release notes (because "bug fixes" provided on <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.work.clouddpc">Google Play</a> don't count) developers have to frequently manually review resources such as the <a href="https://developers.google.com/android/management/reference/rest/v1/enterprises.policies">reference docs</a> for specific changes. Such an important and widely-used service must be held to a high standard for the partners that rely on it.</p-->

<div class="callout callout-red">
<div class="callout-heading"> <span class="material-symbols-outlined">work_alert</span> No longer tracked </div>

Over the last several months the cadence and reliability of [AMAPI release notes](https://developers.google.com/android/management/release-notes) has improved significantly, and as such the need to monitor the frequency of updates is no longer a concern.

</div>

## _That said_.. 

The [Android Device Policy](https://play.google.com/store/apps/details?id=com.google.android.apps.work.clouddpc&hl=en) app and [AMAPI SDK release notes](https://developers.google.com/android/management/sdk-release-notes) leave a lot to be desired, still, and Google should strive to lead by example. "Bug fixes" and "performance improvements" are vague and unhelpful across the ecosystem. 

Be transparent. Tell us what was fixed; link to bug trackers, public issues, so on.

All the links to the relevant pages for release notes are above. Go see what's new there 🙂