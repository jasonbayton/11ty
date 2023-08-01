---
 title: "Google's inactive account policy may not impact Android Enterprise customers"
 status: publish 
 author: 'Jason Bayton' 
 excerpt: "While Google typically lacks absolute clarity on the issue, it does appear enterprise customers may fall into the exclusions list Google provides for scenarios where a Google account won't be marked as inactive." 
 type: post 
 tags: 
     - Enterprise 
---
Back in May Google announced a change to their [account inactivity policy](https://support.google.com/accounts/answer/12418290?visit_id=638257812783939269-2555992412&p=inactive_account_policy_email&rd=1#zippy=%2Cexceptions-to-this-policy). If you're a Google account owner you may have received an email also:

![Google inactive notice](https://cdn.bayton.org/uploads/2023/07/google-inactive-account-notice.png)

If not, it was covered quite extensively by the media:

- [ars TECHNICA](https://arstechnica.com/gadgets/2023/05/google-will-start-deleting-inactive-accounts-after-two-years/)
- [tom's guide](https://www.tomsguide.com/news/google-to-start-deleting-inactive-accounts-what-that-means-for-you)
- [The Verge](https://www.theverge.com/2023/5/16/23725438/google-gmail-deleting-inactive-accounts)
- [Wired](https://www.wired.com/story/how-to-stop-google-delete-account-inactive/)
- and others

I'd considered adding to the noise back then with an enterprise point of view, but it occurred to me there really _wasn't_ any clarity for enterprise customers leveraging a Google account to bind Android Enterprise to their EMM at that point, and so I've been busy working in the background to understand the implications for Android Enterprise customers and if there's truly a mandate to keep the account active in order to prevent the bind from being deleted, and thusly, all enrolled devices becoming either unmanageable or wiped entirely (depending on EMM).

The good news is, per my understanding, Google is working on a solution for the enterprise bind use case that will exclude Google accounts associated to an active bind from being subject to the inactivity policy. There is no official word on this as yet (I'll update when that changes), so this is obviously, and unfortunately, subject to change.

That said, since the original May announcement the list of exclusions to this policy have grown. Given it doesn't go live before December 2023, there's still time to fine-tune it, and do so I'm certain they will.

## Summarising the change

In short, as a holder of a Google account, if you have not logged in and performed an activity with said account within 2 years, it will be marked for deletion. Simply logging in is not good enough, unless that login is to a 3rd party solution supporting _Sign in with Google_, one of the following should be undertaken while logged in:

- Reading or sending an email
- Using Google Drive
- Watching a YouTube video
- Sharing a photo
- Downloading an app
- Using Google Search
- Using Sign in with Google to sign in to a third-party app or service

The important current exceptions to this are:

- Your Google Account was used to make a purchase of a Google product, app, service, or subscription that is current or ongoing.
- Your Google Account contains a gift card with a monetary balance.
- Your Google Account owns a published application or game with ongoing, active subscriptions or active financial transactions associated with them. This might be a Google Account that owns an App on the Google Play Store.
- Your Google Account manages an active minor account with Family Link.
- Your Google Account has been used to purchase a digital item, for example, a book or movie.

Not all of these are one-and-done. Using a subscription requires it remains active to secure the exception, for example.

## Create-and-forget enterprise accounts

The problem for organisations quite clearly is the unlikelihood any of the above exceptions may have occurred. Frequently organisations will create a Google account at the time of [binding an enterprise to their EMM](/android/android-enterprise-faq/what-is-the-bind/), and subsequently forget about the account until it becomes necessary to manage an uploaded application's advanced settings, or manage the bind itself.

Arguably even if organisations sign in to the account, this may not be enough to trigger Google's activity monitor based on the requirements outlined above. This could lead to even more confusion for organisation admins that do go out of their way to keep an account active with infrequent intentional logins; those inactivity emails will land in the inbox associated with the account, and require the organisation to actively manually confirm the account is active.

## What happens if the account responsible for the Android Enterprise bind is deleted?

When a Google account is used to bind Android Enterprise to an EMM, an enterprise ID (as developers see it), or Organisation ID (as customers see it) is created. Every policy, device, [application](/android/create-and-manage-private-apps-for-android-enterprise/), etc, is then associated to this enterprise ID, and the EMM is granted permission to manage everything within that enterprise ID respectfully. 

That Google account becomes the primary account associated with the bind. Others can be added, and I'll touch on that shortly, but by default it is just the primary account used to create the bind in the first place that remains associated with it. 

If this account is deleted, the enterprise - the bind - is deleted with it. Depending on the EMM this can result in anything from loss of management capabilities, with devices effectively stuck with the policy and state they are in at the time the bind is deleted, to an immediate wipe of the entire estate (and obviously an [inability to re-enrol(/android/android-enterprise-faq/factory-reset-on-enrolment/)]). These variances exist due to various custom DPCs, EMM logic, and of course AMAPI.

Beyond devices however, any uploaded applications, policies, web apps, or any other data associated with the bind is also unrecoverably deleted.

## What can organisations do to safeguard against deletion?

Understandably with the devastation this can cause to an organisation - I actively oversee multiple 10s and a few 100 thousand unit deployments that would devastate company operations if they were to fall offline or completely reset - it's pertinent to take actions that don't entirely rely on Google making an exception to protect the bind. Here are some things you can do:

### Add more owners to the bind management

Simple and straightforward, [follow my FAQ](/android/android-enterprise-faq/manage-bind-account/) to add more Google accounts to be able to manage the bind. Aim for at least two Owners for redundancy, including the original account that set it up.

If only one account manages a bind and the account is deleted, as above, the bind is deleted. If more than one account manages the bind, and any one of those accounts are deleted, the bind remains in place as there is still an owner associated. This obviously scales up to the number of accounts associated to the bind.

### Use domain-based Google accounts

Not Google Workspace. Google doesn't support Google Workspace accounts managing the bind. Rather, when you sign up for a Google account, click the small link to use an existing domain, and set an account up using the corporate email domain of your organisation. Group mailboxes are a safe bet, offering multiple admins the ability to interact with the account even in high employee churn environments. 

Again this won't work for organisations that lean on Google Workspace, so if it's not possible to create an account under your organisation's domain, ensure the recovery information is added, and again aim for a group/shared mailbox where multiple admins have access to avoid losing access to the Google account in future. 

Ensuring emails Google sends out land in a monitored inbox drastically reduces the likelihood of:

- Inactivity alerts being missed
- Account recovery being impossible

### Leverage an in-use account for the bind

Definitely not a personal account, but rather consider an existing group or departmental Google account that sees active use. One example may be a developer account used to publish to Google Play, as this also provides additional flexibility for managing private applications on a more granular level through the Google Play Console rather than the Google Play iFrame, avoiding bind lock-in should it be necessary to ever start afresh.

An active account will not be subject to the inactivity policy, naturally, though consideration must be given to who has access to what may be very important accounts in some organisations. 

## Bring on the exclusion

The above suggestions can and should be considered irrespective of the inactivity policy, but for those particularly concerned by Google's approach to this, hopefully the knowledge they're _working on it_ will put minds at ease. 

This is an unfortunate reality of consumer policies impacting organisations which unfortunately do happen often given Google's size, consumer focus, and shared infrastructure. Hopefully in time they'll continue to improve how they approach enterprise in the way they have with private application approval policies, Play Store policy escalations, and so on. One day they may even be able to hash these challenges out before the consumer team(s) make their announcements 🙂