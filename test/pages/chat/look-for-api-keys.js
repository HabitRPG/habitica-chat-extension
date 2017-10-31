'use strict';

const chromeStorage = require('../../../src/js/lib/chrome-storage');
const lookForApiKeys = require('../../../src/js/pages/chat/look-for-api-keys');

describe('lookForApiKeys', function () {
  beforeEach(function () {
    this.clock = sandbox.useFakeTimers();
    this.fakeKeyNodes = [{
      innerText: 'user-id',
    }, {
      innerText: 'api-token',
    }];

    sandbox.stub(chromeStorage, 'save').resolves({});
    global.location.pathname = '/user/settings/api';
    global.document.querySelectorAll.withArgs('pre.prettyprint').returns(this.fakeKeyNodes);
  });

  it('does not call chrome storage if not on settings page', function () {
    global.location.pathname = '/';

    lookForApiKeys(0);

    this.clock.tick(200000);

    expect(chromeStorage.save).to.not.be.called;
  });

  it('does not call chrome storage if on settings page but no dom nodes exist', function () {
    global.document.querySelectorAll.withArgs('pre.prettyprint').returns([]);

    lookForApiKeys(0);

    this.clock.tick(200000);

    expect(chromeStorage.save).to.not.be.called;
  });

  it('does not call chrome storage if on settings page and there are more dom nodes than expected', function () {
    global.document.querySelectorAll.withArgs('pre.prettyprint').returns([{}, {}, {}]);

    lookForApiKeys(0);

    this.clock.tick(200000);

    expect(chromeStorage.save).to.not.be.called;
  });

  it('does not call chrome storage if retreid more than twice', function () {
    lookForApiKeys(3);

    this.clock.tick(200000);

    expect(chromeStorage.save).to.not.be.called;
  });

  it('calls chrome storage after 2 seconds if on settings page and dom nodes exist', function () {
    lookForApiKeys(0);

    this.clock.tick(1999);
    expect(chromeStorage.save).to.not.be.called;

    this.clock.tick(2);
    expect(chromeStorage.save).to.be.calledOnce;
  });
});
