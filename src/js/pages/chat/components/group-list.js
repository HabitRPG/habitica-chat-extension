'use strict';

const habitica = require('../../../lib/habitica');
const GroupListItem = require('./group-list-item');

class GroupList {
  constructor () {
    this.element = this._constructElement();
  }

  initialize () {
    return this.getGroups().then((result) => {
      this.populateRegularRooms(result[0], result[1]);
      this.populateGuilds(result[2]);
    }).then(() => {
      global.document.body.appendChild(this.element);
    });
  }

  populateRegularRooms (tavern, party) {
    let rooms = this.element.shadowRoot.querySelector('#regular-chatrooms .rooms');

    rooms.appendChild((new GroupListItem(tavern)).element);
    rooms.appendChild((new GroupListItem(party)).element);
  }

  populateGuilds (guilds) {
    let rooms = this.element.shadowRoot.querySelector('#guilds .rooms');

    guilds.forEach((guild) => {
      let listItem = new GroupListItem(guild);

      rooms.appendChild(listItem.element);
    });
  }

  getGroups () {
    return Promise.all([
      habitica.getGroup('habitrpg'),
      habitica.getGroup('party'),
      habitica.getGuilds(),
    ]);
  }

  _constructElement () {
    const element = global.document.createElement('div');
    const shadow = element.attachShadow({mode: 'open'});

    element.id = 'habitica-chat-extension-container';

    shadow.innerHTML = `
      <style>
      * {
        box-sizing: border-box;
      }

      .container {
        position: fixed;
        right: 0;
        bottom: 0;
        z-index: 999999;
        max-height: 500px;
        max-width: 100%;
        overflow: scroll;
      }

      .bordered {
        position: relative;
        border: 5px solid #EDECEE;
        border-bottom: none;
        border-radius: 5px 5px 0 0;
        float: right;
        margin-left: 5px;
        margin-right: 5px;
        background: white;
        padding: 10px;
        overflow: scroll;
      }

      .bordered:last-child {
        margin-left: 0;
      }

      #group-list {
        height: 500px;
        width: 250px;
      }

      .chat-box {
        height: 400px;
        margin-top: 100px;
        width: 340px;
        background: #F9F9F9;
      }

    header {
      text-align: center;
    }

    ul {
      margin: 0;
      padding: 0;
    }

    li {
      margin: 2px 0;
      padding: 5px;
      list-style-type: none;
      cursor: pointer;
      border: 2px solid #EDECEE;
    }

    li.open {
      background: rgba(26, 24, 29, 0.06);
    }

    li:first-child {
      margin-top: 5px;
    }

    li:last-child {
      margin-bottom: 15px;
    }

    li:hover {
      background: rgba(26, 24, 29, 0.06);
    }
      </style>

      <div class="container">
      <div id="group-list" class="bordered">
      <div id="regular-chatrooms">
      <header>Regular Chatrooms</header>
      <ul class="rooms">
      </ul>
      </div>

      <div id="guilds">
      <header>Guilds</header>
      <ul class="rooms">
      </ul>
      </div>
      </div>
      </div>`;

    this.roomsNodes = shadow.querySelector('#guilds .rooms');

    return element;
  }
}

module.exports = GroupList;
