/*
| -------------------------------------------------------------------
|  MTGNode Deck Model
| -------------------------------------------------------------------
|
|
|	Author : Yomguithereal
|	Version : 1.0
*/

// Dependencies
//==============
var CardModel = require('./CardModel');

// Main Class
//============
function DeckModel(){

	// Properties
	//------------
	var self = this;


	// Methods
	//----------
	this.getCards = function(user, deck_id){
		var deck = user.decks.filter(function(d){
			return d.id === deck_id;
		})[0];
		return CardModel.getByIdArray(deck.cards);
	}

}

// Exporting
//============
module.exports = new DeckModel();