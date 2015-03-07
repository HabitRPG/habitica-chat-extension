// Create "Config" elements to pass down config (until I figure out message passing)
var config = document.createElement('config');
config.setAttribute("id", "habitRPGChatConfig");
config.setAttribute("style", "display: none;");
chrome.storage.sync.get({
	uuid: '',
	api: '',
	enableSound: true,
	largeText: true
}, function(items) {
	config.setAttribute("uuid" , items.uuid);
	config.setAttribute("apiK" , items.api);
	config.setAttribute("sound", items.enableSound);
	config.setAttribute("largeText", items.largeText);
});
(document.head||document.documentElement).appendChild(config);

// Call markdown to html script
var s = document.createElement('script');
s.src = chrome.extension.getURL('resources/mmd.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);

// Call main chat script
var s = document.createElement('script');
s.src = chrome.extension.getURL('mainChat/chat_inPage.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);


