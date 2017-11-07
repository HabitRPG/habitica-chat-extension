'use strict';

const habiticaAvatar = require('habitica-avatar');

module.exports = {
  render: function render (user) {
    return habiticaAvatar({
      forceImageMode: true,
      ignore: {
        background: true,
        pet: true,
        mount: true,
        sleep: true,
      },
      user,
    });
  },
};
