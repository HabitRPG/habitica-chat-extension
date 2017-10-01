'use strict';

const $ = require('../../src/js/lib/query-selector').$;
const $$ = require('../../src/js/lib/query-selector').$$;

describe('querySelector', function () {
  describe('$', function () {
    it('calls document.querySelector', function () {
      $('#foo');

      expect(global.document.querySelector).to.be.calledOnce;
      expect(global.document.querySelector).to.be.calledWith('#foo');
    });
  });

  describe('$$', function () {
    it('calls document.querySelectorAll', function () {
      $$('#foo');

      expect(global.document.querySelectorAll).to.be.calledOnce;
      expect(global.document.querySelectorAll).to.be.calledWith('#foo');
    });

    it('converts Node List into an array', function () {
      sandbox.spy(Array.prototype, 'slice');

      $$('#foo');

      expect(Array.prototype.slice).to.be.calledOnce;
    });
  });
});
