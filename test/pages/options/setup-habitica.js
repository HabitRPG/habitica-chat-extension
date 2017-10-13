'use strict';

const setupHabitica = require('../../../src/js/pages/options/setup-habitica');
const chromeStorage = require('../../../src/js/lib/chrome-storage');
const habitica = require('../../../src/js/lib/habitica');

describe('setupHabitica', function () {
  beforeEach(function () {
    this.profile = {name: 'Foo'};

    sandbox.stub(chromeStorage, 'save');
    sandbox.stub(habitica, 'setup');
    sandbox.stub(habitica, 'getUser').resolves({
      profile: this.profile,
    });
  });

  it('returns early if no uuid', function () {
    setupHabitica({
      api: 'api',
    });

    expect(habitica.setup).to.not.be.called;
  });

  it('returns early if no api token', function () {
    setupHabitica({
      uuid: 'id',
    });

    expect(habitica.setup).to.not.be.called;
  });

  it('sets up habitica if uuid and api token are provided', function () {
    setupHabitica({
      uuid: 'id',
      api: 'api',
    });

    expect(habitica.setup).to.be.calledOnce;
    expect(habitica.setup).to.be.calledWith('id', 'api');
  });

  it('sets up habitica if uuid and api token are provided', function () {
    setupHabitica({
      uuid: 'id',
      api: 'api',
    });

    expect(habitica.setup).to.be.calledOnce;
    expect(habitica.setup).to.be.calledWith('id', 'api');
  });

  it('returns saved profile if account is verified', function () {
    let savedProfile = {};

    return setupHabitica({
      uuid: 'id',
      api: 'api',
      profile: savedProfile,
      accountVerified: true,
    }).then((profile) => {
      expect(habitica.getUser).to.not.be.called;
      expect(profile).to.equal(savedProfile);
    });
  });

  it('looks up profile if account is not verified', function () {
    let savedProfile = {};

    return setupHabitica({
      uuid: 'id',
      api: 'api',
      profile: savedProfile,
      accountVerified: false,
    }).then((profile) => {
      expect(habitica.getUser).to.be.calledOnce;
      expect(profile).to.equal(this.profile);
    });
  });

  it('saves profile in chrome storage', function () {
    let savedProfile = {};

    return setupHabitica({
      uuid: 'id',
      api: 'api',
      profile: savedProfile,
      accountVerified: false,
    }).then(() => {
      expect(chromeStorage.save).to.be.calledOnce;
      expect(chromeStorage.save).to.be.calledWith({
        profile: this.profile,
        accountVerified: true,
      });
    });
  });
});
