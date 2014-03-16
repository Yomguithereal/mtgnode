/**
 * PlaygroundController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
module.exports = {

  // Index
  playground: function(req, res) {
    res.view('playground/playground', {game_id: req.param('id')});
  },

  // Realtime connection
  connect: function(req, res) {
    var gid = req.param('id'),
        uid = req.session.user.id,
        criterion = {id: gid};

    if (gid === 'debug')
      criterion = {debug: true}

    Game.findOne(criterion).done(function(err, g) {

      // Player 1
      if (!g.player1.connected &&
          !g.hasPlayerWithId(uid)) {

        g.player1 = {
          connected: true,
          user: req.session.user
        }

        Game.subscribe(req.socket, g);

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
              head: 'game.start',
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

        Game.subscribe(req.socket, g);

        g.save(function(err, game) {

          // Every player is connected, sending back game information
          res.json({player: 2});

          Game.publishUpdate(gid, {
            head: 'game.start',
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
  },

  // Realtime messaging
  message: function(req, res) {
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
};
