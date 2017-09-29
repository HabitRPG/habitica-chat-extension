'use strict';
/* eslint-disable no-shadow */

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

global.sandbox = sinon.sandbox.create();
global.expect = chai.expect;

beforeEach(function () {
  global.document = {
    addEventListener: sandbox.stub(),
    querySelector: sandbox.stub(),
  };
});

afterEach(function () {
  global.sandbox.restore();
});
