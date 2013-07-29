/*
| -------------------------------------------------------------------
|  MTGNode Cards Model
| -------------------------------------------------------------------
|
|
|	Author : Yomguithereal
|	Version : 1.0
*/

// Main Class
//============
function CardModel(){

	// Properties
	//------------
	var self = this;
	this._cards = require('../../db/AllCards.json');


	// Utilities
	//-----------

	// Get card by Id
	this.get = function(id){
		return this._cards.filter(function(card){
			return card.multiverseid === id;
		})[0];
	}

	// Search card by criteria
	this.getBy = function(criteria){
		return this._cards.filter(function(card){
			return Object.keys(criteria).filter(function(key){

				// TODO :: If Array
				// TODO :: If fuzzy
				// TODO :: Conditions
				return card[key] === criteria[key];
			}).length == Object.keys(criteria).length;
		});
	}

	// Batch search card by array
	this.getByIdArray = function(card_array){
		return this._cards.filter(function(card){
			return card_array.filter(function(id){
				return card.multiverseid === id;
			}).length > 0;
		});
	}
}

// Exporting
//============
module.exports = new CardModel();