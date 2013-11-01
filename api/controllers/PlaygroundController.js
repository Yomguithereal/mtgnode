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
  res.view('playground/playground', {id: req.param('id')});
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
        res.json({player: 1});

        // Fake game start
        if (g.debug)
          Game.publishUpdate(gid, {start: true, game: game });
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
        Game.publishUpdate(gid, {start: true, game: game });
        res.json({player: 2});
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
