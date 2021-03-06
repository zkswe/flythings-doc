# Getting started
For novices, here is an introductory guide.

## Tools
1. Before starting to use our screen, we must first use the [Install](download.md) ok;
2. Open the tool, and simply get familiar with [Development Environment](flythings_ide_snapshot.md), you can try [Create a new project](new_flythings_project.md)，browse what is there, and don’t have to delve into the details inside;
3. There is nothing on the newly created project UI. We can drag and drop a [text control](textview.md) on it, and then [compile](how_to_compile_flythings.md)、[run](run_project.md) to our See the effect on the screen; **Note: If your machine is a wifi version, you must configure the ADB IP to download normally**; refer to the [document](run_project.md);
4. We have provided a large amount of [Sample code](demo_download.md), select the code package of the corresponding platform size, download it, unzip it, and [import](import_project.md) into the tool; there are many projects, these are behind The chapter will introduce in detail, here we can choose the example we are interested in [Run](run_project.md) to see the effect on our screen; <br/>

At this point, I believe you will be able to use the simple tool;

## Rules
After getting familiar with the tools, let’s take a look at the development rules of this screen;  <br/>
1. Understand the [directory structure](project_structure.md) of the project, you can know what the project contains, and in which directory our code, UI and resources are stored;
2. Next, let's take a look at what content is automatically generated by the tool, [what is the correspondence between the UI file and the source code](ftu_and_source_relationships.md) and the [control naming rule](named_rule.md) on the UI; After understanding these, we know where our code needs to be filled in and how to operate the controls;

## Control articles
The development interface is inseparable from the use of each control. In the navigation bar of the document, there is a special chapter to introduce the use of each control —— **Control Introduction**；

## Serial port
1.  First, we must know the [communication model](serial_introdoction.md)；
2. Then try it out according to the provided [case](serial_example.md), and then add some protocols and functions on this basis;
3. Then go to study the realization of [communication framework](serial_framework.md); 

## Upgrade
There are two upgrade methods:
1. [Make image file](make_image.md) —— **update.img** file; in this way, the program is solidified into the machine, and the program is still there when power is off. Pay attention to the normal [download](adb_debug.md) The difference between debugging; this method is also our most commonly used;
2. [Make a flash card](sd_boot.md) —— format the whole machine; the system has a new version update, we will officially provide the corresponding sd file, make it into a flash card and flash the machine to upgrade; like: the system can’t turn on, The system needs to support new functions or fix related bugs, etc., in these cases, you need to flash the machine;

## Debugging
Currently, the program can only be debugged by [Add Log](logcat.md);

## Module articles
See [Core Module Instructions](core_module.md)

## Hardware
See [Hardware Instructions](hardware.md)

## Question
Here are some [common problems and solutions](problems.md);

## contact us
QQ group：[371608200](//shang.qq.com/wpa/qunwpa?idkey=da6e12d1773a7e55295a0accd2a46ad51aece61657fe55a2f8277f4cd91dc56a)<br/>
Forum：[SuperV](http://bbs.zkswe.com/forum.php)