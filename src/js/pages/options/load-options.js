'use strict';

const chromeStorage = require('../../lib/chrome-storage');

module.exports = function loadOptions () {
  return chromeStorage.load({
    uuid: '',
    api: '',
    accountVerified: false,
    profile: '',
  });
};
