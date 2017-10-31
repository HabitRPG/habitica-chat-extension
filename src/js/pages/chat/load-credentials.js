'use strict';

const habitica = require('../../lib/habitica');
const chromeStorage = require('../../lib/chrome-storage');

module.exports = function loadCredentials () {
  return chromeStorage.load().then((settings) => {
    let {uuid, api, accountVerified} = settings;

    if (uuid && api && accountVerified) {
      habitica.setup(uuid, api);
      return settings;
    }
  });
};
