(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

function load (params) {
  return new Promise((resolve) => {
    global.chrome.storage.sync.get(params, resolve);
  });
}

function save (params) {
  return new Promise((resolve) => {
    global.chrome.storage.sync.set(params, () => {
      resolve();
    });
  });
}

module.exports = {
  load,
  save,
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function isBrowser () {
  return Boolean(global.document && global.document.body);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function querySelector (selector) {
  return global.document.querySelector(selector);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lib/chrome-storage":1,"../lib/is-browser":2,"../lib/query-selector":3}]},{},[4]);
