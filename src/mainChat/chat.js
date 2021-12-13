if (
  document.URL.indexOf('https://habitica.com/apidoc/') === -1 &&
  document.URL.indexOf('http://contact.habitica.com/') === -1 &&
  document.URL.indexOf('http://translate.habitica.com/') === -1
) {
  // Create "Config" elements to pass down config (until I figure out message passing)
  const config = document.createElement('config')
  config.setAttribute('id', 'habitRPGChatConfig')
  config.setAttribute('style', 'display: none;')
  chrome.storage.local.get(
    {
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
      hideGroups: true,
      hideSystem: false
    },
    function (items) {
      config.setAttribute('uuid', items.uuid)
      config.setAttribute('apiK', items.api)
      config.setAttribute('sound', items.enableSound)
      config.setAttribute('largeText', items.largeText)
      config.setAttribute('disableAvatars', items.disableAvatars)
      config.setAttribute(
        'disableShowNotifications',
        items.disableShowNotifications
      )
      config.setAttribute(
        'disableReadNotifications',
        items.disableReadNotifications
      )
      config.setAttribute('messageCount', items.messageCount)
      config.setAttribute('timeoutAfter', items.timeoutAfter)
      config.setAttribute('dateFormat', items.dateFormat)
      config.setAttribute('timeFormat', items.timeFormat)
      config.setAttribute('confirmDelete', items.confirmDelete)
      config.setAttribute('hideGroups', items.hideGroups)
      config.setAttribute('hideSystem', items.hideSystem)
    }
  );
  (document.head || document.documentElement).appendChild(config)

  // Call markdown to html script
  var s1 = document.createElement('script')
  s1.src = chrome.extension.getURL('resources/habitica-markdown.js')
  s1.onload = function () {
    this.parentNode.removeChild(this)
  };
  (document.head || document.documentElement).appendChild(s1)

  // Call jquery script
  var s2 = document.createElement('script')
  s2.src = chrome.extension.getURL('resources/jquery.js')
  s2.onload = function () {
    this.parentNode.removeChild(this)
  };
  (document.head || document.documentElement).appendChild(s2)

  // Call other functions
  var s3 = document.createElement('script')
  s3.src = chrome.extension.getURL('resources/miscFunctions.js')
  s3.onload = function () {
    this.parentNode.removeChild(this)
  };
  (document.head || document.documentElement).appendChild(s3)

  // Load Purify.js to sanitize inputs
  var s4 = document.createElement('script')
  s4.src = chrome.extension.getURL('resources/purify.js')
  s4.onload = function () {
    this.parentNode.removeChild(this)
  };
  (document.head || document.documentElement).appendChild(s4)

  // Call main chat script
  // pause 2 seconds to allow everything to catch up
  setTimeout(function () {
    const s5 = document.createElement('script')
    s5.src = chrome.extension.getURL('mainChat/chat_inPage.js')
    s5.onload = function () {
      this.parentNode.removeChild(this)
    };
    (document.head || document.documentElement).appendChild(s5)
  }, 2000)

  window.addEventListener('message', function (event) {
    // Only accept messages from same frame
    if (event.source !== window) {
      return
    }
    const message = event.data
    if (
      typeof message !== 'object' ||
      message === null ||
      !message.uuid ||
      !message.apik ||
      (message.uuid === config.getAttribute('uuid') &&
        message.apik === config.getAttribute('apik'))
    ) {
      return
    }

    chrome.storage.local.set(
      {
        uuid: message.uuid,
        api: message.apik
      },
      function () {
        alert(
          'The Habitica Chat Client is now linked with user ' + message.name
        )
        // Reload this page
        window.location.reload()
      }
    )
  })
}
