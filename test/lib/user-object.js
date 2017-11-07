'use strict';

const habitica = require('../../src/js/lib/habitica');
const getUserObject = require('../../src/js/lib/user-object').get;
const clearUserCache = require('../../src/js/lib/user-object').clearCache;

describe('getUserObject', function () {
  beforeEach(function () {
    this.user = {
      id: 'id',
    };

    sandbox.stub(habitica, 'getMember').resolves(this.user);
  });

  afterEach(function () {
    clearUserCache();
  });

  it('fetches the user', function () {
    return getUserObject('id').then((result) => {
      expect(habitica.getMember).to.be.calledOnce;
      expect(habitica.getMember).to.be.calledWith('id');
      expect(result.userObject).to.equal(this.user);
      expect(result.failed).to.not.exist;
    });
  });

  it('uses cached user if it already stored', function () {
    return getUserObject('id').then(() => {
      habitica.getMember.reset();

      return getUserObject('id');
    }).then((result) => {
      expect(habitica.getMember).to.not.be.called;
      expect(result.userObject).to.equal(this.user);
      expect(result.failed).to.not.exist;
    });
  });

  it('marks user as failed but still resolves if lookup fails', function () {
    habitica.getMember.rejects(new Error('foo'));

    return getUserObject('id').then((result) => {
      expect(result.userObject).to.not.exist;
      expect(result.failed).to.equal(true);

      expect(habitica.getMember).to.be.calledOnce;
      habitica.getMember.reset();

      return getUserObject('id');
    }).then((result) => {
      expect(habitica.getMember).to.not.be.called;

      expect(result.userObject).to.not.exist;
      expect(result.failed).to.equal(true);
    });
  });

  it('adds users to a cache', function () {
    let userId = {};
    let userOtherId = {};

    habitica.getMember.callsFake(function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(userId);
        }, 100);
      });
    });

    habitica.getMember.withArgs('other-id').resolves(userOtherId);

    return Promise.all([
      getUserObject('id'),
      getUserObject('id'),
      getUserObject('id'),
      getUserObject('other-id'),
    ]).then((res) => {
      expect(habitica.getMember).to.be.calledTwice;
      expect(res[0].userObject).to.equal(userId);
      expect(res[1].userObject).to.equal(userId);
      expect(res[2].userObject).to.equal(userId);
      expect(res[3].userObject).to.equal(userOtherId);
    });
  });
});
