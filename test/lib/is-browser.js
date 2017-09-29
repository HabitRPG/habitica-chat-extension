'use strict';

const isBrowser = require('../../src/js/lib/is-browser');

describe('isBrowser', function () {
  it('returns true if document and body exist', function () {
    global.document.body = {};

    expect(isBrowser()).to.equal(true);
  });

  it('returns true if document and body exist', function () {
    delete global.document.body;

    expect(isBrowser()).to.equal(false);
  });
});
