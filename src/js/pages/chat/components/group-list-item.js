'use strict';

const ChatBox = require('./chat-box');

class GroupListItem {
  constructor (config) {
    this.element = this._constructElement(config);
    this.chatBox = new ChatBox(config);
  }

  toggle () {
    this.chatBox.toggle();
    this.element.classList.toggle('open');
  }

  _constructElement (config) {
    const element = global.document.createElement('li');

    element.innerHTML = `${config.name}`;
    element.addEventListener('click', () => {
      this.toggle();
    });

    return element;
  }
}

module.exports = GroupListItem;
