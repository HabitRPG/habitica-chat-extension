'use strict';

// const $ = require('../lib/query-selector').$;
const isBrowser = require('../../lib/is-browser');
// const habiticaMarkdown = require('habitica-markdown');

const loadCredentials = require('./load-credentials');
const lookForApiKeys = require('./look-for-api-keys');
const loadChat = require('./load-chat');

// const REFRESH_RATE_FAST = 5000;
// const REFRESH_RATE_MEDIUM = 45000;
// const REFRESH_RATE_SLOW = 60000;

// const intervals = {};

function start () {
  return lookForApiKeys(0)
    .then(loadCredentials)
    .then(loadChat);
}

if (isBrowser()) {
  start();
}

module.exports = {
  start,
};
