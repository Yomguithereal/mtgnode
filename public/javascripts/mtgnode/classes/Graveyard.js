/*
| -------------------------------------------------------------------
|  MTGNode Game Graveyard Abstraction
| -------------------------------------------------------------------
|
|
| Author : PLIQUE Guillaume
| Version : 1.0
|
*/

function Graveyard(config){

	// Properties
	//-------------------
	var self = this;

	// Model
	this.count = 0;

	// DOM
	this.area = config.area;
	this.left = $(this.area).offset().left;
	this.top = $(this.area).offset().top;
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

	// Getting cards back
	this.card_on_top = function($card){

		// Revealing card
		this.helper.reveal_card($card);

		// Reaxing card
		$card.animate({
			'left' : this.left
			,'top' : this.top
		}, 'fast', function(){console.log($card.position().top);});

		// Removing tapped
		$card.removeClass('tapped');
	}

	// To Deck
	this.to_deck = function($card, deck){

		// Updating Classes
		$card.removeClass('in-graveyard');
		$card.addClass('in-deck');

		// Updating Model
		this.decrement();
		deck.increment();
		deck.card_on_top($card);
	}

	// To Hand
	this.to_hand = function($card, hand){

		// Updating Classes
		$card.removeClass('in-graveyard');
		$card.addClass('in-hand');
		$card.removeClass('tapped');

		// Updating Model
		this.decrement();
		hand.increment();
	}

	// To Game
	this.to_game = function($card, game){

		// Updating Classes
		$card.removeClass('in-graveyard');
		$card.addClass('in-game');

		// Updating Model
		this.decrement();
		game.increment();
	}

}
