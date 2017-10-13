'use strict';

const visibility = require('../../src/js/lib/visibility');

describe('visibility', function () {
  beforeEach(function () {
    this.element = {
      classList: {
        add: sandbox.stub(),
        remove: sandbox.stub(),
        toggle: sandbox.stub(),
      },
    };
  });

  it('can show element', function () {
    visibility.show(this.element);

    expect(this.element.classList.remove).to.be.calledOnce;
    expect(this.element.classList.remove).to.be.calledWith('d-none');
  });

  it('can hide element', function () {
    visibility.hide(this.element);

    expect(this.element.classList.add).to.be.calledOnce;
    expect(this.element.classList.add).to.be.calledWith('d-none');
  });

  it('can toggle visibility', function () {
    visibility.toggle(this.element);

    expect(this.element.classList.toggle).to.be.calledOnce;
    expect(this.element.classList.toggle).to.be.calledWith('d-none');
  });
});
