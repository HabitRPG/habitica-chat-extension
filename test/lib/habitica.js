'use strict';

const Habitica = require('habitica');
const habitica = require('../../src/js/lib/habitica');

describe('habitica', function () {
  beforeEach(function () {
    habitica.setup('user-id', 'api-token');

    sandbox.stub(Habitica.prototype, 'setOptions');

    sandbox.stub(Habitica.prototype, 'get').resolves();
    sandbox.stub(Habitica.prototype, 'post').resolves();
    sandbox.stub(Habitica.prototype, 'put').resolves();
    sandbox.stub(Habitica.prototype, 'del').resolves();
  });

  describe('setup', function () {
    it('sets options', function () {
      habitica.setup('user-id', 'api-token');

      expect(Habitica.prototype.setOptions).to.be.calledOnce;
      expect(Habitica.prototype.setOptions).to.be.calledWith({
        id: 'user-id',
        apiToken: 'api-token',
      });
    });
  });

  describe('getMessages', function () {
    it('requests messages from a group', function () {
      let messages = [{}];

      Habitica.prototype.get.resolves(messages);

      habitica.getMessages('group-id').then((res) => {
        expect(res).to.equal(messages);
      });
    });
  });
});
