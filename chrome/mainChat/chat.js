if (
  document.URL.indexOf("https://habitica.com/apidoc/") == -1 &&
  document.URL.indexOf("http://contact.habitica.com/") == -1 &&
  document.URL.indexOf("http://translate.habitica.com/") == -1
) {
  // Create "Config" elements to pass down config (until I figure out message passing)
  var config = document.createElement("config");
  config.setAttribute("id", "habitRPGChatConfig");
  config.setAttribute("style", "display: none;");
  browser.storage.local.get(
    {
      uuid: "",
      api: "",
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
      hideGroups: true,
      hideSystem: false
    },
    function(items) {
      config.setAttribute("uuid", items.uuid);
      config.setAttribute("apiK", items.api);
      config.setAttribute("sound", items.enableSound);
      config.setAttribute("largeText", items.largeText);
      config.setAttribute("disableAvatars", items.disableAvatars);
      config.setAttribute(
        "disableShowNotifications",
        items.disableShowNotifications
      );
      config.setAttribute(
        "disableReadNotifications",
        items.disableReadNotifications
      );
      config.setAttribute("messageCount", items.messageCount);
      config.setAttribute("timeoutAfter", items.timeoutAfter);
      config.setAttribute("dateFormat", items.dateFormat);
      config.setAttribute("timeFormat", items.timeFormat);
      config.setAttribute("confirmDelete", items.confirmDelete);
      config.setAttribute("hideGroups", items.hideGroups);
      config.setAttribute("hideSystem", items.hideSystem);
    }
  );
  (document.head || document.documentElement).appendChild(config);

  // Call markdown to html script
  var s = document.createElement("script");
  s.src = browser.extension.getURL("resources/habitica-markdown.js");
  s.onload = function() {
    this.parentNode.removeChild(this);
  };
  (document.head || document.documentElement).appendChild(s);

  // Call jquery script
  var s = document.createElement("script");
  s.src = chrome.extension.getURL("resources/jquery.js");
  s.onload = function() {
    this.parentNode.removeChild(this);
  };
  (document.head || document.documentElement).appendChild(s);

  // Call other functions
  var s = document.createElement("script");
  s.src = browser.extension.getURL("resources/miscFunctions.js");
  s.onload = function() {
    this.parentNode.removeChild(this);
  };
  (document.head || document.documentElement).appendChild(s);

  // Load Purify.js to sanitize inputs
  var s = document.createElement("script");
  s.src = browser.extension.getURL("resources/purify.js");
  s.onload = function() {
    this.parentNode.removeChild(this);
  };
  (document.head || document.documentElement).appendChild(s);

  // Call main chat script
  //pause 2 seconds to allow everything to catch up
  setTimeout(function() {
    var s = document.createElement("script");
    s.src = browser.extension.getURL("mainChat/chat_inPage.js");
    s.onload = function() {
      this.parentNode.removeChild(this);
    };
    (document.head || document.documentElement).appendChild(s);
  }, 2000);

  window.addEventListener("message", function(event) {
    // Only accept messages from same frame
    if (event.source !== window) {
      return;
    }
    var message = event.data;
    if (
      typeof message !== "object" ||
      message === null ||
      !message.uuid ||
      !message.apik ||
      (message.uuid == config.getAttribute("uuid") &&
        message.apik == config.getAttribute("apik"))
    ) {
      return;
    }

    browser.storage.local.set(
      {
        uuid: message.uuid,
        api: message.apik
      },
      function() {
        alert(
          "The Habitica Chat Client is now linked with user " + message.name
        );
        // Reload this page
        window.location.reload();
      }
    );
  });
}
