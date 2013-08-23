/**
 * Game
 *
 * @module      :: Model
 * @description :: Application realtime game
 *
 */

module.exports = {
    adapter: 'memory',
    attributes: {
        name: 'String',
        player1: {
            type: 'Integer',
            defaultsTo: 0
        },
        player2: {
            type: 'Integer',
            defaultsTo: 0
        },
        full: function(){
            return (this.player1 !== 0 && this.player2 !== 0);
        },
        empty: function(){
            return !this.full();
        }
    }
}