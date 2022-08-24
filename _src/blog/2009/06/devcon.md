---
title: 'Devcon Uses in the Workplace'
date: '2009-06-04T14:07:24+01:00'
status: publish
author: 'Jason Bayton'
excerpt: ''
type: post
id: 107
tag:
    - corporate
    - devcon
    - disable
    - drivers
    - enable
    - Linkedin
    - Server
post_format: []
post_views_count:
    - '1021'
tags:
    - Projects
---
Introduction

Devcon is a command-line utility designed to interact with hardware (via drivers) on a machine. There are *many* uses for Devcon, I am only describing one simple use for it in combination with creating an executable file. If you are new to Devcon and wanting to learn more about it, I suggest the following sites to get you started:

<https://support.microsoft.com/kb/311272> [https://www.v8scimitar.co.uk/BeginnersGuidetoDevcon.pdf \[broken\]](https://www.v8scimitar.co.uk/BeginnersGuidetoDevcon.pdf)

After installing a new web filter, a lot of pages that used to be accessible (streaming media etc) are no longer available. Ofcourse within the company, especially in the communications department and for meetings involving external presentations and video, this was a giant hindrance.  
In the company itself, there are two networks; internal and external. The external network is not filtered, so therefore can be used for streaming media etc. Another bonus being that the external network is wireless, so any visitors or contractors who require direct access can simply connect without having to connect any cables or succumb to any other annoyances or complications.

With the Wireless network so freely available within the company, the request was put in to use it when in meetings and/or when streaming media was necessary. This was fine, but required a patch in the network dedicated to a wired connection for the otherwise wireless external network, taking up one of the less available outlets. The alternative was to invest in a few wireless dongles, however that too included switching when needed involving the disabling of one connection to enable the other. To the lesser technically minded this was a hassle. And most of the time required myself to go and do it for them.

