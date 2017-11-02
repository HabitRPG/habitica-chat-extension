'use strict';

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
    });

    it('appends chat box to dom if not already open', function () {
      let box = new ChatBox({id: 'id', name: 'guild'});

      expect(box.open).to.equal(false);
      box.toggle();

      expect(this.spies.removeChild).to.not.be.called;
      expect(this.spies.appendChild).to.be.calledOnce;
      expect(this.spies.appendChild).to.be.calledWith(box.element);
    });

    it('removes chat box to dom if already open', function () {
      let box = new ChatBox({id: 'id', name: 'guild'});

      box.open = true;

      box.toggle();

      expect(this.spies.appendChild).to.not.be.called;
      expect(this.spies.removeChild).to.be.calledOnce;
      expect(this.spies.removeChild).to.be.calledWith(box.element);
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
});
