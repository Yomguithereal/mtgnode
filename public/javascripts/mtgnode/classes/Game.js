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

	// To Deck
	this.to_hand = function($card, hand){

		// Updating Classes
		$card.removeClass('in-game');
		$card.addClass('in-hand');
		$card.removeClass('tapped');

		// Updating Model
		this.decrement();
		hand.increment();
	}

}
