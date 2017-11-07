'use strict';

const habitica = require('../../../../src/js/lib/habitica');
const userObject = require('../../../../src/js/lib/user-object');
const avatar = require('../../../../src/js/lib/avatar');
const ChatBox = require('../../../../src/js/pages/chat/components/chat-box');

describe('ChatBox', function () {
  describe('constructor', function () {
    it('constructs an element', function () {
      let box = new ChatBox({id: 'id', name: 'guild'});

      expect(box.element.shadowRoot.innerHTML).to.include('<header>guild</header>');
      expect(box.element.shadowRoot.innerHTML).to.include('textarea');

      expect(box.element.setAttribute).to.be.calledWith('data-group-id', 'id');
    });

    it('defauls open to false', function () {
      let box = new ChatBox({id: 'id', name: 'guild'});

      expect(box.open).to.equal(false);
    });

    it('saves group id', function () {
      let box = new ChatBox({id: 'id', name: 'guild'});

      expect(box.groupId).to.equal('id');
    });
  });

  describe('toggle', function () {
    beforeEach(function () {
      let container = global.makeFakeDomNode();

      this.spies = {
        appendChild: sandbox.stub(),
        removeChild: sandbox.stub(),
      };

      container.shadowRoot.querySelector.returns(this.spies);
      global.document.querySelector.returns(container);

      sandbox.stub(ChatBox.prototype, 'startSyncing');
      sandbox.stub(ChatBox.prototype, 'stopSyncing');
    });

    it('appends chat box to dom if not already open', function () {
      let box = new ChatBox({id: 'id', name: 'guild'});

      expect(box.open).to.equal(false);
      box.toggle();

      expect(this.spies.removeChild).to.not.be.called;
      expect(this.spies.appendChild).to.be.calledOnce;
      expect(this.spies.appendChild).to.be.calledWith(box.element);
    });

    it('starts syncing if chat box is not already open', function () {
      let box = new ChatBox({id: 'id', name: 'guild'});

      expect(box.open).to.equal(false);
      box.toggle();

      expect(box.stopSyncing).to.not.be.called;
      expect(box.startSyncing).to.be.calledOnce;
    });

    it('removes chat box to dom if already open', function () {
      let box = new ChatBox({id: 'id', name: 'guild'});

      box.open = true;

      box.toggle();

      expect(this.spies.appendChild).to.not.be.called;
      expect(this.spies.removeChild).to.be.calledOnce;
      expect(this.spies.removeChild).to.be.calledWith(box.element);
    });

    it('stops syncing if chat box is already open', function () {
      let box = new ChatBox({id: 'id', name: 'guild'});

      box.open = true;

      box.toggle();

      expect(box.startSyncing).to.not.be.called;
      expect(box.stopSyncing).to.be.calledOnce;
    });

    it('toggles open property', function () {
      let box = new ChatBox({id: 'id', name: 'guild'});

      expect(box.open).to.equal(false);
      box.toggle();
      expect(box.open).to.equal(true);
      box.toggle();
      expect(box.open).to.equal(false);
    });
  });

  describe('sync', function () {
    beforeEach(function () {
      sandbox.stub(habitica, 'getChat').resolves();
      sandbox.stub(ChatBox.prototype, 'processChat').resolves();
    });

    it('calls out to habitica to get chat for group id', function () {
      let box = new ChatBox({id: 'id', name: 'guild'});

      return box.sync().then(() => {
        expect(habitica.getChat).to.be.calledOnce;
        expect(habitica.getChat).to.be.calledWith('id');
      });
    });

    it('calls out to habitica to get chat for group id', function () {
      let box = new ChatBox({id: 'id', name: 'guild'});
      let chat = [];

      habitica.getChat.resolves(chat);

      return box.sync().then(() => {
        expect(box.processChat).to.be.calledOnce;
        expect(box.processChat).to.be.calledWith(chat);
      });
    });
  });

  describe('processChat', function () {
    beforeEach(function () {
      this.chat = [{
        id: '1',
        text: 'Message 1',
      }, {
        id: '2',
        text: 'Message 2',
      }, {
        id: '3',
        text: 'Message 3',
      }];
    });

    it('skips processing if mostRecentMessageId matches', function () {
      let box = new ChatBox({id: 'id', name: 'guild'});

      sandbox.stub(box, '$');
      box.mostRecentMessageId = '1';

      box.processChat(this.chat);

      expect(box.$).to.not.be.called;
    });

    it('sets most recent message id', function () {
      let box = new ChatBox({id: 'id', name: 'guild'});

      box.mostRecentMessageId = '2';

      box.processChat(this.chat);

      expect(box.mostRecentMessageId).to.equal('1');
    });

    it('resets messages container with chat messages', function () {
      let box = new ChatBox({id: 'id', name: 'guild'});
      let messagesContainer = global.makeFakeDomNode();

      messagesContainer.innerHTML = 'something';
      sandbox.stub(box, '$').returns(messagesContainer);

      box.processChat(this.chat);

      expect(messagesContainer.innerHTML).to.equal('');
      expect(messagesContainer.appendChild).to.be.calledThrice;
    });

    it('renders messages as markdown', function () {
      let box = new ChatBox({id: 'id', name: 'guild'});
      let messagesContainer = global.makeFakeDomNode();
      let messageNode = global.makeFakeDomNode();

      sandbox.stub(box, '$').returns(messagesContainer);
      global.document.createElement.returns(messageNode);

      box.processChat([{
        id: '123',
        text: '# heading',
      }]);

      expect(messageNode.innerHTML).to.contain('<h1>heading</h1>');
      expect(messagesContainer.appendChild).to.be.calledWith(messageNode);
    });

    it('sets scrollTop value of messages container', function () {
      let box = new ChatBox({id: 'id', name: 'guild'});
      let messagesContainer = global.makeFakeDomNode();

      messagesContainer.scrollHeight = '123px';
      sandbox.stub(box, '$').returns(messagesContainer);

      box.processChat(this.chat);

      expect(messagesContainer.scrollTop).to.equal('123px');
    });
  });

  describe('startSyncing', function () {
    beforeEach(function () {
      this.box = new ChatBox({id: 'id', name: 'guild'});

      sandbox.stub(this.box, 'sync').resolves();
      sandbox.stub(this.box, '_sleep').resolves();
    });

    it('sets poll for chat to true if it is initial sync', function () {
      this.box.pollForChat = false;

      this.box.startSyncing(true);

      expect(this.box.pollForChat).to.equal(true);

      this.box.stopSyncing();
    });

    it('does not sync if set not to poll', function () {
      this.box.pollForChat = false;

      this.box.startSyncing();

      expect(this.box.pollForChat).to.equal(false);
      expect(this.box.sync).to.not.be.called;
    });

    it('syncs', function () {
      this.box.pollForChat = true;
      this.box.startSyncing();

      expect(this.box.sync).to.be.calledOnce;

      this.box.stopSyncing();
    });
  });

  describe('stopSyncing', function () {
    it('sets pollForChat to false', function () {
      let box = new ChatBox({id: 'id', name: 'guild'});

      box.pollForChat = true;

      box.stopSyncing();

      expect(box.pollForChat).to.equal(false);
    });
  });

  describe('addAvatar', function () {
    beforeEach(function () {
      this.user = {};
      this.node = global.makeFakeDomNode();

      sandbox.stub(userObject, 'get').resolves({
        userObject: this.user,
      });

      sandbox.stub(avatar, 'render').returns(global.makeFakeDomNode());
    });

    it('returns early if user object has failed', function () {
      let box = new ChatBox({id: 'id', name: 'guild'});

      userObject.get.resolves({
        failed: true,
      });

      return box.addAvatar('userId', this.node).then(() => {
        expect(avatar.render).to.not.be.called;
        expect(this.node.appendChild).to.not.be.called;
      });
    });

    it('appends user object', function () {
      let box = new ChatBox({id: 'id', name: 'guild'});
      let avatarNode = global.makeFakeDomNode();

      avatar.render.returns(avatarNode);

      return box.addAvatar('userId', this.node).then(() => {
        expect(avatar.render).to.be.calledOnce;
        expect(avatar.render).to.be.calledWith(this.user);
        expect(this.node.appendChild).to.be.calledOnce;
        expect(this.node.appendChild).to.be.calledWith(avatarNode);
      });
    });
  });

  describe('sending messages to habitica', function () {
    beforeEach(function () {
      this.box = new ChatBox({id: 'id', name: 'guild'});
      this.textarea = global.makeFakeDomNode();
      this.handler = this.box.makeClickHandler(this.textarea);
      sandbox.stub(habitica, 'sendMessage').resolves();
      sandbox.stub(this.box, 'sync').resolves();
    });

    it('sends message to habitica with value from textarea', function () {
      this.textarea.value = 'my message';

      this.handler();

      expect(habitica.sendMessage).to.be.calledOnce;
      expect(habitica.sendMessage).to.be.calledWith('id', 'my message');
    });

    it('does not send message if textarea is blank', function () {
      this.textarea.value = '';

      this.handler();

      expect(habitica.sendMessage).to.not.be.called;
    });

    it('syncs after sending message', function () {
      this.textarea.value = 'my message';

      return this.handler().then(() => {
        expect(this.box.sync).to.be.calledOnce;
      });
    });

    it('disables textarea while sending', function () {
      this.textarea.value = 'my message';

      return this.handler().then(() => {
        expect(this.textarea.setAttribute).to.be.calledWith('disabled', true);
        expect(this.textarea.removeAttribute).to.be.calledWith('disabled');
      });
    });

    it('sets value to an empty string on success', function () {
      this.textarea.value = 'my message';

      return this.handler().then(() => {
        expect(this.textarea.value).to.equal('');
      });
    });

    it('does not force sync if habitica message failed', function () {
      this.textarea.value = 'my message';
      habitica.sendMessage.rejects(new Error('foo'));

      return this.handler().then(() => {
        expect(this.box.sync).to.not.be.called;
      });
    });
  });
});
