'use strict';

function hide (element) {
  element.classList.add('d-none');
}

function show (element) {
  element.classList.remove('d-none');
}

function toggle (element) {
  element.classList.toggle('d-none');
}

module.exports = {
  hide,
  show,
  toggle,
};
