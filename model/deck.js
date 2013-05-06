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

	this.saveDeck = function(user_id, name, cards, callback){

		// Override
		if(!user_id){
			user_id = '1';
		}

		DB.run("INSERT INTO decks (user_id, name, cards) VALUES (?, ?, ?)", [user_id, name, cards], function(err){
			if(!err){
				callback();
			}
			else{
				console.log(err);
			}
		});
	}

	this.getAllDecks = function(user_id, callback){
		DB.all("SELECT name, cards WHERE user_id = ? ORDER BY name", [user_id], function(err, rows){
			callback(rows);
		});
	}


}

module.exports = new DeckModel();