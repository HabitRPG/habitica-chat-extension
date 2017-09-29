// Create "Config" elements to pass down config (until I figure out message passing)
var config = document.createElement('config');
config.setAttribute("id", "habitRPGChatConfig");
config.setAttribute("style", "display: none;");
chrome.storage.sync.get({
	uuid: '',
	api: '',
	enableSound: true,
  largeText: false,
  disableAvatars: false
}, function(items) {
	config.setAttribute("uuid" , items.uuid);
	config.setAttribute("apiK" , items.api);
	config.setAttribute("sound", items.enableSound);
	config.setAttribute("largeText", items.largeText);
	config.setAttribute("disableAvatars", items.disableAvatars);
});
(document.head||document.documentElement).appendChild(config);

// Call markdown to html script
var s = document.createElement('script');
s.src = chrome.extension.getURL('resources/habitica-markdown.min.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);

// Call other functions
var s = document.createElement('script');
s.src = chrome.extension.getURL('resources/miscFunctions.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);

// Call bootbox
var s = document.createElement('script');
s.src = chrome.extension.getURL('resources/bootbox.min.js');
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




window.addEventListener('message', function(event) {
  // Only accept messages from same frame
  if (event.source !== window) {
    return;
  }
  var message = event.data;
  if (typeof message !== 'object' || message === null || !message.uuid || !message.apik || (
	message.uuid == $('config').attr('uuid')
	&&
	message.apik == $('config').attr('apik')
  )) {
    return;
  }

  chrome.storage.sync.set({
    uuid: message.uuid,
    api: message.apik
  }, function() {
      alert('The HabitRPG Chat is now linked with user '+message.name);
	// Reload this page
	window.location.reload();
  });

});
