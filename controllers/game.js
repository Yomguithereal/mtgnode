/*
| -------------------------------------------------------------------
|  MTGNode Game Controller
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
*/

// Dependancies
var DeckModel = require('../model/deck.js');

// Index Page
exports.index = function(req, res){

	// Checking the connection
	if(!req.session.user_id){
		console.log("Unauthorized Connection Attempt")
		res.redirect('/');
	}

	// Getting every decks -- Do it ajaxwise later
	DeckModel.getAllDecks(req.session.user_id, function(decks){

		// Rendering the view
		res.render('game', {decks : decks});

	});


};
