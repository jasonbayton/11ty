---
 title: "Google is deprecating the Play Store for Work app browsing page"
 published: '2026-03-12'
 status: publish
 author: 'Jason Bayton'
 excerpt: "The app browsing page is going away, but you probably won't notice."
 type: documentation
 layout: base.njk
 tags:
     - Advisories
---
Google is pulling the plug on the app browsing page within Play Store for Work. If you've been around long enough to remember the old app "Approval" flow, this was the page that supported it - and since that was deprecated back in September 2025, the browsing page has been largely redundant since.

After April 15, visiting `play.google.com/work` will redirect based on your organisation type:

- **Managed Google Play Accounts enterprises** → the Admin Settings page (`play.google.com/work/adminsettings`)
- **Managed Google domains** → `admin.google.com`
- **Everyone else** → the Android Enterprise partners page

Worth noting, the Admin Settings page within Play for Work isn't going anywhere for managed Google Play Accounts enterprises - it's still needed for managing administrators, and will remain available.

For the majority of organisations leveraging the managed Google Play iFrame within their EMM for app management, this change will have no impact.

🛟 For help or guidance, feel free to [reach out](/support/).
