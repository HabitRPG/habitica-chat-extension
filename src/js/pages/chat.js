'use strict';

const $ = require('../lib/query-selector').$;
const $$ = require('../lib/query-selector').$$;
const isBrowser = require('../lib/is-browser');
const chromeStorage = require('../lib/chrome-storage');
const habitica = require('../lib/habitica');
const habiticaMarkdown = require('habitica-markdown');

const REFRESH_RATE_FAST = 5000;
const REFRESH_RATE_MEDIUM = 45000;
const REFRESH_RATE_SLOW = 60000;

const intervals = {};
const config = {};

function loadCredentials () {
  return chromeStorage.load().then((settings) => {
    let {id, api} = settings;

    if (id && api) {
      habitica.setup(id, api);
      config.id = id;
      config.api = api;
    }
  });
}

function start () {
  return loadCredentials();
}

if (isBrowser()) {
  start();
}

module.exports = {
  loadCredentials,
  start,
};
