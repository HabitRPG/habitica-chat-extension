'use strict';

const habitica = require('./habitica');

const cachedUserObjects = {};

function getUserObject (userId) {
  let cachedUser = cachedUserObjects[userId];

  if (!cachedUser) {
    cachedUserObjects[userId] = {
      concurrentRequestsToResolve: [],
    };

    return habitica.getMember(userId).then((member) => {
      cachedUserObjects[userId].userObject = member;
    }).catch(() => {
      cachedUserObjects[userId].failed = true;
    }).then(() => {
      cachedUserObjects[userId].concurrentRequestsToResolve.forEach((resolve) => {
        resolve(cachedUserObjects[userId]);
      });

      return cachedUserObjects[userId];
    });
  }

  if (cachedUser.userObject || cachedUser.failed) {
    // if the cache exists, or the request
    // failed in an earlier try, just pass back what
    // we already have
    return Promise.resolve(cachedUser);
  }

  if (!cachedUser.userObject) {
    return new Promise((resolve) => {
      cachedUser.concurrentRequestsToResolve.push(resolve);
    });
  }

  // should never get here
}

function clearCache () {
  for (let id in cachedUserObjects) {
    delete cachedUserObjects[id];
  }
}

module.exports = {
  get: getUserObject,
  clearCache,
};
