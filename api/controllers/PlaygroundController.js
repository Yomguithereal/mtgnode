/*
| -------------------------------------------------------------------
|  MTGNode Playground Controller
| -------------------------------------------------------------------
|
|
|   Author : Yomguithereal
|   Version : 1.0
*/

// Index
//-------
exports.playground = function(req, res) {
  res.view('playground/playground', {id: req.param('id')})
}

exports.connect = function(req, res) {
  var game_id = req.param('id');

  Game.subscribe(req.socket, game_id);
  Game.findOne(game_id).done(function(err, current_game){

    // Registering Player
    if (!current_game.player1.connected) {

      current_game.player1.connected = true;
      current_game.save(function(err, game){
        res.json({player: 1, game: game});
      });
    }
    else if (!current_game.player2.connected){

      current_game.player2.connected = true;
      current_game.save(function(err, game){
        res.json({player: 2, game: game});
      });
    }
    else {
      res.json({kicked: true});
    }

  });

  // console.log("Playground 4 :: ", Game.subscribers(4).length);
  // console.log("Playground 5 :: ", Game.subscribers(5).length);
}