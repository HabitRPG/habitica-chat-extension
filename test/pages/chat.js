'use strict';

const chromeStorage = require('../../src/js/lib/chrome-storage');
const chat = require('../../src/js/pages/chat');
const habitica = require('../../src/js/lib/habitica');

describe('chat page', function () {
  describe('loadCredentials', function () {
    beforeEach(function () {
      sandbox.stub(chromeStorage, 'load').resolves({});
      sandbox.stub(habitica, 'setup');
    });

    it('fetches chrome storage', function () {
      return chat.loadCredentials().then(() => {
        expect(chromeStorage.load).to.be.calledOnce;
      });
    });

    it('does not set up habitica element if user id does not exist', function () {
      chromeStorage.load.resolves({
        api: 'api-token',
      });

      return chat.loadCredentials().then(() => {
        expect(habitica.setup).to.not.be.called;
      });
    });

    it('does not set up habitica element if api token does not exist', function () {
      chromeStorage.load.resolves({
        id: 'user-id',
      });

      return chat.loadCredentials().then(() => {
        expect(habitica.setup).to.not.be.called;
      });
    });

    it('sets up habitica element if user id and api token exist', function () {
      chromeStorage.load.resolves({
        id: 'user-id',
        api: 'api-token',
      });

      return chat.loadCredentials().then(() => {
        expect(habitica.setup).to.be.calledOnce;
        expect(habitica.setup).to.be.calledWith('user-id', 'api-token');
      });
    });
  });

  describe('start', function () {
    it('calls loadCredentials', function () {
      sandbox.stub(chat, 'loadCredentials');

      return chat.start().then(() => {
        expect(chat.loadCredentials).to.be.calledOnce;
      });
    });
  });
});
