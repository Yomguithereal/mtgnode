/**
 * GameController
 *
 * @module      :: Controller
 * @description :: Contains logic for handling requests.
 */

// Methods
//---------
module.exports = {

  // Retrieve the current games and delete the empty ones
  get_and_clean: function(req, res){

    // Subscribing socket
    Game.subscribe(req.socket);

    // Getting the games
    Game.find(function(err, games) {

      // Deleting useless games
      games.map(function(game, index) {

        if (Game.subscribers(game.id).length === 0 && !game.empty()) {

          game.destroy(function(){});
          games.remove(index);
        }
      });

      // Sending games back to client
      res.json(games);

    });
  }
}

// Helpers
//---------
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
