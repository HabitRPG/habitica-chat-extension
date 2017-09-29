'use strict';

const Habitica = require('habitica');

let habitica = new Habitica({
  id: '',
  apiToken: '',
});

function setup (id, apiToken) {
  habitica.setOptions({
    id,
    apiToken,
  });

  return habitica;
}

function getMessages (groupId) {
  return habitica.get(`/groups/${groupId}/chat`);
}

module.exports = {
  setup,
  getMessages,
};
