'use strict';

const $ = require('../../../lib/query-selector').$;

class ChatBox {
  constructor (group) {
    this.element = this._constructElement(group);
    this.open = false;
  }

  toggle () {
    let container = $('#habitica-chat-extension-container').shadowRoot.querySelector('.container');

    if (this.open) {
      container.removeChild(this.element);
      // stop syncing
    } else {
      container.appendChild(this.element);
      // start syncing
    }

    this.open = !this.open;
  }

  _constructElement (group) {
    const element = global.document.createElement('div');
    const shadow = element.attachShadow({mode: 'open'});

    const messageBoxHeight = '80px';

    element.setAttribute('data-group-id', group.id);
    element.className = 'bordered chat-box';
    shadow.innerHTML = `
<style>
* {
  box-sizing: border-box;
}

header {
  border-bottom: 2px solid #EDECEE;
  padding-bottom: 5px;
}

.message-box {
  margin-left: -10px;
  margin-right: -10px;
  height: ${messageBoxHeight};
  position: absolute;
  bottom: 0;
  width: 100%;
}

textarea {
  border: none;
  background-color: #EDECEE;
  width: 70%;
  position: absolute;
  left: 0;
  bottom: 0;
  height: ${messageBoxHeight};
  padding: 5px;
  font-size: 14px;
  line-height: 1.43;
}

textarea:focus {
  background-color: rgb(245, 245, 245);
}

.message-box button {
  width: 30%;
  margin: 0;
  padding: 0;
  border: none;
  background: #4F2A93;
  color: white;
  position: absolute;
  right: 0;
  bottom: 0;
  height: ${messageBoxHeight};
  font-size: 20px;
  font-weight: bold;
  border-radius: 0;
}

.chat {
  margin-bottom: ${messageBoxHeight};
  position: relative;
}

.loading {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  margin-top: 100px;
}

.loading.hidden {
  display: none;
}
</style>
<header>${group.name}</header>
<div class="chat">
  <div class="loading">Loading Chat...</div>
  <div class="messages"></div>
</div>
<div class="message-box">
  <textarea></textarea>
  <button>Send</button>
</div>`;

    // let textarea = shadow.querySelector('.message-box textarea');

    shadow.querySelector('.message-box button').addEventListener('click', () => {
      // send to habitica
    });

    return element;
  }
}

module.exports = ChatBox;
