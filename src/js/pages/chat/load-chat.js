'use strict';

const GroupList = require('./components/group-list');

module.exports = function loadChat (settings) {
  if (!settings) {
    return; // chat can't set up
  }

  let groupList = new GroupList();

  return groupList.initialize().then(() => {
  });
};
