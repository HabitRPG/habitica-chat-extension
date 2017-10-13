'use strict';

const $ = require('../../lib/query-selector').$;
const habitica = require('../../lib/habitica');
const visibility = require('../../lib/visibility');

const enableSignInButton = require('./enable-sign-in-button');

module.exports = function fillInUserDetails (profile) {
  let userDetails = $('#user-details');

  if (!profile) {
    return;
  }

  visibility.show(userDetails);

  $('#user-name').textContent = profile.name;

  userDetails.querySelector('button').addEventListener('click', () => {
    habitica.logout();
    visibility.hide(userDetails);
    enableSignInButton();
  });
};
