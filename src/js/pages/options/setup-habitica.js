'use strict';

const chromeStorage = require('../../lib/chrome-storage');
const habitica = require('../../lib/habitica');

const enableSignInButton = require('./enable-sign-in-button');

module.exports = function setupHabitica (options) {
  if (!options.uuid || !options.api) {
    enableSignInButton();
    return;
  }

  habitica.setup(options.uuid, options.api);

  if (options.accountVerified) {
    return Promise.resolve(options.profile);
  }

  return habitica.getUser().then((user) => {
    chromeStorage.save({
      profile: user.profile,
      accountVerified: true,
    });

    return user.profile;
  }).catch(() => {
    // TODO - display error message about user
    enableSignInButton();
  });
};
