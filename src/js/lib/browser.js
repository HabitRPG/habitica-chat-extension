let extension;
let storage;
let tabs;


if (process.env.BROWSER === 'chrome') {
  extension = chrome.extension;
  storage = chrome.storage.sync;
  tabs = chrome.tabs;
} else if (process.env.BROWSER === 'firefox') {
  extension = browser.extension;
  storage = browser.storage.local;
  tabs = browser.tabs;
}

function getStorage (options, cb) {
  storage.get(options, cb)
}

function setStorage (options, cb) {
  storage.set(options, cb)
}

function getExtensionURL (url) {
  return extension.getURL(url);
}

function createTab(url) {
  return tabs.create({
    url
  });
}

module.exports = {
  getStorage,
  setStorage,
  getExtensionURL,
  createTab
};
