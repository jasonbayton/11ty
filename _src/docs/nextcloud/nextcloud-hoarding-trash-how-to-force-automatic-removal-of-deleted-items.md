---
title: 'Nextcloud hoarding trash - how to force automatic removal of deleted items'
date: '2017-10-01T23:31:10+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
id: 4680
doccats:
    - Nextcloud
Version:
    - '1.0'
publish_post_category:
    - '11'
discourse_permalink:
    - 'https://discuss.bayton.org/t/nextcloud-hoarding-trash-how-to-force-automatic-removal-of-deleted-items/64'
---
Observing a backup running recently, I noticed a substantial number of files being backed up from the Nextcloud trash directory. On inspecting this, it became apparent not a single file had been permanently deleted from my installation since setting it up over a year ago!

The issue
---------

If your Nextcloud instance utilises a data directory situated on a disk/partition/volume far greater in size than the sum of the data you’re storing, you may notice files in the trash are not being deleted.

The cause
---------

By default, Nextcloud is set to hold on to deleted items for 30 days. After this, files are only deleted when storage starts running low. This means for those with terrabytes of unused storage, deleted items may actually never disappear!

The solution
------------

Config parameters exist to allow Nextcloud server owners the capability of adapting this behaviour, these are as follows:

- `auto` – standard behaviour
- `D, auto` – change the minimum days a file is kept with standard behaviour
- `auto, D` – delete after a number of days, but earlier if space is required
- `D1, D2` – do not delete before, but definitely delete after a certain number of days
- `disabled` – disable automatic deletion

So to automatically delete files after 30 days, and give Nextcloud the ability to delete sooner if space does eventually run low, you can add this to your `config.php`:

`'trashbin_retention_obligation' => 'auto, 30',`

To ensure all files are retained for 30 days, but definitely deleted after 35 days, the following can be added to your `config.php`:

`'trashbin_retention_obligation' => '30, 35',`

Obviously the number of days can be modified to suit.