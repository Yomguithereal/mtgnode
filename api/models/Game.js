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
        player1: false,
        player2: false,
        full: function(){
            return (player1 !== false && player2 !== false);
        }
    }
}