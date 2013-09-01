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
exports.playground = function(req, res){
    res.view('playground/playground', {id: req.param('id')})
}

exports.connect = function(req, res){
	Game.subscribe(req.socket, req.param('id'));

	console.log("Playground 4 :: ", Game.subscribers(4).length);
	console.log("Playground 5 :: ", Game.subscribers(5).length);
}
