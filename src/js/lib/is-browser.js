'use strict';

module.exports = function isBrowser () {
  return Boolean(global.document && global.document.body);
};
