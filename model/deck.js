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

		// Inserting Deck
		DB.run("INSERT INTO decks (user_id, name, cards) VALUES (?, ?, ?)", [user_id, name, cards], function(err){
			if(!err){
				callback();
			}
			else{
				console.log(err);
			}
		});
	}

	// Updating a Deck
	this.updateDeck = function(deck_id, name, cards, callback){

		// Updating Deck
		DB.run("UPDATE decks SET name = ?, cards = ? WHERE id = ?", [name, cards, deck_id], function(err){
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

	// Deleting a deck
	this.deleteDeck = function(deck_id, callback){
		DB.run("DELETE from decks WHERE id = ?", [deck_id], function(err){
			if(!err){
				callback();
			}
			else{
				console.log(err);
			}
		});
	}


}

module.exports = new DeckModel();