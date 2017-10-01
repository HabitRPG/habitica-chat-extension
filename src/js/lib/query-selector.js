'use strict';

function querySelector (selector) {
  return global.document.querySelector(selector);
}

function querySelectorAll (selector) {
  let nodeList = global.document.querySelectorAll(selector);

  // convert to an Array
  return Array.prototype.slice.call(nodeList);
}

module.exports = {
  $: querySelector,
  $$: querySelectorAll,
};
