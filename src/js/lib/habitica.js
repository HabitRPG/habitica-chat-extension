'use strict';

const Habitica = require('habitica');
const chromeStorage = require('./chrome-storage');

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

function logout () {
  habitica.setOptions({
    id: '',
    apiToken: '',
  });

  chromeStorage.save({
    uuid: '',
    api: '',
    accountVerified: false,
    profile: {},
  });

  return habitica;
}

function getUser () {
  return habitica.get('/user').then(result => result.data);
}

function getGuilds () {
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
  logout,
  getChat,
  getGuilds,
  getGroup,
  getUser,
  sendMessage,
};
