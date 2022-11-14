# CDP Deep Dive 
Contains APP and CDP folders which provides snippets to complete various tasks of integrations between Website and Sitecore CDP instance.

# Prerequisites
←`Hosted Website` : You can have your own website or copy contents of `APP` folder which is example project created from https://glitch.com/ 

←`Sitecore CDP instance` : More about getting access to CDP instance can be found in https://sitecore.madhav.blog/how-to-login-into-cdp-instance/

←`Choice of IDE` : For this implementation Visual Studio Code is used.

## What's in this project?

← `App Folder`: Contains HTML version of example website from glitch.com .

← `CDP Folder`: Contains various components used in CDP instance which can be imported or referred to create new one.

## How to make it work / Steps for usage ?

← First make sure you have Prerequisites.

← Clone Repository to your local. 

← Replace clientKey, pointofSale and cookieDomain in `APP\js\sitecore-cdp.js` with your clientkey, CDP point of sale name and website's top level domain respectively.

← Deploy `APP` folder contents into IIS site.

← `Optional Step` : Import CDP components into your instance or refer to create new ones.




