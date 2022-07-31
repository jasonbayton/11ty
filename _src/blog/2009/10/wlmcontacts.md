---
title: 'Creating a custom WLM contact list'
date: '2009-10-20T10:16:12+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 255
tag:
    - chat
    - computers
    - corporate
    - easy
    - free
    - Linkedin
    - MSN
    - quick
    - WLM
post_format: []
post_views_count:
    - '1100'
discourse_permalink:
    - 'https://discuss.bayton.org/t/creating-a-custom-wlm-contact-list/340'
publish_post_category:
    - '14'
tags:
    - Guides
---
Work instruction  
Creating a WLM Contact List

**Introduction**

WLM, although being a very good tool for communication, suffers when it comes to adding multiple contacts. In a corporate environment where everyone relies on WLM, it is not useful to have to add each person in your address book one by one in WLM. There is the import/export contacts feature. It is used for backing up your contacts and re-importing them, however still it does not take into account that you may need to create a new list from scratch and import it.

For those who are responsible for administering it, there’s a very simple way of creating a “template” for use when a new employee joins and/or a user loses all contacts. See below.

**Creating a contact list from scratch**

The WLM contact list is based on XML. That is a fantastic bonus, as it makes life easier when it comes to creating a list. For creating a list via notepad, open notepad and insert the following code:

```
&lt;?xml version=”1.0″?&gt;  
&lt;messenger&gt;  
&lt;service name=”.NET Messenger Service”&gt;  
&lt;contactlist&gt;  
&lt;contact&gt;contact1@domain.com&lt;/contact&gt;  
&lt;contact&gt;contact2@domain.com&lt;/contact&gt;  
&lt;contact&gt;contact3@domain.com&lt;/contact&gt;

…

&lt;contact&gt;contact20@domain.com&lt;/contact&gt;  
&lt;/contactlist&gt;  
&lt;/service&gt;  
&lt;/messenger&gt;
```

You can see as above that it works with tags. You may enter your email addresses between the &lt;contact&gt; and &lt;/contact&gt;. Make as many of these as you’d like depending on how many contacts you have. This is useful for a small amount of contacts, say for instance in a department.

Save this document as a .CTT – you will notice that the icon of the file is a messenger icon.

[![image00](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2009/10/image00.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2009/10/image00.png)

In WLM, go to the Contacts menu, and select **Import Messenger contacts**

[![image01](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2009/10/image01.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2009/10/image01.png)

Select the .CTT that you created, and agree to importing X amount of contacts.

You will then find a whole list of contacts! Once you have been accepted by your colleagues, you will be able to start chatting.

For creating a very large list, remove the entries “&lt;contact&gt;contact\*@domain.com&lt;/contact&gt;”.

Export your Outlook contact list

[![image02](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2009/10/image02.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2009/10/image02.png)

Select Export to file

[![image03](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2009/10/image03.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2009/10/image03.png)

Choose Excel 97-2003

[![image04](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2009/10/image04.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2009/10/image04.png)

Contacts (For best results, have your contacts organised so not to export people you don’t want in WLM)

[![image05](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2009/10/image05.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2009/10/image05.png)

Select a Location

[![image06](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2009/10/image06.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2009/10/image06.png)

Once this is done, please open the new .XLS file in Microsoft Excel

[![image07](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2009/10/image07.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2009/10/image07.png)

You can extract all email data, removing the names and leaving only the addresses. Then create a new Excel workbook. In column A have &lt;contact&gt;, column B have the address and column C have &lt;/contact&gt;

[![image08](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2009/10/image08.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2009/10/image08.png)

Finally, copy/paste all of this data back into Notepad, and save it as a .CTT

[![image09](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2009/10/image09.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2009/10/image09.png)

This will create a contact list which you can import into messenger as stated above. In WLM, go to the Contacts menu, and select **Import Messenger contacts**

[![image01](https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2009/10/image01.png)](/https://bucket.bayton.uk-lon1.upcloudobjects.com/uploads/2009/10/image01.png)

Select the .CTT that you created, and agree to importing X amount of contacts. You will then find a whole list of contacts! Once you have been accepted by your colleagues, you will be able to start chatting.