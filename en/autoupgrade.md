# Automatic card upgrade
In the case of screen damage or inaccurate touch, if we want to upgrade the system, we can create a file in the root directory of the TF card
**zkautoupgrade** （Note: The file has no extension）  

![](images/Screenshotfrom2018-06-07195801.png)

In this way, the machine will automatically check the upgrade item after the card is inserted, and the upgrade will start after 2s by default; if you need to control other time before starting the upgrade, we can open the `zkautoupgrade` file and fill in the corresponding number, the unit is seconds; after the upgrade is complete , The system restarts, remember to pull out the TF card to prevent automatic upgrade again.