A while back though, I discovered [Devcon](https://support.microsoft.com/kb/311272). A command line utility that could enable or disable a driver based on it’s unique code. After some research, and credit to <a>Geoff P</a>, I started experimenting.

Initially just using batch files with simple code such as ‘devcon disable PCIVEN\_1317’ – the unique ID to any device within device manager`,` to disable a driver, and ‘devcon enable PCIVEN\_1317’ to reenable a driver. However, this on many occasions failed. Some drivers didn’t reload when asked to, and generally refused to help me out. After this, I turned to AutoIT. In here I was able to link actions to a GUI and make something that looked a lot nicer than a simple .bat!

Ofcourse, moving up to AutoIT meant the code got a little more complicated..

I needed to set global constants first, so I could use shortcuts in the code. Following that, I first made the code for enabling the WIFI, this would first delete all known network drives, the deactivate the LAN as follows:

```

global const $devconlocation = "C:Program FilesDevcon"
global const $lancard = "PCICC_0200"
Global const $wificard = "USBClass_ff"

#include

Run(@ComSpec & " /c cmd")
blockinput(1)
sleep(1000)
Send( "Net use f: /delete" & "{enter}")
Send( "Y" & "{enter}")
Send( "Net use g: /delete" & "{enter}")
Send( "Y" & "{enter}")
Send( "Net use h: /delete" & "{enter}")
Send( "Y" & "{enter}")
............
Send( "Net use z: /delete" & "{enter}")
Send( "Y" & "{enter}")
Sleep(1000)
Send( "cd c:Program FilesDevcon" & "{enter}")
Sleep(1000)
send( "devcon.exe disable "& $lancard & "{enter}")
Sleep(10000)
send( "devcon.exe enable " & $wificard & "{enter}")
send( "exit" & "{enter}")
blockinput(0)
Exit
```

As can be seen, I also set it to block user input. This to prevent the job from being only half done and causing issues. The only annoyance I found was that Devcon couldn’t be used globally. It couldn’t be installed on a machine per say. It could only be placed, and used in one location (or multiple if you were to copy/paste it there).

Once this was created, I then moved onto creating code to enable the LAN. This also needed a GUI to pop up indicating which department the user belonged to and writing the appropriate network drives back in once the LAN was enabled once more.

```

Global const $lancard = "PCICC_0200"
Global const $wificard = "USBClass_ff"
Global Const $depA = "\serverlogondepA.bat"
Global Const $depB = "\serverlogondepB.bat"
Global Const $depC = "\serverlogondepC.bat"
Global Const $depD = "\serverlogondepD.bat"
Global Const $depE = "\serverlogondepE.bat"

#include

Run(@ComSpec & " /c cmd")
blockinput(1)
sleep(1000)
Send( "cd c:Program FilesDevcon" & "{enter}")
Sleep(1000)
send( "devcon.exe disable "& $wificard & "{enter}")
Sleep(10000)
send( "devcon.exe enable " & $lancard & "{enter}")
sleep(8000)
send("exit" & "{enter}")
blockinput(0)

#Region ### START Koda GUI section ### Form=
$AForm1 = GUICreate("Reattach Network Drives", 138, 228, 279, 50)
$Button1 = GUICtrlCreateButton("depB", 32, 48, 75, 25, 0)
$Button2 = GUICtrlCreateButton("depD", 32, 80, 75, 25, 0)
$Button3 = GUICtrlCreateButton("depC", 32, 112, 75, 25, 0)
$Button4 = GUICtrlCreateButton("depE", 32, 144, 75, 25, 0)
$Button5 = GUICtrlCreateButton("depA", 32, 176, 75, 25, 0)
$EnterPassLabel = GUICtrlCreateLabel("Reattach Network Drives", 7, 64, 124, 17)
GUISetState(@SW_SHOW)
#EndRegion ### END Koda GUI section ###

GUISwitch($AForm1)
GUISetState(@SW_SHOW)

While 1
$Msg = GUIGetMsg(1)

Select
Case $msg[0] = $Button1
Run($depB)
ExitLoop
Case $msg[0] = $Button2
Run($depD)
Exitloop
Case $msg[0] = $Button3
Run($depC)
Exitloop
Case $msg[0] = $Button4
Run($depE)
Exitloop
Case $msg[0] = $Button5
Run($depA)
Exitloop
Case $msg[0] = $GUI_EVENT_CLOSE
ExitLoop
EndSelect
WEnd
```

As can be seen, it’s already somewhat more complicated! However once I got used to it, it was pretty clear to make out and understand. I had a GUI creator which helped me to design the GUI and provide the code when finished to directly insert, this was a great help.

Finally, I combined the two codes in with one nice GUI.

```
Global const $lancard = "PCICC_0200"
Global const $wificard = "USBClass_ff"
Global Const $depA = "\serverlogondepA.bat"
Global Const $depB = "\serverlogondepB.bat"
Global Const $depC = "\serverlogondepC.bat"
Global Const $depD = "\serverlogondepD.bat"
Global Const $depE = "\serverlogondepE.bat"

#include

#Region ### START Koda GUI section ### Form=
$AForm1 = GUICreate("SNV Connection Switch", 322, 193, 384, 332)
$Button1 = GUICtrlCreateButton("LAN", 16, 136, 139, 41, 0)
GUICtrlSetFont(-1, 10, 400, 0, "MS Sans Serif")
$Button2 = GUICtrlCreateButton("WIFI", 167, 136, 139, 41, 0)
GUICtrlSetFont(-1, 10, 400, 0, "MS Sans Serif")
$Label1 = GUICtrlCreateLabel("Please Select", 72, 16, 183, 30)
GUICtrlSetFont(-1, 17, 800, 0, "HANA")
$Label2 = GUICtrlCreateLabel("Your Connection", 48, 56, 222, 30)
GUICtrlSetFont(-1, 17, 800, 0, "Hana")
GUISetState(@SW_SHOW)
#EndRegion ### END Koda GUI section ###

While 1
$Msg = GUIGetMsg(1)

Select
Case $msg[0] = $Button1
Run(@ComSpec & " /c cmd")
blockinput(1)
sleep(1000)
Send( "cd c:Program filesDevcon" & "{enter}")
Sleep(1000)
send( "devcon.exe disable "& $wificard & "{enter}")
Sleep(10000)
send( "devcon.exe enable " & $lancard & "{enter}")
sleep(8000)
send("exit" & "{enter}")
blockinput(0)

#Region ### START Koda GUI section ### Form=
$AForm1 = GUICreate("Reattach Network Drives", 138, 228, 279, 150)
$Button1 = GUICtrlCreateButton("depB", 32, 48, 75, 25, 0)
$Button2 = GUICtrlCreateButton("depD", 32, 80, 75, 25, 0)
$Button3 = GUICtrlCreateButton("depC", 32, 112, 75, 25, 0)
$Button4 = GUICtrlCreateButton("depE", 32, 144, 75, 25, 0)
$Button5 = GUICtrlCreateButton("depA", 32, 176, 75, 25, 0)
$EnterPassLabel = GUICtrlCreateLabel("Reattach Network Drives", 7, 14, 124, 17)
GUISetState(@SW_SHOW)
#EndRegion ### END Koda GUI section ###

GUISwitch($AForm1)
GUISetState(@SW_SHOW)

While 1
$Msg = UIGetMsg(1)

Select
Case $msg[0] = $Button1
Run($depB)
ExitLoop
Case $msg[0] = $Button2
Run($depD)
Exitloop
Case $msg[0] = $Button3
Run($depC)
Exitloop
Case $msg[0] = $Button4
Run($depE)
Exitloop
Case $msg[0] = $Button5
Run($depA)
Exitloop
Case $msg[0] = $GUI_EVENT_CLOSE
ExitLoop
EndSelect
WEnd
ExitLoop

Case $msg[0] = $Button2
Run(@ComSpec & " /c cmd")
blockinput(1)
sleep(1000)
Send( "Net use f: /delete" & "{enter}")
Send( "Y" & "{enter}")
Send( "Net use g: /delete" & "{enter}")
Send( "Y" & "{enter}")
Send( "Net use h: /delete" & "{enter}")
.........................................
Send( "Y" & "{enter}")
Send( "Net use z: /delete" & "{enter}")
Send( "Y" & "{enter}")
Sleep(1000)
Send( "cd c:Program FilesDevcon" & "{enter}")
Sleep(1000)
send( "devcon.exe disable "& $lancard & "{enter}")
Sleep(10000)
send( "devcon.exe enable " & $wificard & "{enter}")
send( "exit" & "{enter}")
blockinput(0)
Exit
Exitloop
EndSelect
WEnd
```

With all of this code, the final result looks like this:  
![1.jpg](https://lh6.ggpht.com/_XtX1xEyLe2k/Sie0eujwu4I/AAAAAAAADAA/g6KUH3WkOd4/1.jpg?imgmax=640)![]()

And with attaching the network drives:  
![2.jpg](https://lh6.ggpht.com/_XtX1xEyLe2k/Sie0esMMLII/AAAAAAAADAE/wPSFjUScxqg/2.jpg?imgmax=640)![]()

This will soon be rolled out to those in the company who require it, and I believe I’ve helped in making the workplace just a little easier!