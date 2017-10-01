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

function getGroups () {
  return habitica.get('/groups?type=guilds').then(result => result.data);
}

function getGroup (groupId) {
  return habitica.get(`/groups/${groupId}`).then(result => result.data);
}

function getChat (groupId) {
  return habitica.get(`/groups/${groupId}/chat`).then(result => result.data);
}

function sendMessage (groupId, message) {
  return habitica.post(`/groups/${groupId}/chat`, {
    message,
  }).then(result => result.data);
}

module.exports = {
  setup,
  getChat,
  getGroups,
  getGroup,
  sendMessage,
};
