/*
| -------------------------------------------------------------------
|  MTGNode Game Abstraction
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
*/

function Game(config){

	// Properties
	//-------------------
	var self = this;

	// Model
	this.count = 0;

	// DOM
	this.area = config.area;
	this.cards = config.cards;

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

	// To Hand
	this.to_hand = function($card, hand){

		// Updating Classes
		$card.removeClass('in-game');
		$card.addClass('in-hand');
		$card.removeClass('tapped');

		// Updating Model
		this.decrement();
		hand.increment();
	}

	// To Deck
	this.to_deck = function($card, deck){

		// Updating Classes
		$card.removeClass('in-game');
		$card.addClass('in-deck');

		// Updating Model
		this.decrement();
		deck.increment();
		deck.card_on_top($card);
	}

	// To Graveyard
	this.to_graveyard = function($card, graveyard){

		// Updating Classes
		$card.removeClass('in-game');
		$card.addClass('in-graveyard');

		// Updating Model
		this.decrement();
		graveyard.increment();
		graveyard.card_on_top($card);
	}

	// Tap Card
	this.tap = function($card){
		$card.toggleClass('tapped');
	}

	// Batch Untap
	this.batch_untap = function(){
		$(this.cards+'.tapped').removeClass('tapped');
	}

}
