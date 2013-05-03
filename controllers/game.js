/*
| -------------------------------------------------------------------
|  MTGNode Game Controller
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
*/

// Index Page
exports.index = function(req, res){

	// Checking the connection
	if(!req.session.user_id){
		console.log("Unauthorized Connection Attempt")
		res.redirect('/');
	}

	// Rendering the view
	res.render('game/main', {});
};
