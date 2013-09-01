/**
 * GameController
 *
 * @module      :: Controller
 * @description :: Contains logic for handling requests.
 */

module.exports = {
    get_and_clean: function(req, res){
    	Game.subscribe(req.socket);
        Game.find({}).exec(function(err, games){
            res.json(games);
        });
    }
}