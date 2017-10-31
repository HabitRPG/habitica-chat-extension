'use strict';

const chromeStorage = require('../../../src/js/lib/chrome-storage');
const loadCredentials = require('../../../src/js/pages/chat/load-credentials');
const habitica = require('../../../src/js/lib/habitica');

describe('loadCredentials', function () {
  beforeEach(function () {
    sandbox.stub(chromeStorage, 'load').resolves({});
    sandbox.stub(habitica, 'setup');
  });

  it('fetches chrome storage', function () {
    return loadCredentials().then(() => {
      expect(chromeStorage.load).to.be.calledOnce;
    });
  });

  it('does not set up habitica element if user id does not exist', function () {
    chromeStorage.load.resolves({
      api: 'api-token',
      accountVerified: true,
    });

    return loadCredentials().then(() => {
      expect(habitica.setup).to.not.be.called;
    });
  });

  it('does not set up habitica element if api token does not exist', function () {
    chromeStorage.load.resolves({
      uuid: 'user-id',
      accountVerified: true,
    });

    return loadCredentials().then(() => {
      expect(habitica.setup).to.not.be.called;
    });
  });

  it('does not set up habitica element if accountVerified property is not true', function () {
    chromeStorage.load.resolves({
      uuid: 'user-id',
      api: 'api-token',
      accountVerified: false,
    });

    return loadCredentials().then(() => {
      expect(habitica.setup).to.not.be.called;
    });
  });

  it('sets up habitica element if user id and api token exist', function () {
    chromeStorage.load.resolves({
      uuid: 'user-id',
      api: 'api-token',
      accountVerified: true,
    });

    return loadCredentials().then(() => {
      expect(habitica.setup).to.be.calledOnce;
      expect(habitica.setup).to.be.calledWith('user-id', 'api-token');
    });
  });
});
