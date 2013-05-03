/*
| -------------------------------------------------------------------
|  MTGNode Index Controller
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
*/


// Login page
exports.login = function(req, res){

	// Killing the session
	delete req.session.user_id;

	// Rendering
	res.render('login', {});
};


// Lobby Page
exports.lobby = function(req, res){

	// Checking the connection
	if(!req.session.user_id){
		console.log("Unauthorized Connection Attempt")
		res.redirect('/');
	}

	// Rendering the view
	res.render('lobby', {});
};

