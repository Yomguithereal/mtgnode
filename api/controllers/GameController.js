/**
 * GameController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  get_and_clean: function(req, res) {

    // Fetching the games
    Game.find(function(err, games) {

      // Subscribing to games in general
      Game.subscribe(req.socket, games, ['create', 'destroy']);

      // Deleting useless games
      games.map(function(game, i) {
        if (!Game.subscribers(game.id).length) {
          game.destroy();
          Game.publishDestroy(game.id);
          games.splice(i, 1);
        }
      });

      // Sending games back to client
      res.json(games.filter(function(g) {
        return !g.full();
      }));
    });
  }
};
