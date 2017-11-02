'use strict';
/* eslint-disable no-shadow */

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

global.sandbox = sinon.sandbox.create();
global.expect = chai.expect;

beforeEach(function () {
  global.makeFakeDomNode = function () {
    const shadow = {
      querySelector: sandbox.stub().callsFake(() => {
        return global.makeFakeDomNode();
      }),
      appendChild: sandbox.stub(),
    };

    return {
      attachShadow: sandbox.stub().returns(shadow),
      addEventListener: sandbox.stub(),
      appendChild: sandbox.stub(),
      shadowRoot: shadow,
      setAttribute: sandbox.stub(),
      getAttribute: sandbox.stub(),
      querySelector: sandbox.stub().callsFake(() => {
        return global.makeFakeDomNode();
      }),
      classList: {
        add: sandbox.stub(),
        remove: sandbox.stub(),
        toggle: sandbox.stub(),
      },
    };
  };
  global.document = {
    addEventListener: sandbox.stub(),
    body: global.makeFakeDomNode(),
    createElement: sandbox.stub().returns(global.makeFakeDomNode()),
    querySelector: sandbox.stub().returns(global.makeFakeDomNode()),
    querySelectorAll: sandbox.stub().returns([]),
  };
  global.location = {
    pathname: '/',
  };
});

afterEach(function () {
  global.sandbox.restore();
});
