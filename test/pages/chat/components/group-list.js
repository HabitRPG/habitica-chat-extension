'use strict';

const habitica = require('../../../../src/js/lib/habitica');
const GroupList = require('../../../../src/js/pages/chat/components/group-list');

describe('GroupList', function () {
  describe('constructor', function () {
    it('constructs an element', function () {
      let list = new GroupList();

      expect(list.element.shadowRoot.innerHTML).to.include('<div id="regular-chatrooms">');
      expect(list.element.shadowRoot.innerHTML).to.include('<div id="guilds">');
    });
  });

  describe('initialize', function () {
    it('adds group list element to dom', function () {
      let list = new GroupList();
      let tavern = {name: 'tavern'};
      let party = {name: 'party'};
      let guilds = [{name: 'guild 1'}, {name: 'guild 2'}];

      sandbox.stub(list, 'getGroups').resolves([
        tavern,
        party,
        guilds,
      ]);
      sandbox.stub(list, 'populateRegularRooms');
      sandbox.stub(list, 'populateGuilds');

      return list.initialize().then(() => {
        expect(list.populateRegularRooms).to.be.calledWith(tavern, party);
        expect(list.populateGuilds).to.be.calledWith(guilds);
        expect(global.document.body.appendChild).to.be.calledWith(list.element);
      });
    });
  });

  describe('populateRegularRooms', function () {
    it('appends a group list item for tavern', function () {
      let list = new GroupList();
      let tavern = {name: 'tavern'};
      let party = {name: 'party'};
      let rooms = global.makeFakeDomNode();

      list.element.shadowRoot.querySelector.returns(rooms);

      list.populateRegularRooms(tavern, party);

      expect(rooms.appendChild).to.be.calledTwice;
    });
  });

  describe('populateGuilds', function () {
    it('appends a group list for each guild', function () {
      let list = new GroupList();
      let guilds = [{name: 'guild 1'}, {name: 'guild 2'}, {name: 'guild 3'}];
      let rooms = global.makeFakeDomNode();

      list.element.shadowRoot.querySelector.returns(rooms);

      list.populateGuilds(guilds);

      expect(rooms.appendChild).to.be.calledThrice;
    });
  });

  describe('getGroups', function () {
    beforeEach(function () {
      sandbox.stub(habitica, 'getGroup').resolves();
      sandbox.stub(habitica, 'getGuilds').resolves();
    });

    it('fetches groups from habitica', function () {
      let list = new GroupList();

      list.getGroups();

      expect(habitica.getGroup).to.be.calledTwice;
      expect(habitica.getGroup).to.be.calledWith('habitrpg');
      expect(habitica.getGroup).to.be.calledWith('party');
      expect(habitica.getGuilds).to.be.calledOnce;
    });

    it('returns an array of group results', function () {
      let list = new GroupList();
      let tavern = {name: 'tavern'};
      let party = {name: 'party'};
      let guilds = [{name: 'guild 1'}, {name: 'guild 2'}];


      habitica.getGroup.withArgs('habitrpg').resolves(tavern);
      habitica.getGroup.withArgs('party').resolves(party);
      habitica.getGuilds.resolves(guilds);

      return list.getGroups().then((res) => {
        expect(res[0]).to.equal(tavern);
        expect(res[1]).to.equal(party);
        expect(res[2]).to.equal(guilds);
      });
    });
  });
});
