'use strict';
/* eslint-disable no-shadow */

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

global.sandbox = sinon.sandbox.create();
global.expect = chai.expect;

beforeEach(function () {
  global.fakeDomNode = {
    classList: {
      add: sandbox.stub(),
      remove: sandbox.stub(),
    },
  };
  global.document = {
    addEventListener: sandbox.stub(),
    querySelector: sandbox.stub().returns(global.fakeDomNode),
    querySelectorAll: sandbox.stub().returns([]),
  };
  global.location = {
    pathname: '/',
  };
});

afterEach(function () {
  global.sandbox.restore();
});
