---
title: 'Publish internet speeds on Twitter with speedtest-cli and speedtest.py'
published: '2017-06-01T19:31:16+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: documentation
id: 4266
doccats:
    - Ubuntu
Version:
    - '1.0'
publish_post_category:
    - '15'
discourse_permalink:
    - 'https://discuss.bayton.org/t/publish-internet-speeds-on-twitter-with-speedtest-cli-and-speedtest-py/55'
---
If you’re someone who struggles with poor internet speeds and finds the mind-numbing rigmarole of contacting your ISP to complain over and over again – with the same old scripted “are you using WiFi or ethernet? Have you turned your router off and on again? There aren’t any problems reported in your area” – unbearable, here’s another option:

Tweet it.

Not manually, of course, because that invokes the same issues as above; rather instead by creating a Twitter app, associating it with a new, dedicated account and making use of Twitter’s API via a couple of open-source scripts to publicly report your current internet speed on a regular basis.

Will it encourage the ISP to resolve the issue? Possibly. It will however definitely highlight the problems you’re facing and act as a warning for others considering signing up for the same service, so that’s useful.

## 1. Prerequisites

In order to set this up, you’ll need the following:

- An always-on device capable of running Python scripts. For this guide Ubuntu server in an LXD container will be used, however a RaspberryPi is another good choice given its minuscule power requirements and immensely small form factor.
- Speedtest-cli, a command-line alternative to the speedtest.net website
- Speedtest.py, an open-source Python script that combines Twitter’s API with `speedtest-cli` and tweets the result
- A Twitter account
- A Twitter app

## 2. Set up Ubuntu

As always, before undertaking any of the following steps, ensure the server is up to date by running:

`sudo apt update && sudo apt dist-upgrade -y`

This will update APT sources and request a distribution upgrade (like a simple upgrade, but with the power to remove redundant packages during the upgrade process).

Next, install `python-pip` to allow for quick, simple support and import of the required Python includes:

`sudo apt install python-pip`

Be aware, on a fresh Ubuntu server it’ll want to install over 200MB worth of packages on disk:

[![](https://cdn.bayton.org/uploads/2017/06/python-pip.png)](https://cdn.bayton.org/uploads/2017/06/python-pip.png)

If you’re happy to continue, tap enter. Then, once the installation is complete, install the includes:

`sudo pip install -U pip setuptools` (optional, as it should have been installed above)

`sudo pip install twitter`

## 3. Download the scripts

Ensure you’re in your home directory:

`cd ~/`

Then make the speedtest directory:

`mkdir speedtest`

And enter it:

`cd speedtest`

Download the two components:

*Note: The below `speedtest.py` is my own edited version to omit upspeed, target my own ISP and add a timestamp to avoid Twitter’s API preventing duplicate download speeds being tweeted. For the original, [click here](https://gist.github.com/michelwilhelm/8de35523570c82eabfdb).*

`wget https://raw.githubusercontent.com/jasonbayton/misc/master/speedtest.py`

`wget -O speedtest-cli https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py`

Then make them executable:

`chmod +x *`

Running the test now with `./speedtest.py` will fail, even if you edit the file to add in the paths for speedtest-cli and the data.csv file as in this screenshot:

[![](https://cdn.bayton.org/uploads/2017/06/speedtest.png)](https://cdn.bayton.org/uploads/2017/06/speedtest.png)

The Twitter module complains the tokens are invalid. Indeed they are, so you’ll need to generate new ones in order to continue.

## 4. Set up the Twitter app

If you’re going to create this app for a new, dedicated Twitter account, like [@jason\_broadband](https://twitter.com/jason_broadband), then go off and set that up now. Once logged in:

Navigate over to [apps.twitter.com/app/new](https://apps.twitter.com/app/new)

Fill out the form roughly as follows:

[![](https://cdn.bayton.org/uploads/2017/05/twitter_createapp.png)](https://cdn.bayton.org/uploads/2017/05/twitter_createapp.png)

Then click **Create your Twitter application**.

You’ll now be presented with your new application:

[![](https://cdn.bayton.org/uploads/2017/05/twitter_appcreated.png)](https://cdn.bayton.org/uploads/2017/05/twitter_appcreated.png)

It won’t do anything just yet however, as it needs access to your Twitter account. For that, click **Keys and Access Tokens**:

[![](https://cdn.bayton.org/uploads/2017/05/twitter_createtoken.png)](https://cdn.bayton.org/uploads/2017/05/twitter_createtoken.png)

Then **Create my access token**. The page will refresh with access tokens you can use in the `speedtest.py` script:

[![](https://cdn.bayton.org/uploads/2017/05/twitter_tokencreated.png)](https://cdn.bayton.org/uploads/2017/05/twitter_tokencreated.png)

## 5. Edit the script

With the tokens generated, head back to the commandline and open the `speedtest.py` script for editing:

`vim speedtest.py`

There are now several fields to edit, all marked with four `x`‘s. Replace the `x`‘s with the paths to the files in question, and the tokens just generated; you should end up with something that looks as follows:

[![](https://cdn.bayton.org/uploads/2017/06/fullscript-1.png)](https://cdn.bayton.org/uploads/2017/06/fullscript-1.png)

Of course, the messages to be tweeted should be edited also; make sure to leave `+ str(int(eval(d))) +` and `+ tm` in place in order to retain the download speed and timestamp, but other than that edit as much as you wish (within the 160 character limit!):

[![](https://cdn.bayton.org/uploads/2017/06/finalscript.png)](https://cdn.bayton.org/uploads/2017/06/finalscript.png)

Once the file is saved, it’s ready to be tested.

`./speedtest.py`

Should it error here with a *could not authenticate you* error, feel free to regenerate the Access token and secret, then try again.

Finally, edit your crontab to run this script on a regular basis:

`crontab -e`

The below example will run once per hour and should be added at the bottom of the crontab. Add in your own username:

`0 * * * * /home/xxxx/speedtest.py >> /var/log/speed.log 2>&1`

[![](https://cdn.bayton.org/uploads/2017/06/crontab.png)](https://cdn.bayton.org/uploads/2017/06/crontab.png)

## 6. Result

After filling out the Twitter profile a little – adding an image, description, etc. – the account is fully set up and tweets roll in on an hourly basis:

[![](https://cdn.bayton.org/uploads/2017/06/twitter-showcase.png)](https://cdn.bayton.org/uploads/2017/06/twitter-showcase.png)

## 7. Conclusion

Thanks to the open source projects already in place, setting up this Twitter solution is fast and straightforward. With the right combination of hashtags, many other automated Twitter apps will retweet your tweets automatically, making for very simple publicity.

If you’re struggling with a poor connection, give this a try. The more disgruntled customers who complain, the higher the chances something might change.

*Are you struggling with poor internet speeds or a flaky connection in your area? Are you tired of phoning your ISP to complain? Did this tutorial help lead you to a resolution? Let me know in the comments!*