'use strict';

const chromeStorage = require('../lib/chrome-storage');
const isBrowser = require('../lib/is-browser');
const $ = require('../lib/query-selector');

function saveOptions () {
  let uuid = $('#uuid');
  let api = $('#api');
  let status = $('#status');

  return chromeStorage.save({
    uuid: uuid.value,
    api: api.value,
  }).then(() => {
    status.style.opacity = 1;

    setTimeout(() => {
      status.style.opacity = 0;
    }, 750);
  });
}

function restoreOptions () {
  let uuidInput = $('#uuid');
  let apiInput = $('#api');

  return chromeStorage.load({
    uuid: '',
    api: '',
  }).then((options) => {
    uuidInput.value = options.uuid;
    apiInput.value = options.api;
  });
}

function setupDomListeners () {
  let uuid = $('#uuid');
  let api = $('#api');

  function applySaveInTimeout () {
    // the paste event doesn't have access to the correct value in the event loop, so we need to take it out to grab the right value
    setTimeout(() => {
      saveOptions();
    }, 0);
  }

  global.document.addEventListener('DOMContentLoaded', restoreOptions);

  uuid.addEventListener('paste', applySaveInTimeout);
  api.addEventListener('paste', applySaveInTimeout);
}

function start () {
  setupDomListeners();
}

if (isBrowser()) {
  start();
}

module.exports = {
  saveOptions,
  restoreOptions,
  start,
};
