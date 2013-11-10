/*
| -------------------------------------------------------------------
|  MTGNode Playground Controller
| -------------------------------------------------------------------
|
|
|   Author : Yomguithereal
|   Version : 1.0
*/

var DeckModel = require('../raw_models/DeckModel');

// Index
//-------
exports.playground = function(req, res) {
  res.view('playground/playground', {
    gid: req.param('id'),
    uid: req.session.user.id
  });
}

// Connection
//------------
exports.connect = function(req, res) {
  var gid = req.param('id'),
      uid = req.session.user.id,
      criterion = {id: gid};

  if (gid === 'debug')
    criterion = {debug: true}

  Game.findOne(criterion).done(function(err, g){

    // Player 1
    if (!g.player1.connected &&
        !g.hasPlayerWithId(uid)) {

      g.player1 = {
        connected: true,
        user: req.session.user
      }

      Game.subscribe(req.socket, gid);

      // Debug mode
      if (g.debug) {

        // Mirror player 2
        g.player2 = {
          connected: true,
          user: req.session.user
        }
      }

      g.save(function(err, game) {

        // Fake game start
        res.json({player: 1});

        if (g.debug)
          Game.publishUpdate(gid, {
            head: 'startGame',
            body: {
              start: true,
              game: game
            }
          });
      });
    }

    // Player 2
    else if (!g.player2.connected &&
             !g.hasPlayerWithId(uid)) {

      g.player2 = {
        connected: true,
        user: req.session.user
      }

      Game.subscribe(req.socket, gid);

      g.save(function(err, game) {

        // Every player is connected, sending back game information
        res.json({player: 2});

        Game.publishUpdate(gid, {
          head: 'startGame',
          body: {
            start: true,
            game: game
          }
        });
      });
    }

    // Irrelevant dumbass
    else {
      res.json({kicked: true});
    }
  });
}

// Messaging
//-----------
exports.message = function(req, res) {

  // TODO: Message Control?

  // If debug mod is activated, we mirror the realtime messages
  if (req.param('debug')) {
    Game.publishUpdate(
      req.param('id'),
      {
        head: req.param('head'),
        body: req.param('body')
      }
    );
  }
  else {
    Game.publishUpdate(
      req.param('id'),
      {
        head: req.param('head'),
        body: req.param('body')
      },
      req.socket
    );
  }
}
