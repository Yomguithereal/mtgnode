/**
 * Game
 *
 * @module      :: Model
 * @description :: Application realtime game
 *
 */

var _ = require('lodash');

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
    full: function(){
      return (this.player1.connected && this.player2.connected);
    },
    empty: function(){
      return (!this.player1.connected && !this.player2.connected);
    },
    hasPlayerWithId: function(id){
      return _.some([this.player1, this.player2], function(player){
        return player.user.id === id;
      });
    }
  }
}