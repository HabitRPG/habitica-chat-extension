'use strict';

const fillInUserDetails = require('../../../src/js/pages/options/fill-in-user-details');
const habitica = require('../../../src/js/lib/habitica');
const visibility = require('../../../src/js/lib/visibility');

describe('fillInUserDetails', function () {
  beforeEach(function () {
    this.fakeButton = {
      addEventListener: sandbox.stub(),
    };
    this.fakeUserDetailsNode = {
      querySelector: sandbox.stub().returns(this.fakeButton),
    };

    sandbox.stub(visibility, 'show');
    sandbox.stub(visibility, 'hide');
    sandbox.stub(habitica, 'logout');

    global.document.querySelector.withArgs('#user-details').returns(this.fakeUserDetailsNode);
  });

  it('returns early if no profile is provided', function () {
    fillInUserDetails();

    expect(visibility.show).to.not.be.called;
  });

  it('shows user details if profile exists', function () {
    fillInUserDetails({
      name: 'a name',
    });

    expect(visibility.show).to.be.calledOnce;
    expect(visibility.show).to.be.calledWith(this.fakeUserDetailsNode);
  });

  it('populates dom with profile name', function () {
    let fakeNameNode = {
      textContent: 'foo',
    };

    global.document.querySelector.withArgs('#user-name').returns(fakeNameNode);

    fillInUserDetails({
      name: 'a name',
    });

    expect(fakeNameNode.textContent).to.equal('a name');
  });

  it('adds a logout function to button', function () {
    let logoutFunction;

    fillInUserDetails({
      name: 'a name',
    });

    expect(this.fakeButton.addEventListener).to.be.calledOnce;
    expect(this.fakeButton.addEventListener).to.be.calledWith('click', sandbox.match.func);

    logoutFunction = this.fakeButton.addEventListener.args[0][1];

    logoutFunction();

    expect(habitica.logout).to.be.calledOnce;
    expect(visibility.hide).to.be.calledOnce;
    expect(visibility.hide).to.be.calledWith(this.fakeUserDetailsNode);
  });
});
