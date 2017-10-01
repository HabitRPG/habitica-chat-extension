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

  describe('getGroup', function () {
    it('requests a group', function () {
      let group = {
        id: 'group-id',
        name: 'Group',
      };

      Habitica.prototype.get.resolves({
        data: group,
      });

      return habitica.getGroup('group-id').then((res) => {
        expect(res).to.equal(group);
        expect(Habitica.prototype.get).to.be.calledOnce;
        expect(Habitica.prototype.get).to.be.calledWith('/groups/group-id');
      });
    });
  });

  describe('getGuilds', function () {
    it('requests user\'s guilds', function () {
      let groups = [{
        id: 'group-id',
        name: 'Group',
      }];

      Habitica.prototype.get.resolves({
        data: groups,
      });

      return habitica.getGuilds().then((res) => {
        expect(res).to.equal(groups);
        expect(Habitica.prototype.get).to.be.calledOnce;
        expect(Habitica.prototype.get).to.be.calledWith('/groups?type=guilds');
      });
    });
  });

  describe('getChat', function () {
    it('requests a group\'s chat messages', function () {
      let chat = [{text: 'a message'}];

      Habitica.prototype.get.resolves({
        data: chat,
      });

      return habitica.getChat('group-id').then((res) => {
        expect(res).to.equal(chat);
        expect(Habitica.prototype.get).to.be.calledOnce;
        expect(Habitica.prototype.get).to.be.calledWith('/groups/group-id/chat');
      });
    });
  });

  describe('sendMessage', function () {
    it('sends a message', function () {
      Habitica.prototype.post.resolves({});

      return habitica.sendMessage('group-id', 'a message').then(() => {
        expect(Habitica.prototype.post).to.be.calledOnce;
        expect(Habitica.prototype.post).to.be.calledWith('/groups/group-id/chat', {message: 'a message'});
      });
    });
  });
});
