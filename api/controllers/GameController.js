/**
 * GameController
 *
 * @module      :: Controller
 * @description :: Contains logic for handling requests.
 */

module.exports = {
    get_and_clean: function(req, res){
        Game.find({}).exec(function(err, games){
            res.json({status: games[0].full()});
        });
    }
}