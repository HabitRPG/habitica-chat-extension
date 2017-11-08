'use strict';

const $ = require('../../../lib/query-selector').$;
const avatar = require('../../../lib/avatar');
const habitica = require('../../../lib/habitica');
const userObject = require('../../../lib/user-object');
const sleep = require('../../../lib/sleep');
const habiticaMarkdown = require('habitica-markdown');

const DEFAULT_CHAT_INTERVAL = 5000;

class ChatBox {
  constructor (group) {
    this.element = this._constructElement(group);
    this.groupId = group.id;
    this.open = false;

    this.chatInterval = DEFAULT_CHAT_INTERVAL;
  }

  $ (selector) {
    return this.element.shadowRoot.querySelector(selector);
  }

  toggle () {
    let container = $('#habitica-chat-extension-container').shadowRoot.querySelector('.container');

    if (this.open) {
      container.removeChild(this.element);
      this.stopSyncing();
    } else {
      container.appendChild(this.element);
      this.startSyncing(true);
    }

    this.open = !this.open;
  }

  sync () {
    return habitica.getChat(this.groupId)
      .then((chat) => this.processChat(chat));
  }

  addAvatar (userId, avatarNode) {
    return userObject.get(userId).then((user) => {
      if (user.failed) {
        return;
      }

      avatarNode.appendChild(avatar.render(user.userObject));
    });
  }

  getContributorClass () {
    return '';
  }

  processChat (chat) {
    let mostRecentMessageId = chat[0].id;

    chat.reverse();

    if (mostRecentMessageId === this.mostRecentMessageId) {
      return;
    }

    let messagesContainer = this.$('.messages');

    this.mostRecentMessageId = mostRecentMessageId;
    messagesContainer.innerHTML = '';

    chat.forEach((message) => {
      let div = global.document.createElement('div');
      let messageContainer = global.document.createElement('div');
      let avatarContainer = global.document.createElement('div');
      let avatarNode = global.document.createElement('div');

      avatarContainer.appendChild(avatarNode);
      avatarNode.classList.add('avatar');
      this.addAvatar(message.uuid, avatarNode);

      div.classList.add('message');

      avatarContainer.classList.add('avatar-container');
      messageContainer.classList.add('message-container');
      messageContainer.innerHTML = `
      <div class="name contributor-${this.getContributorClass(message)}">${message.user}</div>
      <div class="text">
        ${habiticaMarkdown.render(message.text)}
      </div>`;
      div.appendChild(avatarContainer);
      div.appendChild(messageContainer);

      messagesContainer.appendChild(div);
    });

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  async startSyncing (isInitialSync) {
    if (isInitialSync) {
      this.pollForChat = true;
    }

    if (!this.pollForChat) {
      return;
    }

    await this.sync();

    if (isInitialSync) {
      this.$('.loading').classList.add('hidden');
    }

    await this._sleep(this.chatInterval);

    await this.startSyncing();
  }

  stopSyncing () {
    this.pollForChat = false;
  }

  _sleep (value) {
    return sleep(value);
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
  margin-bottom: 5px;
  text-overflow: ellipsis;
  height: 30px;
  white-space: nowrap;
  overflow: hidden;
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

.messages {
  height: 270px;
  overflow: scroll;
}

.message {
  margin: 5px auto;
  position: relative;
  min-height: 75px;
}

.message:after {
  content: "";
  clear: both;
  display: table;
}

.message .avatar-container {
  position: absolute;
  border: 2px solid rgba(0, 0, 0, 0.125);
  border-radius: 100%;
  width: 70px;
  height: 70px;
  overflow: hidden;
  -webkit-mask-image: -webkit-radial-gradient(circle, white, black);
}

.message .avatar-container .avatar {
  position: relative;
  left: -47px;
  top: -35px;
}

.message .message-container {
  float: right;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  width: 75%;
  padding: 0 10px;
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

    let textarea = shadow.querySelector('.message-box textarea');

    shadow.querySelector('.message-box button').addEventListener('click', this.makeClickHandler(textarea));

    return element;
  }

  makeClickHandler (textarea) {
    return () => {
      let message = textarea.value;

      if (!message) {
        return;
      }

      textarea.setAttribute('disabled', true);

      return habitica.sendMessage(this.groupId, message)
        .then(() => {
          textarea.value = '';
        })
        .then(() => {
          return this.sync();
        })
        .catch(() => {
          // handle error
        }).then(() => {
          textarea.removeAttribute('disabled');
        });
    };
  }
}

module.exports = ChatBox;
