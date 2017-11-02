'use strict';

const GroupListItem = require('../../../../src/js/pages/chat/components/group-list-item');

describe('GroupListItem', function () {
  describe('constructor', function () {
    it('constructs an element', function () {
      let item = new GroupListItem({name: 'guild'});

      expect(item.element.innerHTML).to.include('guild');
      expect(item.element.addEventListener).to.be.calledOnce;
      expect(item.element.addEventListener).to.be.calledWith('click');
    });

    it('sets a click listener to toggle chat box', function () {
      let item = new GroupListItem({name: 'guild'});
      let func = item.element.addEventListener.args[0][1];

      sandbox.stub(item, 'toggle');

      func();

      expect(item.toggle).to.be.calledOnce;
    });
  });

  describe('toggle', function () {
    it('calls toggle on chat box', function () {
      let item = new GroupListItem({name: 'guild'});

      sandbox.stub(item.chatBox, 'toggle');

      item.toggle();

      expect(item.chatBox.toggle).to.be.calledOnce;
    });

    it('applies open class to list item', function () {
      let item = new GroupListItem({name: 'guild'});

      sandbox.stub(item.chatBox, 'toggle');

      item.toggle();

      expect(item.element.classList.toggle).to.be.calledOnce;
      expect(item.element.classList.toggle).to.be.calledWith('open');
    });
  });
});
