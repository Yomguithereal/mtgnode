/*
| -------------------------------------------------------------------
|  Sets Model -- magiccards.info Driver
| -------------------------------------------------------------------
|
|
|	Author : PLIQUE Guillaume
|	Version : 1.0
*/

// Dependancies
var Card = require('./classes/card.js');

// Object
function SetModel(){

	var self = this;

	// Loading config file
	var setInfos = require('./config/setinfo.js');

	// Get the sets informations
	this.getSetsList = function(){
		return setInfos;
	}

	// Get all the cards src of a set
	this.getSetCards = function(set){

		var cards = [];
		for(i=1; i <= setInfos[set].maxCard; i++){

			// Setting a new card
			var card = new Card(set, setInfos[set].code, i);
			cards.push(card);
		}

		// Getting the cards back
		return cards;
	}


}

module.exports = new SetModel();