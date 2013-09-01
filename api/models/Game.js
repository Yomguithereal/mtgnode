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
            type: 'Json',
            defaultsTo: {connected: false, socket: false, user: false}
        },
        player2: {
            type: 'Json',
            defaultsTo: {connected: false, socket: false, user: false}
        },
        full: function(){
            return (this.player1.connected && this.player2.connected);
        },
        empty: function(){
            return !this.full();
        }
    }
}