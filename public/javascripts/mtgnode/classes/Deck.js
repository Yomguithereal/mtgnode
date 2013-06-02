/*
| -------------------------------------------------------------------
|  MTGNode Game Deck Abstraction
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
*/

function Deck(config){

	// Properties
	//-------------------
	var self = this;

	// Model
	this.count = config.count;

	// DOM
	this.area = config.area;
	this.cards = config.cards;
	this.counter = config.counter;
	this.helper = config.helper;

	// Methods
	//-------------------

	// Losing a card
	this.decrement = function(){
		this.count -= 1;
	}

	// Gaining a card
	this.increment = function(){
		this.count += 1;
	}

	// Shuffling
	this.shuffleFromClient = function(){
		$cards = $(this.cards);
		$cards.shuffle();

		// Preparing data to send
		var shuffle = [];
		$(this.cards).each(function(i){
			shuffle.push($(this).attr("card_id"));
		});

		// Return the shuffle
		return shuffle;
	}
	this.shuffleFromServer = function(shuffle){

		// Reorganizing DOM
		$.each(shuffle, function(i){
			$(self.area).append($(self.helper.opponent_card(shuffle[i])));
		});
	}

}
