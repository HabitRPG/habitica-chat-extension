'use strict';

const $ = require('../../lib/query-selector').$;
const visibility = require('../../lib/visibility');

module.exports = function hideLoadingIndicator () {
  let loading = $('#loading-spinner');

  visibility.hide(loading);
};
