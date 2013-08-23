/**
 * GaleController
 *
 * @module      :: Controller
 * @description :: Contains logic for handling requests.
 */

module.exports = {
    host: function(req, res){

        // Creating Game
        var game = Game.save({name: req.param('name'), player1: req.session.user});

        // Subscribing Game
        res.json({data: game})
    }
}