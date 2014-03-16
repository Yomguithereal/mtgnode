/**
 * Game.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  adapter: 'memory',
	attributes: {
    name: 'String',
    debug: {
      type: 'Boolean',
      defaultsTo: false
    },
    player1: {
      type: 'Json',
      defaultsTo: {
        connected: false,
        user: false,
        deck: false
      }
    },
    player2: {
      type: 'Json',
      defaultsTo: {
        connected: false,
        user: false,
        deck: false
      }
    },
    full: function() {
      return (this.player1.connected && this.player2.connected);
    },
    empty: function() {
      return (!this.player1.connected && !this.player2.connected);
    },
    hasPlayerWithId: function(id) {
      return _.some([this.player1, this.player2], function(player){
        return player.user.id === id;
      });
    }
	}
};
