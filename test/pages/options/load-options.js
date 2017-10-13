'use strict';

const loadOptions = require('../../../src/js/pages/options/load-options');
const chromeStorage = require('../../../src/js/lib/chrome-storage');

describe('loadOptions', function () {
  beforeEach(function () {
    sandbox.stub(chromeStorage, 'load').resolves({
      uuid: 'foo',
      api: 'bar',
      accountVerified: true,
      profile: {},
    });
  });

  it('loads options from chome storage', function () {
    return loadOptions().then((options) => {
      expect(chromeStorage.load).to.be.calledOnce;
      expect(chromeStorage.load).to.be.calledWith({
        uuid: '',
        api: '',
        accountVerified: false,
        profile: '',
      });

      expect(options).to.deep.equal({
        uuid: 'foo',
        api: 'bar',
        accountVerified: true,
        profile: {},
      });
    });
  });
});
