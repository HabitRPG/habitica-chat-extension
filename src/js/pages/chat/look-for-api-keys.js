'use strict';

const $$ = require('../../lib/query-selector').$$;
const chromeStorage = require('../../lib/chrome-storage');

module.exports = function lookForApiKeys (retryCount) {
  const TWO_SECONDS = 2000;
  const keys = $$('pre.prettyprint');

  if (global.location.pathname !== '/user/settings/api') {
    return Promise.resolve();
  }

  if (keys.length > 2) {
    // TODO display error
    return Promise.resolve();
  }

  if (retryCount > 2) {
    // TODO display error
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    // We put this in a set timeout
    // to give the page time to load
    setTimeout(() => {
      if (!keys[0]) {
        retryCount++;
        return lookForApiKeys(retryCount).then(resolve);
      }

      chromeStorage.save({
        uuid: keys[0].innerText,
        api: keys[1].innerText,
      }).then(() => {
        // TODO
        // start chat setup
        resolve();
      });
    }, TWO_SECONDS);
  });
};

