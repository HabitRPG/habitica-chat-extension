
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

var s = document.createElement('script');
s.src = chrome.extension.getURL('chat_inPage.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);

console.log('ID: '+chrome.runtime.id);


