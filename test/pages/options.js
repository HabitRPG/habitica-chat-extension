'use strict';

const chromeStorage = require('../../src/js/lib/chrome-storage');
const options = require('../../src/js/pages/options');

describe('options page', function () {
  beforeEach(function () {
    this.fakeUUIDInput = {
      addEventListener: sandbox.stub(),
      value: '',
    };
    this.fakeAPIInput = {
      addEventListener: sandbox.stub(),
      value: '',
    };
    this.fakeStatus = {
      style: {
        opacity: 0,
      },
    };

    global.document.querySelector.withArgs('#uuid').returns(this.fakeUUIDInput);
    global.document.querySelector.withArgs('#api').returns(this.fakeAPIInput);
    global.document.querySelector.withArgs('#status').returns(this.fakeStatus);
  });

  describe('start', function () {
    it('sets up dom listeners', function () {
      options.start();

      expect(global.document.addEventListener).to.be.calledWith('DOMContentLoaded', options.restoreOptions);
      expect(this.fakeUUIDInput.addEventListener).to.be.calledWith('paste', sandbox.match.func);
      expect(this.fakeAPIInput.addEventListener).to.be.calledWith('paste', sandbox.match.func);
    });
  });

  describe('saveOptions', function () {
    it('saves uuid and api key', function () {
      sandbox.stub(chromeStorage, 'save').resolves();

      this.fakeUUIDInput.value = 'user-uuid';
      this.fakeAPIInput.value = 'user-api-token';

      return options.saveOptions().then(() => {
        expect(chromeStorage.save).to.be.calledWith({
          uuid: 'user-uuid',
          api: 'user-api-token',
        });
      });
    });

    it('shows and then hides status', function () {
      sandbox.stub(chromeStorage, 'save').resolves();
      sandbox.useFakeTimers();

      return options.saveOptions().then(() => {
        expect(this.fakeStatus.style.opacity).to.equal(1);

        sandbox.clock.tick(760);

        expect(this.fakeStatus.style.opacity).to.equal(0);
      });
    });
  });

  describe('restoreOptions', function () {
    it('populates uuid and api key', function () {
      sandbox.stub(chromeStorage, 'load').resolves({
        uuid: 'user-uuid',
        api: 'user-api-token',
      });

      global.document.querySelector.withArgs('#uuid').returns(this.fakeUUIDInput);
      global.document.querySelector.withArgs('#api').returns(this.fakeAPIInput);

      return options.restoreOptions().then(() => {
        expect(chromeStorage.load).to.be.calledWith({
          uuid: '',
          api: '',
        });

        expect(this.fakeUUIDInput.value).to.equal('user-uuid');
        expect(this.fakeAPIInput.value).to.equal('user-api-token');
      });
    });
  });
});
