// Saves options to chrome.storage
function save_options() {
  var uuid = document.getElementById('uuid').value;
  var api = document.getElementById('api').value;
  var enableSound = document.getElementById('enableSound').checked;
  chrome.storage.sync.set({
    uuid: uuid,
    api: api,
    enableSound: enableSound
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    uuid: '',
    api: '',
    enableSound: true
  }, function(items) {
    document.getElementById('uuid').value = items.uuid;
    document.getElementById('api').value = items.api;
    document.getElementById('enableSound').checked = items.enableSound;
  });
}

function openTab() {
	chrome.tabs.create({ url: "https://habitrpg.com/#/options/settings/api" });
}

document.addEventListener('DOMContentLoaded', restore_options);



// Saving
document.getElementById('hint').addEventListener('click', openTab);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('uuid').addEventListener('paste', save_options);
document.getElementById('uuid').addEventListener('keyup', save_options);
document.getElementById('api').addEventListener('paste', save_options);
document.getElementById('api').addEventListener('keyup', save_options);