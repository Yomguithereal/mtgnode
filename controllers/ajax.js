/*
| -------------------------------------------------------------------
|  MTGNode Ajax Controller
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
*/


// Login Attempt
//-------------------
exports.loginAttempt = function(req, res){

	// Loading the model
	var UserModel = require('../model/user.js');

	// Checking if the user is registered
	UserModel.checkLogin(req.body.username, req.body.password, function(row){
		if(row){
			req.session.username = row.username;
			req.session.user_id = row.id;
			res.send('success');
			return false;
		}
		else{
			res.send('fail');
			return false;
		}
	});
};


// Selecting a set
//-------------------
exports.selectSet = function(req, res){

	// Loading the model
	var SetModel = require('../model/set.js');

	var cards = SetModel.getSetCards(req.body.selected_set);
	res.render('parts/gamecards_deckbuilder', { 'cards' : cards});
}

// Saving a Deck
//-------------------
exports.saveDeck = function(req, res){

	// Loading the model
	var DeckModel = require('../model/deck.js');

	// JSON for the cards
	var cards = JSON.stringify(req.body.cards);

	DeckModel.saveDeck(req.session.user_id, req.body.name, cards, function(){
		res.send('success');
	});

}

// Updating a Deck
//-------------------
exports.updateDeck = function(req, res){

	// Loading the model
	var DeckModel = require('../model/deck.js');

	// JSON for the cards
	var cards = JSON.stringify(req.body.cards);

	DeckModel.updateDeck(req.body.deck_id, req.body.name, cards, function(){
		res.send('success');
	});

}

// Deleting a Deck
//-------------------
exports.deleteDeck = function(req, res){

	// Loading the Model
	var DeckModel = require('../model/deck.js');

	DeckModel.deleteDeck(req.body.deck_id, function(){
		res.send('success');
	});

}


// Getting Cards from a Deck
//--------------------------
exports.deckCards = function(req, res){

	// Loading the model
	var DeckModel = require('../model/deck.js');

	DeckModel.getDeckCards(req.body.deck_id, function(cards){

		if(req.body.game_side == 'mine'){
			res.render('parts/gamecards_mine', { 'cards' : cards});
		}
		else if(req.body.game_side == 'opponent'){
			res.render('parts/gamecards_opponent', { 'cards' : cards});
		}
		else{
			res.render('parts/gamecards_deckbuilder', {'cards' : cards});
		}
	});
}
