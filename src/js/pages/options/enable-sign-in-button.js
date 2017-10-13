'use strict';

const $ = require('../../lib/query-selector').$;
const visibility = require('../../lib/visibility');

module.exports = function enableSignInButton () {
  let signIn = $('#setup-button');

  visibility.show(signIn);
};
