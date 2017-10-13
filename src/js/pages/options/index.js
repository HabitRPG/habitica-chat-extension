'use strict';

const isBrowser = require('../../lib/is-browser');

const loadOptions = require('./load-options');
const hideLoadingIndicator = require('./hide-loading-indicator');
const setupHabitica = require('./setup-habitica');
const fillInUserDetails = require('./fill-in-user-details');

function start () {
  return loadOptions()
    .then(setupHabitica)
    .then(fillInUserDetails)
    .then(hideLoadingIndicator);
}

if (isBrowser()) {
  start();
}

module.exports = {
  start,
};
