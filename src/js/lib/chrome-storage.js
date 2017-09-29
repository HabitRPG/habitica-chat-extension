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
