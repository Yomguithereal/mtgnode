/*
| -------------------------------------------------------------------
|  Deck Model
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Version : 1.0
*/

// Dependancies
var Card = require('./classes/card.js');

// Object
function DeckModel(){

	var self = this;
	var scan_base_url = 'http://magiccards.info/scans/en/'


	// Saving a Deck into database
	this.saveDeck = function(user_id, name, cards, callback){

		// Override
		if(!user_id){
			user_id = '1';
		}

		// Check if deck exists before running the query

		DB.run("INSERT INTO decks (user_id, name, cards) VALUES (?, ?, ?)", [user_id, name, cards], function(err){
			if(!err){
				callback();
			}
			else{
				console.log(err);
			}
		});
	}

	// Fetching a list of cards in a deck
	this.getAllDecks = function(user_id, callback){
		DB.all("SELECT id, name from decks WHERE user_id = ? ORDER BY name", [user_id], function(err, rows){

			callback(rows);
		});
	}

	// Getting cards from a deck
	this.getDeckCards = function(deck_id, callback){
		DB.get("SELECT cards from decks WHERE id = ?", [deck_id], function(err, row){

			var cards = JSON.parse(row.cards);
			callback(cards);
		});
	}


}

module.exports = new DeckModel();