# Habitica-Chat-Extension

<sup>Originally written by [Horacious](https://github.com/Horacious/). Now maintained by HabitRPG, Inc. by contributors</sup>
<sup>Firefox port completed by [Coder Extreme](https://github.com/coder-extreme)<sup>


**A habitica.com Chat Client for Chrome and Firefox**

---

Hi, and thanks for contributing to this humble project!

This is an official Habitica (HabitRPG) Chrome and Firefox Extension that it is maintained only by volunteer contributors to Habitica. This code is not maintained by staff.

Please note that the Chrome and Firefox port are almost identical. Coding requirements for porting chrome extensions to firefox can be found in [this article](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Porting_a_Google_Chrome_extension).  

To allow for ease of deployment the code is kept in separate folders, chrome, and firefox. If changing the code, 
+ please ensure you replicate the code changes in the other port and test both. 
+ It is important when completing changes to firefox to zip the files (not the folder but the files themselves) as described in this [article](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Package_your_extension). 
+ To make it easier on staff please ensure you update this ReadMe file with the latest version changes. This will be used for the release notes.
+ Update manifest.json in both chrome and firefox with the latest version number.



+ Increased the Refresh Rate as required by staff
# Version history

### 2.1.8 
+ Errors on loading if there is a party notification

### 2.1.7 (Not Released)
+ Fix info Bugs on party messages

### 2.1.6 (Not Released)
+ Update API Headers, Fix Notification bug, and fix Shaded message bug


### 2.1.5 (Not Released)
+ Fix indentation of display names when avatars are disabled.

### 2.1.4 (Not Released)
+ Set Party link in title to party not id.
+ Fix so notifications show on load of groups.

### 2.1.3 (Not Released)
+ Better checking if User Id / Api Token is valid 
+ Update Firefox to fix minor code issues.


### 2.1.2 
+ Do not start querying if UserId and API token are not set (ie are each 36 length long)
+ Stop checking for notifications if chat is not active, user ids not set and if chat windows are open
+ Increase notifications requery to 40 seconds * by factor greater than hour.

### 2.1.1
+ Maintenance version to disable specific calls due to server issues.

### 2.1.0 
+ Added link to Habitica profile [#13](https://github.com/HabitRPG/habitica-chat-extension/issues/3)
+ Showing datetimestamp on system messages

### 2.0.0 (not released)
+ Firefox port added to repo.[#34](https://github.com/HabitRPG/habitica-chat-extension/issues/34)
+ Updated Readme files
+ Disabled chat on Contact Moderator form page. (does not behave correctly here).
+ Bumped version to 2.0.0 to indicate release.

### 1.8.9 (not released)
+ Added the ability in mention navigation to scroll through the beginning of chat when cycling through.
+ Fixed timeout and number of chat lines so the min is 15 and 5 respectively. Negative numbers are handled correctly.
+ Pointing to wiki url so using fandom.com and correct page without Chrome.(Now is both)

### 1.8.8 (not released)
+ Update message navigation wtih friendly message if not mention.

### 1.8.7 (not released)
+ Further attempt to fix scrolling issue on opening chat

### 1.8.6 (not released)
+ Fixed Scrolling issue when opening and not scrolling to the end.

### 1.8.5 (not released)
+ Renabled mention navigation and modified to based on Username.

### 1.8.4 (not released)
+ Fixed account linking bug

### 1.8.3 (not released)
+ Fixed options page bug

### 1.8.2 (not released)
+ Added like icon to glow green when user likes message.
+ Fixed APIDOC Loading issues. [#36](https://github.com/HabitRPG/habitica-chat-extension/issues/36)

### 1.8.1 (not released)
+ Added upper limits

### 1.8.0 (not released)
+ Updated max time 
+ Bumped version as feature should be done previously

### 1.7.10 (not released)
+ Added option to change timeout time.
+ Replaced bootbox, not working

### 1.7.9 (not released)
+ Added option for confirmation before deleting.
+ Further changes made to .group-item class

### 1.7.8 (not released)
+ Fixed issue when viewing shop pages.

### 1.7.7 (not released)
+ Created two columns to shrink options page length.

### 1.7.6 (not released)
+ Added confirmation before deleting.

### 1.7.5 (not released)
+ Fixed bugs with notifications and flagging
+ Replaced unicode images with URI images so displays correctly with all keyboards.

### 1.7.4 (not released)
+ Further fixes to notifications
+ Made options separate for read and clear.
+ Hide Tavern as a guild. [#14](https://github.com/HabitRPG/habitica-chat-extension/issues/14)

### 1.7.3 (not released)
+ Modification to style of unread messages
+ Added options to disable showing and clearing of notifications.


### 1.7.2 (not released)
+ Fixed to auto refresh notifications and stop them flashing.
+ Mark Party Notifications as read

### 1.7.1 (not released)
+ Show notification for party chat

### 1.7.0 (not released)
+ Highlight guild names if notifications.
+ Added the ability to clear chat notifications when view guild chat.[#15](https://github.com/HabitRPG/habitica-chat-extension/issues/15)
+ Added link to wiki

### 1.6.5 (not released)
+ Fixed display bug with quotes in message.[#17](https://github.com/HabitRPG/habitica-chat-extension/issues/17)
+ Further reorder costume elements
+ Fixed messages to say Habitica not HabitRPG.

### 1.6.4 (not released)
+ Put message back in chat when blocked (ie if swear or fails to transmit).
+ Fixed gear display

### 1.6.3 (not released)
+ More formating with dates. Ensuring all dates displayed using the same formating.

### 1.6.2 (not released)
+ Fixed bugs with dates and in areas of Habitica. 

### 1.6.1 (not released)
+ Added like count to posts

### 1.6.0 (not released)
+ Added flower to avatar and transformations[#12](https://github.com/HabitRPG/habitica-chat-extension/issues/12)
+ Fixed issue when player is not in party. [#20](https://github.com/HabitRPG/habitica-chat-extension/issues/20)
+ Further modifications to dates

### 1.5.2 (not released)
+ Added alert if message is blocked [#29](https://github.com/HabitRPG/habitica-chat-extension/issues/29)
+ Formating Character Account
+ Added Mention dot
+ Fixed bug with copy to clipboard
+ Fixed NPC tier label bug [#3](https://github.com/HabitRPG/habitica-chat-extension/issues/3)


### 1.5.1 (not released)
+ Fixed date format so it is International friendly.

### 1.5.0 (not released)
+ Added Character Limit to box
+ Showed Avatar based on the chat version. (Also handle if chat is prior the change and does not have Avatar).
+ Added User Info button [#13](https://github.com/HabitRPG/habitica-chat-extension/issues/3)
+ Make speech bubble wider if Avatar is hidden
+ Fixed issues with speed and freezing issues with chat. [#22](https://github.com/HabitRPG/habitica-chat-extension/issues/22) & [#19](https://github.com/HabitRPG/habitica-chat-extension/issues/19)
+ Show min/max buttons (They appear to have gone for a walk in the latest versions).
+ Added notes to the options page, and rearrange tiles.
+ Fixed so shows correct colors of Users and tiers correctly.
+ Modify to handle the new Username, and now adds the Username, when clicking in chat, not the Display name.
+ Fixed markup issues [#23](https://github.com/HabitRPG/habitica-chat-extension/issues/23)
+ Added like capability
+ Added flag capability
+ Fixed delete message icon.


### 1.4.8
+ Fixed issue where API token could not be fetched from settings page (as it was hidden) [#33](https://github.com/HabitRPG/habitica-chat-extension/issues/33)


### 1.4.7
+ Fixed guild links pointing to old url scheme [#32](https://github.com/HabitRPG/habitica-chat-extension/issues/32)

### 1.4.6
+ Fixed chat extension to work on new website design

### 1.4.5
+ Automatic linking of creds now works

### 1.4.4
+ Links in settings no longer on top of each other

### 1.4.3
+ Added a disable avatars option to prevent app from crashing. See [#22](https://github.com/HabitRPG/habitica-chat-extension/issues/22)



### 1.4.2
+ Fix: chat extension no longer causes the apidoc page to not load

### 1.4.1
+ fix: Re-impliment missing avatar feature

### 1.4
+ Use official Habitica Markdown module to render markdown
+ Upgrade routes to use version 3 of Habitica API

### 1.1
+ Added avatars

## 1.0 (Official Release)
+ Fixed minor bugs and adjusted some CSS

### 1.0.1
+ Fixed navigation arrows that appeared in some minimized boxes

## 0.6 (Mentions)
+ Added mentions recognition
+ Added arrows to navigate mentions

## 0.5 (Like!)
### 0.5.6
+ Fixed a bug that made a chatBox unable to load if there was an empty message in the log.

### 0.5.5
+ Changed audio
+ Integrated Bootbox
+ Changed inactivity timer from alert to bootbox modal
+ Fixed scroll bug

### 0.5.4
+ Fixed bugs

### 0.5.3
+ Date is now shown as "Today", "Yesterday" or the client data format
+ Updated options page visual
+ Created auto-setup option by visiting HabitRPG's API page
+ Fixed an issue with auto-scrolling
+ Added an inactivity timer to reduce strain on server

### 0.5.2
+ Added emoji support

### 0.5.1
+ Added +1 count

### 0.5.0
+ Added +1
+ Fixed issue with posting with no letters (ie: :+1:)
+ Added special symbol in name
+ Clicking on name label adds @ mention in textarea
+ Text can be larger

## 0.4 (Flags)
### 0.4.2
+ Fixed a parse error

### 0.4.1
+ Added Flag & Delete buttons

## 0.3 (Published Beta)
### 0.3.4
+ Fixed issue with markdown that made lists instead of italic.
+ Added "Minimize" chevron to groups box
+ Adjusted horizontal padding
+ Added URI encoding to stop # and & causing string interruption
+ Added Multi-line suppport
+ Added link to API key in setup box

### 0.3.3
+ Fixed saving issue in popup box

### 0.3.2
+ Fixed an issue with system messages by removing markdown in those
+ Added glyphicons for consistency

### 0.3.1	
+ Hard limit of 5 open windows
+ Added links to guild pages
+ Added new refresh rates: 5 seconds when in focus, 45 seconds when minimize, 60 seconds when in another window/tab
+ Guilds list now has height limit and is scrollable
+ Adjusted z-index so that chat is always on top
+ markdown support for links and emphasis
+ Added username labels

## 0.2 (Debugging and bandwidth limiters)
+ Adjust refresh rate when out of focus

## 0.1 (Proof of concept)
+ All base functionalities (group, chat, open/close boxes...)
