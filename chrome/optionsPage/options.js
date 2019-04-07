// Saves options to chrome.storage
function save_options() {
  var uuid = document.getElementById('uuid').value;
  var api = document.getElementById('api').value;
  var enableSound = document.getElementById('enableSound').checked;
  var largeText = document.getElementById('largeText').checked;
  var disableAvatars = document.getElementById('disableAvatars').checked;
  var disableShowNotifications = document.getElementById('disableShowNotifications').checked;
  var disableReadNotifications = document.getElementById('disableReadNotifications').checked;
  var confirmDelete = document.getElementById('confirmDelete').checked;
  var hideGroups = document.getElementById('hideGroups').checked;
  var messageCount = parseInt(document.getElementById('messageCount').value);
  var timeoutAfter = parseInt(document.getElementById('timeoutAfter').value);
  var dateFormat = parseInt(document.getElementById('dateFormat').value);
  var timeFormat = parseInt(document.getElementById('timeFormat').value);
  if (messageCount < 5) {
    messageCount= 5;
  }
  if (timeoutAfter < 15) {
    timeoutAfter = 15;
  }
  chrome.storage.sync.set({
    uuid: uuid,
    api: api,
    enableSound: enableSound,
    dateFormat: dateFormat,
    timeFormat: timeFormat,
    largeText: largeText,
    messageCount: (messageCount > 200 ? 0 : messageCount),
    timeoutAfter: (timeoutAfter > 240 ? 240 : timeoutAfter),
    disableAvatars: disableAvatars,
    disableShowNotifications: disableShowNotifications,
    disableReadNotifications: disableReadNotifications,
    confirmDelete: confirmDelete,
    hideGroups: hideGroups
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.style.display = "block";
    setTimeout(function() {
      status.style.display = "none";
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    uuid: '',
    api: '',
    enableSound: true,
    largeText: false,
    disableAvatars: false,
    messageCount: 200,
    timeoutAfter: 60,
    dateFormat: 0,
    timeFormat: 12,
    disableShowNotifications: false,
    disableReadNotifications: false,
    confirmDelete: true,
    hideGroups: true
  }, function(items) {
    document.getElementById('uuid').value = items.uuid;
    document.getElementById('api').value = items.api;
    document.getElementById('enableSound').checked = items.enableSound;
    document.getElementById('dateFormat').value = items.dateFormat;
    document.getElementById('timeFormat').value = items.timeFormat;
    document.getElementById('largeText').checked = items.largeText;
    document.getElementById('disableAvatars').checked = items.disableAvatars;
    document.getElementById('disableShowNotifications').checked = items.disableShowNotifications;
    document.getElementById('disableReadNotifications').checked = items.disableReadNotifications;
    document.getElementById('confirmDelete').checked = items.confirmDelete;
    document.getElementById('hideGroups').checked = items.hideGroups;
    document.getElementById('messageCount').value = (items.messageCount ? items.messageCount : 200);
    document.getElementById('timeoutAfter').value = (items.timeoutAfter ? items.timeoutAfter : 60);
  });
}

function openSettings() {
	chrome.tabs.create({ url: "https://habitica.com/user/settings/api" });
}

function openGitHub() {
	chrome.tabs.create({ url: "https://github.com/HabitRPG/habitica-chat-extension" });
}

function openWiki() {
	chrome.tabs.create({ url: "https://habitica.wikia.com/wiki/Chrome_Chat_Extension" });
}

function reportBug() {
	chrome.tabs.create({ url: "https://habitica.com/groups/guild/a29da26b-37de-4a71-b0c6-48e72a900dac" });
}

function displayManualOptions() {
	document.getElementById('userForm').style.display = "block";
	document.getElementById('manualSetupTrigger').style.display = "none";
}

// Load options
document.addEventListener('DOMContentLoaded', restore_options);
// Display manual settings
document.getElementById('manualSetupTrigger').addEventListener('click', displayManualOptions);
// Link
document.getElementById('hint').addEventListener('click', openSettings);
document.getElementById('gitHub').addEventListener('click', openGitHub);
document.getElementById('wiki').addEventListener('click', openWiki);
document.getElementById('reportBug').addEventListener('click', reportBug);
// Saving
document.getElementById('largeText').addEventListener('click', save_options);
document.getElementById('disableAvatars').addEventListener('click', save_options);
document.getElementById('enableSound').addEventListener('click', save_options);
document.getElementById('disableShowNotifications').addEventListener('click', save_options);
document.getElementById('disableReadNotifications').addEventListener('click', save_options);
document.getElementById('confirmDelete').addEventListener('click', save_options);
document.getElementById('hideGroups').addEventListener('click', save_options);
document.getElementById('uuid').addEventListener('paste', save_options);
document.getElementById('uuid').addEventListener('keyup', save_options);
document.getElementById('api').addEventListener('paste', save_options);
document.getElementById('api').addEventListener('keyup', save_options);
document.getElementById('messageCount').addEventListener('input', save_options);
document.getElementById('timeoutAfter').addEventListener('input', save_options);
document.getElementById('dateFormat').addEventListener('input', save_options);
document.getElementById('timeFormat').addEventListener('input', save_options);