# Version history

Release notes above version 1.4.1 can be viewed on the [releases page](https://github.com/HabitRPG/habitica-chat-extension/releases)

### 1.4.1
* fix: Re-impliment missing avatar feature

### 1.4
* Use official Habitica Markdown module to render markdown
* Upgrade routes to use version 3 of Habitica API

### 1.1
* Added avatars

## 1.0 (Official Release)
* Fixed minor bugs and adjusted some CSS

### 1.0.1
* Fixed navigation arrows that appeared in some minimized boxes

## 0.6 (Mentions)
* Added mentions recognition
* Added arrows to navigate mentions

## 0.5 (Like!)
### 0.5.6
* Fixed a bug that made a chatBox unable to load if there was an empty message in the log.

### 0.5.5
* Changed audio
* Integrated Bootbox
* Changed inactivity timer from alert to bootbox modal
* Fixed scroll bug

### 0.5.4
* Fixed bugs

### 0.5.3
* Date is now shown as "Today", "Yesterday" or the client data format
* Updated options page visual
* Created auto-setup option by visiting HabitRPG's API page
* Fixed an issue with auto-scrolling
* Added an inactivity timer to reduce strain on server

### 0.5.2
* Added emoji support

### 0.5.1
* Added +1 count

### 0.5.0
* Added +1
* Fixed issue with posting with no letters (ie: :+1:)
* Added special symbol in name
* Clicking on name label adds @ mention in textarea
* Text can be larger

## 0.4 (Flags)
### 0.4.2
* Fixed a parse error

### 0.4.1
* Added Flag & Delete buttons

## 0.3 (Published Beta)
### 0.3.4
* Fixed issue with markdown that made lists instead of italic.
* Added "Minimize" chevron to groups box
* Adjusted horizontal padding
* Added URI encoding to stop # and & causing string interruption
* Added Multi-line suppport
* Add link to API key in setup box

### 0.3.3
* Fixed saving issue in popup box

### 0.3.2
* Fixed an issue with system messages by removing markdown in those
* add glyphicons for consistency

### 0.3.1	
* Hard limit of 5 open windows
* Added links to guild pages
* Added new refresh rates: 5 seconds when in focus, 45 seconds when minimize, 60 seconds when in another window/tab
* Guilds list now has height limit and is scrollable
* Adjusted z-index so that chat is always on top
* markdown support for links and emphasis
* Added username labels

## 0.2 (Debugging and bandwidth limiters)
* Adjust refresh rate when out of focus

## 0.1 (Proof of concept)
* All base functionalities (group, chat, open/close boxes...)
