'use strict';

module.exports = function sleep (value) {
  return new Promise((resolve) => {
    setTimeout(resolve, value);
  });
};
