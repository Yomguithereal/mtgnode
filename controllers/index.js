/*
| -------------------------------------------------------------------
|  MTGNode Index Controller
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
*/

// Dependencies

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
	res.render('lobby', {username : req.session.user_id});
};

// Deck Builder Page
exports.deckBuilder = function(req, res){

	// Loading the sets model
	var SetModel = require('../model/set.js');

	// TEMP
	res.render('deckbuilder', {set_list : SetModel.getSetsList()});
}
