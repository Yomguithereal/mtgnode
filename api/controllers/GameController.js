/**
 * GameController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  get_and_clean: function(req, res) {

    // Subscribing to games in general
    Game.watch(req.socket);

    // Fetching the games
    Game.find(function(err, games) {

      // Deleting useless games
      games.map(function(game, i) {
        if (!Game.subscribers(game.id).length) {
          Game.publishDestroy(game.id);
          game.destroy();
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
