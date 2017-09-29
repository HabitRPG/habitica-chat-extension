'use strict';

const $ = require('../../src/js/lib/query-selector');

describe('querySelector', function () {
  it('calls document.querySelector', function () {
    $('#foo');

    expect(global.document.querySelector).to.be.calledOnce;
    expect(global.document.querySelector).to.be.calledWith('#foo');
  });
});
