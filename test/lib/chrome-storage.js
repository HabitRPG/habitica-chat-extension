'use strict';

const chromeStorage = require('../../src/js/lib/chrome-storage');

describe('Chrome Storage', function () {
  beforeEach(function () {
    global.chrome = {
      storage: {
        sync: {
          set: sandbox.stub().yields(),
          get: sandbox.stub().yields(),
        },
      },
    };
  });

  describe('save', function () {
    it('sets chrome storage', function () {
      return chromeStorage.save({
        foo: 'bar',
      }).then(function () {
        expect(global.chrome.storage.sync.set).to.be.calledOnce;
        expect(global.chrome.storage.sync.set).to.be.calledWith({
          foo: 'bar',
        });
      });
    });
  });

  describe('load', function () {
    it('gets chrome storage', function () {
      global.chrome.storage.sync.get.yields({
        foo: 'bar',
      });

      return chromeStorage.load({
        foo: '',
      }).then(function (result) {
        expect(global.chrome.storage.sync.get).to.be.calledOnce;
        expect(global.chrome.storage.sync.get).to.be.calledWith({
          foo: '',
        });
        expect(result.foo).to.equal('bar');
      });
    });
  });
});
